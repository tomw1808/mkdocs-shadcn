'use client'

import { NavTreeItem } from '@/lib/mkdocs'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Search } from './Search'

interface SideNavProps {
  items: NavTreeItem[]
}

interface NavItemProps {
  item: NavTreeItem
  currentPath: string
}

const NavItem = ({ item, currentPath }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(
    // Open if this section contains the current page
    item.children?.some(child =>
      currentPath === child.path ||
      child.children?.some(grandchild => currentPath === grandchild.path)
    ) ?? false
  )

  const hasChildren = item.children && item.children.length > 0
  const isActive = currentPath === item.path

  if (hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => setIsOpen(!isOpen)}
          isActive={isActive}
        >
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <span>{item.title}</span>
        </SidebarMenuButton>
        {isOpen && (
          <SidebarMenuSub>
            {item.children?.map((child, index) => (
              <NavItem
                key={index}
                item={child}
                currentPath={currentPath}
              />
            ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
      >
        <Link href={`/${item.path}`}>
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export const SideNav = ({ items }: SideNavProps) => {
  const pathname = usePathname()
  const currentPath = pathname.substring(1) // Remove leading slash

  return (
    <Sidebar className='mt-12' variant='sidebar'>
      <SidebarHeader className="py-6">
        <Search />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              currentPath={currentPath}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
