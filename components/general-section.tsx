"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Copy, Archive, Trash2, Eye } from "lucide-react"
import { TemplateDetails } from "@/interfaces/template-details"
import { deleteTemplate } from "@/services/templates"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface GeneralSectionProps {
  template: TemplateDetails
}

export function GeneralSection({ template }: GeneralSectionProps) {
  const [templateData, setTemplateData] = useState(template || {})
  const { token } = useAuth()
  const router = useRouter()

  const handleDeleteTemplate = async () => {
    if (!token) {
      return
    }
    await deleteTemplate(token, parseInt(template.id))
    router.back()
  }

  return (
    <div className="space-y-6 p-8 h-full overflow-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">General Settings</h1>
        <p className="text-gray-600">Manage basic template information and perform actions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Template Settings</CardTitle>
            <CardDescription>Basic details about your template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={templateData.name}
                onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={templateData.description}
                onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={templateData.category}
                onValueChange={(value) => setTemplateData({ ...templateData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Document">Document</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={templateData.status}
                onValueChange={(value) => setTemplateData({ ...templateData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Template Actions</CardTitle>
            <CardDescription>Perform actions on your template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Button className="justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Preview Template
              </Button>
              <Button variant="outline" className="justify-start">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Template
              </Button>
              <Button variant="outline" className="justify-start">
                <Archive className="h-4 w-4 mr-2" />
                Archive Template
              </Button>
              <Button variant="destructive" className="justify-start" onClick={handleDeleteTemplate}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>Organize your template with tags</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {templateData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Input placeholder="Add new tag..." />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
