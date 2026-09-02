"use client"

import { useState, useTransition } from "react"
import { Plus, Calendar, CheckCircle2, Trash2, Clock } from "lucide-react"
import { 
  createAcademicSession, 
  setActiveAcademicSession, 
  deleteAcademicSession,
  createAcademicTerm,
  setActiveAcademicTerm,
  deleteAcademicTerm
} from "./actions"

export default function SessionsClient({ initialSessions }: { initialSessions: any[] }) {
  const [sessions, setSessions] = useState(initialSessions)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  // Modals state
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [showTermModal, setShowTermModal] = useState<string | null>(null) // holds session_id if open

  async function handleCreateSession(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await createAcademicSession(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setShowSessionModal(false)
      }
    })
  }

  async function handleSetActiveSession(session_id: string) {
    startTransition(async () => {
      const formData = new FormData()
      formData.append("session_id", session_id)
      const res = await setActiveAcademicSession(formData)
      if (res.error) setError(res.error)
    })
  }

  async function handleCreateTerm(e: React.FormEvent<HTMLFormElement>, session_id: string) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.append("session_id", session_id)
    
    startTransition(async () => {
      const res = await createAcademicTerm(formData)
      if (res.error) {
        setError(res.error)
      } else {
        setShowTermModal(null)
      }
    })
  }

  async function handleSetActiveTerm(term_id: string) {
    startTransition(async () => {
      const formData = new FormData()
      formData.append("term_id", term_id)
      const res = await setActiveAcademicTerm(formData)
      if (res.error) setError(res.error)
    })
  }

  return (
    <div className="space-y-8 relative">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center justify-between shadow-sm">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowSessionModal(true)}
          className="flex items-center gap-2 bg-[#1E2522] hover:bg-[#2C3531] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>New Academic Session</span>
        </button>
      </div>

      {/* Sessions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className={`
              relative overflow-hidden rounded-3xl border transition-all duration-300
              ${session.is_current 
                ? 'bg-white/80 border-green-500/30 shadow-lg shadow-green-500/10' 
                : 'bg-white/40 border-white/60 shadow-sm hover:shadow-md'
              }
              backdrop-blur-xl p-6
            `}
          >
            {/* Session Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-gray-900">{session.name}</h3>
                  {session.is_current && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active Session
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(session.start_date).toLocaleDateString()} - {new Date(session.end_date).toLocaleDateString()}
                </p>
              </div>
              
              {!session.is_current && (
                <button
                  onClick={() => handleSetActiveSession(session.id)}
                  disabled={isPending}
                  className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Set Active
                </button>
              )}
            </div>

            {/* Terms List inside Session */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Terms</h4>
                <button
                  onClick={() => setShowTermModal(session.id)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Term
                </button>
              </div>

              {session.terms.length === 0 ? (
                <div className="text-center py-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-sm text-gray-500">No terms configured for this session.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {session.terms.map((term: any) => (
                    <div 
                      key={term.id}
                      className={`
                        flex items-center justify-between p-4 rounded-2xl border transition-all
                        ${term.is_current 
                          ? 'bg-blue-50/50 border-blue-200' 
                          : 'bg-white/50 border-gray-100'
                        }
                      `}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">
                            {term.name.replace('_', ' ')}
                          </span>
                          {term.is_current && (
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                              Active Term
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(term.start_date).toLocaleDateString()} - {new Date(term.end_date).toLocaleDateString()}
                        </p>
                      </div>

                      {(!term.is_current && session.is_current) && (
                        <button
                          onClick={() => handleSetActiveTerm(term.id)}
                          disabled={isPending}
                          className="text-xs px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
                        >
                          Set Active
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {sessions.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60">
            <Calendar className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No Academic Sessions</h3>
            <p className="text-gray-500 mt-2 text-center max-w-sm">
              Create your first academic session (e.g. 2026/2027) to begin setting up your school's calendar.
            </p>
          </div>
        )}
      </div>

      {/* New Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Create Academic Session</h3>
              <button onClick={() => setShowSessionModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                ×
              </button>
            </div>
            <form onSubmit={handleCreateSession} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Session Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g. 2026/2027"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                  <input 
                    type="date" 
                    name="start_date" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                  <input 
                    type="date" 
                    name="end_date" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSessionModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-4 py-3 bg-[#1E2522] hover:bg-[#2C3531] text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 flex justify-center items-center"
                >
                  {isPending ? "Creating..." : "Create Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Term Modal */}
      {showTermModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transform transition-all">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">Add Term</h3>
              <button onClick={() => setShowTermModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                ×
              </button>
            </div>
            <form onSubmit={(e) => handleCreateTerm(e, showTermModal)} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Term Name</label>
                <select 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="FIRST_TERM">First Term</option>
                  <option value="SECOND_TERM">Second Term</option>
                  <option value="THIRD_TERM">Third Term</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                  <input 
                    type="date" 
                    name="start_date" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                  <input 
                    type="date" 
                    name="end_date" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Next Term Resumption (Optional)</label>
                <input 
                  type="date" 
                  name="next_term_resumption_date" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowTermModal(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-4 py-3 bg-[#1E2522] hover:bg-[#2C3531] text-white rounded-xl font-medium transition-all shadow-md disabled:opacity-70 flex justify-center items-center"
                >
                  {isPending ? "Saving..." : "Add Term"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
