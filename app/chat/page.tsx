"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Plus, MessageSquare, Lock } from "lucide-react"
import Header from "@/components/header"
import { useAuth } from "@/contexts/auth-context"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatExample {
  id: string
  text: string
}

export default function ChatPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm ArchiMorph AI. Tell me about your dream space, and I'll help you design it!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const chatExamples: ChatExample[] = [
    {
      id: "modern-house",
      text: "I want a modern 2-floor house with 4 bedrooms and an open kitchen",
    },
    {
      id: "luxury-villa",
      text: "Create a luxury villa with two floors, 5 bedrooms, and a swimming pool",
    },
  ]

  const recentChats = [
    { id: "chat1", title: "Modern House Design" },
    { id: "chat2", title: "Create a small modern office" },
    { id: "chat3", title: "Create a small house with garden" },
  ]

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (inputRef.current && isAuthenticated) {
      inputRef.current.focus()
    }
  }, [isAuthenticated])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you design "${inputValue}". Let me generate some floor plan options based on your requirements...`,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleExampleClick = (example: ChatExample) => {
    setInputValue(example.text)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-[#f5f2ee] dark:bg-gray-900">
        <Header currentPage="chat" />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a2e27] dark:border-white mx-auto mb-4"></div>
            <p className="text-[#3a2e27] dark:text-white">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show login required message
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-screen bg-[#f5f2ee] dark:bg-gray-900">
        <Header currentPage="chat" />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <Lock className="w-16 h-16 text-[#3a2e27] dark:text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#3a2e27] dark:text-white mb-4">Login Required</h2>
            <p className="text-[#5a4a40] dark:text-gray-300 mb-6">
              You need to be logged in to access the AI Chat Assistant. Please sign up or log in to continue.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/login"
                className="px-6 py-3 bg-[#3a2e27] dark:bg-gray-700 text-white rounded-md hover:bg-[#4a3e37] dark:hover:bg-gray-600 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 border border-[#3a2e27] dark:border-gray-600 text-[#3a2e27] dark:text-white rounded-md hover:bg-[#3a2e27] hover:text-white dark:hover:bg-gray-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-[#f5f2ee] dark:bg-gray-900">
      <Header currentPage="chat" />

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#e6dfd5] dark:bg-gray-800 p-4 flex flex-col border-r border-gray-300 dark:border-gray-700 hidden md:flex">
          <Link
            href="/chat"
            className="bg-[#3a2e27] dark:bg-gray-700 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 hover:bg-[#4a3e37] dark:hover:bg-gray-600 transition-colors mb-6"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </Link>

          <div className="mb-4">
            <h3 className="text-[#3a2e27] dark:text-white font-medium mb-2">Recent chats</h3>
            <ul className="space-y-2">
              {recentChats.map((chat) => (
                <li key={chat.id}>
                  <Link
                    href={`/chat/${chat.id}`}
                    className="flex items-center gap-2 text-[#5a4a40] dark:text-gray-300 hover:text-[#3a2e27] dark:hover:text-white transition-colors py-1"
                  >
                    <MessageSquare size={16} />
                    <span className="text-sm truncate">{chat.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-grow flex flex-col">
          {/* Back button for mobile */}
          <div className="md:hidden p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <Link href="/" className="flex items-center gap-2 text-[#3a2e27] dark:text-white">
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Chat header */}
          <div className="bg-[#e6dfd5] dark:bg-gray-800 p-4 border-b border-gray-300 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-[#3a2e27] dark:text-white">AI Chat Assistant</h1>
            <p className="text-[#5a4a40] dark:text-gray-300">Tell us your dream space!</p>
          </div>

          {/* Messages area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-[#3a2e27] dark:bg-gray-700 text-white rounded-tr-none"
                      : "bg-white dark:bg-gray-800 text-[#3a2e27] dark:text-white rounded-tl-none border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-gray-300" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {/* Examples section - only show if no user messages yet */}
            {messages.length === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                {chatExamples.map((example) => (
                  <div
                    key={example.id}
                    onClick={() => handleExampleClick(example)}
                    className="bg-[#e6dfd5] dark:bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-[#d6cfc5] dark:hover:bg-gray-700 transition-colors text-[#3a2e27] dark:text-white"
                  >
                    {example.text}
                  </div>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your design..."
                className="flex-grow px-4 py-3 focus:outline-none bg-transparent text-[#3a2e27] dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`px-4 py-2 rounded-md mr-1 ${
                  inputValue.trim()
                    ? "bg-[#3a2e27] dark:bg-gray-600 text-white hover:bg-[#4a3e37] dark:hover:bg-gray-500"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                } transition-colors`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
