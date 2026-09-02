import LoginClient from "./LoginClient"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-black text-[#2C3531] mb-2 tracking-tight">OmniviewEdu</h1>
          <p className="text-[#788B81] font-medium">Welcome back! Please login to your account.</p>
        </div>

        <LoginClient />

      </div>
    </div>
  )
}
