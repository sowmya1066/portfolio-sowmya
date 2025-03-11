import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import Navigation from "./components/Navigation"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creative Dev Portfolio",
  description: "A fun and creative portfolio showcasing my development skills",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.className} bg-background text-foreground`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}



import './globals.css'