import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Users, CalendarClock, Receipt, FileText } from "lucide-react"

export default async function AdminHRDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) return null

  // Fetch quick stats
  const totalStaff = await prisma.user.count({
    where: { tenant_id: appUser.tenant_id, role: "TEACHER" }
  })

  const pendingLeaves = await prisma.leaveRequest.count({
    where: { tenant_id: appUser.tenant_id, status: "PENDING" }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2C3531]">HR & Payroll Dashboard</h1>
        <p className="text-[#788B81]">Manage staff attendance, leave requests, and payroll.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#788B81]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#788B81] font-bold text-sm">Total Staff</h3>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#2C3531]">{totalStaff}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#788B81]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#788B81] font-bold text-sm">Pending Leaves</h3>
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#2C3531]">{pendingLeaves}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold text-[#2C3531] mb-4">HR Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/tenant/admin/hr/attendance" className="bg-white p-6 rounded-3xl shadow-sm border border-[#788B81]/20 hover:shadow-lg transition-shadow group flex flex-col items-start">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CalendarClock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#2C3531] mb-2">Daily Attendance</h3>
          <p className="text-[#788B81] text-sm">Mark or review staff check-ins and absences.</p>
        </Link>

        <Link href="/tenant/admin/hr/leave" className="bg-white p-6 rounded-3xl shadow-sm border border-[#788B81]/20 hover:shadow-lg transition-shadow group flex flex-col items-start">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#2C3531] mb-2">Leave Requests</h3>
          <p className="text-[#788B81] text-sm">Review, approve, or reject time-off requests.</p>
        </Link>

        <Link href="/tenant/admin/hr/payroll" className="bg-white p-6 rounded-3xl shadow-sm border border-[#788B81]/20 hover:shadow-lg transition-shadow group flex flex-col items-start">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Receipt className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#2C3531] mb-2">Payroll & Payslips</h3>
          <p className="text-[#788B81] text-sm">Generate monthly payslips and manage salaries.</p>
        </Link>
      </div>
    </div>
  )
}
