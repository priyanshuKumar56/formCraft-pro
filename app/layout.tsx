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
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
