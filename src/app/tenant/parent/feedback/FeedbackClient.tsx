"use client"
import { useState } from "react"
import { MessageSquare, Star, Send, User, ChevronDown, CheckCircle2, Ticket } from "lucide-react"

export default function FeedbackClient() {
  const [activeTab, setActiveTab] = useState<'complaints' | 'ratings'>('complaints')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  
  // Dummy data
  const tickets = [
    { id: "TCK-001", subject: "School Bus Delay", status: "Resolved", date: "Oct 10, 2026" },
    { id: "TCK-002", subject: "Query regarding PTA dues", status: "Open", date: "Oct 18, 2026" },
  ]

  const teachers = [
    { id: 1, name: "Mr. Ayodele", subject: "Mathematics", ward: "Adebayo Johnson", currentRating: 4 },
    { id: 2, name: "Mrs. Nwachukwu", subject: "English Language", ward: "Fatima Johnson", currentRating: 5 },
    { id: 3, name: "Mr. Eze", subject: "Basic Science", ward: "Adebayo Johnson", currentRating: 0 },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        if (activeTab === 'ratings') setSelectedTeacher(null)
      }, 3000)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-sans text-[#2C3531] font-bold tracking-tight mb-2">Feedback & Ratings</h1>
        <p className="text-[#788B81] font-medium leading-relaxed">Communicate with the school administration and rate your wards' teachers.</p>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden flex flex-col min-h-[600px]">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-[#788B81]/10 bg-[#F4F1EC]/30 px-6 pt-4">
            <button 
              onClick={() => setActiveTab('complaints')}
              className={`flex items-center px-6 py-4 font-bold transition-all border-b-2 ${activeTab === 'complaints' ? 'border-[#2C3531] text-[#2C3531]' : 'border-transparent text-[#788B81] hover:text-[#2C3531]'}`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Complaints & Enquiries
            </button>
            <button 
              onClick={() => setActiveTab('ratings')}
              className={`flex items-center px-6 py-4 font-bold transition-all border-b-2 ${activeTab === 'ratings' ? 'border-[#2C3531] text-[#2C3531]' : 'border-transparent text-[#788B81] hover:text-[#2C3531]'}`}
            >
              <Star className="w-5 h-5 mr-2" />
              Teacher Ratings
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 md:p-10">
            
            {/* Complaints Tab */}
            {activeTab === 'complaints' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-[fadeIn_0.3s_ease-out]">
                
                {/* Ticketing Form */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#2C3531] mb-6">Open a New Ticket</h3>
                  
                  {isSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-emerald-900 mb-2">Message Sent!</h4>
                      <p className="text-sm text-emerald-700">The administration will review your complaint and respond shortly.</p>
                      <button onClick={() => setIsSuccess(false)} className="mt-6 px-6 py-2 bg-emerald-600 text-white font-bold rounded-full text-sm">Send Another</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Category</label>
                        <select className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all">
                          <option>General Enquiry</option>
                          <option>Academic Complaint</option>
                          <option>Bursary / Fees Issue</option>
                          <option>School Bus / Transport</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Subject</label>
                        <input required type="text" placeholder="Brief subject of your message" className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-bold text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all" />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Message Description</label>
                        <textarea required rows={5} placeholder="Provide details here..." className="w-full bg-[#F4F1EC]/50 border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-all resize-none"></textarea>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <><Send className="w-4 h-4 mr-2" /> Submit Ticket</>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Ticket History */}
                <div>
                  <h3 className="text-xl font-bold text-[#2C3531] mb-6 flex items-center">
                    <Ticket className="w-5 h-5 mr-2 text-[#788B81]" />
                    Recent Tickets
                  </h3>
                  
                  <div className="space-y-4">
                    {tickets.map(ticket => (
                      <div key={ticket.id} className="p-5 rounded-2xl border border-[#788B81]/10 bg-[#F4F1EC]/20 hover:bg-[#F4F1EC]/50 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-[#2C3531] group-hover:text-[#788B81] transition-colors">{ticket.subject}</h4>
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border 
                            ${ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-medium text-[#788B81]">
                          <span>ID: {ticket.id}</span>
                          <span>{ticket.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Ratings Tab */}
            {activeTab === 'ratings' && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                
                {selectedTeacher ? (
                  // Rating Form for a specific teacher
                  <div className="max-w-2xl mx-auto py-6">
                    <button 
                      onClick={() => setSelectedTeacher(null)}
                      className="text-sm font-bold text-[#788B81] hover:text-[#2C3531] mb-6 flex items-center"
                    >
                      ← Back to Teachers
                    </button>
                    
                    <div className="bg-[#F4F1EC]/30 rounded-2xl p-8 border border-[#788B81]/10 text-center relative overflow-hidden">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-[#F4F1EC] shadow-sm">
                        <User className="w-8 h-8 text-[#788B81]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#2C3531]">{selectedTeacher.name}</h2>
                      <p className="text-[#788B81] font-medium">{selectedTeacher.subject} Teacher for {selectedTeacher.ward}</p>
                      
                      <div className="my-8 py-8 border-y border-[#788B81]/10">
                        <p className="text-sm font-bold uppercase tracking-widest text-[#788B81] mb-6">Rate this Teacher's Performance</p>
                        <div className="flex justify-center space-x-2">
                          {[1,2,3,4,5].map((star) => (
                            <button key={star} className="p-2 hover:scale-110 transition-transform">
                              <Star className="w-10 h-10 text-amber-400 fill-amber-400 opacity-30 hover:opacity-100" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="text-left space-y-4 mb-8">
                        <div>
                          <label className="block text-xs font-bold text-[#788B81] uppercase tracking-widest mb-2">Written Feedback (Optional)</label>
                          <textarea rows={4} placeholder="What did they do well? What could be improved?" className="w-full bg-white border border-[#788B81]/20 rounded-xl px-4 py-3 text-sm font-medium text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 resize-none"></textarea>
                        </div>
                      </div>

                      <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#2C3531] hover:bg-black text-[#F4F1EC] rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          "Submit Evaluation"
                        )}
                      </button>
                    </div>
                  </div>

                ) : (
                  // List of Teachers
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3531] mb-2">Evaluate Teachers</h3>
                    <p className="text-sm font-medium text-[#788B81] mb-8">Select a teacher handling your ward(s) to leave a performance review.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {teachers.map(teacher => (
                        <div key={teacher.id} className="bg-white border border-[#788B81]/10 rounded-2xl p-6 hover:shadow-xl hover:border-[#788B81]/30 transition-all group">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-[#F4F1EC] rounded-full flex items-center justify-center group-hover:bg-[#788B81]/10 transition-colors">
                              <User className="w-6 h-6 text-[#788B81]" />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#2C3531]">{teacher.name}</h4>
                              <p className="text-xs font-bold text-[#788B81] uppercase tracking-widest">{teacher.subject}</p>
                            </div>
                          </div>
                          <div className="bg-[#F4F1EC]/50 rounded-xl p-3 mb-4">
                            <span className="text-[10px] font-bold text-[#788B81] uppercase block mb-1">Teaching:</span>
                            <span className="text-sm font-bold text-[#2C3531]">{teacher.ward}</span>
                          </div>
                          
                          <button 
                            onClick={() => setSelectedTeacher(teacher)}
                            className="w-full py-2.5 bg-white border border-[#788B81]/30 text-[#788B81] hover:bg-[#788B81] hover:text-[#F4F1EC] rounded-xl text-sm font-bold transition-colors"
                          >
                            {teacher.currentRating > 0 ? 'Update Rating' : 'Rate Teacher'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
