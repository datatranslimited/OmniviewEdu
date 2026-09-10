"use client"

import React, { useState, useTransition } from "react"
import { Building, ShieldCheck, Mail, Phone, Map, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { provisionNewSchool } from "../../actions"

export default function ProvisionSchoolClient() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await provisionNewSchool(formData)
      if (res?.error) {
        setError(res.error)
      }
      // If successful, the action will redirect, so no success state needed here.
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex items-start text-sm font-medium">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. School Information */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-serif text-[#2C3531] mb-1">School Details</h2>
          <p className="text-sm font-medium text-[#788B81]">Enter the public information for the institution.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C3531] uppercase tracking-wider">School Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-[#788B81]/50" />
              </div>
              <input type="text" name="name" required placeholder="e.g. Oxford Academy" 
                className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 pl-11 pr-4 text-[#2C3531] outline-none focus:ring-2 focus:ring-[#788B81]/40 focus:bg-white transition-all" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C3531] uppercase tracking-wider">Unique Slug (URL)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Map className="h-5 w-5 text-[#788B81]/50" />
              </div>
              <input type="text" name="slug" required placeholder="e.g. oxford-academy" 
                className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 pl-11 pr-4 text-[#2C3531] outline-none focus:ring-2 focus:ring-[#788B81]/40 focus:bg-white transition-all lowercase" />
            </div>
            <p className="text-[11px] text-[#788B81] font-medium mt-1 pl-1">This will be used for their login URL.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C3531] uppercase tracking-wider">Official Phone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-[#788B81]/50" />
              </div>
              <input type="tel" name="phone" placeholder="+234..." 
                className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 pl-11 pr-4 text-[#2C3531] outline-none focus:ring-2 focus:ring-[#788B81]/40 focus:bg-white transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C3531] uppercase tracking-wider">Subscription Plan</label>
            <select name="subscriptionPlan" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 px-4 text-[#2C3531] outline-none focus:ring-2 focus:ring-[#788B81]/40 focus:bg-white transition-all appearance-none cursor-pointer font-medium">
              <option value="STANDARD">Standard</option>
              <option value="PRO">Pro</option>
              <option value="ENTERPRISE">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      <hr className="border-[#788B81]/10" />

      {/* 2. Admin Information */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-serif text-[#2C3531] mb-1">Primary Administrator</h2>
          <p className="text-sm font-medium text-[#788B81]">This account will be created automatically with full school privileges.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C3531] uppercase tracking-wider">First Name</label>
            <input type="text" name="adminFirstName" required placeholder="Jane" 
              className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 px-4 text-[#2C3531] outline-none focus:ring-2 focus:ring-[#788B81]/40 focus:bg-white transition-all" />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C3531] uppercase tracking-wider">Last Name</label>
            <input type="text" name="adminLastName" required placeholder="Doe" 
              className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 px-4 text-[#2C3531] outline-none focus:ring-2 focus:ring-[#788B81]/40 focus:bg-white transition-all" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-[#2C3531] uppercase tracking-wider">Admin Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#788B81]/50" />
              </div>
              <input type="email" name="adminEmail" required placeholder="jane@oxford.edu" 
                className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3 pl-11 pr-4 text-[#2C3531] outline-none focus:ring-2 focus:ring-[#788B81]/40 focus:bg-white transition-all" />
            </div>
            <p className="text-[11px] text-[#788B81] font-medium mt-1 pl-1">Default password will be generated and shown after setup.</p>
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end">
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-[#2C3531] hover:bg-black text-[#F4F1EC] font-bold py-3.5 px-8 rounded-full shadow-lg shadow-[#2C3531]/20 flex items-center justify-center transition-all disabled:opacity-70 group"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Provision School <ShieldCheck className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
