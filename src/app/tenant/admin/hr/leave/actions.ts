"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateLeaveStatus(leaveId: string, status: "APPROVED" | "REJECTED") {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) return { error: "Admin not found" }

  await prisma.leaveRequest.update({
    where: { id: leaveId, tenant_id: appUser.tenant_id },
    data: {
      status,
      reviewed_by: appUser.id,
      updated_at: new Date()
    }
  })

  revalidatePath("/tenant/admin/hr/leave")
  return { success: true }
}
