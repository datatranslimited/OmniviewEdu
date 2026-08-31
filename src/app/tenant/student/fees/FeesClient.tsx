"use client"
import { Download, CheckCircle, AlertCircle, Eye } from "lucide-react"

export default function FeesClient() {
  const invoices = [
    { id: "INV-2026-001", term: "First Term 2026/2027", amount: 45000, status: "Paid", date: "Oct 01, 2026" },
    { id: "INV-2026-002", term: "Second Term 2026/2027", amount: 45000, status: "Unpaid", date: "Jan 10, 2027" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)
  }

  const hasUnpaid = invoices.some(inv => inv.status === 'Unpaid')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fees & Invoices</h1>
          <p className="text-gray-500 mt-1">View your school fee status and payment history.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Status Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="max-w-xl">
            {hasUnpaid ? (
              <div className="flex items-start bg-orange-50 p-4 rounded-xl border border-orange-100">
                <AlertCircle className="w-5 h-5 text-orange-500 mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-orange-800">Unpaid Fees Detected</h4>
                  <p className="text-sm text-orange-700 mt-1">You currently have unpaid school fees. Please remind your parents to settle the invoice to ensure uninterrupted access to school facilities.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start bg-green-50 p-4 rounded-xl border border-green-100">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-green-800">Clearance Granted</h4>
                  <p className="text-sm text-green-700 mt-1">All your school fees are fully paid for the current academic term. Thank you!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500">{inv.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{inv.term} Tuition</td>
                  <td className="px-6 py-4 text-gray-600">{inv.date}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(inv.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                      ${inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-gray-400 hover:text-blue-600 font-medium inline-flex items-center transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {inv.status === 'Paid' && (
                        <button className="text-gray-400 hover:text-blue-600 font-medium inline-flex items-center transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
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
