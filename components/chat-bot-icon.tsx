"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ChatBotIcon() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    router.push("/chat")
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-50 cursor-pointer transition-all duration-300 hover:scale-110"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src="/chatbot-icon.png"
          alt="Chat with ArchiMorph AI"
          width={60}
          height={60}
          className="drop-shadow-lg"
        />
        {isHovered && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#3a2e27] text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
            Chat with AI
          </div>
        )}
      </div>
    </div>
  )
}
