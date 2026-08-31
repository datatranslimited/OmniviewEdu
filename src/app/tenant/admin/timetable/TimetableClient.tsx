"use client"
import { useState } from "react"
import { CalendarDays, PlusCircle } from "lucide-react"

// --- DUMMY DATA ---
const dummyClasses = ["Primary 1 Gold", "Primary 2 Silver", "JSS 1 A", "SS 3 Science"]
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = [
  "08:00 AM - 09:00 AM",
  "09:00 AM - 10:00 AM",
  "10:00 AM - 10:30 AM", // Break
  "10:30 AM - 11:30 AM",
  "11:30 AM - 12:30 PM",
  "12:30 PM - 01:30 PM",
]

const dummySchedule = [
  { day: "Monday", time: "08:00 AM - 09:00 AM", subject: "Mathematics", teacher: "Mr. Ebenezer", color: "bg-[#788B81]/20 text-[#2C3531] border-[#788B81]/40" },
  { day: "Monday", time: "09:00 AM - 10:00 AM", subject: "English Language", teacher: "Mrs. Victoria", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { day: "Monday", time: "10:00 AM - 10:30 AM", subject: "BREAK TIME", teacher: "", color: "bg-[#F4F1EC] text-[#788B81] border-[#788B81]/20 font-bold" },
  { day: "Monday", time: "10:30 AM - 11:30 AM", subject: "Basic Science", teacher: "Dr. Ahmed", color: "bg-blue-100 text-blue-800 border-blue-200" },
  
  { day: "Tuesday", time: "08:00 AM - 09:00 AM", subject: "Civic Education", teacher: "Ms. Sarah", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { day: "Tuesday", time: "10:00 AM - 10:30 AM", subject: "BREAK TIME", teacher: "", color: "bg-[#F4F1EC] text-[#788B81] border-[#788B81]/20 font-bold" },
  { day: "Tuesday", time: "11:30 AM - 12:30 PM", subject: "Mathematics", teacher: "Mr. Ebenezer", color: "bg-[#788B81]/20 text-[#2C3531] border-[#788B81]/40" },
]

export default function TimetableClient() {
  const [selectedClass, setSelectedClass] = useState("Primary 1 Gold")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getScheduleBlock = (day: string, time: string) => {
    return dummySchedule.find(s => s.day === day && s.time === time)
  }

  return (
    <div className="space-y-6">
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#2C3531]">Class Timetable</h2>
          <p className="text-sm font-medium text-[#788B81] mt-1">Manage weekly schedules for classes and teachers.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Add Schedule
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden">
          
          {/* Top Filter Bar */}
          <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex-1 max-w-[300px]">
              <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Viewing Schedule For</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm"
              >
                {dummyClasses.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 flex items-center mb-2">
               <p className="text-sm font-bold text-[#788B81]"><CalendarDays className="w-4 h-4 inline mr-1 mb-0.5" /> Showing 5 active days for this term.</p>
            </div>
          </div>

          {/* The Grid */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#788B81]/10 table-fixed">
              <thead className="bg-[#F4F1EC]/10">
                <tr>
                  <th className="w-48 px-6 py-4 text-left text-[11px] font-bold text-[#788B81] uppercase tracking-widest border-r border-[#788B81]/10">
                    Time Slot
                  </th>
                  {daysOfWeek.map(day => (
                    <th key={day} className="px-6 py-4 text-center text-[11px] font-bold text-[#788B81] uppercase tracking-widest border-r border-[#788B81]/10">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#788B81]/10">
                {timeSlots.map(time => {
                  const isBreakTime = time.includes("10:00 AM - 10:30 AM")
                  return (
                    <tr key={time} className="hover:bg-[#F4F1EC]/30 transition-colors">
                      <td className="px-6 py-8 whitespace-nowrap text-sm font-bold text-[#2C3531] border-r border-[#788B81]/10 bg-[#F4F1EC]/10">
                        {time}
                      </td>
                      {daysOfWeek.map(day => {
                        const block = getScheduleBlock(day, time)
                        
                        if (isBreakTime) {
                          return (
                            <td key={`${day}-${time}`} className="px-2 py-2 border-r border-[#788B81]/10 bg-[#F4F1EC]/50 text-center">
                              {day === "Wednesday" && <span className="text-[#788B81] font-black text-xs uppercase tracking-widest">BREAK TIME</span>}
                            </td>
                          )
                        }

                        return (
                          <td key={`${day}-${time}`} className="px-3 py-3 border-r border-[#788B81]/10 h-28 relative align-top">
                            {block ? (
                              <div className={`p-3 rounded-xl border ${block.color} shadow-sm h-full flex flex-col justify-center cursor-pointer hover:opacity-80 transition-opacity`}>
                                <div className="text-sm font-bold truncate">{block.subject}</div>
                                <div className="text-xs font-medium mt-1 truncate opacity-80">{block.teacher}</div>
                              </div>
                            ) : (
                              <div className="w-full h-full border-2 border-dashed border-[#788B81]/20 rounded-xl flex items-center justify-center text-[#788B81] hover:bg-[#788B81]/5 hover:border-[#788B81]/40 transition-colors cursor-pointer opacity-0 hover:opacity-100">
                                <PlusCircle className="w-6 h-6" />
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-md shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-[#F4F1EC]/50">
                <h3 className="text-xl font-bold text-[#2C3531]">Add Class Schedule</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531]">✕</button>
              </div>
              <div className="p-8 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Class Arm</label>
                  <select className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#788B81] opacity-70" disabled>
                    <option>{selectedClass}</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Day</label>
                    <select className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                      {daysOfWeek.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Time Slot</label>
                    <select className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                      {timeSlots.filter(t => !t.includes("10:00 AM - 10:30 AM")).map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Subject</label>
                  <select className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                    <option>Mathematics</option>
                    <option>English Language</option>
                    <option>Basic Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Assign Teacher</label>
                  <select className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                    <option>Mr. Ebenezer (Mathematics)</option>
                    <option>Mrs. Victoria (English)</option>
                  </select>
                </div>
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 w-full py-3.5 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                >
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
