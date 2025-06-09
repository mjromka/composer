"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Loader2 } from "lucide-react"

interface WelcomeCardProps {
  onLogin: () => void
  isLoading: boolean
}

export function WelcomeCard({ onLogin, isLoading }: WelcomeCardProps) {
  return (
    <div className="flex items-center justify-center py-16">
      <Card className="max-w-md w-full border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-2xl shadow-lg">
              <Lock className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to Composer
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Please sign in with your Linkando account to access your workspaces and manage templates.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-0">
          <Button
            onClick={onLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <div className="text-lg font-bold text-orange-400 mr-2">🔗</div>
                Login with Linkando
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="mt-6 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">🚀 Demo Mode Active</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Click the button above to simulate the OAuth authentication process.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
