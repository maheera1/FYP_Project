"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ChatIdPage({ params }: { params: { chatId: string } }) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main chat page with the chat ID as a query parameter
    router.push(`/chat?id=${params.chatId}`)
  }, [params.chatId, router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a2e27]"></div>
    </div>
  )
}
