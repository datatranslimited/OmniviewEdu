"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createStudent(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const first_name = formData.get("first_name") as string
  const last_name = formData.get("last_name") as string
  const admission_number = formData.get("admission_number") as string
  const gender = formData.get("gender") as string
  const class_arm_id = formData.get("class_arm_id") as string // optional

  try {
    // 1. Check if admission number is unique for this tenant
    const existing = await prisma.student.findUnique({
      where: {
        tenant_id_admission_number: {
          tenant_id: appUser.tenant_id,
          admission_number
        }
      }
    })

    if (existing) {
      return { error: "A student with this admission number already exists." }
    }

    // 2. Fetch Active Session if they selected a class arm
    let activeSession = null
    if (class_arm_id) {
      activeSession = await prisma.academicSession.findFirst({
        where: { tenant_id: appUser.tenant_id, is_current: true }
      })
      if (!activeSession) {
        return { error: "Cannot enroll student immediately because no Active Academic Session is set. Create the student without a class first." }
      }
    }

    // 3. Use a transaction to create student and optionally enroll them
    await prisma.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: {
          tenant_id: appUser.tenant_id,
          first_name,
          last_name,
          admission_number,
          gender,
          current_class_arm_id: class_arm_id || null
        }
      })

      if (class_arm_id && activeSession) {
        await tx.studentSessionEnrollment.create({
          data: {
            tenant_id: appUser.tenant_id,
            student_id: student.id,
            session_id: activeSession.id,
            class_arm_id: class_arm_id
          }
        })
      }
    })

    revalidatePath("/tenant/admin/students")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function enrollStudent(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const student_id = formData.get("student_id") as string
  const class_arm_id = formData.get("class_arm_id") as string

  try {
    const activeSession = await prisma.academicSession.findFirst({
      where: { tenant_id: appUser.tenant_id, is_current: true }
    })

    if (!activeSession) {
      return { error: "Cannot enroll student: No active academic session found." }
    }

    await prisma.$transaction(async (tx) => {
      // Upsert the enrollment record for this specific session
      await tx.studentSessionEnrollment.upsert({
        where: {
          student_id_session_id: {
            student_id,
            session_id: activeSession.id
          }
        },
        update: {
          class_arm_id
        },
        create: {
          tenant_id: appUser.tenant_id,
          student_id,
          session_id: activeSession.id,
          class_arm_id
        }
      })

      // Update the student's current class pointer
      await tx.student.update({
        where: { id: student_id },
        data: { current_class_arm_id: class_arm_id }
      })
    })

    revalidatePath("/tenant/admin/students")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function generateLinkPin(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const student_id = formData.get("student_id") as string
  
  try {
    // Generate a random 6-character alphanumeric PIN
    const generateRandomPin = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed confusing characters like 0, O, 1, I
      let pin = ''
      for (let i = 0; i < 6; i++) {
        pin += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return pin
    }

    let pin = generateRandomPin()
    
    // Ensure uniqueness across the DB
    let isUnique = false
    while (!isUnique) {
      const existing = await prisma.student.findUnique({ where: { secure_link_pin: pin } })
      if (!existing) {
        isUnique = true
      } else {
        pin = generateRandomPin()
      }
    }

    await prisma.student.update({
      where: { id: student_id },
      data: { secure_link_pin: pin }
    })

    revalidatePath("/tenant/admin/students")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
