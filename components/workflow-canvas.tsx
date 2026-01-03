"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, CheckCircle, Settings, Plus, Sparkles, MousePointer2, GitBranch, Zap } from "lucide-react"
import type { FormData } from "@/types/form"

interface WorkflowCanvasProps {
  formData: FormData
  onUpdateForm: (formData: FormData) => void
}

export function WorkflowCanvas({ formData, onUpdateForm }: WorkflowCanvasProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  return (
    <div className="flex-1 bg-slate-50/50 overflow-hidden flex flex-col">
      {/* Visual Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Workflow Designer</h1>
            <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100 border-none text-[10px] font-black uppercase">Beta</Badge>
          </div>
          <p className="text-sm text-slate-400 font-medium">Design the logical flow and transitions between your form pages.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="font-bold text-slate-400 text-xs uppercase tracking-widest">Auto Layout</Button>
          <Button className="bg-slate-900 text-white font-black px-6 rounded-xl text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">
            <Zap className="h-4 w-4 mr-2" /> Publish Logic
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-12 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]">
        <div className="flex items-center gap-12 min-w-max h-full">

          {/* Entry Point */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-200 border-4 border-white">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Entry</span>
          </div>

          <div className="w-16 h-[2px] bg-slate-200" />

          {/* Form Pages Flow */}
          {formData.pages.map((page, index) => (
            <div key={page.id} className="flex items-center gap-6">
              <div
                onClick={() => setSelectedNode(page.id)}
                className={`group relative transition-all duration-500 cursor-pointer ${selectedNode === page.id ? "scale-105" : "hover:scale-[1.02]"}`}
              >
                {selectedNode === page.id && (
                  <div className="absolute -inset-1 bg-violet-500 rounded-[2.5rem] blur-xl opacity-20 animate-pulse" />
                )}
                <Card className={`w-80 rounded-[2rem] shadow-2xl border-2 transition-all overflow-hidden ${selectedNode === page.id ? "border-violet-600" : "border-white hover:border-slate-200"}`}>
                  <div className={`h-2 w-full ${page.type === "welcome" ? "bg-emerald-500" : page.type === "ending" ? "bg-slate-900" : "bg-violet-600"}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {index + 1}</span>
                      <Badge variant="outline" className="text-[8px] font-black bg-slate-50 border-slate-200 rounded-md">
                        {page.type.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-black text-slate-900 leading-tight">{page.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 p-3 bg-slate-50 rounded-2xl">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Inputs</span>
                        <span className="text-lg font-black text-slate-900">{page.sections.reduce((acc, s) => acc + s.elements.length, 0)}</span>
                      </div>
                      <div className="flex-1 p-3 bg-slate-50 rounded-2xl">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Active</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 hover:bg-slate-50 transition-all">Edit Page</Button>
                      <Button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center p-0 transition-all hover:bg-violet-600">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Logic Connector */}
              {index < formData.pages.length - 1 && (
                <div className="relative group/connector h-full flex flex-col justify-center items-center px-4">
                  <div className="w-24 h-0.5 bg-slate-200 group-hover/connector:bg-violet-400 transition-colors" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <div className="w-12 h-12 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center shadow-md group-hover/connector:border-violet-500 group-hover/connector:-translate-y-1 transition-all cursor-crosshair">
                      <GitBranch className="h-5 w-5 text-slate-400 group-hover/connector:text-violet-600" />
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-400 whitespace-nowrap opacity-0 group-hover/connector:opacity-100 transition-all uppercase tracking-widest">Add Logic</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="w-24 h-0.5 bg-slate-200" />

          {/* Success Node */}
          <div className="flex flex-col items-center gap-4 pr-12">
            <div className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-300 border-4 border-white transition-transform hover:rotate-12 cursor-pointer">
              <CheckCircle className="h-8 w-8 text-white fill-white/10" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Submission</span>
          </div>

          {/* Plus Add Page Floating */}
          <button className="w-16 h-16 bg-white border-2 border-dashed border-slate-300 text-slate-300 rounded-[2rem] flex items-center justify-center hover:border-violet-500 hover:text-violet-500 hover:bg-violet-50 transition-all group scale-90 hover:scale-100">
            <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* Logic Sidebar (Mockup) */}
      {selectedNode && (
        <div className="absolute top-0 right-0 w-80 h-full bg-white border-l border-slate-200 shadow-2xl z-50 animate-in slide-in-from-right duration-300 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Node Properties</h2>
            <Button variant="ghost" size="sm" onClick={() => setSelectedNode(null)} className="font-black text-xs">Close</Button>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic Rules</label>
              <div className="p-4 bg-violet-50 border-2 border-violet-100 rounded-2xl text-violet-700 text-center text-xs font-bold leading-relaxed">
                Page visibility and transition rules are coming soon to the Logic Designer.
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Redirect URL (Beta)</label>
              <input type="text" placeholder="https://..." className="w-full h-11 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 text-xs font-mono outline-none focus:border-violet-500 transition-all" />
            </div>

            <div className="p-6 bg-slate-900 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-5 w-5 text-violet-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Flow Generator</span>
              </div>
              <p className="text-slate-400 text-xs font-medium leading-relaxed mb-4">Let our AI analyze your form content and suggest the most effective page order for maximum conversions.</p>
              <Button className="w-full bg-violet-600 text-white font-black rounded-xl h-10 text-[10px] uppercase tracking-widest hover:bg-violet-700 transition-all">Analyze Flow</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
