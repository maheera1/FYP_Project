import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const MONGODB_URI =
  "mongodb+srv://hamna:hamna123@cluster0.qlvvkj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db("archimorph")
    const users = db.collection("users")

    // Check if user already exists
    const existingUser = await users.findOne({ email })

    if (existingUser) {
      await client.close()
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImage: "/user.png",
      createdAt: new Date(),
    }

    const result = await users.insertOne(newUser)

    // Generate JWT token
    const token = jwt.sign({ userId: result.insertedId, email }, JWT_SECRET, { expiresIn: "7d" })

    await client.close()

    // Return user data without password
    const userData = {
      id: result.insertedId,
      firstName,
      lastName,
      email,
      profileImage: "/user.png",
    }

    return NextResponse.json({
      success: true,
      token,
      user: userData,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
