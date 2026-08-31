"use client"
import { useState } from "react"
import { CreditCard, Search, Download, CheckCircle2, AlertCircle } from "lucide-react"

const dummyInvoices = [
  { id: "INV-2026-001", student: "John Doe", class: "JSS 1 A", amount: "₦150,000", status: "Paid", date: "Aug 15, 2026" },
  { id: "INV-2026-002", student: "Jane Smith", class: "SS 2 Science", amount: "₦180,000", status: "Pending", date: "Sep 01, 2026" },
  { id: "INV-2026-003", student: "Michael Johnson", class: "Primary 4", amount: "₦120,000", status: "Overdue", date: "Jul 10, 2026" },
]

export default function BursaryClient() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      
      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden flex flex-col h-full">
          
          <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
              <input 
                type="text" 
                placeholder="Search invoices or students..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm"
              />
            </div>
            <button className="flex items-center text-sm font-bold text-[#2C3531] bg-white border border-[#788B81]/20 px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#F4F1EC]/50 transition-colors">
              <Download className="w-4 h-4 mr-2" /> Export Report
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="min-w-full divide-y divide-[#788B81]/10">
              <thead className="bg-[#F4F1EC]/10">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Invoice ID</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Student</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Due Date</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#788B81]/10">
                {dummyInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-[#2C3531]">
                      {inv.id}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm font-bold text-[#2C3531]">{inv.student}</div>
                      <div className="text-xs font-medium text-[#788B81]">{inv.class}</div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-black text-[#2C3531]">
                      {inv.amount}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-[#788B81]">
                      {inv.date}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full items-center ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 
                        inv.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {inv.status === 'Paid' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {inv.status === 'Overdue' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#788B81] hover:text-[#2C3531] transition-colors underline decoration-[#788B81]/30 underline-offset-4">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#F4F1EC]/30 px-8 py-4 border-t border-[#788B81]/10 flex justify-between items-center">
            <p className="text-sm font-bold text-[#788B81]">Showing {dummyInvoices.length} invoices</p>
          </div>

        </div>
      </div>
    </div>
  )
}
