"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { siteContent } from "@/data";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScrambleText } from "@/components/effects/ScrambleText";

export function ManifestoSection() {
    const { language } = useLanguage();
    const currentLang = (language === 'en' || language === 'ja') ? language : 'ja';
    const content = siteContent[currentLang].manifesto;

    return (
        <section className="relative py-24 bg-black text-white px-6 overflow-hidden">
            {/* Background: lightTrail_01.JPG + Scanlines */}
            <div className="absolute inset-0">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/images/intro/lightTrail_01.JPG)',
                        filter: 'grayscale(100%) brightness(50%)',
                        opacity: 0.25
                    }}
                />

                {/* Scanline Effect */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                    <defs>
                        <pattern id="scanlines-manifesto" x="0" y="0" width="100%" height="4" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="0.5" opacity="0.1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#scanlines-manifesto)" />
                </svg>

                {/* Dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            </div>

            {/* Design Element: Large Vertical Text (Right) */}
            <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block">
                <span className="text-white/[0.03] font-mono-tech text-9xl font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                    MANIFESTO
                </span>
            </div>

            {/* Content - Centered and text maintained */}
            <div className="max-w-3xl mx-auto text-center relative z-10">
                <FadeIn>
                    <div className="text-white/30 font-mono-tech text-xs tracking-[0.4em] mb-6 uppercase">
                        // manifesto
                    </div>
                    <h2 className="text-3xl md:text-4xl mb-12 tracking-wider font-ja-serif">
                        地図の、さらに奥へ。
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed text-white/80 whitespace-pre-line font-ja-serif">
                        <ScrambleText text={content.text} trigger={language} />
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}