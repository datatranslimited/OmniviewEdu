import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AcademicsTabs from "@/components/academics/AcademicsTabs"
import LessonNotesClient from "./LessonNotesClient"

export default async function LessonNotesPage() {
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

  let activeSession = null
  let activeTerm = null
  let classSubjects: any[] = []
  let lessonNotes: any[] = []
  let aiDigests: any[] = []
  let classArms: any[] = []

  try {
    activeSession = await prisma.academicSession.findFirst({
      where: { tenant_id: appUser.tenant_id, is_current: true }
    })

    if (activeSession) {
      activeTerm = await prisma.academicTerm.findFirst({
        where: { tenant_id: appUser.tenant_id, session_id: activeSession.id, is_current: true }
      })

      if (activeTerm) {
        // Fetch allocations for the dropdown
        classSubjects = await prisma.classSubject.findMany({
          where: { tenant_id: appUser.tenant_id, session_id: activeSession.id },
          include: {
            subject: true,
            class_arm: true,
            teacher: true
          }
        })

        // Fetch all lesson notes for this term
        lessonNotes = await prisma.weeklyLessonNote.findMany({
          where: { tenant_id: appUser.tenant_id, term_id: activeTerm.id },
          include: {
            class_subject: {
              include: { subject: true, class_arm: true, teacher: true }
            }
          },
          orderBy: { created_at: 'desc' }
        })

        // Fetch AI digests
        aiDigests = await prisma.aiWeeklyDigest.findMany({
          where: { tenant_id: appUser.tenant_id, term_id: activeTerm.id },
          include: { class_arm: true },
          orderBy: { generated_at: 'desc' }
        })

        // Fetch class arms for the AI generation dropdown
        classArms = await prisma.classArm.findMany({
          where: { tenant_id: appUser.tenant_id },
          orderBy: { name: 'asc' }
        })
      }
    }
  } catch (error) {
    console.error("Failed to fetch lesson notes data:", error)
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Engagement Engine</h1>
          <p className="mt-2 text-sm text-gray-600">
            Submit, approve, and auto-generate Weekly Parent Nuggets from lesson plans.
          </p>
        </div>
      </div>

      <AcademicsTabs />
      
      <LessonNotesClient 
        activeTerm={activeTerm}
        classSubjects={classSubjects}
        lessonNotes={lessonNotes}
        aiDigests={aiDigests}
        classArms={classArms}
      />
    </div>
  )
}
