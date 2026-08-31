"use client"
import { useState } from "react"
import { PlusCircle, Search, Filter, MoreVertical, GraduationCap } from "lucide-react"

const dummyStudents = [
  { id: "OMV-001", name: "John Doe", class: "JSS 1 A", status: "Active", gender: "M" },
  { id: "OMV-002", name: "Jane Smith", class: "SS 2 Science", status: "Active", gender: "F" },
  { id: "OMV-003", name: "Michael Johnson", class: "Primary 4", status: "Inactive", gender: "M" },
  { id: "OMV-004", name: "Sarah Williams", class: "JSS 3 B", status: "Active", gender: "F" },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3531]">Student Directory</h1>
          <p className="text-[#788B81] mt-1 font-medium">Manage all enrolled students across the institution.</p>
        </div>
        <button className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center w-fit">
          <PlusCircle className="w-4 h-4 mr-2" /> Add Student
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[600px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden flex flex-col h-full">
          
          {/* Toolbar */}
          <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
              <input 
                type="text" 
                placeholder="Search by name or admission number..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm"
              />
            </div>
            <button className="flex items-center text-sm font-bold text-[#2C3531] bg-white border border-[#788B81]/20 px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#F4F1EC]/50 transition-colors">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="min-w-full divide-y divide-[#788B81]/10">
              <thead className="bg-[#F4F1EC]/10">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Student</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Class</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Gender</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#788B81]/10">
                {dummyStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-[#F4F1EC] rounded-full border border-[#788B81]/20 flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-[#2C3531]" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-[#2C3531]">{student.name}</div>
                          <div className="text-xs font-medium text-[#788B81]">{student.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-xs font-bold text-[#2C3531] bg-[#F4F1EC] px-3 py-1 rounded-full">{student.class}</span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-[#788B81]">
                      {student.gender}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                        student.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
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

          <div className="bg-[#F4F1EC]/30 px-8 py-4 border-t border-[#788B81]/10 flex justify-between items-center">
            <p className="text-sm font-bold text-[#788B81]">Showing {dummyStudents.length} students</p>
          </div>

        </div>
      </div>
    </div>
  )
}
