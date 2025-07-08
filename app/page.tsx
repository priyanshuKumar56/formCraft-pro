"use client"

import AnimatedFeaturesComponent from "@/components/Landing/Features_Work"
import Footer from "@/components/Landing/Footer"
import Navbar from "@/components/Landing/Navigation"
import Pricing_CTA from "@/components/Landing/Pricing_CTA"
import Stats_testimonial from "@/components/Landing/Stats_testimonial"
import TemplatesSection from "@/components/Landing/TemplateSection"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Play, Sparkles, BarChart3, TrendingUp, FileText, Users, PieChart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Define interfaces for type safety
interface DashboardData {
  overview: {
    totalForms: number
    totalResponses: number
    avgCompletion: number
    conversionRate: number
  }
}

interface FormData {
  name: string
  responses: number
  completion: number
  status: 'active' | 'inactive'
}

interface MousePosition {
  x: number
  y: number
}

const dashboardData: DashboardData = {
  overview: {
    totalForms: 24,
    totalResponses: 1247,
    avgCompletion: 87,
    conversionRate: 23
  }
}

const recentForms: FormData[] = [
  { name: "Contact Form", responses: 245, completion: 92, status: "active" },
  { name: "Survey 2024", responses: 189, completion: 78, status: "active" },
  { name: "Newsletter", responses: 156, completion: 95, status: "active" },
  { name: "Feedback", responses: 89, completion: 65, status: "inactive" }
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [currentForm, setCurrentForm] = useState<number>(0)
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'analytics' | 'forms'>('overview')
  const [formProgress, setFormProgress] = useState<number>(0)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [currentField, setCurrentField] = useState<number>(0)
  const [responses, setResponses] = useState<number>(1247)
  const [rating, setRating] = useState<number>(0)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState<number>(0)

  // Animation effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Typeform-style form progression
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentForm((prev) => (prev + 1) % 4)
      setFormProgress(0)
      setCurrentField(0)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  // Progress animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setFormProgress(prev => {
        if (prev >= 100) {
          return 100
        }
        return prev + 2
      })
    }, 120)

    return () => clearInterval(progressInterval)
  }, [currentForm])

  // Typing animation
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping(prev => !prev)
    }, 1000)

    return () => clearInterval(typingInterval)
  }, [])

  // Auto-increment responses
  useEffect(() => {
    const responseInterval = setInterval(() => {
      setResponses(prev => prev + Math.floor(Math.random() * 3))
    }, 3000)

    return () => clearInterval(responseInterval)
  }, [])

  return (
    <>
    <Navbar/>
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2 animate-bounce">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Trusted by 50,000+ businesses
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Create beautiful forms
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient">
                    in minutes
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Build stunning, interactive forms with our drag-and-drop builder. Collect responses, analyze data, and
                  automate workflows—all without writing a single line of code.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 group"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg bg-transparent hover:bg-gray-50 group"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                {[
                  { icon: CheckCircle, text: "Free 14-day trial" },
                  { icon: CheckCircle, text: "No credit card required" },
                  { icon: CheckCircle, text: "Cancel anytime" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-2 animate-fade-in" 
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <item.icon className="h-4 w-4 text-green-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Animated Dashboard */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-500">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                      <div 
                        className="w-3 h-3 bg-white/30 rounded-full animate-pulse" 
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div 
                        className="w-3 h-3 bg-white/30 rounded-full animate-pulse" 
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                    <span className="text-white text-sm font-medium">FormCraft Dashboard</span>
                  </div>
                </div>

                {/* Dashboard Navigation */}
                <div className="border-b border-gray-100 px-6 py-3">
                  <div className="flex space-x-6">
                    {[
                      { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
                      { id: 'analytics' as const, label: 'Analytics', icon: TrendingUp },
                      { id: 'forms' as const, label: 'Forms', icon: FileText }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setDashboardTab(tab.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          dashboardTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                  {dashboardTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Stats Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Total Forms', value: dashboardData.overview.totalForms, icon: FileText, color: 'blue' },
                          { label: 'Responses', value: dashboardData.overview.totalResponses, icon: Users, color: 'green' },
                          { label: 'Completion', value: `${dashboardData.overview.avgCompletion}%`, icon: CheckCircle, color: 'purple' },
                          { label: 'Conversion', value: `${dashboardData.overview.conversionRate}%`, icon: TrendingUp, color: 'orange' }
                        ].map((stat, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4 transform hover:scale-105 transition-all duration-200">
                            <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center ${
                              stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                              stat.color === 'green' ? 'bg-green-100 text-green-600' :
                              stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                              'bg-orange-100 text-orange-600'
                            }`}>
                              <stat.icon className="h-4 w-4" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Chart Area */}
                      
                    </div>
                  )}

                  {dashboardTab === 'analytics' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Views', value: '15.4k', change: '+12%' },
                          { label: 'Submissions', value: '1.2k', change: '+8%' },
                          { label: 'Bounce Rate', value: '23.4%', change: '-5%' },
                          { label: 'Avg Time', value: '2:45', change: '+15%' }
                        ].map((metric, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <div className="text-lg font-semibold text-gray-900">{metric.value}</div>
                            <div className="text-sm text-gray-600">{metric.label}</div>
                            <div className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {metric.change}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 h-24">
                        <div className="flex items-center justify-between h-full">
                          <PieChart 
                            className="h-16 w-16 text-blue-600 animate-spin" 
                            style={{ animationDuration: '8s' }} 
                          />
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Active Forms</div>
                            <div className="text-2xl font-bold text-gray-900">18</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {dashboardTab === 'forms' && (
                    <div className="space-y-3">
                      {recentForms.map((form, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${form.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{form.name}</div>
                              <div className="text-xs text-gray-500">{form.responses} responses</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">{form.completion}%</div>
                            <div className="text-xs text-gray-500">completion</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatedFeaturesComponent/>
      <TemplatesSection/>
      <Stats_testimonial/>
      <Pricing_CTA/>
      <Footer/>
    </>
  )
}