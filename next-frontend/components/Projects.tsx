"use client";

import React, { useRef, useState, useMemo, useCallback, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Award, Plus, Folder } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  demo: string | null;
  github: string | null;
  featured: boolean;
}

const projects: Project[] = [
  {
  title: "ChatWithAI",
  description: "AI-powered doctor appointment booking system with intelligent conversation flow.",
  image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800",
  tags: ["React", "AI/ML", "Node.js"],
  category: "2025",
  demo: "https://ai-smart-hp.netlify.app", // ✅ UPDATED
  github: null,
  featured: true,
},{
  title: "Library Management",
  description: "Comprehensive library management solution built for students and administrators.",
  image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
  tags: ["JavaScript", "HTML", "CSS"],
  category: "2025",
  demo: "https://adityasmartlibrary.netlify.app", // ✅ UPDATED
  github: "#",
  featured: false,
},
  {
    title: "AI Excel Assistant",
    description: "Edit, create, and manage Excel files using natural language commands — powered by AI.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["AI/ML", "React", "Excel API"],
    category: "2025",
    demo: "https://ai-excel.netlify.app/",
    github: null,
    featured: true,
  },
  {
    title: "8 Queen Chess Puzzle",
    description: "Strategic chess puzzle game with intelligent solving algorithms and interactive gameplay.",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&q=80&w=800",
    tags: ["JavaScript", "Algorithm", "Game Logic"],
    category: "2025",
    demo: "https://srinivasaiml.github.io/project/queen.html",
    github: null,
    featured: false,
  },
  {
    title: "Resume Analyzer Pro",
    description: "ATS-friendly resume analyzer with detailed feedback and scoring to optimize your CV.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "NLP", "Machine Learning"],
    category: "2024",
    demo: "https://srinivasaiml.github.io/project/Resumescore.html",
    github: null,
    featured: true,
  },
  {
    title: "Speed Tracker",
    description: "Real-time vehicle speed tracking system with GPS integration and live dashboard.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "GPS", "Real-time"],
    category: "2024",
    demo: "https://srinivasaiml.github.io/Codesoft/success.html",
    github: null,
    featured: false,
  },
  {
    title: "Cosmic Typing Game",
    description: "Fast-paced typing game to benchmark and improve your typing speed and accuracy.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&q=80&w=800",
    tags: ["JavaScript", "Game", "HTML5"],
    category: "2023",
    demo: "https://srinivasaiml.github.io/project/typinggame.html",
    github: null,
    featured: false,
  },
  {
    title: "Signature Generator",
    description: "Create beautiful digital signatures with a modern, intuitive UI and live preview.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    tags: ["JavaScript", "UI/UX", "HTML5"],
    category: "2023",
    demo: "https://srinivasaiml.github.io/project/uiux.html",
    github: null,
    featured: false,
  },
  {
    title: "Tic Tac Toe Game",
    description: "Classic Tic Tac Toe with interactive UI, smooth animations, and two-player mode.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=800",
    tags: ["JavaScript", "Game", "CSS3"],
    category: "2023",
    demo: "https://srinivasaiml.github.io/project/tictak.html",
    github: null,
    featured: false,
  },
];

const categories = ["All", "2025", "2024", "2023"];

const ProjectTiltBox = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  // Spotlight effect
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      style={{ perspective: "2000px" }}
      className="relative w-full h-[420px] sm:h-[500px] z-1"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        className="w-full h-full relative rounded-[40px] cursor-pointer group"
        onClick={() => {
          if (project.demo) window.open(project.demo, "_blank");
          else if (project.github && project.github !== "#") window.open(project.github, "_blank");
        }}
      >
        {/* Shadow Glow */}
        <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-[42px] blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-700" />

        {/* Main Background Image + Container */}
        <div 
          className="absolute inset-0 rounded-[40px] overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-700 ease-out group-hover:border-indigo-500/50"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Base image */}
          <div className="absolute inset-0 w-full h-full scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
              loading="lazy"
            />
          </div>
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/20 to-slate-950/95" />
          
          {/* Pro Max Spotlight Gradient */}
          <motion.div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{
              background: useTransform(
                [spotlightX, spotlightY],
                ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(99, 102, 241, 0.15) 0%, transparent 60%)`
              )
            }}
          />
        </div>

        {/* 3D Content popping out */}
        <div
          style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
          className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none"
        >
          {/* Top section */}
          <div className="flex justify-between items-start" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              style={{ transform: "translateZ(40px)" }}
              className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl group-hover:border-white/40 transition-colors"
            >
              <Folder className="w-6 h-6 text-white drop-shadow-lg" />
            </motion.div>

            <div
              style={{ transform: "translateZ(30px)" }}
              className="flex gap-2"
            >
              <div className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center shadow-lg">
                <span className="text-[11px] font-black text-white tracking-[0.2em] leading-none">{project.category}</span>
              </div>
              {project.featured && (
                <div className="px-4 py-1.5 rounded-full bg-linear-to-r from-yellow-400 to-orange-500 text-black border border-white/20 flex items-center shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-pulse">
                  <span className="text-[11px] font-black uppercase tracking-tight leading-none">Featured</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom section */}
          <div style={{ transformStyle: "preserve-3d" }}>
            {/* Project Box / Glassmorphism Panel */}
            <div
              style={{ transform: "translateZ(60px)" }}
              className="w-full rounded-[28px] p-6 bg-slate-950/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative group-hover:bg-slate-950/60 transition-colors duration-500"
            >
              {/* Internal glow line */}
              <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />
              
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-[10px] uppercase tracking-wider text-indigo-300 font-bold backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3 drop-shadow-2xl">
                  {project.title}
                </h3>
                <p className="text-slate-300/90 text-sm leading-relaxed mb-6 font-medium line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Action row */}
              <div className="relative z-10 pt-5 border-t border-white/5 flex items-center justify-between pointer-events-auto">
                <div className="flex gap-5">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-indigo-400 text-[11px] font-black uppercase tracking-[0.2em] hover:text-white transition-all transform hover:translate-x-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] hover:text-white transition-all transform hover:translate-x-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Repository</span>
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                
                <motion.div 
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all backdrop-blur-md shadow-inner border border-white/10"
                >
                  <Plus className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section 
      id="projects" 
      className="relative w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-[20%] w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] dark:bg-indigo-500/10" />
        <div className="absolute bottom-0 right-[20%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] dark:bg-purple-500/10" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-[1240px] mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 dark:bg-indigo-500/20">
              <Folder className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-700 dark:text-indigo-300">
                Portfolio
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-slate-950 dark:text-white font-playfair italic leading-tight mb-6">
              Featured<br />
              <span className="bg-linear-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent not-italic">
                Projects
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              A comprehensive showcase of my digital builds, integrating AI solutions, scalable systems, and interactive user experiences.
            </p>
          </motion.div>
        </div>

        {/* Filter */}
        <div className="max-w-[1240px] mx-auto mb-10 md:mb-12 flex justify-center px-4">
          <div className="flex flex-wrap justify-center p-1.5 bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-[20px] md:rounded-[24px] border border-slate-200 dark:border-white/10 shadow-sm gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                suppressHydrationWarning
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-[14px] text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-[1240px] mx-auto">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project, i) => (
                <ProjectTiltBox key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
