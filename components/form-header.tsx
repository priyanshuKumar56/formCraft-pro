"use client"

import { useState } from "react"
import type { FormData } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, BarChart3, Settings, Sparkles, Workflow, Zap, Share2, Copy, Check, Globe, Lock } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { publishForm, unpublishForm } from "@/store/slices/formSlice"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

interface FormHeaderProps {
  formData: FormData
  onUpdateForm: (formData: FormData) => void
  onPreview: () => void
  activeTab: "create" | "workflow" | "connect" | "results"
  onTabChange: (tab: "create" | "workflow" | "connect" | "results") => void
}

export function FormHeader({ formData, onUpdateForm, onPreview, activeTab, onTabChange }: FormHeaderProps) {
  const dispatch = useAppDispatch()
  const { isPublished, shareableLink } = useAppSelector((state) => state.form)
  const [isEditing, setIsEditing] = useState(false)
  const [tempTitle, setTempTitle] = useState(formData.title)
  const [copied, setCopied] = useState(false)

  const handleSaveTitle = () => {
    onUpdateForm({ ...formData, title: tempTitle })
    setIsEditing(false)
  }

  const handlePublish = () => {
    dispatch(publishForm())
    toast({
      title: "Form Published!",
      description: "Your form is now live and can be shared with others.",
    })
  }

  const handleUnpublish = () => {
    dispatch(unpublishForm())
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

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
           {/* <Link href="/" className="flex items-center space-x-2"> */}
                <Image
                  src="/fs-logo.jpg"
                  alt="FormCraft Pro Logo"
                  width={52}
                  height={52}
                  className="rounded-full"/>
            <span className="text-sm text-gray-600">My workspace</span>
            <span className="text-gray-400">&gt;</span>
          </div>

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
              className="w-64 h-8 text-sm font-medium"
              autoFocus
            />
          ) : (
            <div
              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              onClick={() => setIsEditing(true)}
            >
              <span className="font-medium text-gray-900">{formData.title}</span>
            </div>
          )}

          {/* Status Badge */}
          <Badge variant={isPublished ? "default" : "secondary"} className="text-xs">
            {isPublished ? (
              <>
                <Globe className="h-3 w-3 mr-1" />
                Published
              </>
            ) : (
              <>
                <Lock className="h-3 w-3 mr-1" />
                Draft
              </>
            )}
          </Badge>
        </div>

        {/* Center Navigation */}
        <div className="flex items-center space-x-1">
          <Button
            variant={activeTab === "create" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("create")}
            className={`text-sm ${
              activeTab === "create" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Create
          </Button>
          <Button
            variant={activeTab === "workflow" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("workflow")}
            className={`text-sm ${
              activeTab === "workflow"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Workflow className="h-4 w-4 mr-1" />
            Workflow
          </Button>
          <Button
            variant={activeTab === "connect" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("connect")}
            className={`text-sm ${
              activeTab === "connect" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Zap className="h-4 w-4 mr-1" />
            Connect
          </Button>
          <Button
            variant={activeTab === "results" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("results")}
            className={`text-sm ${
              activeTab === "results" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Results
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Share Controls */}
          {isPublished && shareableLink && (
            <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                className="text-green-700 hover:text-green-800 h-7 px-2"
              >
                {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            className="text-sm bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>

          <Button
            variant={isPublished ? "outline" : "default"}
            size="sm"
            onClick={isPublished ? handleUnpublish : handlePublish}
            className={`text-sm ${
              isPublished ? "text-gray-600 hover:text-gray-800" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            <Share2 className="h-4 w-4 mr-1" />
            {isPublished ? "Unpublish" : "Publish"}
          </Button>

          <Button variant="ghost" size="sm" className="text-sm">
            <Settings className="h-4 w-4" />
          </Button>

          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
        </div>
      </div>
    </div>
  )
}
