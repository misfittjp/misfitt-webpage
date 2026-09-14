"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tighter text-neutral-100 uppercase relative z-[60]"
          onClick={closeMenu}
        >
          MISFITT.TOKYO
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#divisions"
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            SERVICES
          </Link>
          <Link
            href="/tours"
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            TOURS
          </Link>
          <Link
            href="/me"
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            DOSSIER
          </Link>
          
          <div className="h-4 w-px bg-white/10 mx-2"></div>

          <div className="flex gap-2">
            <button 
              onClick={() => setLang('en')} 
              className={`text-[10px] font-mono tracking-widest transition-colors ${lang === 'en' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            >
              EN
            </button>
            <span className="text-neutral-800 text-[10px] font-mono">/</span>
            <button 
              onClick={() => setLang('ja')} 
              className={`text-[10px] font-mono tracking-widest transition-colors ${lang === 'ja' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            >
              JA
            </button>
          </div>

          <Link
            href="/contact"
            className="border border-white/20 px-5 py-2 text-xs font-mono tracking-widest text-neutral-100 transition-all hover:bg-neutral-100 hover:text-neutral-950"
          >
            INQUIRE
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-100 relative z-[60] p-2 -mr-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 h-[100dvh] w-full bg-neutral-950/95 backdrop-blur-md pt-24 px-6 pb-6 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-8 mt-12 items-center">
              <Link
                href="/#divisions"
                className="text-sm font-mono tracking-widest text-neutral-300 hover:text-white transition-colors"
                onClick={closeMenu}
              >
                SERVICES
              </Link>
              <Link
                href="/tours"
                className="text-sm font-mono tracking-widest text-neutral-300 hover:text-white transition-colors"
                onClick={closeMenu}
              >
                TOURS
              </Link>
              <Link
                href="/me"
                className="text-sm font-mono tracking-widest text-neutral-300 hover:text-white transition-colors"
                onClick={closeMenu}
              >
                DOSSIER
              </Link>
              
              <div className="w-12 h-px bg-white/10 my-2"></div>

              <div className="flex gap-4">
                <button 
                  onClick={() => { setLang('en'); closeMenu(); }} 
                  className={`text-xs font-mono tracking-widest transition-colors ${lang === 'en' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
                >
                  EN
                </button>
                <span className="text-neutral-800 text-xs font-mono">/</span>
                <button 
                  onClick={() => { setLang('ja'); closeMenu(); }} 
                  className={`text-xs font-mono tracking-widest transition-colors ${lang === 'ja' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
                >
                  JA
                </button>
              </div>

              <Link
                href="/contact"
                className="mt-6 border border-white/20 px-10 py-3 text-sm font-mono tracking-widest text-neutral-100 transition-all hover:bg-neutral-100 hover:text-neutral-950"
                onClick={closeMenu}
              >
                INQUIRE
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
