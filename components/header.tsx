"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import MobileMenu from "./mobile-menu"
import ProfileDropdown from "./profile-dropdown"
import { useSettings } from "@/contexts/settings-context"
import { useAuth } from "@/contexts/auth-context"

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage = "" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { isDarkMode } = useSettings()
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "how-it-works"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            return
          }
        }
      }
      setActiveSection("")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (page: string) => {
    if (page === "home") {
      return (currentPage === "home" || currentPage === "") && activeSection === ""
    }
    if (page === "features") {
      return currentPage === "features" || activeSection === "features"
    }
    if (page === "how-it-works") {
      return currentPage === "how-it-works" || activeSection === "how-it-works"
    }
    return currentPage === page
  }

  return (
    <>
      <header className={`sticky top-0 z-50 shadow-sm ${isDarkMode ? "bg-gray-800" : "bg-[#e6dfd5]"}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image src="/logo.jpeg" alt="ArchiMorph Logo" width={40} height={40} className="rounded-full" />
                <span className={`text-xl font-serif font-semibold ${isDarkMode ? "text-white" : "text-[#3a2e27]"}`}>
                  ArchiMorph
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-[#3a2e27] hover:text-[#5a4a40]"
              } ${
                isActive("home") ? `border-b-2 font-medium ${isDarkMode ? "border-white" : "border-[#3a2e27]"}` : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/#features"
              className={`transition-colors ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-[#3a2e27] hover:text-[#5a4a40]"
              } ${
                isActive("features") ? `border-b-2 font-medium ${isDarkMode ? "border-white" : "border-[#3a2e27]"}` : ""
              }`}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className={`transition-colors ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-[#3a2e27] hover:text-[#5a4a40]"
              } ${
                isActive("how-it-works")
                  ? `border-b-2 font-medium ${isDarkMode ? "border-white" : "border-[#3a2e27]"}`
                  : ""
              }`}
            >
              How it Works
            </Link>
            <Link
              href="/chat"
              className={`transition-colors ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-[#3a2e27] hover:text-[#5a4a40]"
              } ${
                isActive("chat") ? `border-b-2 font-medium ${isDarkMode ? "border-white" : "border-[#3a2e27]"}` : ""
              }`}
            >
              Chat
            </Link>

            {!isAuthenticated ? (
              <Link
                href="/login"
                className={`px-4 py-1 border rounded-md transition-colors ${
                  isDarkMode
                    ? "border-white text-white hover:bg-white hover:text-gray-800"
                    : "border-[#3a2e27] text-[#3a2e27] hover:bg-[#3a2e27] hover:text-white"
                }`}
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <span className={`text-sm ${isDarkMode ? "text-white" : "text-[#3a2e27]"}`}>
                  Welcome, {user?.firstName}
                </span>
                <ProfileDropdown />
              </div>
            )}
          </nav>

          <div className="md:hidden">
            <button className={isDarkMode ? "text-white" : "text-[#3a2e27]"} onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} currentPage={currentPage} />
    </>
  )
}
