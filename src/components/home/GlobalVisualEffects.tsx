"use client";

import { useVisualEffects } from "@/contexts/VisualEffectsContext";
import { useMemo } from "react";

/**
 * Global Visual Effects
 * Applies visual effects based on HUD parameters (PP, F, ISO)
 * - PP: Color Science (STD, NOIR, LOG, VIV)
 * - F: Blur effect (F/10.0 = sharp, smaller = more blur)
 * - ISO: Grain/Noise effect
 */
export function GlobalVisualEffects() {
    const { pp, f, iso } = useVisualEffects();

    // Calculate CSS filter based on parameters
    const filterStyle = useMemo(() => {
        const filters: string[] = [];

        // PP: Perspective Profile (Color Science)
        switch (pp) {
            case "NOIR":
                filters.push("grayscale(100%)");
                break;
            case "LOG":
                filters.push("contrast(80%)", "brightness(90%)", "saturate(70%)");
                break;
            case "VIV":
                filters.push("saturate(130%)", "contrast(110%)", "brightness(105%)");
                break;
            case "STD":
            default:
                // No filter for STD
                break;
        }

        // F: Fieldwork (Blur)
        // F/10.0 is sharp focus, smaller values add blur
        const blurAmount = Math.max(0, (10 - f) * 0.5);
        if (blurAmount > 0) {
            filters.push(`blur(${blurAmount.toFixed(1)}px)`);
        }

        return filters.length > 0 ? filters.join(" ") : "none";
    }, [pp, f]);

    // ISO: Grain/Noise overlay
    const grainOpacity = useMemo(() => {
        // ISO 100 = no grain, ISO 3200+ = strong grain
        if (iso <= 100) return 0;
        if (iso >= 3200) return 0.15;

        // Linear interpolation
        return ((iso - 100) / (3200 - 100)) * 0.15;
    }, [iso]);

    return (
        <>
            {/* Color Science & Blur Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-30"
                style={{
                    filter: filterStyle,
                    backdropFilter: filterStyle !== "none" ? filterStyle : undefined,
                }}
            />

            {/* ISO Grain Overlay */}
            {grainOpacity > 0 && (
                <div
                    className="fixed inset-0 pointer-events-none z-30"
                    style={{
                        opacity: grainOpacity,
                        backgroundImage:
                            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.2\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                        backgroundSize: "200px 200px",
                        mixBlendMode: "overlay",
                    }}
                />
            )}
        </>
    );
}
