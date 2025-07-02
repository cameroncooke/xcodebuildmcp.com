import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://registry.npmjs.org/xcodebuildmcp/latest", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) throw new Error("Failed to fetch NPM version")

    const data = await response.json()
    return NextResponse.json({ version: data.version })
  } catch (error) {
    console.error("Error fetching NPM version:", error)
    return NextResponse.json({ version: "v1.10.4" }) // Fallback value
  }
}
