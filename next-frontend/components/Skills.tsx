"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import {
    FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt, FaGitAlt,
    FaGithub, FaDocker, FaFigma, FaDatabase
} from "react-icons/fa";
import {
    SiTypescript, SiNextdotjs, SiTailwindcss,
    SiMongodb, SiMysql, SiVercel, SiVite, SiJest, SiFramer,
    SiNetlify, SiFirebase,
} from "react-icons/si";

const techIcons = [
    { icon: <FaReact />, name: "React", color: "text-blue-500" },
    { icon: <SiTypescript />, name: "TypeScript", color: "text-blue-600" },
    { icon: <SiNextdotjs />, name: "Next.js", color: "text-black dark:text-white" },
    { icon: <FaHtml5 />, name: "HTML5", color: "text-orange-500" },
    { icon: <FaCss3Alt />, name: "CSS3", color: "text-blue-500" },
    { icon: <FaJs />, name: "JavaScript", color: "text-yellow-400" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "text-cyan-400" },
    { icon: <FaFigma />, name: "Figma", color: "text-purple-500" },
    { icon: <FaNodeJs />, name: "Node.js", color: "text-green-600" },
    { icon: <FaPython />, name: "Python", color: "text-blue-400" },
    { icon: <FaDatabase />, name: "SQL", color: "text-indigo-500" },
    { icon: <SiMongodb />, name: "MongoDB", color: "text-green-500" },
    { icon: <SiMysql />, name: "MySQL", color: "text-blue-600" },
    { icon: <FaGitAlt />, name: "Git", color: "text-red-500" },
    { icon: <FaDocker />, name: "Docker", color: "text-blue-500" },
    { icon: <FaGithub />, name: "GitHub", color: "text-gray-800 dark:text-gray-200" },
    { icon: <SiVite />, name: "Vite", color: "text-purple-500" },
    { icon: <SiFramer />, name: "Framer Motion", color: "text-pink-500" },
    { icon: <SiNetlify />, name: "Netlify", color: "text-teal-500" },
    { icon: <SiVercel />, name: "Vercel", color: "text-black dark:text-white" },
    { icon: <SiFirebase />, name: "Firebase", color: "text-yellow-500" },
    { icon: <SiJest />, name: "Jest", color: "text-red-500" },
];

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize, startIndex }: any) {
    return (
        <>
            {/* Semi-circle glow background */}
            <div className="absolute inset-0 flex justify-center">
                <div
                    className="
            w-[1000px] h-[1000px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)]
            dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]
            blur-3xl 
            -mt-40 
            pointer-events-none
          "
                    style={{ zIndex: 0 }}
                />
            </div>

            {/* Orbit icons */}
            {Array.from({ length: count }).map((_, index) => {
                const angle = (index / (count - 1)) * 180;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);
                
                // Map to our techIcons using startIndex offset to prevent duplicates across rings
                const globalIndex = startIndex + index;
                const tech = techIcons[globalIndex % techIcons.length];

                // Tooltip positioning — above or below based on angle
                const tooltipAbove = angle > 90;

                return (
                    <div
                        key={index}
                        className="absolute flex flex-col items-center group"
                        style={{
                            left: `${centerX + x - iconSize / 2}px`,
                            top: `${centerY - y - iconSize / 2}px`,
                            zIndex: 5,
                        }}
                    >
                        <div
                            className={`flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-800 cursor-pointer transition-transform hover:scale-110 ${tech.color}`}
                            style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.55 }}
                        >
                            {tech.icon}
                        </div>

                        {/* Tooltip */}
                        <div
                            className={`absolute ${tooltipAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
                                } hidden group-hover:block w-fit px-3 py-1.5 rounded-lg bg-black dark:bg-zinc-800 text-xs text-white shadow-lg text-center whitespace-nowrap border border-zinc-800 font-medium`}
                        >
                            {tech.name}
                            <div
                                className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black dark:bg-zinc-800 border-zinc-800 ${tooltipAbove ? "top-full -mt-1 border-r border-b" : "bottom-full -mb-1 border-l border-t"
                                    }`}
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default function Skills() {
    const { theme } = useTheme();
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const baseWidth = Math.min(size.width * 0.8, 800);
    const centerX = baseWidth / 2;
    const centerY = baseWidth * 0.5;

    const iconSize =
        size.width < 480
            ? Math.max(36, baseWidth * 0.08)
            : size.width < 768
                ? Math.max(42, baseWidth * 0.07)
                : Math.max(48, baseWidth * 0.06);

    return (
        <section 
            id="skills"
            className="py-20 relative min-h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-500 border-y border-zinc-100 dark:border-zinc-900"
        >
            <div className="relative flex flex-col items-center text-center z-10 pt-10">
                {/* Section Header */}
                <div className="relative flex justify-center items-center py-10 md:py-20 -mb-4 overflow-hidden pointer-events-none">
                    <span 
                        className="absolute text-[6rem] md:text-[9rem] lg:text-[13rem] font-bold text-gray-200/80 dark:text-zinc-800/80 select-none z-0 tracking-tighter whitespace-nowrap"
                        style={{ fontFamily: "'Brush Script MT', 'Caveat', 'Dancing Script', var(--font-playfair), cursive" }}
                    >
                        Skills
                    </span>
                    <h2 className="relative text-3xl md:text-5xl lg:text-6xl font-black text-black dark:text-white tracking-widest uppercase z-10">
                        MY SKILLS.
                    </h2>
                </div>
                <p className="mb-16 max-w-2xl text-zinc-600 dark:text-zinc-400 lg:text-lg px-4 leading-relaxed">
                    A comprehensive collection of technologies and tools I use to build modern, scalable web applications and elegant digital experiences.
                </p>

                <div
                    className="relative"
                    style={{ width: baseWidth, height: baseWidth * 0.55 }}
                >
                    {/* 3 Rings of icons, passing different startIndexes to shuffle the icons shown */}
                    <SemiCircleOrbit radius={baseWidth * 0.22} centerX={centerX} centerY={centerY} count={5} iconSize={iconSize} startIndex={0} />
                    <SemiCircleOrbit radius={baseWidth * 0.36} centerX={centerX} centerY={centerY} count={8} iconSize={iconSize} startIndex={5} />
                    <SemiCircleOrbit radius={baseWidth * 0.5} centerX={centerX} centerY={centerY} count={11} iconSize={iconSize} startIndex={13} />
                </div>
            </div>
            
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        </section>
    );
}
