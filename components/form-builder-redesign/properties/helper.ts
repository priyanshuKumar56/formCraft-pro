
import { ButtonStyle } from "@/types/form"

export const defaultButtonStyle: ButtonStyle = {
    paddingX: 24, paddingY: 12, fontSize: 14, fontWeight: "semibold",
    backgroundColor: "#0f172a", textColor: "#ffffff", borderColor: "#0f172a",
    borderWidth: 0, borderRadius: 8,
    shadow: { enabled: true, x: 0, y: 2, blur: 8, spread: 0, color: "rgba(0,0,0,0.12)" },
    preset: "default"
}

export const buttonPresets: { name: string; id: ButtonStyle['preset']; style: Partial<ButtonStyle> }[] = [
    { name: "Default", id: "default", style: { backgroundColor: "#0f172a", textColor: "#fff", borderRadius: 8, borderWidth: 0, fontWeight: "semibold", shadow: { enabled: true, x: 0, y: 2, blur: 8, spread: 0, color: "rgba(0,0,0,0.12)" } } },
    { name: "Rounded", id: "rounded", style: { backgroundColor: "#6366f1", textColor: "#fff", borderRadius: 12, borderWidth: 0, fontWeight: "medium", shadow: { enabled: true, x: 0, y: 3, blur: 12, spread: 0, color: "rgba(99,102,241,0.3)" } } },
    { name: "Pill", id: "pill", style: { backgroundColor: "#ec4899", textColor: "#fff", borderRadius: 999, borderWidth: 0, fontWeight: "semibold", shadow: { enabled: true, x: 0, y: 3, blur: 12, spread: 0, color: "rgba(236,72,153,0.3)" } } },
    { name: "Outline", id: "outline", style: { backgroundColor: "transparent", textColor: "#0f172a", borderRadius: 8, borderWidth: 2, borderColor: "#0f172a", fontWeight: "medium", shadow: { enabled: false, x: 0, y: 0, blur: 0, spread: 0, color: "transparent" } } },
    { name: "Gradient", id: "gradient", style: { backgroundColor: "#8b5cf6", textColor: "#fff", borderRadius: 10, borderWidth: 0, fontWeight: "semibold", shadow: { enabled: true, x: 0, y: 4, blur: 16, spread: 0, color: "rgba(139,92,246,0.4)" } } },
    { name: "Minimal", id: "minimal", style: { backgroundColor: "#f1f5f9", textColor: "#0f172a", borderRadius: 6, borderWidth: 0, fontWeight: "medium", shadow: { enabled: false, x: 0, y: 0, blur: 0, spread: 0, color: "transparent" } } },
]

export const colorPresets = [
    "#ffffff", "#f8fafc", "#f1f5f9", "#fafaf9",
    "#fff1f2", "#fdf2f8", "#fdf4ff", "#faf5ff", "#f5f3ff", "#eef2ff",
    "#eff6ff", "#ecfeff", "#f0fdfa", "#ecfdf5", "#f0fdf4", "#f7fee7",
    "#fefce8", "#fffbeb", "#fff7ed", "#fef2f2",
    "#0f172a", "#1f2937", "#1e3a5f", "#2e1065",
]

export const gradientPresets = [
    { name: "Sunset", colors: ["#ff7e5f", "#feb47b"], angle: 135 },
    { name: "Ocean", colors: ["#2193b0", "#6dd5ed"], angle: 135 },
    { name: "Purple", colors: ["#8e2de2", "#4a00e0"], angle: 135 },
    { name: "Pink", colors: ["#ee9ca7", "#ffdde1"], angle: 135 },
    { name: "Forest", colors: ["#11998e", "#38ef7d"], angle: 135 },
    { name: "Midnight", colors: ["#232526", "#414345"], angle: 180 },
    { name: "Sky", colors: ["#89f7fe", "#66a6ff"], angle: 135 },
    { name: "Peachy", colors: ["#ffecd2", "#fcb69f"], angle: 135 },
    { name: "Lavender", colors: ["#e0c3fc", "#8ec5fc"], angle: 135 },
]

export const meshPresets = [
    { name: "Candy", baseColor: "#fdf2f8" },
    { name: "Ocean", baseColor: "#ecfeff" },
    { name: "Sunset", baseColor: "#fff7ed" },
    { name: "Forest", baseColor: "#f0fdf4" },
    { name: "Lavender", baseColor: "#faf5ff" },
    { name: "Fire", baseColor: "#fef2f2" },
]
