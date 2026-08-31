"use client"
import { useState } from "react"
import { Camera, Lock, Mail, User, Shield, CheckCircle2 } from "lucide-react"

export default function ProfileClient() {
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  
  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-sans text-[#2C3531] font-bold tracking-tight mb-2">My Profile & Settings</h1>
        <p className="text-[#788B81] font-medium leading-relaxed">Manage your personal information and security preferences.</p>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 flex flex-col md:flex-row overflow-hidden min-h-[600px]">
          
          {/* Sidebar Navigation */}
          <div className="md:w-64 bg-[#F4F1EC]/30 border-r border-[#788B81]/10 p-6 flex flex-col space-y-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-white shadow-sm text-[#2C3531] border border-[#788B81]/10' : 'text-[#788B81] hover:bg-white/50 hover:text-[#2C3531]'}`}
            >
              <User className="w-4 h-4 mr-3" />
              Personal Info
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-white shadow-sm text-[#2C3531] border border-[#788B81]/10' : 'text-[#788B81] hover:bg-white/50 hover:text-[#2C3531]'}`}
            >
              <Shield className="w-4 h-4 mr-3" />
              Security & Password
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-8 md:p-12">
            
            {activeTab === 'profile' && (
              <div className="max-w-xl animate-[fadeIn_0.3s_ease-out]">
                <h2 className="text-xl font-sans font-bold text-[#2C3531] mb-8">Personal Information</h2>
                
                {/* Avatar Upload */}
                <div className="flex items-center space-x-6 mb-10">
                  <div className="relative group cursor-pointer">
                    <img 
                      src="https://i.pravatar.cc/150?u=admin_omniview" 
                      alt="User Avatar" 
                      className="w-24 h-24 rounded-[2rem] object-cover border-4 border-white shadow-md transition-all group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#788B81] text-[#F4F1EC] p-2 rounded-full shadow-lg border-2 border-white">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2C3531]">Profile Picture</h3>
                    <p className="text-xs text-[#788B81] mt-1 mb-3">JPG, GIF or PNG. Max size of 5MB.</p>
                    <button className="px-4 py-2 bg-[#F4F1EC] hover:bg-[#788B81]/10 text-[#788B81] hover:text-[#2C3531] text-xs font-bold rounded-full transition-colors border border-[#788B81]/20">
                      Upload New Image
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">First Name</label>
                      <input type="text" defaultValue="Admin" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Last Name</label>
                      <input type="text" defaultValue="User" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
                      <input type="email" defaultValue="admin@omniview.edu" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Phone Number</label>
                    <input type="tel" defaultValue="+234 801 234 5678" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all" />
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#788B81]/10 flex items-center justify-end">
                  <button 
                    onClick={handleSave}
                    className="px-8 py-3 bg-[#788B81] hover:bg-[#64766C] text-[#F4F1EC] rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center"
                  >
                    {isSaved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Saved Successfully</> : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="max-w-xl animate-[fadeIn_0.3s_ease-out]">
                <h2 className="text-xl font-sans font-bold text-[#2C3531] mb-8">Security & Password</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
                      <input type="password" placeholder="Enter current password" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all" />
                    </div>
                  </div>

                  <div className="pt-4 pb-2">
                    <div className="h-px w-full bg-[#788B81]/10"></div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
                      <input type="password" placeholder="Enter new password" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all" />
                    </div>
                    <p className="text-xs text-[#788B81] mt-2">Password must be at least 8 characters and include a number.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#788B81]" />
                      <input type="password" placeholder="Confirm new password" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#788B81]/10 flex items-center justify-end">
                  <button 
                    onClick={handleSave}
                    className="px-8 py-3 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center"
                  >
                    {isSaved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Password Updated</> : "Update Password"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
