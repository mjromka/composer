"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Eye, Save, Undo, Redo } from "lucide-react"

interface BuilderSectionProps {
  templateId: string
}

export function BuilderSection({ templateId }: BuilderSectionProps) {
  const [jsonData, setJsonData] = useState(`{
  "template": {
    "type": "email",
    "subject": "Welcome to our platform!",
    "content": {
      "header": {
        "logo": "{{company.logo}}",
        "title": "Welcome {{user.firstName}}!"
      },
      "body": {
        "sections": [
          {
            "type": "text",
            "content": "Thank you for joining our platform. We're excited to have you on board!"
          },
          {
            "type": "button",
            "text": "Get Started",
            "url": "{{app.baseUrl}}/onboarding",
            "style": "primary"
          },
          {
            "type": "text",
            "content": "If you have any questions, feel free to reach out to our support team."
          }
        ]
      },
      "footer": {
        "company": "{{company.name}}",
        "address": "{{company.address}}",
        "unsubscribe": "{{unsubscribe.url}}"
      }
    },
    "variables": [
      "user.firstName",
      "company.logo",
      "company.name",
      "company.address",
      "app.baseUrl",
      "unsubscribe.url"
    ]
  }
}`)

  const [activeTab, setActiveTab] = useState("editor")

  const variables = [
    "user.firstName",
    "user.lastName",
    "user.email",
    "company.name",
    "company.logo",
    "company.address",
    "app.baseUrl",
    "unsubscribe.url",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Template Builder</h1>
        <p className="text-gray-600">Edit your template structure and content using JSON</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Undo className="h-4 w-4 mr-2" />
            Undo
          </Button>
          <Button variant="outline" size="sm">
            <Redo className="h-4 w-4 mr-2" />
            Redo
          </Button>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            JSON Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Template JSON</CardTitle>
                  <CardDescription>Edit your template structure directly</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                    className="font-mono text-sm min-h-[500px]"
                    placeholder="Enter your template JSON..."
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Available Variables</CardTitle>
                  <CardDescription>Click to insert into template</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {variables.map((variable, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-100 w-full justify-start"
                        onClick={() => {
                          const cursorPos = document.querySelector("textarea")?.selectionStart || 0
                          const newValue = jsonData.slice(0, cursorPos) + `{{${variable}}}` + jsonData.slice(cursorPos)
                          setJsonData(newValue)
                        }}
                      >
                        {`{{${variable}}}`}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>See how your template will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-white">
                <div className="text-center mb-6">
                  <img src="/placeholder.svg?height=60&width=200" alt="Company Logo" className="mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-gray-900">Welcome John!</h1>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Thank you for joining our platform. We're excited to have you on board!
                  </p>
                  <div className="text-center">
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </div>
                  <p className="text-gray-700">
                    If you have any questions, feel free to reach out to our support team.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
                  <p>Company Name</p>
                  <p>123 Business Street, City, State 12345</p>
                  <p className="mt-2">
                    <a href="#" className="text-blue-600 hover:underline">
                      Unsubscribe
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
