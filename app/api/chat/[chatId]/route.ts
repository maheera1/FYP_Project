import { type NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

const MONGODB_URI =
  "mongodb+srv://hamna:hamna123@cluster0.qlvvkj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get specific chat
export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
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

    const chat = await chats.findOne({
      _id: new ObjectId(params.chatId),
      userId: new ObjectId(decoded.userId),
    })

    await client.close()

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    return NextResponse.json({ chat })
  } catch (error) {
    console.error("Get chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Update chat (add message)
export async function PUT(request: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    const { message } = await request.json()

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db("archimorph")
    const chats = db.collection("chats")

    const result = await chats.updateOne(
      {
        _id: new ObjectId(params.chatId),
        userId: new ObjectId(decoded.userId),
      },
      {
        $push: { messages: message },
        $set: { updatedAt: new Date() },
      },
    )

    await client.close()

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Delete chat
export async function DELETE(request: NextRequest, { params }: { params: { chatId: string } }) {
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

    const result = await chats.deleteOne({
      _id: new ObjectId(params.chatId),
      userId: new ObjectId(decoded.userId),
    })

    await client.close()

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
