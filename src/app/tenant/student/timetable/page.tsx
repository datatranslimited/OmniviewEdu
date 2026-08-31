// Force TS Index Update
import TimetableClient from "./TimetableClient"

export default async function StudentTimetablePage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <TimetableClient />
    </div>
  )
}
