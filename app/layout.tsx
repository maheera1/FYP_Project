import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "ArchiMorph - AI-Powered 2D Floor Plans",
  description: "Design smarter with AI-powered 2D floor plans. Architectural ideation, accelerated.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
