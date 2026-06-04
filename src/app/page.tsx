"use client";

import { useState, useEffect } from "react";
import { DSLRInterface } from "@/components/home/DSLRInterface";
import { IntroSequence } from "@/components/home/IntroSequence";
import GlobalVisualEffects from "@/components/GlobalVisualEffects";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { BusinessAreas } from "@/components/home/BusinessAreas";
import { Identity } from "@/components/home/Identity";
import { Footer } from "@/components/home/Footer";
import { BIOSLanguageSwitcher } from "@/components/ui/BIOSLanguageSwitcher";
import { VisualEffectsProvider } from "@/contexts/VisualEffectsContext";
import { TopSection } from "@/components/home/TopSection";

/**
 * Front Page - Technical Noir
 */
export default function HomePage() {
    const [showIntro, setShowIntro] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if intro has been seen before
        const introSeen = localStorage.getItem("misfitt_intro_seen");

        if (!introSeen) {
            // First visit - show full intro
            setShowIntro(true);
        }

        setIsLoading(false);
    }, []);

    const handleIntroComplete = () => {
        setShowIntro(false);
        localStorage.setItem("misfitt_intro_seen", "true");
    };

    // Don't render anything until we check localStorage
    if (isLoading) {
        return <div className="min-h-screen bg-tech-noir" />;
    }

    return (
        <VisualEffectsProvider>
            {/* Global Visual Effects */}
            <GlobalVisualEffects />

            {/* Global DSLR Interface - always visible */}
            <DSLRInterface />

            {/* BIOS Language Switcher */}
            <BIOSLanguageSwitcher />

            {/* Intro Sequence - first visit only */}
            {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

            {/* Main Content */}
            <main className="min-h-screen bg-tech-noir">
                {/* Section 01: Top Section */}
                <TopSection />

                {/* Section 02: Manifesto */}
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
