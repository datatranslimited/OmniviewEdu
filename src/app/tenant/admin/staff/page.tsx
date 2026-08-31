import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import StaffClient from "./StaffClient"

export default async function StaffPage() {
  // FRONTEND-FIRST MOCK
  const staffMembers: any[] = []

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <StaffClient staffMembers={staffMembers} />
    </div>
  )
}
