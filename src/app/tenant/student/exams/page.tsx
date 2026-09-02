import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import StudentExamsClient from "./StudentExamsClient"

export default async function StudentExamsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const appUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { student: true }
  })

  if (!appUser || !appUser.student) return <div>Access Denied</div>

  // Fetch the active term for this tenant
  const activeTerm = await prisma.academicTerm.findFirst({
    where: { tenant_id: appUser.tenant_id, is_current: true }
  })

  if (!activeTerm) {
    return <div>No active academic term found.</div>
  }

  // Fetch exams for the student's current class arm
  // We need to find all ClassSubjects for the student's current_class_arm_id in the active term
  // Then find exams linked to those ClassSubjects
  const classSubjects = await prisma.classSubject.findMany({
    where: { 
      class_arm_id: appUser.student.current_class_arm_id!,
      session_id: activeTerm.session_id
    }
  })

  const classSubjectIds = classSubjects.map(cs => cs.id)

  const availableExams = await prisma.exam.findMany({
    where: {
      class_subject_id: { in: classSubjectIds },
      term_id: activeTerm.id,
      is_published: true
    },
    include: {
      class_subject: { include: { subject: true } },
      questions: { include: { options: { select: { id: true, text: true } } } }, // Do not leak is_correct to the client!!
      attempts: {
        where: { student_id: appUser.student.id }
      }
    }
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C3531]">My Exams</h1>
        <p className="text-[#788B81]">Take pending computer-based tests and view your scores.</p>
      </div>

      <StudentExamsClient availableExams={availableExams} />
    </div>
  )
}
