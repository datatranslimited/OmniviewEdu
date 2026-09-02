import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SessionsClient from "./SessionsClient"
import AcademicsTabs from "@/components/academics/AcademicsTabs"

export default async function SessionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser || appUser.role !== 'SUPER_ADMIN') {
    redirect("/tenant/admin/dashboard")
  }

  let sessions: any[] = []
  
  try {
    sessions = await prisma.academicSession.findMany({
      where: { tenant_id: appUser.tenant_id },
      include: {
        terms: {
          orderBy: { start_date: 'asc' }
        }
      },
      orderBy: { start_date: 'desc' }
    })
  } catch (error) {
    console.error("Failed to fetch sessions:", error)
    // Return empty array on DB error to avoid crashing the whole page
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academics</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your school's global state: academic sessions and terms.
          </p>
        </div>
      </div>

      <AcademicsTabs />
      
      <SessionsClient initialSessions={sessions} />
    </div>
  )
}
