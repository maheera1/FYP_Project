"use client"
import Link from "next/link"
import { X } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  currentPage?: string
}

export default function MobileMenu({ isOpen, onClose, currentPage = "" }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="bg-white h-full w-4/5 max-w-sm p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-[#3a2e27]">Menu</h2>
          <button onClick={onClose} className="text-[#3a2e27]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className={`text-lg py-2 border-b border-gray-200 text-[#3a2e27] ${currentPage === "home" ? "font-bold" : ""}`}
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            href="/#features"
            className={`text-lg py-2 border-b border-gray-200 text-[#3a2e27] ${currentPage === "features" ? "font-bold" : ""}`}
            onClick={onClose}
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className={`text-lg py-2 border-b border-gray-200 text-[#3a2e27] ${currentPage === "how-it-works" ? "font-bold" : ""}`}
            onClick={onClose}
          >
            How it Works
          </Link>
          <Link
            href="/chat"
            className={`text-lg py-2 border-b border-gray-200 text-[#3a2e27] ${currentPage === "chat" ? "font-bold" : ""}`}
            onClick={onClose}
          >
            Chat
          </Link>
          <Link href="/login" className="text-lg py-2 border-b border-gray-200 text-[#3a2e27]" onClick={onClose}>
            Login
          </Link>
          <Link href="/signup" className="text-lg py-2 text-[#3a2e27]" onClick={onClose}>
            Sign Up
          </Link>
        </nav>
      </div>
    </div>
  )
}
