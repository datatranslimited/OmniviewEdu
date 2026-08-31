"use client"
import { PlusCircle, Search, MoreVertical, BookOpen } from "lucide-react"
import { useState } from "react"
import AcademicsTabs from "@/components/academics/AcademicsTabs"

const dummySubjects = [
  { id: "SUB-001", name: "Mathematics", code: "MTH101", type: "Core", department: "Science" },
  { id: "SUB-002", name: "English Language", code: "ENG101", type: "Core", department: "Arts" },
  { id: "SUB-003", name: "Further Mathematics", code: "MTH201", type: "Elective", department: "Science" },
]

export default function SubjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3531]">Academics Management</h1>
          <p className="text-[#788B81] mt-1 font-medium">Manage classes, subjects, and grading structures.</p>
        </div>
      </div>

      <AcademicsTabs />

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden flex flex-col h-full">
          
          <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
              <input 
                type="text" 
                placeholder="Search subjects..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm"
              />
            </div>
            <button className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center">
              <PlusCircle className="w-4 h-4 mr-2" /> Add Subject
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="min-w-full divide-y divide-[#788B81]/10">
              <thead className="bg-[#F4F1EC]/10">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Subject</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Code</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Type</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Department</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#788B81]/10">
                {dummySubjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-[#F4F1EC] rounded-full border border-[#788B81]/20 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-[#2C3531]" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-[#2C3531]">{sub.name}</div>
                          <div className="text-xs font-medium text-[#788B81]">{sub.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-xs font-bold text-[#2C3531] bg-[#F4F1EC] px-3 py-1 rounded-full">{sub.code}</span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                        sub.type === 'Core' ? 'bg-blue-100 text-blue-800' : 'bg-[#788B81]/20 text-[#2C3531]'
                      }`}>
                        {sub.type}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-[#788B81]">
                      {sub.department}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#788B81] hover:text-[#2C3531] transition-colors p-2 rounded-lg hover:bg-[#F4F1EC]">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
