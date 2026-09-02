import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AcademicsTabs from "@/components/academics/AcademicsTabs"
import ScoreEntryClient from "./ScoreEntryClient"

export default async function ScoresPage({
  searchParams,
}: {
  searchParams: { class_subject_id?: string }
}) {
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
  let enrolledStudents: any[] = []
  let existingScores: any[] = []

  try {
    activeSession = await prisma.academicSession.findFirst({
      where: { tenant_id: appUser.tenant_id, is_current: true }
    })

    if (activeSession) {
      activeTerm = await prisma.academicTerm.findFirst({
        where: { tenant_id: appUser.tenant_id, session_id: activeSession.id, is_current: true }
      })

      // Fetch all allocated subjects for this active session
      classSubjects = await prisma.classSubject.findMany({
        where: { tenant_id: appUser.tenant_id, session_id: activeSession.id },
        include: {
          subject: true,
          class_arm: true,
          teacher: true
        },
        orderBy: [
          { class_arm: { name: 'asc' } },
          { subject: { name: 'asc' } }
        ]
      })

      // If a specific class_subject is selected, fetch students and scores
      if (searchParams.class_subject_id && activeTerm) {
        const selectedAllocation = classSubjects.find(cs => cs.id === searchParams.class_subject_id)
        
        if (selectedAllocation) {
          // Fetch enrolled students for that specific class arm and session
          enrolledStudents = await prisma.studentSessionEnrollment.findMany({
            where: {
              tenant_id: appUser.tenant_id,
              session_id: activeSession.id,
              class_arm_id: selectedAllocation.class_arm_id
            },
            include: {
              student: true
            },
            orderBy: {
              student: { first_name: 'asc' }
            }
          })

          // Fetch existing scores
          existingScores = await prisma.studentSubjectScore.findMany({
            where: {
              tenant_id: appUser.tenant_id,
              term_id: activeTerm.id,
              class_subject_id: searchParams.class_subject_id
            }
          })
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch score data:", error)
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Score Entry</h1>
          <p className="mt-2 text-sm text-gray-600">
            Input CA and Exam scores for enrolled students in the currently active academic term.
          </p>
        </div>
      </div>

      <AcademicsTabs />
      
      <ScoreEntryClient 
        activeTerm={activeTerm}
        classSubjects={classSubjects}
        enrolledStudents={enrolledStudents}
        existingScores={existingScores}
        selectedClassSubjectId={searchParams.class_subject_id || ""}
      />
    </div>
  )
}
