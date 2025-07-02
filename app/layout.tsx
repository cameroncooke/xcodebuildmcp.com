import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "XcodeBuildMCP - AI-Powered Xcode Automation",
  description:
    "Let AI assistants build, test, and debug your iOS apps autonomously. XcodeBuildMCP bridges the gap between AI agents and Xcode.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
