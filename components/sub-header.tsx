"use client"

import { Button } from "@/components/ui/button"
import { Settings, Workflow, Zap } from "lucide-react"

interface SubHeaderProps {
  activeTab: "build" | "workflow" | "connect"
  onTabChange: (tab: "build" | "workflow" | "connect") => void
  onSettingsToggle: () => void
}

export function SubHeader({ activeTab, onTabChange, onSettingsToggle }: SubHeaderProps) {
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center space-x-1">
        <Button
          variant={activeTab === "build" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange("build")}
          className="text-sm"
        >
          Build
        </Button>
        <Button
          variant={activeTab === "workflow" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange("workflow")}
          className="text-sm"
        >
          <Workflow className="h-4 w-4 mr-1" />
          Workflow
        </Button>
        <Button
          variant={activeTab === "connect" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange("connect")}
          className="text-sm"
        >
          <Zap className="h-4 w-4 mr-1" />
          Connect
        </Button>
      </div>

      <Button variant="outline" size="sm" onClick={onSettingsToggle} className="text-sm bg-transparent">
        <Settings className="h-4 w-4 mr-1" />
        Settings
      </Button>
    </div>
  )
}
