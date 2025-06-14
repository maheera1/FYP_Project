import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { SettingsProvider } from "@/contexts/settings-context"

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
        <SettingsProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}
