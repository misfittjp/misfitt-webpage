"use client";

import { motion } from "framer-motion";
import { useVisualEffects } from "@/contexts/VisualEffectsContext";
import { useVisualEffectsStyles } from "@/hooks/useVisualEffectsStyles";

/**
 * Top Section - "Off the Script."
 * - Full screen with video background
 * - Only the title in the center
 * - HUD is active (visible)
 */
export function TopSection() {
    const { pp, f, iso } = useVisualEffects();
    const { filter, grainOpacity } = useVisualEffectsStyles(pp, f, iso);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Visual Effects Wrapper */}
            <div
                className="absolute inset-0 transition-all duration-300 ease-out"
                style={{
                    filter: `${filter} brightness(0.2) saturate(0.6)` // Match IntroFinal state
                }}
            >
                {/* Fallback Image (Always visible if video fails or loading) */}
                <div className="absolute inset-0">
                    <img
                        src="/images/intro/24.JPG"
                        alt="Hero"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Grain Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay transition-opacity duration-300"
                style={{
                    opacity: grainOpacity,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Noise Overlay (Base Texture) */}
            <div
                className="absolute inset-0 bg-tech-noir opacity-80 mix-blend-multiply z-[5] pointer-events-none"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'6.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
                }}
            />

            {/* Content: Title Only */}
            <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-wide">
                    Off the Script.
                </h1>
            </motion.div>
        </section>
    );
}
