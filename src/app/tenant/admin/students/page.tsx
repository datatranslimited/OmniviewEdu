import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import StudentsClient from "./StudentsClient"

export default async function StudentsPage() {
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

  let students: any[] = []
  let classArms: any[] = []
  let activeSession = null

  try {
    activeSession = await prisma.academicSession.findFirst({
      where: { tenant_id: appUser.tenant_id, is_current: true }
    })

    students = await prisma.student.findMany({
      where: { tenant_id: appUser.tenant_id },
      include: {
        current_class_arm: {
          include: { class_level: true }
        }
      },
      orderBy: { first_name: 'asc' }
    })

    classArms = await prisma.classArm.findMany({
      where: { tenant_id: appUser.tenant_id },
      include: { class_level: true },
      orderBy: [
        { class_level: { order_index: 'asc' } },
        { name: 'asc' }
      ]
    })

  } catch (error) {
    console.error("Failed to fetch students data:", error)
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Directory</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage all enrolled students, their profiles, and active session assignments.
          </p>
        </div>
      </div>
      
      <StudentsClient 
        initialStudents={students} 
        classArms={classArms}
        activeSession={activeSession}
      />
    </div>
  )
}
