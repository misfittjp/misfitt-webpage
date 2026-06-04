"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlitchButtonProps {
    language: "en" | "ja";
    onClick: () => void;
}

export function GlitchButton({ language, onClick }: GlitchButtonProps) {
    const [glitchTrigger, setGlitchTrigger] = useState(0);

    // Random Glitch Interval (3-5s)
    useEffect(() => {
        const triggerGlitch = () => {
            setGlitchTrigger(prev => prev + 1);
            // Schedule next glitch
            const nextInterval = 3000 + Math.random() * 2000; // 3000 to 5000 ms
            timeoutId = setTimeout(triggerGlitch, nextInterval);
        };

        let timeoutId = setTimeout(triggerGlitch, 3000); // First glitch
        return () => clearTimeout(timeoutId);
    }, []);

    const text = language === "ja" ? "[ 起動 ]" : "[ START ]";

    return (
        <motion.button
            className="relative z-10 p-2 text-green-400 font-mono-tech text-sm tracking-[0.2em] transition-all duration-300 group cursor-crosshair" // Added cursor-crosshair
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: [0, -2, 2, 0], // Slight horizontal shake on trigger
                skewX: [0, 5, -5, 0], // Skew on trigger
                textShadow: ["0 0 0px #4ade80", "2px 0 5px #4ade80", "-2px 0 5px #4ade80", "0 0 0px #4ade80"] // Glitch glow
            }}
            // Only animate x/skew when glitchTrigger changes, we use key to force re-animation or use custom variants?
            // Better: use animate prop conditioned on glitchTrigger?
            // Actually, Framer Motion animate prop updates trigger animations.
            // Let's use a key to restart the localized animation? No, that remounts.
            // Let's use standard variants or just 'animate' values that depend on state?
            // Simple way: Flash effect.

            // Re-implementation: To achieve random glitch, we can use the 'animate' prop with a key that changes.
            key={glitchTrigger}
            transition={{ duration: 0.2, ease: "easeInOut" }}

            onClick={onClick}
        >
            <span className="relative z-10 flex items-center gap-1">
                {text}
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }} // Fixed easing
                    className="inline-block text-green-400 align-baseline"
                >
                    _
                </motion.span>
            </span>

            {/* Background Noise Effect on Hover */}
            <div className="absolute inset-0 bg-noise opacity-0 group-hover:opacity-10 mix-blend-overlay transition-opacity duration-300 pointer-events-none" />
        </motion.button>
    );
}
