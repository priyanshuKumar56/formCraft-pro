"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    X,
    Copy,
    Check,
    Code,
    Link2,
    Mail,
    QrCode,
    Smartphone,
    Monitor,
    ExternalLink,
    Download,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ShareEmbedModalProps {
    isOpen: boolean
    onClose: () => void
    formId: string
    formTitle: string
    shareableLink: string | null
}

export function ShareEmbedModal({
    isOpen,
    onClose,
    formId,
    formTitle,
    shareableLink,
}: ShareEmbedModalProps) {
    const [copied, setCopied] = useState<string | null>(null)
    const [embedWidth, setEmbedWidth] = useState("100%")
    const [embedHeight, setEmbedHeight] = useState("600")
    const [showBorder, setShowBorder] = useState(true)
    const [transparentBg, setTransparentBg] = useState(false)

    if (!isOpen) return null

    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const formUrl = shareableLink || `${baseUrl}/form/${formId}`
    const previewUrl = `${baseUrl}/preview?id=${formId}`

    // Generate embed codes
    const iframeCode = `<iframe 
  src="${formUrl}"
  width="${embedWidth}"
  height="${embedHeight}px"
  frameborder="${showBorder ? '1' : '0'}"
  style="border: ${showBorder ? '1px solid #e2e8f0' : 'none'}; border-radius: 12px;${transparentBg ? ' background: transparent;' : ''}"
  title="${formTitle}"
  allow="clipboard-write"
></iframe>`

    const scriptEmbedCode = `<div id="formcraft-${formId}"></div>
<script src="${baseUrl}/embed.js" data-form-id="${formId}"></script>`

    const reactCode = `import { FormCraftEmbed } from '@formcraft/react';

export default function MyComponent() {
  return (
    <FormCraftEmbed
      formId="${formId}"
      width="${embedWidth}"
      height="${embedHeight}px"
    />
  );
}`

    const handleCopy = async (text: string, type: string) => {
        await navigator.clipboard.writeText(text)
        setCopied(type)
        setTimeout(() => setCopied(null), 2000)
        toast({
            title: "Copied!",
            description: `${type} code has been copied to your clipboard.`,
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-violet-100 rounded-lg">
                            <Code className="h-5 w-5 text-violet-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Share & Embed</h2>
                            <p className="text-sm text-slate-500">{formTitle}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <Tabs defaultValue="link" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-6">
                            <TabsTrigger value="link" className="gap-1.5">
                                <Link2 className="h-4 w-4" />
                                Link
                            </TabsTrigger>
                            <TabsTrigger value="embed" className="gap-1.5">
                                <Code className="h-4 w-4" />
                                Embed
                            </TabsTrigger>
                            <TabsTrigger value="email" className="gap-1.5">
                                <Mail className="h-4 w-4" />
                                Email
                            </TabsTrigger>
                            <TabsTrigger value="qr" className="gap-1.5">
                                <QrCode className="h-4 w-4" />
                                QR Code
                            </TabsTrigger>
                        </TabsList>

                        {/* Link Tab */}
                        <TabsContent value="link" className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <Label className="text-xs font-medium text-slate-600 mb-2 block">
                                    Shareable Link
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={formUrl}
                                        readOnly
                                        className="flex-1 bg-white text-sm"
                                    />
                                    <Button
                                        onClick={() => handleCopy(formUrl, "Link")}
                                        className="gap-1.5 bg-violet-600 hover:bg-violet-700"
                                    >
                                        {copied === "Link" ? (
                                            <><Check className="h-4 w-4" /> Copied</>
                                        ) : (
                                            <><Copy className="h-4 w-4" /> Copy</>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href={formUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    <ExternalLink className="h-5 w-5 text-slate-500" />
                                    <span className="text-sm font-medium text-slate-700">Open in new tab</span>
                                </a>
                                <a
                                    href={previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    <Monitor className="h-5 w-5 text-slate-500" />
                                    <span className="text-sm font-medium text-slate-700">Preview form</span>
                                </a>
                            </div>
                        </TabsContent>

                        {/* Embed Tab */}
                        <TabsContent value="embed" className="space-y-6">
                            {/* Embed Options */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs font-medium text-slate-600 mb-2 block">Width</Label>
                                    <Select value={embedWidth} onValueChange={setEmbedWidth}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="100%">Full Width (100%)</SelectItem>
                                            <SelectItem value="600px">600px</SelectItem>
                                            <SelectItem value="800px">800px</SelectItem>
                                            <SelectItem value="1000px">1000px</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-xs font-medium text-slate-600 mb-2 block">Height</Label>
                                    <Select value={embedHeight} onValueChange={setEmbedHeight}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="400">400px</SelectItem>
                                            <SelectItem value="600">600px</SelectItem>
                                            <SelectItem value="800">800px</SelectItem>
                                            <SelectItem value="auto">Auto</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <Switch checked={showBorder} onCheckedChange={setShowBorder} />
                                    <Label className="text-sm text-slate-600">Show border</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Switch checked={transparentBg} onCheckedChange={setTransparentBg} />
                                    <Label className="text-sm text-slate-600">Transparent background</Label>
                                </div>
                            </div>

                            {/* Code Snippets */}
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Label className="text-xs font-medium text-slate-600">HTML Embed (iframe)</Label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleCopy(iframeCode, "iframe")}
                                            className="h-7 text-xs"
                                        >
                                            {copied === "iframe" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                            Copy
                                        </Button>
                                    </div>
                                    <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
                                        <code>{iframeCode}</code>
                                    </pre>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Label className="text-xs font-medium text-slate-600">Script Embed (Recommended)</Label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleCopy(scriptEmbedCode, "script")}
                                            className="h-7 text-xs"
                                        >
                                            {copied === "script" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                            Copy
                                        </Button>
                                    </div>
                                    <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
                                        <code>{scriptEmbedCode}</code>
                                    </pre>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Label className="text-xs font-medium text-slate-600">React Component</Label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleCopy(reactCode, "react")}
                                            className="h-7 text-xs"
                                        >
                                            {copied === "react" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                            Copy
                                        </Button>
                                    </div>
                                    <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
                                        <code>{reactCode}</code>
                                    </pre>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Email Tab */}
                        <TabsContent value="email" className="space-y-4">
                            <div className="p-6 bg-slate-50 rounded-xl text-center">
                                <Mail className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Share via Email</h3>
                                <p className="text-sm text-slate-500 mb-4">
                                    Send your form link directly to recipients via email
                                </p>
                                <a
                                    href={`mailto:?subject=Fill out: ${encodeURIComponent(formTitle)}&body=${encodeURIComponent(`Please fill out this form: ${formUrl}`)}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    Open Email Client
                                </a>
                            </div>
                        </TabsContent>

                        {/* QR Code Tab */}
                        <TabsContent value="qr" className="space-y-4">
                            <div className="p-6 bg-slate-50 rounded-xl text-center">
                                <div className="w-48 h-48 bg-white border border-slate-200 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                    <div className="text-slate-400">
                                        <QrCode className="h-32 w-32" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">QR Code</h3>
                                <p className="text-sm text-slate-500 mb-4">
                                    Scan this code to open the form on mobile devices
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <Button variant="outline" className="gap-1.5">
                                        <Download className="h-4 w-4" />
                                        Download PNG
                                    </Button>
                                    <Button variant="outline" className="gap-1.5">
                                        <Download className="h-4 w-4" />
                                        Download SVG
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
