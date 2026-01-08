"use client"

import type { FormPage } from "@/types/form"

interface PageNavigatorProps {
    pages: FormPage[]
    currentPageIndex: number
    onPageChange: (index: number) => void
}

export function PageNavigator({ pages, currentPageIndex, onPageChange }: PageNavigatorProps) {
    return (
        <div className="flex items-center justify-center py-2 px-4 border-b border-slate-100 bg-white/50 backdrop-blur-md z-10 sticky top-0">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full no-scrollbar">
                {pages.map((page, index) => (
                    <div key={page.id} className="flex items-center">
                        {/* Connection Line (visual only) */}
                        {index > 0 && (
                            <div className="w-3 h-[1px] bg-slate-200 mx-0.5" />
                        )}

                        <button
                            onClick={() => onPageChange(index)}
                            className={`group flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all ${index === currentPageIndex
                                ? "bg-white border-violet-200 shadow-sm ring-1 ring-violet-100"
                                : "bg-transparent border-transparent hover:bg-slate-100"
                                }`}
                        >
                            {/* Page Number Indicator */}
                            <span className={`w-4 h-4 rounded text-[9px] flex items-center justify-center font-bold ${index === currentPageIndex
                                ? "bg-violet-600 text-white"
                                : "bg-slate-200 text-slate-500 group-hover:bg-slate-300"
                                }`}>
                                {index + 1}
                            </span>

                            {/* Page Title */}
                            <span className={`text-[10px] font-medium max-w-[80px] truncate ${index === currentPageIndex ? "text-violet-900" : "text-slate-500 group-hover:text-slate-700"
                                }`}>
                                {page.title}
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
