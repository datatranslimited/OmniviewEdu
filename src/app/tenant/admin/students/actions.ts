"use server"
import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function enrollStudent(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const first_name = formData.get("first_name") as string
  const last_name = formData.get("last_name") as string
  const admission_number = formData.get("admission_number") as string
  const gender = formData.get("gender") as string
  const date_of_birth_raw = formData.get("date_of_birth") as string
  const current_class_arm_id = formData.get("current_class_arm_id") as string

  if (!first_name || !last_name || !admission_number) {
    return { error: "First Name, Last Name, and Admission Number are required." }
  }

  let date_of_birth = null
  if (date_of_birth_raw) {
    date_of_birth = new Date(date_of_birth_raw)
  }

  try {
    await prisma.student.create({
      data: {
        tenant_id: appUser.tenant_id,
        first_name,
        last_name,
        admission_number,
        gender: gender || null,
        date_of_birth,
        current_class_arm_id: current_class_arm_id || null,
        is_active: true
      }
    })

    revalidatePath("/tenant/admin/students")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to enroll student" }
  }
}
