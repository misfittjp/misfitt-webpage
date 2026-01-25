import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    size?: "default" | "sm" | "lg";
}

/**
 * セクションコンテナ
 * 大胆な余白とレイアウト制約を提供
 */
export function Section({
    children,
    className = "",
    id,
    size = "default",
}: SectionProps) {
    const paddingClasses = {
        default: "py-section",
        sm: "py-section-sm",
        lg: "py-section-lg",
    };

    return (
        <section
            id={id}
            className={cn(
                "px-6 md:px-12 lg:px-20",
                paddingClasses[size],
                className
            )}
        >
            <div className="max-w-7xl mx-auto">{children}</div>
        </section>
    );
}

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: "default" | "narrow" | "wide";
}

/**
 * コンテンツコンテナ
 * 読みやすさのための最適な幅制限
 */
export function Container({
    children,
    className = "",
    size = "default",
}: ContainerProps) {
    const maxWidthClasses = {
        narrow: "max-w-3xl",
        default: "max-w-5xl",
        wide: "max-w-7xl",
    };

    return (
        <div className={cn(maxWidthClasses[size], "mx-auto", className)}>
            {children}
        </div>
    );
}
