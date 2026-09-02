import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import WardDetailsClient from "./WardDetailsClient"

export default async function WardDetailsPage({ params }: { params: { student_id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser || (appUser.role !== 'PARENT' && appUser.role !== 'SUPER_ADMIN')) {
    redirect("/tenant/admin/dashboard")
  }

  const student_id = params.student_id

  // Verify the parent has access to this student
  if (appUser.role === 'PARENT') {
    const guardian = await prisma.guardian.findFirst({
      where: { tenant_id: appUser.tenant_id, user_id: user.id }
    })
    
    if (!guardian) redirect("/tenant/parent")

    const link = await prisma.studentGuardian.findUnique({
      where: {
        student_id_guardian_id: {
          student_id,
          guardian_id: guardian.id
        }
      }
    })

    if (!link) redirect("/tenant/parent")
  }

  // Fetch Student data
  const student = await prisma.student.findUnique({
    where: { id: student_id },
    include: { current_class_arm: true }
  })

  if (!student) redirect("/tenant/parent")

  // Fetch Active Term
  const activeTerm = await prisma.academicTerm.findFirst({
    where: { tenant_id: appUser.tenant_id, is_current: true }
  })

  let scores: any[] = []
  let aiDigests: any[] = []

  if (activeTerm && student.current_class_arm_id) {
    scores = await prisma.studentSubjectScore.findMany({
      where: {
        student_id,
        term_id: activeTerm.id
      },
      include: {
        class_subject: {
          include: { subject: true }
        }
      }
    })

    aiDigests = await prisma.aiWeeklyDigest.findMany({
      where: {
        class_arm_id: student.current_class_arm_id,
        term_id: activeTerm.id,
        status: 'GENERATED'
      },
      orderBy: {
        week_number: 'desc'
      }
    })
  }

  return (
    <WardDetailsClient 
      student={student} 
      activeTerm={activeTerm} 
      scores={scores} 
      aiDigests={aiDigests} 
    />
  )
}
