import Link from "next/link";
import { ArrowLeft, ShieldCheck, Users, User } from "lucide-react";
import { notFound } from "next/navigation";

const roleConfig: Record<string, { title: string, icon: any, color: string, bg: string }> = {
  admin: { title: "Admin & Staff", icon: ShieldCheck, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
  teacher: { title: "Teacher", icon: Users, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/30" },
  student: { title: "Student", icon: User, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
  parent: { title: "Parent", icon: Users, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/30" },
};

export default async function LoginPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  
  if (!roleConfig[role]) {
    notFound();
  }

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Portals
      </Link>
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 sm:p-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className={`${config.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-5`}>
            <Icon className={`w-8 h-8 ${config.color}`} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {config.title} Login
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Enter your credentials to access your portal
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2 text-left">
            <label htmlFor="identifier" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {role === 'student' ? 'Admission Number' : 'Email Address'}
            </label>
            <input 
              id="identifier" 
              type={role === 'student' ? 'text' : 'email'} 
              placeholder={role === 'student' ? 'e.g. OVE/2026/001' : 'you@example.com'} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {role === 'student' ? 'Secure PIN' : 'Password'}
              </label>
              <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Forgot {role === 'student' ? 'PIN' : 'password'}?
              </Link>
            </div>
            <input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all shadow-sm shadow-blue-600/20 hover:shadow-md hover:shadow-blue-600/30 mt-4 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
