"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useVisualEffects } from "@/contexts/VisualEffectsContext";
import { useSmartHUD } from "@/hooks/useSmartHUD";

export function BIOSLanguageSwitcher() {
    const { language, setLanguage, toggleLanguage } = useLanguage();
    const { isMenuOpen } = useVisualEffects();

    const [isSecretMode, setIsSecretMode] = useState(false);
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);

    // Use Smart HUD for Ghost Text logic
    // Aliasing 'opacity' to 'ghostOpacity' for clarity
    const { opacity: ghostOpacity, isTop, handleMouseEnter, handleMouseLeave } = useSmartHUD(isMenuOpen);

    // Localized Labels
    const localizedLocales = [
        { code: 'ja', label: 'JA_JAPANESE_UTF8' },
        { code: 'en', label: 'EN_ENGLISH_ASCII' }
    ] as const;

    // Mobile Secret Feature
    const handleTouchStart = () => {
        longPressTimer.current = setTimeout(() => {
            if (navigator.vibrate) navigator.vibrate(50);
            setIsSecretMode(true);
            toggleLanguage();
            setTimeout(() => setIsSecretMode(false), 2000);
        }, 2000);
    };

    const handleTouchEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    };

    return (
        /* GHOST HIT AREA: Top-Right 100x100px */
        <div
            className="fixed top-0 right-0 w-[100px] h-[100px] z-[9990] pointer-events-auto flex flex-col items-end"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Visual Container - Absolute positioned relative to viewport or hit area */}
            <motion.div
                className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col items-end font-mono-tech text-xs tracking-widest mix-blend-difference"
            >
                {/* STRICT RULE: Brackets are Top-Only and strictly removed when Menu is Open */}
                {/* Note: Desktop bracket is in DSLRInterface. This is mainly for Mobile or additional deco */}
                {(isTop && !isMenuOpen) ? (
                    <div className="md:hidden absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-400/50 pointer-events-none" />
                ) : null}

                {/* Secret Mode Overlay Text */}
                <AnimatePresence>
                    {isSecretMode && (
                        <motion.div
                            className="absolute top-10 right-0 p-2 bg-green-400 text-black text-xs font-bold whitespace-nowrap"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            [ LANGUAGE_MODE_PATCHED ]
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Language Text - Global Access (Ghost Behavior) */}
                <motion.div
                    className="flex flex-col items-end gap-1 p-2 md:p-0"
                    animate={{ opacity: isMenuOpen ? 1 : ghostOpacity }}
                    transition={{ duration: 0.3 }}
                >
                    {/* PC Heading - Hidden on Mobile */}
                    <div className="hidden lg:block text-green-400/50 mb-2">
                        [ SYSTEM_PRIMARY_LANG_SET ]
                    </div>

                    {localizedLocales.map((locale) => {
                        const isSelected = language === locale.code;
                        return (
                            <button
                                key={locale.code}
                                onClick={() => setLanguage(locale.code)}
                                className={`relative group flex items-center gap-2 transition-colors duration-300 ${isSelected ? "text-white" : "text-white/40 hover:text-white/80"}`}
                            >
                                {/* Cursor Area - Fixed Width to prevent shift */}
                                <div className="w-3 text-right">
                                    {isSelected && (
                                        <motion.span
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            className="text-green-400 font-bold"
                                        >
                                            &gt;
                                        </motion.span>
                                    )}
                                </div>
                                <span className={isSelected ? 'drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : ''}>
                                    <span className="md:hidden">{locale.code.toUpperCase()}</span>
                                    <span className="hidden md:inline">{locale.label}</span>
                                </span>
                            </button>
                        );
                    })}
                </motion.div>
            </motion.div>
        </div>
    );
}
