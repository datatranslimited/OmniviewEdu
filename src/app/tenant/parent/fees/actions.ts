"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function simulateOnlinePayment(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'PARENT') return { error: "Forbidden" }

  const invoice_id = formData.get("invoice_id") as string
  const amount = parseFloat(formData.get("amount") as string)
  const card_number = formData.get("card_number") as string // Mock card, we don't save this

  try {
    // Simulate payment processing delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000))

    await prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.findUnique({ where: { id: invoice_id } })
      if (!invoice) throw new Error("Invoice not found")

      // Create Payment log (Simulated Stripe/Paystack response)
      await tx.payment.create({
        data: {
          tenant_id: appUser.tenant_id,
          invoice_id,
          amount,
          channel: "CARD",
          transaction_reference: `ch_${Math.random().toString(36).substring(2, 15)}`, // Mock Stripe charge ID
          receipt_number: `RCT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          notes: `Simulated online payment ending in ${card_number.slice(-4)}`
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

    revalidatePath("/tenant/parent/fees")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
