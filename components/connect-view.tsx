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

        {/* Custom API & Database Integration */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Storage & Custom Backend</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-violet-100 bg-violet-50/30 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4">
                <Badge className="bg-violet-600 text-white border-none px-3 py-1">Recommended</Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center text-violet-900">
                  <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-violet-200">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  Direct Database Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-violet-700/80 leading-relaxed font-medium">
                  Connect your form directly to your own MySQL, PostgreSQL, or MongoDB database to store user responses securely on your own infrastructure.
                </p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black tracking-widest text-violet-400">Database Endpoint</label>
                    <input
                      type="text"
                      placeholder="https://api.yourbackend.com/v1/store"
                      className="w-full h-11 bg-white border-2 border-violet-100 rounded-xl px-4 text-sm focus:border-violet-500 transition-all outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black tracking-widest text-violet-400">API Access Key</label>
                    <input
                      type="password"
                      placeholder="••••••••••••••••"
                      className="w-full h-11 bg-white border-2 border-violet-100 rounded-xl px-4 text-sm focus:border-violet-500 transition-all outline-none"
                    />
                  </div>
                </div>
                <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-12 rounded-xl shadow-lg shadow-violet-100 transition-all active:scale-95">
                  Establish Connection
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100 hover:border-violet-200 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </div>
                  Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Push your form data to external services in real-time. Supports JSON payloads, custom headers, and retry logic.
                </p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Webhooks (0)</span>
                    <Plus className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-center py-4 text-slate-300 text-xs italic font-medium">No webhooks configured yet.</p>
                </div>
                <Button variant="outline" className="w-full border-2 border-slate-900 rounded-xl font-black h-12 uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all">
                  Configure Webhook
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Custom Webhooks (Previous Version Removed) */}
      </div>
    </div>
  )
}
