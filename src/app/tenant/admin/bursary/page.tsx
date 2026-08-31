import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import BursaryClient from "./BursaryClient"

export default async function BursaryPage() {
  // FRONTEND-FIRST MOCK

  // FRONTEND-FIRST: We are not fetching any real database data yet. 
  // We just render the client component which contains all the dummy data for UI review.
  
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <BursaryClient />
    </div>
  )
}
