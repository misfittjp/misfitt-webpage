"use client";

import { motion } from "framer-motion";
import { businessAreas } from "@/data/home";
import Link from "next/link";

/**
 * Sequence 03: Business Areas - 4 Pillars
 * - The Context Walk
 * - The Forge
 * - The Frame
 * - The Signal
 * 
 * Hover: Focus marks appear
 */
export function BusinessAreas() {
    return (
        <section className="relative py-24 md:py-32 bg-tech-noir">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wider mb-4">
                        事業領域
                    </h2>
                    <p className="text-white/60 font-mono-tech text-sm tracking-widest">
                        DOMAIN MASTERY × CREATIVE EXECUTION
                    </p>
                </motion.div>

                {/* Grid of 4 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {businessAreas.map((area, index) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.7 }}
                        >
                            <Link href={area.link}>
                                <div className="group relative border border-white/20 bg-white/[0.02] hover:border-white/40 hover:bg-white/5 transition-all duration-300 p-8 md:p-10 h-full min-h-[280px] flex flex-col justify-between">
                                    {/* Focus Mark - appears on hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="text-white/30 font-mono-tech text-4xl tracking-widest">
                                            [  ]
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Number */}
                                        <div className="text-white/30 font-mono-tech text-xs mb-4">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        {/* Title & Subtitle */}
                                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-3 tracking-wide">
                                            {area.title}
                                        </h3>
                                        <p className="text-white/40 text-xs md:text-sm mb-4 tracking-wider font-mono-tech uppercase">
                                            {area.subtitle}
                                        </p>

                                        {/* Tagline (if exists) */}
                                        {area.tagline && (
                                            <p className="text-white/70 font-mono-tech text-xs italic tracking-widest mb-4">
                                                "{area.tagline}"
                                            </p>
                                        )}

                                        {/* Description */}
                                        <p className="text-white/60 text-sm leading-relaxed">
                                            {area.description}
                                        </p>
                                    </div>

                                    {/* Arrow indicator - Hide for indices 2 and 3 (Video/Media) */}
                                    {(index !== 2 && index !== 3) && (
                                        <div className="relative z-10 mt-6 flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors duration-300">
                                            <span className="font-mono-tech text-xs tracking-widest">
                                                LEARN MORE
                                            </span>
                                            <motion.span
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                →
                                            </motion.span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
