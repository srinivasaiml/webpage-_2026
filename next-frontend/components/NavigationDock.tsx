"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconHome,
    IconTerminal2,
    IconTimeline,
    IconCertificate,
    IconMail,
    IconSchool,
    IconFolder,
} from "@tabler/icons-react";

export default function NavigationDock() {
    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "#home",
        },
        {
            title: "Education",
            icon: (
                <IconSchool className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "#education",
        },
        {
            title: "Skills",
            icon: (
                <IconTerminal2 className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "#skills",
        },
        {
            title: "Experience",
            icon: (
                <IconTimeline className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "#experience",
        },
        {
            title: "Projects",
            icon: (
                <IconFolder className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "#projects",
        },
        {
            title: "Certification",
            icon: (
                <IconCertificate className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "#certification",
        },
        {
            title: "Contact",
            icon: (
                <IconMail className="h-full w-full text-slate-500 dark:text-slate-300" />
            ),
            href: "#contact",
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
