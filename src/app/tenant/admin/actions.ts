"use server"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"

export async function setupAcademicSession(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!appUser || appUser.role !== 'SUPER_ADMIN') {
    return { error: "Forbidden: Only Super Admins can perform setup" }
  }

  const sessionName = formData.get("session_name") as string
  const startDate = formData.get("start_date") as string
  const endDate = formData.get("end_date") as string

  if (!sessionName || !startDate || !endDate) {
    return { error: "All fields are required" }
  }

  try {
    // Basic multi-tenant insertion
    await prisma.academicSession.create({
      data: {
        tenant_id: appUser.tenant_id,
        name: sessionName,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        is_current: true, // First one is automatically current
      }
    })

    revalidatePath("/tenant/admin/setup")
    return { success: true }
  } catch (error: any) {
    console.error("Setup failed:", error)
    return { error: error.message || "Database error occurred" }
  }
}

export async function generateClassLevels(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const sections = formData.getAll("sections") as string[]
  if (sections.length === 0) return { error: "Please select at least one section" }

  const classLevelData: any[] = []

  if (sections.includes("CRECHE")) classLevelData.push({ name: "Creche", section: "CRECHE", order_index: 1 })
  if (sections.includes("NURSERY")) {
    classLevelData.push({ name: "Nursery 1", section: "NURSERY", order_index: 2 })
    classLevelData.push({ name: "Nursery 2", section: "NURSERY", order_index: 3 })
  }
  if (sections.includes("PRIMARY")) {
    for (let i = 1; i <= 6; i++) classLevelData.push({ name: `Primary ${i}`, section: "PRIMARY", order_index: 3 + i })
  }
  if (sections.includes("JUNIOR_SECONDARY")) {
    for (let i = 1; i <= 3; i++) classLevelData.push({ name: `JSS ${i}`, section: "JUNIOR_SECONDARY", order_index: 9 + i })
  }
  if (sections.includes("SENIOR_SECONDARY")) {
    for (let i = 1; i <= 3; i++) classLevelData.push({ name: `SSS ${i}`, section: "SENIOR_SECONDARY", order_index: 12 + i })
  }

  try {
    await prisma.classLevel.createMany({
      data: classLevelData.map(cls => ({ ...cls, tenant_id: appUser.tenant_id }))
    })
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function generateClassArms(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const suffixesRaw = formData.get("suffixes") as string
  const suffixes = suffixesRaw.split(",").map(s => s.trim()).filter(Boolean)
  
  if (suffixes.length === 0) suffixes.push("") // Default to empty string if no arms

  try {
    const classLevels = await prisma.classLevel.findMany({
      where: { tenant_id: appUser.tenant_id }
    })

    const classArmData: any[] = []
    
    for (const level of classLevels) {
      for (const suffix of suffixes) {
        const armName = suffix ? `${level.name} ${suffix}` : level.name
        classArmData.push({
          tenant_id: appUser.tenant_id,
          class_level_id: level.id,
          name: armName,
        })
      }
    }

    await prisma.classArm.createMany({ data: classArmData })
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function generateSubjects(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const appUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!appUser || appUser.role !== 'SUPER_ADMIN') return { error: "Forbidden" }

  const primarySubjects = formData.getAll("primary_subjects") as string[]
  const secondarySubjects = formData.getAll("secondary_subjects") as string[]

  try {
    // Check if subjects already exist to prevent duplicates if clicked twice
    const existingSubjects = await prisma.subject.findMany({
      where: { tenant_id: appUser.tenant_id }
    })
    const existingNames = new Set(existingSubjects.map(s => `${s.name}-${s.section}`))

    const subjectData: any[] = []

    primarySubjects.forEach(name => {
      if (!existingNames.has(`${name}-PRIMARY`)) {
        subjectData.push({ tenant_id: appUser.tenant_id, name, section: "PRIMARY", code: name.substring(0, 3).toUpperCase() })
      }
    })

    secondarySubjects.forEach(name => {
      if (!existingNames.has(`${name}-SENIOR_SECONDARY`)) {
        subjectData.push({ tenant_id: appUser.tenant_id, name, section: "SENIOR_SECONDARY", code: name.substring(0, 3).toUpperCase() })
      }
    })

    if (subjectData.length > 0) {
      await prisma.subject.createMany({ data: subjectData })
    }

    revalidatePath("/tenant/dashboard")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
