"use client"
import { useState } from "react"
import { CalendarClock, CheckCircle2, XCircle, Search, User } from "lucide-react"

export default function LeaveClient() {
  const [filter, setFilter] = useState("Pending")
  const [leaveRequests, setLeaveRequests] = useState([
    { id: "LR-001", staffName: "Mr. Ayodele", role: "Math Teacher", type: "Sick Leave", duration: "2 Days", dates: "Oct 12 - Oct 13, 2026", status: "Pending" },
    { id: "LR-002", staffName: "Mrs. Nwachukwu", role: "English Teacher", type: "Maternity", duration: "90 Days", dates: "Nov 01 - Jan 30, 2027", status: "Approved" },
    { id: "LR-003", staffName: "Mr. Eze", role: "Science Teacher", type: "Casual Leave", duration: "1 Day", dates: "Oct 15, 2026", status: "Pending" },
  ])

  const handleAction = (id: string, newStatus: string) => {
    setLeaveRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req))
  }

  const filteredRequests = leaveRequests.filter(req => filter === "All" || req.status === filter)

  return (
    <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Top Header & Filter */}
        <div className="p-6 border-b border-[#788B81]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F4F1EC]/20">
          <div className="flex items-center space-x-2">
            <CalendarClock className="w-5 h-5 text-[#788B81]" />
            <h2 className="text-xl font-sans font-bold text-[#2C3531]">Leave Requests</h2>
          </div>
          <div className="flex space-x-2">
            {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
              <button 
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  filter === status 
                    ? 'bg-[#2C3531] text-[#F4F1EC] border-[#2C3531]' 
                    : 'bg-white text-[#788B81] border-[#788B81]/20 hover:border-[#788B81]/40'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* List of Requests */}
        <div className="flex-1 overflow-auto">
          {filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <CalendarClock className="w-12 h-12 text-[#788B81]/20 mb-4" />
              <p className="text-sm font-bold text-[#788B81]">No leave requests found for this filter.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-[#788B81]/10">
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Staff Member</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Leave Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#788B81]/5">
                {filteredRequests.map(req => (
                  <tr key={req.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#F4F1EC] flex items-center justify-center">
                          <User className="w-5 h-5 text-[#788B81]" />
                        </div>
                        <div>
                          <p className="font-bold text-[#2C3531]">{req.staffName}</p>
                          <p className="text-xs font-medium text-[#788B81]">{req.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-2 py-0.5 bg-[#788B81]/10 text-[#788B81] rounded text-[10px] font-bold uppercase tracking-widest">
                          {req.type}
                        </span>
                        <span className="text-xs font-bold text-[#2C3531]">{req.duration}</span>
                      </div>
                      <p className="text-xs font-medium text-[#788B81]">{req.dates}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center
                        ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          req.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' : 
                          'bg-amber-50 text-amber-700 border-amber-100'}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {req.status === 'Pending' ? (
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleAction(req.id, 'Rejected')}
                            className="p-2 text-[#788B81] hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleAction(req.id, 'Approved')}
                            className="p-2 text-[#788B81] hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                            title="Approve"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-[#788B81]">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}
