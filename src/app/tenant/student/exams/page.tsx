import StudentExamsClient from "./StudentExamsClient"

export default function StudentExamsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3531]">Exams & CBT</h1>
          <p className="text-[#788B81] mt-1 font-medium">View your exam schedule and take Computer-Based Tests.</p>
        </div>
      </div>

      <StudentExamsClient />
    </div>
  )
}
