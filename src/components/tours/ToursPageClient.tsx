"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BIOSLanguageSwitcher } from "@/components/ui/BIOSLanguageSwitcher";
import { VisualEffectsProvider } from "@/contexts/VisualEffectsContext";
import GlobalVisualEffects from "@/components/GlobalVisualEffects";

export function ToursPageClient({ lang }: { lang: 'en' | 'ja' }) {
    const currentLang = lang;

    return (
        <VisualEffectsProvider>
            <GlobalVisualEffects />
            <BIOSLanguageSwitcher />

            <main className="min-h-screen bg-black">
                {/* Back to Console Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="fixed top-8 left-8 z-50 pointer-events-auto"
                >
                    <Link href={`/${currentLang}`} className="text-white/50 hover:text-green-400 font-mono-tech text-xs tracking-widest transition-colors flex items-center gap-2">
                        <span>←</span> BACK
                    </Link>
                </motion.div>

                <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-6xl text-white font-serif mb-8">Tours</h1>
                    <p className="text-white/60 mb-8">
                        Experience Tokyo through the lens of a local.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Placeholder for Tour Items */}
                        <div className="aspect-[4/5] bg-white/5 border border-white/10 p-6 flex flex-col justify-end">
                            <h3 className="text-xl text-white font-serif mb-2">Neon & Shadows</h3>
                            <p className="text-white/50 text-sm">Shinjuku / Kabukicho</p>
                        </div>
                    </div>
                </div>
            </main>
        </VisualEffectsProvider>
    );
}
