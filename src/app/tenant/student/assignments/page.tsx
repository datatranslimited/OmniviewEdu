import StudentAssignmentsClient from "@/app/tenant/student/assignments/StudentAssignmentsClient"

export default function StudentAssignmentsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3531]">My Assignments</h1>
          <p className="text-[#788B81] mt-1 font-medium">View pending homework and submit your answers.</p>
        </div>
      </div>

      <StudentAssignmentsClient />
    </div>
  )
}
