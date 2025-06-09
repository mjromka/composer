"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Mail,
  FileSpreadsheet,
  Megaphone,
  HeadphonesIcon,
  ArrowRight,
  Calendar,
  Clock,
  Edit3,
} from "lucide-react"
import Link from "next/link"

interface Template {
  id: string
  name: string
  description: string
  category: string
  lastModified: string
  status: string
  author: string
}

interface TemplateCardProps {
  template: Template
  workspaceId: string
}

const categoryIcons = {
  Email: Mail,
  Document: FileSpreadsheet,
  Marketing: Megaphone,
  Support: HeadphonesIcon,
}

const categoryColors = {
  Email: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800",
  Document: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800",
  Marketing:
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-800",
  Support:
    "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-800",
}

export function TemplateCard({ template, workspaceId }: TemplateCardProps) {
  const CategoryIcon = categoryIcons[template.category as keyof typeof categoryIcons] || FileText
  const categoryColor = categoryColors[template.category as keyof typeof categoryColors]

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return "Today"
    }
    if (diffInDays === 1) {
      return "Yesterday"
    }
    if (diffInDays < 7) {
      return `${diffInDays} days ago`
    }
    if (diffInDays < 30) {
      return `${Math.floor(diffInDays / 7)} weeks ago`
    }
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  return (
    <Link href={`/workspace/${workspaceId}/template/${template.id}`}>
      <Card className="group h-72 flex flex-col bg-white dark:bg-gray-900 border-0 shadow-md hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <CardHeader className="flex-shrink-0 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <CategoryIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {template.name}
                </CardTitle>
              </div>
            </div>
            <Badge
              variant={template.status === "published" ? "default" : "secondary"}
              className={`ml-2 flex-shrink-0 ${
                template.status === "published"
                  ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                  : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-1 ${
                  template.status === "published" ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
              {template.status}
            </Badge>
          </div>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {template.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-grow pt-0">
          {/* Category and Author */}
          <div className="space-y-3 mb-4">
            <Badge variant="outline" className={`w-fit ${categoryColor}`}>
              <CategoryIcon className="h-3 w-3 mr-1" />
              {template.category}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {template.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span>by {template.author}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{getRelativeTime(template.lastModified)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(template.lastModified)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-0 h-auto"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Handle quick edit
                }}
              >
                <Edit3 className="h-3 w-3 mr-1" />
                Quick Edit
              </Button>
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all duration-200">
                <span className="text-sm font-medium">Open</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
