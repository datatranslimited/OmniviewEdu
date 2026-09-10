import { Building2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ProvisionSchoolClient from "./ProvisionSchoolClient"

export const metadata = {
  title: "Provision New School | OmniviewEdu",
}

export default function ProvisionSchoolPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          href="/platform/schools" 
          className="inline-flex items-center text-sm font-bold text-[#788B81] hover:text-[#2C3531] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Schools
        </Link>
        <h1 className="text-3xl font-serif text-[#2C3531] tracking-normal mb-2 leading-tight">
          Provision New School
        </h1>
        <p className="text-[#788B81] font-medium leading-relaxed">
          Create a new school tenant and generate the primary administrator account.
        </p>
      </div>

      <div className="bg-white/40 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 sm:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-[#788B81]/10">
          <div className="w-16 h-16 bg-[#F4F1EC] rounded-full flex items-center justify-center text-[#788B81] mb-8">
            <Building2 className="w-8 h-8" />
          </div>
          
          <ProvisionSchoolClient />
          
        </div>
      </div>
    </div>
  )
}
