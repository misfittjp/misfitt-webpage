"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrambleTextProps {
    text: string;
    className?: string;
    trigger?: any; // Value to trigger the scramble (e.g., language)
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";

export function ScrambleText({ text, className = "", trigger }: ScrambleTextProps) {
    // Start with random characters to avoid flash of clean text
    const [displayText, setDisplayText] = useState(() =>
        text.split("").map(c => c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
    );
    const [isScrambling, setIsScrambling] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Start Scramble Effect when text or trigger changes
        let iteration = 0;
        const maxIterations = 10; // Number of scramble frames
        setIsScrambling(true);

        // Clear previous interval
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev => {
                if (iteration >= maxIterations) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setIsScrambling(false);
                    return text; // Final text
                }

                // Randomize characters
                return text
                    .split("")
                    .map((char, index) => {
                        if (char === " " || char === "\n") return char; // Preserve spaces/newlines
                        if (index < (iteration / maxIterations) * text.length) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("");
            });
            iteration += 1;
        }, 30); // Speed of scramble

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, trigger]);

    return (
        <span className={`relative leading-relaxed whitespace-pre-line ${className}`}>
            {displayText}

            {/* Scanline Overlay during scramble */}
            <AnimatePresence>
                {isScrambling && (
                    <motion.span
                        className="absolute inset-0 bg-green-400/20 pointer-events-none mix-blend-screen"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <motion.span
                            className="absolute top-0 left-0 w-full h-[2px] bg-green-400 shadow-[0_0_8px_#4ade80]"
                            animate={{ top: ["0%", "100%"] }}
                            transition={{ duration: 0.3, ease: "linear", repeat: 1 }}
                        />
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
}
