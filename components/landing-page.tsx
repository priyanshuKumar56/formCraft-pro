"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Users,
  Zap,
  Shield,
  BarChart3,
  Star,
  Play,
  Menu,
  X,
  MousePointer,
  Palette,
  Smartphone,
  TrendingUp,
  ChevronRight,
  FileText,
  Target,
} from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FormCraft Pro</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Features
                </a>
                <a href="#templates" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Templates
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Pricing
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started Free</Button>
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started Free</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Trusted by 50,000+ businesses
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Create beautiful forms
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    in minutes
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Build stunning, interactive forms with our drag-and-drop builder. Collect responses, analyze data, and
                  automate workflows—all without writing a single line of code.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
                    Start Building Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Demo */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-500 ml-4">FormCraft Pro</span>
                  </div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-12 bg-blue-100 rounded-lg border-2 border-blue-200"></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-8 bg-gray-100 rounded"></div>
                      <div className="h-8 bg-gray-100 rounded"></div>
                    </div>
                    <div className="h-10 bg-blue-600 rounded-lg"></div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-200 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to create amazing forms</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple contact forms to complex multi-step surveys, FormCraft Pro has all the tools you need to
              collect data and grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MousePointer,
                title: "Drag & Drop Builder",
                description: "Create forms visually with our intuitive drag-and-drop interface. No coding required.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Palette,
                title: "Beautiful Templates",
                description: "Start with professionally designed templates or create your own from scratch.",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Get detailed insights into form performance and user behavior with built-in analytics.",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Smartphone,
                title: "Mobile Responsive",
                description: "All forms are automatically optimized for mobile devices and tablets.",
                color: "bg-orange-100 text-orange-600",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security with SSL encryption, GDPR compliance, and data protection.",
                color: "bg-red-100 text-red-600",
              },
              {
                icon: Zap,
                title: "Smart Integrations",
                description: "Connect with 1000+ apps including Slack, Google Sheets, Mailchimp, and more.",
                color: "bg-yellow-100 text-yellow-600",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div
                    className={`p-3 rounded-lg ${feature.color} w-fit mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Create professional forms in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose a Template",
                description: "Start with one of our beautiful templates or create from scratch",
                icon: FileText,
              },
              {
                step: "02",
                title: "Customize & Design",
                description: "Drag and drop elements, customize colors, and add your branding",
                icon: Palette,
              },
              {
                step: "03",
                title: "Share & Collect",
                description: "Publish your form and start collecting responses instantly",
                icon: Target,
              },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg w-fit mx-auto mb-4">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready-to-use templates</h2>
            <p className="text-xl text-gray-600">Choose from hundreds of professionally designed templates</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Contact Form", category: "Business", color: "bg-blue-500" },
              { name: "Survey", category: "Research", color: "bg-green-500" },
              { name: "Registration", category: "Events", color: "bg-purple-500" },
              { name: "Feedback", category: "Customer", color: "bg-orange-500" },
              { name: "Job Application", category: "HR", color: "bg-red-500" },
              { name: "Order Form", category: "E-commerce", color: "bg-indigo-500" },
              { name: "Newsletter", category: "Marketing", color: "bg-pink-500" },
              { name: "Booking", category: "Service", color: "bg-teal-500" },
            ].map((template, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className={`h-32 ${template.color} rounded-t-lg relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors">
                      <div className="p-4 space-y-2">
                        <div className="h-2 bg-white/30 rounded w-3/4"></div>
                        <div className="h-2 bg-white/30 rounded w-1/2"></div>
                        <div className="h-6 bg-white/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.category}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/signup">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                View All Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Active Users", icon: Users },
              { number: "2M+", label: "Forms Created", icon: FileText },
              { number: "99.9%", label: "Uptime", icon: TrendingUp },
              { number: "4.9/5", label: "User Rating", icon: Star },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="bg-white/10 p-3 rounded-lg w-fit mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What our customers say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "FormCraft Pro has revolutionized how we collect customer feedback. The analytics are incredible!",
                author: "Sarah Johnson",
                role: "Marketing Director",
                company: "TechCorp",
                avatar: "SJ",
              },
              {
                quote: "The drag-and-drop builder is so intuitive. We created our entire onboarding flow in minutes.",
                author: "Mike Chen",
                role: "Product Manager",
                company: "StartupXYZ",
                avatar: "MC",
              },
              {
                quote: "Best form builder we've used. The integrations with our existing tools work flawlessly.",
                author: "Emily Davis",
                role: "Operations Lead",
                company: "GrowthCo",
                avatar: "ED",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that's right for your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "forever",
                description: "Perfect for individuals and small projects",
                features: ["Up to 3 forms", "100 responses/month", "Basic templates", "Email support"],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Professional",
                price: "$29",
                period: "per month",
                description: "Best for growing businesses and teams",
                features: [
                  "Unlimited forms",
                  "10,000 responses/month",
                  "Advanced analytics",
                  "Custom branding",
                  "Priority support",
                ],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "per month",
                description: "For large organizations with advanced needs",
                features: [
                  "Everything in Professional",
                  "Unlimited responses",
                  "Advanced integrations",
                  "Custom domains",
                  "Dedicated support",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative border-2 ${plan.popular ? "border-blue-500 shadow-xl" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup">
                    <Button
                      className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using FormCraft Pro to create better forms and collect more data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  )
}
