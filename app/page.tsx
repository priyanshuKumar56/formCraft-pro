"use client"

import AnimatedFeaturesComponent from "@/components/Landing/Features_Work"
import Footer from "@/components/Landing/Footer"
import Navbar from "@/components/Landing/Navigation"
import TemplatesSection from "@/components/Landing/TemplateSection"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Play, BarChart3, TrendingUp, FileText, Users, PieChart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'analytics' | 'forms'>('overview')

  return (
    <>
      <Navbar />
      <section className="pt-20 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
                Create beautiful forms <span className="text-blue-600">in minutes</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Build interactive forms with our drag-and-drop builder. Collect responses and analyze data—no code needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signin">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-1 py-3">
                    Start Building Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>


                <Button size="lg" variant="outline" className="px-6 py-3">
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </Button>
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                {["Free 14-day trial", "No credit card", "Cancel anytime"].map((text, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Simple Dashboard */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="border-b px-4 py-2 text-sm font-medium text-gray-700">
                FormCraft Dashboard
              </div>
              <div className="flex border-b text-sm">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { id: 'forms', label: 'Forms', icon: FileText }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setDashboardTab(tab.id)}
                    className={`flex-1 px-3 py-2 flex items-center justify-center gap-1 border-b-2 ${dashboardTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                      }`}
                  >
                    <tab.icon className="h-4 w-4" /> {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-4 text-sm text-gray-600">
                {dashboardTab === 'overview' && <p>Overview metrics...</p>}
                {dashboardTab === 'analytics' && <p>Analytics data...</p>}
                {dashboardTab === 'forms' && <p>Forms list...</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedFeaturesComponent />
      <TemplatesSection />
      <Footer />
    </>
  )
}
