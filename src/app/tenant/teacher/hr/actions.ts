"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitLeaveRequest(startDateStr: string, endDateStr: string, reason: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) return { error: "User not found" }

  await prisma.leaveRequest.create({
    data: {
      tenant_id: appUser.tenant_id,
      staff_id: appUser.id,
      start_date: new Date(startDateStr),
      end_date: new Date(endDateStr),
      reason,
      status: "PENDING"
    }
  })

  revalidatePath("/tenant/teacher/hr")
  return { success: true }
}
