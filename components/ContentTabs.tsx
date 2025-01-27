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
    <Tabs defaultValue={items[0].label} className={className + ""}>
      <TabsList  className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
        {items.map((item) => (
          <TabsTrigger key={item.label} value={item.label} className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.label} value={item.label} className="pl-1">
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
