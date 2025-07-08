"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Zap, ExternalLink, Plus, CheckCircle, Settings } from "lucide-react"

const integrations = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Send form responses directly to Google Sheets",
    icon: "📊",
    category: "Spreadsheets",
    connected: true,
    popular: true,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get instant notifications in your Slack workspace",
    icon: "💬",
    category: "Communication",
    connected: true,
    popular: true,
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Add subscribers to your mailing lists automatically",
    icon: "📧",
    category: "Email Marketing",
    connected: false,
    popular: true,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect to 5000+ apps with automated workflows",
    icon: "⚡",
    category: "Automation",
    connected: false,
    popular: true,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Create database entries in your Notion workspace",
    icon: "📝",
    category: "Productivity",
    connected: false,
    popular: false,
  },
  {
    id: "airtable",
    name: "Airtable",
    description: "Store responses in your Airtable bases",
    icon: "🗃️",
    category: "Database",
    connected: false,
    popular: false,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Create contacts and deals in your CRM",
    icon: "🎯",
    category: "CRM",
    connected: false,
    popular: false,
  },
  {
    id: "discord",
    name: "Discord",
    description: "Send notifications to Discord channels",
    icon: "🎮",
    category: "Communication",
    connected: false,
    popular: false,
  },
]

export function ConnectView() {
  const connectedIntegrations = integrations.filter((integration) => integration.connected)
  const availableIntegrations = integrations.filter((integration) => !integration.connected)
  const popularIntegrations = availableIntegrations.filter((integration) => integration.popular)
  const otherIntegrations = availableIntegrations.filter((integration) => !integration.popular)

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connect & Integrate</h1>
          <p className="text-gray-600">Connect your forms to your favorite tools and automate your workflow</p>
        </div>

        {/* Connected Integrations */}
        {connectedIntegrations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Integrations</h2>
            <div className="grid gap-4">
              {connectedIntegrations.map((integration) => (
                <Card key={integration.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{integration.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                          <Badge variant="outline" className="mt-1 bg-green-100 text-green-700 border-green-300">
                            {integration.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Connected</span>
                        </div>
                        <Switch defaultChecked />
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Popular Integrations */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{integration.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                        <Badge variant="secondary" className="mt-1">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Integrations */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">More Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{integration.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{integration.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Webhooks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Custom Webhooks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Send form data to any URL endpoint when a form is submitted. Perfect for custom integrations and
                advanced workflows.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
                <Button variant="outline">View Documentation</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
