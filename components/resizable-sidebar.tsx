"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ResizableSidebarProps {
  children: React.ReactNode
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  side?: "left" | "right"
  className?: string
}

export function ResizableSidebar({
  children,
  defaultWidth = 320,
  minWidth = 250,
  maxWidth = 500,
  side = "left",
  className,
}: ResizableSidebarProps) {
  const [width, setWidth] = useState(defaultWidth)
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !sidebarRef.current) return

      const rect = sidebarRef.current.getBoundingClientRect()
      let newWidth: number

      if (side === "left") {
        newWidth = e.clientX - rect.left
      } else {
        newWidth = rect.right - e.clientX
      }

      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, minWidth, maxWidth, side])

  const handleMouseDown = () => {
    setIsResizing(true)
  }

  return (
    <div ref={sidebarRef} className={cn("relative flex-shrink-0", className)} style={{ width: `${width}px` }}>
      {children}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 transition-colors group",
          side === "left" ? "right-0" : "left-0",
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute inset-y-0 -inset-x-1 group-hover:bg-blue-500/20" />
      </div>
    </div>
  )
}
