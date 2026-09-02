"use server"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function setupTestAccounts() {
  const supabase = await createClient()

  const testAccounts = [
    { email: "admin@omniview.edu", password: "Password123!", role: "SUPER_ADMIN", first_name: "Sarah", last_name: "Admin" },
    { email: "teacher@omniview.edu", password: "Password123!", role: "TEACHER", first_name: "John", last_name: "Doe" },
    { email: "parent@omniview.edu", password: "Password123!", role: "PARENT", first_name: "Mary", last_name: "Smith" },
    { email: "student@omniview.edu", password: "Password123!", role: "STUDENT", first_name: "Jimmy", last_name: "Neutron" }
  ]

  let results = []

  // Ensure we have a default tenant
  let tenant = await prisma.tenant.findFirst({ where: { is_active: true } })
  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        name: "Omniview Academy Default",
        slug: "default",
        email: "hello@omniview.edu",
        phone_number: "123456789"
      }
    })
  }

  for (const account of testAccounts) {
    // 1. Create in Supabase Auth (since Email Confirmation is OFF, this should succeed and be instantly active)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: account.email,
      password: account.password,
    })

    if (authError || !authData.user) {
      // If user already exists, let's try to fetch them or just skip
      results.push({ email: account.email, status: "Failed or Already Exists in Supabase Auth: " + authError?.message })
      continue
    }

    // 2. Create in Prisma, mapping the UUID
    try {
      const existingPrismaUser = await prisma.user.findUnique({ where: { id: authData.user.id } })
      
      if (!existingPrismaUser) {
        await prisma.user.create({
          data: {
            id: authData.user.id, // Map Supabase UUID to Prisma User ID
            tenant_id: tenant.id,
            email: account.email,
            first_name: account.first_name,
            last_name: account.last_name,
            role: account.role as any,
          }
        })

        // Also create role-specific records for Teacher or Parent
        if (account.role === "TEACHER") {
          await prisma.staffProfile.create({
            data: {
              user_id: authData.user.id
            }
          })
          
          // Find or create a subject and class subject so the teacher has something to test
          let subject = await prisma.subject.findFirst({ where: { tenant_id: tenant.id } })
          if (!subject) {
            subject = await prisma.subject.create({
              data: { tenant_id: tenant.id, name: "Mathematics", section: "JUNIOR_SECONDARY" }
            })
          }
          
          const classArm = await prisma.classArm.findFirst({ where: { tenant_id: tenant.id } })
          const session = await prisma.academicSession.findFirst({ where: { tenant_id: tenant.id } })
          
          if (classArm && session) {
            await prisma.classSubject.upsert({
              where: {
                class_arm_id_subject_id_session_id: {
                  class_arm_id: classArm.id,
                  subject_id: subject.id,
                  session_id: session.id
                }
              },
              create: {
                tenant_id: tenant.id,
                class_arm_id: classArm.id,
                subject_id: subject.id,
                session_id: session.id,
                teacher_id: authData.user.id
              },
              update: {
                teacher_id: authData.user.id
              }
            })
          }

        } else if (account.role === "PARENT") {
          await prisma.guardian.create({
            data: {
              tenant_id: tenant.id,
              user_id: authData.user.id,
              relationship_type: "MOTHER"
            }
          })
        } else if (account.role === "STUDENT") {
          
          // Ensure we have an active session, term, and class level/arm to link the student to for testing
          let activeSession = await prisma.academicSession.findFirst({ where: { tenant_id: tenant.id, is_current: true } })
          if (!activeSession) {
             activeSession = await prisma.academicSession.create({
               data: {
                 tenant_id: tenant.id,
                 name: "2026/2027",
                 start_date: new Date("2026-09-01"),
                 end_date: new Date("2027-07-01"),
                 is_current: true
               }
             })
             
             await prisma.academicTerm.create({
               data: {
                 tenant_id: tenant.id,
                 session_id: activeSession.id,
                 name: "FIRST_TERM",
                 start_date: new Date("2026-09-01"),
                 end_date: new Date("2026-12-15"),
                 is_current: true
               }
             })
          }

          let classLevel = await prisma.classLevel.findFirst({ where: { tenant_id: tenant.id } })
          if (!classLevel) {
            classLevel = await prisma.classLevel.create({
              data: {
                tenant_id: tenant.id,
                name: "JSS 1",
                section: "JUNIOR_SECONDARY",
                order_index: 7
              }
            })
          }

          let classArm = await prisma.classArm.findFirst({ where: { class_level_id: classLevel.id } })
          if (!classArm) {
            classArm = await prisma.classArm.create({
              data: { tenant_id: tenant.id, class_level_id: classLevel.id, name: "Gold" }
            })
          }
          
          // Create Student
          await prisma.student.create({
            data: {
              tenant_id: tenant.id,
              user_id: authData.user.id,
              first_name: account.first_name,
              last_name: account.last_name,
              admission_number: "STD-001",
              current_class_arm_id: classArm.id,
            }
          })
        }

        results.push({ email: account.email, status: "Success" })
      }
    } catch (e: any) {
      results.push({ email: account.email, status: "Prisma Error: " + e.message })
    }
  }

  return { success: true, results }
}
