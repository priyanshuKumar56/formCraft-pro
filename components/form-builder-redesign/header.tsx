"use client"

import { useState } from "react"
import type { FormData } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Eye,
    BarChart3,
    Sparkles,
    Workflow,
    Zap,
    Share2,
    Copy,
    Check,
    Globe,
    Lock,
    ChevronDown,
    Undo2,
    Redo2,
    HelpCircle,
    MoreHorizontal,
} from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { setPublished, unpublish } from "@/store/slices/publishSlice"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

interface ModernHeaderProps {
    formData: FormData
    onUpdateForm: (formData: FormData) => void
    onPreview: () => void
    activeTab: "create" | "workflow" | "connect" | "results"
    onTabChange: (tab: "create" | "workflow" | "connect" | "results") => void
}

export function ModernHeader({ formData, onUpdateForm, onPreview, activeTab, onTabChange }: ModernHeaderProps) {
    const dispatch = useAppDispatch()
    const { isPublished, shareableLink } = useAppSelector((state) => state.publish)
    const [isEditing, setIsEditing] = useState(false)
    const [tempTitle, setTempTitle] = useState(formData.title)
    const [copied, setCopied] = useState(false)

    const handleSaveTitle = () => {
        onUpdateForm({ ...formData, title: tempTitle })
        setIsEditing(false)
    }

    const handlePublish = () => {
        const link = `${window.location.origin}/form/${formData.id}`
        dispatch(setPublished({ isPublished: true, shareableLink: link }))
        toast({
            title: "Form Published!",
            description: "Your form is now live and can be shared with others.",
        })
    }

    const handleUnpublish = () => {
        dispatch(unpublish())
        toast({
            title: "Form Unpublished",
            description: "Your form is no longer publicly accessible.",
        })
    }

    const handleCopyLink = async () => {
        if (shareableLink) {
            await navigator.clipboard.writeText(shareableLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            toast({
                title: "Link Copied!",
                description: "The shareable link has been copied to your clipboard.",
            })
        }
    }

    const tabs = [
        { id: "create" as const, label: "Create", icon: Sparkles },
        { id: "workflow" as const, label: "Logic", icon: Workflow },
        { id: "connect" as const, label: "Integrations", icon: Zap },
        { id: "results" as const, label: "Responses", icon: BarChart3 },
    ]

    return (
        <header className="h-14 bg-white border-b border-slate-200/80 flex items-center px-4 gap-4 flex-shrink-0">
            {/* Left Section - Logo & Title */}
            <div className="flex items-center gap-3 min-w-0">
                <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-sm">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                </Link>

                <div className="h-6 w-px bg-slate-200" />

                {isEditing ? (
                    <Input
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        onBlur={handleSaveTitle}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveTitle()
                            if (e.key === "Escape") {
                                setTempTitle(formData.title)
                                setIsEditing(false)
                            }
                        }}
                        className="w-56 h-8 text-sm font-medium border-slate-200 focus:border-violet-500 focus:ring-violet-500/20"
                        autoFocus
                    />
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors group max-w-[200px]"
                    >
                        <span className="font-medium text-slate-900 truncate">{formData.title}</span>
                        <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 flex-shrink-0" />
                    </button>
                )}

                {/* Status Badge */}
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${isPublished
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                    : "bg-slate-100 text-slate-600"
                    }`}>
                    {isPublished ? (
                        <><Globe className="h-3 w-3" /> Live</>
                    ) : (
                        <><Lock className="h-3 w-3" /> Draft</>
                    )}
                </div>
            </div>

            {/* Center Section - Navigation Tabs */}
            <nav className="flex-1 flex items-center justify-center">
                <div className="flex items-center bg-slate-100/80 rounded-lg p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                                }`}
                        >
                            <tab.icon className="h-3.5 w-3.5" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2">
                {/* Undo/Redo */}
                <div className="flex items-center border-r border-slate-200 pr-2 mr-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700">
                        <Undo2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700">
                        <Redo2 className="h-4 w-4" />
                    </Button>
                </div>

                {/* Share Link */}
                {isPublished && shareableLink && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyLink}
                        className="h-8 gap-1.5 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                    >
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? "Copied!" : "Copy Link"}
                    </Button>
                )}

                {/* Preview */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onPreview}
                    className="h-8 gap-1.5 border-slate-200 hover:bg-slate-50"
                >
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                </Button>

                {/* Publish */}
                <Button
                    size="sm"
                    onClick={isPublished ? handleUnpublish : handlePublish}
                    className={`h-8 gap-1.5 ${isPublished
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-sm"
                        }`}
                >
                    <Share2 className="h-3.5 w-3.5" />
                    {isPublished ? "Unpublish" : "Publish"}
                </Button>

                {/* More Options */}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>

                {/* Help */}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700">
                    <HelpCircle className="h-4 w-4" />
                </Button>

                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-semibold">JD</span>
                </div>
            </div>
        </header>
    )
}
