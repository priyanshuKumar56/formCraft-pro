"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useAppDispatch } from "@/store/hooks"
import { setFormData } from "@/store/slices/formSlice"
import { setActiveTab } from "@/store/slices/uiSlice"
import { PRESET_TEMPLATES } from "@/lib/templates"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Filter,
  Star,
  FileText,
  BarChart3,
  Settings,
  Share2,
  Trash2,
  Eye,
  Edit,
  MoreHorizontal,
  Sparkles,
  LayoutGrid,
  Clock,
  ExternalLink,
  ChevronRight,
  Zap,
  Layers,
  Users,
  Bell,
  SearchIcon,
  HardDrive
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTabFilter] = useState("all")

  const handleAdoptTemplate = (templateKey: string) => {
    const template = PRESET_TEMPLATES[templateKey]
    if (template) {
      dispatch(setFormData(template))
      dispatch(setActiveTab("create"))
      router.push("/builder")
    }
  }

  const handleCreateBlank = () => {
    router.push("/builder")
  }

  const forms = [
    {
      id: 1,
      title: "Product Launch Feedback",
      responses: 124,
      status: "published",
      date: "2 hours ago",
      color: "from-indigo-500 to-purple-500",
      accent: "bg-indigo-500"
    },
    {
      id: 2,
      title: "Annual Survey 2024",
      responses: 89,
      status: "draft",
      date: "5 hours ago",
      color: "from-emerald-500 to-teal-500",
      accent: "bg-emerald-500"
    },
    {
      id: 3,
      title: "Contact Form",
      responses: 32,
      status: "published",
      date: "1 day ago",
      color: "from-blue-500 to-cyan-500",
      accent: "bg-blue-500"
    }
  ]

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Sidebar - Modern & Sleek */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 p-8 hidden lg:flex flex-col z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">FormCraft <span className="text-indigo-600">Pro</span></span>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarLink icon={<LayoutGrid size={18} />} label="All Forms" active />
          <SidebarLink icon={<Star size={18} />} label="Favorites" />
          <SidebarLink icon={<Zap size={18} />} label="Workflows" />
          <SidebarLink icon={<BarChart3 size={18} />} label="Analytics" />
          <SidebarLink icon={<Users size={18} />} label="Team" />
        </nav>

        <div className="pt-8 mt-8 border-t border-slate-50">
          <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Storage</span>
              <span className="text-[10px] font-black text-indigo-600">Upgrade</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-3">
              <div className="h-full w-[65%] bg-indigo-600 rounded-full" />
            </div>
            <p className="text-[11px] font-bold text-slate-600">1.2GB of 2.0GB used</p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 p-2 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
          <Avatar className="h-10 w-10 border-2 border-white shadow-md">
            <AvatarFallback className="bg-indigo-500 text-white font-black text-xs">PK</AvatarFallback>
          </Avatar>
          <div>
            <span className="block text-sm font-black text-slate-900 leading-none mb-1">Priyanshu K.</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pro Scholar</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:pl-72 min-h-screen">

        {/* Top Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-40 px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
          <div className="relative flex-1 max-w-2xl group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search your forms, templates and analytics..."
              className="w-full h-12 bg-slate-50 border-transparent rounded-[1.25rem] pl-12 pr-6 text-sm font-medium outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all border border-slate-100/50"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-100 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white" />
            </Button>
            <Button onClick={handleCreateBlank} className="h-12 px-8 bg-slate-900 text-white hover:bg-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95">
              <Plus size={18} className="mr-2" /> Create New
            </Button>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-16">

          {/* Hero / Quick Templates */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Start with a Blueprint</h2>
                <p className="text-sm font-medium text-slate-400">Jumpstart your workflow with these designer-crafted layouts.</p>
              </div>
              <Button variant="ghost" className="text-indigo-600 font-black text-xs uppercase tracking-widest gap-2">View All Templates <ChevronRight size={14} /></Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Blank Template */}
              <div
                onClick={handleCreateBlank}
                className="group cursor-pointer aspect-[4/3] bg-white border-2 border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 relative overflow-hidden"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Plus size={32} />
                </div>
                <div className="text-center">
                  <span className="block font-black text-slate-900">Blank Canvas</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Start from scratch</span>
                </div>
              </div>

              {/* Feedback Template */}
              <TemplateCard
                onClick={() => handleAdoptTemplate('feedback')}
                title="Customer Feedback"
                icon={<Sparkles size={24} />}
                accent="bg-indigo-600"
                color="from-indigo-600 to-violet-600"
              />

              {/* Contact Template */}
              <TemplateCard
                onClick={() => handleAdoptTemplate('contact')}
                title="Minimal Contact"
                icon={<Edit size={24} />}
                accent="bg-slate-900"
                color="from-slate-900 to-slate-700"
              />

              {/* Registration Template */}
              <TemplateCard
                onClick={() => handleAdoptTemplate('registration')}
                title="Event RSVP"
                icon={<Zap size={24} />}
                accent="bg-orange-500"
                color="from-orange-500 to-rose-500"
              />

            </div>
          </section>

          {/* Recent Forms List */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Projects</h2>
                <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-100 border-none px-3 font-bold rounded-lg text-xs">24 Total</Badge>
              </div>
              <div className="flex bg-white border border-slate-100 rounded-xl p-1">
                <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg bg-slate-50 text-slate-900 font-bold">Grid</Button>
                <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-slate-400 font-bold">List</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {forms.map((form) => (
                <FormCard key={form.id} form={form} />
              ))}
            </div>
          </section>

          {/* Quick Analytics Mockup */}
          <section className="bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <BarChart3 size={240} className="text-white" />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                  <Zap size={14} /> Performance Insights
                </div>
                <h2 className="text-4xl font-black text-white leading-tight">Your forms are performing <span className="text-indigo-400">24% better</span> this week.</h2>
                <p className="text-slate-400 font-medium">We've analyzed your submission flow. Higher conversion rates detected on mobile layouts.</p>
                <Button className="bg-white text-slate-900 hover:bg-slate-100 font-black rounded-2xl h-12 px-8 shadow-2xl transition-all">Go to Analytics</Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <StatCard label="Total Submissions" value="1.2k" sub="+12% today" />
                <StatCard label="Avg. Time" value="45s" sub="-5s improvement" />
                <StatCard label="Unique Views" value="4.8k" sub="+840 this week" />
                <StatCard label="Fill Rate" value="78%" sub="High conversion" />
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

function SidebarLink({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group ${active ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"}`}>
      <div className={`transition-transform duration-300 group-hover:scale-110 ${active ? "scale-100" : "opacity-70 group-hover:opacity-100"}`}>
        {icon}
      </div>
      <span className={`text-sm font-black tracking-tight ${active ? "opacity-100" : ""}`}>{label}</span>
    </div>
  )
}

function TemplateCard({ title, icon, accent, color, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer aspect-[4/3] bg-white border-2 border-slate-100 rounded-[2.5rem] flex flex-col p-8 hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 relative overflow-hidden"
    >
      <div className={`w-12 h-12 ${accent} rounded-2xl flex items-center justify-center text-white mb-auto shadow-lg shadow-slate-100 transition-transform group-hover:scale-110 duration-500`}>
        {icon}
      </div>
      <div>
        <span className="block font-black text-slate-900 text-lg mb-1">{title}</span>
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Blueprint</span>
      </div>
      <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-150 transition-all duration-1000 -mr-8 -mb-8 rounded-full`} />
    </div>
  )
}

function FormCard({ form }: any) {
  return (
    <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 flex flex-col gap-6 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className={`h-10 px-4 rounded-xl ${form.accent} bg-opacity-10 flex items-center gap-2`}>
          <span className={`w-2 h-2 rounded-full ${form.accent} animate-pulse`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${form.accent.replace('bg-', 'text-')}`}>{form.status}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl text-slate-300 hover:text-slate-900">
          <MoreHorizontal size={20} />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{form.title}</h3>
        <p className="text-sm font-medium text-slate-400">Modified {form.date}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div className="p-4 bg-slate-50 rounded-2xl flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Responses</span>
          <span className="text-lg font-black text-slate-900">{form.responses}</span>
        </div>
        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex flex-col group/action cursor-pointer hover:bg-indigo-600 transition-all duration-300">
          <span className="text-[10px] font-black text-indigo-600 group-hover/action:text-indigo-100 uppercase tracking-widest mb-1 transition-colors">Actions</span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-indigo-900 group-hover/action:text-white transition-colors">Edit Form</span>
            <ChevronRight size={14} className="text-indigo-400 group-hover/action:text-white transition-all transform group-hover/action:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Visual Decoration */}
      <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${form.color} opacity-5 blur-3xl`} />
    </div>
  )
}

function StatCard({ label, value, sub }: any) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
      <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{label}</span>
      <span className="block text-3xl font-black text-white mb-1 tracking-tight">{value}</span>
      <span className="block text-[10px] font-bold text-indigo-400">{sub}</span>
    </div>
  )
}
