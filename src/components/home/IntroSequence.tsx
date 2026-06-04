"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { exhibitionData } from "@/data/exhibitionData";
import { nationalities } from "@/data/home";
import { useVisualEffects } from "@/contexts/VisualEffectsContext";
import { useVisualEffectsStyles } from "@/hooks/useVisualEffectsStyles";
import { ScrambleText } from "@/components/effects/ScrambleText";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlitchButton } from "@/components/ui/GlitchButton";
import Image from "next/image";

interface IntroSequenceProps {
    onComplete?: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
    const { language } = useLanguage();
    const [hasSeenIntro, setHasSeenIntro] = useState(false);
    const [phase, setPhase] = useState<"button" | "burst" | "freeze" | "blackout" | "decoding_text" | "complete">("button");
    const [currentFrame, setCurrentFrame] = useState(0);
    const [finalVideo, setFinalVideo] = useState<string | null>(null);
    const [scrambleTrigger, setScrambleTrigger] = useState(false); // Perfect Decode Trigger

    const {
        setCoordinates,
        setIsIntroPlaying,
        setIsIntroComplete,
        restartTrigger,
        pp,
        f,
        iso,
        ss
    } = useVisualEffects();

    // Visual Effects Hook
    const { filter, grainOpacity } = useVisualEffectsStyles(pp, f, iso);

    // --- EFFECT: Restart Trigger ---
    useEffect(() => {
        if (restartTrigger > 0) {
            console.log("IntroSequence: Restart triggered", restartTrigger);
            setPhase("burst");
            setCurrentFrame(0);
            setHasSeenIntro(false);
            setFinalVideo(null);
            setScrambleTrigger(false);
            setIsIntroPlaying(true);
            setIsIntroComplete(false);
        }
    }, [restartTrigger, setIsIntroPlaying, setIsIntroComplete]);

    // --- EFFECT: Phase Management (Burst) ---
    useEffect(() => {
        if (phase === "burst") {
            setIsIntroPlaying(true);
            setIsIntroComplete(false);

            // Calculate Speed based on SS
            let fps = 24;
            if (ss <= 1) fps = 2;
            else if (ss <= 25) fps = 12;
            else if (ss <= 50) fps = 24;
            else fps = 48; // SS 100

            const intervalMs = 1000 / fps;
            const totalImages = exhibitionData.current.images.length; // 24 images

            // Generate shuffled indices for all images EXCEPT the last one (0-22)
            const indicesToShuffle = Array.from({ length: totalImages - 1 }, (_, i) => i);

            // Fisher-Yates Shuffle
            for (let i = indicesToShuffle.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indicesToShuffle[i], indicesToShuffle[j]] = [indicesToShuffle[j], indicesToShuffle[i]];
            }

            let step = 0;
            const maxSteps = indicesToShuffle.length + 5; // Add some buffer

            const burstTimer = setInterval(() => {
                if (step >= indicesToShuffle.length) {
                    clearInterval(burstTimer);
                    // Force final frame (index 23, "24.JPG")
                    setCurrentFrame(totalImages - 1);
                    setPhase("freeze"); // Go to Frozen State
                    return;
                }

                // Show next random image
                setCurrentFrame(indicesToShuffle[step]);

                // Random Coordinates for effect
                setCoordinates({
                    lat: (35.6 + Math.random() * 0.2).toFixed(4) + "° N",
                    lng: (139.6 + Math.random() * 0.3).toFixed(4) + "° E",
                    isAnimating: true,
                    isLocked: false
                });

                step++;
            }, intervalMs);

            return () => clearInterval(burstTimer);
        }
    }, [phase, ss, setCoordinates, setIsIntroPlaying, setIsIntroComplete]);

    // --- EFFECT: Freeze Phase (Step A -> Step B) ---
    useEffect(() => {
        if (phase === "freeze") {
            // Wait a moment in freeze state if needed, or immediately start blackout
            // Let's hold for 100ms to ensure render stability
            const timer = setTimeout(() => {
                setPhase("blackout");
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // Scroll Lock
    useEffect(() => {
        if (phase !== "complete") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [phase]);

    // Skip if somehow invalid state (though we reuse it)
    if (hasSeenIntro && phase === 'complete') return null;

    return (
        <AnimatePresence>
            {phase !== "complete" && (
                <motion.div
                    className="fixed inset-0 z-40 bg-tech-noir flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* BUTTON PHASE */}
                    {phase === "button" && (
                        <>
                            {/* Digital Grid Background */}
                            <motion.div
                                className="absolute inset-0 z-0 pointer-events-none opacity-20"
                                style={{
                                    backgroundImage: `linear-gradient(to right, #4ade80 1px, transparent 1px), linear-gradient(to bottom, #4ade80 1px, transparent 1px)`,
                                    backgroundSize: "40px 40px",
                                    maskImage: "radial-gradient(circle at center, black 60%, transparent 100%)"
                                }}
                                animate={{
                                    backgroundPosition: ["0px 0px", "40px 40px"],
                                    opacity: [0.15, 0.2, 0.15]
                                }}
                                transition={{
                                    backgroundPosition: { duration: 20, ease: "linear", repeat: Infinity },
                                    opacity: { duration: 4, ease: "easeInOut", repeat: Infinity }
                                }}
                            >
                                <div className="absolute inset-0 bg-scanline opacity-30 mix-blend-overlay" />
                            </motion.div>

                            <GlitchButton
                                language={language}
                                onClick={() => setPhase("burst")}
                            />
                        </>
                    )}

                    {/* BURST PHASE */}
                    {phase === "burst" && (
                        <div className="absolute inset-0">
                            {/* Image Layer with Visual Effects */}
                            <div className="absolute inset-0 transition-all duration-300 ease-out" style={{ filter }}>
                                {exhibitionData.current.images.map((src, idx) => (
                                    <div
                                        key={src}
                                        className={`absolute inset-0 transition-opacity duration-0 ${currentFrame === idx ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        <Image
                                            src={src}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            priority={idx < 5}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Grain Overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay transition-opacity duration-300"
                                style={{
                                    opacity: grainOpacity,
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                                }}
                            />
                        </div>
                    )}

                    {/* FINAL SEQUENCE: Freeze -> Blackout -> Decode */}
                    {(phase === "freeze" || phase === "blackout" || phase === "decoding_text") && (
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 1 }} // Already solid
                        >
                            {/* LAYER 0: The Frozen Image (Frame 24) */}
                            <motion.div
                                className="absolute inset-0 z-0"
                                style={{ filter }} // Keep global filter
                            >
                                <Image
                                    src={exhibitionData.current.images[23]}
                                    alt="Hero"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>

                            {/* LAYER 10: The Blackout Overlay (Step B) */}
                            {/* Starts at 0, animates to 1. ONLY triggers 'decoding_text' when complete. */}
                            {(phase === "blackout" || phase === "decoding_text") && (
                                <motion.div
                                    className="absolute inset-0 bg-black z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 2.0, ease: "easeInOut" }}
                                    onAnimationComplete={() => {
                                        if (phase === "blackout") {
                                            setPhase("decoding_text"); // Step C Trigger
                                            // Lock Coordinates
                                            setCoordinates({
                                                lat: "35.6839° N",
                                                lng: "139.7745° E",
                                                isAnimating: false,
                                                isLocked: true
                                            });
                                            setIsIntroPlaying(false);
                                            setIsIntroComplete(true);
                                            if (onComplete) onComplete();
                                        }
                                    }}
                                />
                            )}

                            {/* LAYER 20: Grain (Always on top of Black) */}
                            <div
                                className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
                                style={{
                                    opacity: grainOpacity,
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                                }}
                            />

                            {/* LAYER 30: Text Scramble (Step C) */}
                            {/* ONLY visible when phase is 'decoding_text' */}
                            {phase === "decoding_text" && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-30 p-4 text-center">
                                    <div className="relative flex flex-col items-center gap-2 md:gap-4">
                                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif tracking-wide text-white mix-blend-difference drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                            <ScrambleText
                                                text={language === 'ja' ? "オフ ザ スクリプト" : "Off the Script."}
                                                trigger={language}
                                            />
                                        </h1>
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-mono-tech tracking-widest text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] mt-2">
                                            <ScrambleText
                                                text={language === 'ja' ? "[ 物語を実装する ]" : "[ Implement the Story ]"}
                                                trigger={language}
                                            />
                                        </h2>
                                    </div>
                                </div>
                            )}

                            {/* LAYER 30: Scroll Indicator (Step C) */}
                            {phase === "decoding_text" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0.5] }}
                                    transition={{ delay: 1.0, duration: 2.0, times: [0, 0.8, 1] }} // Slight delay after text starts
                                    className="absolute bottom-[120px] left-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none mix-blend-difference w-auto"
                                    style={{ transform: "translateX(-50%)" }} // Center Guard
                                >
                                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                                    <div className="text-white/60 font-mono-tech text-[10px] tracking-[0.3em] uppercase whitespace-nowrap">
                                        Scroll
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
