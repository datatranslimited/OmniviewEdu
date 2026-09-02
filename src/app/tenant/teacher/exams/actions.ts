"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createExam(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { tenant: true }
  })

  if (!appUser || appUser.role !== 'TEACHER') {
    return { error: "Unauthorized" }
  }

  const title = formData.get("title") as string
  const duration = parseInt(formData.get("duration") as string) || 30
  const classSubjectId = formData.get("classSubjectId") as string
  
  // Parse questions from formData. 
  // We expect something like question[0][text], question[0][options][0][text], question[0][options][0][isCorrect]
  const rawQuestionsStr = formData.get("questionsPayload") as string
  let questions = []
  try {
    questions = JSON.parse(rawQuestionsStr)
  } catch (e) {
    return { error: "Invalid questions payload" }
  }

  // Get current active term
  const activeTerm = await prisma.academicTerm.findFirst({
    where: { tenant_id: appUser.tenant_id, is_current: true }
  })

  if (!activeTerm) {
    return { error: "No active term found" }
  }

  try {
    const exam = await prisma.exam.create({
      data: {
        tenant_id: appUser.tenant_id,
        term_id: activeTerm.id,
        class_subject_id: classSubjectId,
        title,
        duration_minutes: duration,
        is_published: true, // Auto publish for MVP
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            marks: parseInt(q.marks) || 1,
            options: {
              create: q.options.map((opt: any) => ({
                text: opt.text,
                is_correct: opt.isCorrect
              }))
            }
          }))
        }
      }
    })

    revalidatePath("/tenant/teacher/exams")
    return { success: true, examId: exam.id }
  } catch (e: any) {
    return { error: "Failed to create exam: " + e.message }
  }
}
