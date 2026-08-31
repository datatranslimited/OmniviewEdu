import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import TimetableClient from "./TimetableClient"

export default async function TimetablePage() {
  // FRONTEND-FIRST MOCK

  // FRONTEND-FIRST: We render the interactive timetable dashboard with dummy data
  
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <TimetableClient />
    </div>
  )
}
