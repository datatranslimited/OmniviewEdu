"use client"
import { useState, useEffect } from "react"
import { GraduationCap, Calendar, Clock, MonitorPlay, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function StudentExamsClient() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'active'>('schedule')
  const [exams] = useState([
    { id: "EXM-001", title: "Mid-Term Mathematics", subject: "Mathematics", date: "Oct 20, 2026 - 10:00 AM", duration: "60", type: "CBT", status: "Available Now" },
    { id: "EXM-002", title: "English Language Final", subject: "English Language", date: "Nov 05, 2026 - 09:00 AM", duration: "120", type: "Written", status: "Upcoming" }
  ])

  // CBT State
  const [isCbtActive, setIsCbtActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3600) // 60 mins
  const [currentQuestion, setCurrentQuestion] = useState(1)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCbtActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [isCbtActive, timeLeft])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleStartCbt = () => {
    setIsCbtActive(true)
    setActiveTab('active')
  }

  const handleSubmitCbt = () => {
    setIsCbtActive(false)
    setActiveTab('schedule')
    alert("Exam Submitted Successfully!")
  }

  return (
    <div className="space-y-6">
      
      {!isCbtActive && (
        <div className="flex space-x-2 bg-[#F4F1EC] p-1.5 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === 'schedule' ? 'bg-white text-[#2C3531] shadow-sm' : 'text-[#788B81] hover:text-[#2C3531]'}`}
          >
            My Schedule
          </button>
        </div>
      )}

      {/* SCHEDULE VIEW */}
      {!isCbtActive && activeTab === 'schedule' && (
        <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]">
          <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 h-full">
            <h3 className="text-lg font-bold text-[#2C3531] mb-6">Upcoming Exams</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {exams.map(exam => (
                <div key={exam.id} className={`p-6 rounded-3xl border transition-colors flex flex-col ${exam.status === 'Available Now' ? 'border-emerald-200 bg-emerald-50/30' : 'border-[#788B81]/20 bg-[#F4F1EC]/20'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${exam.type === 'CBT' ? 'bg-blue-100 text-blue-700' : 'bg-[#788B81]/20 text-[#2C3531]'}`}>
                        {exam.type}
                      </span>
                      <h4 className="font-bold text-[#2C3531] text-lg mt-2">{exam.title}</h4>
                      <p className="text-sm font-medium text-[#788B81]">{exam.subject}</p>
                    </div>
                    {exam.status === 'Available Now' ? (
                      <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 animate-pulse">
                        <MonitorPlay className="w-3 h-3 mr-1" /> Available
                      </span>
                    ) : (
                      <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                        <Clock className="w-3 h-3 mr-1" /> Upcoming
                      </span>
                    )}
                  </div>

                  <div className="text-sm font-medium text-[#788B81] mb-6">
                    <p className="flex items-center mb-1"><Calendar className="w-4 h-4 mr-2" /> {exam.date}</p>
                    <p className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {exam.duration} Minutes</p>
                  </div>

                  {exam.status === 'Available Now' && exam.type === 'CBT' && (
                    <button 
                      onClick={handleStartCbt}
                      className="mt-auto w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex justify-center items-center"
                    >
                      <MonitorPlay className="w-4 h-4 mr-2" /> Start CBT Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE CBT INTERFACE */}
      {isCbtActive && (
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#788B81]/20 overflow-hidden flex flex-col h-[700px]">
          
          {/* Top Bar */}
          <div className="bg-[#2C3531] text-[#F4F1EC] p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Mid-Term Mathematics</h2>
              <p className="text-[#788B81] text-sm">JSS 1 A • Student: John Doe</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <AlertTriangle className={`w-5 h-5 mr-2 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`} />
                <span className={`text-2xl font-black tracking-widest ${timeLeft < 300 ? 'text-red-500' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <button onClick={handleSubmitCbt} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                Submit Exam
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Navigator */}
            <div className="w-64 bg-[#F4F1EC]/30 border-r border-[#788B81]/10 p-6 overflow-y-auto">
              <h4 className="text-sm font-bold text-[#788B81] uppercase tracking-widest mb-4">Questions</h4>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({length: 20}).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentQuestion(i + 1)}
                    className={`h-10 rounded-lg font-bold text-sm transition-colors ${
                      currentQuestion === i + 1 
                        ? 'bg-[#2C3531] text-white' 
                        : (i % 3 === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-white border border-[#788B81]/20 text-[#2C3531]')
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Question Area */}
            <div className="flex-1 p-10 flex flex-col">
              <div className="mb-8">
                <span className="px-3 py-1 bg-[#F4F1EC] text-[#788B81] rounded-full text-sm font-bold">Question {currentQuestion} of 20</span>
              </div>
              
              <h3 className="text-2xl font-medium text-[#2C3531] mb-8 leading-relaxed">
                If <span className="font-serif italic">3x - 7 = 14</span>, what is the value of <span className="font-serif italic">x</span>?
              </h3>

              <div className="space-y-4 max-w-2xl">
                {['x = 7', 'x = 21', 'x = 3', 'x = -7'].map((opt, i) => (
                  <label key={i} className="flex items-center p-5 rounded-2xl border-2 border-[#788B81]/10 hover:border-[#788B81]/40 cursor-pointer transition-colors bg-white hover:bg-[#F4F1EC]/20 group">
                    <div className="w-6 h-6 rounded-full border-2 border-[#788B81]/30 mr-4 flex items-center justify-center group-hover:border-[#2C3531]">
                      {/* Fake Radio */}
                      {i === 0 && <div className="w-3 h-3 bg-[#2C3531] rounded-full"></div>}
                    </div>
                    <span className="text-lg text-[#2C3531] font-medium">{opt}</span>
                  </label>
                ))}
              </div>

              <div className="mt-auto pt-8 flex justify-between">
                <button 
                  onClick={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
                  disabled={currentQuestion === 1}
                  className="px-8 py-3 bg-[#F4F1EC] text-[#2C3531] rounded-xl font-bold disabled:opacity-50"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentQuestion(prev => Math.min(20, prev + 1))}
                  disabled={currentQuestion === 20}
                  className="px-8 py-3 bg-[#2C3531] text-[#F4F1EC] rounded-xl font-bold disabled:opacity-50"
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
