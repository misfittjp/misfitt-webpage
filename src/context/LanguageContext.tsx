"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ja";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 1. ローカルストレージの保存設定を確認
    const saved = localStorage.getItem("misfitt_lang") as Language | null;
    if (saved === "en" || saved === "ja") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
    } else {
      // 2. 初回訪問時: ブラウザの言語環境を判定
      const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || "";
      if (browserLang.toLowerCase().startsWith("ja")) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState("ja");
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState("en");
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsInitialized(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("misfitt_lang", newLang);
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "ja" : "en");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {/* ハイドレーション時のチラつきを防ぐためマウント後にレンダリング */}
      <div style={{ visibility: isInitialized ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
