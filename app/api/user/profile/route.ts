import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()

    const { userId, name, avatar, theme, language, notifications } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (name) user.name = name
    if (avatar !== undefined) user.avatar = avatar
    if (theme) user.theme = theme
    if (language) user.language = language
    if (notifications !== undefined) user.notifications = notifications

    await user.save()

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      theme: user.theme,
      language: user.language,
      notifications: user.notifications,
    }

    return NextResponse.json({ user: userResponse })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
