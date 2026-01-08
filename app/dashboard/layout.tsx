"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutGrid,
  FileText,
  BarChart3,
  Settings,
  SearchIcon,
  Bell,
  Plus
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
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
          <SidebarLink href="/dashboard" icon={<FileText size={18} />} label="My Forms" active={pathname === "/dashboard"} />
          <SidebarLink href="/dashboard/templates" icon={<LayoutGrid size={18} />} label="Templates" active={pathname === "/dashboard/templates"} />
          <SidebarLink href="/dashboard/settings" icon={<Settings size={18} />} label="Settings" active={pathname === "/dashboard/settings"} />
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
              placeholder="Search forms, templates..."
              className="w-full h-12 bg-slate-50/50 border border-slate-200/60 rounded-2xl pl-12 pr-6 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-100 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </Button>
            <Link href="/builder">
              <Button className="h-12 px-6 bg-zinc-900 text-white hover:bg-black rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-zinc-200 transition-all hover:scale-[1.02] active:scale-95">
                <Plus size={16} className="mr-2" /> New Project
              </Button>
            </Link>
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}

function SidebarLink({ icon, label, active = false, href }: { icon: any, label: string, active?: boolean, href: string }) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${active ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
        <div className={`transition-transform duration-300 ${active ? "scale-100" : "group-hover:scale-110"}`}>
          {icon}
        </div>
        <span className="text-sm font-bold tracking-tight">{label}</span>
      </div>
    </Link>
  )
}
