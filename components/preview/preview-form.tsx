"use client"

import React from 'react'
import { useAppSelector } from '@/store/hooks'
import type { FormElement, FormPage, FormSection } from '@/types/form'

interface PreviewFormProps {
  formId?: string
  className?: string
}

export function PreviewForm({ formId, className = "" }: PreviewFormProps) {
  const { formData } = useAppSelector((state) => state.form)
  const { settings } = useAppSelector((state) => state.builder)

  // Get form data - either from Redux or from session storage (for preview)
  const getFormData = () => {
    if (formId) {
      // If formId is provided, fetch from API or Redux
      return formData
    }
    
    // Check session storage for preview data
    const previewData = sessionStorage.getItem('formcraft-preview-data')
    if (previewData) {
      return JSON.parse(previewData)
    }
    
    return formData
  }

  const currentFormData = getFormData()

  const renderElement = (element: FormElement) => {
    const baseClasses = "w-full transition-all duration-200"
    
    switch (element.type) {
      case 'heading':
        return (
          <h2 className={`${baseClasses} text-2xl font-bold text-gray-900 mb-4`}>
            {element.label}
          </h2>
        )
      
      case 'paragraph':
        return (
          <p className={`${baseClasses} text-gray-600 mb-6 leading-relaxed`}>
            {element.label}
          </p>
        )
      
      case 'text':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              placeholder={element.placeholder}
              required={element.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        )
      
      case 'email':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="email"
              placeholder={element.placeholder}
              required={element.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        )
      
      case 'textarea':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              placeholder={element.placeholder}
              required={element.required}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        )
      
      case 'select':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              required={element.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select an option</option>
              {element.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )
      
      case 'radio':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {element.options?.map((option, index) => (
                <label key={index} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`radio-${element.id}`}
                    value={option}
                    required={element.required}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )
      
      case 'checkbox':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {element.options?.map((option, index) => (
                <label key={index} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={`checkbox-${element.id}`}
                    value={option}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )
      
      case 'number':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="number"
              placeholder={element.placeholder}
              required={element.required}
              min={element.validation?.min}
              max={element.validation?.max}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        )
      
      case 'date':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="date"
              required={element.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        )
      
      case 'file':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="file"
              required={element.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        )
      
      case 'phone':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="tel"
              placeholder={element.placeholder}
              required={element.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        )
      
      case 'url':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="url"
              placeholder={element.placeholder}
              required={element.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        )
      
      case 'rating':
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        )
      
      case 'image':
        return (
          <div className="mb-6">
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Image placeholder</span>
            </div>
          </div>
        )
      
      case 'start-button':
        return (
          <div className="mb-6 text-center">
            <button
              type="button"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {element.label || 'Get Started'}
            </button>
          </div>
        )
      
      case 'submit-button':
        return (
          <div className="mb-6 text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              {element.label || 'Submit'}
            </button>
          </div>
        )
      
      default:
        return (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">Unknown element type: {element.type}</p>
          </div>
        )
    }
  }

  const renderSection = (section: FormSection) => {
    const sectionStyles: React.CSSProperties = {
      padding: `${section.layout.padding.top}px ${section.layout.padding.right}px ${section.layout.padding.bottom}px ${section.layout.padding.left}px`,
      margin: `${section.layout.margin.top}px ${section.layout.margin.right}px ${section.layout.margin.bottom}px ${section.layout.margin.left}px`,
      backgroundColor: section.layout.backgroundColor,
      borderRadius: `${section.layout.borderRadius}px`,
      borderWidth: `${section.layout.borderWidth}px`,
      borderColor: section.layout.borderColor,
      borderStyle: 'solid',
      display: section.layout.direction === 'row' ? 'flex' : 'block',
      gap: `${section.layout.gap}px`,
      alignItems: section.layout.alignment === 'center' ? 'center' : section.layout.alignment === 'right' ? 'flex-end' : 'flex-start',
    }

    // Add shadow if enabled
    if (section.layout.shadow?.enabled) {
      sectionStyles.boxShadow = `${section.layout.shadow.x}px ${section.layout.shadow.y}px ${section.layout.shadow.blur}px ${section.layout.shadow.spread}px ${section.layout.shadow.color}`
    }

    return (
      <div
        key={section.id}
        style={sectionStyles}
        className="transition-all duration-300"
      >
        {section.elements.map((element) => (
          <div key={element.id}>
            {renderElement(element)}
          </div>
        ))}
        {section.children.map((childSection) => (
          <div key={childSection.id}>
            {renderSection(childSection)}
          </div>
        ))}
      </div>
    )
  }

  const renderPage = (page: FormPage) => {
    const pageStyles: React.CSSProperties = {
      backgroundColor: page.layout.backgroundColor,
      borderRadius: `${page.layout.borderRadius}px`,
      borderWidth: `${page.layout.borderWidth}px`,
      borderColor: page.layout.borderColor,
      borderStyle: 'solid',
      padding: `${page.layout.padding.top}px ${page.layout.padding.right}px ${page.layout.padding.bottom}px ${page.layout.padding.left}px`,
      color: page.layout.textColor,
      maxWidth: page.layout.maxWidth === 'sm' ? '640px' : 
                page.layout.maxWidth === 'md' ? '768px' : 
                page.layout.maxWidth === 'lg' ? '1024px' : 
                page.layout.maxWidth === 'xl' ? '1280px' : '100%',
      margin: '0 auto',
    }

    // Add shadow if enabled
    if (page.layout.shadow?.enabled) {
      pageStyles.boxShadow = `${page.layout.shadow.x}px ${page.layout.shadow.y}px ${page.layout.shadow.blur}px ${page.layout.shadow.spread}px ${page.layout.shadow.color}`
    }

    // Add glassmorphism if enabled
    if (page.layout.glassmorphism?.enabled) {
      pageStyles.backdropFilter = `blur(${page.layout.glassmorphism.blur}px)`
      // Convert hex to rgba with opacity
      const hex = page.layout.backgroundColor.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      pageStyles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${page.layout.glassmorphism.opacity})`
    }

    return (
      <div style={pageStyles} className="transition-all duration-300">
        {page.sections.map((section) => (
          <div key={section.id}>
            {renderSection(section)}
          </div>
        ))}
      </div>
    )
  }

  if (!currentFormData || currentFormData.pages.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-gray-50 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Form Content</h3>
          <p className="text-gray-500">This form doesn't have any content yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${className}`}>
      {currentFormData.pages.map((page: FormPage, pageIndex: number) => (
        <div key={page.id} className="w-full">
          {renderPage(page)}
        </div>
      ))}
    </div>
  )
}
