"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!acceptTerms) {
      setError("Please accept the Terms of Service and Privacy Policy")
      setIsLoading(false)
      return
    }

    try {
      const success = await signup(firstName, lastName, email, password)
      if (success) {
        router.push("/")
      } else {
        setError("Signup failed. Please try again.")
      }
    } catch (error) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col p-8">
        <div className="flex justify-between items-center mb-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpeg" alt="ArchiMorph Logo" width={60} height={60} className="rounded-full" />
          </Link>
          <Link href="/login" className="text-sm text-[#3a2e27] hover:underline">
            Already a Member? <span className="font-medium">Log In</span>
          </Link>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-2xl font-bold text-[#3a2e27] mb-2">Sign Up to ArchiMorph</h1>
          <p className="text-[#5a4a40] mb-8">CREATE A NEW ACCOUNT</p>

          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <div className="h-1 bg-red-500 w-1/3 mt-1"></div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                required
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-[#5a4a40]">
                I accept the{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "NEXT"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[#5a4a40]">
            <p>By signing up, you agree to our Terms of Use and Privacy Policy</p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/3 lg:w-1/4 relative">
        <div className="absolute inset-0">
          <Image
            src="/signup-side-image.png"
            alt="ArchiMorph Floor Plan"
            className="h-full object-cover object-left"
            fill
            priority
          />
        </div>
      </div>
    </div>
  )
}
