import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.github.com/repos/cameroncooke/XcodeBuildMCP", {
      headers: process.env.GITHUB_TOKEN
        ? {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }
        : {},
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) throw new Error("Failed to fetch GitHub stats")

    const data = await response.json()
    return NextResponse.json({
      stars: data.stargazers_count,
      forks: data.forks_count,
    })
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)
    return NextResponse.json({ stars: 1900, forks: 77 }) // Fallback values
  }
}
