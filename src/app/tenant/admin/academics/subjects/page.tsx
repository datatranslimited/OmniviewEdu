import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SubjectsClient from "./SubjectsClient"
import AcademicsTabs from "@/components/academics/AcademicsTabs"

export default async function SubjectsPage() {
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

  let subjects: any[] = []
  let classArms: any[] = []
  let staffList: any[] = []
  let activeSession = null

  try {
    activeSession = await prisma.academicSession.findFirst({
      where: { tenant_id: appUser.tenant_id, is_current: true }
    })

    subjects = await prisma.subject.findMany({
      where: { tenant_id: appUser.tenant_id },
      include: {
        class_subjects: {
          where: activeSession ? { session_id: activeSession.id } : undefined,
          include: {
            class_arm: {
              include: { class_level: true }
            },
            teacher: true
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    classArms = await prisma.classArm.findMany({
      where: { tenant_id: appUser.tenant_id },
      include: { class_level: true },
      orderBy: [
        { class_level: { order_index: 'asc' } },
        { name: 'asc' }
      ]
    })

    staffList = await prisma.user.findMany({
      where: { 
        tenant_id: appUser.tenant_id,
        role: 'TEACHER',
        is_active: true
      },
      orderBy: { first_name: 'asc' }
    })

  } catch (error) {
    console.error("Failed to fetch subjects data:", error)
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academics</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your school's global subjects and allocate them to class arms.
          </p>
        </div>
      </div>

      <AcademicsTabs />
      
      <SubjectsClient 
        initialSubjects={subjects} 
        classArms={classArms}
        staffList={staffList}
        activeSession={activeSession}
      />
    </div>
  )
}
