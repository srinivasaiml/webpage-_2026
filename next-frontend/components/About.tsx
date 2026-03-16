"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
    IconBoxAlignRightFilled,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

import { GlowCard } from "@/components/spotlight-card";
import MagnifiedBento from "./ui/magnified-bento";
import { PerspectiveBook } from "./ui/perspective-book";

export default function About() {
    return (
        <section id="about" className="py-24 bg-indigo-500/5 dark:bg-slate-950/50 relative overflow-hidden">
            {/* Ambient decorative blurs for About section */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-violet-200/40 rounded-full blur-[100px] dark:hidden" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-200/40 rounded-full blur-[100px] dark:hidden" />
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-sm font-bold uppercase tracking-widest"
                    >
                        Engineering Excellence
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
                        Crafting High-Fidelity Systems with Purpose
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4 md:space-y-6 pt-6 md:pt-8">
                        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                            I&apos;m <span className="text-violet-600 dark:text-violet-400 font-bold">Srinivas</span>, a Software Engineering student at Aditya University passionate about full-stack development, intelligent automation, and modern web technologies.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                            I enjoy building systems that combine efficient backend architecture with smooth, visually engaging frontend experiences.
                        </p>
                    </div>
                </div>

                <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[24rem] gap-5">
                    {items.map((item, i) => (
                        <GlowCard
                            key={i}
                            customSize
                            className={cn("w-full h-full p-0 overflow-hidden", item.className)}
                            glowColor="purple"
                        >
                            <BentoGridItem
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                className={cn("[&>p:text-lg] h-full shadow-none border-0", "bg-transparent dark:bg-transparent")}
                                icon={item.icon}
                            />
                        </GlowCard>
                    ))}
                </BentoGrid>

                {/* Download Resume removed per user request */}
            </div>
        </section>
    );
}

const SkeletonOne = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-4"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
                <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
                <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
            </motion.div>
        </motion.div>
    );
};
const SkeletonTwo = () => {
    const variants = {
        initial: {
            width: 0,
        },
        animate: {
            width: "100%",
            transition: {
                duration: 0.2,
            },
        },
        hover: {
            width: ["0%", "100%"],
            transition: {
                duration: 2,
            },
        },
    };
    const arr = new Array(6).fill(0);
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-4"
        >
            {arr.map((_, i) => (
                <motion.div
                    key={"skelenton-two" + i}
                    variants={variants}
                    style={{
                        maxWidth: Math.random() * (100 - 40) + 40 + "%",
                    }}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
                ></motion.div>
            ))}
        </motion.div>
    );
};
const SkeletonThree = () => {
    return (
        <div className="flex items-center justify-center h-full w-full py-6">
            <PerspectiveBook size="sm" textured className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col items-center justify-center h-full gap-2 text-center p-2">
                    <div className="p-2 rounded-full bg-violet-500/10 mb-1">
                        <IconSignature className="h-6 w-6 text-violet-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tighter">Backend & APIs</span>
                    <p className="text-[10px] text-slate-500 font-medium">Secure Architecture</p>
                </div>
            </PerspectiveBook>
        </div>
    );
};
const SkeletonFour = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-1 sm:p-2 bg-transparent dark:bg-transparent">
            <MagnifiedBento />
        </div>
    );
};
const SkeletonFive = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-4"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-3  items-start space-x-2 bg-white dark:bg-black shadow-sm"
            >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 shrink-0" />
                <p className="text-[10px] text-neutral-500 leading-tight">
                    Bridging the gap between complex engineering systems and intuitive, professional designers...
                </p>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black shadow-sm"
            >
                <p className="text-[10px] text-violet-600 font-bold uppercase tracking-tight">Let&apos;s Build.</p>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
            </motion.div>
        </motion.div>
    );
};

const items = [
    {
        title: "MERN Stack Development",
        description: (
            <span className="text-sm">
                Developing scalable web applications using MongoDB, Express.js, React.js, and Node.js with clean and efficient code structures.
            </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Frontend Engineering",
        description: (
            <span className="text-sm">
                Creating interactive interfaces using modern UI/UX principles, responsive design, animations, and performance optimization.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Backend & API Development",
        description: (
            <span className="text-sm">
                Designing secure and scalable REST APIs, authentication systems, and database architectures.
            </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "",
        description: null,
        header: <SkeletonFour />,
        className: "md:col-span-2 p-0 relative",
        icon: null,
    },
    {
        title: "Continuous Innovation",
        description: (
            <span className="text-sm">
                Engineering student at Aditya University, constantly exploring the edge of modern web technology.
            </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
];
