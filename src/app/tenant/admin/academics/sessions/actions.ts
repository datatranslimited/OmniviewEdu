"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createAcademicSession(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const name = formData.get("name") as string
  const start_date = new Date(formData.get("start_date") as string)
  const end_date = new Date(formData.get("end_date") as string)

  try {
    // If this is the first session, make it current automatically
    const existingSessionsCount = await prisma.academicSession.count({
      where: { tenant_id: appUser.tenant_id }
    })
    const is_current = existingSessionsCount === 0

    await prisma.academicSession.create({
      data: {
        tenant_id: appUser.tenant_id,
        name,
        start_date,
        end_date,
        is_current
      }
    })
    
    revalidatePath("/tenant/admin/academics/sessions")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function setActiveAcademicSession(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const session_id = formData.get("session_id") as string

  try {
    // Transaction to ensure exactly one session is active
    await prisma.$transaction([
      prisma.academicSession.updateMany({
        where: { tenant_id: appUser.tenant_id },
        data: { is_current: false }
      }),
      prisma.academicSession.update({
        where: { id: session_id },
        data: { is_current: true }
      })
    ])

    revalidatePath("/tenant/admin/academics/sessions")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteAcademicSession(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const session_id = formData.get("id") as string

  try {
    await prisma.academicSession.delete({
      where: { id: session_id }
    })
    
    revalidatePath("/tenant/admin/academics/sessions")
    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2003') return { error: "Cannot delete this session because it has dependent records (terms, enrollments, etc)." }
    return { error: error.message }
  }
}

export async function createAcademicTerm(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const session_id = formData.get("session_id") as string
  const name = formData.get("name") as any // FIRST_TERM, SECOND_TERM, THIRD_TERM
  const start_date = new Date(formData.get("start_date") as string)
  const end_date = new Date(formData.get("end_date") as string)
  const next_term_resumption_date_raw = formData.get("next_term_resumption_date") as string
  const next_term_resumption_date = next_term_resumption_date_raw ? new Date(next_term_resumption_date_raw) : null

  try {
    // Check if term name already exists in this session
    const existing = await prisma.academicTerm.findFirst({
      where: { tenant_id: appUser.tenant_id, session_id, name }
    })
    if (existing) return { error: "This term already exists for this session." }

    await prisma.academicTerm.create({
      data: {
        tenant_id: appUser.tenant_id,
        session_id,
        name,
        start_date,
        end_date,
        next_term_resumption_date
      }
    })
    
    revalidatePath("/tenant/admin/academics/sessions")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function setActiveAcademicTerm(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const term_id = formData.get("term_id") as string

  try {
    // Transaction to ensure exactly one term globally for this tenant is active
    await prisma.$transaction([
      prisma.academicTerm.updateMany({
        where: { tenant_id: appUser.tenant_id },
        data: { is_current: false }
      }),
      prisma.academicTerm.update({
        where: { id: term_id },
        data: { is_current: true }
      })
    ])

    revalidatePath("/tenant/admin/academics/sessions")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteAcademicTerm(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const term_id = formData.get("id") as string

  try {
    await prisma.academicTerm.delete({
      where: { id: term_id }
    })
    
    revalidatePath("/tenant/admin/academics/sessions")
    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2003') return { error: "Cannot delete this term because it has dependent records (scores, reports, etc)." }
    return { error: error.message }
  }
}
