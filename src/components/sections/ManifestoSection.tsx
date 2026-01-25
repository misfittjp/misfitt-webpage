"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { siteContent } from "@/data";
import { FadeIn } from "@/components/animations/FadeIn";

export function ManifestoSection() {
    const { language } = useLanguage();
    const currentLang = (language === 'en' || language === 'ja') ? language : 'ja';
    const content = siteContent[currentLang].manifesto;

    return (
        <section className="py-24 bg-black text-white px-6">
            <div className="max-w-3xl mx-auto text-center">
                <FadeIn>
                    <h2 className="text-3xl md:text-4xl font-serif mb-12 tracking-wider">
                        {content.title}
                    </h2>
                    {/* whitespace-pre-line を追加 */}
                    <p className="text-lg md:text-xl leading-relaxed text-white/80 whitespace-pre-line font-ja-serif">
                        {content.text}
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}