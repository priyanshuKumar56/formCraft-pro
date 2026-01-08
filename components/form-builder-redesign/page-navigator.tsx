"use client"

import { useState } from "react"
import type { FormPage } from "@/types/form"
import { Plus, X, AlertCircle } from "lucide-react"

interface PageNavigatorProps {
    pages: FormPage[]
    currentPageIndex: number
    onPageChange: (index: number) => void
    onAddPage?: () => void
    onDeletePage?: (index: number) => void
}

export function PageNavigator({
    pages,
    currentPageIndex,
    onPageChange,
    onAddPage,
    onDeletePage
}: PageNavigatorProps) {
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

    const handleDeleteClick = (index: number, e: React.MouseEvent) => {
        e.stopPropagation()
        if (pages.length <= 1) {
            // Can't delete the last page
            return
        }
        setDeleteConfirm(index)
    }

    const handleConfirmDelete = (index: number, e: React.MouseEvent) => {
        e.stopPropagation()
        onDeletePage?.(index)
        setDeleteConfirm(null)
    }

    const handleCancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        setDeleteConfirm(null)
    }

    return (
        <div className="flex items-center justify-center py-2 px-4 border-b border-slate-100 bg-white/50 backdrop-blur-md z-10 sticky top-0">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full no-scrollbar">
                {pages.map((page, index) => (
                    <div key={page.id} className="flex items-center">
                        {/* Connection Line (visual only) */}
                        {index > 0 && (
                            <div className="w-3 h-[1px] bg-slate-200 mx-0.5" />
                        )}

                        {/* Delete Confirmation Overlay */}
                        {deleteConfirm === index ? (
                            <div className="relative flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded-full shadow-sm">
                                <AlertCircle className="h-3 w-3 text-red-600" />
                                <span className="text-[9px] font-medium text-red-700 whitespace-nowrap">Delete?</span>
                                <button
                                    onClick={(e) => handleConfirmDelete(index, e)}
                                    className="px-1.5 py-0.5 bg-red-600 text-white text-[8px] font-bold rounded hover:bg-red-700 transition-colors"
                                >
                                    YES
                                </button>
                                <button
                                    onClick={handleCancelDelete}
                                    className="px-1.5 py-0.5 bg-slate-200 text-slate-700 text-[8px] font-bold rounded hover:bg-slate-300 transition-colors"
                                >
                                    NO
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => onPageChange(index)}
                                className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all ${index === currentPageIndex
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

                                {/* Delete Button - Only show if more than 1 page and on hover */}
                                {pages.length > 1 && onDeletePage && (
                                    <button
                                        onClick={(e) => handleDeleteClick(index, e)}
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow-sm"
                                        title="Delete page"
                                    >
                                        <X className="h-2.5 w-2.5" />
                                    </button>
                                )}

                                {/* Warning tooltip if trying to delete last page */}
                                {pages.length === 1 && (
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                        Can't delete last page
                                    </div>
                                )}
                            </button>
                        )}
                    </div>
                ))}

                {/* Add Page Button */}
                {onAddPage && (
                    <>
                        <div className="w-3 h-[1px] bg-slate-200 mx-0.5" />
                        <button
                            onClick={onAddPage}
                            className="group flex items-center gap-1 px-2 py-1 rounded-full border border-dashed border-slate-300 hover:border-violet-400 hover:bg-violet-50 transition-all"
                            title="Add new page"
                        >
                            <div className="w-4 h-4 rounded bg-slate-100 group-hover:bg-violet-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                                <Plus className="h-3 w-3" />
                            </div>
                            <span className="text-[10px] font-medium text-slate-400 group-hover:text-violet-700 transition-colors">
                                Add Page
                            </span>
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
