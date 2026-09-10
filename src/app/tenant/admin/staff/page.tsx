import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import StaffClient from "./StaffClient"

export default async function StaffPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser || appUser.role !== 'SUPER_ADMIN') {
    redirect("/tenant")
  }

  // Fetch real staff members for this tenant
  let staffMembers: any[] = []
  try {
    staffMembers = await prisma.user.findMany({
      where: {
        tenant_id: appUser.tenant_id,
        role: {
          notIn: ['SUPER_ADMIN', 'PLATFORM_OWNER', 'STUDENT', 'PARENT'] as any
        }
      },
      include: {
        staff_profile: true
      },
      orderBy: { first_name: 'asc' }
    })
  } catch (error) {
    console.error("Failed to fetch staff members:", error)
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <StaffClient staffMembers={staffMembers} />
    </div>
  )
}
