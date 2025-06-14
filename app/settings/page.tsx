"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Upload, Eye, EyeOff, Moon, Sun, Bell, Globe } from "lucide-react"
import Header from "@/components/header"
import { useSettings } from "@/contexts/settings-context"

export default function SettingsPage() {
  const {
    isDarkMode,
    language,
    emailNotifications,
    profileImage,
    setIsDarkMode,
    setLanguage,
    setEmailNotifications,
    setProfileImage,
    saveSettings,
  } = useSettings()

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    // This would connect to Flask backend
    console.log("Password change request:", { currentPassword, newPassword })
    alert("Password updated successfully!")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleSaveSettings = () => {
    saveSettings()
    alert("Settings saved successfully!")
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-[#f5f2ee]"}`}>
      <Header currentPage="settings" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/"
              className={`transition-colors ${isDarkMode ? "text-white hover:text-gray-300" : "text-[#3a2e27] hover:text-[#5a4a40]"}`}
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-[#3a2e27]"}`}>Settings</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-md`}>
              <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-[#3a2e27]"}`}>
                Profile Settings
              </h2>

              {/* Avatar Upload */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-[#5a4a40]"}`}>
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <Image
                    src={profileImage || "/user.png"}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-[#3a2e27]"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#3a2e27] text-white rounded-md hover:bg-[#4a3e37] transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Upload New
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-[#5a4a40]"}`}>
                  Theme
                </label>
                <button
                  onClick={handleThemeToggle}
                  className={`flex items-center gap-3 p-3 rounded-md border transition-colors ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-[#3a2e27]"
                  }`}
                >
                  {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </button>
              </div>

              {/* Email Notifications */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-[#5a4a40]"}`}>
                  Notifications
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <Bell className="w-4 h-4" />
                  <span className={isDarkMode ? "text-gray-300" : "text-[#5a4a40]"}>Email Notifications</span>
                </label>
              </div>

              {/* Language */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-[#5a4a40]"}`}>
                  Language
                </label>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-[#3a2e27]"
                    }`}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-md`}>
              <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-[#3a2e27]"}`}>
                Security Settings
              </h2>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-[#5a4a40]"}`}
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-[#3a2e27]"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-[#5a4a40]"}`}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-[#3a2e27]"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-[#5a4a40]"}`}
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-[#3a2e27]"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3a2e27] text-white py-3 rounded hover:bg-[#4a3e37] transition-colors"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>

          {/* Save Settings Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSaveSettings}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
