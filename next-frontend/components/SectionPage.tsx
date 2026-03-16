"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SectionPageProps {
    children: React.ReactNode;
    className?: string;
}

const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
};

const SectionPage = ({ children, className = '' }: SectionPageProps) => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`min-h-screen pb-28 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default SectionPage;
