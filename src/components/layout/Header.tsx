"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl bg-black/70 border-b border-white/10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tighter text-neutral-100 uppercase"
        >
          MISFITT.TOKYO
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#services"
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            SERVICES
          </Link>
          <Link
            href="#archive"
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            ARCHIVE
          </Link>
          <Link
            href="#founder"
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            FOUNDER
          </Link>
          
          <div className="h-4 w-px bg-white/10 mx-2"></div>

          <button className="text-xs font-mono tracking-widest text-neutral-400 hover:text-neutral-100 transition-colors">
            EN
          </button>

          <Link
            href="#inquire"
            className="border border-white/20 px-5 py-2 text-xs font-mono tracking-widest text-neutral-100 transition-all hover:bg-neutral-100 hover:text-neutral-950"
          >
            INQUIRE
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-neutral-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
