import Link from "next/link";
import { GraduationCap, Users, User, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12 text-center">
        <div className="space-y-6">
          <div className="mx-auto bg-blue-600 p-4 rounded-full w-24 h-24 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <GraduationCap className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Omniviewedu
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive School Management & Academic Excellence Platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
          {/* Admin Portal */}
          <Link href="/login" className="group p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500 transition-all duration-300 flex flex-col gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
              <ShieldCheck className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Admin & Staff</h3>
              <p className="text-base text-slate-500 dark:text-slate-400 mt-2">Proprietor, Principal, HR, & Bursary</p>
            </div>
          </Link>

          {/* Teacher Portal */}
          <Link href="/login" className="group p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500 transition-all duration-300 flex flex-col gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
              <Users className="w-7 h-7 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Teacher Portal</h3>
              <p className="text-base text-slate-500 dark:text-slate-400 mt-2">Lesson Notes, Attendance & Grading</p>
            </div>
          </Link>

          {/* Student Portal */}
          <Link href="/login" className="group p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500 transition-all duration-300 flex flex-col gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/30 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
              <User className="w-7 h-7 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Student Portal</h3>
              <p className="text-base text-slate-500 dark:text-slate-400 mt-2">CBT Exams, Assignments & Results</p>
            </div>
          </Link>

          {/* Parent Portal */}
          <Link href="/login" className="group p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500 transition-all duration-300 flex flex-col gap-4">
            <div className="bg-orange-50 dark:bg-orange-900/30 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-600 transition-all duration-300">
              <Users className="w-7 h-7 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Parent Portal</h3>
              <p className="text-base text-slate-500 dark:text-slate-400 mt-2">Virtual Accounts, Fees & AI Digest</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
