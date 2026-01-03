import type { FormSection } from "@/types/form"
import React from "react"

export const getSectionStyles = (section: FormSection): React.CSSProperties => {
  const { layout } = section
  let styles: React.CSSProperties = {
    padding: `${layout.padding.top}px ${layout.padding.right}px ${layout.padding.bottom}px ${layout.padding.left}px`,
    margin: `${layout.margin.top}px ${layout.margin.right}px ${layout.margin.bottom}px ${layout.margin.left}px`,
    borderRadius: `${layout.borderRadius}px`,
    borderWidth: `${layout.borderWidth}px`,
    borderColor: layout.borderColor,
    borderStyle: "solid",
    backgroundColor: layout.backgroundColor,
    display: "flex",
    flexDirection: layout.direction as any,
    gap: `${layout.gap}px`,
    transition: "all 0.3s ease",
  }

  // Gradient support
  if (layout.backgroundGradient?.enabled) {
    const { type, colors, angle } = layout.backgroundGradient
    if (type === "linear") {
      styles.background = `linear-gradient(${angle}deg, ${colors.join(", ")})`
    } else {
      styles.background = `radial-gradient(circle, ${colors.join(", ")})`
    }
  }

  // Glassmorphism support
  if (layout.glassmorphism?.enabled) {
    styles.backdropFilter = `blur(${layout.glassmorphism.blur}px)`
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }
    const rgb = hexToRgb(layout.backgroundColor)
    if (rgb) {
      styles.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layout.glassmorphism.opacity})`
    }
  }

  // Shadow support
  if (layout.shadow?.enabled) {
    const { x, y, blur, spread, color } = layout.shadow
    styles.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`
  }

  return styles
}

export const getCanvasStyles = (layout: any): React.CSSProperties => {
  let styles: React.CSSProperties = {
    backgroundColor: layout.canvasBackground,
    transition: "all 0.3s ease",
  }

  if (layout.canvasGradient?.enabled) {
    const { type, colors, angle } = layout.canvasGradient
    styles.background = type === "linear" 
      ? `linear-gradient(${angle}deg, ${colors.join(", ")})`
      : `radial-gradient(circle, ${colors.join(", ")})`
  }

  return styles
}

export const getCardStyles = (layout: any): React.CSSProperties => {
  let styles: React.CSSProperties = {
    backgroundColor: layout.backgroundColor,
    borderRadius: `${layout.borderRadius}px`,
    borderWidth: `${layout.borderWidth}px`,
    borderColor: layout.borderColor,
    padding: `${layout.padding.top}px ${layout.padding.right}px ${layout.padding.bottom}px ${layout.padding.left}px`,
    color: layout.textColor,
    transition: "all 0.3s ease",
  }

  if (layout.backgroundGradient?.enabled) {
    const { type, colors, angle } = layout.backgroundGradient
    styles.background = type === "linear"
      ? `linear-gradient(${angle}deg, ${colors.join(", ")})`
      : `radial-gradient(circle, ${colors.join(", ")})`
  }

  if (layout.shadow?.enabled) {
    const { x, y, blur, spread, color } = layout.shadow
    styles.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`
  }

  const maxWidthMap: any = {
    sm: "640px", md: "768px", lg: "1024px", xl: "1280px", full: "100%",
    custom: layout.customMaxWidth || "768px",
  }
  styles.maxWidth = maxWidthMap[layout.maxWidth]

  return styles
}

