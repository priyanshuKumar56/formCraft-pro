import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
     <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                {/* <Link href="/" className="flex items-center space-x-2"> */}
                <Image
                  src="/fs-logo.jpg"
                  alt="FormCraft Pro Logo"
                  width={62}
                  height={62}
                  className="rounded-full"/>
                <span className="text-xl font-bold">FormCraft Pro</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                The most powerful form builder for modern teams. Create beautiful forms, collect responses, and grow
                your business.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Templates", "Integrations", "Pricing", "API"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press", "Partners"],
              },
              {
                title: "Support",
                links: ["Help Center", "Documentation", "Status", "Contact", "Community"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 FormCraft Pro. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer