"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createFeeCategory(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const name = formData.get("name") as string
  const description = formData.get("description") as string

  try {
    await prisma.feeCategory.create({
      data: {
        tenant_id: appUser.tenant_id,
        name,
        description
      }
    })
    revalidatePath("/tenant/admin/bursary/fees")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function createFeeStructure(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const fee_category_id = formData.get("fee_category_id") as string
  const class_level_id = formData.get("class_level_id") as string
  const term_id = formData.get("term_id") as string
  const amount = parseFloat(formData.get("amount") as string)
  const is_compulsory = formData.get("is_compulsory") === "true"

  try {
    // Check if structure already exists to avoid duplicates
    const existing = await prisma.feeStructure.findFirst({
      where: {
        tenant_id: appUser.tenant_id,
        term_id,
        class_level_id,
        fee_category_id
      }
    })

    if (existing) {
      // Update existing
      await prisma.feeStructure.update({
        where: { id: existing.id },
        data: { amount, is_compulsory }
      })
    } else {
      // Create new
      await prisma.feeStructure.create({
        data: {
          tenant_id: appUser.tenant_id,
          term_id,
          class_level_id,
          fee_category_id,
          amount,
          is_compulsory
        }
      })
    }

    revalidatePath("/tenant/admin/bursary/fees")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
