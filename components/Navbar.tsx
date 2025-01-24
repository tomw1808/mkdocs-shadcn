
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "#features",
        label: "Features",
    },
    {
        href: "#testimonials",
        label: "Testimonials",
    },
    {
        href: "#pricing",
        label: "Pricing",
    },
    {
        href: "#faq",
        label: "FAQ",
    },
];

export const Navbar = () => {

    return (
        <header className="sticky border-b-[1px] top-0 z-40 bg-white dark:border-b-slate-700 dark:bg-background py-2 px-2">
            
            <div className="flex justify-between align-center items-center">
            <a
                            rel="noreferrer noopener"
                            href="/"
                            className="ml-2 font-bold text-xl flex"
                        >
                            MkDocs Shadcn
                        </a>
                        <div className="flex lg:hidden">
                        <ModeToggle />
                        <ClientOnlySheet />
                    </div>
                    <nav className="hidden lg:flex gap-2">
                        {routeList.map((route: RouteProps, i) => (
                            <a
                                rel="noreferrer noopener"
                                href={route.href}
                                key={i}
                                className={`text-[17px] ${buttonVariants({
                                    variant: "ghost",
                                })}`}
                            >
                                {route.label}
                            </a>
                        ))}
                    </nav>
                    <div className="hidden lg:flex gap-2">
                        <a
                            rel="noreferrer noopener"
                            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                            target="_blank"
                            className={`border ${buttonVariants({ variant: "secondary" })}`}
                        >
                            <GitHubLogoIcon className="mr-2 w-5 h-5" />
                            Github
                        </a>

                        <ModeToggle />
                    </div>

            </div>
               

                 
        </header>
    );
};

// Client-only Sheet component
const ClientOnlySheet = () => {
    

    return (
        <div>
            
        <Sheet>
            <SheetTrigger className="px-2 lg:hidden h-full">
                <Menu className="flex lg:hidden h-5 w-5" aria-label="Menu Icon" />
            </SheetTrigger>

            <SheetContent side={"left"}>
                <SheetHeader>
                    <SheetTitle className="font-bold text-xl">
                        Shadcn/React
                    </SheetTitle>
                </SheetHeader>
                <SheetClose>
                    <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                        {routeList.map(({ href, label }: RouteProps) => (
                            <a
                                rel="noreferrer noopener"
                                key={label}
                                href={href}
                                className={buttonVariants({ variant: "ghost" })}
                            >
                                {label}
                            </a>
                        ))}
                        <a
                            rel="noreferrer noopener"
                            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                            target="_blank"
                            className={`w-[110px] border ${buttonVariants({
                                variant: "secondary",
                            })}`}
                        >
                            <GitHubLogoIcon className="mr-2 w-5 h-5" />
                            Github
                        </a>
                    </nav>
                </SheetClose>
            </SheetContent>
            </Sheet>

        </div>
    );
};
'use client'

import { getRootNavigation } from '@/lib/mkdocs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { ModeToggle } from './mode-toggle'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export const Navbar = () => {
  const pathname = usePathname()
  const navItems = getRootNavigation()

  return (
    <header className="sticky border-b-[1px] top-0 z-40 bg-white dark:border-b-slate-700 dark:bg-background py-2 px-2">
      <div className="flex justify-between align-center items-center">
        <Link href="/" className="ml-2 font-bold text-xl flex">
          MkDocs Shadcn
        </Link>
        
        <div className="flex lg:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger className="px-2 lg:hidden h-full">
              <Menu className="h-5 w-5" aria-label="Menu Icon" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="font-bold text-xl">
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <SheetClose>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.path ? `/${item.path}` : '#'}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden lg:flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.path ? `/${item.path}` : '#'}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === `/${item.path}` && "bg-muted"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex gap-2">
          <a
            rel="noreferrer noopener"
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={cn("border", buttonVariants({ variant: "secondary" }))}
          >
            <GitHubLogoIcon className="mr-2 w-5 h-5" />
            Github
          </a>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
