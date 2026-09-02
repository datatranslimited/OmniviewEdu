"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitExam(attemptId: string, answers: Record<string, string>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { student: true }
  })

  if (!appUser || !appUser.student) {
    return { error: "Student not found" }
  }

  // Verify the attempt belongs to this student and is IN_PROGRESS
  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: {
      exam: {
        include: { questions: { include: { options: true } } }
      }
    }
  })

  if (!attempt || attempt.student_id !== appUser.student.id || attempt.status === 'COMPLETED') {
    return { error: "Invalid or completed attempt" }
  }

  // Calculate score and build answer records
  let score = 0
  const studentAnswersToCreate: { question_id: string, selected_option_id: string }[] = []

  for (const question of attempt.exam.questions) {
    const selectedOptionId = answers[question.id]
    if (selectedOptionId) {
      const selectedOption = question.options.find(o => o.id === selectedOptionId)
      if (selectedOption?.is_correct) {
        score += question.marks
      }

      studentAnswersToCreate.push({
        question_id: question.id,
        selected_option_id: selectedOptionId
      })
    }
  }

  // Save the submission transactionally
  await prisma.$transaction(async (tx) => {
    // 1. Create the answers
    for (const ans of studentAnswersToCreate) {
      await tx.studentAnswer.create({
        data: {
          attempt_id: attempt.id,
          question_id: ans.question_id,
          selected_option_id: ans.selected_option_id
        }
      })
    }

    // 2. Mark attempt as completed
    await tx.examAttempt.update({
      where: { id: attempt.id },
      data: {
        status: "COMPLETED",
        completed_at: new Date(),
        score: score
      }
    })

    // 3. Optional: Sync score to StudentSubjectScore
    // Assuming total_score = sum of marks
    const totalMarks = attempt.exam.questions.reduce((sum, q) => sum + q.marks, 0)
    
    // Upsert the score (for MVP, we just overwrite the exam_score)
    // We need the class_subject_id from the exam
    const existingScore = await tx.studentSubjectScore.findUnique({
      where: {
        term_id_class_subject_id_student_id: {
          term_id: attempt.exam.term_id,
          class_subject_id: attempt.exam.class_subject_id,
          student_id: attempt.student_id
        }
      }
    })

    if (existingScore) {
      await tx.studentSubjectScore.update({
        where: { id: existingScore.id },
        data: { exam_score: score } // Convert to standard if needed, just saving raw score for MVP
      })
    } else {
      await tx.studentSubjectScore.create({
        data: {
          tenant_id: attempt.tenant_id,
          term_id: attempt.exam.term_id,
          class_subject_id: attempt.exam.class_subject_id,
          student_id: attempt.student_id,
          exam_score: score
        }
      })
    }
  })

  revalidatePath("/tenant/student/exams")
  return { success: true, score }
}

export async function startExamAttempt(examId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { student: true }
  })

  if (!appUser || !appUser.student) return { error: "Student not found" }

  // Check if attempt already exists
  const existing = await prisma.examAttempt.findUnique({
    where: {
      exam_id_student_id: {
        exam_id: examId,
        student_id: appUser.student.id
      }
    }
  })

  if (existing) {
    if (existing.status === 'COMPLETED') {
      return { error: "You have already completed this exam." }
    }
    return { success: true, attemptId: existing.id }
  }

  // Create new attempt
  const attempt = await prisma.examAttempt.create({
    data: {
      tenant_id: appUser.tenant_id,
      exam_id: examId,
      student_id: appUser.student.id
    }
  })

  revalidatePath("/tenant/student/exams")
  return { success: true, attemptId: attempt.id }
}
