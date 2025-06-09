"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Activity } from "lucide-react"
import Link from "next/link"
import { Workspace } from "@/interfaces"
import { useWorkspaceStore } from "@/store/workspaceStore"
import Image from "next/image"

interface WorkspaceCardProps {
  workspace: Workspace
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const { setSelectedWorkspace } = useWorkspaceStore()
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }
  const handleClick = () => {
    setSelectedWorkspace(workspace)
  }

  return (
    <Link href={`/workspace/${workspace.id}`} onClick={handleClick}>
      <Card className="group h-full flex flex-col bg-white dark:bg-gray-900 border-0 shadow-md hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <CardHeader className="flex-shrink-0 pb-3 pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <Image
                  width={32}
                  height={32}
                  src={workspace.imagePath}
                  alt={workspace.name}
                  className="w-8 h-8 object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                  {workspace.name}
                </CardTitle>
              </div>
            </div>
            <Badge
              variant="secondary"
              className={`ml-2 flex-shrink-0 ${
                workspace.accessType === "owner"
                  ? "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900 dark:text-teal-300 dark:border-teal-800"
                  : "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
              }`}
            >
              {workspace.accessType}
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
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
