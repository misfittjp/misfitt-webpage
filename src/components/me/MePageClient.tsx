"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BIOSLanguageSwitcher } from "@/components/ui/BIOSLanguageSwitcher";

const CONTENT = {
    ja: {
        statement: "物語を実装する",
        role: "Founder & CEO / Creative Lead",
        bioSummary: `映像とデジタル技術を融合し、都市に潜む「まだ見ぬ文脈」を形にする。
クリエイティブ・ギルド「Misfitt」代表。

既成の枠組みにとらわれない独自の視座で、東京を再定義する。`,
        fullBio: {
            intro: `映像制作のバックグラウンドと、10年にわたるガイド経験を融合。
「観光」という枠組みを超え、都市の文脈そのものを一つの物語として編集・提供する「シネマティック・ガイディング」を確立。
Misfittの代表として、Web開発から空間体験の設計まで、領域横断的なクリエイティブを指揮する。`,
            history: [
                { year: "2013-", title: "Guiding Career", desc: "10年間で6,000人以上のゲストを案内。Airbnbにて一貫して5つ星評価を獲得。" },
                { year: "2020", title: "Misfitt Founded", desc: "東京のストリートカルチャーとハイエンドな体験を融合させるクリエイティブチームを結成。" },
                { year: "2023", title: "Cinematic Tours", desc: "映像作家としての視点を取り入れた、没入型ツアープログラムをローンチ。" }
            ],
            philosophy: "「文化とは、誰かにとっての普通が、他の誰かにとっては奇跡になる瞬間である」"
        },
        readMore: "Read Full Story",
        cardHint: "Digital Business Card (Click to flip)",
        contact: "Contact",
        backToTours: "Back to Tours"
    },
    en: {
        statement: "Implementing\nthe Story",
        role: "Founder & CEO / Creative Lead",
        bioSummary: `Bridging the gap between cinematic expression and digital technology to manifest the "unseen contexts" hidden within the urban landscape. 
Founder of Misfitt.

Redefining Tokyo through a perspective that defies conventional frameworks.`,
        fullBio: {
            intro: `Merging a background in filmmaking with over a decade of guiding experience.
Establishing "Cinematic Guiding"—a methodology that transcends traditional tourism to edit and present the city's context as a unified narrative.
As the head of Misfitt, directing cross-disciplinary creatives from web development to spatial experience design.`,
            history: [
                { year: "2013-", title: "Guiding Career", desc: "Guided over 6,000 guests in 10 years. Consistently maintained 5-star ratings on Airbnb." },
                { year: "2020", title: "Misfitt Founded", desc: "Formed a creative team merging Tokyo's street culture with high-end experiences." },
                { year: "2023", title: "Cinematic Tours", desc: "Launched immersive tour programs incorporating the perspective of a filmmaker." }
            ],
            philosophy: "'Culture is the moment when someone's ordinary becomes another's miracle.'"
        },
        readMore: "Read Full Story",
        cardHint: "Digital Business Card (Click to flip)",
        contact: "Contact",
        backToTours: "Back to Tours"
    }
};

export function MePageClient({ lang }: { lang: 'en' | 'ja' }) {
    const [isBack, setIsBack] = useState(false);
    const [hasIgnited, setHasIgnited] = useState(false);
    const [hasFlipped, setHasFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showBackToTours, setShowBackToTours] = useState(false);

    const currentLang = lang;
    const d = CONTENT[currentLang as keyof typeof CONTENT];

    // Escキーでモーダルを閉じる
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    React.useEffect(() => {
        // ツアーページから来た場合のみ戻るボタンを表示（fromパラメータで判定）
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const isFromTours = params.get('from') === 'tours';
            setShowBackToTours(isFromTours);
        }
    }, []);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-600 overflow-x-hidden relative"
        >
            <BIOSLanguageSwitcher />

            {/* Back to Console Navigation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="fixed top-6 left-6 z-50 mix-blend-difference"
            >
                <Link
                    href={`/${currentLang}`}
                    className="group flex items-center gap-3 px-5 py-2 hover:bg-white/10 rounded-full transition-all"
                >
                    <span className="text-white/60 group-hover:text-white transition-colors">
                        ←
                    </span>
                    <span className="text-[10px] md:text-xs font-mono-tech tracking-widest text-white/60 group-hover:text-white transition-colors uppercase">
                        BACK TO MAIN CONSOLE
                    </span>
                </Link>
            </motion.div>
            <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 space-y-32">

                {/* Statement Section */}
                <header className="text-center">
                    <h1 className="flex flex-col items-center">
                        <span className="text-2xl text-gray-800 font-serif mb-2 opacity-80">“</span>
                        <span className="text-4xl md:text-6xl font-bold tracking-widest uppercase leading-snug whitespace-pre-line">
                            {d.statement}
                        </span>
                        <span className="text-2xl text-gray-800 font-serif mt-2 opacity-80">”</span>
                    </h1>
                </header>

                {/* Profile Grid */}
                <section className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Grayscale to Color Image */}
                    <div
                        className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-2xl order-1 md:order-2 cursor-crosshair group"
                        onMouseEnter={() => setHasIgnited(true)}
                    >
                        <Image
                            src="/images/yu_pic02.jpg"
                            alt="Yu Narisawa"
                            fill
                            className={`object-cover transition-all duration-[2000ms] ease-in-out ${hasIgnited ? 'grayscale-0 scale-105' : 'grayscale'
                                }`}
                            priority
                        />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-10 order-2 md:order-1">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight text-white uppercase leading-none">
                                成澤 祐一 | Yu Narisawa
                            </h2>
                            <p className={`text-xl font-medium tracking-wide transition-colors duration-1000 ${hasIgnited ? 'text-red-600' : 'text-gray-600'}`}>
                                {d.role}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="text-lg leading-relaxed text-gray-400 whitespace-pre-wrap font-light tracking-wide italic">
                                {d.bioSummary}
                            </div>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="group flex items-center gap-2 text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                            >
                                <span className="border-b border-transparent group-hover:border-white/60 pb-0.5 transition-all">
                                    {d.readMore}
                                </span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>

                        <nav className="pt-10 border-t border-white/5 space-y-8">
                            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-widest">
                                <Link href={`/${currentLang}`} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
                                    <svg className="w-5 h-5 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                    Official
                                </Link>
                                <a href="https://www.linkedin.com/in/yuichi-narisawa-69ab2b1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
                                    <svg className="w-5 h-5 group-hover:text-red-600 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    LinkedIn
                                </a>
                                <a href="https://www.instagram.com/yutheguide/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
                                    <svg className="w-5 h-5 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 21h8.4a5.5 5.5 0 005.5-5.5v-7.5a1 1 0 00-1-1h-1.3a1 1 0 01-1 1v-1.28A2.72 2.72 0 0015.68 2H8.32A2.72 2.72 0 005.6 4.72v1.28a1 1 0 01-1 1H3.3a1 1 0 00-1 1V15.5A5.5 5.5 0 007.8 21z" /></svg>
                                    Instagram
                                </a>
                            </div>

                            <div className="flex flex-wrap gap-8 text-gray-700">
                                <a href="https://misfitt.tokyo/blog" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                                    <svg className="w-5 h-5 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                    <span className="text-[10px] tracking-widest uppercase">Blog</span>
                                </a>
                                <div className="flex items-center gap-2 group cursor-help text-gray-500">
                                    <svg className="w-5 h-5 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="text-[10px] tracking-widest uppercase">YouTube (Soon)</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <a href="mailto:hq@misfitt.tokyo" className="text-[10px] text-gray-600 hover:text-red-600 font-mono tracking-tighter uppercase transition-colors">
                                    {d.contact}: hq@misfitt.tokyo
                                </a>
                            </div>
                        </nav>
                    </div>
                </section>

                {/* 3D Business Card Section */}
                <section className="pt-24 border-t border-white/10 text-center pb-24">
                    <p className="text-[10px] tracking-[0.6em] text-gray-700 mb-12 uppercase font-light">{d.cardHint}</p>
                    <motion.div
                        className="mx-auto perspective-2000"
                        animate={{
                            width: isBack ? 340 : 600,
                            maxWidth: '100%'
                        }}
                        transition={{
                            width: {
                                duration: 0.6,
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: isBack ? 0 : 0.4
                            },
                        }}
                        style={{ aspectRatio: isBack ? '1008 / 1600' : '1600 / 1008', perspective: '2000px' }}
                    >
                        <motion.div
                            className="relative w-full h-full cursor-pointer shadow-2xl"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{
                                rotateY: isBack ? 180 : 0,
                                scale: (isBack || hasFlipped) ? 1 : [1, 1.02, 1] // 一度でもめくったら、または裏面のときは鼓動停止
                            }}
                            transition={{
                                rotateY: { duration: 0.8, type: "spring", stiffness: 60, damping: 12 },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }
                            }}
                            onClick={() => {
                                setIsBack(!isBack);
                                setHasFlipped(true);
                            }}
                        >
                            <div className="absolute inset-0 rounded-[16px] overflow-hidden border border-white/5 bg-black" style={{ backfaceVisibility: 'hidden' }}>
                                <Image src="/images/Misfitt_BusinessCard_Web_front_YuNarisawa.jpg" alt="Front" fill className="object-cover" priority />
                            </div>
                            <div className="absolute inset-0 rounded-[16px] overflow-hidden border border-white/5 bg-black" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                <Image src="/images/Misfitt_BusinessCard_Web_back_YuNarisawa.jpg" alt="Back" fill className="object-cover" />
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

            </div>

            {/* Profile Detail Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-8 pb-4 flex justify-between items-start sticky top-0 bg-[#111]/95 backdrop-blur z-10 border-b border-white/5">
                                <div>
                                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">Full Biography</h3>
                                    <p className="text-sm text-white/40 mt-1">Yu Narisawa</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 -mr-2 text-white/40 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 pt-6 space-y-10">
                                {/* Intro */}
                                <div className="text-white/80 leading-relaxed whitespace-pre-wrap font-light">
                                    {d.fullBio.intro}
                                </div>

                                {/* Philosophy */}
                                <div className="border-l-2 border-red-600 pl-6 py-2">
                                    <p className="text-lg italic text-white/90 font-serif">
                                        {d.fullBio.philosophy}
                                    </p>
                                </div>

                                {/* History/Stats */}
                                <div className="space-y-6">
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">History & Achievements</h4>
                                    <div className="grid gap-6">
                                        {d.fullBio.history.map((item, idx) => (
                                            <div key={idx} className="grid grid-cols-[60px_1fr] gap-4">
                                                <div className="text-red-600 font-mono text-sm pt-1 opacity-80">{item.year}</div>
                                                <div>
                                                    <div className="font-bold text-white mb-1">{item.title}</div>
                                                    <div className="text-sm text-white/50 leading-relaxed">{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    );
}
