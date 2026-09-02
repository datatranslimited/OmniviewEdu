"use client"
import React, { useState, useTransition, useMemo } from "react"
import { AlertCircle, PlusCircle, Search, DollarSign, FileText, CheckCircle2 } from "lucide-react"
import { generateInvoices, recordPayment } from "./actions"

export default function InvoicesClient({ 
  activeTerm,
  classLevels,
  invoices
}: {
  activeTerm: any,
  classLevels: any[],
  invoices: any[]
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState<any | null>(null) // holds selected invoice

  const filteredInvoices = useMemo(() => {
    if (!searchTerm) return invoices
    const lower = searchTerm.toLowerCase()
    return invoices.filter(inv => 
      inv.invoice_number.toLowerCase().includes(lower) || 
      inv.student.first_name.toLowerCase().includes(lower) ||
      inv.student.last_name.toLowerCase().includes(lower)
    )
  }, [invoices, searchTerm])

  async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await generateInvoices(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess(`Successfully generated ${res.generatedCount} new invoices!`)
        setShowGenerateModal(false)
      }
    })
  }

  async function handlePayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const formData = new FormData(e.currentTarget)
    formData.append("invoice_id", showPaymentModal.id)
    
    startTransition(async () => {
      const res = await recordPayment(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess("Payment recorded successfully!")
        setShowPaymentModal(null)
      }
    })
  }

  return (
    <div className="space-y-6">
      
      {!activeTerm && (
        <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-200 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">No Active Academic Term</h4>
            <p className="text-sm mt-1">You must set an active term before generating invoices.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center justify-between shadow-sm">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl border border-emerald-100 flex items-center justify-between shadow-sm">
          <span className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-2" /> {success}</span>
          <button onClick={() => setSuccess(null)} className="text-emerald-400 hover:text-emerald-600">×</button>
        </div>
      )}

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[600px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex flex-col h-full overflow-hidden">
          
          <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
              <input 
                type="text" 
                placeholder="Search invoices or students..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 outline-none"
              />
            </div>
            <button 
              onClick={() => setShowGenerateModal(true)} 
              disabled={!activeTerm}
              className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Generate Invoices
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#788B81]/10">
              <thead className="bg-[#F4F1EC]/10">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Invoice No.</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Student</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Total Amount</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Balance Due</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#788B81] uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#788B81]/10">
                {filteredInvoices.map(inv => {
                  const total = Number(inv.total_amount)
                  const paid = Number(inv.paid_amount || 0)
                  const balance = total - paid
                  return (
                    <tr key={inv.id} className="hover:bg-[#F4F1EC]/30 transition-colors">
                      <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-[#2C3531] flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-[#788B81]" /> {inv.invoice_number}
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="text-sm font-bold text-[#2C3531]">{inv.student.first_name} {inv.student.last_name}</div>
                        <div className="text-xs text-[#788B81]">{inv.student.current_class_arm?.name || 'Unknown Class'}</div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        {inv.status === 'PAID' && <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">PAID</span>}
                        {inv.status === 'PARTIALLY_PAID' && <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">PARTIAL</span>}
                        {inv.status === 'UNPAID' && <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">UNPAID</span>}
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-bold text-[#2C3531]">${total.toFixed(2)}</td>
                      <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-black text-red-600">${balance.toFixed(2)}</td>
                      <td className="px-8 py-5 whitespace-nowrap text-right">
                        {balance > 0 ? (
                          <button 
                            onClick={() => setShowPaymentModal(inv)}
                            className="text-[#2C3531] bg-white border border-[#788B81]/20 hover:bg-[#F4F1EC] transition-colors px-4 py-2 rounded-xl shadow-sm font-bold inline-flex items-center text-xs"
                          >
                            <DollarSign className="w-3.5 h-3.5 mr-1" /> Log Payment
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold text-xs"><CheckCircle2 className="w-4 h-4 inline" /> Settled</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
                {filteredInvoices.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <FileText className="w-12 h-12 text-[#788B81]/30 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-[#2C3531]">No Invoices Found</h3>
                      <p className="text-[#788B81] mt-2 text-sm max-w-sm mx-auto">
                        You have not generated any invoices for the active term yet.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Generate Invoices Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Bulk Generate Invoices</h3>
              <button onClick={() => setShowGenerateModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <form onSubmit={handleGenerate} className="p-6 space-y-5">
              <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
                This tool automatically calculates bills for all students in a specific Class Level based on the Fee Structure matrix defined for the Active Term.
              </p>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Class Level</label>
                <select name="class_level_id" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white">
                  <option value="">Select Level...</option>
                  {classLevels.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowGenerateModal(false)} className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">Cancel</button>
                <button type="submit" disabled={isPending} className="flex-1 px-4 py-3 bg-[#1E2522] text-white rounded-xl font-medium disabled:opacity-70">
                  {isPending ? "Generating..." : "Generate Invoices"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-emerald-50/50">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Record Payment</h3>
                <p className="text-xs text-emerald-700 font-bold mt-0.5">{showPaymentModal.invoice_number}</p>
              </div>
              <button onClick={() => setShowPaymentModal(null)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <form onSubmit={handlePayment} className="p-6 space-y-5">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-sm font-bold text-gray-600">Outstanding Balance:</span>
                <span className="text-xl font-black text-red-600">
                  ${(Number(showPaymentModal.total_amount) - Number(showPaymentModal.paid_amount || 0)).toFixed(2)}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount Paid ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  name="amount" 
                  required 
                  max={(Number(showPaymentModal.total_amount) - Number(showPaymentModal.paid_amount || 0))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-lg font-bold text-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payment Method</label>
                  <select name="channel" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white text-sm">
                    <option value="DIRECT_CASH">Cash</option>
                    <option value="CARD">Card / POS</option>
                    <option value="VIRTUAL_ACCOUNT_TRANSFER">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Transaction Ref</label>
                  <input 
                    type="text" 
                    name="transaction_reference" 
                    required 
                    placeholder="Teller / Receipt No."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes (Optional)</label>
                <input 
                  type="text" 
                  name="notes" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowPaymentModal(null)} className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">Cancel</button>
                <button type="submit" disabled={isPending} className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium disabled:opacity-70 shadow-md">
                  {isPending ? "Processing..." : "Confirm Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
