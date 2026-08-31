import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import SubjectsClient from "./SubjectsClient"
import AcademicsTabs from "@/components/academics/AcademicsTabs"

export default async function AcademicsPage() {
  // FRONTEND-FIRST MOCK
  const subjects: any[] = []

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Academics Management</h1>
        <p className="text-gray-500 mt-1">Configure your subjects, classes, and terms.</p>
      </div>

      <AcademicsTabs />

      {/* Render the Subjects Management Client Component */}
      <SubjectsClient subjects={subjects} />
    </div>
  )
}
