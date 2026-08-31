import HrTabs from "@/components/hr/HrTabs"
import { redirect } from "next/navigation"

export default function HrPage() {
  // Redirect to Staff Directory as the default HR view
  redirect("/tenant/admin/hr/staff")
}
