"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, FileText, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"

interface Workspace {
  id: string
  name: string
  description: string
  templateCount: number
  memberCount: number
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

interface WorkspaceCardProps {
  workspace: Workspace
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Link href={`/workspace/${workspace.id}`}>
      <Card className="group h-64 flex flex-col bg-white dark:bg-gray-900 border-0 shadow-md hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        {/* Status indicator bar */}
        <div
          className={`h-1 w-full ${
            workspace.status === "active"
              ? "bg-gradient-to-r from-green-400 to-emerald-500"
              : "bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"
          }`}
        />

        <CardHeader className="flex-shrink-0 pb-3 pt-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  workspace.status === "active"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                }`}
              >
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                  {workspace.name}
                </CardTitle>
              </div>
            </div>
            <Badge
              variant={workspace.status === "active" ? "default" : "secondary"}
              className={`ml-2 flex-shrink-0 ${
                workspace.status === "active"
                  ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                  : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-1 ${
                  workspace.status === "active" ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              {workspace.status}
            </Badge>
          </div>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {workspace.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-grow pt-0">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FileText className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{workspace.templateCount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Templates</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Users className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{workspace.memberCount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Members</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Activity className="h-3 w-3" />
              <span>Updated {formatDate(workspace.updatedAt)}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all duration-200">
              <span className="text-sm font-medium">Open</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
