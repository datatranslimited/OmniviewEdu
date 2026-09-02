import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import PayrollClient from "./PayrollClient"

export default async function AdminHRPayrollPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) return null

  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  const payslips = await prisma.payslip.findMany({
    where: {
      tenant_id: appUser.tenant_id,
      month: currentMonth,
      year: currentYear
    },
    include: {
      staff: true
    },
    orderBy: {
      staff: { first_name: 'asc' }
    }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2C3531]">Payroll Management</h1>
        <p className="text-[#788B81]">Generate and manage staff payslips for the current month.</p>
      </div>

      <PayrollClient 
        payslips={payslips} 
        currentMonth={currentMonth} 
        currentYear={currentYear} 
      />
    </div>
  )
}
