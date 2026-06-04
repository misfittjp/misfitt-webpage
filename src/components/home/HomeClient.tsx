"use client";

import { useState, useEffect } from "react";
import { BIOSLanguageSwitcher } from "@/components/ui/BIOSLanguageSwitcher";
import { IntroSequence } from "@/components/home/IntroSequence";
import { DSLRInterface } from "@/components/home/DSLRInterface";
import { VisualEffectsProvider } from "@/contexts/VisualEffectsContext";
import GlobalVisualEffects from "@/components/GlobalVisualEffects";
import { TopSection } from "@/components/home/TopSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { BusinessAreas } from "@/components/home/BusinessAreas";
import { Identity } from "@/components/home/Identity";
import { Footer } from "@/components/home/Footer";

export function HomeClient({ lang }: { lang: 'en' | 'ja' }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Just simulates hydration check if needed, or remove completely
        setIsLoading(false);
    }, []);

    // Don't render anything until we check localStorage (hydration mismatch prevention)
    if (isLoading) {
        return <div className="min-h-screen bg-tech-noir" />;
    }

    return (
        <VisualEffectsProvider>
            {/* Global Visual Effects - PP, F, ISO */}
            <GlobalVisualEffects />

            {/* Global DSLR Interface - always visible with hover tooltips */}
            <DSLRInterface />

            {/* BIOS Language Switcher - top right */}
            <BIOSLanguageSwitcher />

            {/* Intro Sequence - Component handles its own visibility */}
            <IntroSequence onComplete={() => { }} />

            {/* Main Content */}
            <main className="min-h-screen bg-tech-noir">
                {/* Section 01: Top Section - Video Background + Title Only */}
                <TopSection />

                {/* Section 02: Manifesto - 地図の、さらに奥へ。 (HUD fades out here) */}
                <ManifestoSection />

                {/* Section 03: Business Areas */}
                <BusinessAreas />

                {/* Section 04: Identity */}
                <Identity />

                {/* Footer */}
                <Footer />
            </main>
        </VisualEffectsProvider>
    );
}
