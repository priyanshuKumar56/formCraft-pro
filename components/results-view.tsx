"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Users,
  Eye,
  Download,
  TrendingUp,
  Search,
  Share2,
  RefreshCw,
  Globe,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react"
import type { FormData } from "@/types/form"

interface ResultsViewProps {
  formData: FormData
}

// Enhanced mock data for comprehensive results
const mockResults = {
  totalResponses: 247,
  completionRate: 78,
  averageTime: "3m 42s",
  lastResponse: "2 hours ago",
  conversionRate: 68,
  uniqueVisitors: 1250,
  bounceRate: 22,
  topCountries: [
    { country: "United States", responses: 89, percentage: 36 },
    { country: "United Kingdom", responses: 45, percentage: 18 },
    { country: "Canada", responses: 32, percentage: 13 },
    { country: "Germany", responses: 28, percentage: 11 },
    { country: "Australia", responses: 21, percentage: 9 },
  ],
  deviceBreakdown: [
    { device: "Desktop", responses: 142, percentage: 58 },
    { device: "Mobile", responses: 78, percentage: 32 },
    { device: "Tablet", responses: 27, percentage: 10 },
  ],
  responses: [
    {
      id: "1",
      submittedAt: "2024-01-15T10:30:00Z",
      location: "New York, US",
      device: "Desktop",
      timeSpent: "4m 12s",
      responses: {
        name: "John Doe",
        email: "john@example.com",
        feedback: "Great form experience! Very intuitive and easy to use.",
        rating: "5",
        subscribe: "Yes",
      },
    },
    {
      id: "2",
      submittedAt: "2024-01-15T09:15:00Z",
      location: "London, UK",
      device: "Mobile",
      timeSpent: "2m 45s",
      responses: {
        name: "Jane Smith",
        email: "jane@example.com",
        feedback: "Easy to use and understand. Would recommend!",
        rating: "4",
        subscribe: "Yes",
      },
    },
    {
      id: "3",
      submittedAt: "2024-01-15T08:45:00Z",
      location: "Toronto, CA",
      device: "Desktop",
      timeSpent: "5m 30s",
      responses: {
        name: "Bob Johnson",
        email: "bob@example.com",
        feedback: "Could be improved with better design, but functional.",
        rating: "3",
        subscribe: "No",
      },
    },
    {
      id: "4",
      submittedAt: "2024-01-15T07:20:00Z",
      location: "Berlin, DE",
      device: "Tablet",
      timeSpent: "3m 18s",
      responses: {
        name: "Anna Mueller",
        email: "anna@example.com",
        feedback: "Excellent user experience. Very professional.",
        rating: "5",
        subscribe: "Yes",
      },
    },
    {
      id: "5",
      submittedAt: "2024-01-15T06:55:00Z",
      location: "Sydney, AU",
      device: "Mobile",
      timeSpent: "2m 12s",
      responses: {
        name: "Mike Chen",
        email: "mike@example.com",
        feedback: "Quick and straightforward. No issues.",
        rating: "4",
        subscribe: "Yes",
      },
    },
  ],
  weeklyData: [
    { week: "Week 1", responses: 45, completion: 72 },
    { week: "Week 2", responses: 52, completion: 75 },
    { week: "Week 3", responses: 38, completion: 68 },
    { week: "Week 4", responses: 61, completion: 82 },
    { week: "This Week", responses: 51, completion: 78 },
  ],
}

export function ResultsView({ formData }: ResultsViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDevice, setFilterDevice] = useState("all")
  const [filterTimeRange, setFilterTimeRange] = useState("7d")
  const [selectedTab, setSelectedTab] = useState("overview")

  const filteredResponses = mockResults.responses.filter((response) => {
    const matchesSearch = Object.values(response.responses).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesDevice = filterDevice === "all" || response.device.toLowerCase() === filterDevice
    return matchesSearch && matchesDevice
  })

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Form Analytics</h1>
            <p className="text-gray-600">Comprehensive insights for "{formData.title}"</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/70 backdrop-blur-sm p-1 rounded-lg border border-white/20">
            {[
              { id: "overview", label: "Overview" },
              { id: "responses", label: "Responses" },
              { id: "analytics", label: "Analytics" },
              { id: "insights", label: "Insights" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {selectedTab === "overview" && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Total Responses",
                  value: mockResults.totalResponses.toLocaleString(),
                  icon: Users,
                  change: "+23%",
                  color: "bg-blue-500",
                },
                {
                  title: "Completion Rate",
                  value: `${mockResults.completionRate}%`,
                  icon: TrendingUp,
                  change: "+5%",
                  color: "bg-green-500",
                },
                {
                  title: "Avg. Time",
                  value: mockResults.averageTime,
                  icon: Clock,
                  change: "-12s",
                  color: "bg-purple-500",
                },
                {
                  title: "Unique Visitors",
                  value: mockResults.uniqueVisitors.toLocaleString(),
                  icon: Eye,
                  change: "+18%",
                  color: "bg-orange-500",
                },
              ].map((stat, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} from last period</p>
                      </div>
                      <div className={`p-3 ${stat.color} rounded-full`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Response Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResults.weeklyData.map((week, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{week.week}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium">{week.responses} responses</span>
                            <span className="text-sm text-gray-500">{week.completion}% completion</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Progress value={(week.responses / 70) * 100} className="h-2 flex-1" />
                          <Progress value={week.completion} className="h-2 flex-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResults.deviceBreakdown.map((device, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getDeviceIcon(device.device)}
                          <span className="font-medium text-sm">{device.device}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24">
                            <Progress value={device.percentage} className="h-2" />
                          </div>
                          <span className="text-sm font-medium w-12">{device.percentage}%</span>
                          <span className="text-sm text-gray-500 w-16">{device.responses}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Geographic Data */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Geographic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {mockResults.topCountries.map((country, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50/50 rounded-lg">
                      <p className="font-medium text-gray-900">{country.country}</p>
                      <p className="text-2xl font-bold text-blue-600">{country.responses}</p>
                      <p className="text-sm text-gray-500">{country.percentage}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedTab === "responses" && (
          <>
            {/* Filters */}
            <div className="mb-6 flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search responses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50"
                  />
                </div>
              </div>
              <Select value={filterDevice} onValueChange={setFilterDevice}>
                <SelectTrigger className="w-40 bg-white/50">
                  <SelectValue placeholder="Device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterTimeRange} onValueChange={setFilterTimeRange}>
                <SelectTrigger className="w-40 bg-white/50">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Responses List */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Form Responses ({filteredResponses.length})</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredResponses.map((response, index) => (
                    <div
                      key={response.id}
                      className="border border-gray-200/50 rounded-lg p-4 hover:bg-white/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline" className="text-xs">
                            Response #{mockResults.totalResponses - index}
                          </Badge>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            {getDeviceIcon(response.device)}
                            <span>{response.device}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{response.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{response.timeSpent}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(response.submittedAt).toLocaleDateString()} at{" "}
                          {new Date(response.submittedAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        {Object.entries(response.responses).map(([key, value]) => (
                          <div key={key} className="bg-gray-50/50 p-3 rounded-lg">
                            <p className="font-medium text-gray-700 capitalize mb-1">{key}:</p>
                            <p className="text-gray-900">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Page Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.pages.map((page, index) => (
                    <div key={page.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{page.title}</p>
                        <p className="text-xs text-gray-500">{page.elements.length} elements</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{Math.floor(Math.random() * 100)}%</p>
                        <p className="text-xs text-gray-500">completion</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "Form Viewed", count: 1250, percentage: 100 },
                    { stage: "Started", count: 980, percentage: 78 },
                    { stage: "Page 1 Completed", count: 850, percentage: 68 },
                    { stage: "Page 2 Completed", count: 720, percentage: 58 },
                    { stage: "Form Submitted", count: 620, percentage: 50 },
                  ].map((stage, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{stage.stage}</span>
                        <span className="text-sm text-gray-500">
                          {stage.count} ({stage.percentage}%)
                        </span>
                      </div>
                      <Progress value={stage.percentage} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "insights" && (
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50/50 border border-blue-200/50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">📈 Performance Insight</h4>
                    <p className="text-sm text-blue-800">
                      Your form completion rate is 23% higher than the industry average. The welcome page is
                      particularly effective at engaging users.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50/50 border border-green-200/50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">✨ Optimization Tip</h4>
                    <p className="text-sm text-green-800">
                      Consider reducing the number of required fields on page 2 to improve completion rates by an
                      estimated 15%.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50/50 border border-orange-200/50 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">📱 Mobile Insight</h4>
                    <p className="text-sm text-orange-800">
                      Mobile users spend 40% less time on your form but have a similar completion rate. Consider
                      optimizing for mobile-first design.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50/50 border border-purple-200/50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">🌍 Geographic Trend</h4>
                    <p className="text-sm text-purple-800">
                      US visitors have the highest completion rate (82%), while European visitors tend to spend more
                      time reading instructions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
