"use client";

import React from "react";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { width: "150px" },
  default: { width: "196px" },
  lg: { width: "300px" },
};

interface PerspectiveBookProps {
  size?: "sm" | "default" | "lg";
  className?: string;
  children: React.ReactNode;
  textured?: boolean;
}

export function PerspectiveBook({
  size = "default",
  className = "",
  children,
  textured = false,
}: PerspectiveBookProps) {
  const defaultColorClasses =
    'bg-neutral-100 dark:bg-[#1f1f1f] dark:before:content-[""] dark:before:bg-linear-to-b dark:before:from-[#ffffff1a] dark:before:to-transparent dark:before:absolute dark:before:inset-0 dark:before:rounded-[inherit] text-primary';

  return (
    <div className="z-10 group perspective-distant w-min h-min border-none ring-0 outline-none">
      <div
        style={{
          width: sizeMap[size].width,
          borderRadius: "6px 4px 4px 6px",
        }}
        className="transition-transform duration-500 ease-out relative transform-3d transform-[rotateY(-5deg)] group-hover:transform-[rotateY(-25deg)] aspect-49/60"
      >
        {/* Back Cover */}
        <div
          className={cn(
             "absolute inset-0 size-full left-0 flex flex-col p-[12%] border-none",
             className || defaultColorClasses
          )}
          style={{
            transform: "translateZ(-24px)",
            borderRadius: "6px 4px 4px 6px",
          }}
        />

        {/* Pages (Block) */}
        <div
            className="absolute top-[2%] bottom-[2%] right-[2%] bg-white dark:bg-neutral-200 border-y border-r border-neutral-300 dark:border-neutral-400"
            style={{
                left: "25px",
                transform: "translateZ(0px)",
                background: "repeating-linear-gradient(90deg, #fff, #fff 2px, #f0f0f0 3px, #f0f0f0 4px)",
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
            }}
        />

        {/* Spine (Left Edge) */}
        <div
          className="absolute left-0 top-0 h-full w-[48px] origin-left bg-neutral-300 dark:bg-[#151515]"
          style={{
            transform: "rotateY(-90deg) translateZ(0px)",
            boxShadow: "inset -5px 0 15px rgba(0,0,0,0.3)",
          }}
        />

        {/* Front Cover (Animated) */}
        <div
          className={cn(
            "absolute inset-y-0 overflow-hidden size-full left-0 flex flex-col p-[12%] transition-transform duration-500 ease-out origin-left transform-3d group-hover:transform-[rotateY(-110deg)] z-20 after:content-[''] after:absolute after:inset-0 after:shadow-[0_1.8px_3.6px_#0000000d,0_10.8px_21.6px_#00000014,inset_0_-.9px_#0000001a,inset_0_1.8px_1.8px_#ffffff1a,inset_3.6px_0_3.6px_#0000001a] after:pointer-events-none after:rounded-[inherit] after:border-[#00000014] after:border after:border-solid",
            className || defaultColorClasses,
          )}
          style={{
            transform: "translateZ(24px)",
            borderRadius: "6px 4px 4px 6px",
          }}
        >
          <div
            className="absolute left-0 top-0 h-full opacity-40"
            style={{
              minWidth: "8.2%",
              background:
                "linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0) 12%, hsla(0, 0%, 100%, .25) 29.25%, hsla(0, 0%, 100%, 0) 50.5%, hsla(0, 0%, 100%, 0) 75.25%, hsla(0, 0%, 100%, .25) 91%, hsla(0, 0%, 100%, 0)), linear-gradient(90deg, rgba(0, 0, 0, .03), rgba(0, 0, 0, .1) 12%, transparent 30%, rgba(0, 0, 0, .02) 50%, rgba(0, 0, 0, .2) 73.5%, rgba(0, 0, 0, .5) 75.25%, rgba(0, 0, 0, .15) 85.25%, transparent)",
            }}
          >
          </div>
          <div className="pl-1 h-full z-10">
            {children}
          </div>
          {textured && (
            <div
              className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("https://www.transparenttextures.com/patterns/old-mathematics.png")`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
