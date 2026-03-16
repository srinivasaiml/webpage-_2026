"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

const SmoothScroll: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 1.5,
            lerp: 0.1,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        lenis.scrollTo(0, { immediate: true });

        // @ts-ignore
        window.lenis = lenis;

        return () => {
            lenis.destroy();
            // @ts-ignore
            window.lenis = null;
        };
    }, [pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
