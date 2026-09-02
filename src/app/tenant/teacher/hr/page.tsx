import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import TeacherHrClient from "./TeacherHrClient"

export default async function TeacherHrPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) return null

  const leaveRequests = await prisma.leaveRequest.findMany({
    where: { 
      tenant_id: appUser.tenant_id,
      staff_id: appUser.id
    },
    orderBy: { created_at: 'desc' }
  })

  const payslips = await prisma.payslip.findMany({
    where: {
      tenant_id: appUser.tenant_id,
      staff_id: appUser.id
    },
    orderBy: { created_at: 'desc' }
  })

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2C3531]">My HR Portal</h1>
        <p className="text-[#788B81] mt-1 font-medium">Request leaves and download payslips.</p>
      </div>

      <TeacherHrClient leaveRequests={leaveRequests} payslips={payslips} />
    </div>
  )
}
