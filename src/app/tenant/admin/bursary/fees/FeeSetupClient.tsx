"use client"
import React, { useState, useTransition } from "react"
import { AlertCircle, PlusCircle, LayoutGrid, CheckCircle2 } from "lucide-react"
import { createFeeCategory, createFeeStructure } from "./actions"

export default function FeeSetupClient({ 
  activeTerm,
  classLevels,
  feeCategories,
  feeStructures
}: {
  activeTerm: any,
  classLevels: any[],
  feeCategories: any[],
  feeStructures: any[]
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showStructureModal, setShowStructureModal] = useState(false)

  async function handleCreateCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await createFeeCategory(formData)
      if (res.error) setError(res.error)
      else setShowCategoryModal(false)
    })
  }

  async function handleCreateStructure(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.append("term_id", activeTerm.id)
    
    startTransition(async () => {
      const res = await createFeeStructure(formData)
      if (res.error) setError(res.error)
      else setShowStructureModal(false)
    })
  }

  return (
    <div className="space-y-6">
      
      {!activeTerm && (
        <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-200 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">No Active Academic Term</h4>
            <p className="text-sm mt-1">You must set an active term before defining fee structures.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center justify-between shadow-sm">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Fee Categories */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#2C3531]">Fee Categories</h2>
                <button onClick={() => setShowCategoryModal(true)} className="text-[#2C3531] bg-[#F4F1EC] hover:bg-[#E5E0D8] p-2 rounded-xl transition-colors">
                  <PlusCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {feeCategories.map(cat => (
                  <div key={cat.id} className="p-4 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/20">
                    <h4 className="font-bold text-[#2C3531] text-sm">{cat.name}</h4>
                    {cat.description && <p className="text-xs text-[#788B81] mt-1">{cat.description}</p>}
                  </div>
                ))}
                {feeCategories.length === 0 && (
                  <div className="text-center p-6 text-[#788B81] text-sm">
                    No categories defined.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structures Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full">
            <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#2C3531]">Pricing Matrix</h2>
                  <p className="text-sm font-bold text-[#788B81] mt-1">Term: {activeTerm?.name || 'N/A'}</p>
                </div>
                <button 
                  onClick={() => setShowStructureModal(true)} 
                  disabled={!activeTerm || feeCategories.length === 0}
                  className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center disabled:opacity-50"
                >
                  <PlusCircle className="w-4 h-4 mr-2" /> Add Price Link
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#788B81]/10">
                  <thead className="bg-[#F4F1EC]/30">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#788B81] uppercase tracking-wider">Class Level</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#788B81] uppercase tracking-wider">Fee Category</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#788B81] uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-[#788B81] uppercase tracking-wider">Compulsory</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#788B81]/10">
                    {feeStructures.map(fs => (
                      <tr key={fs.id} className="hover:bg-[#F4F1EC]/20 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-[#2C3531]">{fs.class_level.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-[#788B81]">{fs.fee_category.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-emerald-600">${fs.amount.toString()}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {fs.is_compulsory ? (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">Yes</span>
                          ) : (
                            <span className="text-xs font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {feeStructures.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-[#788B81] text-sm">
                          No fee structures defined for this term.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">New Fee Category</h3>
              <button onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <form onSubmit={handleCreateCategory} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g. Tuition Fee"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#788B81]/30 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description (Optional)</label>
                <input 
                  type="text" 
                  name="description" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#788B81]/30 transition-all outline-none"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowCategoryModal(false)} className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">Cancel</button>
                <button type="submit" disabled={isPending} className="flex-1 px-4 py-3 bg-[#1E2522] text-white rounded-xl font-medium disabled:opacity-70 flex justify-center items-center">
                  {isPending ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Structure Modal */}
      {showStructureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Set Fee Pricing</h3>
              <button onClick={() => setShowStructureModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <form onSubmit={handleCreateStructure} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Fee Category</label>
                <select name="fee_category_id" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white">
                  <option value="">Select Category...</option>
                  {feeCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class Level</label>
                <select name="class_level_id" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white">
                  <option value="">Select Class...</option>
                  {classLevels.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  name="amount" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Is Compulsory?</label>
                <select name="is_compulsory" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white">
                  <option value="true">Yes</option>
                  <option value="false">No (Optional Fee)</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowStructureModal(false)} className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">Cancel</button>
                <button type="submit" disabled={isPending} className="flex-1 px-4 py-3 bg-[#1E2522] text-white rounded-xl font-medium disabled:opacity-70 flex justify-center items-center">
                  {isPending ? "Saving..." : "Save Pricing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
