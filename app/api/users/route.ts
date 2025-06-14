import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

// POST - Create or get user
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 })
    }

    let user = await User.findOne({ email })

    if (!user) {
      user = new User({ email, name })
      await user.save()
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error creating/fetching user:", error)
    return NextResponse.json({ error: "Failed to process user" }, { status: 500 })
  }
}
