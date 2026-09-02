"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function generatePayslips(month: number, year: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) return { error: "Admin not found" }

  const staffProfiles = await prisma.staffProfile.findMany({
    where: { 
      user: {
        tenant_id: appUser.tenant_id,
        is_active: true
      }
    },
    include: { user: true }
  })

  let count = 0

  await prisma.$transaction(async (tx) => {
    for (const profile of staffProfiles) {
      if (!profile.basic_salary) continue;
      
      const basic = Number(profile.basic_salary)
      if (basic <= 0) continue;

      // Ensure it doesn't already exist for the month
      const existing = await tx.payslip.findUnique({
        where: {
          staff_id_month_year: {
            staff_id: profile.user_id,
            month: month,
            year: year
          }
        }
      })

      if (existing) continue;

      // Automatically generate draft payslip
      await tx.payslip.create({
        data: {
          tenant_id: appUser.tenant_id,
          staff_id: profile.user_id,
          month: month,
          year: year,
          basic_salary: basic,
          allowances: 0,
          deductions: 0,
          net_pay: basic,
          status: "DRAFT"
        }
      })
      count++
    }
  })

  revalidatePath("/tenant/admin/hr/payroll")
  return { success: true, count }
}

export async function updatePayslip(payslipId: string, allowances: number, deductions: number, markAsPaid: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) return { error: "Admin not found" }

  const payslip = await prisma.payslip.findUnique({
    where: { id: payslipId, tenant_id: appUser.tenant_id }
  })

  if (!payslip) return { error: "Payslip not found" }

  const basic = Number(payslip.basic_salary)
  const net = basic + allowances - deductions

  await prisma.payslip.update({
    where: { id: payslipId },
    data: {
      allowances,
      deductions,
      net_pay: net,
      status: markAsPaid ? "PAID" : payslip.status
    }
  })

  revalidatePath("/tenant/admin/hr/payroll")
  return { success: true }
}
