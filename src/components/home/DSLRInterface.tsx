"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVisualEffects } from "@/contexts/VisualEffectsContext";
import { ModeOverlay } from "@/components/ui/ModeOverlay";
import { hudParameters } from "@/data/home";
import { MasterButtonSVG } from "@/components/ui/MasterButtonSVG";
import { useSmartHUD } from "@/hooks/useSmartHUD";

/**
 * HUD: The Viewfinder
 * - Corner brackets (DSLR Frame Style)
 * - Interactive status: STBY (Green) → PLAY (White) on first user action
 * - Hover tooltips showing parameter inner meanings
 * - Coordinates (dynamic during intro)
 * - Fades out when scrolling to Manifesto section
 */
export function DSLRInterface() {
    const {
        iso, pp, f, ss,
        coordinates,
        isIntroPlaying,
        restartTrigger, restartIntro, // Added restartIntro
        setCoordinates,
        setF, setSS, setPP, setISO, cycleISO, // Added cycleISO
    } = useVisualEffects();
    const [isVisible, setIsVisible] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Use Smart HUD for [M] Button Visibility
    const { opacity: ghostOpacity, isTop, handleMouseEnter, handleMouseLeave } = useSmartHUD(isMenuOpen);

    const [infoText, setInfoText] = useState("");
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);
    const mapLongPressTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let hasActivated = false;

        const handleUserAction = () => {
            if (!hasActivated) {
                setIsActive(true);
                hasActivated = true;
                // Remove listeners after first activation
                window.removeEventListener("scroll", handleUserAction);
                window.removeEventListener("mousemove", handleUserAction);
                window.removeEventListener("click", handleUserAction);
            }
        };

        const handleScroll = () => {
            handleUserAction(); // Activate on scroll
            // Fade out when scrolling to Manifesto section
            const scrolled = window.scrollY > window.innerHeight * 0.5;
            setIsVisible(!scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleUserAction);
        window.addEventListener("click", handleUserAction);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleUserAction);
            window.removeEventListener("click", handleUserAction);
            if (longPressTimer.current) clearTimeout(longPressTimer.current);
            if (mapLongPressTimer.current) clearTimeout(mapLongPressTimer.current);
        };
    }, []);

    // Long Press Handlers
    const startLongPress = (text: string) => {
        longPressTimer.current = setTimeout(() => {
            setInfoText(text);
        }, 500); // 0.5s threshold for "long press" feel (or user req says "Long press")
    };

    const endLongPress = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
        setInfoText("");
    };

    // Secret Map Link Handlers
    const startMapLongPress = () => {
        mapLongPressTimer.current = setTimeout(() => {
            window.open("https://goo.gl/maps/JMCkkwLYBuvq3gSA9", "_blank");
        }, 1000); // 1s long press for secret
    };

    const endMapLongPress = () => {
        if (mapLongPressTimer.current) {
            clearTimeout(mapLongPressTimer.current);
            mapLongPressTimer.current = null;
        }
    };

    // Manual Re-Scan Gimmick
    const handleReScan = () => {
        // if (!isActive) return; // Removed to allow immediate interaction
        restartIntro(); // Trigger restart without reload
    };

    // Parameter Cycle Handlers

    const cyclePP = () => {
        const modes: import("@/data/home").PPMode[] = ["STD", "NOIR", "LOG", "VIV"];
        const currentIndex = modes.indexOf(pp);
        const nextIndex = (currentIndex + 1) % modes.length;
        setPP(modes[nextIndex]);
    };

    const cycleF = () => {
        // Updated F-Stop scale: 1.2 (Max Blur), 5.6 (Mild), 10.0 (Sharp/Def), 22.0 (Dark), 999.0 (Black/MAX)
        const stops = [1.2, 5.6, 10.0, 22.0, 999.0];
        const currentIndex = stops.indexOf(f);
        const nextIndex = (currentIndex + 1) % stops.length;
        if (currentIndex === -1) setF(10.0);
        else setF(stops[nextIndex]);
    };

    const cycleSS = () => {
        const speeds = [50, 100, 500, 1000]; // Removed 250 as per request. kept 500, 1000? User said "SS 250 switch to 100 max". "SS 250 廃止で 100 まで" -> Max 100.
        // Wait, "SS 250廃止で100まで" means 100 is the max? or range is 1..100?
        // Let's assume [1, 25, 50, 100].
        const validSpeeds = [1, 25, 50, 100];
        const currentIndex = validSpeeds.indexOf(ss);
        const nextIndex = (currentIndex + 1) % validSpeeds.length;
        if (currentIndex === -1) setSS(50);
        else setSS(validSpeeds[nextIndex]);
    };

    // Use cycleISO from context directly


    // Mobile Swipe Handler
    useEffect(() => {
        let touchStartX = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndX = e.changedTouches[0].clientX;
            // Right swipe (start < 50px from left, distance > 80px)
            if (touchStartX < 50 && touchEndX - touchStartX > 80) {
                setIsMenuOpen(true);
            }
        };

        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    const bracketColor = isIntroPlaying ? "border-white/40" : "border-green-400/40";
    const textColor = isIntroPlaying ? "text-white/60" : "text-green-400/60";


    return (
        <>
            {/* --- COMPONENT 1: GLOBAL ACCESS ([M] Button) --- */}

            {/* GHOST HIT AREA: Top-Left 100x100px */}
            {/*Triggers visibility on hover, but button is always clickable if visible */}
            <div
                className="fixed top-0 left-0 w-[100px] h-[100px] z-[9999] pointer-events-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Visual Container - Fades in/out */}
                <motion.div
                    className="absolute top-0 left-0 p-4 md:p-8"
                    animate={{ opacity: isMenuOpen ? 1 : ghostOpacity }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="relative group cursor-crosshair">
                        <div
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative z-20"
                        >
                            {isMenuOpen ? (
                                <button className="p-2 group mix-blend-difference text-white">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M28 12L12 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                                        <path d="M12 12L28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                                    </svg>
                                </button>
                            ) : (
                                <MasterButtonSVG />
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- COMPONENT 2: MAIN HUD (Brackets & Info) --- */}
            {/* STRICT RULE: Visible ONLY at absolute TOP (scrollY < 50) AND when Menu is CLOSED. */}
            {/* When scrolled down, this ENTIRE layer fades to 0 and likely should be pointer-events-none. */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-4 md:p-8"
                animate={{ opacity: (isTop && !isMenuOpen) ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {/* 2.1 Corner Brackets - PHYSICALLY REMOVED if not Top (PureClean) */}
                {(isTop && !isMenuOpen) ? (
                    <>
                        {/* Top Left - Connected to [M] visually, but technically separate */}
                        <div className={`absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 transition-all duration-300 ${bracketColor}`} />
                        {/* Top Right - Desktop Only (Mobile has BIOS bracket) */}
                        <div className={`hidden md:block absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 transition-colors duration-300 ${bracketColor}`} />
                        {/* Bottom Left */}
                        <div className={`absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 transition-colors duration-300 ${bracketColor}`} />
                        {/* Bottom Right */}
                        <div className={`absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 transition-colors duration-300 ${bracketColor}`} />
                    </>
                ) : null}

                {/* 2.2 Top Center Status */}
                <div className="w-full flex flex-col items-center mt-4 md:mt-8 gap-2 pointer-events-auto">
                    <div
                        className={`cursor-crosshair transition-colors duration-500 ${isIntroPlaying ? "text-white" : "text-green-400"} font-mono-tech text-xs tracking-widest`}
                        onClick={handleReScan}
                    >
                        <span className="flex items-center gap-2 hover:opacity-80">
                            {isIntroPlaying ? (
                                <><span>▶</span> PLAY</>
                            ) : (
                                <><span>⏸</span> STBY</>
                            )}
                        </span>
                    </div>

                    <div className="h-6 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {infoText && (
                                <motion.span
                                    key={infoText}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="font-mono-tech text-xs tracking-[0.2em] text-white/80 uppercase"
                                >
                                    {infoText}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* 2.3 Bottom Parameters */}
                <div className="w-full max-w-lg mx-auto px-10 mb-4 md:mb-0 md:max-w-none md:mx-0 md:px-0 flex items-end justify-between pointer-events-auto">
                    {/* Left: Params */}
                    <div className={`flex items-center gap-6 font-mono-tech text-[10px] md:text-xs tracking-wider transition-colors duration-500 ${textColor}`}>
                        {/* PP */}
                        <div className="cursor-pointer group hover:text-white transition-colors" onClick={cyclePP}>
                            PP {pp}
                        </div>
                        {/* F */}
                        <div className="cursor-pointer group hover:text-white transition-colors" onClick={cycleF}>
                            F {f >= 900 ? "MAX" : f.toFixed(1)}
                        </div>
                        {/* SS */}
                        <div className="cursor-pointer group hover:text-white transition-colors" onClick={cycleSS}>
                            SS 1/{ss}
                        </div>
                        {/* ISO - HARDCODED CHECK */}
                        <div className="cursor-pointer group hover:text-white transition-colors" onClick={cycleISO}>
                            ISO {iso}
                        </div>
                    </div>

                    {/* Right: Coordinates */}
                    <motion.div
                        className="text-white/50 font-mono-tech text-[9px] md:text-[10px] text-right leading-tight cursor-none"
                        animate={{
                            opacity: coordinates.isAnimating ? [0.5, 1, 0.5] : coordinates.isLocked ? 1 : 0.5,
                        }}
                        transition={{
                            duration: coordinates.isAnimating ? 0.8 : 0.3,
                            repeat: coordinates.isAnimating ? Infinity : 0
                        }}
                    >
                        <div>{coordinates.lat}</div>
                        <div>{coordinates.lng}</div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Mode Menu Overlay */}
            <ModeOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
