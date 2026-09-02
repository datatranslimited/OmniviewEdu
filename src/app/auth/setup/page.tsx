"use client"
import React, { useState, useTransition } from "react"
import { Database, Users, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react"
import { setupTestAccounts } from "./actions"
import Link from "next/link"

export default function SetupPage() {
  const [isPending, startTransition] = useTransition()
  const [results, setResults] = useState<any[] | null>(null)

  function handleSetup() {
    startTransition(async () => {
      const res = await setupTestAccounts()
      if (res.success) {
        setResults(res.results)
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-[#788B81]/20">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Database className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-bold text-center text-[#2C3531] mb-2">Auth Seeding Setup</h1>
        <p className="text-center text-[#788B81] mb-8">
          This script will register three test accounts directly into your Supabase Auth project and link them to the local Prisma database.
        </p>

        {!results ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex">
              <Users className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-bold mb-1">Accounts to be created:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Admin:</strong> admin@omniview.edu</li>
                  <li><strong>Teacher:</strong> teacher@omniview.edu</li>
                  <li><strong>Parent:</strong> parent@omniview.edu</li>
                  <li><strong>Student:</strong> student@omniview.edu</li>
                </ul>
                <p className="mt-2 opacity-80">(Password for all: <code>Password123!</code>)</p>
              </div>
            </div>

            <button 
              onClick={handleSetup}
              disabled={isPending}
              className="w-full bg-[#2C3531] hover:bg-black text-white font-bold py-4 px-4 rounded-xl transition-all disabled:opacity-50"
            >
              {isPending ? "Provisioning Accounts..." : "Run Setup Script"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-bold text-[#2C3531]">Results:</h3>
            <div className="space-y-3">
              {results.map((res, i) => (
                <div key={i} className={`p-4 rounded-xl border ${res.status === 'Success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-amber-50 border-amber-100 text-amber-800'} flex items-start`}>
                  {res.status === 'Success' ? <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />}
                  <div>
                    <p className="font-bold">{res.email}</p>
                    <p className="text-sm opacity-90">{res.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/auth/login" className="w-full bg-[#2C3531] hover:bg-black text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center transition-all">
              Proceed to Login <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
