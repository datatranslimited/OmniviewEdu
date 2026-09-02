"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function generateInvoices(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const class_level_id = formData.get("class_level_id") as string
  
  try {
    const activeTerm = await prisma.academicTerm.findFirst({
      where: { tenant_id: appUser.tenant_id, is_current: true }
    })

    if (!activeTerm) {
      return { error: "No active academic term found. Invoices must be generated for an active term." }
    }

    // 1. Get Fee Structures for this class level and term
    const structures = await prisma.feeStructure.findMany({
      where: {
        tenant_id: appUser.tenant_id,
        term_id: activeTerm.id,
        class_level_id
      }
    })

    if (structures.length === 0) {
      return { error: "No fee pricing matrix found for this class level. Setup fees first." }
    }

    // 2. Find all students enrolled in this class level for the current session
    const classArms = await prisma.classArm.findMany({
      where: { class_level_id, tenant_id: appUser.tenant_id }
    })
    const classArmIds = classArms.map(ca => ca.id)

    const enrollments = await prisma.studentSessionEnrollment.findMany({
      where: {
        tenant_id: appUser.tenant_id,
        session_id: activeTerm.session_id,
        class_arm_id: { in: classArmIds }
      }
    })

    if (enrollments.length === 0) {
      return { error: "No students are enrolled in this class level for the current session." }
    }

    // 3. Generate Invoices
    let generatedCount = 0

    await prisma.$transaction(async (tx) => {
      for (const enrollment of enrollments) {
        // Check if invoice already exists for this term & student
        const existingInvoice = await tx.invoice.findFirst({
          where: {
            tenant_id: appUser.tenant_id,
            term_id: activeTerm.id,
            student_id: enrollment.student_id
          }
        })

        if (existingInvoice) continue // Skip if already generated

        // Calculate total
        const totalAmount = structures.reduce((sum, struct) => sum + Number(struct.amount), 0)
        
        // Generate Unique Invoice Number (e.g. INV-2026-TERM1-ABCD)
        const randomString = Math.random().toString(36).substring(2, 6).toUpperCase()
        const invoiceNumber = `INV-${new Date().getFullYear()}-${activeTerm.name.replace('_', '')}-${randomString}`

        const invoice = await tx.invoice.create({
          data: {
            tenant_id: appUser.tenant_id,
            term_id: activeTerm.id,
            student_id: enrollment.student_id,
            invoice_number: invoiceNumber,
            total_amount: totalAmount,
            status: "UNPAID"
          }
        })

        // Generate line items
        for (const struct of structures) {
          await tx.invoiceItem.create({
            data: {
              invoice_id: invoice.id,
              fee_category_id: struct.fee_category_id,
              amount: struct.amount
            }
          })
        }

        generatedCount++
      }
    })

    revalidatePath("/tenant/admin/bursary/invoices")
    return { success: true, generatedCount }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function recordPayment(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const invoice_id = formData.get("invoice_id") as string
  const amount = parseFloat(formData.get("amount") as string)
  const channel = formData.get("channel") as any
  const transaction_reference = formData.get("transaction_reference") as string
  const notes = formData.get("notes") as string

  try {
    await prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.findUnique({ where: { id: invoice_id } })
      if (!invoice) throw new Error("Invoice not found")

      // Create Payment log
      await tx.payment.create({
        data: {
          tenant_id: appUser.tenant_id,
          invoice_id,
          amount,
          channel,
          transaction_reference,
          receipt_number: `RCT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          notes
        }
      })

      // Update Invoice totals
      const newPaidAmount = Number(invoice.paid_amount || 0) + amount
      const totalAmount = Number(invoice.total_amount)
      
      let status = invoice.status
      if (newPaidAmount >= totalAmount) {
        status = "PAID"
      } else if (newPaidAmount > 0) {
        status = "PARTIALLY_PAID"
      }

      await tx.invoice.update({
        where: { id: invoice_id },
        data: {
          paid_amount: newPaidAmount,
          status
        }
      })
    })

    revalidatePath("/tenant/admin/bursary/invoices")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
