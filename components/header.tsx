"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import MobileMenu from "./mobile-menu"

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage = "" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#e6dfd5] shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image src="/logo.jpeg" alt="ArchiMorph Logo" width={40} height={40} className="rounded-full" />
                <span className="text-xl font-serif font-semibold text-[#3a2e27]">ArchiMorph</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-[#3a2e27] hover:text-[#5a4a40] transition-colors ${
                currentPage === "home" ? "border-b-2 border-[#3a2e27] font-medium" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/#features"
              className={`text-[#3a2e27] hover:text-[#5a4a40] transition-colors ${
                currentPage === "features" ? "border-b-2 border-[#3a2e27] font-medium" : ""
              }`}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className={`text-[#3a2e27] hover:text-[#5a4a40] transition-colors ${
                currentPage === "how-it-works" ? "border-b-2 border-[#3a2e27] font-medium" : ""
              }`}
            >
              How it Works
            </Link>
            <Link
              href="/chat"
              className={`text-[#3a2e27] hover:text-[#5a4a40] transition-colors ${
                currentPage === "chat" ? "border-b-2 border-[#3a2e27] font-medium" : ""
              }`}
            >
              Chat
            </Link>
            <Link
              href="/login"
              className="px-4 py-1 border border-[#3a2e27] rounded-md text-[#3a2e27] hover:bg-[#3a2e27] hover:text-white transition-colors"
            >
              Login
            </Link>
          </nav>

          <div className="md:hidden">
            <button className="text-[#3a2e27]" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden md:block">
            <Image
              src="/user.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-[#3a2e27]"
            />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} currentPage={currentPage} />
    </>
  )
}
