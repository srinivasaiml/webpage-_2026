"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function FloatingParticles({ color = "rgba(139, 92, 246, 0.5)" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 20); // Responsive particle count
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Replace opacity if color is rgba or rgb
        let fillColor = color;
        if (color.startsWith('rgba')) {
            fillColor = color.replace(/[\d.]+\)$/g, `${particle.opacity})`);
        } else if (color.startsWith('rgb(')) {
            fillColor = color.replace('rgb(', 'rgba(').replace(')', `, ${particle.opacity})`);
        }
        
        ctx.fillStyle = fillColor;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
    
    resizeCanvas();
    createParticles();
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-40"
    />
  );
}
