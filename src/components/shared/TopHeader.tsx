"use client"
import { Bell, Search, Menu, LogOut, Settings, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { logoutUser } from '@/app/auth/login/actions'
export default function TopHeader({ 
  schoolName = "My School", 
  userEmail = "user@omniview.edu",
  userFirstName = "User",
  userLastName = "",
  onMenuClick 
}: { 
  schoolName?: string
  userEmail?: string
  userFirstName?: string
  userLastName?: string
  onMenuClick?: () => void 
}) {
  const router = useRouter()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logoutUser()
  }

  return (
    <header className="relative z-50 flex h-16 w-full items-center justify-between border-b border-[#788B81]/20 bg-transparent px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      {/* Left side: School Context & Mobile Menu */}
      <div className="flex items-center">
        {/* Mobile Hamburger Button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden mr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="hidden md:flex bg-[#788B81]/10 px-4 py-1.5 rounded-full border border-[#788B81]/20 shadow-sm">
          <span className="text-xs font-bold tracking-wide text-[#2C3531]">{schoolName}</span>
        </div>
      </div>

      {/* Right side: Search, Notifications, Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 h-10">
            <Search className="h-4 w-4 text-[#788B81]" />
          </div>
          <input
            type="text"
            className="block w-full h-10 rounded-full border border-[#788B81]/20 bg-white/60 pl-11 pr-4 text-[#2C3531] placeholder:text-[#788B81]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#788B81]/20 sm:text-sm font-medium transition-all leading-normal"
            placeholder="Search students, classes..."
          />
        </div>

        <button type="button" className="relative rounded-full p-2 text-[#788B81] hover:text-[#2C3531] hover:bg-[#788B81]/10 transition-colors focus:outline-none">
          <span className="sr-only">View notifications</span>
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-[#788B81] ring-2 ring-[#F4F1EC]"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative border-l border-[#788B81]/20 pl-4 ml-2" ref={dropdownRef}>
          <button 
            type="button" 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#788B81]/30 transition-transform active:scale-95 group"
          >
            <span className="sr-only">Open user menu</span>
            <img 
              src="https://i.pravatar.cc/150?u=admin_omniview" 
              alt="User Avatar" 
              className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-[#788B81]/40 transition-colors"
            />
          </button>
          
          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#788B81]/20 shadow-xl py-2 z-50 animate-[fadeIn_0.2s_ease-out]">
              <div className="px-4 py-3 border-b border-[#788B81]/10">
                <p className="text-sm font-bold text-[#2C3531]">{userFirstName} {userLastName}</p>
                <p className="text-xs font-medium text-[#788B81] truncate">{userEmail}</p>
              </div>
              <div className="py-2">
                <Link 
                  href="/tenant/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-[#2C3531] hover:bg-[#F4F1EC]/50 hover:text-[#788B81] transition-colors"
                >
                  <User className="h-4 w-4 mr-3 text-[#788B81]" />
                  My Profile
                </Link>
                <Link 
                  href="/tenant/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-[#2C3531] hover:bg-[#F4F1EC]/50 hover:text-[#788B81] transition-colors"
                >
                  <Settings className="h-4 w-4 mr-3 text-[#788B81]" />
                  Settings
                </Link>
              </div>
              <div className="py-2 border-t border-[#788B81]/10">
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
