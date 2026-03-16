"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Timeline } from './ui/timeline';
import { Briefcase, Trophy, Flame } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Experience = () => {
    const { theme } = useTheme();
    const experiences = [
        {
            title: '2025',
            company: 'Aditya University',
            event: 'Software Engineer Intern',
            type: 'internship',
            duration: 'May 2025 – Jun 2025',
            location: 'Smart Library Seat Management System',
            description: 'Led end-to-end development of a Smart Library Seat Management System at Aditya University. Engineered a full-stack seat reservation platform using Node.js, Express, and MongoDB as the backbone, with a responsive React frontend. Designed real-time seat tracking with WebSockets to reflect live availability across floors. Implemented QR-code-based check-in and optimized the seat allocation algorithm, improving overall seat utilization by 25% within the first month of deployment.',
            highlights: ['Real-time seat tracking via WebSockets', 'QR-code check-in integration', '25% improvement in seat utilization', 'Responsive React dashboard'],
            skills: ['Node.js', 'Express', 'MongoDB', 'React', 'WebSockets', 'JavaScript'],
            gradient: 'from-violet-600 to-fuchsia-600',
        },
        {
            title: '2024',
            company: 'proTreX',
            event: 'AI/ML Workshop',
            type: 'workshop',
            duration: 'Aug 2024',
            location: 'Tech Conference, Hyderabad',
            description: 'Participated in an intensive AI/ML workshop organized by proTreX, covering the latest advancements in deep learning, large language models, and computer vision. Worked on hands-on sessions involving model fine-tuning, neural network architecture design, and real-world AI application deployment. Collaborated with industry engineers to understand production AI pipelines and MLOps best practices.',
            highlights: ['Deep learning & LLM fundamentals', 'Computer vision hands-on sessions', 'MLOps pipeline design', 'Industry mentorship & networking'],
            skills: ['Machine Learning', 'Neural Networks', 'Computer Vision', 'AI', 'Python'],
            gradient: 'from-pink-600 to-red-600',
        },
        {
            title: '2023',
            company: 'Veda Symposium',
            event: 'Treasure Hunt Winner',
            type: 'achievement',
            duration: 'Oct 2023',
            location: 'National Level — Inter-College',
            description: 'Secured 1st place in the national-level technical Treasure Hunt at Veda Symposium 2023. The competition involved multilayered problem sets spanning data structures, cryptographic puzzles, and real-time coding challenges under strict time pressure. Coordinated effectively with the team to decode clues, distribute tasks strategically, and outpace competing teams across 5 elimination rounds.',
            highlights: ['1st place — national level', '5 elimination rounds completed', 'Cryptographic & DSA challenges', 'Team coordination under pressure'],
            skills: ['Problem Solving', 'Data Structures', 'Algorithms', 'Cryptography', 'Teamwork'],
            gradient: 'from-emerald-600 to-teal-600',
        },
        {
            title: '2023',
            company: 'Appleton Innovations',
            event: 'IoT & ML Workshop',
            type: 'workshop',
            duration: 'Jul 2023',
            location: 'Seminar, Visakhapatnam',
            description: 'Attended a focused workshop on IoT and Machine Learning by Appleton Innovations, gaining practical exposure to sensor networks, edge computing, and intelligent device design. Built small IoT prototypes using Arduino and Raspberry Pi, and integrated basic ML inference models for real-time data classification. Explored communication protocols like MQTT and HTTP in the context of smart device ecosystems.',
            highlights: ['Arduino & Raspberry Pi prototyping', 'MQTT / HTTP IoT protocols', 'Edge ML inference integration', 'Smart device ecosystem design'],
            skills: ['IoT', 'Arduino', 'Raspberry Pi', 'MQTT', 'Machine Learning', 'Embedded Systems'],
            gradient: 'from-blue-600 to-purple-600',
        }
    ];

    const data = experiences.map((exp) => ({
        title: exp.title,
        content: (
            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xl hover:scale-[1.01] transition-transform duration-300">
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${exp.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
                        {exp.type === 'internship' ? <Briefcase size={20} /> : exp.type === 'achievement' ? <Trophy size={20} /> : <Flame size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                            {exp.event}
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase text-xs mt-1">
                            {exp.company}
                        </p>
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                📅 {exp.duration}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                📍 {exp.location}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-slate-700 dark:text-slate-300 mb-5 leading-relaxed text-sm md:text-base">
                    {exp.description}
                </p>

                {/* Highlights */}
                {exp.highlights && (
                    <ul className="mb-5 space-y-1.5">
                        {exp.highlights.map((h: string) => (
                            <li key={h} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <span className={`mt-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${exp.gradient} flex-shrink-0 mt-1.5`} />
                                {h}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        )
    }));

    return (
        <section id="experience" className="relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 -z-10">
                {/* Modern Background for Light Mode */}
                {theme !== 'dark' && (
                    <>
                        <div className="absolute inset-0 bg-slate-50" />
                        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.18)_0,transparent_70%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
                    </>
                )}
                {/* Dark mode */}
                <div className="absolute inset-0 hidden dark:block bg-linear-to-br from-slate-950 via-slate-900 to-violet-950/30" />
                <div
                    className="absolute inset-0 hidden dark:block"
                    style={{
                        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 50%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 50%, transparent 100%)',
                    }}
                />
                {/* Floating orbs */}
                <div className={`absolute top-20 right-10 w-72 h-72 ${theme === 'dark' ? 'bg-orange-500/5' : 'bg-orange-400/10'} rounded-full blur-3xl`} />
                <div className={`absolute bottom-40 left-0 w-96 h-96 ${theme === 'dark' ? 'bg-violet-500/5' : 'bg-violet-400/10'} rounded-full blur-3xl`} />
            </div>
            <Timeline data={data} />
        </section>
    );
};

export default Experience;
