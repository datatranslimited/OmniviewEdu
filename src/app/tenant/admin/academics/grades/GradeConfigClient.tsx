"use client"
import { Save } from "lucide-react"

export default function GradeConfigClient() {
  const dummyGrades = [
    { min: 70, max: 100, grade: "A", remark: "Excellent" },
    { min: 60, max: 69, grade: "B", remark: "Very Good" },
    { min: 50, max: 59, grade: "C", remark: "Good" },
    { min: 45, max: 49, grade: "D", remark: "Pass" },
    { min: 40, max: 44, grade: "E", remark: "Poor" },
    { min: 0, max: 39, grade: "F", remark: "Fail" },
  ]

  return (
    <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      <div className="bg-white rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10 overflow-hidden">
        
        <div className="bg-[#F4F1EC]/30 px-8 py-5 border-b border-[#788B81]/10">
          <h3 className="text-lg font-bold text-[#2C3531]">Grading System Configuration</h3>
          <p className="text-sm font-medium text-[#788B81] mt-1">Define the score ranges and corresponding letter grades.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#788B81]/10">
            <thead className="bg-[#F4F1EC]/10">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Min Score (%)</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Max Score (%)</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Letter Grade</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-[#788B81] uppercase tracking-widest">Remark</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#788B81]/10">
              {dummyGrades.map((g, i) => (
                <tr key={i} className="hover:bg-[#F4F1EC]/30 transition-colors">
                  <td className="px-8 py-4">
                    <input type="number" defaultValue={g.min} className="w-24 bg-white border border-[#788B81]/20 rounded-xl px-4 py-2 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </td>
                  <td className="px-8 py-4">
                    <input type="number" defaultValue={g.max} className="w-24 bg-white border border-[#788B81]/20 rounded-xl px-4 py-2 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </td>
                  <td className="px-8 py-4">
                    <input type="text" defaultValue={g.grade} className="w-24 bg-white border border-[#788B81]/20 rounded-xl px-4 py-2 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30 text-center uppercase" />
                  </td>
                  <td className="px-8 py-4">
                    <input type="text" defaultValue={g.remark} className="w-48 bg-white border border-[#788B81]/20 rounded-xl px-4 py-2 text-sm font-bold text-[#2C3531] focus:ring-2 focus:ring-[#788B81]/30" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#F4F1EC]/30 px-8 py-5 border-t border-[#788B81]/10 flex justify-end">
          <button className="bg-[#2C3531] text-[#F4F1EC] hover:bg-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center">
            <Save className="w-4 h-4 mr-2" /> Save Grading System
          </button>
        </div>

      </div>
    </div>
  )
}
