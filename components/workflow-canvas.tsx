"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, CheckCircle, Settings, Plus } from "lucide-react"
import type { FormData } from "@/types/form"

interface WorkflowCanvasProps {
  formData: FormData
  onUpdateForm: (formData: FormData) => void
}

export function WorkflowCanvas({ formData, onUpdateForm }: WorkflowCanvasProps) {
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null)

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Form Workflow</h1>
          <p className="text-gray-600">Visualize and configure the flow between your form pages</p>
        </div>

        {/* Workflow Canvas */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[600px]">
          <div className="flex flex-col items-center space-y-8">
            {/* Start Node */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Play className="h-8 w-8 text-white" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">Start</span>
            </div>

            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90" />

            {/* Form Pages */}
            <div className="flex flex-col items-center space-y-6 w-full max-w-4xl">
              {formData.pages.map((page, index) => (
                <div key={page.id} className="flex flex-col items-center w-full">
                  <Card className="w-full max-w-md shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{page.title}</CardTitle>
                        <Badge variant={page.type === "welcome" ? "default" : "secondary"} className="text-xs">
                          {page.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Elements:</span>
                          <span className="font-medium">{page.elements.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Required fields:</span>
                          <span className="font-medium">{page.elements.filter((el) => el.required).length}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          Add Logic
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {index < formData.pages.length - 1 && (
                    <div className="my-4 flex flex-col items-center">
                      <ArrowRight className="h-6 w-6 text-gray-400 rotate-90" />
                      <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Next Page</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90" />

            {/* End Node */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">Submit</span>
            </div>
          </div>
        </div>

        {/* Workflow Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Conditional Logic</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">Show or hide pages based on user responses</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-1" />
                Add Condition
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Page Transitions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">Customize how users move between pages</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Validation Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">Set up validation for form submissions</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <CheckCircle className="h-4 w-4 mr-1" />
                Add Rules
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
