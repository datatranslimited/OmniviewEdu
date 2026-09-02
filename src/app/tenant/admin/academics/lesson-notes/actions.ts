"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { LessonNoteStatus, DigestStatus } from "@prisma/client"

export async function submitLessonNote(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser) return { error: "Forbidden" }

  const class_subject_id = formData.get("class_subject_id") as string
  const term_id = formData.get("term_id") as string
  const week_number = parseInt(formData.get("week_number") as string)
  const topic = formData.get("topic") as string
  const content = formData.get("content") as string

  try {
    await prisma.weeklyLessonNote.create({
      data: {
        tenant_id: appUser.tenant_id,
        class_subject_id,
        term_id,
        week_number,
        topic,
        learning_objectives: content,
        status: LessonNoteStatus.SUBMITTED_FOR_REVIEW
      }
    })
    
    revalidatePath("/tenant/admin/academics/lesson-notes")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function reviewLessonNote(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const note_id = formData.get("note_id") as string
  const status = formData.get("status") as LessonNoteStatus

  try {
    await prisma.weeklyLessonNote.update({
      where: { id: note_id },
      data: { status }
    })
    
    revalidatePath("/tenant/admin/academics/lesson-notes")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function generateAiDigest(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const class_arm_id = formData.get("class_arm_id") as string
  const term_id = formData.get("term_id") as string
  const week_number = parseInt(formData.get("week_number") as string)

  try {
    // 1. Gather all APPROVED lesson notes for this class in this week
    const approvedNotes = await prisma.weeklyLessonNote.findMany({
      where: {
        tenant_id: appUser.tenant_id,
        term_id,
        week_number,
        status: LessonNoteStatus.APPROVED,
        class_subject: { class_arm_id }
      },
      include: {
        class_subject: { include: { subject: true } }
      }
    })

    if (approvedNotes.length === 0) {
      return { error: "No APPROVED lesson notes found for this class and week." }
    }

    // 2. Simulate AI Processing Delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 3. Create the simulated Markdown Summary and Discussion Questions
    const topicsList = approvedNotes.map(n => `- **${n.class_subject.subject.name}:** ${n.topic}`).join("\n")
    
    const digest_summary_markdown = `### 🌟 Weekly Snapshot for Week ${week_number}\n\nThis week, your children have been exploring some fascinating new concepts across their subjects! Here is a quick breakdown of what they learned:\n\n${topicsList}\n\nOur teachers have prepared some excellent hands-on activities to reinforce these topics. We encourage you to ask them about it over dinner!`
    
    const discussion_questions_jsonb = [
      { subject: approvedNotes[0]?.class_subject.subject.name || "General", question: `Can you explain to me what you learned about ${approvedNotes[0]?.topic || "your classes"} this week?` },
      { subject: "Critical Thinking", question: "Which subject did you find the most challenging this week, and how did you overcome it?" }
    ]

    const raw_topics_payload = approvedNotes.map(n => ({ subject: n.class_subject.subject.name, topic: n.topic, content: n.learning_objectives }))

    // 4. Save to Database
    await prisma.aiWeeklyDigest.upsert({
      where: {
        class_arm_id_term_id_week_number: {
          class_arm_id,
          term_id,
          week_number
        }
      },
      update: {
        raw_topics_payload,
        digest_summary_markdown,
        discussion_questions_jsonb,
        status: DigestStatus.GENERATED,
        generated_at: new Date()
      },
      create: {
        tenant_id: appUser.tenant_id,
        class_arm_id,
        term_id,
        week_number,
        raw_topics_payload,
        digest_summary_markdown,
        discussion_questions_jsonb,
        status: DigestStatus.GENERATED
      }
    })
    
    revalidatePath("/tenant/admin/academics/lesson-notes")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
