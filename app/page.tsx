import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Star,
  GitFork,
  Download,
  Code,
  Terminal,
  Zap,
  Shield,
  Users,
  BookOpen,
  ExternalLink,
  Copy,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

async function getGitHubStats() {
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
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
    }
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)
    return { stars: 1900, forks: 77 } // Fallback values
  }
}

async function getNPMVersion() {
  try {
    const response = await fetch("https://registry.npmjs.org/xcodebuildmcp/latest", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) throw new Error("Failed to fetch NPM version")

    const data = await response.json()
    return data.version
  } catch (error) {
    console.error("Error fetching NPM version:", error)
    return "v1.10.4" // Fallback value
  }
}

export default async function XcodeBuildMCPLanding() {
  const [githubStats, npmVersion] = await Promise.all([getGitHubStats(), getNPMVersion()])
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="XcodeBuildMCP" width={32} height={32} className="w-8 h-8" />
              <div>
                <span className="text-xl font-bold">XcodeBuildMCP</span>
                <Badge variant="secondary" className="ml-2 bg-green-900 text-green-300 text-xs">
                  OSS
                </Badge>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#installation" className="text-gray-300 hover:text-white transition-colors">
                Installation
              </Link>
              <Link href="#usage" className="text-gray-300 hover:text-white transition-colors">
                Usage Examples
              </Link>
              <Link href="#contributing" className="text-gray-300 hover:text-white transition-colors">
                Contributing
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/cameroncooke/XcodeBuildMCP"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-blue-900 text-blue-300">
                  <Star className="w-3 h-3 mr-1" />
                  {githubStats.stars.toLocaleString()} stars
                </Badge>
                <Badge variant="secondary" className="bg-purple-900 text-purple-300">
                  <GitFork className="w-3 h-3 mr-1" />
                  {githubStats.forks} forks
                </Badge>
                <Badge variant="secondary" className="bg-green-900 text-green-300">
                  {npmVersion.startsWith("v") ? npmVersion : `v${npmVersion}`}
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                AI-Powered
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Xcode Automation
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Let AI assistants build, test, and debug your iOS apps autonomously. XcodeBuildMCP bridges the gap
                between AI agents and Xcode, enabling intelligent development workflows that fix build errors, manage
                simulators, and deploy to devices—all through natural language commands.
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Image
                  src="/banner.png"
                  alt="XcodeBuildMCP Banner"
                  width={800}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  asChild
                >
                  <Link href="#installation">
                    <Download className="w-5 h-5 mr-2" />
                    Get Started
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  asChild
                >
                  <Link href="https://github.com/cameroncooke/XcodeBuildMCP">
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>MIT Licensed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Open Source</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Active Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Powerful Xcode Integration</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to integrate Xcode workflows with AI assistants and automation tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl text-white">Autonomous Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">
                  AI agents can independently build projects, fix compilation errors, and iterate on solutions without
                  human intervention.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-white">Complete Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">
                  From project creation to device deployment—manage the entire iOS development lifecycle through AI
                  commands.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-xl text-white">Lightning Fast Builds</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">
                  Experimental incremental build support delivers blazing fast compilation times for rapid iteration
                  cycles.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
                <CardTitle className="text-xl text-white">UI Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">
                  Interact with simulator UI elements, capture screenshots, and automate user interface testing
                  workflows.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-red-400" />
                </div>
                <CardTitle className="text-xl text-white">Real Device Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">
                  Deploy and test on physical devices over USB or Wi-Fi with comprehensive log capture and debugging
                  support.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-cyan-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle className="text-xl text-white">Multi-Client Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">
                  Works with Cursor, Claude Desktop, VS Code, and any MCP-compatible client for maximum flexibility.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Getting Started</h2>
            <p className="text-xl text-gray-400">No installation required - just configure your MCP client</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Configuration Example</CardTitle>
                <CardDescription className="text-gray-400">Add to your MCP client configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-gray-300">
                    {`{
  "mcpServers": {
    "XcodeBuildMCP": {
      "command": "npx",
      "args": ["-y", "xcodebuildmcp@latest"]
    }
  }
}`}
                  </pre>
                </div>
                <Button variant="outline" size="sm" className="mt-3 border-gray-600 text-gray-300 bg-transparent">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Configuration
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Terminal className="w-5 h-5 mr-2" />
                    Global NPM Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                    <div className="text-green-400">npm install -g xcodebuildmcp</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 mt-2 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                      {`{
  "mcpServers": {
    "XcodeBuildMCP": {
      "command": "node",
      "args": ["xcodebuildmcp"]
    }
  }
}`}
                    </pre>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 border-gray-600 text-gray-300 bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Github className="w-5 h-5 mr-2" />
                    Development Setup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-1">
                    <div className="text-green-400">git clone https://github.com/</div>
                    <div className="text-green-400">cameroncooke/XcodeBuildMCP</div>
                    <div className="text-blue-400">cd XcodeBuildMCP && npm install</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 mt-2 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
                      {`{
  "mcpServers": {
    "XcodeBuildMCP": {
      "command": "node",
      "args": ["path/to/xcodebuildmcp/build/index.js"]
    }
  }
}`}
                    </pre>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 border-gray-600 text-gray-300 bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section id="usage" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Usage Examples</h2>
            <p className="text-xl text-gray-400">See XcodeBuildMCP in action</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">AI Assistant Integration</CardTitle>
                <CardDescription className="text-gray-400">
                  Natural language commands through your AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                    <p className="text-blue-300 font-medium">You:</p>
                    <p className="text-gray-300">"Build my iOS project and run the tests"</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                    <p className="text-green-300 font-medium">AI Assistant:</p>
                    <p className="text-gray-300">I'll build your project and run the tests using XcodeBuildMCP...</p>
                    <div className="mt-2 font-mono text-sm text-gray-400">
                      ✓ Build succeeded
                      <br />✓ All tests passed (23/23)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Complete App Creation</CardTitle>
                <CardDescription className="text-gray-400">From idea to running app in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                    <p className="text-blue-300 font-medium">You:</p>
                    <p className="text-gray-300">"Create a simple iOS todo app with SwiftUI"</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                    <p className="text-green-300 font-medium">AI Assistant:</p>
                    <p className="text-gray-300">I'll create a complete iOS todo app for you...</p>
                    <div className="mt-2 font-mono text-sm text-gray-400 space-y-1">
                      <div>✓ Scaffolded new iOS project</div>
                      <div>✓ Generated SwiftUI todo interface</div>
                      <div>✓ Built project successfully</div>
                      <div>✓ Launched in iOS Simulator</div>
                      <div>✓ Captured screenshot</div>
                      <div>✓ Tested add/delete functionality</div>
                    </div>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
                    <p className="text-purple-300 font-medium">Result:</p>
                    <p className="text-gray-300">
                      Your todo app is running! I've tested the core features and everything works perfectly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contributing Section */}
      <section id="contributing" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Help Improve XcodeBuildMCP</h2>
            <p className="text-xl text-gray-400">Contribute to make this tool even better</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="pt-6">
                <Github className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Contribute Code</h3>
                <p className="text-gray-400 mb-4">Submit pull requests, fix bugs, or add new features</p>
                <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent" asChild>
                  <Link href="https://github.com/cameroncooke/XcodeBuildMCP/issues">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Issues
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="pt-6">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Contributing Guide</h3>
                <p className="text-gray-400 mb-4">Learn how to set up your development environment and contribute</p>
                <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent" asChild>
                  <Link href="https://github.com/cameroncooke/XcodeBuildMCP/blob/main/CONTRIBUTING.md">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read Guide
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="XcodeBuildMCP" width={24} height={24} className="w-6 h-6" />
              <span className="text-lg font-semibold">XcodeBuildMCP</span>
              <Badge variant="secondary" className="bg-green-900 text-green-300">
                <Star className="w-3 h-3 mr-1" />
                {githubStats.stars.toLocaleString()} stars
              </Badge>
            </div>

            <p className="text-gray-400 text-center">
              Made with ❤️ and AI by{" "}
              <Link href="https://x.com/camsoft2000" className="text-blue-400 hover:text-blue-300 transition-colors">
                Cameron Cooke (@camsoft2000)
              </Link>
            </p>

            <div className="flex items-center space-x-6">
              <Link
                href="https://www.async-let.com/"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Blog</span>
              </Link>
              <Link
                href="https://x.com/xcodebuildmcp"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>@xcodebuildmcp</span>
              </Link>
              <Link
                href="https://github.com/cameroncooke/XcodeBuildMCP"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </Link>
            </div>

            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} MIT License</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
