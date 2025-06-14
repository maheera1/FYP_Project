"use client"
import Link from "next/link"
import { X, Settings, LogOut } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  currentPage?: string
}

export default function MobileMenu({ isOpen, onClose, currentPage = "" }: MobileMenuProps) {
  const handleLogout = () => {
    console.log("Logging out...")
    localStorage.removeItem("archimorph-settings")
    window.location.href = "/login"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="bg-white dark:bg-gray-800 h-full w-4/5 max-w-sm p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-[#3a2e27] dark:text-white">Menu</h2>
          <button onClick={onClose} className="text-[#3a2e27] dark:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className={`text-lg py-2 border-b border-gray-200 dark:border-gray-700 text-[#3a2e27] dark:text-white ${currentPage === "home" ? "font-bold" : ""}`}
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            href="/#features"
            className={`text-lg py-2 border-b border-gray-200 dark:border-gray-700 text-[#3a2e27] dark:text-white ${currentPage === "features" ? "font-bold" : ""}`}
            onClick={onClose}
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className={`text-lg py-2 border-b border-gray-200 dark:border-gray-700 text-[#3a2e27] dark:text-white ${currentPage === "how-it-works" ? "font-bold" : ""}`}
            onClick={onClose}
          >
            How it Works
          </Link>
          <Link
            href="/chat"
            className={`text-lg py-2 border-b border-gray-200 dark:border-gray-700 text-[#3a2e27] dark:text-white ${currentPage === "chat" ? "font-bold" : ""}`}
            onClick={onClose}
          >
            Chat
          </Link>
          <Link
            href="/login"
            className="text-lg py-2 border-b border-gray-200 dark:border-gray-700 text-[#3a2e27] dark:text-white"
            onClick={onClose}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-lg py-2 border-b border-gray-200 dark:border-gray-700 text-[#3a2e27] dark:text-white"
            onClick={onClose}
          >
            Sign Up
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 text-lg py-2 border-b border-gray-200 dark:border-gray-700 text-[#3a2e27] dark:text-white"
            onClick={onClose}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-lg py-2 text-[#3a2e27] dark:text-white text-left"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  )
}
