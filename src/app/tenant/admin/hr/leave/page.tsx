import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import LeaveClient from "./LeaveClient"

export default async function AdminHRLeavePage() {
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
      status: "PENDING"
    },
    include: {
      staff: true
    },
    orderBy: { created_at: 'asc' }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2C3531]">Leave Management</h1>
        <p className="text-[#788B81]">Review and manage pending staff leave requests.</p>
      </div>

      <LeaveClient leaveRequests={leaveRequests} />
    </div>
  )
}
