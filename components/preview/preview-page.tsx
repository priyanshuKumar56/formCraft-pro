"use client"

import React from 'react'
import { PreviewForm } from './preview-form'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setDevice, setZoom, togglePreviewMode } from '@/store/slices/builderSlice'

interface PreviewPageProps {
  formId?: string
}

export function PreviewPage({ formId }: PreviewPageProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const { settings } = useAppSelector((state) => state.builder)
  const dispatch = useAppDispatch()

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleDeviceChange = (device: 'mobile' | 'tablet' | 'desktop') => {
    dispatch(setDevice(device))
  }

  const handleZoomIn = () => {
    dispatch(setZoom(Math.min(settings.zoom + 0.1, 2)))
  }

  const handleZoomOut = () => {
    dispatch(setZoom(Math.max(settings.zoom - 0.1, 0.25)))
  }

  const handleZoomReset = () => {
    dispatch(setZoom(1))
  }

  const handlePreviewModeToggle = () => {
    dispatch(togglePreviewMode())
  }

  const getPreviewContainerClass = () => {
    if (isFullscreen) {
      return 'fixed inset-0 z-50 bg-white'
    }
    
    switch (settings.device) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      case 'desktop':
      default:
        return 'max-w-6xl mx-auto'
    }
  }

  const getPreviewScale = () => {
    return {
      transform: `scale(${settings.zoom})`,
      transformOrigin: 'top center',
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Form Preview</h1>
            
            {/* Device Selector */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {/* Handle device change */}}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  settings.device === 'mobile' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => {/* Handle device change */}}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  settings.device === 'tablet' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tablet
              </button>
              <button
                onClick={() => {/* Handle device change */}}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  settings.device === 'desktop' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Desktop
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {/* Handle zoom out */}}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center">
                {Math.round(settings.zoom * 100)}%
              </span>
              <button
                onClick={() => {/* Handle zoom in */}}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={() => {/* Handle zoom reset */}}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Preview Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Preview Mode:</span>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.previewMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.previewMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={handleFullscreenToggle}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>

            {/* Close Button (only in fullscreen) */}
            {isFullscreen && (
              <button
                onClick={handleFullscreenToggle}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Close Preview
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6">
        <div className={getPreviewContainerClass()}>
          <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={getPreviewScale()}>
            <PreviewForm formId={formId} />
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleFullscreenToggle} />
      )}
    </div>
  )
}
