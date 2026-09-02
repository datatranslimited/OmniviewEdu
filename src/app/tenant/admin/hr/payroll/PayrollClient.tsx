"use client"

import { useState } from "react"
import { generatePayslips, updatePayslip } from "./actions"
import { CheckCircle2, Receipt, AlertCircle, CalendarIcon, BanknoteIcon } from "lucide-react"

export default function PayrollClient({ payslips, currentMonth, currentYear }: { payslips: any[], currentMonth: number, currentYear: number }) {
  const [generating, setGenerating] = useState(false)
  const [message, setMessage] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editAllowances, setEditAllowances] = useState(0)
  const [editDeductions, setEditDeductions] = useState(0)
  const [isSaving, setIsSaving] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    setMessage("")
    try {
      const res = await generatePayslips(currentMonth, currentYear)
      if (res.success) {
        setMessage(`Generated ${res.count} new payslips for ${currentMonth}/${currentYear}`)
      } else {
        setMessage("Failed to generate payslips.")
      }
    } catch (e) {
      setMessage("An error occurred.")
    }
    setGenerating(false)
  }

  const startEdit = (payslip: any) => {
    setEditingId(payslip.id)
    setEditAllowances(Number(payslip.allowances))
    setEditDeductions(Number(payslip.deductions))
  }

  const handleSave = async (id: string, markAsPaid: boolean) => {
    setIsSaving(true)
    await updatePayslip(id, editAllowances, editDeductions, markAsPaid)
    setEditingId(null)
    setIsSaving(false)
  }

  const formatMoney = (val: any) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(Number(val))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#788B81]/20 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#2C3531] flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-[#788B81]" />
            Payroll for {currentMonth}/{currentYear}
          </h2>
          <p className="text-[#788B81] text-sm mt-1">Generate payslips for staff with basic salary configured.</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="mt-4 md:mt-0 bg-[#2C3531] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#788B81] transition-colors disabled:opacity-50 flex items-center"
        >
          <Receipt className="w-5 h-5 mr-2" />
          {generating ? "Generating..." : "Auto-Generate Payslips"}
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 flex items-center border border-emerald-200">
          <CheckCircle2 className="w-5 h-5 mr-2" />
          {message}
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#788B81]/20">
        <h3 className="font-bold text-[#2C3531] mb-4">Generated Payslips</h3>
        {payslips.length === 0 ? (
          <div className="text-center py-8 text-[#788B81]">
            No payslips generated for this month yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#788B81]/20">
                  <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Staff</th>
                  <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Basic Salary</th>
                  <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Allowances</th>
                  <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Deductions</th>
                  <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Net Pay</th>
                  <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Status</th>
                  <th className="py-3 px-4 text-sm font-semibold text-[#788B81]">Action</th>
                </tr>
              </thead>
              <tbody>
                {payslips.map((slip) => (
                  <tr key={slip.id} className="border-b border-[#788B81]/10 hover:bg-[#FDFBF7]">
                    <td className="py-4 px-4 font-medium text-[#2C3531]">
                      {slip.staff.first_name} {slip.staff.last_name}
                    </td>
                    <td className="py-4 px-4 text-sm text-[#788B81]">{formatMoney(slip.basic_salary)}</td>
                    <td className="py-4 px-4">
                      {editingId === slip.id ? (
                        <input
                          type="number"
                          value={editAllowances}
                          onChange={(e) => setEditAllowances(Number(e.target.value))}
                          className="w-24 border border-[#788B81]/30 rounded-lg px-2 py-1 text-sm outline-none"
                        />
                      ) : (
                        <span className="text-sm text-[#788B81]">{formatMoney(slip.allowances)}</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {editingId === slip.id ? (
                        <input
                          type="number"
                          value={editDeductions}
                          onChange={(e) => setEditDeductions(Number(e.target.value))}
                          className="w-24 border border-red-200 rounded-lg px-2 py-1 text-sm outline-none text-red-600"
                        />
                      ) : (
                        <span className="text-sm text-red-500">{formatMoney(slip.deductions)}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-600">
                      {editingId === slip.id ? (
                        formatMoney(Number(slip.basic_salary) + editAllowances - editDeductions)
                      ) : (
                        formatMoney(slip.net_pay)
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        slip.status === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {slip.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {editingId === slip.id ? (
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handleSave(slip.id, false)} disabled={isSaving} className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-200">Save</button>
                          {slip.status === "DRAFT" && (
                            <button onClick={() => handleSave(slip.id, true)} disabled={isSaving} className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-200">Pay</button>
                          )}
                          <button onClick={() => setEditingId(null)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
                        </div>
                      ) : (
                        slip.status === "DRAFT" && (
                          <button onClick={() => startEdit(slip)} className="text-sm text-blue-600 font-bold hover:underline">
                            Edit
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
