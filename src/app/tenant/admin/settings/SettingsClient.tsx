"use client"
import { Settings, Image as ImageIcon, Building, Globe, Save } from "lucide-react"

export default function SettingsClient() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8">
          
          <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-[#788B81]/10">
            <Building className="w-6 h-6 text-[#2C3531]" />
            <h2 className="text-xl font-bold text-[#2C3531]">School Information</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">School Name</label>
                <input type="text" defaultValue="Omniview International School" className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Contact Email</label>
                <input type="email" defaultValue="admin@omniview.edu.ng" className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Address</label>
              <textarea rows={3} defaultValue="123 Education Avenue, Lagos, Nigeria" className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 shadow-sm resize-none"></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-8 py-3 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
