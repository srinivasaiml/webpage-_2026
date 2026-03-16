"use client";

import { motion, Variants } from "framer-motion";

export function TextReveal({ text, className = "", textClassName = "", delay = 0 }: { text: string; className?: string, textClassName?: string, delay?: number }) {
  const words = text.split(" ");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay + 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 80, // Drop from further down
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.h1
      style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-flex", whiteSpace: "nowrap" }} className="mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span 
              variants={child} 
              key={`${wordIndex}-${charIndex}`} 
              className={textClassName}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
