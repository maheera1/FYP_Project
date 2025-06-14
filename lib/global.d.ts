import type mongoose from "mongoose"

declare global {
  var mongooseInstance: {
    conn: mongoose.Connection | null
    promise: Promise<mongoose.Connection> | null
  }
}
