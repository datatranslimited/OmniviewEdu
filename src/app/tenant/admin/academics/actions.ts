"use server"
import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createSubject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const name = formData.get("name") as string
  const section = formData.get("section") as any

  if (!name || !section) return { error: "Name and Section are required" }

  try {
    await prisma.subject.create({
      data: {
        tenant_id: appUser.tenant_id,
        name,
        section,
        code: name.substring(0, 3).toUpperCase()
      }
    })
    revalidatePath("/tenant/admin/academics")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateSubject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const section = formData.get("section") as any

  try {
    await prisma.subject.update({
      where: { id },
      data: { name, section, code: name.substring(0, 3).toUpperCase() }
    })
    revalidatePath("/tenant/admin/academics")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteSubject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const id = formData.get("id") as string

  try {
    await prisma.subject.delete({
      where: { id }
    })
    revalidatePath("/tenant/admin/academics")
    return { success: true }
  } catch (error: any) {
    // If it violates foreign key constraint (e.g. students have scores)
    if (error.code === 'P2003') {
      return { error: "Cannot delete this subject because students already have scores recorded. Please edit it instead." }
    }
    return { error: error.message || "Failed to delete subject" }
  }
}
