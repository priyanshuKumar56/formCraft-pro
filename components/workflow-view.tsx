"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Workflow, Plus, ArrowRight, CheckCircle } from "lucide-react"

export function WorkflowView() {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Workflow Automation</h1>
          <p className="text-gray-600">Set up automated actions based on form submissions</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Workflow className="h-5 w-5 mr-2" />
                Form Submission Workflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-500 rounded-full">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Form Submitted</h3>
                    <p className="text-sm text-gray-600">Trigger when user submits the form</p>
                  </div>
                  <Badge variant="secondary">Trigger</Badge>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-500 rounded-full">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Send Email Notification</h3>
                    <p className="text-sm text-gray-600">Send confirmation email to user</p>
                  </div>
                  <Badge variant="outline">Action</Badge>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Action
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-2">Send Email</h3>
                  <p className="text-sm text-gray-600">Send automated emails to users or admins</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-2">Create Task</h3>
                  <p className="text-sm text-gray-600">Create tasks in project management tools</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-2">Update Database</h3>
                  <p className="text-sm text-gray-600">Store data in external databases</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-2">Send Webhook</h3>
                  <p className="text-sm text-gray-600">Send data to external APIs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
