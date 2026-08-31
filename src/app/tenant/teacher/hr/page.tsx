import TeacherHrClient from "@/app/tenant/teacher/hr/TeacherHrClient"

export default function TeacherHrPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2C3531]">My HR Portal</h1>
        <p className="text-[#788B81] mt-1 font-medium">Request leaves, view disciplinary queries, and download payslips.</p>
      </div>

      <TeacherHrClient />
    </div>
  )
}
