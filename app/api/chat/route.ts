import { type NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

const MONGODB_URI =
  "mongodb+srv://hamna:hamna123@cluster0.qlvvkj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get user's chat history
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db("archimorph")
    const chats = db.collection("chats")

    // Get user's chats, sorted by last updated
    const userChats = await chats
      .find({ userId: new ObjectId(decoded.userId) })
      .sort({ updatedAt: -1 })
      .toArray()

    await client.close()

    return NextResponse.json({ chats: userChats })
  } catch (error) {
    console.error("Get chats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create new chat
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    const { title } = await request.json()

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db("archimorph")
    const chats = db.collection("chats")

    const newChat = {
      userId: new ObjectId(decoded.userId),
      title: title || "New Chat",
      messages: [
        {
          id: "welcome",
          content: "Hi there! I'm ArchiMorph AI. Tell me about your dream space, and I'll help you design it!",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await chats.insertOne(newChat)
    await client.close()

    return NextResponse.json({
      success: true,
      chat: { ...newChat, id: result.insertedId },
    })
  } catch (error) {
    console.error("Create chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
