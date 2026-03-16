"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import {
    FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt, FaGitAlt,
    FaGithub, FaDocker, FaFigma, FaDatabase
} from 'react-icons/fa';
import {
    SiTypescript, SiNextdotjs, SiTailwindcss,
    SiMongodb, SiMysql, SiVercel, SiVite, SiJest, SiFramer,
    SiNetlify, SiFirebase,
} from 'react-icons/si';

const Skills = () => {
    const [isScattered, setIsScattered] = useState(true);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [imageRotation, setImageRotation] = useState(0);
    const { theme } = useTheme();
    const skillsRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const scrollVelocity = useRef(0);
    const animationFrame = useRef<number>(null);
    const prefersReducedMotion = useReducedMotion();

    const techIcons = [
        { icon: <FaReact />,        name: 'React',         color: 'from-cyan-400 to-blue-500' },
        { icon: <SiTypescript />,   name: 'TypeScript',    color: 'from-blue-500 to-blue-700' },
        { icon: <SiNextdotjs />,    name: 'Next.js',       color: 'from-gray-700 to-black' },
        { icon: <FaHtml5 />,        name: 'HTML5',         color: 'from-orange-500 to-red-500' },
        { icon: <FaCss3Alt />,      name: 'CSS3',          color: 'from-blue-400 to-purple-500' },
        { icon: <FaJs />,           name: 'JavaScript',    color: 'from-yellow-400 to-orange-500' },
        { icon: <SiTailwindcss />,  name: 'Tailwind',      color: 'from-teal-400 to-cyan-500' },
        { icon: <FaFigma />,        name: 'Figma',         color: 'from-purple-500 to-red-500' },
        { icon: <FaNodeJs />,       name: 'Node.js',       color: 'from-green-500 to-green-700' },
        { icon: <FaPython />,       name: 'Python',        color: 'from-blue-400 to-yellow-400' },
        { icon: <FaDatabase />,     name: 'SQL',           color: 'from-blue-600 to-indigo-600' },
        { icon: <SiMongodb />,      name: 'MongoDB',       color: 'from-green-400 to-green-600' },
        { icon: <SiMysql />,        name: 'MySQL',         color: 'from-blue-500 to-blue-700' },
        { icon: <FaGitAlt />,       name: 'Git',           color: 'from-orange-500 to-red-600' },
        { icon: <FaDocker />,       name: 'Docker',        color: 'from-blue-400 to-blue-600' },
        { icon: <FaGithub />,       name: 'GitHub',        color: 'from-gray-700 to-black' },
        { icon: <SiVite />,         name: 'Vite',          color: 'from-purple-500 to-yellow-400' },
        { icon: <SiFramer />,       name: 'Framer Motion', color: 'from-pink-500 to-purple-500' },
        { icon: <SiNetlify />,      name: 'Netlify',       color: 'from-teal-400 to-teal-600' },
        { icon: <SiVercel />,       name: 'Vercel',        color: 'from-black to-gray-700' },
        { icon: <SiFirebase />,     name: 'Firebase',      color: 'from-yellow-500 to-orange-500' },
        { icon: <SiJest />,         name: 'Jest',          color: 'from-red-500 to-orange-500' },
    ];

    const ribbonTexts = [
        ['ACCESSIBLE', 'RESPONSIVE', 'DYNAMIC', 'SCALABLE', 'SEARCH OPTIMIZED', 'INTERACTIVE', 'SECURE', 'RELIABLE', 'ENGAGING'],
        ['IMPACTFUL', 'ACCESSIBLE', 'RESPONSIVE', 'DYNAMIC', 'SCALABLE', 'SEARCH OPTIMIZED', 'INTERACTIVE', 'SECURE', 'RELIABLE', 'ENGAGING']
    ];

    useEffect(() => {
        let ticking = false;
        let scrollTimeout: NodeJS.Timeout | null = null;

        const handleScroll = () => {
            if (!ticking) {
                // @ts-ignore
                animationFrame.current = window.requestAnimationFrame(() => {
                    if (!skillsRef.current) {
                        ticking = false;
                        return;
                    }

                    const rect = skillsRef.current.getBoundingClientRect();
                    const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
                    const currentScrollY = window.scrollY;
                    const scrollDelta = currentScrollY - lastScrollY.current;

                    scrollVelocity.current = scrollDelta * 0.3 + scrollVelocity.current * 0.7;
                    setImageRotation(prev => prev + scrollVelocity.current * 0.15);

                    if (isInView && !hasAnimated) {
                        setHasAnimated(true);
                        setTimeout(() => setIsScattered(false), 100);
                    }

                    if (hasAnimated && isInView) {
                        const velocityThreshold = window.innerWidth < 768 ? 2 : 3;
                        if (scrollTimeout) clearTimeout(scrollTimeout);

                        const isScrollingDown = scrollVelocity.current > velocityThreshold;
                        const isScrollingUp = scrollVelocity.current < -velocityThreshold;

                        if (isScrollingDown && isScattered) {
                            setIsScattered(false);
                        } else if (isScrollingUp && !isScattered) {
                            setIsScattered(true);
                        }

                        scrollTimeout = setTimeout(() => {
                            if (Math.abs(scrollVelocity.current) < 0.5) {
                                setIsScattered(false);
                            }
                        }, 200);
                    }

                    lastScrollY.current = currentScrollY;
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current as number);
        };
    }, [hasAnimated, isScattered]);

    const generateScatterPosition = (index: number) => {
        const goldenAngle = 137.508;
        const angle = (index * goldenAngle + Math.sin(index) * 15) * (Math.PI / 180);
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const distance = isMobile
            ? 120 + Math.sqrt(index) * 40
            : 250 + Math.sqrt(index) * 60;

        return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotate: -90 + (index * 15) % 180,
        };
    };

    const springConfig = {
        type: 'spring',
        stiffness: prefersReducedMotion ? 400 : 120,
        damping: prefersReducedMotion ? 40 : 18,
        mass: 0.8,
    };

    return (
        <section
            id="skills"
            className={`min-h-screen relative overflow-hidden py-12 sm:py-16 md:py-20 transition-colors duration-500 ${theme === 'dark'
                ? 'bg-gradient-to-br from-gray-950 via-indigo-950/80 to-purple-950/90'
                : 'bg-violet-500/5'
                }`}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Modern Background for Light Mode */}
                {theme !== 'dark' && (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.15)_0,transparent_60%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
                    </>
                )}

                {/* Animated Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-1/4 -left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-[120px] ${theme === 'dark' ? 'bg-purple-600/30' : 'bg-blue-200/50'
                        }`}
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                        scale: [1.1, 1, 1.1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className={`absolute bottom-1/4 -right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-[120px] ${theme === 'dark' ? 'bg-blue-600/30' : 'bg-purple-200/50'
                        }`}
                />
                <motion.div
                    animate={{
                        x: [-50, 50, -50],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] rounded-full blur-[120px] ${theme === 'dark' ? 'bg-indigo-600/20' : 'bg-indigo-100/40'
                        }`}
                />
            </div>

            <div className="max-w-7xl mx-auto px-0 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    // @ts-ignore
                    transition={springConfig}
                    className="text-center mb-12 sm:mb-16 px-4"
                >
                    <motion.div
                        className="inline-block mb-8 sm:mb-10"
                        style={{ rotate: imageRotation }}
                        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    >
                        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto relative">
                            <img
                                src="steel-flower.webp"
                                alt="Steel Flower"
                                className="w-full h-full object-contain drop-shadow-2xl"
                                style={{
                                    filter: `drop-shadow(0 20px 40px ${theme === 'dark' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(99, 102, 241, 0.5)'})`
                                }}
                            />
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        // @ts-ignore
                        transition={{ delay: 0.2, ...springConfig }}
                        className={`text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
                            }`}
                    >
                        TECH STACK & TOOLS
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        // @ts-ignore
                        transition={{ delay: 0.3, ...springConfig }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 px-4"
                    >
                        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Full Stack </span>
                        <span className="bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent italic">
                            Tools
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        // @ts-ignore
                        transition={{ delay: 0.4, ...springConfig }}
                        className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                    >
                        A comprehensive collection of technologies and tools I use to build modern, scalable web applications.
                    </motion.p>
                </motion.div>

                <div
                    ref={skillsRef}
                    className="relative flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mb-20 sm:mb-24 md:mb-28 min-h-[300px] sm:min-h-[400px] px-4"
                >
                    {techIcons.map((tech, index) => {
                        const scatterPos = generateScatterPosition(index);

                        return (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.3 }}
                                animate={
                                    isScattered
                                        ? {
                                            opacity: 0.4,
                                            scale: 0.6,
                                            x: scatterPos.x,
                                            y: scatterPos.y,
                                            rotate: scatterPos.rotate,
                                        }
                                        : {
                                            opacity: 1,
                                            scale: 1,
                                            x: 0,
                                            y: 0,
                                            rotate: 0,
                                        }
                                }

                                whileHover={{
                                    scale: 1.15,
                                    rotate: 3,
                                    y: -8,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 15
                                    }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-xl sm:text-2xl md:text-3xl shadow-lg cursor-pointer relative group backdrop-blur-sm border ${theme === 'dark' ? 'border-white/20' : 'border-white/30'
                                    } transition-shadow duration-300`}
                                style={{
                                    willChange: 'transform',
                                    // @ts-ignore
                                    backfaceVisibility: 'hidden',
                                    WebkitFontSmoothing: 'antialiased',
                                }}
                            >
                                <div className="text-white">
                                    {tech.icon}
                                </div>
                                <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-2xl ${theme === 'dark'
                                    ? 'bg-gray-900/95 text-white border border-gray-700 backdrop-blur-sm'
                                    : 'bg-white/95 text-gray-900 border border-gray-200 backdrop-blur-sm'
                                    }`}>
                                    {tech.name}
                                    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
                                        }`}></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-10 sm:mt-12 md:mt-14 w-full px-0">
                    <div className="relative w-[250%] md:w-[400%] left-[-75%] md:left-[-150%]">
                        <div
                            className={`w-full h-12 sm:h-14 md:h-16 flex items-center overflow-hidden shadow-2xl mb-4 backdrop-blur-sm ${theme === 'dark'
                                ? 'bg-gradient-to-r from-purple-800/95 via-pink-700/95 to-purple-800/95'
                                : 'bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700'
                                } border-t ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-400/30'} border-b ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-400/30'}`}
                            style={{
                                transform: 'rotateZ(-3deg) rotateY(-2deg)',
                                // @ts-ignore
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            <motion.div
                                className="flex whitespace-nowrap"
                                animate={{ x: ['0%', '-50%'] }}
                                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                            >
                                {[...ribbonTexts[0], ...ribbonTexts[0], ...ribbonTexts[0], ...ribbonTexts[0]].map((text, i) => (
                                    <span key={i} className="text-white font-bold text-sm sm:text-base md:text-lg mx-4 sm:mx-6 md:mx-8 tracking-wider flex items-center">
                                        <span className="mr-2 text-lg">✨</span> {text} <span className="text-white/70 mx-2">•</span>
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <div className="relative w-[250%] md:w-[400%] left-[-75%] md:left-[-150%]">
                        <div
                            className={`w-full h-12 sm:h-14 md:h-16 flex items-center overflow-hidden shadow-2xl backdrop-blur-sm ${theme === 'dark'
                                ? 'bg-gradient-to-r from-indigo-800/95 via-blue-700/95 to-indigo-800/95'
                                : 'bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-700'
                                } border-t ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-400/30'} border-b ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-400/30'}`}
                            style={{
                                transform: 'rotateZ(3deg) rotateY(2deg)',
                                // @ts-ignore
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            <motion.div
                                className="flex whitespace-nowrap"
                                animate={{ x: ['-50%', '0%'] }}
                                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                            >
                                {[...ribbonTexts[1], ...ribbonTexts[1], ...ribbonTexts[1], ...ribbonTexts[1]].map((text, i) => (
                                    <span key={i} className="text-white font-bold text-sm sm:text-base md:text-lg mx-4 sm:mx-6 md:mx-8 tracking-wider flex items-center">
                                        <span className="mr-2 text-lg">⚡</span> {text} <span className="text-white/70 mx-2">•</span>
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
