/**
 * Data for the front page
 * Technical Noir aesthetic
 */

/**
 * Intro Frames: 24 images for The 5-Second Archive
 * All images receive uniform processing (grayscale, high contrast)
 * Each image has individual object-position optimization
 */
export const introFrames = [
    { src: "/images/intro/01.JPG", position: "center" },
    { src: "/images/intro/02.JPG", position: "center" },
    { src: "/images/intro/03.JPG", position: "center" },
    { src: "/images/intro/04.JPG", position: "center" },
    { src: "/images/intro/05.JPG", position: "center" },
    { src: "/images/intro/06.JPG", position: "center" },
    { src: "/images/intro/07.JPG", position: "center" },
    { src: "/images/intro/08.JPG", position: "center" },
    { src: "/images/intro/09.JPG", position: "center" },
    { src: "/images/intro/10.JPG", position: "center" },
    { src: "/images/intro/11.JPG", position: "center" },
    { src: "/images/intro/12.JPG", position: "center" },
    { src: "/images/intro/13.JPG", position: "center" },
    { src: "/images/intro/14.JPG", position: "center" },
    { src: "/images/intro/15.JPG", position: "center" },
    { src: "/images/intro/16.JPG", position: "center" },
    { src: "/images/intro/17.JPG", position: "center" },
    { src: "/images/intro/18.JPG", position: "center" },
    { src: "/images/intro/19.JPG", position: "center" },
    { src: "/images/intro/20.JPG", position: "center" },
    { src: "/images/intro/21.JPG", position: "center" },
    { src: "/images/intro/22.JPG", position: "center" },
    { src: "/images/intro/23.JPG", position: "center" },
    { src: "/images/intro/24.JPG", position: "center" } // P1050449.jpg - Final anchor
];

export const nationalities = [
    "USA", "Germany", "Russia", "Singapore", "France", "UK", "Canada",
    "Australia", "Italy", "Spain", "Netherlands", "Sweden", "Norway",
    "Denmark", "Finland", "Belgium", "Switzerland", "Austria", "Poland",
    "Czech Republic", "Hungary", "Portugal", "Ireland", "New Zealand",
    "South Korea", "Taiwan", "Hong Kong", "Thailand", "Vietnam",
    "Philippines", "Indonesia", "Malaysia", "India", "Brazil",
    "Argentina", "Chile", "Mexico", "Colombia", "Peru", "Israel",
    "UAE", "Saudi Arabia", "Turkey", "South Africa", "Egypt",
    "Morocco", "Kenya", "Nigeria", "Ghana", "Ethiopia",
    "Romania", "Greece", "Croatia", "Slovenia"
];

export const businessAreas = [
    {
        id: "context-walk",
        title: "通訳案内",
        subtitle: "The Context Walk",
        description: "Off the beaten path. Into the context.",
        link: "/tours"
    },
    {
        id: "forge",
        title: "外国語ガイド養成講座",
        subtitle: "The Forge",
        tagline: "Common sight. Uncommon insight.",
        description: "Training the next generation of cultural translators.",
        link: "/forge"
    },
    {
        id: "frame",
        title: "映像制作・企画",
        subtitle: "The Frame",
        description: "Stories that move. Contexts that resonate.",
        link: "/creative"
    },
    {
        id: "signal",
        title: "メディア戦略",
        subtitle: "The Signal",
        description: "Cutting through the noise. Amplifying the signal.",
        link: "/media"
    }
];

export const snsStatus = [
    { platform: "INSTAGRAM", status: "LIVE", url: "https://instagram.com/misfitt.tokyo" },
    { platform: "LINKEDIN", status: "LIVE", url: "https://linkedin.com/company/misfitt" },
    { platform: "YOUTUBE", status: "OFFLINE", subtitle: "Stay Tuned!", url: null },
    { platform: "PROFILE", status: "LIVE", url: "/me" }
];

export const coordinates = {
    lat: "35.6839° N",
    lng: "139.7745° E",
    location: "Nihonbashi, Tokyo"
};

/**
 * Translations for language switching
 */
export const translations = {
    ja: {
        businessAreas: {
            sectionTitle: "事業領域",
            sectionSubtitle: "DOMAIN MASTERY × CREATIVE EXECUTION",
            cta: "詳しく見る"
        },
        identity: {
            title: "Yu",
            subtitle: "Cultural Fixer",
            cta: "全文を読む"
        },
        footer: {
            connectTitle: "Official Connect",
            inquiryTitle: "Inquiry",
            inquiryText: "プロジェクトのご相談、取材・講演依頼、その他お問い合わせはこちらからお願いします。",
            ctaButton: "メッセージを送る"
        }
    },
    en: {
        businessAreas: {
            sectionTitle: "Business Areas",
            sectionSubtitle: "DOMAIN MASTERY × CREATIVE EXECUTION",
            cta: "Learn More"
        },
        identity: {
            title: "Yu",
            subtitle: "Cultural Fixer",
            cta: "Read Full Story"
        },
        footer: {
            connectTitle: "Official Connect",
            inquiryTitle: "Inquiry",
            inquiryText: "For project inquiries, media requests, speaking engagements, or other questions, please contact us here.",
            ctaButton: "Send Message"
        }
    }
};

/**
 * HUD Parameters - Inner Meanings & Visual Logic
 */
export const hudParameters = {
    pp: {
        label: 'PP',
        tooltip: 'PERSPECTIVE PROFILE',
        values: ['STD', 'NOIR', 'LOG', 'VIV'] as const,
        default: 'STD' as const,
        description: 'Color Science Mode'
    },
    f: {
        label: 'F',
        tooltip: 'FIELDWORK [EXPERIENCE YEARS]',
        values: [1.4, 2.8, 4.0, 5.6, 8.0, 10.0],
        default: 10.0,
        description: 'Focus / Blur Level'
    },
    ss: {
        label: 'SS',
        tooltip: 'SOURCE OF SPECTRUM [COUNTRIES]',
        values: [1, 25, 50, 100, 200],
        default: 50,
        description: 'Shutter Speed / Burst Rate',
        display: (val: number) => `1/${val}`
    },
    iso: {
        label: 'ISO',
        tooltip: 'ISOLATION JOURNEY [TOURS]',
        values: [100, 400, 800, 1600, 3200],
        default: 100,
        description: 'Sensitivity / Grain Level'
    }
};

export type PPMode = typeof hudParameters.pp.values[number];
