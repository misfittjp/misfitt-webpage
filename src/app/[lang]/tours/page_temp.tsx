"use client";

import React, { use } from 'react'; // Added import
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"; // Assuming this exists or will be replaced

export default function ToursPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(params);
    const currentLang = lang === 'en' ? 'en' : 'ja';

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Back to Console Navigation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="fixed top-6 left-6 z-50 mix-blend-difference"
            >
                <Link
                    href={`/${currentLang}`}
                    className="group flex items-center gap-3 px-5 py-2 hover:bg-white/10 rounded-full transition-all"
                >
                    <span className="text-white/60 group-hover:text-white transition-colors">
                        ←
                    </span>
                    <span className="text-[10px] md:text-xs font-mono-tech tracking-widest text-white/60 group-hover:text-white transition-colors uppercase">
                        BACK TO MAIN CONSOLE
                    </span>
                </Link>
            </motion.div>

            {/* Placeholder Content */}
            <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
                <h1 className="text-4xl md:text-6xl font-serif mb-6">Tours</h1>
                <p className="text-white/60 font-mono-tech tracking-wider">
                    UNDER CONSTRUCTION
                </p>
            </div>
        </main>
    );
}
