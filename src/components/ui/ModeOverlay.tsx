"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrambleText } from "@/components/effects/ScrambleText"; // Imported

interface ModeOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ModeOverlay({ isOpen, onClose }: ModeOverlayProps) {
    const { language } = useLanguage();
    const isJa = language === "ja";

    const menuItems = [
        {
            id: "01",
            ja: "ツアー",
            en: "TOURS",
            href: "/tours",
            active: true
        },
        {
            id: "02",
            ja: "外国語ガイド養成講座",
            en: "ACADEMY",
            href: "https://www.google.com", // Placeholder
            active: true,
            external: true
        },
        {
            id: "03",
            ja: "映像制作・企画",
            en: "VIDEO / CONSULTATION",
            href: "/creative",
            active: false
        },
        {
            id: "04",
            ja: "メディア戦略",
            en: "PLAN & STRATEGY",
            href: "/media",
            active: false
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] pointer-events-none">
                    {/* Full Screen Terminal Expansion */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md pointer-events-auto overflow-hidden"
                        initial={{ clipPath: "inset(0 100% 100% 0)" }} // Reveal from Top-Left
                        animate={{ clipPath: "inset(0 0% 0% 0)" }}
                        exit={{ clipPath: "inset(0 100% 100% 0)", transition: { duration: 0.3 } }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Exponential ease
                    >
                        {/* Digital Smoke / Noise Background */}
                        <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-scanline opacity-10" />

                        {/* Grid Lines Integration */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4ade80_1px,transparent_1px),linear-gradient(to_bottom,#4ade80_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />

                        {/* Content Container - Aligned with HUD */}
                        <div className="relative z-10 w-full h-full flex flex-col p-8 md:p-16 pt-32 md:pt-40">
                            {/* Decorative Header Line */}
                            <motion.div
                                className="w-full h-[1px] bg-green-400/50 mb-8 origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            />

                            <div className="flex flex-col gap-6 w-full max-w-2xl">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 + (index * 0.1), duration: 0.3 }}
                                    >
                                        {item.active ? (
                                            <Link
                                                href={item.href}
                                                target={item.external ? "_blank" : undefined}
                                                className="group block"
                                                onClick={onClose}
                                            >
                                                <div className="flex items-baseline gap-4 pb-2 border-b border-white/5 hover:border-green-400/50 transition-all duration-300">
                                                    <span className="text-green-400 font-mono-tech text-xs tracking-wider opacity-60 group-hover:opacity-100">
                                                        [{item.id}]
                                                    </span>
                                                    <span className="text-white font-mono-tech text-2xl md:text-4xl group-hover:text-green-400 transition-colors uppercase tracking-widest">
                                                        <ScrambleText
                                                            text={isJa ? item.ja : item.en}
                                                            trigger={isJa ? "ja" : "en"}
                                                        />
                                                    </span>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div className="group block pointer-events-none opacity-40">
                                                <div className="flex items-baseline gap-4 pb-2 border-b border-white/5">
                                                    <span className="text-white/30 font-mono-tech text-xs tracking-wider">
                                                        [{item.id}]
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="text-white/30 font-mono-tech text-2xl md:text-4xl uppercase tracking-widest">
                                                            <ScrambleText
                                                                text={isJa ? item.ja : item.en}
                                                                trigger={isJa ? "ja" : "en"}
                                                            />
                                                        </span>
                                                        <span className="text-[10px] font-mono-tech text-white/20 tracking-widest mt-1">
                                                            // ACCESS DENIED
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
