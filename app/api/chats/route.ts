import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Chat from "@/models/Chat"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 }).select("_id title createdAt updatedAt")

    return NextResponse.json({ chats })
  } catch (error) {
    console.error("Error fetching chats:", error)
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { userId, title } = await request.json()

    if (!userId || !title) {
      return NextResponse.json({ error: "User ID and title are required" }, { status: 400 })
    }

    const chat = new Chat({
      userId,
      title,
      messages: [],
    })

    await chat.save()

    return NextResponse.json({ chat })
  } catch (error) {
    console.error("Error creating chat:", error)
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 })
  }
}
