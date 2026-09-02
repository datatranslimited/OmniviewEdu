import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import ParentDashboardClient from "./ParentDashboardClient"

export default async function ParentDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  // We are allowing SUPER_ADMIN to test this page without redirecting
  if (!appUser || (appUser.role !== 'PARENT' && appUser.role !== 'SUPER_ADMIN')) {
    redirect("/tenant/admin/dashboard")
  }

  let wards: any[] = []

  try {
    const guardian = await prisma.guardian.findFirst({
      where: { tenant_id: appUser.tenant_id, user_id: user.id }
    })

    if (guardian) {
      const studentLinks = await prisma.studentGuardian.findMany({
        where: { guardian_id: guardian.id },
        include: {
          student: {
            include: {
              current_class_arm: true
            }
          }
        }
      })
      
      wards = studentLinks.map(link => link.student)
    }
  } catch (error) {
    console.error("Failed to fetch parent data:", error)
  }

  return <ParentDashboardClient appUser={appUser} wards={wards} />
}
