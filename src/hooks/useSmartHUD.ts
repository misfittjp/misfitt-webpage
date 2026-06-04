import { useState, useEffect, useCallback } from "react";

/**
 * useSmartHUD Hook
 * Manages visibility of HUD elements based on scroll, hover, and menu state.
 * 
 * Logic:
 * - PC:
 *   - Scroll > threshold -> Fade Out (opacity 0).
 *   - Hover -> Fade In (opacity 0.6).
 *   - Menu Open or Top -> FULL (opacity 1).
 * - Mobile:
 *   - Scroll Down -> Hide.
 *   - Scroll Up -> Show.
 *   - Top -> Show.
 */
export function useSmartHUD(isMenuOpen: boolean = false) {
    const [isVisible, setIsVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [isTop, setIsTop] = useState(true);

    // Scroll handling
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const _isTop = currentScrollY < 50;
            setIsTop(_isTop);
            const isMobile = window.innerWidth < 768;

            // PC Logic (Absolute Discipline)
            if (!isMobile) {
                // If Menu is Open or at absolute Top, full visibility
                if (isMenuOpen || _isTop) {
                    setOpacity(1);
                    return;
                }

                // If Hovered (Ghost Mode), partial visibility
                // Note: Hover state is handled in a separate effect/callback intersection, 
                // but we check it here for scroll updates too.
                if (isHovered) {
                    setOpacity(0.6);
                    return;
                }

                // Otherwise: STRICTLY HIDDEN
                setOpacity(0);
            }
            // Mobile Logic
            else {
                if (isMenuOpen || _isTop) {
                    setIsVisible(true);
                    setOpacity(1);
                } else {
                    // Mobile: Hide immediately on scroll down
                    setIsVisible(false);
                    setOpacity(0);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMenuOpen, isHovered]);

    // React to Hover/Menu changes immediately
    useEffect(() => {
        const _isTop = window.scrollY < 50;

        if (isMenuOpen || _isTop) {
            setOpacity(1);
        } else if (isHovered) {
            setOpacity(0.6); // Ghost Mode
        } else {
            setOpacity(0); // Stealth Mode
        }
    }, [isHovered, isMenuOpen]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return {
        opacity,
        isVisible,
        display: isVisible ? "block" : "none",
        isTop,
        handleMouseEnter,
        handleMouseLeave
    };
}
