import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import TeacherExamsClient from "./TeacherExamsClient"

export default async function TeacherExamsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch the teacher's class subjects
  const classSubjects = await prisma.classSubject.findMany({
    where: { teacher_id: user.id },
    include: {
      class_arm: { include: { class_level: true } },
      subject: true
    }
  })

  // Fetch exams created for these class subjects
  const classSubjectIds = classSubjects.map(cs => cs.id)
  
  const existingExams = await prisma.exam.findMany({
    where: { class_subject_id: { in: classSubjectIds } },
    include: {
      class_subject: {
        include: {
          class_arm: { include: { class_level: true } },
          subject: true
        }
      },
      _count: {
        select: { questions: true, attempts: true }
      }
    },
    orderBy: { created_at: 'desc' }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3531]">CBT Exams Engine</h1>
          <p className="text-[#788B81]">Create and manage timed multiple-choice tests.</p>
        </div>
      </div>

      <TeacherExamsClient 
        classSubjects={classSubjects} 
        existingExams={existingExams} 
      />
    </div>
  )
}
