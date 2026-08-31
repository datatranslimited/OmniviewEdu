"use client"
import { useState } from "react"
import { Banknote, Download, FileText, User } from "lucide-react"

export default function PayrollClient() {
  const [payrollData] = useState([
    { id: "PR-001", staffName: "Mr. Ayodele", role: "Math Teacher", baseSalary: 150000, allowances: 20000, deductions: 5000, netPay: 165000, status: "Paid" },
    { id: "PR-002", staffName: "Mrs. Nwachukwu", role: "English Teacher", baseSalary: 160000, allowances: 25000, deductions: 8000, netPay: 177000, status: "Pending" },
    { id: "PR-003", staffName: "Mr. Eze", role: "Science Teacher", baseSalary: 145000, allowances: 15000, deductions: 0, netPay: 160000, status: "Pending" },
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  }

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center bg-[#2C3531] p-6 rounded-3xl shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-full">
            <Banknote className="w-8 h-8 text-[#F4F1EC]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#F4F1EC]">October 2026 Payroll</h2>
            <p className="text-sm text-[#788B81] mt-1">3 Staff Members • Total Net Pay: {formatCurrency(502000)}</p>
          </div>
        </div>
        <button 
          className="bg-[#F4F1EC] text-[#2C3531] hover:bg-white px-6 py-3 rounded-full text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center"
        >
          Run Payroll
        </button>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F4F1EC]/20 border-b border-[#788B81]/10">
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Staff Member</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-right">Base Salary</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-right">Allowances</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-right">Deductions</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-right">Net Pay</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-center">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#788B81]/5">
              {payrollData.map(pr => (
                <tr key={pr.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#F4F1EC] flex items-center justify-center">
                        <User className="w-5 h-5 text-[#788B81]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#2C3531]">{pr.staffName}</p>
                        <p className="text-xs font-medium text-[#788B81]">{pr.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-[#788B81]">{formatCurrency(pr.baseSalary)}</td>
                  <td className="px-6 py-4 text-right font-medium text-emerald-600">+{formatCurrency(pr.allowances)}</td>
                  <td className="px-6 py-4 text-right font-medium text-red-500">-{formatCurrency(pr.deductions)}</td>
                  <td className="px-6 py-4 text-right font-bold text-[#2C3531] text-lg">{formatCurrency(pr.netPay)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border
                      ${pr.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                      {pr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 bg-[#F4F1EC] hover:bg-[#2C3531] text-[#788B81] hover:text-[#F4F1EC] rounded-full transition-colors inline-flex items-center justify-center" title="Download PDF Payslip">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
