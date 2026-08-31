"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"

export async function login(formData: FormData) {
  const supabase = await createClient()

  // For this generic demo, we'll assume email is used
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/tenant/dashboard")
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  const schoolName = formData.get("school-name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!schoolName || !email || !password) {
    return { error: "All fields are required" }
  }

  // Generate a basic slug from the school name
  const slug = schoolName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

  // 1. Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { error: authError?.message || "Failed to create user account" }
  }

  const userId = authData.user.id

  try {
    // 2. Create the Tenant and the User in our public schema using a Prisma Transaction
    await prisma.$transaction(async (tx: any) => {
      // Create Tenant
      const tenant = await tx.tenant.create({
        data: {
          name: schoolName,
          slug: slug,
          email: email,
          phone_number: "0000000000", // Default placeholder
        },
      })

      // Create Admin User
      await tx.user.create({
        data: {
          id: userId, // Link to Supabase Auth UUID
          tenant_id: tenant.id,
          email: email,
          role: "SUPER_ADMIN",
          first_name: "Admin",
          last_name: "User",
        },
      })
    })
  } catch (dbError: any) {
    console.error("Database transaction failed:", dbError)
    
    // Ideally, we'd delete the orphaned Supabase user here using the Supabase Admin API.
    // For now, we return the database error.
    return { 
      error: "Account created but database setup failed. Please contact support.",
      details: dbError.message 
    }
  }

  revalidatePath("/", "layout")
  redirect("/tenant/dashboard")
}
