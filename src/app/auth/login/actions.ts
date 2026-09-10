"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function loginWithEmail(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Find their role in Prisma to determine where to redirect them
  const appUser = await prisma.user.findUnique({
    where: { id: data.user.id }
  })

  if (!appUser) {
    return { error: "User record not found in database." }
  }

  // Redirect based on role
  if (appUser.role === 'PLATFORM_OWNER') {
    redirect("/platform")
  } else if (appUser.role === 'SUPER_ADMIN') {
    redirect("/tenant/admin")
  } else if (appUser.role === 'TEACHER') {
    redirect("/tenant/teacher")
  } else if (appUser.role === 'PARENT') {
    redirect("/tenant/parent")
  } else if (appUser.role === 'STUDENT') {
    redirect("/tenant/student")
  } else {
    redirect("/tenant/dashboard")
  }
}

export async function logoutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}
