"use client"
import React, { useState, useTransition } from "react"
import { AlertCircle, CreditCard, FileText, CheckCircle2, DollarSign } from "lucide-react"
import { simulateOnlinePayment } from "./actions"

export default function ParentFeesClient({ 
  invoices
}: {
  invoices: any[]
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState<any | null>(null) // holds selected invoice

  // Calculate total outstanding across all wards
  const totalOutstanding = invoices.reduce((sum, inv) => {
    return sum + (Number(inv.total_amount) - Number(inv.paid_amount || 0))
  }, 0)

  async function handlePayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const formData = new FormData(e.currentTarget)
    formData.append("invoice_id", showPaymentModal.id)
    
    startTransition(async () => {
      const res = await simulateOnlinePayment(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess("Payment processed successfully!")
        setShowPaymentModal(null)
      }
    })
  }

  return (
    <div className="space-y-8">
      
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

      {/* Summary Widget */}
      <div className="bg-[#2C3531] text-white p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[#F4F1EC]/70 font-medium mb-1">Total Outstanding Balance</p>
            <h2 className="text-4xl sm:text-5xl font-black">${totalOutstanding.toFixed(2)}</h2>
          </div>
          {totalOutstanding > 0 && (
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <AlertCircle className="text-amber-400 w-6 h-6" />
              <p className="text-sm text-white/90 font-medium">You have unpaid invoices. Please settle them to avoid interruption of services.</p>
            </div>
          )}
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#2C3531] flex items-center"><FileText className="w-5 h-5 mr-2" /> Invoice History</h3>
        
        {invoices.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#788B81]/20 text-center">
            <DollarSign className="w-12 h-12 text-[#788B81]/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#2C3531]">No Invoices Found</h3>
            <p className="text-[#788B81] mt-2 text-sm max-w-sm mx-auto">
              You do not have any invoices generated for your wards at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {invoices.map((inv) => {
              const total = Number(inv.total_amount)
              const paid = Number(inv.paid_amount || 0)
              const balance = total - paid
              
              return (
                <div key={inv.id} className="bg-white p-6 rounded-3xl border border-[#788B81]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-xs font-bold text-[#788B81] uppercase tracking-wider">{inv.term?.name.replace('_', ' ')}</span>
                      <h4 className="text-lg font-bold text-[#2C3531] mt-1">{inv.student.first_name} {inv.student.last_name}</h4>
                      <p className="text-xs text-[#788B81] mt-1">{inv.invoice_number}</p>
                    </div>
                    <div>
                      {inv.status === 'PAID' && <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">PAID</span>}
                      {inv.status === 'PARTIALLY_PAID' && <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">PARTIAL</span>}
                      {inv.status === 'UNPAID' && <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">UNPAID</span>}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    {inv.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-[#788B81]">{item.fee_category.name}</span>
                        <span className="font-medium text-[#2C3531]">${Number(item.amount).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-[#788B81]/10 pt-3 flex justify-between font-bold">
                      <span className="text-[#2C3531]">Total</span>
                      <span className="text-[#2C3531]">${total.toFixed(2)}</span>
                    </div>
                    {paid > 0 && (
                      <div className="flex justify-between text-sm text-emerald-600 font-medium">
                        <span>Amount Paid</span>
                        <span>-${paid.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#788B81]/10 flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-xs text-[#788B81]">Balance Due</p>
                      <p className={`text-lg font-black ${balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        ${balance.toFixed(2)}
                      </p>
                    </div>
                    {balance > 0 && (
                      <button 
                        onClick={() => setShowPaymentModal(inv)}
                        className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center"
                      >
                        <CreditCard className="w-4 h-4 mr-2" /> Pay Now
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-6 border-b border-gray-100 bg-[#FAFAFA] text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900">Secure Checkout</h3>
              <p className="text-sm text-gray-500 mt-1">Simulated Online Payment Gateway</p>
            </div>
            
            <form onSubmit={handlePayment} className="p-6 space-y-6">
              
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount to Pay</p>
                <p className="text-4xl font-black text-[#2C3531]">
                  ${(Number(showPaymentModal.total_amount) - Number(showPaymentModal.paid_amount || 0)).toFixed(2)}
                </p>
              </div>

              {/* Hidden amount field */}
              <input type="hidden" name="amount" value={(Number(showPaymentModal.total_amount) - Number(showPaymentModal.paid_amount || 0))} />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Number</label>
                  <input 
                    type="text" 
                    name="card_number" 
                    required 
                    defaultValue="4242 4242 4242 4242"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-gray-600 font-mono tracking-widest bg-gray-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry</label>
                    <input 
                      type="text" 
                      required 
                      defaultValue="12/28"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-gray-600 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label>
                    <input 
                      type="text" 
                      required 
                      defaultValue="123"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-gray-600 bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button type="submit" disabled={isPending} className="w-full px-4 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg disabled:opacity-70 shadow-md transition-colors flex justify-center items-center">
                  {isPending ? "Processing..." : `Pay $${(Number(showPaymentModal.total_amount) - Number(showPaymentModal.paid_amount || 0)).toFixed(2)}`}
                </button>
                <button type="button" disabled={isPending} onClick={() => setShowPaymentModal(null)} className="w-full px-4 py-3 text-gray-500 hover:text-gray-800 font-medium">Cancel</button>
              </div>

              <p className="text-xs text-center text-gray-400">
                This is a mock transaction. No real money will be deducted.
              </p>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
