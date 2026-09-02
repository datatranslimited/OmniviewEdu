import Link from "next/link"
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, Sparkles, Zap, Brain } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F1EC] text-[#2C3531] relative overflow-hidden font-sans selection:bg-[#788B81] selection:text-white">
      
      {/* Animated Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-[#788B81]/20 blur-[120px] mix-blend-multiply animate-blob pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-[#2C3531]/10 blur-[100px] mix-blend-multiply animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[30rem] h-[30rem] rounded-full bg-emerald-200/30 blur-[100px] mix-blend-multiply animate-blob animation-delay-4000 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#2C3531] rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[#2C3531]/20">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-serif font-black tracking-tight">OmniviewEdu</span>
        </div>
        <div className="hidden md:flex space-x-8 font-medium text-[#788B81]">
          <a href="#features" className="hover:text-[#2C3531] transition-colors">Features</a>
          <a href="#solutions" className="hover:text-[#2C3531] transition-colors">Solutions</a>
          <a href="#ai" className="hover:text-[#2C3531] transition-colors flex items-center"><Sparkles className="w-4 h-4 mr-1 text-emerald-600" /> AI Engine</a>
        </div>
        <Link 
          href="/auth/setup" 
          className="bg-[#2C3531] hover:bg-black text-white px-6 py-2.5 rounded-full font-bold transition-all hover:shadow-xl hover:shadow-[#2C3531]/20 transform hover:-translate-y-0.5"
        >
          Try Demo
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 text-center md:pt-32">
        <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-[#788B81]/20 px-4 py-2 rounded-full mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-sm font-bold text-[#2C3531]">OmniviewEdu 2.0 is Live</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black font-serif tracking-tighter leading-[1.1] mb-8 text-[#2C3531]">
          The Operating System <br className="hidden md:block"/> for Modern Schools.
        </h1>
        
        <p className="text-lg md:text-xl text-[#788B81] max-w-2xl mx-auto mb-12 leading-relaxed">
          Unify your academics, billing, and parent communication in one beautiful, AI-powered platform. Designed to eliminate administrative chaos.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            href="/auth/login" 
            className="group w-full sm:w-auto bg-[#2C3531] hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-2xl hover:shadow-[#2C3531]/30 flex items-center justify-center text-lg"
          >
            Access Portal
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/auth/setup" 
            className="group w-full sm:w-auto bg-white/50 backdrop-blur-md hover:bg-white border border-[#788B81]/20 text-[#2C3531] px-8 py-4 rounded-2xl font-bold transition-all shadow-sm flex items-center justify-center text-lg"
          >
            Run Provisioning Script
          </Link>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-serif mb-4">Everything you need. <br/><span className="text-[#788B81]">Nothing you don't.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[24rem]">
          {/* Card 1 */}
          <div className="md:col-span-2 bg-gradient-to-br from-white to-[#F4F1EC] rounded-[2rem] p-10 shadow-xl border border-white/50 overflow-hidden relative group hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-grid-[#788B81]/[0.02] bg-[length:32px_32px]" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-3">AI-Powered Parent Engagement</h3>
                <p className="text-[#788B81] text-lg max-w-md">Our AI reads approved lesson notes and automatically drafts engaging "Weekly Nuggets" for parents, driving deeper involvement at home.</p>
              </div>
            </div>
            <div className="absolute right-[-10%] bottom-[-20%] w-[30rem] h-[30rem] bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors" />
          </div>

          {/* Card 2 */}
          <div className="bg-[#2C3531] text-white rounded-[2rem] p-10 shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Zap className="w-7 h-7 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">CBT Engine</h3>
                <p className="text-white/70">Deploy multiple-choice exams instantly. Real-time timers and zero-delay auto-grading.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-[#788B81]/10 overflow-hidden relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Bursary & Payments</h3>
                <p className="text-[#788B81]">Track invoices, virtual accounts, and real-time payment reconciliation across the school.</p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-2 bg-gradient-to-tr from-[#F4F1EC] to-white rounded-[2rem] p-10 shadow-xl border border-white/50 overflow-hidden relative group hover:shadow-2xl transition-all duration-500">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 bg-[#788B81]/20 text-[#2C3531] rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-12 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-3">Unified Academics</h3>
                <p className="text-[#788B81] text-lg max-w-md">Manage terms, class arms, subjects, and automated report cards without breaking a sweat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#788B81]/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0 opacity-50">
            <GraduationCap className="w-5 h-5" />
            <span className="font-bold tracking-tight">OmniviewEdu</span>
          </div>
          <p className="text-[#788B81] text-sm font-medium">© {new Date().getFullYear()} Omniview Systems. All rights reserved.</p>
        </div>
      </footer>

      {/* Tailwind Animations injected via style */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </main>
  )
}
