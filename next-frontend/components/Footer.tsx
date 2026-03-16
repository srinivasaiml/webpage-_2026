"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export default function Footer() {
    return (
        <footer className="relative w-full h-[50vh] flex flex-col items-center justify-center bg-white dark:bg-slate-950 overflow-hidden border-t border-slate-100 dark:border-slate-900 transition-colors duration-500">
            {/* Massive Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="text-[22vw] font-[1000] tracking-[-0.05em] text-slate-100/50 dark:text-white/[0.02] uppercase leading-none">
                    SRINIVAS
                </span>
            </div>

            {/* Bottom Footer Info */}
            <div className="absolute bottom-6 md:bottom-12 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 z-10">
                <div className="flex flex-col items-center md:items-start w-full md:w-auto text-center md:text-left">
                    <p className="text-slate-500 dark:text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em] font-black opacity-50 px-2 leading-relaxed">
                        © 2024 P. Srinivas • Software Engineer
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center">
                    <span className="text-slate-400 dark:text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                        Engineering Student
                    </span>
                    <span className="hidden sm:inline text-slate-400 dark:text-slate-500 opacity-50">
                        •
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                        Built with Next.js
                    </span>
                </div>
            </div>

            {/* Subtle Vignette overlay to merge with page content */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-40 pointer-events-none" />
        </footer>
    );
}
