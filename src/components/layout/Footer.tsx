"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-neutral-950 border-t border-zinc-900/40 py-10 md:py-12 2xl:py-14">
      <div className="max-w-6xl 2xl:max-w-[2400px] mx-auto px-6 md:px-12 2xl:px-16 w-full">
      {/* Footer Content */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start mb-8 2xl:mb-10">
          {/* Brand */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-white">MISFITT</h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed whitespace-pre-line">
              {lang === "ja" ? (
                <>
                  ありきたりを脱し 東京を再定義する{"\n"}
                  完全オーダーメイドのプライベートツアー シネマティック撮影 ガイド育成
                </>
              ) : (
                <>
                  Disrupt the ordinary. Redefine Tokyo.{"\n"}
                  Bespoke private tours, cinematic photography, and guide academy.
                </>
              )}
            </p>
          </div>

          {/* Navigation & Social Combined */}
          <div className="md:col-span-6">
            <p className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase mb-4">
              [ NAVIGATION ]
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-mono tracking-wider text-neutral-300 uppercase">
              <li><Link href="/tours" className="hover:text-white transition">Tours</Link></li>
              <li><Link href="/photography" className="hover:text-white transition">Photography</Link></li>
              <li><Link href="/me" className="hover:text-white transition">Founder</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li>
                <a href="https://www.instagram.com/yutheguide/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/yuichi-narisawa-69ab2b1/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Integrated Company Profile */}
        <div className="pt-6 2xl:pt-8 border-t border-neutral-900">
          <p className="text-neutral-600 font-mono text-[10px] tracking-widest uppercase mb-4">
            [ COMPANY PROFILE ]
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 font-mono text-[10px] tracking-wider text-neutral-500">
            <div className="flex flex-col gap-1">
              <span className="text-neutral-600 uppercase">Company_</span>
              <span className="text-neutral-300">{lang === "ja" ? "株式会社Misfitt" : "Misfitt Inc."}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-neutral-600 uppercase">Founder / CEO_</span>
              <span className="text-neutral-300 truncate">{lang === "ja" ? "成澤 祐一" : "Yuichi Narisawa"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-neutral-600 uppercase">Location_</span>
              <span className="text-neutral-300">{lang === "ja" ? "東京都" : "Tokyo, Japan"}</span>
            </div>
            {lang === "ja" ? (
              <div className="flex flex-col gap-1">
                <span className="text-neutral-600 uppercase">Banking_</span>
                <span className="text-neutral-300 truncate">三井住友銀行 / 多摩信金</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <span className="text-neutral-600 uppercase">Services_</span>
                <span className="text-neutral-300 truncate">Bespoke Tours, Photography</span>
              </div>
            )}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 2xl:mt-10 pt-4 2xl:pt-6 border-t border-neutral-900 flex justify-between items-center text-[9px] font-mono tracking-widest text-neutral-600">
          <span>&copy; {new Date().getFullYear()} MISFITT INC. ALL RIGHTS RESERVED.</span>
          <span>TOKYO / JAPAN</span>
        </div>
        </div>
      </div>
    </footer>
  );
}
