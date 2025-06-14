import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Chat from "@/models/Chat"

export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    await dbConnect()

    const chat = await Chat.findById(params.chatId)

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    return NextResponse.json({ chat })
  } catch (error) {
    console.error("Error fetching chat:", error)
    return NextResponse.json({ error: "Failed to fetch chat" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    await dbConnect()

    const chat = await Chat.findByIdAndDelete(params.chatId)

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Chat deleted successfully" })
  } catch (error) {
    console.error("Error deleting chat:", error)
    return NextResponse.json({ error: "Failed to delete chat" }, { status: 500 })
  }
}
