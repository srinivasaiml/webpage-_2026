"use client";

import React, { useRef, useState, MouseEvent, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, ExternalLink, Calendar, Plus } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  image: string;
  url: string;
  date: string;
  skills: string[];
}

const certificates: Certificate[] = [
  {
    title: "HackerRank Certification",
    issuer: "HackerRank",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    url: "https://www.hackerrank.com/certificates/a67a507bbd1a",
    date: "2025",
    skills: ["Algorithms", "Data Structures"],
  },
  {
    title: "Great Learning Data Science",
    issuer: "Great Learning",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    url: "https://drive.google.com/file/d/1VMkkM0XFqum1I4sv552KuY4PzFNPlCMb/view?usp=sharing",
    date: "2024",
    skills: ["Python", "Machine Learning"],
  },
  {
    title: "Competitive Programming",
    issuer: "CodeChef",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    url: "#",
    date: "2024",
    skills: ["Logic", "Optimization"],
  },
  {
    title: "Enterprise Solutions",
    issuer: "Infosys",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    url: "https://drive.google.com/file/d/1fQEyayq5imG44u7ht03QBnXhdr3Fa60y/view?usp=sharing",
    date: "2023",
    skills: ["Java", "Agile Methods"],
  },
  {
    title: "Computer Science Intro",
    issuer: "EdX",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    url: "https://drive.google.com/file/d/1JibIVO86o-5LLU3J5wcjbdEFQzdXG93H/view?usp=sharing",
    date: "2023",
    skills: ["Python", "CS Theory"],
  },
];

const TiltBox = ({ cert, index }: { cert: Certificate; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  const [isHovered, setIsHovered] = useState(false);

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
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
      style={{ perspective: "1500px" }}
      className="relative w-full h-[440px] z-1"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative rounded-[32px] cursor-pointer group"
        onClick={() => {
          if (cert.url && cert.url !== "#") window.open(cert.url, "_blank");
        }}
      >
        {/* Main Background Image + Container */}
        <div 
          className="absolute inset-0 rounded-[32px] overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] dark:shadow-2xl transition-all duration-500 ease-out group-hover:border-violet-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)]"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Base image */}
          <div className="absolute inset-0 w-full h-full scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover opacity-90 dark:opacity-80"
              loading="lazy"
            />
          </div>
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-slate-950/20 to-slate-950/95" />
          <div className="absolute inset-0 bg-violet-900/10 mix-blend-overlay group-hover:bg-violet-600/20 transition-colors duration-500" />
        </div>

        {/* 3D Content (Glassmorphism layer popping out) */}
        <div
          style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
          className="absolute inset-0 p-7 flex flex-col justify-between pointer-events-none"
        >
          {/* Top section */}
          <div className="flex justify-between items-start" style={{ transformStyle: "preserve-3d" }}>
            <div
              style={{ transform: "translateZ(40px)" }}
              className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
            >
              <Award className="w-6 h-6 text-white drop-shadow-md" />
            </div>

            <div
              style={{ transform: "translateZ(30px)" }}
              className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-xs font-bold text-white tracking-widest">{cert.date}</span>
            </div>
          </div>

          {/* Bottom section */}
          <div style={{ transformStyle: "preserve-3d" }}>
            {/* Content box / Glassmorphism Panel */}
            <div
              style={{ transform: "translateZ(50px)" }}
              className="w-full rounded-2xl p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden relative"
            >
              {/* Internal glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-500/30 rounded-full blur-2xl group-hover:bg-violet-400/40 transition-colors" />
              
              <div className="relative z-10">
                <p className="text-violet-300 font-bold text-xs uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                  {cert.issuer}
                </p>
                <h3 className="text-2xl font-black text-white leading-tight mb-4 drop-shadow-lg line-clamp-2">
                  {cert.title}
                </h3>
              </div>

              {/* Skills badges */}
              <div className="relative z-10 flex flex-wrap gap-2 mb-4">
                {cert.skills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-md bg-white/15 border border-white/10 text-[10px] uppercase tracking-wider text-white font-bold shadow-sm">
                    {s}
                  </span>
                ))}
              </div>

              {/* Action row */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                {cert.url && cert.url !== "#" ? (
                  <div className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    <span>View Detail</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">Preview N/A</span>
                )}
                
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors backdrop-blur-md">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Certificates() {
  return (
    <section 
      id="certificates" 
      className="relative w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 md:py-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Light Mode: Warm Amber and soft Emerald */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-amber-100/60 rounded-full blur-[120px] dark:hidden" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-50/70 rounded-full blur-[100px] dark:hidden" />
        
        {/* Dark Mode: Electric Blue and deep Crimson */}
        <div className="hidden dark:block absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="hidden dark:block absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-crimson-900/15 rounded-full blur-[130px] dark:bg-rose-950/20" />
        
        {/* Subtle texture grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="max-w-[1240px] mx-auto mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6 dark:bg-violet-500/20">
              <Award className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-700 dark:text-violet-300">
                Credentials
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-slate-950 dark:text-white font-playfair italic leading-[1.1]">
              Professional<br />
              <span className="bg-linear-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent not-italic">
                Certifications
              </span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:w-5/12 ml-auto"
          >
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Showcasing continuous learning and validated expertise across modern software engineering domains through interactive 3D visualizations.
            </p>
          </motion.div>
        </div>

        {/* 3D Grid */}
        <div className="max-w-[1240px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {certificates.map((cert, i) => (
              <TiltBox key={cert.title} cert={cert} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
