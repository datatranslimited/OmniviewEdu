import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import AttendanceClient from "./AttendanceClient"

export default async function AttendancePage() {
  // FRONTEND-FIRST MOCK

  // FRONTEND-FIRST: We render the interactive attendance dashboard with dummy data
  
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <AttendanceClient />
    </div>
  )
}
