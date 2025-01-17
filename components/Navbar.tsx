"use client";

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
import { useEffect, useState } from "react";

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
        <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
                    <NavigationMenuItem className="font-bold flex">
                        <a
                            rel="noreferrer noopener"
                            href="/"
                            className="ml-2 font-bold text-xl flex"
                        >
                            MkDocs Shadcn
                        </a>
                    </NavigationMenuItem>

                    {/* mobile */}
                    <div className="flex md:hidden">
                        <ModeToggle />
                        <ClientOnlySheet />
                    </div>

                    {/* desktop */}
                    <nav className="hidden md:flex gap-2">
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

                    <div className="hidden md:flex gap-2">
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
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};

// Client-only Sheet component
const ClientOnlySheet = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <button className="px-2 md:hidden h-full">
                        <Menu className="h-5 w-5" aria-label="Menu Icon" />
                    </button>
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
