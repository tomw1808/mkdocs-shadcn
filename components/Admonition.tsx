'use client'

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import dynamic from 'next/dynamic'

// Dynamically import all icons to use them based on type
const icons = {
  note: dynamic(() => import("lucide-react").then(mod => mod.Pencil)),
  abstract: dynamic(() => import("lucide-react").then(mod => mod.FileText)),
  info: dynamic(() => import("lucide-react").then(mod => mod.Info)),
  tip: dynamic(() => import("lucide-react").then(mod => mod.Lightbulb)),
  success: dynamic(() => import("lucide-react").then(mod => mod.CheckCircle)),
  question: dynamic(() => import("lucide-react").then(mod => mod.HelpCircle)),
  warning: dynamic(() => import("lucide-react").then(mod => mod.AlertTriangle)),
  failure: dynamic(() => import("lucide-react").then(mod => mod.XCircle)),
  danger: dynamic(() => import("lucide-react").then(mod => mod.Zap)),
  bug: dynamic(() => import("lucide-react").then(mod => mod.Bug)),
  example: dynamic(() => import("lucide-react").then(mod => mod.FileCode)),
  quote: dynamic(() => import("lucide-react").then(mod => mod.Quote))
}

type AdmonitionType = keyof typeof icons

interface AdmonitionProps {
  type?: AdmonitionType
  title?: string
  children: React.ReactNode
  className?: string
}

export function Admonition({ 
  type = "note",
  title,
  children,
  className
}: AdmonitionProps) {
  const Icon = icons[type]

  return (
    <Alert className={cn(" [&:not(:first-child)]:mt-6 ", {
      "bg-blue-50 dark:bg-blue-950": type === "note",
      "bg-red-50 dark:bg-red-950": type === "failure" || type === "danger",
      "bg-yellow-50 dark:bg-yellow-950": type === "warning",
      "bg-green-50 dark:bg-green-950": type === "success" || type === "tip",
      "bg-purple-50 dark:bg-purple-950": type === "abstract",
      "bg-orange-50 dark:bg-orange-950": type === "bug",
      "bg-gray-50 dark:bg-gray-950": type === "example" || type === "quote",
      "bg-cyan-50 dark:bg-cyan-950": type === "info",
      "bg-violet-50 dark:bg-violet-950": type === "question",
    }, className)}>
      {Icon && <Icon className="h-4 w-4" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
