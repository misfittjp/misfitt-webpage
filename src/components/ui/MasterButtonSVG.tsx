"use client";

import { motion } from "framer-motion";

interface MasterButtonSVGProps {
    onClick?: () => void;
    className?: string;
}

export function MasterButtonSVG({ onClick, className = "" }: MasterButtonSVGProps) {
    return (
        <motion.button
            onClick={onClick}
            className={`group relative z-50 p-2 cursor-pointer ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* SVG Container: 40x40 standard size */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mix-blend-difference" // Ensures visibility against varied backgrounds
            >
                {/* Left Bracket [ - Thinner Stroke (0.5px equivalent visual) */}
                <path
                    d="M12 10V30H13V11H12Z" // Manually drawing thin rect or use stroke
                    fill="currentColor"
                    className="hidden" // Hiding old fill method
                />
                <path
                    d="M12 10H14V30H12V10ZM12 10V10.5H8V10H12ZM12 29.5V30H8V29.5H12Z" // Filled shape approach requires precise path. Switching to stroke for thinness control.
                    fill="none"
                />

                {/* Thin Stroke Implementation for Brackets */}
                <path
                    d="M14 10H10V30H14"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-white group-hover:text-green-400 transition-colors duration-300"
                />
                <path
                    d="M26 10H30V30H26"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-white group-hover:text-green-400 transition-colors duration-300"
                />

                {/* Monospace M - Skeleton Style */}
                <path
                    d="M15 14V26"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-white group-hover:text-green-400 transition-colors duration-300"
                />
                <path
                    d="M25 14V26"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-white group-hover:text-green-400 transition-colors duration-300"
                />
                <path
                    d="M15 14L20 20L25 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-white group-hover:text-green-400 transition-colors duration-300"
                />

                {/* Scanline Effect (Hover Only) */}
                <motion.rect
                    x="0"
                    y="0"
                    width="40"
                    height="1" // Thinner scanline
                    fill="#4ade80"
                    className="opacity-0 group-hover:opacity-50"
                    initial={{ y: 0 }}
                    animate={{ y: [0, 40] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                />
            </svg>

            {/* Glow backing on hover */}
            <div className="absolute inset-0 bg-green-400/0 group-hover:bg-green-400/10 blur-md rounded-full transition-all duration-300 -z-10" />
        </motion.button>
    );
}
