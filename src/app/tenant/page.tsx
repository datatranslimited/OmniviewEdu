import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"

export default async function TenantEntryPoint() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser) {
    redirect('/auth/setup')
  }

  // Redirect based on role
  if (appUser.role === "SUPER_ADMIN") redirect('/tenant/admin')
  if (appUser.role === "TEACHER") redirect('/tenant/teacher')
  if (appUser.role === "STUDENT") redirect('/tenant/student')
  if (appUser.role === "PARENT") redirect('/tenant/parent')
  if (appUser.role === "PLATFORM_OWNER") redirect('/platform')

  // Fallback
  redirect('/auth/login')
}
