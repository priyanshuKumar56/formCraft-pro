
import React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Layers, Monitor, CheckCircle2 } from "lucide-react"

export function SettingsTab() {
    return (
        <div className="space-y-4">
            <div className="space-y-3">
                <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-md border border-slate-100">
                    <Layers className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Form Behavior</span>
                </div>
                <div className="space-y-2">
                    {[
                        { label: "Progress Bar", desc: "Show completion status", default: true },
                        { label: "Question Numbers", desc: "Display 1, 2, 3...", default: true },
                        { label: "Allow Back Navigation", desc: "Let users review answers", default: true },
                        { label: "Auto-save Responses", desc: "Save progress locally", default: false },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-md border border-slate-100 hover:border-slate-200 transition-all">
                            <div><Label className="text-[10px] font-medium text-slate-700">{item.label}</Label><p className="text-[9px] text-slate-400">{item.desc}</p></div>
                            <Switch className="scale-75 origin-right" defaultChecked={item.default} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-md border border-slate-100">
                    <Monitor className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Display Settings</span>
                </div>
                <div className="space-y-1.5">
                    <Label className="text-[10px] font-medium text-slate-700">Responsiveness</Label>
                    <div className="flex gap-2 text-[10px] text-slate-500 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        Your form automatically adapts to Mobile, Tablet, and Desktop screens.
                    </div>
                </div>
            </div>
        </div>
    )
}
