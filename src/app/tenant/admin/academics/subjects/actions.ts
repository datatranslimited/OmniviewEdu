"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { SchoolSection } from "@prisma/client"

export async function createSubject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const name = formData.get("name") as string
  const code = formData.get("code") as string
  const section = formData.get("section") as SchoolSection

  try {
    await prisma.subject.create({
      data: {
        tenant_id: appUser.tenant_id,
        name,
        code,
        section
      }
    })
    
    revalidatePath("/tenant/admin/academics/subjects")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function allocateSubject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const subject_id = formData.get("subject_id") as string
  const class_arm_id = formData.get("class_arm_id") as string
  const teacher_id_raw = formData.get("teacher_id") as string
  const teacher_id = teacher_id_raw ? teacher_id_raw : null

  try {
    // SCD: We must find the active academic session
    const activeSession = await prisma.academicSession.findFirst({
      where: { tenant_id: appUser.tenant_id, is_current: true }
    })

    if (!activeSession) {
      return { error: "Cannot allocate subject: No active academic session found. Please set an active session first." }
    }

    // Check if allocation already exists
    const existing = await prisma.classSubject.findFirst({
      where: {
        tenant_id: appUser.tenant_id,
        class_arm_id,
        subject_id,
        session_id: activeSession.id
      }
    })

    if (existing) {
      return { error: "This subject is already allocated to this class for the current session." }
    }

    await prisma.classSubject.create({
      data: {
        tenant_id: appUser.tenant_id,
        subject_id,
        class_arm_id,
        session_id: activeSession.id,
        teacher_id
      }
    })
    
    revalidatePath("/tenant/admin/academics/subjects")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function removeSubjectAllocation(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const class_subject_id = formData.get("class_subject_id") as string

  try {
    await prisma.classSubject.delete({
      where: { id: class_subject_id }
    })
    
    revalidatePath("/tenant/admin/academics/subjects")
    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2003') return { error: "Cannot remove allocation because grades or lesson notes exist for this subject in this class." }
    return { error: error.message }
  }
}
