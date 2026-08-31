import { Building2 } from "lucide-react"

export default function ProvisionedSchoolsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-serif text-stone-900 tracking-tight mb-2">Provisioned Schools</h1>
          <p className="text-stone-500 font-medium">Manage and configure all school instances on the platform.</p>
        </div>
      </div>

      <div className="bg-stone-900/5 p-2 rounded-[2.5rem] backdrop-blur-xl border border-stone-900/5">
        <div className="bg-[#FDFBF7] rounded-[calc(2.5rem-0.5rem)] p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] border border-stone-100 flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-6">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif text-stone-900 mb-2">Detailed School Management</h2>
          <p className="text-stone-500 max-w-md mx-auto mb-8">This module will provide deep configuration overrides, domain mapping, and API key management for each provisioned school.</p>
          <button className="px-6 py-3 bg-stone-900 hover:bg-black text-[#FDFBF7] rounded-full font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-lg">
            Provision New School
          </button>
        </div>
      </div>
    </div>
  )
}
