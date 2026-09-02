"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function linkStudentWithPin(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser) return { error: "Forbidden" }

  const pin = formData.get("pin") as string

  try {
    // Ensure the current user has a Guardian record, or create one
    let guardian = await prisma.guardian.findFirst({
      where: { tenant_id: appUser.tenant_id, user_id: user.id }
    })

    if (!guardian) {
      guardian = await prisma.guardian.create({
        data: {
          tenant_id: appUser.tenant_id,
          user_id: user.id,
          relationship_type: "PARENT"
        }
      })
    }

    // Find the student by PIN
    const student = await prisma.student.findUnique({
      where: { secure_link_pin: pin }
    })

    if (!student || student.tenant_id !== appUser.tenant_id) {
      return { error: "Invalid PIN. Please check the code and try again." }
    }

    // Check if already linked
    const existingLink = await prisma.studentGuardian.findUnique({
      where: {
        student_id_guardian_id: {
          student_id: student.id,
          guardian_id: guardian.id
        }
      }
    })

    if (existingLink) {
      return { error: "You are already linked to this student." }
    }

    // Create the link
    await prisma.studentGuardian.create({
      data: {
        student_id: student.id,
        guardian_id: guardian.id,
        is_primary_contact: true
      }
    })

    revalidatePath("/tenant/parent")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
