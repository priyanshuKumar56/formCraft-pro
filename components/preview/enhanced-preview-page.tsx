"use client"

import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { PreviewForm } from './preview-form'
import * as previewActions from '@/store/slices/previewSlice'

interface EnhancedPreviewPageProps {
  formId?: string
}

export function EnhancedPreviewPage({ formId }: EnhancedPreviewPageProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const { 
    previewDevice, 
    zoom, 
    isFullscreen: reduxFullscreen,
    showFormControls,
    theme,
    branding,
    behavior,
    currentPageIndex,
    totalPages,
    progress,
    showProgress,
    isSubmitting,
    submitSuccess,
    submitError,
    validationErrors
  } = useAppSelector((state) => state.preview)
  const { formData } = useAppSelector((state) => state.form)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    // Set form data from form slice when component mounts
    if (formData) {
      dispatch(previewActions.setPreviewFormData(formData))
    }
  }, [formData, dispatch])

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen)
    dispatch(previewActions.toggleFullscreen())
  }

  const handleDeviceChange = (device: 'mobile' | 'tablet' | 'desktop') => {
    dispatch(previewActions.setPreviewDevice(device))
  }

  const handleZoomIn = () => {
    dispatch(previewActions.setPreviewZoom(Math.min(zoom + 0.1, 2)))
  }

  const handleZoomOut = () => {
    dispatch(previewActions.setPreviewZoom(Math.max(zoom - 0.1, 0.25)))
  }

  const handleZoomReset = () => {
    dispatch(previewActions.setPreviewZoom(1))
  }

  const handleThemeChange = (themeUpdates: Partial<typeof theme>) => {
    dispatch(previewActions.setPreviewTheme(themeUpdates))
  }

  const handleBrandingChange = (brandingUpdates: Partial<typeof branding>) => {
    dispatch(previewActions.setPreviewBranding(brandingUpdates))
  }

  const handleBehaviorChange = (behaviorUpdates: Partial<typeof behavior>) => {
    dispatch(previewActions.setPreviewBehavior(behaviorUpdates))
  }

  const handlePageNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      dispatch(previewActions.nextPage())
    } else {
      dispatch(previewActions.previousPage())
    }
  }

  const handleFormSubmit = async (data: any) => {
    dispatch(previewActions.startSubmission())
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      dispatch(previewActions.submitSuccess(data))
      
      // Handle redirect if configured
      if (behavior.redirectOnSubmit && behavior.redirectUrl) {
        window.location.href = behavior.redirectUrl
      }
    } catch (error) {
      dispatch(previewActions.submitError('Failed to submit form'))
    }
  }

  const getPreviewContainerClass = () => {
    const baseClass = "transition-all duration-300"
    
    if (isFullscreen || reduxFullscreen) {
      return `${baseClass} fixed inset-0 z-50 bg-white`
    }
    
    switch (previewDevice) {
      case 'mobile':
        return `${baseClass} max-w-sm mx-auto`
      case 'tablet':
        return `${baseClass} max-w-2xl mx-auto`
      case 'desktop':
      default:
        return `${baseClass} max-w-6xl mx-auto`
    }
  }

  const getPreviewScale = () => {
    return {
      transform: `scale(${zoom})`,
      transformOrigin: 'top center',
    }
  }

  const getFormStyles = () => {
    return {
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      fontFamily: theme.fontFamily,
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" style={getFormStyles()}>
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Form Preview</h1>
            
            {/* Device Selector */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              {(['mobile', 'tablet', 'desktop'] as const).map((device) => (
                <button
                  key={device}
                  onClick={() => handleDeviceChange(device)}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    previewDevice === device 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {device.charAt(0).toUpperCase() + device.slice(1)}
                </button>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={handleZoomReset}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Theme Controls */}
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => handleThemeChange({ primaryColor: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer"
                title="Primary Color"
              />
              <select
                value={theme.fontFamily}
                onChange={(e) => handleThemeChange({ fontFamily: e.target.value })}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
              </select>
            </div>

            {/* Form Controls Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Controls:</span>
              <button
                onClick={() => dispatch(previewActions.setShowFormControls(!showFormControls))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showFormControls ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showFormControls ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={handleFullscreenToggle}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isFullscreen || reduxFullscreen ? (
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
            {(isFullscreen || reduxFullscreen) && (
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

      {/* Progress Bar */}
      {showProgress && totalPages > 1 && (
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Page {currentPageIndex + 1} of {totalPages}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: theme.primaryColor,
              }}
            />
          </div>
        </div>
      )}

      {/* Preview Content */}
      <div className="p-6">
        <div className={getPreviewContainerClass()}>
          <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={getPreviewScale()}>
            {/* Branding Header */}
            {branding.showLogo && (
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                {branding.logoUrl ? (
                  <img src={branding.logoUrl} alt="Logo" className="h-8" />
                ) : (
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                )}
                {branding.showTitle && (
                  <h2 className="text-lg font-semibold text-gray-900">
                    {branding.customTitle || 'Form Title'}
                  </h2>
                )}
              </div>
            )}

            {/* Form Content */}
            <div className="relative">
              <PreviewForm formId={formId} />

              {/* Page Navigation */}
              {showFormControls && totalPages > 1 && (
                <div className="flex justify-between p-4 border-t border-gray-200">
                  <button
                    onClick={() => handlePageNavigation('previous')}
                    disabled={currentPageIndex === 0}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageNavigation('next')}
                    disabled={currentPageIndex === totalPages - 1}
                    className="px-4 py-2 text-sm font-medium text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {currentPageIndex === totalPages - 1 ? 'Submit' : 'Next'}
                  </button>
                </div>
              )}

              {/* Submission Status */}
              {isSubmitting && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Submitting...</p>
                  </div>
                </div>
              )}

              {submitSuccess && (
                <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
                    <p className="text-gray-600">{behavior.thankYouMessage}</p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
                    <p className="text-gray-600">{submitError}</p>
                    <button
                      onClick={() => dispatch(previewActions.resetSubmission())}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Branding Footer */}
            {branding.showFooter && (
              <div className="p-4 border-t border-gray-200 text-center text-sm text-gray-600">
                {branding.customFooter || '© 2024 FormCraft. All rights reserved.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {(isFullscreen || reduxFullscreen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleFullscreenToggle} />
      )}
    </div>
  )
}
