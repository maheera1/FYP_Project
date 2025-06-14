"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Plus, MessageSquare, Lock, Trash2, MoreVertical } from "lucide-react"
import Header from "@/components/header"
import { useAuth } from "@/contexts/auth-context"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface Chat {
  _id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface ChatExample {
  id: string
  text: string
}

export default function ChatPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [chats, setChats] = useState<Chat[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoadingChats, setIsLoadingChats] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [showChatOptions, setShowChatOptions] = useState<string | null>(null)

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

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated) {
      loadChats()
    }
  }, [isAuthenticated])

  useEffect(() => {
    scrollToBottom()
  }, [currentChat?.messages])

  useEffect(() => {
    if (inputRef.current && isAuthenticated && currentChat) {
      inputRef.current.focus()
    }
  }, [isAuthenticated, currentChat])

  const getAuthToken = () => {
    return localStorage.getItem("auth-token")
  }

  const loadChats = async () => {
    setIsLoadingChats(true)
    try {
      const token = getAuthToken()
      const response = await fetch("/api/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setChats(data.chats)

        // If no current chat and there are chats, select the first one
        if (!currentChat && data.chats.length > 0) {
          setCurrentChat(data.chats[0])
        }
      }
    } catch (error) {
      console.error("Failed to load chats:", error)
    } finally {
      setIsLoadingChats(false)
    }
  }

  const createNewChat = async () => {
    try {
      const token = getAuthToken()
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: "New Chat" }),
      })

      if (response.ok) {
        const data = await response.json()
        const newChat = { ...data.chat, _id: data.chat.id }
        setChats((prev) => [newChat, ...prev])
        setCurrentChat(newChat)
      }
    } catch (error) {
      console.error("Failed to create new chat:", error)
    }
  }

  const deleteChat = async (chatId: string) => {
    try {
      const token = getAuthToken()
      const response = await fetch(`/api/chat/${chatId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId))

        // If deleted chat was current chat, select another or clear
        if (currentChat?._id === chatId) {
          const remainingChats = chats.filter((chat) => chat._id !== chatId)
          setCurrentChat(remainingChats.length > 0 ? remainingChats[0] : null)
        }
      }
    } catch (error) {
      console.error("Failed to delete chat:", error)
    }
    setShowChatOptions(null)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentChat || isSendingMessage) return

    setIsSendingMessage(true)

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    // Update UI immediately
    setCurrentChat((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        messages: [...prev.messages, userMessage],
      }
    })

    setInputValue("")

    try {
      // Save user message to database
      const token = getAuthToken()
      await fetch(`/api/chat/${currentChat._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage }),
      })

      // Simulate bot response (replace with actual API call later)
      setTimeout(async () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `I'll help you design "${userMessage.content}". Let me generate some floor plan options based on your requirements...`,
          sender: "bot",
          timestamp: new Date(),
        }

        // Update UI with bot response
        setCurrentChat((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            messages: [...prev.messages, botResponse],
          }
        })

        // Save bot response to database
        await fetch(`/api/chat/${currentChat._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: botResponse }),
        })

        setIsSendingMessage(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to send message:", error)
      setIsSendingMessage(false)
    }
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

  const selectChat = (chat: Chat) => {
    setCurrentChat(chat)
    setShowChatOptions(null)
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
          <button
            onClick={createNewChat}
            className="bg-[#3a2e27] dark:bg-gray-700 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 hover:bg-[#4a3e37] dark:hover:bg-gray-600 transition-colors mb-6"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>

          <div className="mb-4 flex-grow">
            <h3 className="text-[#3a2e27] dark:text-white font-medium mb-2">Recent chats</h3>
            {isLoadingChats ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#3a2e27] dark:border-white mx-auto"></div>
              </div>
            ) : (
              <ul className="space-y-2">
                {chats.map((chat) => (
                  <li key={chat._id} className="relative group">
                    <button
                      onClick={() => selectChat(chat)}
                      className={`flex items-center gap-2 w-full text-left py-2 px-2 rounded transition-colors ${
                        currentChat?._id === chat._id
                          ? "bg-[#3a2e27] dark:bg-gray-700 text-white"
                          : "text-[#5a4a40] dark:text-gray-300 hover:text-[#3a2e27] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <MessageSquare size={16} />
                      <span className="text-sm truncate flex-grow">{chat.title}</span>
                    </button>
                    <button
                      onClick={() => setShowChatOptions(showChatOptions === chat._id ? null : chat._id)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all"
                    >
                      <MoreVertical size={14} />
                    </button>
                    {showChatOptions === chat._id && (
                      <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => deleteChat(chat._id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
                {chats.length === 0 && (
                  <li className="text-[#5a4a40] dark:text-gray-400 text-sm text-center py-4">
                    No chats yet. Create your first chat!
                  </li>
                )}
              </ul>
            )}
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

          {currentChat ? (
            <>
              {/* Chat header */}
              <div className="bg-[#e6dfd5] dark:bg-gray-800 p-4 border-b border-gray-300 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-[#3a2e27] dark:text-white">{currentChat.title}</h1>
                <p className="text-[#5a4a40] dark:text-gray-300">Tell us your dream space!</p>
              </div>

              {/* Messages area */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {currentChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-[#3a2e27] dark:bg-gray-700 text-white rounded-tr-none"
                          : "bg-white dark:bg-gray-800 text-[#3a2e27] dark:text-white rounded-tl-none border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender === "user" ? "text-gray-300" : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Examples section - only show if only welcome message */}
                {currentChat.messages.length === 1 && (
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
                    disabled={isSendingMessage}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isSendingMessage}
                    className={`px-4 py-2 rounded-md mr-1 ${
                      inputValue.trim() && !isSendingMessage
                        ? "bg-[#3a2e27] dark:bg-gray-600 text-white hover:bg-[#4a3e37] dark:hover:bg-gray-500"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    } transition-colors`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No chat selected */
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-[#3a2e27] dark:text-white mx-auto mb-4 opacity-50" />
                <h2 className="text-xl font-bold text-[#3a2e27] dark:text-white mb-2">Welcome to ArchiMorph AI</h2>
                <p className="text-[#5a4a40] dark:text-gray-300 mb-6">
                  Create a new chat to start designing your dream space
                </p>
                <button
                  onClick={createNewChat}
                  className="px-6 py-3 bg-[#3a2e27] dark:bg-gray-700 text-white rounded-md hover:bg-[#4a3e37] dark:hover:bg-gray-600 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Plus size={18} />
                  Start New Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
