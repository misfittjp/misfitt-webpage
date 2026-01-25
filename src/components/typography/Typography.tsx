import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
    children: ReactNode;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    variant?: "hero" | "h1" | "h2" | "h3" | "body" | "small";
    font?: "serif" | "sans" | "ja-serif" | "ja-sans";
    gradient?: boolean;
}

/**
 * タイポグラフィコンポーネント
 * ブランドに合わせた美しい文字組みを提供
 */
export function Typography({
    children,
    className = "",
    as: Component = "p",
    variant = "body",
    font,
    gradient = false,
}: TypographyProps) {
    const baseClasses = "text-balance";

    const variantClasses = {
        hero: "text-hero font-serif font-bold tracking-tight",
        h1: "text-h1 font-serif font-bold tracking-tight",
        h2: "text-h2 font-serif font-semibold",
        h3: "text-h3 font-sans font-medium",
        body: "text-body font-sans font-normal",
        small: "text-small font-sans font-normal",
    };

    const fontClasses = font ? `font-${font}` : "";
    const gradientClass = gradient ? "text-gradient" : "";

    return (
        <Component
            className={cn(
                baseClasses,
                variantClasses[variant],
                fontClasses,
                gradientClass,
                className
            )}
        >
            {children}
        </Component>
    );
}
