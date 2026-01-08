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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    for (const card of document.getElementsByClassName("spotlight-card") as any) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

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
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden" onMouseMove={handleMouseMove}>
      <style jsx global>{`
        :root {
          --cursor-x: 50%;
          --cursor-y: 50%;
        }

        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #FAFAFA;
          overflow-x: hidden;
        }

        .font-display {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* --- Advanced Animations --- */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(2deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes beam-flow {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }

        /* --- 3D & Depth Utilities --- */
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-3d {
          transform-style: preserve-3d;
        }

        /* --- Spotlight Effect --- */
        .spotlight-card {
          position: relative;
          overflow: hidden;
        }

        .spotlight-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.04), transparent 40%);
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
          z-index: 1;
        }

        .spotlight-card:hover::before {
          opacity: 1;
        }

        /* --- Background Patterns --- */
        .bg-grid-slate {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }

        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }

        /* --- Utility Classes --- */
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }

        /* Scroll Reveal Utility */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #d4d4d8; }

        /* Beam Animation */
        .beam-line {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .beam-line::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.4) 50%, transparent 100%);
          transform: translateX(-100%);
          animation: beam-flow 3s infinite linear;
        }
      `}</style>

      {/* Background with Grid and Noise */}
      <div className="absolute inset-0 bg-grid-slate pointer-events-none fixed z-0" />
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none fixed z-0" />

      {/* Sidebar - Modern & Sleek */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white/80 backdrop-blur-md border-r border-slate-200/60 p-8 hidden lg:flex flex-col z-50 transition-all duration-300">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg shadow-zinc-200">
            <span className="font-display font-bold text-lg text-white">F</span>
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-slate-900">FormCraft <span className="text-zinc-400">Pro</span></span>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarLink icon={<LayoutGrid size={18} />} label="Overview" active />
          <SidebarLink icon={<FileText size={18} />} label="My Forms" />
          <SidebarLink icon={<BarChart3 size={18} />} label="Analytics" />
          <SidebarLink icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="mt-8 flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100">
          <Avatar className="h-10 w-10 border-2 border-white shadow-md">
            <AvatarFallback className="bg-zinc-900 text-white font-bold text-xs">PK</AvatarFallback>
          </Avatar>
          <div>
            <span className="block text-sm font-bold text-slate-900 leading-none mb-1">Priyanshu K.</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pro Plan</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:pl-72 min-h-screen relative z-10">

        {/* Top Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 z-40 px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
          <div className="relative flex-1 max-w-2xl group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search forms, responses..."
              className="w-full h-12 bg-slate-50/50 border border-slate-200/60 rounded-2xl pl-12 pr-6 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-100 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </Button>
            <Button onClick={handleCreateBlank} className="h-12 px-6 bg-zinc-900 text-white hover:bg-black rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-zinc-200 transition-all hover:scale-[1.02] active:scale-95">
              <Plus size={16} className="mr-2" /> New Project
            </Button>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12">

          {/* Quick Actions / Templates */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight mb-1">Create Something New</h2>
                <p className="text-sm font-medium text-slate-400">Choose a starting point for your next project.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Blank Template */}
              <div
                onClick={handleCreateBlank}
                className="spotlight-card group cursor-pointer aspect-[4/3] bg-white border border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Plus size={32} />
                </div>
                <div className="text-center relative z-10">
                  <span className="block font-bold text-slate-900">Blank Canvas</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Start from scratch</span>
                </div>
              </div>

              {/* Templates */}
              <TemplateCard
                onClick={() => handleAdoptTemplate('feedback')}
                title="Feedback"
                icon={<Sparkles size={24} />}
                accent="bg-indigo-600"
                color="from-indigo-600 to-violet-600"
              />
              <TemplateCard
                onClick={() => handleAdoptTemplate('contact')}
                title="Contact"
                icon={<Edit size={24} />}
                accent="bg-zinc-900"
                color="from-zinc-900 to-zinc-700"
              />
              <TemplateCard
                onClick={() => handleAdoptTemplate('registration')}
                title="Event RSVP"
                icon={<Zap size={24} />}
                accent="bg-orange-500"
                color="from-orange-500 to-rose-500"
              />
            </div>
          </section>

          {/* Forms List with Spotlight Effect */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Active Projects</h2>
                <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-100 border-none px-3 font-bold rounded-lg text-xs">Recently Edited</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map((form) => (
                <FormCard key={form.id} form={form} />
              ))}
            </div>
          </section>

          {/* Stats Section with Beam Animation */}
          <section className="bg-zinc-900 rounded-[2.5rem] p-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-zinc-900 to-zinc-950 opacity-100" />
            <div className="absolute inset-0 bg-noise opacity-10" />
            <div className="beam-line" />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                  <Zap size={12} /> Weekly Insight
                </div>
                <h2 className="text-3xl font-display font-bold text-white leading-tight">Your conversion rate is <span className="text-indigo-400">up 24%</span> this week.</h2>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-md">Great job! Your recent form optimizations are paying off. Mobile completion rates have doubled.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Total Views" value="2.4k" sub="+124 today" />
                <StatCard label="Responses" value="842" sub="34% conversion" />
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
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${active ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
      <div className={`transition-transform duration-300 ${active ? "scale-100" : "group-hover:scale-110"}`}>
        {icon}
      </div>
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </div>
  )
}

function TemplateCard({ title, icon, accent, color, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="spotlight-card group cursor-pointer aspect-[4/3] bg-white border border-slate-200 rounded-[2rem] flex flex-col p-6 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 relative overflow-hidden"
    >
      <div className={`w-12 h-12 ${accent} rounded-2xl flex items-center justify-center text-white mb-auto shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-110 duration-500`}>
        {icon}
      </div>
      <div className="relative z-10">
        <span className="block font-bold text-slate-900 text-lg mb-1">{title}</span>
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Template</span>
      </div>
      <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.05] group-hover:opacity-[0.1] blur-2xl group-hover:scale-150 transition-all duration-1000 -mr-10 -mb-10 rounded-full pointer-events-none`} />
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

function StatCard({ label, value, sub }: any) {
  return (
    <div className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</span>
      <span className="block text-2xl font-display font-bold text-white mb-1 tracking-tight">{value}</span>
      <span className="block text-[10px] font-bold text-indigo-400">{sub}</span>
    </div>
  )
}
