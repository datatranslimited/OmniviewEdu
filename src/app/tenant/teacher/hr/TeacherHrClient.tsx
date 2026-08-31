"use client"
import { useState } from "react"
import { CalendarClock, ShieldAlert, Send, FileText, Download } from "lucide-react"

export default function TeacherHrClient() {
  const [activeTab, setActiveTab] = useState<'leave' | 'queries' | 'payslips'>('leave')

  const [leaveRequests] = useState([
    { id: "LR-010", type: "Sick Leave", duration: "2 Days", dates: "Oct 12 - Oct 13, 2026", status: "Pending" },
    { id: "LR-005", type: "Casual Leave", duration: "1 Day", dates: "Sep 05, 2026", status: "Approved" },
  ])

  const [queries] = useState([
    { id: "QRY-001", subject: "Unexcused Absence", date: "Oct 10, 2026", status: "Awaiting Reply", text: "You were absent without prior notice on Oct 9." }
  ])

  const [payslips] = useState([
    { month: "September 2026", amount: 165000 },
    { month: "August 2026", amount: 165000 },
  ])

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)
  const [replyQueryId, setReplyQueryId] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      
      {/* Tabs */}
      <div className="flex space-x-2 bg-[#F4F1EC] p-1.5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('leave')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'leave' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          My Leaves
        </button>
        <button 
          onClick={() => setActiveTab('queries')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'queries' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Queries
        </button>
        <button 
          onClick={() => setActiveTab('payslips')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'payslips' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
        >
          Payslips
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[400px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full">
          
          {/* LEAVE TAB */}
          {activeTab === 'leave' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#2C3531]">Leave History</h3>
                <button 
                  onClick={() => setIsLeaveModalOpen(true)}
                  className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-transform active:scale-95"
                >
                  Request Leave
                </button>
              </div>

              <div className="space-y-4">
                {leaveRequests.map(req => (
                  <div key={req.id} className="flex justify-between items-center p-4 rounded-2xl border border-[#788B81]/20 bg-[#F4F1EC]/20 hover:bg-[#F4F1EC]/40 transition-colors">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="px-2 py-0.5 bg-[#788B81]/10 text-[#788B81] rounded text-[10px] font-bold uppercase tracking-widest">{req.type}</span>
                        <span className="font-bold text-[#2C3531]">{req.duration}</span>
                      </div>
                      <p className="text-sm font-medium text-[#788B81]">{req.dates}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUERIES TAB */}
          {activeTab === 'queries' && (
            <div>
              <h3 className="text-lg font-bold text-[#2C3531] mb-6">Disciplinary Queries</h3>
              
              <div className="space-y-4">
                {queries.map(q => (
                  <div key={q.id} className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <ShieldAlert className="w-5 h-5 text-amber-600" />
                        <h4 className="font-bold text-[#2C3531]">{q.subject}</h4>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 border border-amber-200">
                          {q.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#2C3531] mb-2">{q.text}</p>
                      <p className="text-xs font-bold text-[#788B81]">Issued: {q.date}</p>
                    </div>
                    {q.status === 'Awaiting Reply' && (
                      <button 
                        onClick={() => setReplyQueryId(q.id)}
                        className="bg-white border border-[#788B81]/20 text-[#2C3531] hover:border-[#2C3531] px-5 py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
                      >
                        Reply to Query
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAYSLIPS TAB */}
          {activeTab === 'payslips' && (
            <div>
              <h3 className="text-lg font-bold text-[#2C3531] mb-6">My Payslips</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {payslips.map(ps => (
                  <div key={ps.month} className="p-5 rounded-2xl border border-[#788B81]/20 bg-[#F4F1EC]/20 flex flex-col items-center justify-center text-center hover:bg-[#F4F1EC]/40 transition-colors">
                    <FileText className="w-8 h-8 text-[#788B81] mb-3" />
                    <h4 className="font-bold text-[#2C3531] mb-1">{ps.month}</h4>
                    <p className="text-lg font-black text-emerald-700 mb-4">₦{ps.amount.toLocaleString()}</p>
                    <button className="flex items-center text-sm font-bold text-[#2C3531] hover:text-[#788B81] transition-colors">
                      <Download className="w-4 h-4 mr-1.5" /> Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Leave Request Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-lg shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#2C3531]">Request Leave</h3>
                <button onClick={() => setIsLeaveModalOpen(false)} className="text-[#788B81] hover:text-[#2C3531]">✕</button>
              </div>
              <div className="p-8 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Leave Type</label>
                  <select className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30">
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Maternity Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Start Date</label>
                    <input type="date" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">End Date</label>
                    <input type="date" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Reason (Optional)</label>
                  <textarea rows={3} className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 resize-none"></textarea>
                </div>
                <button 
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="w-full py-3.5 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Query Modal */}
      {replyQueryId && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2rem] w-full max-w-lg shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-[#788B81]/10 flex justify-between items-center bg-amber-50">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h3 className="text-xl font-bold text-[#2C3531]">Reply to Query</h3>
                </div>
                <button onClick={() => setReplyQueryId(null)} className="text-[#788B81] hover:text-[#2C3531]">✕</button>
              </div>
              <div className="p-8 space-y-5">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-600 italic">"You were absent without prior notice on Oct 9."</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Your Explanation</label>
                  <textarea rows={5} placeholder="Type your formal reply here..." className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 resize-none"></textarea>
                </div>
                <button 
                  onClick={() => setReplyQueryId(null)}
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Submit Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
