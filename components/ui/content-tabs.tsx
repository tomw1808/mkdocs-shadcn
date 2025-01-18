'use client'

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabItem {
  label: string
  content: React.ReactNode
}

interface ContentTabsProps {
  items: TabItem[]
  className?: string
}

export function ContentTabs({ items, className }: ContentTabsProps) {
  if (!items.length) return null

  return (
    <Tabs defaultValue={items[0].label} className={className}>
      <TabsList>
        {items.map((item) => (
          <TabsTrigger key={item.label} value={item.label}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.label} value={item.label}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
