"use server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function onboardStaff(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const first_name = formData.get("first_name") as string
  const last_name = formData.get("last_name") as string
  const email = formData.get("email") as string
  const phone_number = formData.get("phone_number") as string
  const role = formData.get("role") as any

  // HR Details
  const guarantor_name = formData.get("guarantor_name") as string
  const guarantor_phone = formData.get("guarantor_phone") as string
  const guarantor_address = formData.get("guarantor_address") as string
  const education_level = formData.get("education_level") as string
  const bank_name = formData.get("bank_name") as string
  const account_number = formData.get("account_number") as string
  const account_name = formData.get("account_name") as string

  if (!email || !first_name || !last_name) {
    return { error: "First Name, Last Name, and Email are required" }
  }

  const adminClient = createAdminClient()

  try {
    // 1. Create Supabase Auth Account
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password: "Welcome@123",
      email_confirm: true,
      user_metadata: { first_name, last_name, role }
    })

    if (authError) throw authError

    const newUserId = authData.user.id

    // 2. Create Prisma User & Staff Profile inside a transaction
    await prisma.$transaction(async (tx: any) => {
      await tx.user.create({
        data: {
          id: newUserId,
          tenant_id: appUser.tenant_id,
          first_name,
          last_name,
          email,
          phone_number,
          role,
          is_active: true
        }
      })

      await tx.staffProfile.create({
        data: {
          user_id: newUserId,
          guarantor_name: guarantor_name || null,
          guarantor_phone: guarantor_phone || null,
          guarantor_address: guarantor_address || null,
          education_level: education_level || null,
          bank_name: bank_name || null,
          account_number: account_number || null,
          account_name: account_name || null
        }
      })
    })

    revalidatePath("/tenant/admin/staff")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to onboard staff member" }
  }
}
