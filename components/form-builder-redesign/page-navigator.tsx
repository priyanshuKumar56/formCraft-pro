"use client"

import type { FormPage } from "@/types/form"

interface PageNavigatorProps {
    pages: FormPage[]
    currentPageIndex: number
    onPageChange: (index: number) => void
}

export function PageNavigator({ pages, currentPageIndex, onPageChange }: PageNavigatorProps) {
    return (
        <div className="flex items-center justify-center py-3 px-4 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                {pages.map((page, index) => (
                    <button
                        key={page.id}
                        onClick={() => onPageChange(index)}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${index === currentPageIndex
                                ? "bg-violet-100 text-violet-700"
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                    >
                        {/* Page Number Indicator */}
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${index === currentPageIndex
                                ? "bg-violet-600 text-white"
                                : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                            }`}>
                            {index + 1}
                        </span>

                        {/* Page Title - Hidden on small screens */}
                        <span className="hidden sm:inline truncate max-w-[100px]">{page.title}</span>

                        {/* Connection Line */}
                        {index < pages.length - 1 && (
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-slate-200" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
