"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  _id: string
  name: string
  email: string
  avatar: string
  theme: string
  language: string
  notifications: boolean
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("chatUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const logout = () => {
    setUser(null)
    localStorage.removeItem("chatUser")
  }

  const updateUser = (newUser: User | null) => {
    setUser(newUser)
    if (newUser) {
      localStorage.setItem("chatUser", JSON.stringify(newUser))
    } else {
      localStorage.removeItem("chatUser")
    }
  }

  return <UserContext.Provider value={{ user, setUser: updateUser, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
