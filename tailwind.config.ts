import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#000000",
                foreground: "#FFFFFF",
            },
            fontFamily: {
                // Google Fontsから読み込んでいるフォントを指定
                serif: ["Baskervville", "serif"],
                sans: ["Inter", "sans-serif"],
                "ja-serif": ["Noto Serif JP", "serif"],
                "ja-sans": ["Noto Sans JP", "sans-serif"],
            },
            fontSize: {
                // 固定値にすることで計算負荷を減らす
                hero: ["8rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
                h1: ["4rem", { lineHeight: "1.1" }],
                h2: ["2.5rem", { lineHeight: "1.2" }],
                body: ["1.125rem", { lineHeight: "1.7" }],
            },
        },
    },
    plugins: [],
};
export default config;