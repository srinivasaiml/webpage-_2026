"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Logo = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
    logos: Logo[];
};

export function LogoCloud({ logos, className }: LogoCloudProps) {
    return (
        <div className={cn("relative w-full py-12 overflow-hidden", className)}>
            <div className="flex w-fit animate-marquee gap-12 px-12">
                {[...logos, ...logos].map((logo, idx) => (
                    <img
                        key={idx}
                        src={logo.src}
                        alt={logo.alt}
                        className="h-8 md:h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                ))}
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
        </div>
    );
}
