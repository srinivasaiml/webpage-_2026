"use client";

import React from 'react';
import { WavePath } from "@/components/ui/wave-path";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import SpinningText from '@/components/ui/spinning-text';

export default function HomeArtSection() {
    return (
        <section className="relative w-full flex min-h-[60vh] flex-col items-center justify-center bg-white dark:bg-black overflow-hidden pt-12 pb-24">
            <div
                aria-hidden="true"
                className={cn(
                    'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
                    'bg-[radial-gradient(ellipse_at_center,var(--violet-500),transparent_50%)]',
                    'blur-[100px] opacity-10',
                )}
            />

            <div className="flex w-[80vw] flex-col items-center md:items-end">
                <WavePath className="mb-10 w-full" />
                <div className="flex w-full flex-col items-end">
                    <div className="flex flex-col-reverse md:flex-row justify-end items-start md:items-center gap-6 md:gap-12">
                        <SpinningText
                            text="Full-Stack Developer • P. Srinivas • Engineering • "
                            radius={26}
                            textClassName="text-[4.5px]"
                            speed={12}
                            direction="normal"
                            className="w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-72 lg:h-72 shrink-0 md:-ml-8"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-slate-900 dark:text-white/80 w-full md:w-3/4 text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter leading-tight"
                        >
                            Transforming ideas into elegant digital experiences through creativity, clean code, and modern technology.
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    );
}
