"use client";

import { motion } from "framer-motion";

/**
 * スクロールを促すミニマルなインジケーター
 * 画面下部に配置され、上下にアニメーション
 */
export function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-white/60 font-sans">
                    Scroll Down
                </span>
                <svg
                    className="w-5 h-5 text-white/60"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </motion.div>
        </motion.div>
    );
}
