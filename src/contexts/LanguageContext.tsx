'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Language = 'en' | 'ja';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
    initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage = 'ja' }: LanguageProviderProps) {
    const [language, setLanguage] = useState<Language>(initialLanguage);
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ja' : 'en';
        setLanguage(newLang);

        // No-Reload URL Update
        // Update the URL without triggering a Next.js navigation/remount
        const newPath = pathname.replace(`/${language}`, `/${newLang}`);
        window.history.pushState(null, '', newPath);
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
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
