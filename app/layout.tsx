import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "@/components/redux-provider"
import { AuthProvider } from "@/contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FormCraft Pro - Advanced Form Builder",
  description: "Create beautiful, interactive forms with drag-and-drop builder",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
