"use client"
import { useState } from "react"
import { CreditCard, Download, ExternalLink, CheckCircle, AlertCircle, Shield, X } from "lucide-react"

type InvoiceStatus = "Paid" | "Unpaid"

export default function FeesClient() {
  const [invoices, setInvoices] = useState([
    { id: "INV-2026-001", ward: "Adebayo Johnson", term: "Term 1", amount: 45000, status: "Paid" as InvoiceStatus, date: "Oct 01, 2026" },
    { id: "INV-2026-002", ward: "Adebayo Johnson", term: "Term 2", amount: 45000, status: "Unpaid" as InvoiceStatus, date: "Jan 10, 2027" },
    { id: "INV-2026-082", ward: "Fatima Johnson", term: "Term 1", amount: 35000, status: "Paid" as InvoiceStatus, date: "Oct 01, 2026" },
  ])

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)
  }

  const outstandingBalance = invoices.filter(inv => inv.status === 'Unpaid').reduce((acc, curr) => acc + curr.amount, 0)

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
    setIsSuccess(false)
  }

  const simulatePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      
      // Update invoices to Paid
      setTimeout(() => {
        setInvoices(prev => prev.map(inv => ({...inv, status: 'Paid'})))
        setIsCheckoutOpen(false)
      }, 2500)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-sans text-[#2C3531] font-bold tracking-tight mb-2">Fees & Invoices</h1>
        <p className="text-[#788B81] font-medium leading-relaxed">Manage school fee payments for all your linked wards securely.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Outstanding Balance Widget (Double-Bezel) */}
        <div className="bg-[#788B81]/10 p-2 rounded-[2.5rem] backdrop-blur-xl border border-[#788B81]/20 shadow-[0_8px_30px_rgb(0,0,0,0.02)] col-span-1 h-fit">
          <div className="bg-white/80 backdrop-blur-md rounded-[calc(2.5rem-0.5rem)] p-8 border border-[#788B81]/20 text-center relative overflow-hidden">
            
            <h3 className="text-xs font-bold text-[#788B81] uppercase tracking-widest mb-4">Total Outstanding</h3>
            <div className="text-5xl font-sans font-bold text-[#2C3531] mb-6">{formatCurrency(outstandingBalance)}</div>
            
            {outstandingBalance > 0 ? (
              <div className="flex flex-col items-center justify-center mb-8">
                <p className="text-sm font-medium text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-100 inline-flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" /> Action Required
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mb-8">
                <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 inline-flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" /> All Accounts Settled
                </p>
              </div>
            )}

            <button 
              onClick={handleCheckout}
              disabled={outstandingBalance === 0}
              className={`w-full py-4 rounded-full font-bold transition-all shadow-lg flex items-center justify-center group
                ${outstandingBalance > 0 
                  ? 'bg-[#2C3531] hover:bg-black text-[#F4F1EC] hover:shadow-xl hover:-translate-y-0.5' 
                  : 'bg-[#F4F1EC] text-[#788B81] border border-[#788B81]/20 cursor-not-allowed shadow-none'}`}
            >
              <CreditCard className={`w-5 h-5 mr-2 ${outstandingBalance > 0 ? 'group-hover:rotate-12 transition-transform' : ''}`} />
              Pay Now Securely
            </button>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#788B81]/60 mt-6 flex items-center justify-center">
              <Shield className="w-3 h-3 mr-1.5" /> Secured by Paystack
            </p>
          </div>
        </div>

        {/* Invoice History Table */}
        <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] lg:col-span-2">
          <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 h-full overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#788B81]/10">
              <h3 className="text-lg font-sans font-bold text-[#2C3531]">Invoice History</h3>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#788B81]/10 bg-[#F4F1EC]/20">
                    <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Invoice ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Ward & Term</th>
                    <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-[#788B81] uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#788B81]/10">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#F4F1EC]/40 transition-colors">
                      <td className="px-6 py-5 font-mono text-xs font-bold text-[#788B81]">{inv.id}</td>
                      <td className="px-6 py-5">
                        <span className="block font-bold text-[#2C3531]">{inv.ward}</span>
                        <span className="block text-xs font-medium text-[#788B81] mt-0.5">{inv.term} Tuition</span>
                      </td>
                      <td className="px-6 py-5 font-bold text-[#2C3531]">{formatCurrency(inv.amount)}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold 
                          ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        {inv.status === 'Paid' ? (
                          <button className="text-[#788B81] hover:text-[#2C3531] font-bold text-sm inline-flex items-center transition-colors">
                            <Download className="w-4 h-4 mr-1.5" /> Receipt
                          </button>
                        ) : (
                          <button onClick={handleCheckout} className="px-4 py-1.5 bg-[#788B81] hover:bg-[#64766C] text-[#F4F1EC] rounded-full text-xs font-bold transition-colors">
                            Pay
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-[#2C3531]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F4F1EC] p-2 rounded-[2.5rem] w-full max-w-md shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden relative">
              
              {!isProcessing && !isSuccess && (
                <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 p-2 text-[#788B81] hover:bg-[#F4F1EC] rounded-full transition-colors z-10">
                  <X className="w-5 h-5" />
                </button>
              )}

              {isSuccess ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C3531]">Payment Successful!</h3>
                  <p className="text-[#788B81] text-sm">Your receipt has been emailed to you and the ward's account is now cleared.</p>
                </div>
              ) : isProcessing ? (
                <div className="p-10 text-center space-y-6">
                  <div className="w-16 h-16 border-4 border-[#F4F1EC] border-t-[#788B81] rounded-full animate-spin mx-auto"></div>
                  <h3 className="text-xl font-bold text-[#2C3531]">Processing Payment...</h3>
                  <p className="text-[#788B81] text-xs uppercase tracking-widest font-bold">Contacting Bank Gateway</p>
                </div>
              ) : (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-[#788B81]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-[#788B81]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2C3531]">Secure Checkout</h3>
                    <p className="text-sm font-medium text-[#788B81] mt-1">Paystack Test Environment</p>
                  </div>

                  <div className="bg-[#F4F1EC]/50 rounded-xl p-4 border border-[#788B81]/10 mb-8 flex justify-between items-center">
                    <span className="text-sm font-bold text-[#788B81] uppercase tracking-wider">Total Due</span>
                    <span className="text-xl font-bold text-[#2C3531]">{formatCurrency(outstandingBalance)}</span>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={simulatePayment}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                    >
                      Pay with Card
                    </button>
                    <button 
                      onClick={simulatePayment}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                    >
                      Pay with Bank Transfer
                    </button>
                  </div>
                  
                  <p className="text-[10px] text-center text-[#788B81] font-bold mt-6 uppercase tracking-widest">
                    This is a mocked transaction
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  )
}
