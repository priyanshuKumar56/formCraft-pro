"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Sparkles,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Users,
  Calendar,
  Settings,
  Bell,
  FileText,
  Folder,
  Star,
  Share2,
  Globe,
  Lock,
  TrendingUp,
  Download,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newFormData, setNewFormData] = useState({ title: "", description: "", template: "" })
  const router = useRouter()

  // Mock data with more comprehensive form management
  const forms = [
    {
      id: 1,
      title: "Customer Feedback Survey",
      description: "Collect customer satisfaction data and improve our services",
      responses: 247,
      status: "Published",
      lastModified: "2 hours ago",
      isStarred: true,
      category: "survey",
      views: 1250,
      conversionRate: 68,
      shareableLink: "https://formcraft.pro/f/customer-feedback-xyz",
    },
    {
      id: 2,
      title: "Lead Generation Form",
      description: "Capture potential customer information for sales team",
      responses: 89,
      status: "Draft",
      lastModified: "1 day ago",
      isStarred: false,
      category: "lead",
      views: 0,
      conversionRate: 0,
      shareableLink: null,
    },
    {
      id: 3,
      title: "Event Registration",
      description: "Register attendees for upcoming tech conference",
      responses: 156,
      status: "Published",
      lastModified: "3 days ago",
      isStarred: true,
      category: "event",
      views: 890,
      conversionRate: 72,
      shareableLink: "https://formcraft.pro/f/event-registration-abc",
    },
    {
      id: 4,
      title: "Job Application Form",
      description: "Collect job applications and resumes for HR department",
      responses: 34,
      status: "Published",
      lastModified: "1 week ago",
      isStarred: false,
      category: "hr",
      views: 234,
      conversionRate: 45,
      shareableLink: "https://formcraft.pro/f/job-application-def",
    },
    {
      id: 5,
      title: "Product Feedback",
      description: "Get user feedback on our latest product features",
      responses: 78,
      status: "Published",
      lastModified: "2 days ago",
      isStarred: false,
      category: "feedback",
      views: 456,
      conversionRate: 62,
      shareableLink: "https://formcraft.pro/f/product-feedback-ghi",
    },
  ]

  const templates = [
    {
      id: 1,
      name: "Contact Form",
      description: "Simple contact form with name, email, and message",
      category: "Business",
      color: "bg-blue-500",
      icon: "📧",
      uses: 1250,
    },
    {
      id: 2,
      name: "Customer Survey",
      description: "Comprehensive customer satisfaction survey",
      category: "Research",
      color: "bg-green-500",
      icon: "📊",
      uses: 890,
    },
    {
      id: 3,
      name: "Event Registration",
      description: "Event registration with attendee details",
      category: "Events",
      color: "bg-purple-500",
      icon: "🎟️",
      uses: 567,
    },
    {
      id: 4,
      name: "Job Application",
      description: "Complete job application form with file upload",
      category: "HR",
      color: "bg-orange-500",
      icon: "💼",
      uses: 445,
    },
    {
      id: 5,
      name: "Newsletter Signup",
      description: "Simple newsletter subscription form",
      category: "Marketing",
      color: "bg-pink-500",
      icon: "📰",
      uses: 1100,
    },
    {
      id: 6,
      name: "Feedback Form",
      description: "Product or service feedback collection",
      category: "Customer",
      color: "bg-indigo-500",
      icon: "💬",
      uses: 678,
    },
  ]

  const workspaces = [
    { id: 1, name: "Marketing Team", forms: 12, members: 5, color: "bg-blue-100 text-blue-800" },
    { id: 2, name: "HR Department", forms: 8, members: 3, color: "bg-green-100 text-green-800" },
    { id: 3, name: "Product Research", forms: 15, members: 7, color: "bg-purple-100 text-purple-800" },
    { id: 4, name: "Sales Team", forms: 6, members: 4, color: "bg-orange-100 text-orange-800" },
  ]

  const categories = [
    { id: "all", name: "All Forms", count: forms.length },
    { id: "survey", name: "Surveys", count: forms.filter((f) => f.category === "survey").length },
    { id: "lead", name: "Lead Gen", count: forms.filter((f) => f.category === "lead").length },
    { id: "event", name: "Events", count: forms.filter((f) => f.category === "event").length },
    { id: "hr", name: "HR", count: forms.filter((f) => f.category === "hr").length },
    { id: "feedback", name: "Feedback", count: forms.filter((f) => f.category === "feedback").length },
  ]

  const filteredForms = forms.filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || form.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateForm = (template?: string) => {
    if (template) {
      setNewFormData({ ...newFormData, template })
    }
    router.push("/builder")
  }

  const handleEditForm = (formId: number) => {
    router.push("/builder")
  }

  const handleCopyLink = async (link: string) => {
    await navigator.clipboard.writeText(link)
    // You could add a toast notification here
  }

  const handleDeleteForm = (formId: number) => {
    // Implement delete functionality
    console.log("Delete form:", formId)
  }

  const handleStarForm = (formId: number) => {
    // Implement star/unstar functionality
    console.log("Star form:", formId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image 
                  src="/fs-logo.jpg"
                  alt="FormCraft Pro Logo"
                  width={62}
                  height={62}
                  className="rounded-full"/>
                <span className="text-xl font-bold text-gray-900">FormCraft Pro</span>
              </Link>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search forms, templates, workspaces..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/70 backdrop-blur-sm border-gray-200/50"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your forms today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Forms", value: "24", icon: FileText, change: "+12%", color: "bg-blue-500" },
            { title: "Total Responses", value: "1,247", icon: Users, change: "+23%", color: "bg-green-500" },
            { title: "Avg Conversion", value: "68%", icon: TrendingUp, change: "+5%", color: "bg-purple-500" },
            { title: "Active Forms", value: "18", icon: Eye, change: "+8%", color: "bg-orange-500" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-full`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Form
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Form</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Form Title</Label>
                        <Input
                          id="title"
                          value={newFormData.title}
                          onChange={(e) => setNewFormData({ ...newFormData, title: e.target.value })}
                          placeholder="Enter form title..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newFormData.description}
                          onChange={(e) => setNewFormData({ ...newFormData, description: e.target.value })}
                          placeholder="Describe your form..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleCreateForm()} className="flex-1">
                          Start from Scratch
                        </Button>
                        <Button variant="outline" onClick={() => handleCreateForm("template")} className="flex-1">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Form
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Folder className="h-4 w-4 mr-2" />
                  New Workspace
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                        selectedCategory === category.id ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Workspaces */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Folder className="h-5 w-5" />
                  <span>Workspaces</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workspaces.map((workspace) => (
                    <div
                      key={workspace.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{workspace.name}</h4>
                        <p className="text-sm text-gray-600">
                          {workspace.forms} forms • {workspace.members} members
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${workspace.color}`}>Active</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Forms Section */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>My Forms</span>
                    <Badge variant="secondary">{filteredForms.length}</Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredForms.map((form) => (
                    <div
                      key={form.id}
                      className="flex items-center justify-between p-4 border border-gray-200/50 rounded-lg hover:bg-white/50 transition-all backdrop-blur-sm"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{form.title}</h3>
                            {form.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            <Badge variant={form.status === "Published" ? "default" : "secondary"} className="text-xs">
                              {form.status === "Published" ? (
                                <>
                                  <Globe className="h-3 w-3 mr-1" />
                                  Published
                                </>
                              ) : (
                                <>
                                  <Lock className="h-3 w-3 mr-1" />
                                  Draft
                                </>
                              )}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{form.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{form.responses} responses</span>
                            <span>{form.views} views</span>
                            <span>{form.conversionRate}% conversion</span>
                            <span>Modified {form.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {form.shareableLink && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyLink(form.shareableLink!)}
                            title="Copy shareable link"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" title="Preview form">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditForm(form.id)} title="Edit form">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStarForm(form.id)}
                          title={form.isStarred ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Star className={`h-4 w-4 ${form.isStarred ? "text-yellow-500 fill-current" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Templates Section */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Form Templates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="group cursor-pointer p-4 border border-gray-200/50 rounded-lg hover:shadow-lg transition-all backdrop-blur-sm hover:bg-white/50"
                      onClick={() => handleCreateForm(template.name)}
                    >
                      <div className={`h-20 ${template.color} rounded-lg relative overflow-hidden mb-3`}>
                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center">
                          <span className="text-2xl">{template.icon}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{template.uses} uses</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Form published", form: "Customer Survey", time: "2 hours ago", type: "publish" },
                    { action: "New response", form: "Lead Generation", time: "4 hours ago", type: "response" },
                    { action: "Form edited", form: "Event Registration", time: "1 day ago", type: "edit" },
                    { action: "Workspace created", form: "Marketing Team", time: "2 days ago", type: "workspace" },
                    { action: "Template used", form: "Contact Form", time: "3 days ago", type: "template" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "publish"
                            ? "bg-green-500"
                            : activity.type === "response"
                              ? "bg-blue-500"
                              : activity.type === "edit"
                                ? "bg-yellow-500"
                                : activity.type === "workspace"
                                  ? "bg-purple-500"
                                  : "bg-gray-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.form}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
