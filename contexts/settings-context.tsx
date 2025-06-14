"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface SettingsContextType {
  isDarkMode: boolean
  language: string
  emailNotifications: boolean
  profileImage: string
  setIsDarkMode: (value: boolean) => void
  setLanguage: (value: string) => void
  setEmailNotifications: (value: boolean) => void
  setProfileImage: (value: string) => void
  saveSettings: () => void
  loadSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [profileImage, setProfileImage] = useState("/user.png")

  // Load settings from localStorage on mount
  useEffect(() => {
    loadSettings()
  }, [])

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const saveSettings = () => {
    const settings = {
      isDarkMode,
      language,
      emailNotifications,
      profileImage,
    }
    localStorage.setItem("archimorph-settings", JSON.stringify(settings))
  }

  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem("archimorph-settings")
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setIsDarkMode(settings.isDarkMode || false)
        setLanguage(settings.language || "en")
        setEmailNotifications(settings.emailNotifications !== undefined ? settings.emailNotifications : true)
        setProfileImage(settings.profileImage || "/user.png")
      }
    } catch (error) {
      console.error("Error loading settings:", error)
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        isDarkMode,
        language,
        emailNotifications,
        profileImage,
        setIsDarkMode,
        setLanguage,
        setEmailNotifications,
        setProfileImage,
        saveSettings,
        loadSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
