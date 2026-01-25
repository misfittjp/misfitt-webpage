"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * 言語切り替えボタン（EN/JP）
 * 画面右上に固定配置される極めてミニマルなトグル
 */
export function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="fixed top-6 right-6 md:top-8 md:right-8 z-50"
        >
            <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-sm md:text-base font-sans tracking-wide"
                aria-label="Toggle language"
            >
                <span
                    className={`transition-all duration-300 ${language === "en"
                            ? "text-white opacity-100"
                            : "text-white/40 opacity-60 hover:opacity-80"
                        }`}
                >
                    EN
                </span>
                <span className="text-white/30">/</span>
                <span
                    className={`transition-all duration-300 ${language === "ja"
                            ? "text-white opacity-100"
                            : "text-white/40 opacity-60 hover:opacity-80"
                        }`}
                >
                    JP
                </span>
            </button>
        </motion.div>
    );
}
