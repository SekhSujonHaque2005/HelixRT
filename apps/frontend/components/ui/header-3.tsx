"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { createPortal } from "react-dom";
import { useScroll } from "@/components/ui/use-scroll";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LucideIcon } from "lucide-react";
import {
    Activity,
    Cpu,
    AreaChart,
    Users,
    FileText,
    Shield,
    RotateCcw,
    BookOpen,
    HelpCircle,
    TerminalSquare
} from "lucide-react";

type LinkItem = {
    title: string;
    href: string;
    icon: LucideIcon;
    description?: string;
};

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <div className="h-14 w-full shrink-0 flex-none pointer-events-none" />
            <header
                className={cn("fixed top-0 inset-x-0 z-50 w-full border-b border-transparent transition-all duration-300", {
                    "bg-white/95 dark:bg-black/95 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/50 border-slate-200 dark:border-slate-800 backdrop-blur-lg":
                        scrolled,
                })}
            >
                <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
                    <div className="flex items-center gap-5">
                        <Link href="/" className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md p-2 transition-colors">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                            </span>
                            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-slate-50">HelixRT</span>
                        </Link>
                        <NavigationMenu className="hidden md:flex">
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent">
                                        Product
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="bg-white dark:bg-black p-1 pr-1.5">
                                        <ul className="bg-white dark:bg-black grid w-[500px] grid-cols-2 gap-2 rounded-md border border-slate-200 dark:border-slate-800 p-2 shadow">
                                            {productLinks.map((item, i) => (
                                                <li key={i}>
                                                    <ListItem {...item} />
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="p-2">
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                                View the Full Scale Architecture{" "}
                                                <Link
                                                    href="/#architecture"
                                                    className="text-slate-900 dark:text-slate-100 font-medium hover:underline"
                                                >
                                                    Learn more
                                                </Link>
                                            </p>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent">
                                        Company
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="bg-white dark:bg-black p-1 pr-1.5 pb-1.5">
                                        <div className="grid w-[400px] grid-cols-2 gap-2">
                                            <ul className="bg-white dark:bg-black space-y-2 rounded-md border border-slate-200 dark:border-slate-800 p-2 shadow">
                                                {companyLinks.map((item, i) => (
                                                    <li key={i}>
                                                        <ListItem {...item} />
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className="space-y-2 p-3">
                                                {companyLinks2.map((item, i) => (
                                                    <li key={i}>
                                                        <NavigationMenuLink asChild>
                                                            <Link
                                                                href={item.href}
                                                                className="flex p-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex-row rounded-md items-center gap-x-2 text-slate-900 dark:text-slate-100 transition-colors"
                                                            >
                                                                <item.icon className="text-slate-900 dark:text-slate-100 size-4" />
                                                                <span className="font-medium">{item.title}</span>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/docs" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md font-medium text-slate-900 dark:text-slate-100 transition-colors">
                                            Documentation
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href="https://github.com"
                                            target="_blank"
                                            className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md font-medium text-slate-900 dark:text-slate-100 transition-colors"
                                        >
                                            GitHub
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="hidden items-center gap-2 md:flex">
                        <ThemeToggle />
                        <Link href="/dashboard">
                            <Button>Launch Dashboard</Button>
                        </Link>
                    </div>
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setOpen(!open)}
                        className="md:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label="Toggle menu"
                    >
                        <MenuToggleIcon open={open} className="size-5" duration={300} />
                    </Button>
                </nav>
                <MobileMenu
                    open={open}
                    className="flex flex-col justify-between gap-2 overflow-y-auto"
                >
                    <NavigationMenu className="max-w-full">
                        <div className="flex w-full flex-col gap-y-2">
                            <span className="text-sm">Product</span>
                            {productLinks.map((link) => (
                                <ListItem key={link.title} {...link} />
                            ))}
                            <span className="text-sm">Company</span>
                            {companyLinks.map((link) => (
                                <ListItem key={link.title} {...link} />
                            ))}
                            {companyLinks2.map((link) => (
                                <ListItem key={link.title} {...link} />
                            ))}
                        </div>
                    </NavigationMenu>
                    <div className="flex flex-col gap-2">
                        <ThemeToggle />
                        <Link href="/dashboard" className="w-full">
                            <Button className="w-full">Launch Dashboard</Button>
                        </Link>
                    </div>
                </MobileMenu>
            </header>
        </>
    );
}

type MobileMenuProps = React.ComponentProps<"div"> & {
    open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
    if (!open || typeof window === "undefined") return null;

    return createPortal(
        <div
            id="mobile-menu"
            className={cn(
                "bg-white/95 dark:bg-black/95 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-slate-950/50 backdrop-blur-lg",
                "fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-slate-200 dark:border-slate-800 md:hidden"
            )}
        >
            <div
                data-slot={open ? "open" : "closed"}
                className={cn(
                    "data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out",
                    "h-full w-full p-4",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}

function ListItem({
    title,
    description,
    icon: Icon,
    className,
    href,
    ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
    return (
        <NavigationMenuLink asChild {...props}>
            <Link
                href={href}
                className={cn(
                    "w-full flex flex-row gap-x-2 focus:bg-slate-100 dark:focus:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-sm p-2 transition-colors",
                    className
                )}
            >
                <div className="bg-slate-100/40 dark:bg-slate-800/40 flex aspect-square size-12 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                    <Icon className="text-slate-900 dark:text-slate-100 size-5" />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <span className="font-medium text-slate-900 dark:text-slate-100">{title}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">{description}</span>
                </div>
            </Link>
        </NavigationMenuLink>
    );
}

const productLinks: LinkItem[] = [
    {
        title: "Real-Time Telemetry",
        href: "/#features",
        description: "Monitor queue depth and latency live",
        icon: Activity,
    },
    {
        title: "Adaptive Scaling",
        href: "/#features",
        description: "Auto-spawning threads based on load",
        icon: AreaChart,
    },
    {
        title: "Pluggable Schedulers",
        href: "/#features",
        description: "Switch between FIFO and Work Stealing",
        icon: Cpu,
    },
    {
        title: "gRPC Control API",
        href: "/#architecture",
        description: "Remote instrumentation framework",
        icon: TerminalSquare,
    },
];

const companyLinks: LinkItem[] = [
    {
        title: "About Us",
        href: "/about-us",
        description: "Learn more about our team and mission",
        icon: Users,
    },
    {
        title: "Engineering Blog",
        href: "/blog",
        description: "Deep dive into C++ concurrency",
        icon: BookOpen,
    },
];

const companyLinks2: LinkItem[] = [
    {
        title: "Terms of Service",
        href: "/terms-of-service",
        icon: FileText,
    },
    {
        title: "Privacy Policy",
        href: "/privacy-policy",
        icon: Shield,
    },
    {
        title: "Refund Policy",
        href: "/refund-policy",
        icon: RotateCcw,
    },
    {
        title: "Help Center",
        href: "/help-center",
        icon: HelpCircle,
    },
];
