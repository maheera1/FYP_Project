"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Settings, LogOut, ChevronDown } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useAuth } from "@/contexts/auth-context"

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { profileImage, isDarkMode } = useSettings()
  const { logout, user } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:opacity-80 transition-opacity"
      >
        <Image
          src={user?.profileImage || profileImage || "/user.png"}
          alt="Profile"
          width={40}
          height={40}
          className={`rounded-full border-2 ${isDarkMode ? "border-white" : "border-[#3a2e27]"}`}
        />
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isDarkMode ? "text-white" : "text-[#3a2e27]"} ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg border py-1 z-50 ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
              isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-[#3a2e27] hover:bg-gray-100"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors w-full text-left ${
              isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-[#3a2e27] hover:bg-gray-100"
            }`}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
