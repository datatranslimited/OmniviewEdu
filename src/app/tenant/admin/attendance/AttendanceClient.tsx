"use client"
import { useState } from "react"
import { formatUnambiguousDate } from "@/lib/formatDate"
import { Save } from "lucide-react"

// --- DUMMY DATA ---
const dummyClasses = ["Primary 1 Gold", "Primary 2 Silver", "JSS 1 A", "SS 3 Science"]

const initialStudents = [
  { id: 1, name: "John Doe", admission: "OMV-001", status: "Present" },
  { id: 2, name: "Jane Smith", admission: "OMV-002", status: "Present" },
  { id: 3, name: "Michael Johnson", admission: "OMV-003", status: "Present" },
  { id: 4, name: "Sarah Williams", admission: "OMV-004", status: "Present" },
]

const initialStaff = [
  { id: 101, name: "Mr. Ebenezer Ali", role: "Teacher", status: "Present" },
  { id: 102, name: "Mrs. Victoria Olayinka", role: "Bursar", status: "Present" },
  { id: 103, name: "Dr. Ahmed Musa", role: "Principal", status: "Present" },
]

export default function AttendanceClient() {
  const [view, setView] = useState<"students" | "staff">("students")
  const [selectedClass, setSelectedClass] = useState("Primary 1 Gold")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  
  const [students, setStudents] = useState(initialStudents)
  const [staff, setStaff] = useState(initialStaff)

  const handleStudentStatus = (id: number, status: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s))
  }

  const handleStaffStatus = (id: number, status: string) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status } : s))
  }

  const presentCount = view === "students" 
    ? students.filter(s => s.status === "Present").length 
    : staff.filter(s => s.status === "Present").length

  const totalCount = view === "students" ? students.length : staff.length

  return (
    <div className="space-y-6">
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#2C3531]">Daily Attendance</h2>
          <p className="text-[#788B81] mt-1 font-medium">Mark daily registers for students and staff.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-[#F4F1EC] p-1.5 rounded-2xl w-fit">
        <button 
          onClick={() => setView('students')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${view === 'students' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Student Attendance
        </button>
        <button 
          onClick={() => setView('staff')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${view === 'staff' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Staff Attendance
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden">
          
          {/* Top Filter Bar */}
          <div className="bg-[#F4F1EC]/30 px-8 py-6 border-b border-[#788B81]/10 flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex-1 max-w-[200px]">
              <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Date</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm"
              />
            </div>
            
            {view === "students" && (
              <div className="flex-1 max-w-[250px]">
                <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Select Class</label>
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm"
                >
                  {dummyClasses.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            )}

            <div className="flex-1 flex justify-end items-center mb-2">
              <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {presentCount} / {totalCount} Present
              </span>
            </div>
          </div>

          {/* Roll Call Grid */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#788B81]/10">
              <thead className="bg-white">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Name</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">ID / Role</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#788B81]/10">
                {(view === "students" ? students : staff).map((person: any) => (
                  <tr key={person.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-sm font-bold text-[#2C3531]">{person.name}</div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-xs font-bold text-[#788B81] bg-[#F4F1EC] px-3 py-1 rounded-full w-fit">{person.admission || person.role}</div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right">
                      <div className="inline-flex rounded-xl shadow-sm border border-[#788B81]/20 overflow-hidden" role="group">
                        {["Present", "Absent", "Late", "Excused"].map(status => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => view === "students" ? handleStudentStatus(person.id, status) : handleStaffStatus(person.id, status)}
                            className={`
                              px-5 py-2.5 text-xs font-bold transition-colors
                              ${person.status === status 
                                  ? (status === 'Present' ? 'bg-emerald-600 text-white' :
                                     status === 'Absent' ? 'bg-red-600 text-white' :
                                     status === 'Late' ? 'bg-amber-500 text-white' :
                                     'bg-[#788B81] text-white')
                                  : 'bg-white text-[#788B81] hover:bg-[#F4F1EC]/50'
                              }
                              ${status !== "Excused" ? "border-r border-[#788B81]/20" : ""}
                            `}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer / Publish Bar */}
          <div className="bg-[#F4F1EC]/30 px-8 py-5 border-t border-[#788B81]/10 flex justify-between items-center">
            <p className="text-sm font-bold text-[#788B81]">Date: {formatUnambiguousDate(date)}</p>
            <button className="px-6 py-3 bg-[#2C3531] text-[#F4F1EC] hover:bg-black rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center">
              <Save className="w-4 h-4 mr-2" /> Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
