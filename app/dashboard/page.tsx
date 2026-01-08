"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PRESET_TEMPLATES } from "@/lib/templates"
import { useAppDispatch } from "@/store/hooks"
import { setFormData } from "@/store/slices/formSlice"
import { setActiveTab } from "@/store/slices/uiSlice"
import {
  MoreHorizontal,
  ChevronRight,
  Filter,
  LayoutList,
  Grid,
  Plus,
  Sparkles,
  Zap,
  Leaf
} from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState("all")

  // Mock Data - In real app fetch from API
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
    },
    {
      id: 4,
      title: "Event Registration",
      responses: 215,
      status: "archived",
      date: "2 weeks ago",
      color: "from-orange-500 to-red-500",
      accent: "bg-orange-500"
    }
  ]

  const filteredForms = forms.filter(f => filter === "all" || f.status === filter)

  const handleUseTemplate = (templateKey: string) => {
    const template = PRESET_TEMPLATES[templateKey]
    if (template) {
      dispatch(setFormData(template))
      dispatch(setActiveTab("create"))
      router.push("/builder")
    }
  }

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Create Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Create Something New</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Blank Canvas */}
          <div
            onClick={() => router.push("/builder")}
            className="group cursor-pointer aspect-[4/3] bg-white border border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors z-10">
              <Plus size={32} />
            </div>
            <div className="text-center z-10">
              <span className="block font-bold text-slate-900">Blank Canvas</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Start from scratch</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Quick Feedback Template */}
          <div
            onClick={() => handleUseTemplate('feedback')}
            className="group cursor-pointer aspect-[4/3] bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2rem] p-6 flex flex-col hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-auto">
              <Sparkles size={24} />
            </div>
            <div className="relative z-10">
              <span className="block font-bold text-white text-lg">Feedback</span>
              <span className="block text-[10px] font-bold text-indigo-100 uppercase tracking-widest mt-1">Template</span>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          </div>

          {/* Quick Registration Template */}
          <div
            onClick={() => handleUseTemplate('registration')}
            className="group cursor-pointer aspect-[4/3] bg-gradient-to-br from-orange-400 to-rose-500 rounded-[2rem] p-6 flex flex-col hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-auto">
              <Zap size={24} />
            </div>
            <div className="relative z-10">
              <span className="block font-bold text-white text-lg">Registration</span>
              <span className="block text-[10px] font-bold text-orange-100 uppercase tracking-widest mt-1">Template</span>
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl -ml-6 -mb-6 pointer-events-none" />
          </div>

          {/* Quick Contact Template */}
          <div
            onClick={() => handleUseTemplate('contact')}
            className="group cursor-pointer aspect-[4/3] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-6 flex flex-col hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-auto">
              <Leaf size={24} />
            </div>
            <div className="relative z-10">
              <span className="block font-bold text-white text-lg">Contact</span>
              <span className="block text-[10px] font-bold text-emerald-100 uppercase tracking-widest mt-1">Template</span>
            </div>
          </div>
        </div>
      </section>

      {/* Forms List Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Active Projects</h2>
            <p className="text-slate-500 font-medium text-sm">Manage and track your form performance.</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`rounded-lg ${viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-700"}`}
            >
              <Grid size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={`rounded-lg ${viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-700"}`}
            >
              <LayoutList size={18} />
            </Button>
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <div className="flex items-center gap-2 px-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Filter:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm font-bold text-slate-900 bg-transparent outline-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Forms Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredForms.map((form) => (
              <FormListItem key={form.id} form={form} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function FormCard({ form }: any) {
  return (
    <div className="spotlight-card group bg-white border border-slate-200 rounded-[2rem] p-6 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 flex flex-col gap-6 relative overflow-hidden">
      <div className="flex items-center justify-between relative z-10">
        <div className={`h-8 px-3 rounded-lg ${form.accent} bg-opacity-10 flex items-center gap-2`}>
          <span className={`w-1.5 h-1.5 rounded-full ${form.accent} animate-pulse`} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${form.accent.replace('bg-', 'text-')}`}>{form.status}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-slate-300 hover:text-slate-900 hover:bg-slate-50">
          <MoreHorizontal size={16} />
        </Button>
      </div>

      <div className="flex flex-col gap-1 relative z-10">
        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{form.title}</h3>
        <p className="text-xs font-medium text-slate-400">Edited {form.date}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
        <div className="p-3 bg-slate-50 rounded-xl flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Responses</span>
          <span className="text-base font-black text-slate-900">{form.responses}</span>
        </div>
        <div className="p-3 bg-white border border-slate-100 rounded-xl flex flex-col group/action cursor-pointer hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-300">
          <span className="text-[9px] font-bold text-slate-400 group-hover/action:text-slate-400 uppercase tracking-widest mb-1 transition-colors">Action</span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 group-hover/action:text-white transition-colors">Edit</span>
            <ChevronRight size={12} className="text-slate-300 group-hover/action:text-white transition-all transform group-hover/action:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Visual Decoration */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${form.color} opacity-[0.03] group-hover:opacity-[0.08] blur-3xl transition-opacity duration-500`} />
    </div>
  )
}

function FormListItem({ form }: any) {
  return (
    <div className="group flex items-center gap-6 p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all relative overflow-hidden">
      {/* Status Dot */}
      <div className={`w-2 h-2 rounded-full ${form.accent}`} />

      <div className="flex-1">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{form.title}</h3>
        <p className="text-xs font-medium text-slate-400">Edited {form.date}</p>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
          <span className="text-xs font-bold text-slate-700 capitalize">{form.status}</span>
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Responses</span>
          <span className="text-xs font-bold text-slate-700">{form.responses}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold text-xs">Edit</Button>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl text-slate-400 hover:text-slate-900">
          <MoreHorizontal size={16} />
        </Button>
      </div>

      <div className={`absolute inset-0 bg-gradient-to-r ${form.color} opacity-0 group-hover:opacity-[0.02] transition-opacity pointer-events-none`} />
    </div>
  )
}
