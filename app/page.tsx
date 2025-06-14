import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import Header from "@/components/header"
import ChatBotIcon from "@/components/chat-bot-icon"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage="home" />
      <ChatBotIcon />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#e6dfd5] py-16 md:py-24">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3a2e27] leading-tight">
                Design Smarter with AI-Powered 2D Floor Plans
              </h1>
              <p className="text-lg text-[#5a4a40]">
                Architectural ideation, accelerated. Specify, customize, and generate floor plans that adapt to site and
                style.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/chat">
                  <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2 group">
                    Start Designing
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="px-6 py-3 bg-white text-[#3a2e27] rounded-md border border-[#3a2e27] hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </button>
              </div>
              <p className="text-sm text-[#5a4a40] italic">ArchiMorph 7 Features Preview</p>
            </div>
            <div className="relative">
              <div className="border-2 border-[#3a2e27] p-2 rotate-3 bg-white hover-rotate transition-transform duration-300">
                <div className="border border-gray-300 p-4">
                  <Image
                    src="/11-removebg-preview.png"
                    alt="Floor Plan Preview"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 animate-pulse">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    fill="#3a2e27"
                    stroke="#3a2e27"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-[#f5f2ee]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3a2e27] mb-16">Features</h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col items-center text-center group hover:-translate-y-2">
                <div className="mb-6 p-4 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Image src="/prototype.png" alt="AI Generated Layouts" width={80} height={80} />
                </div>
                <h3 className="text-xl font-bold text-[#3a2e27] mb-3">AI Generated Layouts</h3>
                <p className="text-[#5a4a40] leading-relaxed">
                  Get instant, smart 2D floor plans powered by machine learning.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col items-center text-center group hover:-translate-y-2">
                <div className="mb-6 p-4 bg-green-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Image src="/chatbot.png" alt="NLP Chatbot" width={80} height={80} />
                </div>
                <h3 className="text-xl font-bold text-[#3a2e27] mb-3">NLP Chatbot</h3>
                <p className="text-[#5a4a40] leading-relaxed">
                  Chat naturally with ArchiMorph to describe your design needs with minimal input needed.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col items-center text-center group hover:-translate-y-2">
                <div className="mb-6 p-4 bg-red-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Image src="/map.png" alt="Site-Specific Design" width={80} height={80} />
                </div>
                <h3 className="text-xl font-bold text-[#3a2e27] mb-3">Site-Specific Design</h3>
                <p className="text-[#5a4a40] leading-relaxed">
                  Generate layouts that adapt to your location's topography and zoning data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section (Placeholder) */}
        <section id="how-it-works" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3a2e27] mb-8">How it Works</h2>
            <p className="text-lg text-[#5a4a40] max-w-2xl mx-auto">
              Our intuitive process makes architectural design accessible to everyone.
            </p>

            {/* This section would be expanded with actual content */}
            <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-[#f5f2ee] rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#e6dfd5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#3a2e27]">1</span>
                </div>
                <h3 className="text-xl font-bold text-[#3a2e27] mb-3">Input Requirements</h3>
                <p className="text-[#5a4a40]">Describe your needs or upload site plans</p>
              </div>

              <div className="p-6 bg-[#f5f2ee] rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#e6dfd5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#3a2e27]">2</span>
                </div>
                <h3 className="text-xl font-bold text-[#3a2e27] mb-3">AI Processing</h3>
                <p className="text-[#5a4a40]">Our algorithms generate optimal layouts</p>
              </div>

              <div className="p-6 bg-[#f5f2ee] rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#e6dfd5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#3a2e27]">3</span>
                </div>
                <h3 className="text-xl font-bold text-[#3a2e27] mb-3">Customize & Export</h3>
                <p className="text-[#5a4a40]">Fine-tune and download your floor plans</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#3a2e27] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Sales
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Partnerships
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline transition-all">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 ArchiMorph. Crafted for architects, powered by AI.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
