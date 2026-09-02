"use client"

import React, { useState, useTransition } from "react"
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react"
import { loginWithEmail } from "./actions"

export default function LoginClient() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await loginWithEmail(formData)
      if (res?.error) {
        setError(res.error)
      }
    })
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl border border-[#788B81]/10">
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-start mb-6 text-sm">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#2C3531]">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-[#788B81]/50" />
            </div>
            <input 
              type="email" 
              name="email"
              required 
              defaultValue="admin@omniview.edu"
              className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3.5 pl-11 pr-4 text-[#2C3531] outline-none focus:ring-2 focus:ring-[#788B81]/40 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#2C3531]">Password</label>
            <a href="#" className="text-xs font-bold text-[#788B81] hover:text-[#2C3531] transition-colors">Forgot password?</a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#788B81]/50" />
            </div>
            <input 
              type="password" 
              name="password"
              required 
              defaultValue="Password123!"
              className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl py-3.5 pl-11 pr-4 text-[#2C3531] outline-none focus:ring-2 focus:ring-[#788B81]/40 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-[#2C3531] hover:bg-black text-[#F4F1EC] font-bold py-4 px-4 rounded-xl shadow-lg shadow-[#2C3531]/20 flex items-center justify-center transition-all disabled:opacity-70 group mt-4"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Sign In <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
