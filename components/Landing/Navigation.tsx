'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <Link href="/" className="flex items-center space-x-2"> */}
            <Image
              src="/fs-logo.jpg"
              alt="FormCraft Pro Logo"
              width={62}
              height={62}
              className="rounded-full" />
            <span className="text-xl font-bold text-gray-900">FormCraft Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/dashboard" className="text-gray-600 font-medium hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <a href="#features" className="text-gray-600 font-medium">
                Features
              </a>
              <a href="#templates" className="text-gray-600 font-medium">
                Templates
              </a>
              <a href="#pricing" className="text-gray-600 font-medium">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-600 font-medium">
                Reviews
              </a>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">Get Started Free</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#features" className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Features
            </a>
            <a href="#templates" className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Templates
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
            >
              Reviews
            </a>
            <div className="pt-4 pb-3 border-t border-gray-100">
              <div className="flex flex-col space-y-3 px-3">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
