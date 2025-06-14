import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Chat from "@/models/Chat"

// Placeholder chatbot function - replace with your actual chatbot integration
async function getChatbotResponse(message: string): Promise<string> {
  // TODO: Replace this with your actual Rasa/Dialogflow integration
  const responses = [
    "That's an interesting question! Let me think about that.",
    "I understand what you're asking. Here's what I think...",
    "Thanks for sharing that with me. I'd be happy to help!",
    "That's a great point. Let me provide some insights on that.",
    "I see what you mean. Here's my perspective on this topic.",
  ]

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return responses[Math.floor(Math.random() * responses.length)]
}

// POST - Send a message and get bot response
export async function POST(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    await dbConnect()

    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const chat = await Chat.findById(params.chatId)

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    // Add user message
    const userMessage = {
      content: message,
      sender: "user" as const,
      timestamp: new Date(),
    }
    chat.messages.push(userMessage)

    // Get bot response (placeholder - replace with your chatbot integration)
    const botResponseText = await getChatbotResponse(message)

    // Add bot message
    const botMessage = {
      content: botResponseText,
      sender: "bot" as const,
      timestamp: new Date(),
    }
    chat.messages.push(botMessage)

    await chat.save()

    return NextResponse.json({
      userMessage: chat.messages[chat.messages.length - 2],
      botMessage: chat.messages[chat.messages.length - 1],
    })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
