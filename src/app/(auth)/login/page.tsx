"use client";

import Link from "next/link";
import { ArrowLeft, GraduationCap, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMockLogin = (role: string, path: string) => {
    setIsLoading(true);
    // Set a client-side cookie that the server layout will read
    document.cookie = `mock_role=${role}; path=/`;
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-24 sm:py-32 relative z-10 flex flex-col items-center">
      <Link href="/" className="group inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 mb-12 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
        <div className="w-8 h-8 rounded-full bg-stone-200/50 flex items-center justify-center mr-3 group-hover:-translate-x-1 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <ArrowLeft className="w-4 h-4" />
        </div>
        Back to Home
      </Link>
      
      {/* Outer Shell (Double-Bezel) */}
      <div className="w-full bg-stone-900/5 p-2 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-stone-900/5">
        {/* Inner Core */}
        <div className="bg-[#FDFBF7] rounded-[calc(2.5rem-0.5rem)] p-8 sm:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] border border-stone-100 relative overflow-hidden">
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="bg-stone-900 text-[#FDFBF7] w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-6 shadow-xl shadow-stone-900/10">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-serif text-stone-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-stone-500 mt-3 font-medium">
              Enter your credentials to access the institution portal.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-sm rounded-2xl border border-red-100 font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input 
                id="email" 
                name="email"
                type="email" 
                placeholder="e.g. you@example.com" 
                className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-white focus:outline-none focus:ring-4 focus:ring-stone-900/5 focus:border-stone-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] text-stone-900 placeholder:text-stone-300 shadow-sm"
                required
              />
            </div>

            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between ml-1">
                <label htmlFor="password" className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Password
                </label>
                <Link href="#" className="text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors">
                  Reset
                </Link>
              </div>
              <input 
                id="password" 
                name="password"
                type="password" 
                placeholder="••••••••" 
                className="w-full px-5 py-4 rounded-2xl border border-stone-200 bg-white focus:outline-none focus:ring-4 focus:ring-stone-900/5 focus:border-stone-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] text-stone-900 placeholder:text-stone-300 shadow-sm"
                required
              />
            </div>

            <div className="pt-4 border-t border-stone-100 mt-8">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 text-center mb-4">Select Portal</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  onClick={() => handleMockLogin("SUPER_ADMIN", "/tenant/admin")}
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center bg-stone-900 hover:bg-black text-[#FDFBF7] font-semibold py-4 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Admin"}
                </button>
                <button 
                  type="button"
                  onClick={() => handleMockLogin("TEACHER", "/tenant/teacher")}
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center bg-stone-900 hover:bg-black text-[#FDFBF7] font-semibold py-4 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Teacher"}
                </button>
                <button 
                  type="button"
                  onClick={() => handleMockLogin("PARENT", "/tenant/parent")}
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center bg-stone-900 hover:bg-black text-[#FDFBF7] font-semibold py-4 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Parent"}
                </button>
                <button 
                  type="button"
                  onClick={() => handleMockLogin("STUDENT", "/tenant/student")}
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center bg-stone-900 hover:bg-black text-[#FDFBF7] font-semibold py-4 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Student"}
                </button>
              </div>
              <div className="mt-3">
                <button 
                  type="button"
                  onClick={() => handleMockLogin("PLATFORM_OWNER", "/platform")}
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center bg-stone-100 border border-stone-300 hover:bg-stone-200 text-stone-900 font-bold py-4 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "God Mode (Platform Owner)"}
                </button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
      
      <div className="absolute bottom-8 w-full text-center">
        <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400/60">
          Engineered by Data Trans Limited
        </p>
      </div>
    </div>
  );
}
