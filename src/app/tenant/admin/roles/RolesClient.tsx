"use client"
import { Shield, Users, Lock, Key } from "lucide-react"

export default function RolesClient() {
  const roles = [
    { name: "Super Admin", users: 2, desc: "Full access to all modules and settings." },
    { name: "Teacher", users: 45, desc: "Access to assigned classes, grading, and attendance." },
    { name: "Bursar", users: 3, desc: "Access to fee management and financial reports." },
    { name: "Student", users: 1248, desc: "Access to personal grades, assignments, and timetable." },
  ]

  return (
    <div className="space-y-6">
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {roles.map((role, i) => (
          <div key={i} className="bg-white/40 p-2 rounded-[2rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-5 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-[#F4F1EC]">
                  <Shield className="w-5 h-5 text-[#2C3531]" />
                </div>
                <span className="text-xs font-bold text-[#788B81] bg-[#F4F1EC]/50 px-2 py-1 rounded-lg">
                  {role.users} Users
                </span>
              </div>
              <h3 className="font-bold text-[#2C3531] text-lg mb-1">{role.name}</h3>
              <p className="text-xs text-[#788B81]">{role.desc}</p>
              <button className="mt-4 text-xs font-bold text-[#2C3531] underline decoration-[#788B81]/30 underline-offset-4 hover:text-[#788B81] transition-colors self-start">
                Edit Permissions
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[300px]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 p-8 flex flex-col items-center justify-center text-center h-full">
          <div className="w-16 h-16 bg-[#F4F1EC] rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-[#788B81]" />
          </div>
          <h2 className="text-xl font-bold text-[#2C3531] mb-2">Granular Permissions</h2>
          <p className="text-[#788B81] max-w-md font-medium mb-6">
            Detailed role-based access control (RBAC) matrices will be configured here during the backend integration phase.
          </p>
          <button className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95">
            Add Custom Role
          </button>
        </div>
      </div>

    </div>
  )
}
