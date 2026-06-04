"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { introFrames, nationalities } from "@/data/home";
import { useVisualEffects } from "@/contexts/VisualEffectsContext";
import Image from "next/image";

/**
 * Sequence 01: "The Decoding" - Interactive Intro
 * 
 * Initial State: "PRESS TO DECODE" with focus mark [ ] on click
 * 
 * After Click:
 * - Text blinking: "LOADING... MISFITT"
 * - Progress bar below the text
 * - Country scroll: 52 nationalities scrolling vertically
 * - Photo burst: 24 frames flashing at 1/12 second intervals
 * - Coordinates animating in HUD (via context)
 * All happening simultaneously
 * 
 * Duration after click: 5.0 seconds
 * - Data Storm: 0.0s - 4.5s
 * - The Lock (Nihonbashi focus): 4.5s - 5.0s
 */

interface TheDecodingProps {
    onComplete: () => void;
}

export function TheDecoding({ onComplete }: TheDecodingProps) {
    const [hasStarted, setHasStarted] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [phase, setPhase] = useState<"initial" | "storm" | "lock" | "complete">("initial");
    const [progress, setProgress] = useState(0);
    const { startCoordinateAnimation, lockCoordinates, setCoordinates } = useVisualEffects();


    const handleStart = () => {
        if (hasStarted) return;
        setHasStarted(true);
        setPhase("storm");
        startCoordinateAnimation(); // Start coordinate animation
    };

    useEffect(() => {
        if (!hasStarted) return;

        // Generate random coordinates during the burst
        const coordinateInterval = setInterval(() => {
            const randomLat = (Math.random() * 170 - 85).toFixed(4); // -85 to 85
            const randomLon = (Math.random() * 360 - 180).toFixed(4); // -180 to 180
            const latDir = parseFloat(randomLat) >= 0 ? 'N' : 'S';
            const lonDir = parseFloat(randomLon) >= 0 ? 'E' : 'W';
            setCoordinates({
                lat: `${Math.abs(parseFloat(randomLat)).toFixed(4)}° ${latDir}`,
                lng: `${Math.abs(parseFloat(randomLon)).toFixed(4)}° ${lonDir}`,
                isAnimating: true,
                isLocked: false,
            });
        }, 200); // Change every 200ms

        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) return prev + (100 / 45); // 4.5s / 0.1s intervals
                return 100;
            });
        }, 100);

        // Photo burst: 24 frames over 5 seconds (208ms per frame)
        const frameInterval = setInterval(() => {
            setCurrentFrame((prev) => {
                if (prev < introFrames.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 5000 / 24); // ~208ms per frame

        // Switch to "lock" phase at 4.5s
        const lockTimer = setTimeout(() => {
            setPhase("lock");
            clearInterval(frameInterval);
            clearInterval(progressInterval);
            clearInterval(coordinateInterval);
            // Lock coordinates to final position (Tokyo)
            setCoordinates({
                lat: "35.6839° N",
                lng: "139.7745° E",
                isAnimating: false,
                isLocked: true,
            });
            lockCoordinates();
        }, 4500);

        // Complete at 5.0s
        const completeTimer = setTimeout(() => {
            setPhase("complete");
            setTimeout(() => {
                onComplete();
                // Save to localStorage that intro has been seen
                localStorage.setItem("misfitt_intro_seen", "true");
            }, 500); // Fade out duration
        }, 5000);

        return () => {
            clearInterval(frameInterval);
            clearInterval(progressInterval);
            clearInterval(coordinateInterval);
            clearTimeout(lockTimer);
            clearTimeout(completeTimer);
        };
    }, [hasStarted, onComplete, startCoordinateAnimation, lockCoordinates, setCoordinates]);



    return (
        <AnimatePresence>
            {phase !== "complete" && (
                <motion.div
                    className="fixed inset-0 z-40 bg-tech-noir flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Phase 0: Initial State - PRESS TO DECODE */}
                    {phase === "initial" && (
                        <motion.div
                            className="relative z-10 text-center cursor-pointer select-none"
                            onClick={handleStart}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-xl md:text-2xl font-mono-tech text-white/60 tracking-widest mb-8">
                                PRESS TO DECODE
                            </p>
                            {/* Focus Mark [ ] */}
                            <motion.div
                                className="w-32 h-32 md:w-40 md:h-40 mx-auto border-2 border-white/40 flex items-center justify-center"
                                animate={{
                                    borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.2)"],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <span className="text-6xl md:text-8xl text-white/40">[ ]</span>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Phase 1: Data Storm (0.0s - 4.5s) */}
                    {phase === "storm" && (
                        <>
                            {/* Background: Photo Burst */}
                            <div className="absolute inset-0">
                                {introFrames.map((frame, index) => (
                                    <motion.div
                                        key={frame.src}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: currentFrame === index ? 1 : 0
                                        }}
                                        transition={{ duration: 0.05 }}
                                    >
                                        <div
                                            className="w-full h-full relative"
                                            style={{
                                                filter: "grayscale(100%) contrast(125%)",
                                            }}
                                        >
                                            <Image
                                                src={frame.src}
                                                alt=""
                                                fill
                                                className="object-cover"
                                                style={{ objectPosition: frame.position }}
                                                priority={index < 5} // Preload first 5 images
                                                unoptimized
                                                quality={90}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Center: LOADING... MISFITT (blinking) + Progress Bar */}
                            <motion.div
                                className="relative z-10 text-center flex flex-col items-center gap-6"
                                animate={{
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <h1 className="text-4xl md:text-6xl font-mono-tech font-bold text-white tracking-widest">
                                    LOADING... MISFITT
                                </h1>

                                {/* Progress Bar */}
                                <div className="w-64 md:w-96 h-[1px] bg-white/20 relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-white"
                                        style={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                            </motion.div>

                            {/* Background: Country Scroll (vertical) */}
                            <motion.div
                                className="absolute left-0 top-0 h-full w-full flex flex-col items-start justify-start pl-8 overflow-hidden opacity-20"
                                initial={{ y: 0 }}
                                animate={{ y: `-${nationalities.length * 40}px` }}
                                transition={{
                                    duration: 1.5,
                                    ease: "linear"
                                }}
                            >
                                {nationalities.map((country, index) => (
                                    <div
                                        key={`${country}-${index}`}
                                        className="text-white/60 font-mono-tech text-sm py-2 tracking-wider"
                                    >
                                        {country}
                                    </div>
                                ))}
                            </motion.div>

                            {/* Right side: duplicate scroll for density */}
                            <motion.div
                                className="absolute right-0 top-0 h-full w-full flex flex-col items-end justify-start pr-8 overflow-hidden opacity-15"
                                initial={{ y: 100 }}
                                animate={{ y: `-${nationalities.length * 40 - 100}px` }}
                                transition={{
                                    duration: 1.5,
                                    ease: "linear",
                                    delay: 0.3
                                }}
                            >
                                {nationalities.map((country, index) => (
                                    <div
                                        key={`${country}-${index}-r`}
                                        className="text-white/40 font-mono-tech text-xs py-2 tracking-wider"
                                    >
                                        {country}
                                    </div>
                                ))}
                            </motion.div>
                        </>
                    )}

                    {/* Phase 2: The Lock (4.5s - 5.0s) */}
                    {phase === "lock" && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Nihonbashi Lion - blur to sharp focus */}
                            <motion.div
                                className="absolute inset-0"
                                initial={{ filter: "blur(40px)" }}
                                animate={{ filter: "blur(0px)" }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <Image
                                    src="/images/intro/24.JPG"
                                    alt="Nihonbashi"
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                    quality={90}
                                />
                            </motion.div>

                            {/* Center text: "Implementing the Story" */}
                            <motion.div
                                className="relative z-10 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <p className="text-2xl md:text-4xl font-serif text-white tracking-wider italic">
                                    Implementing the Story
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
