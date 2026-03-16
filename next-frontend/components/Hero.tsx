"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Zap, Globe, Layers } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Logos3 } from "./logos3";

type Point = { x: number; y: number };
interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const featurePills = [
  { icon: Globe,  label: "Immersive Web Interfaces" },
  { icon: Zap,    label: "Responsive Motion & Animations" },
  { icon: Code2,  label: "High-Performance Applications" },
  { icon: Layers, label: "Real-World Software Solutions" },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const resolveColor = (variables: string[], alpha = 1) => {
        const tempEl = document.createElement("div");
        tempEl.style.cssText = "position:absolute;visibility:hidden;width:1px;height:1px;";
        document.body.appendChild(tempEl);
        let color = `rgba(255,255,255,${alpha})`;
        for (const variable of variables) {
          const value = rootStyles.getPropertyValue(variable).trim();
          if (value) {
            tempEl.style.backgroundColor = `var(${variable})`;
            const computed = getComputedStyle(tempEl).backgroundColor;
            if (computed && computed !== "rgba(0, 0, 0, 0)") {
              if (alpha < 1) {
                const m = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                color = m ? `rgba(${m[1]},${m[2]},${m[3]},${alpha})` : computed;
              } else {
                color = computed;
              }
              break;
            }
          }
        }
        document.body.removeChild(tempEl);
        return color;
      };

      return {
        backgroundTop: resolveColor(["--background"], 1),
        backgroundBottom: resolveColor(["--muted", "--background"], 0.95),
        wavePalette: [
          { offset: 0,              amplitude: 70, frequency: 0.003,  color: resolveColor(["--primary"], 0.8),               opacity: 0.45 },
          { offset: Math.PI / 2,   amplitude: 90, frequency: 0.0026, color: resolveColor(["--accent", "--primary"], 0.7),    opacity: 0.35 },
          { offset: Math.PI,       amplitude: 60, frequency: 0.0034, color: resolveColor(["--secondary","--foreground"], 0.65), opacity: 0.3 },
          { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: resolveColor(["--primary-foreground","--foreground"], 0.25), opacity: 0.25 },
          { offset: Math.PI * 2,   amplitude: 55, frequency: 0.004,  color: resolveColor(["--foreground"], 0.2),             opacity: 0.2 },
        ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();
    const observer = new MutationObserver(() => { themeColors = computeThemeColors(); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = reduced ? 10 : 70;
    const influenceRadius = reduced ? 160 : 320;
    const smoothing = reduced ? 0.04 : 0.1;

    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const recenterMouse = () => {
      const c = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = c;
      targetMouseRef.current = c;
    };

    resizeCanvas();
    recenterMouse();
    window.addEventListener("resize", () => { resizeCanvas(); recenterMouse(); });
    window.addEventListener("mousemove", (e) => { targetMouseRef.current = { x: e.clientX, y: e.clientY }; });
    window.addEventListener("mouseleave", recenterMouse);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y = canvas.height / 2
          + Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude
          + Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45)
          + mouseEffect;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time++;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, themeColors.backgroundTop);
      grad.addColorStop(1, themeColors.backgroundBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      themeColors.wavePalette.forEach(drawWave);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Reactive canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/8 blur-[130px]" />
        <div className="absolute top-1/2 left-1/4 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-purple-500/6 blur-[120px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-20 md:py-28 text-center sm:px-6 md:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center gap-6 md:gap-8"
        >

          {/* Eyebrow badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-4 py-1.5 md:px-5 md:py-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] text-foreground/60 backdrop-blur-md dark:border-border/40 dark:bg-background/50">
              <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5 text-violet-500" aria-hidden="true" />
              Reactive Canvas Developer | Full‑Stack Engineer
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="space-y-1 md:space-y-2">
            <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
              Patchipala
            </h1>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
              <span className="bg-linear-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Srinivas
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg dark:text-foreground/70"
          >
            Building modern digital experiences through{" "}
            <span className="font-semibold text-foreground/90">clean code</span>,{" "}
            <span className="font-semibold text-foreground/90">intelligent system design</span>, and{" "}
            <span className="font-semibold text-foreground/90">interactive user interfaces</span>.
            I focus on creating applications that are fast, scalable, and visually engaging.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="group gap-2 rounded-full bg-violet-600 px-8 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-violet-500/30 hover:bg-violet-700 hover:shadow-violet-500/40 transition-all duration-300"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border/40 bg-background/50 px-8 text-sm font-semibold uppercase tracking-widest text-foreground/70 backdrop-blur-md hover:border-violet-500/40 hover:bg-violet-500/5 hover:text-foreground transition-all duration-300"
            >
              Download Resume
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {featurePills.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-foreground/65 backdrop-blur-md dark:border-border/30 dark:bg-background/40 whitespace-nowrap hover:border-violet-500/30 hover:text-foreground transition-colors duration-200 cursor-default"
              >
                <Icon className="h-3 w-3 text-violet-500/80 shrink-0" aria-hidden="true" />
                {label}
              </motion.li>
            ))}
          </motion.ul>

          {/* Tech stack marquee */}
          <motion.div
            variants={fadeIn}
            className="w-full pt-8 opacity-70 hover:opacity-100 transition-opacity duration-500"
          >
            <Logos3 heading="Tech Stack & Tools" />
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-11 bg-linear-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
}
