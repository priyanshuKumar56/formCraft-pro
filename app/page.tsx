"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, CheckCircle, Play, BarChart3, TrendingUp, FileText, Zap, Layout, Palette, BarChart2, Code, Shield, Users, MessageSquare, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Landing/Navigation"
import Footer from "@/components/Landing/Footer"

const features = [
  {
    icon: <Layout className="h-6 w-6 text-blue-600" />,
    title: "Drag & Drop Builder",
    description: "Create beautiful forms with our intuitive drag and drop interface. No coding required."
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-green-600" />,
    title: "Powerful Analytics",
    description: "Get insights with real-time analytics and response tracking."
  },
  {
    icon: <Code className="h-6 w-6 text-purple-600" />,
    title: "Custom Logic",
    description: "Add conditional logic to create smart, dynamic forms."
  },
  {
    icon: <Shield className="h-6 w-6 text-yellow-600" />,
    title: "Secure & Private",
    description: "Enterprise-grade security to keep your data safe and compliant."
  },
  {
    icon: <Users className="h-6 w-6 text-pink-600" />,
    title: "Team Collaboration",
    description: "Work together with your team in real-time on form creation."
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-indigo-600" />,
    title: "Customer Support",
    description: "24/7 support to help you with any questions or issues."
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    content: "FormCraft has transformed how we collect customer feedback. The analytics are incredibly insightful.",
    avatar: "/avatars/1.jpg"
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    content: "The ease of use and powerful features make this the best form builder I've used. Highly recommended!",
    avatar: "/avatars/2.jpg"
  },
  {
    name: "Emily Rodriguez",
    role: "HR Manager",
    content: "We've streamlined our hiring process with FormCraft. The applicant tracking is a game-changer.",
    avatar: "/avatars/3.jpg"
  }
]

export default function Home() {
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'analytics' | 'forms'>('overview')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
            >
              <Zap className="h-4 w-4 mr-2" />
              The most powerful form builder
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Create beautiful forms <span className="text-blue-600">in minutes,</span> not hours
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Build powerful forms, surveys, and quizzes with our intuitive drag-and-drop builder. 
              Collect responses, analyze data, and automate workflows—no coding required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base">
                  Start Building Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" className="px-8 py-6 text-base">
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-gray-500">
              {["No credit card required", "Free 14-day trial", "Cancel anytime"].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {text}
                </div>
              ))}
            </div>
            
            <div className="flex items-center pt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white"></div>
                ))}
              </div>
              <div className="ml-4 text-sm text-gray-500">
                <p className="font-medium text-gray-900">10,000+</p>
                <p>Happy users building forms</p>
              </div>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm font-medium">FormCraft Dashboard</div>
              <div className="w-12"></div>
            </div>
            
            <div className="p-1 bg-gray-50 border-b">
              <div className="flex space-x-1 text-sm">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { id: 'forms', label: 'My Forms', icon: FileText }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setDashboardTab(tab.id as any)}
                    className={`flex-1 px-3 py-2 flex items-center justify-center gap-2 rounded-md ${
                      dashboardTab === tab.id
                        ? 'bg-white shadow-sm text-blue-600'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-white">
              {dashboardTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: '24', label: 'Total Forms', change: '+12%' },
                      { value: '1,284', label: 'Responses', change: '+24%' },
                      { value: '78%', label: 'Avg. Completion', change: '+5%' }
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="text-xs text-green-600 mt-1">{item.change} from last month</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    Response Chart
                  </div>
                </div>
              )}
              
              {dashboardTab === 'analytics' && (
                <div className="space-y-4">
                  <div className="h-48 bg-blue-50 rounded-lg flex items-center justify-center text-blue-400">
                    Analytics Overview
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '42%', label: 'Mobile Users' },
                      { value: '2:45', label: 'Avg. Time' },
                      { value: '68%', label: 'Completion' },
                      { value: '1.2k', label: 'Views' }
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-lg font-semibold">{item.value}</p>
                        <p className="text-xs text-gray-500">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {dashboardTab === 'forms' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Recent Forms</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Customer Feedback', responses: 142, status: 'active' },
                      { name: 'Event Registration', responses: 89, status: 'draft' },
                      { name: 'Job Application', responses: 56, status: 'active' }
                    ].map((form, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{form.name}</p>
                            <p className="text-xs text-gray-500">{form.responses} responses</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          form.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {form.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need to create amazing forms</h2>
            <p className="mt-4 text-lg text-gray-500">
              Powerful features designed to help you build better forms, collect more responses, and analyze data with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by teams worldwide</h2>
            <p className="mt-4 text-lg text-gray-500">
              Join thousands of satisfied users who have transformed their form building experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Ready to create amazing forms?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of teams using FormCraft to build better forms and collect more responses.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-base">
                Get Started for Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 hover:text-white px-8 py-6 text-base">
              Schedule a Demo
            </Button>
          </div>
          <p className="mt-4 text-blue-100 text-sm">No credit card required • Cancel anytime</p>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
