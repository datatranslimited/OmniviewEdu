"use server"
import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createClassLevel(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const name = formData.get("name") as string
  const section = formData.get("section") as any
  const order_index = parseInt(formData.get("order_index") as string) || 1

  try {
    await prisma.classLevel.create({
      data: { tenant_id: appUser.tenant_id, name, section, order_index }
    })
    revalidatePath("/tenant/admin/academics/classes")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateClassLevel(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const section = formData.get("section") as any
  const order_index = parseInt(formData.get("order_index") as string) || 1

  try {
    await prisma.classLevel.update({
      where: { id },
      data: { name, section, order_index }
    })
    revalidatePath("/tenant/admin/academics/classes")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteClassLevel(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const id = formData.get("id") as string

  try {
    await prisma.classLevel.delete({ where: { id } })
    revalidatePath("/tenant/admin/academics/classes")
    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2003') return { error: "Cannot delete this Class Level because it contains enrolled students or arms." }
    return { error: error.message || "Failed to delete" }
  }
}

export async function createClassArm(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const class_level_id = formData.get("class_level_id") as string
  const name = formData.get("name") as string

  try {
    await prisma.classArm.create({
      data: { tenant_id: appUser.tenant_id, class_level_id, name }
    })
    revalidatePath("/tenant/admin/academics/classes")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteClassArm(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const id = formData.get("id") as string

  try {
    await prisma.classArm.delete({ where: { id } })
    revalidatePath("/tenant/admin/academics/classes")
    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2003') return { error: "Cannot delete this Arm because it contains enrolled students." }
    return { error: error.message || "Failed to delete" }
  }
}
