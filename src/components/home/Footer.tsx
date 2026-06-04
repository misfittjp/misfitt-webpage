"use client";

import { motion } from "framer-motion";
import { snsStatus } from "@/data/home";

/**
 * Footer: Connectivity
 * - SNS Status with official SVG icons + full names
 * - Contact Form
 * - Coordinates
 */
export function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/10 py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {/* Left: SNS Status with Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-white/50 font-mono-tech text-xs tracking-[0.3em] uppercase mb-6">
                            Official Connect
                        </h3>

                        <div className="space-y-4">
                            {snsStatus.map((sns) => (
                                <div key={sns.platform} className="flex items-center gap-3">
                                    {sns.url ? (
                                        <a
                                            href={sns.url}
                                            target={sns.platform !== "PROFILE" ? "_blank" : undefined}
                                            rel={sns.platform !== "PROFILE" ? "noopener noreferrer" : undefined}
                                            className="group flex items-center gap-3 hover:text-white transition-colors"
                                        >
                                            {/* SVG Icon */}
                                            <div className="w-5 h-5 text-white/60 group-hover:text-white transition-colors">
                                                {sns.platform === "INSTAGRAM" && (
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                    </svg>
                                                )}
                                                {sns.platform === "LINKEDIN" && (
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                )}
                                                {sns.platform === "YOUTUBE" && (
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                    </svg>
                                                )}
                                                {sns.platform === "PROFILE" && (
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                    </svg>
                                                )}
                                            </div>

                                            <span className="font-mono-tech text-sm text-white/70 group-hover:text-white uppercase tracking-wider">
                                                {sns.platform}
                                            </span>
                                            <span className="text-white/30">//</span>
                                            <span className={`font-mono-tech text-xs tracking-widest ${sns.status === "LIVE"
                                                ? "text-green-500"
                                                : "text-white/30"
                                                }`}>
                                                {sns.status}
                                            </span>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-3 cursor-not-allowed">
                                            {/* SVG Icon */}
                                            <div className="w-5 h-5 text-white/30">
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                            </div>

                                            <span className="font-mono-tech text-sm text-white/40 uppercase tracking-wider">
                                                {sns.platform}
                                            </span>
                                            <span className="text-white/20">//</span>
                                            <span className="font-mono-tech text-xs tracking-widest text-white/30">
                                                {sns.status}
                                            </span>
                                            {sns.subtitle && (
                                                <>
                                                    <span className="text-white/20">-</span>
                                                    <span className="text-white/30 text-xs">
                                                        [{sns.subtitle}]
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <h3 className="text-white/50 font-mono-tech text-xs tracking-[0.3em] uppercase mb-6">
                            Inquiry
                        </h3>

                        <p className="text-white/60 text-sm mb-6 leading-relaxed">
                            プロジェクトのご相談、取材・講演依頼、その他お問い合わせは
                            こちらからお願いします。
                        </p>

                        <a
                            href="mailto:contact@misfitt.tokyo"
                            className="inline-block border border-white/30 hover:border-white/60 px-6 py-3 text-white/70 hover:text-white transition-all duration-300 font-mono-tech text-xs tracking-widest"
                        >
                            SEND MESSAGE →
                        </a>
                    </motion.div>
                </div>

                {/* Bottom: Copyright Only */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4">
                    <div className="text-white/30 font-mono-tech text-[10px] tracking-wider">
                        © {new Date().getFullYear()} MISFITT. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
