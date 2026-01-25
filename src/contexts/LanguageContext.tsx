"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "ja";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    // ローカルストレージから言語設定を読み込み
    useEffect(() => {
        const savedLanguage = localStorage.getItem("misfitt-language") as Language;
        if (savedLanguage === "en" || savedLanguage === "ja") {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("misfitt-language", lang);
    };

    const toggleLanguage = () => {
        const newLanguage = language === "en" ? "ja" : "en";
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
