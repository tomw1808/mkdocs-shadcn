'use client'

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import dynamic from 'next/dynamic'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
  isCollapsible?: boolean
}

export function Admonition({
  type = "note",
  title,
  children,
  className
}: AdmonitionProps) {
  const Icon = icons[type]

  if (isCollapsible) {
    return (
      <Accordion type="single" collapsible className={cn("[&:not(:first-child)]:mt-6")}>
        <AccordionItem value="content" className={cn("border rounded-lg", {
          "border-blue-200 dark:border-blue-750": type === "note",
          "border-red-200 dark:border-red-750": type === "failure" || type === "danger",
          "border-yellow-200 dark:border-yellow-750": type === "warning",
          "border-green-200 dark:border-green-750": type === "success" || type === "tip",
          "border-purple-200 dark:border-purple-750": type === "abstract",
          "border-orange-200 dark:border-orange-750": type === "bug",
          "border-gray-200 dark:border-gray-750": type === "example" || type === "quote",
          "border-cyan-200 dark:border-cyan-750": type === "info",
          "border-violet-200 dark:border-violet-750": type === "question",
        })}>
          <AccordionTrigger className={cn("flex flex-row gap-3 p-3 hover:no-underline", {
            "bg-blue-50 dark:bg-blue-950": type === "note",
            "bg-red-50 dark:bg-red-950": type === "failure" || type === "danger",
            "bg-yellow-50 dark:bg-yellow-950": type === "warning",
            "bg-green-50 dark:bg-green-950": type === "success" || type === "tip",
            "bg-purple-50 dark:bg-purple-950": type === "abstract",
            "bg-orange-50 dark:bg-orange-950": type === "bug",
            "bg-gray-50 dark:bg-gray-950": type === "example" || type === "quote",
            "bg-cyan-50 dark:bg-cyan-950": type === "info",
            "bg-violet-50 dark:bg-violet-950": type === "question",
          })}>
            {Icon && <Icon className="h-4 w-4" />}
            {title ? <span>{title}</span> : <span>{type.charAt(0).toUpperCase()}{type.slice(1)}</span>}
          </AccordionTrigger>
          <AccordionContent className="p-4">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  return (
    <Alert className={cn("p-0 [&:not(:first-child)]:mt-6 ", {
      "border-blue-200 dark:border-blue-750": type === "note",
      "border-red-200 dark:border-red-750": type === "failure" || type === "danger",
      "border-yellow-200 dark:border-yellow-750": type === "warning",
      "border-green-200 dark:border-green-750": type === "success" || type === "tip",
      "border-purple-200 dark:border-purple-750": type === "abstract",
      "border-orange-200 dark:border-orange-750": type === "bug",
      "border-gray-200 dark:border-gray-750": type === "example" || type === "quote",
      "border-cyan-200 dark:border-cyan-750": type === "info",
      "border-violet-200 dark:border-violet-750": type === "question",
    }, className)}>
      <div className={cn("flex flex-row gap-3 p-3 items-center", {
      "bg-blue-50 dark:bg-blue-950": type === "note",
      "bg-red-50 dark:bg-red-950": type === "failure" || type === "danger",
      "bg-yellow-50 dark:bg-yellow-950": type === "warning",
      "bg-green-50 dark:bg-green-950": type === "success" || type === "tip",
      "bg-purple-50 dark:bg-purple-950": type === "abstract",
      "bg-orange-50 dark:bg-orange-950": type === "bug",
      "bg-gray-50 dark:bg-gray-950": type === "example" || type === "quote",
      "bg-cyan-50 dark:bg-cyan-950": type === "info",
      "bg-violet-50 dark:bg-violet-950": type === "question",
    })}>
        {Icon && <Icon className="h-4 w-4 mb-1" />}
        {title ? <AlertTitle className={cn("")}>{title}</AlertTitle> : <AlertTitle>{type.charAt(0).toUpperCase()}{type.slice(1)}</AlertTitle>}
      </div>
      <AlertDescription className="p-2">{children}</AlertDescription>
    </Alert>
  )
}
