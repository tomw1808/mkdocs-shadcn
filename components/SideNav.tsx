'use client'

import { NavTreeItem } from '@/lib/mkdocs'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface SideNavProps {
  items: NavTreeItem[]
}

interface NavItemProps {
  item: NavTreeItem
  depth?: number
  currentPath: string
}

const NavItem = ({ item, depth = 0, currentPath }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(
    // Open if this section contains the current page
    item.children?.some(child => 
      currentPath === child.path || 
      child.children?.some(grandchild => currentPath === grandchild.path)
    ) ?? false
  )

  const hasChildren = item.children && item.children.length > 0
  const isActive = currentPath === item.path
  
  return (
    <div className="w-full">
      <div 
        className={`flex items-center py-1 px-2 rounded-md cursor-pointer
          ${item.isSection ? 'text-sm font-bold text-primary mt-4 first:mt-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground' : 
            `hover:bg-accent/50 ${isActive ? 'bg-accent' : ''}`
          }
        `}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <span className="mr-1">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
        )}
        
        {item.path ? (
          <Link href={`/${item.path}`} className="flex-1">
            {item.title}
          </Link>
        ) : (
          <span className="flex-1">{item.title}</span>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="mt-1">
          {item.children?.map((child, index) => (
            <NavItem 
              key={index}
              item={child}
              depth={depth + 1}
              currentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const SideNav = ({ items }: SideNavProps) => {
  const pathname = usePathname()
  const currentPath = pathname.substring(1) // Remove leading slash
  
  return (
    <nav className="w-64 fixed left-0 top-[3.5rem] h-[calc(100vh-3.5rem)] border-r hidden md:block">
      <ScrollArea className="h-full">
        <div className="px-2 py-4">
          {items.map((item, index) => (
            <NavItem 
              key={index}
              item={item}
              currentPath={currentPath}
            />
          ))}
        </div>
      </ScrollArea>
    </nav>
  )
}
