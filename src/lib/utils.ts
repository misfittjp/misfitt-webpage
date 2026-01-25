import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSSクラスを効率的にマージするユーティリティ関数
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
