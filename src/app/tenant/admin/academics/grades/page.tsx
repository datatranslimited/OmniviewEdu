"use client"
import { PlusCircle, Search, Settings } from "lucide-react"
import { useState } from "react"
import AcademicsTabs from "@/components/academics/AcademicsTabs"
import GradeConfigClient from "@/app/tenant/admin/academics/grades/GradeConfigClient"

export default function GradesPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3531]">Academics Management</h1>
          <p className="text-[#788B81] mt-1 font-medium">Manage classes, subjects, and grading structures.</p>
        </div>
      </div>

      <AcademicsTabs />

      <GradeConfigClient />
      
    </div>
  )
}
