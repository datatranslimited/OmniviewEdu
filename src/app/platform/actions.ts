"use server"

import prisma from "@/lib/prisma"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function provisionNewSchool(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const phone = formData.get("phone") as string
  
  const adminFirstName = formData.get("adminFirstName") as string
  const adminLastName = formData.get("adminLastName") as string
  const adminEmail = formData.get("adminEmail") as string
  const subscriptionPlan = formData.get("subscriptionPlan") as string

  if (!name || !slug || !adminEmail || !adminFirstName || !adminLastName) {
    return { error: "Please fill in all required fields." }
  }

  // 1. Check if slug or admin email is already taken
  const existingTenant = await prisma.tenant.findUnique({ where: { slug } })
  if (existingTenant) {
    return { error: "A school with this slug already exists." }
  }

  const adminClient = createAdminClient()

  // Check Supabase Auth
  const { data: existingAuthUsers, error: listError } = await adminClient.auth.admin.listUsers()
  if (listError) return { error: `Supabase Error: ${listError.message}` }
  
  const isAuthEmailTaken = existingAuthUsers.users.find(u => u.email === adminEmail)
  if (isAuthEmailTaken) {
    return { error: "An account with this admin email already exists." }
  }

  // 2. Create Supabase Auth User
  const defaultPassword = "Password123!" // For MVP, hardcode or generate securely
  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email: adminEmail,
    password: defaultPassword,
    email_confirm: true
  })

  if (authError || !authData.user) {
    return { error: `Failed to create auth user: ${authError?.message}` }
  }

  const authUserId = authData.user.id

  // 3. Create Tenant and User in Prisma
  try {
    const tenant = await prisma.tenant.create({
      data: {
        name,
        slug,
        email: adminEmail,
        phone_number: phone || "",
        subscription_plan: subscriptionPlan || "STANDARD",
      }
    })

    await prisma.user.create({
      data: {
        id: authUserId,
        tenant_id: tenant.id,
        email: adminEmail,
        role: "SCHOOL_ADMIN",
        first_name: adminFirstName,
        last_name: adminLastName,
      }
    })
  } catch (error: any) {
    // Rollback: delete auth user if prisma fails
    await adminClient.auth.admin.deleteUser(authUserId)
    return { error: `Database Error: ${error.message}` }
  }

  revalidatePath('/platform')
  redirect('/platform/schools')
}
