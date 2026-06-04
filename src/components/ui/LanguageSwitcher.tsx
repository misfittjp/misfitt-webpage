'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';

export function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    // toggleLanguage is now handled entirely by the Context (No-Reload)

    return (
        <div className="fixed top-8 right-8 z-50">
            <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105"
                aria-label={`Switch to ${language === 'en' ? 'Japanese' : 'English'}`}
            >
                {language === 'en' ? 'JP' : 'EN'}
            </button>
        </div>
    );
}
