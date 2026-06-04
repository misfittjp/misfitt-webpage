import { useMemo } from "react";
import { PPMode } from "@/data/home";

interface VisualEffectsStyles {
    filter: string;
    grainOpacity: number;
    grainFilter: string;
}

export function useVisualEffectsStyles(pp: PPMode, f: number, iso: number): VisualEffectsStyles {
    return useMemo(() => {
        // 1. Perspective Profile (Color)
        let colorFilter = "";
        switch (pp) {
            case "STD":
                colorFilter = "";
                break;
            case "NOIR":
                colorFilter = "grayscale(100%) contrast(120%)";
                break;
            case "LOG":
                colorFilter = "contrast(80%) saturate(70%)";
                break;
            case "VIV":
                colorFilter = "contrast(110%) saturate(140%)";
                break;
        }

        // 2. Fieldwork (Blur & Exposure)
        // 1.2 (Max blur) -> 10.0 (Clean) -> 22.0 (Dim) -> 999 (Black)
        let blurAmount = 0;
        let brightness = 100;

        if (f <= 1.2) {
            blurAmount = 8;
        } else if (f <= 5.6) {
            blurAmount = 2;
        } else if (f === 10.0) {
            blurAmount = 0;
        } else if (f <= 22.0) {
            brightness = 60; // Dim
        } else if (f >= 900) {
            brightness = 0; // Black
        }

        const blurFilter = blurAmount > 0 ? `blur(${blurAmount}px)` : "";
        const brightnessFilter = brightness < 100 ? `brightness(${brightness}%)` : "";

        // Combine filters
        const filter = [colorFilter, blurFilter, brightnessFilter].filter(Boolean).join(" ");

        // 3. Isolation Journey (Grain) - Mapped to Global SVG Filters
        // Precision Mapping: 200(0), 800(0.15), 2500(0.40), 6400(0.85)
        let noiseFilterId = "iso-200";
        let noiseOpacity = 0;

        if (iso <= 200) {
            noiseOpacity = 0; // Clean
        } else if (iso <= 800) {
            // Lerp 200->800 mapped to 0->0.15
            const t = (iso - 200) / (800 - 200);
            noiseOpacity = 0 + t * (0.15 - 0);
        } else if (iso <= 2500) {
            // Lerp 800->2500 mapped to 0.15->0.40
            const t = (iso - 800) / (2500 - 800);
            noiseOpacity = 0.15 + t * (0.40 - 0.15);
        } else if (iso <= 6400) {
            // Lerp 2500->6400 mapped to 0.40->0.85
            const t = (iso - 2500) / (6400 - 2500);
            noiseOpacity = 0.40 + t * (0.85 - 0.40);
        } else {
            noiseOpacity = 0.85;
        }

        // We return the filter ID separately so the component can apply it to the grain overlay
        const grainFilter = `url(#${noiseFilterId})`;

        // Note: The global filter only returns the noise map. 
        // We typically use it in a rect or div. 
        // For simple CSS implementation, we might need a different approach if using 'filter'.
        // However, SVG filters as CSS 'filter' property works on the element content.

        return { filter, grainOpacity: noiseOpacity, grainFilter };
    }, [pp, f, iso]);
}
