import ExamsClient from "./ExamsClient"

export default function TeacherExamsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3531]">Exams & CBT Management</h1>
          <p className="text-[#788B81] mt-1 font-medium">Schedule upcoming exams and manage Computer-Based Tests.</p>
        </div>
      </div>

      <ExamsClient />
    </div>
  )
}
