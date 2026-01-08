"use client"

import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setFormData } from "@/store/slices/formSlice"
import { setTemplateCategory } from "@/store/slices/dashboardSlice"
import { PRESET_TEMPLATES } from "@/lib/templates"
import { setActiveTab } from "@/store/slices/uiSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Users, MessageSquare, ArrowRight, LayoutTemplate } from "lucide-react"

export default function TemplatesPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const category = useAppSelector((state) => state.dashboard.templateCategory)

    const handleUseTemplate = (templateKey: string) => {
        const template = PRESET_TEMPLATES[templateKey]
        if (template) {
            dispatch(setFormData(template))
            dispatch(setActiveTab("create"))
            router.push("/builder")
        }
    }

    const categories = [
        { id: "all", label: "All Templates" },
        { id: "feedback", label: "Surveys & Feedback" },
        { id: "registration", label: "Registration" },
        { id: "contact", label: "Contact Forms" },
        { id: "marketing", label: "Marketing" }
    ]

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">Template Gallery</h1>
                    <p className="text-slate-500 font-medium max-w-2xl">Start with a professionally designed template. optimized for conversion and heavily customizable.</p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => dispatch(setTemplateCategory(cat.id))}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${category === cat.id
                                ? "bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-200"
                                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feedback Template */}
                <TemplateCard
                    title="Customer Feedback"
                    description="Collect actionable insights from your users with this multi-step feedback form."
                    category="Feedback"
                    icon={<MessageSquare className="text-white" size={24} />}
                    gradient="from-indigo-600 to-violet-600"
                    accent="bg-indigo-600"
                    onUse={() => handleUseTemplate('feedback')}
                />

                {/* Contact Template */}
                <TemplateCard
                    title="Contact Us"
                    description="A clean, split-screen contact form ideal for agencies and portfolios."
                    category="Contact"
                    icon={<Users className="text-white" size={24} />}
                    gradient="from-zinc-800 to-black"
                    accent="bg-zinc-900"
                    onUse={() => handleUseTemplate('contact')}
                />

                {/* Registration Template */}
                <TemplateCard
                    title="Event Registration"
                    description="High-conversion registration flow with vibrant gradients and seamless UX."
                    category="Registration"
                    icon={<Zap className="text-white" size={24} />}
                    gradient="from-orange-500 to-rose-500"
                    accent="bg-orange-500"
                    onUse={() => handleUseTemplate('registration')}
                />

                {/* Coming Soon Placeholders */}
                <div className="group relative aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <LayoutTemplate className="text-slate-300 group-hover:text-slate-400 transition-colors" size={32} />
                    <span className="text-sm font-bold text-slate-400">More coming soon</span>
                </div>
            </div>
        </div>
    )
}

function TemplateCard({ title, description, category, icon, gradient, accent, onUse }: any) {
    return (
        <div className="spotlight-card group relative bg-white border border-slate-200 rounded-[2.5rem] p-2 flex flex-col hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
            {/* Template Preview Header */}
            <div className={`aspect-[16/10] w-full rounded-[2rem] bg-gradient-to-br ${gradient} p-8 flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute inset-0 bg-noise opacity-20" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 blur-3xl rounded-full translate-x-1/3 translate-y-1/3" />

                <div className="relative z-10 flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center shadow-lg">
                        {icon}
                    </div>
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md uppercase tracking-wider font-bold text-[10px] px-3">
                        {category}
                    </Badge>
                </div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">{title}</h3>
                </div>
            </div>

            {/* Content Actions */}
            <div className="p-6 flex flex-col flex-1 gap-6">
                <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto flex items-center gap-3">
                    <Button onClick={onUse} className={`flex-1 h-12 rounded-xl font-bold bg-white border-2 border-slate-100 text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all`}>
                        Use Template
                    </Button>
                    <Button variant="ghost" className="h-12 w-12 rounded-xl border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50">
                        <ArrowRight size={20} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
