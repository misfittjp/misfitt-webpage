"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import { PPMode } from "@/data/home";

/**
 * Visual Effects Context
 * Manages global state for HUD parameters and visual effects
 */

interface CoordinatesState {
    lat: string;
    lng: string;
    isAnimating: boolean;
    isLocked: boolean;
}

interface VisualEffectsState {
    // HUD Parameters
    pp: PPMode;
    f: number;
    ss: number;
    iso: number;

    // Coordinates
    coordinates: CoordinatesState;

    // Intro Sequence State
    isIntroPlaying: boolean;
    isIntroComplete: boolean;

    // Methods to update state
    setPP: (value: PPMode) => void;
    setF: (value: number) => void;
    setSS: (value: number) => void;
    setISO: (value: number) => void;
    setCoordinates: (coords: CoordinatesState) => void;
    startCoordinateAnimation: () => void;
    lockCoordinates: () => void;
    setIsIntroPlaying: (value: boolean) => void;
    setIsIntroComplete: (value: boolean) => void;
    // Restart
    restartTrigger: number;
    restartIntro: () => void;

    // Glitch & ISO Logic
    glitchTrigger: number;
    triggerGlitch: () => void;
    cycleISO: () => void;

    // Global Menu
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
}

const VisualEffectsContext = createContext<VisualEffectsState | undefined>(undefined);

export function VisualEffectsProvider({ children }: { children: ReactNode }) {
    // Default Values
    const DEFAULT_PP = "STD";
    const DEFAULT_F = 10.0;
    const DEFAULT_SS = 50;
    const DEFAULT_ISO = 800;

    const [pp, setPP] = useState<PPMode>(DEFAULT_PP);
    const [f, setF] = useState<number>(DEFAULT_F);
    const [ss, setSS] = useState<number>(DEFAULT_SS);
    const [iso, setISO] = useState<number>(DEFAULT_ISO);

    // Load from LocalStorage on Mount
    useEffect(() => {
        const savedPP = localStorage.getItem("misfitt_pp") as PPMode;
        const savedF = localStorage.getItem("misfitt_f");
        const savedSS = localStorage.getItem("misfitt_ss");
        const savedISO = localStorage.getItem("misfitt_iso");

        if (savedPP) setPP(savedPP);
        if (savedF) setF(parseFloat(savedF));
        if (savedSS) setSS(parseInt(savedSS));

        // Strict ISO Validation
        const validISOs = [200, 800, 2500, 6400];
        const parsedISO = parseInt(savedISO || "");

        if (!isNaN(parsedISO) && validISOs.includes(parsedISO)) {
            setISO(parsedISO);
        } else {
            setISO(DEFAULT_ISO); // Default 800 if invalid
        }
    }, []);

    // Save to LocalStorage on Change
    useEffect(() => {
        localStorage.setItem("misfitt_pp", pp);
    }, [pp]);
    useEffect(() => {
        localStorage.setItem("misfitt_f", f.toString());
    }, [f]);
    useEffect(() => {
        localStorage.setItem("misfitt_ss", ss.toString());
    }, [ss]);
    useEffect(() => {
        localStorage.setItem("misfitt_iso", iso.toString());
    }, [iso]);

    const [coordinates, setCoordinates] = useState<CoordinatesState>({
        lat: "35.6839° N",
        lng: "139.7745° E",
        isAnimating: false,
        isLocked: false
    });
    const [isIntroPlaying, setIsIntroPlaying] = useState(false);
    const [isIntroComplete, setIsIntroComplete] = useState(false);

    // Global Menu State
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const startCoordinateAnimation = useCallback(() => {
        setCoordinates(prev => ({ ...prev, isAnimating: true }));
    }, []);

    const lockCoordinates = useCallback(() => {
        setCoordinates(prev => ({ ...prev, isAnimating: false, isLocked: true }));
    }, []);

    // Restart method
    const [restartTrigger, setRestartTrigger] = useState(0);
    const restartIntro = useCallback(() => {
        setRestartTrigger(prev => prev + 1);
        setIsIntroComplete(false);
        setIsIntroPlaying(true);
    }, []);

    // Glitch Trigger
    const [glitchTrigger, setGlitchTrigger] = useState(0);
    const triggerGlitch = useCallback(() => {
        setGlitchTrigger(prev => prev + 1);
    }, []);

    // Cycle ISO
    const cycleISO = useCallback(() => {
        setISO(prev => {
            if (prev === 200) return 800;
            if (prev === 800) return 2500;
            if (prev === 2500) return 6400;
            return 200;
        });
        triggerGlitch();
    }, [triggerGlitch]);

    const value: VisualEffectsState = useMemo(() => ({
        pp,
        f,
        ss,
        iso,
        coordinates,
        isIntroPlaying,
        isIntroComplete,
        restartTrigger,
        glitchTrigger, // Exposed
        isMenuOpen, // Exposed
        setPP,
        setF,
        setSS,
        setISO,
        cycleISO, // Exposed
        setCoordinates,
        startCoordinateAnimation,
        lockCoordinates,
        setIsIntroPlaying,
        setIsIntroComplete,
        restartIntro,
        triggerGlitch, // Exposed
        setIsMenuOpen, // Exposed
    }), [pp, f, ss, iso, coordinates, isIntroPlaying, isIntroComplete, restartTrigger, isMenuOpen, startCoordinateAnimation, lockCoordinates, restartIntro]); // Added dependencies

    return (
        <VisualEffectsContext.Provider value={value}>
            {children}
        </VisualEffectsContext.Provider>
    );
}

export function useVisualEffects() {
    const context = useContext(VisualEffectsContext);
    if (!context) {
        throw new Error("useVisualEffects must be used within VisualEffectsProvider");
    }
    return context;
}
