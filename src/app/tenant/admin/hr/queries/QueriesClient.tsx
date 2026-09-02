"use client"
import { useState } from "react"
import { ShieldAlert, Send, Search, User } from "lucide-react"

export default function QueriesClient() {
  const [queries, setQueries] = useState([
    { id: "QRY-001", staffName: "Mr. Eze", subject: "Unexcused Absence", date: "Oct 10, 2026", status: "Awaiting Reply" },
    { id: "QRY-002", staffName: "Mr. Ayodele", subject: "Late Grade Submission", date: "Sep 25, 2026", status: "Resolved" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#2C3531]">Disciplinary & Queries</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2C3531] hover:bg-black text-[#F4F1EC] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center"
        >
          <ShieldAlert className="w-4 h-4 mr-2" /> Issue New Query
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden">
          <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F4F1EC]/20 border-b border-[#788B81]/10">
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Query ID</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Staff Member</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Subject</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Date Issued</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#788B81]/5">
              {queries.map(q => (
                <tr key={q.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-[#788B81]">{q.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#F4F1EC] flex items-center justify-center">
                        <User className="w-4 h-4 text-[#788B81]" />
                      </div>
                      <span className="font-bold text-[#2C3531]">{q.staffName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#2C3531]">{q.subject}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#788B81]">{q.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border
                      ${q.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#788B81] hover:text-[#2C3531] font-bold text-sm">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Issue Query Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-lg shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#2C3531]">Issue Disciplinary Query</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531]">✕</button>
              </div>
              
              <div className="p-8 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Staff Member</label>
                  <select className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                    <option>Select Staff</option>
                    <option>Mr. Ayodele</option>
                    <option>Mr. Eze</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Subject</label>
                  <input type="text" placeholder="e.g. Unexcused Absence" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Details & Infraction</label>
                  <textarea rows={4} placeholder="Describe the incident..." className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 resize-none"></textarea>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Issue Query Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
