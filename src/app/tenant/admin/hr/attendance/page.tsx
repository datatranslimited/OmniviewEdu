import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import AttendanceClient from "./AttendanceClient"
import { format } from "date-fns"

export default async function AdminHRAttendancePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) return null

  const staffList = await prisma.user.findMany({
    where: { 
      tenant_id: appUser.tenant_id,
      role: { in: ["TEACHER", "BURSAR", "PRINCIPAL", "SCHOOL_ADMIN"] }
    },
    orderBy: { first_name: 'asc' }
  })

  const todayStr = format(new Date(), "yyyy-MM-dd")

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2C3531]">Daily Staff Attendance</h1>
        <p className="text-[#788B81]">Mark and manage attendance for all staff members.</p>
      </div>

      <AttendanceClient staffList={staffList} todayStr={todayStr} />
    </div>
  )
}
