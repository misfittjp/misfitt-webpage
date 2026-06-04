import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { toursContent } from "@/data/tours";

/**
 * Tours専用のヒーローセクション
 * シネマティックな動画背景と「Decoding Tokyo」のメッセージ
 */
export function TourHeroSection() {
    const { language } = useLanguage();
    const content = toursContent[language].hero;
    const [isMuted, setIsMuted] = useState(true);

    return (
        <section className="relative h-screen w-full overflow-hidden group">
            {/* 背景動画 */}
            <video
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="auto"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23172033;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%230f1729;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23grad)' /%3E%3C/svg%3E"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
            >
                <source src={content.videoUrl} type="video/mp4" />
            </video>

            {/* オーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

            {/* コンテンツ */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-5xl text-center"
                >
                    {/* ヘッドライン */}
                    <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                        {content.headline}
                    </h1>

                    {/* サブテキスト */}
                    <p className={`text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed ${language === "ja" ? "font-ja-sans" : "font-sans"}`}>
                        {content.subtext}
                    </p>
                </motion.div>
            </div>

            {/* スクロールインジケーター */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
                </motion.div>
            </div>

            {/* 音声切り替えスイッチ */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-8 right-8 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 group-hover:opacity-100 md:opacity-0"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? (
                    // Muted Icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" stroke="currentColor" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    // Unmuted Icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </button>
        </section>
    );
}
