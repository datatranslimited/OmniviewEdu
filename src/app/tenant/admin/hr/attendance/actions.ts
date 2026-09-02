"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { AttendanceStatus } from "@prisma/client"

export async function submitDailyAttendance(dateStr: string, records: Record<string, { status: AttendanceStatus, notes: string }>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) return { error: "Admin not found" }

  const date = new Date(dateStr)

  await prisma.$transaction(async (tx) => {
    for (const [staffId, record] of Object.entries(records)) {
      await tx.staffAttendance.upsert({
        where: {
          tenant_id_staff_id_date: {
            tenant_id: appUser.tenant_id,
            staff_id: staffId,
            date: date
          }
        },
        create: {
          tenant_id: appUser.tenant_id,
          staff_id: staffId,
          date: date,
          status: record.status,
          notes: record.notes
        },
        update: {
          status: record.status,
          notes: record.notes
        }
      })
    }
  })

  revalidatePath("/tenant/admin/hr/attendance")
  return { success: true }
}
