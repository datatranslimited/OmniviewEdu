"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function dispatchBroadcast(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const audience = formData.get("audience") as string
  const channel = formData.get("channel") as string
  const message = formData.get("message") as string

  if (!audience || !channel || !message) {
    return { error: "Please fill out all fields." }
  }

  try {
    let targetUsers: any[] = []

    if (audience === "ALL_PARENTS") {
      targetUsers = await prisma.user.findMany({
        where: { tenant_id: appUser.tenant_id, role: "PARENT", is_active: true }
      })
    } else if (audience === "ALL_STAFF") {
      targetUsers = await prisma.user.findMany({
        where: { 
          tenant_id: appUser.tenant_id, 
          role: { in: ["TEACHER", "PRINCIPAL", "BURSAR"] },
          is_active: true
        }
      })
    } else if (audience === "ALL_USERS") {
      targetUsers = await prisma.user.findMany({
        where: { 
          tenant_id: appUser.tenant_id, 
          is_active: true 
        }
      })
    }

    if (targetUsers.length === 0) {
      return { error: "No users found in the selected audience." }
    }

    // Simulate sending (takes a moment)
    await new Promise(resolve => setTimeout(resolve, 1500))

    let sentCount = 0

    // Log the broadcast for each recipient
    await prisma.$transaction(async (tx) => {
      for (const recipient of targetUsers) {
        
        // Skip if no contact info for the requested channel
        if (channel === "SMS" && !recipient.phone_number) continue
        if (channel === "EMAIL" && !recipient.email) continue

        const contactValue = channel === "SMS" ? recipient.phone_number! : recipient.email!

        await tx.notificationLog.create({
          data: {
            tenant_id: appUser.tenant_id,
            recipient_user_id: recipient.id,
            recipient_phone: contactValue, // We re-use this column for email for now, or we can just log the destination
            channel,
            message_type: "BROADCAST",
            status: "SENT",
            provider_reference: `sim_${Math.random().toString(36).substring(2, 10)}`
          }
        })
        sentCount++
      }
    })

    revalidatePath("/tenant/admin/broadcast")
    return { success: true, sentCount, totalFound: targetUsers.length }
  } catch (error: any) {
    return { error: error.message }
  }
}
