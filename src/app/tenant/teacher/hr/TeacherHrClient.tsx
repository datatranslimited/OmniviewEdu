"use client"
import { useState } from "react"
import { ShieldAlert, Send, FileText, Download } from "lucide-react"
import { submitLeaveRequest } from "./actions"
import { format } from "date-fns"

export default function TeacherHrClient({ leaveRequests, payslips }: { leaveRequests: any[], payslips: any[] }) {
  const [activeTab, setActiveTab] = useState<'leave' | 'payslips'>('leave')

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRequestLeave = async () => {
    if (!startDate || !endDate || !reason) return;
    setIsSubmitting(true)
    await submitLeaveRequest(startDate, endDate, reason)
    setIsSubmitting(false)
    setIsLeaveModalOpen(false)
    setStartDate("")
    setEndDate("")
    setReason("")
  }

  const formatMoney = (val: any) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(Number(val))
  }

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

              {leaveRequests.length === 0 ? (
                <div className="text-center py-10 text-[#788B81]">No leave requests found.</div>
              ) : (
                <div className="space-y-4">
                  {leaveRequests.map(req => (
                    <div key={req.id} className="flex justify-between items-center p-4 rounded-2xl border border-[#788B81]/20 bg-[#F4F1EC]/20 hover:bg-[#F4F1EC]/40 transition-colors">
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-bold text-[#2C3531]">{req.reason}</span>
                        </div>
                        <p className="text-sm font-medium text-[#788B81]">
                          {format(new Date(req.start_date), "MMM d, yyyy")} - {format(new Date(req.end_date), "MMM d, yyyy")}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-widest ${
                        req.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        req.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PAYSLIPS TAB */}
          {activeTab === 'payslips' && (
            <div>
              <h3 className="text-lg font-bold text-[#2C3531] mb-6">My Payslips</h3>
              {payslips.length === 0 ? (
                <div className="text-center py-10 text-[#788B81]">No payslips available.</div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {payslips.map(ps => (
                    <div key={ps.id} className="p-5 rounded-2xl border border-[#788B81]/20 bg-[#F4F1EC]/20 flex flex-col items-center justify-center text-center hover:bg-[#F4F1EC]/40 transition-colors">
                      <FileText className="w-8 h-8 text-[#788B81] mb-3" />
                      <h4 className="font-bold text-[#2C3531] mb-1">Month {ps.month}, {ps.year}</h4>
                      <p className="text-lg font-black text-emerald-700 mb-4">{formatMoney(ps.net_pay)}</p>
                      
                      <span className={`mb-4 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        ps.status === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {ps.status}
                      </span>

                      {ps.status === "PAID" && (
                        <button className="flex items-center text-sm font-bold text-[#2C3531] hover:text-[#788B81] transition-colors">
                          <Download className="w-4 h-4 mr-1.5" /> Download PDF
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Start Date</label>
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">End Date</label>
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Reason</label>
                  <textarea 
                    rows={3} 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 resize-none"
                  ></textarea>
                </div>
                <button 
                  onClick={handleRequestLeave}
                  disabled={isSubmitting || !startDate || !endDate || !reason}
                  className="w-full py-3.5 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" /> {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
