'use client'

import { NavTreeItem } from '@/lib/mkdocs'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SheetClose } from './ui/sheet'

interface MobileNavProps {
    items: Array<{
        title: string
        path?: string
    }>
    fullNavigation?: NavTreeItem[]
}

interface NavItemProps {
    item: NavTreeItem
    currentPath: string
    depth?: number
}

const NavItem = ({ item, currentPath, depth = 0 }:
    NavItemProps) => {
    const [isOpen, setIsOpen] = useState(
        item.children?.some(child =>
            currentPath === child.path ||
            child.children?.some(grandchild => currentPath
                === grandchild.path)
        ) ?? false
    )

    const hasChildren = item.children &&
        item.children.length > 0
    const isActive = currentPath === item.path

    if (hasChildren) {
        return (
            <div className="w-full">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn("flex w-full items-center gap-2 rounded-m px-2 py-1.5 text-sm font-medium", isActive && "bg-accent", depth === 0 && "mt-2")}>
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    <span>{item.title}</span>
                </button>
                {isOpen && (
                    <div className="ml-4">
                        {item.children?.map((child, index) => (
                            <NavItem
                                key={index}
                                item={child}
                                currentPath={currentPath}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <SheetClose asChild>

            <Link
                href={`/${item.path}`}
                className={cn(
                    "flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium", isActive && "bg-accent", depth === 0 && "mt-2")}>
                <span>{item.title}</span>
            </Link>
        </SheetClose>
    )
}

export function MobileNav({ items, fullNavigation = [] }:
    MobileNavProps) {
    const pathname = usePathname()
    const currentPath = pathname.substring(1)

    return (
        <div className="flex flex-col gap-2">
            <div className="border-b pb-2">
                {items.map((item) => (
                    <SheetClose key={item.title} asChild>
                        <Link
                            href={item.path ? `/${item.path}` : '#'}
                            className="flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium">
                            {item.title}
                        </Link>
                    </SheetClose>
                ))}
            </div>
            <div className="flex flex-col">
                {fullNavigation?.map((item, index) => (
                    <NavItem
                        key={index}
                        item={item}
                        currentPath={currentPath}
                    />
                ))}
            </div>
        </div>
    )
}     
