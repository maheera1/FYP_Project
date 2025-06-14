"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would connect to Flask backend in the future
    console.log("Login attempt:", { email, password, rememberMe })
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col p-8">
        <div className="flex justify-between items-center mb-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpeg" alt="ArchiMorph Logo" width={60} height={60} className="rounded-full" />
          </Link>
          <Link href="/signup" className="text-sm text-[#3a2e27] hover:underline">
            No Account yet? <span className="font-medium">Sign Up</span>
          </Link>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-2xl font-bold text-[#3a2e27] mb-2">Account Log In</h1>
          <p className="text-[#5a4a40] mb-8">PLEASE LOGIN TO CONTINUE TO YOUR ACCOUNT</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-[#5a4a40]">Remember Me</span>
              </label>
              <Link href="#" className="text-sm text-[#5a4a40] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
            >
              LOG IN
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[#5a4a40]">
            <p>Terms of Use · Privacy Policy · Copyright © 2025 ArchiMorph</p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/3 lg:w-1/4 relative">
        <div className="absolute inset-0">
          <Image
            src="/login-side-image.png"
            alt="ArchiMorph Design Software"
            className="h-full object-cover object-left"
            fill
            priority
          />
        </div>
      </div>
    </div>
  )
}
