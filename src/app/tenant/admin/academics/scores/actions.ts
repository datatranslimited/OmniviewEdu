"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

type ScorePayload = {
  student_id: string
  ca1_score: number | null
  ca2_score: number | null
  exam_score: number | null
}

export async function saveSubjectScores(
  class_subject_id: string,
  term_id: string,
  scores: ScorePayload[]
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || (appUser.role !== 'SUPER_ADMIN' && appUser.role !== 'TEACHER')) {
    return { error: "Forbidden" }
  }

  try {
    // Basic grading logic (can be expanded to pull from DB)
    const getGrade = (total: number) => {
      if (total >= 70) return "A"
      if (total >= 60) return "B"
      if (total >= 50) return "C"
      if (total >= 45) return "D"
      if (total >= 40) return "E"
      return "F"
    }

    await prisma.$transaction(async (tx) => {
      for (const score of scores) {
        const c1 = score.ca1_score || 0
        const c2 = score.ca2_score || 0
        const ex = score.exam_score || 0
        const total = c1 + c2 + ex
        const grade = getGrade(total)

        await tx.studentSubjectScore.upsert({
          where: {
            term_id_class_subject_id_student_id: {
              term_id,
              class_subject_id,
              student_id: score.student_id
            }
          },
          update: {
            ca1_score: score.ca1_score,
            ca2_score: score.ca2_score,
            exam_score: score.exam_score,
            total_score: total,
            grade
          },
          create: {
            tenant_id: appUser.tenant_id,
            term_id,
            class_subject_id,
            student_id: score.student_id,
            ca1_score: score.ca1_score,
            ca2_score: score.ca2_score,
            exam_score: score.exam_score,
            total_score: total,
            grade
          }
        })
      }
    })

    revalidatePath("/tenant/admin/academics/scores")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
