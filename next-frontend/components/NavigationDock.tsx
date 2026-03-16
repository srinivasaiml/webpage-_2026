"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconHome,
    IconTerminal2,
    IconTimeline,
    IconCertificate,
    IconMail,
} from "@tabler/icons-react";

export default function NavigationDock() {
    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "/",
        },
        {
            title: "Technical",
            icon: (
                <IconTerminal2 className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "/technical",
        },
        {
            title: "Journey",
            icon: (
                <IconTimeline className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "/journey",
        },
        {
            title: "Verification",
            icon: (
                <IconCertificate className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "/verification",
        },
        {
            title: "Contact",
            icon: (
                <IconMail className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "/contact",
        },
    ];

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
            <div className="p-2 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-white/30 dark:border-white/10 shadow-2xl">
                <FloatingDock
                    items={links}
                    desktopClassName="bg-transparent border-none p-0"
                    mobileClassName="translate-y-20"
                />
            </div>
        </div>
    );
}
