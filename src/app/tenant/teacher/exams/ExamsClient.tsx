"use client"
import { useState } from "react"
import { GraduationCap, Calendar, PlusCircle, CheckCircle2 } from "lucide-react"

export default function ExamsClient() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'create'>('schedule')
  const [exams] = useState([
    { id: "EXM-001", title: "Mid-Term Mathematics", class: "JSS 1 A", date: "Oct 20, 2026 - 10:00 AM", duration: "60 mins", type: "CBT", status: "Scheduled", registered: 45 },
    { id: "EXM-002", title: "English Language Final", class: "JSS 2 B", date: "Nov 05, 2026 - 09:00 AM", duration: "120 mins", type: "Written", status: "Draft", registered: 42 }
  ])

  return (
    <div className="space-y-6">
      
      {/* Tabs */}
      <div className="flex space-x-2 bg-[#F4F1EC] p-1.5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'schedule' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Scheduled Exams
        </button>
        <button 
          onClick={() => setActiveTab('create')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'create' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Create New Exam
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden h-full">
          
          {/* SCHEDULE TAB */}
          {activeTab === 'schedule' && (
            <div className="p-8">
              <h3 className="text-lg font-bold text-[#2C3531] mb-6">Upcoming Exams</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {exams.map(exam => (
                  <div key={exam.id} className="p-6 rounded-3xl border border-[#788B81]/20 bg-[#F4F1EC]/20 hover:bg-[#F4F1EC]/40 transition-colors flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${exam.type === 'CBT' ? 'bg-blue-100 text-blue-700' : 'bg-[#788B81]/20 text-[#2C3531]'}`}>
                          {exam.type}
                        </span>
                        <h4 className="font-bold text-[#2C3531] text-lg mt-2">{exam.title}</h4>
                        <p className="text-sm font-medium text-[#788B81]">{exam.class}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${exam.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {exam.status}
                      </span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-[#788B81]/10 flex justify-between items-center text-sm font-medium text-[#788B81]">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" /> {exam.date} ({exam.duration})
                      </div>
                      <div className="font-bold text-[#2C3531]">
                        {exam.registered} Students
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CREATE EXAM TAB */}
          {activeTab === 'create' && (
            <div className="p-8 max-w-2xl mx-auto space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#F4F1EC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-[#788B81]" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3531]">Configure New Exam</h3>
                <p className="text-sm text-[#788B81]">Set up a CBT or Written exam schedule.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Exam Title</label>
                  <input type="text" placeholder="e.g. Mid-Term Mathematics" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Select Class</label>
                    <select className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                      <option>JSS 1 A</option>
                      <option>JSS 2 B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Exam Type</label>
                    <select className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                      <option>Computer-Based Test (CBT)</option>
                      <option>Written Exam</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Date & Time</label>
                    <input type="datetime-local" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Duration (Minutes)</label>
                    <input type="number" defaultValue={60} className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button className="px-6 py-3 bg-[#F4F1EC] text-[#2C3531] rounded-xl font-bold transition-transform active:scale-95">Save as Draft</button>
                  <button className="px-6 py-3 bg-[#2C3531] text-[#F4F1EC] hover:bg-black rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex items-center">
                    <PlusCircle className="w-4 h-4 mr-2" /> Publish Schedule
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
