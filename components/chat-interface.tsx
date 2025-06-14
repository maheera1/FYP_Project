"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Plus, Send, Bot, User, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUser } from "@/contexts/user-context"
import UserProfileDropdown from "./user-profile-dropdown"

interface Message {
  _id?: string
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

export default function ChatInterface() {
  const { user } = useUser()
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      fetchChats()
    }
  }, [user])

  useEffect(() => {
    scrollToBottom()
  }, [currentChat?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const fetchChats = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/chats?userId=${user._id}`)
      const data = await response.json()

      if (response.ok) {
        setChats(data.chats)
        if (data.chats.length > 0 && !currentChat) {
          loadChat(data.chats[0]._id)
        }
      }
    } catch (error) {
      console.error("Error fetching chats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadChat = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}`)
      const data = await response.json()

      if (response.ok) {
        setCurrentChat(data.chat)
      }
    } catch (error) {
      console.error("Error loading chat:", error)
    }
  }

  const createNewChat = async () => {
    if (!user) return

    try {
      const title = `Chat ${new Date().toLocaleDateString()}`
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          title,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setChats([data.chat, ...chats])
        setCurrentChat(data.chat)
      }
    } catch (error) {
      console.error("Error creating new chat:", error)
    }
  }

  const deleteChat = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const updatedChats = chats.filter((chat) => chat._id !== chatId)
        setChats(updatedChats)

        if (currentChat?._id === chatId) {
          if (updatedChats.length > 0) {
            loadChat(updatedChats[0]._id)
          } else {
            setCurrentChat(null)
          }
        }
      }
    } catch (error) {
      console.error("Error deleting chat:", error)
    }
  }

  const sendMessage = async () => {
    if (!message.trim() || !currentChat || isSending) return

    const userMessage = message
    setMessage("")
    setIsSending(true)

    try {
      const response = await fetch(`/api/chats/${currentChat._id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentChat((prev) =>
          prev
            ? {
                ...prev,
                messages: [...prev.messages, data.userMessage, data.botMessage],
              }
            : null,
        )
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center">Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Please log in to access the chat interface.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header with user profile */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserProfileDropdown />
            <div>
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <Button onClick={createNewChat} size="sm" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground">Loading chats...</div>
            ) : chats.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">No chats yet</div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors group ${
                    currentChat?._id === chat._id ? "bg-accent border border-border" : "hover:bg-accent/50"
                  }`}
                  onClick={() => loadChat(chat._id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{chat.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteChat(chat._id)
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-card border-b border-border p-4">
              <h2 className="font-semibold text-lg">{currentChat.title}</h2>
              <p className="text-sm text-muted-foreground">{currentChat.messages.length} messages</p>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentChat.messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {msg.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 text-muted-foreground" />}
                        {msg.sender === "user" && <User className="w-4 h-4 mt-0.5" />}
                        <div>
                          <p className="text-sm">{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-muted-foreground" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="bg-card border-t border-border p-4">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isSending}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!message.trim() || isSending}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Card className="w-96">
              <CardHeader>
                <CardTitle className="text-center">Welcome to AI Chat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Start a new conversation or select an existing chat from the sidebar.
                </p>
                <Button onClick={createNewChat}>
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
