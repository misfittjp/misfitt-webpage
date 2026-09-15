"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceItem {
  id: string;
  titleEn: string;
  titleJa: string;
  descEn: string;
  descJa: string;
  specs: string[];
  link: string;
}

const services: ServiceItem[] = [
  {
    id: "01",
    titleEn: "BESPOKE PRIVATE TOURS",
    titleJa: "BESPOKE PRIVATE TOURS",
    descEn: "Fully tailor-made private journeys unscripted across Tokyo—from high-end gastronomy to raw subcultures.",
    descJa: "ありきたりな「観光」を脱し、「東京」を解き明かすオーダーメイドのプライベートツアー",
    specs: ["[ FORMAT: 1-ON-1 / PRIVATE ]", "[ SCOPE: UNRESTRICTED TOKYO ]"],
    link: "/tours",
  },
  {
    id: "02",
    titleEn: "CINEMATIC STREET PHOTOGRAPHY",
    titleJa: "CINEMATIC STREET PHOTOGRAPHY",
    descEn: "Cinematic production set against Tokyo's raw backdrop—capturing unscripted, editorial memories in true native tone.",
    descJa: "東京を舞台に旅の記憶をシネマティックに残す、色褪せないプライベート撮影",
    specs: ["[ BODY: ILCE-7M5 ]", "[ FORMAT: RAW / 4K ]", "[ STYLE: EDITORIAL ]"],
    link: "/photography",
  },
  {
    id: "03",
    titleEn: "TOURISM STRATEGY & ADVISORY",
    titleJa: "TOURISM STRATEGY & ADVISORY",
    descEn: "Translating raw frontline insights into actionable strategy for global luxury tourism and high-end brands.",
    descJa: "現場のインサイトとシネマティックな視点で、地域の魅力を世界へ発信するアドバイザリー",
    specs: ["[ TARGET: LUXURY ASSETS / BRANDS ]", "[ DOMAIN: INBOUND CULTURE ]"],
    link: "/advisory",
  },
  {
    id: "04",
    titleEn: "PRO TOUR GUIDE BOOTCAMP",
    titleJa: "インバウンドガイド ブートキャンプ",
    descEn: "Practical field training system tailored for licensed independent guides commanding premium international value.",
    descJa: "未経験から「選ばれ続けるプロガイド」へ。知識、技術に加えマネタイズまで包括的に伝授",
    specs: ["[ CADRE: GOV-LICENSED ACADEMY ]", "[ METHOD: LIVE DEPLOYMENT ]"],
    link: "/academy",
  },
];

export default function MissionAndCapabilities() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* =========================================
          SECTION 2-A: MANIFESTO
      ========================================= */}
      <section className="w-full relative flex flex-col justify-center items-center px-6 md:px-12 2xl:px-16 overflow-hidden bg-black py-24 2xl:py-36">
        
        {/* コンテンツ */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl 2xl:max-w-7xl mx-auto">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-zinc-500 uppercase whitespace-nowrap mb-8 text-center block">
            // 01 MANIFESTO
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-center max-w-6xl leading-tight text-white">
            WE REJECT THE <span className="italic font-serif font-light text-neutral-400">SUPERFICIAL</span>.<br />
            WE EMBRACE THE RAW, THE AUTHENTIC, AND THE PROFOUND.
          </h2>
          <div className="text-base md:text-xl text-zinc-400 text-center max-w-3xl mt-8 md:mt-12 leading-relaxed space-y-6">
            <p>
              Misfitt is born from the streets of Tokyo. We don&apos;t do tourist traps, scripted speeches, or crowded buses. We are professionals of the field—immersed in the subcultures, the high-end gastronomy, and the architectural brilliance that defines this city.
            </p>
            <p>
              Whether it&apos;s capturing editorial street photography in Kabukicho or navigating historic culinary backstreets and authentic counter-culture, our approach is always cinematic, always uncompromising.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2-B: CAPABILITIES / SERVICES
      ========================================= */}
      <section className="w-full relative flex flex-col justify-center px-6 md:px-12 2xl:px-16 bg-black py-24 2xl:py-36 border-t border-zinc-900/40">
        <div className="w-full max-w-6xl 2xl:max-w-[1560px] mx-auto flex flex-col justify-center space-y-12">
          
          {/* ヘッダー部分 */}
          <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-zinc-500 uppercase whitespace-nowrap block mb-2">
                // 02 CAPABILITIES
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                OUR SERVICES
              </h3>
            </div>
            <span className="font-mono text-[10px] md:text-xs text-neutral-500">01 — 04</span>
          </div>

          {/* スマホ用ボタン切り替えUI */}
          <div className="md:hidden flex items-center justify-between mb-2">
            <div className="flex gap-2">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`font-mono text-xs px-3 py-1 border transition-colors ${
                    activeIndex === idx
                      ? "border-emerald-500 text-emerald-400 bg-emerald-950/30 font-bold"
                      : "border-neutral-800 text-neutral-500"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
              <button
                onClick={() => setActiveIndex((p) => (p === 0 ? services.length - 1 : p - 1))}
                className="px-2.5 py-1 border border-neutral-800 hover:text-white"
              >
                ←
              </button>
              <button
                onClick={() => setActiveIndex((p) => (p === services.length - 1 ? 0 : p + 1))}
                className="px-2.5 py-1 border border-neutral-800 hover:text-white"
              >
                →
              </button>
            </div>
          </div>

          {/* スマホ表示 */}
          <div className="md:hidden">
            {(() => {
              const item = services[activeIndex];
              return (
                <div className="relative w-full border border-zinc-800 bg-neutral-950 p-8 flex flex-col justify-between min-h-[320px]">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-500/50"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/50"></div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-xs text-emerald-400">[{item.id}]</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <h4 className="font-bold text-lg text-white">
                      {lang === "ja" ? item.titleJa : item.titleEn}
                    </h4>
                    <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                      {lang === "ja" ? item.descJa : item.descEn}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-900">
                    <div className="font-mono text-[9px] text-neutral-500 space-y-1">
                      {item.specs.map((spec, sIdx) => <div key={sIdx}>{spec}</div>)}
                    </div>
                    <Link href={item.link} className="inline-flex items-center justify-between w-full font-mono text-xs text-neutral-200 bg-neutral-900 border border-zinc-800 px-4 py-3 mt-6 hover:bg-white hover:text-black transition-colors">
                      <span>ACCESS MODULE</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* PC表示：大画面4列 / 中画面2列グリッド */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 flex-1">
            {services.map((item, idx) => (
              <div key={idx} className="relative border border-zinc-800/80 bg-neutral-950/40 p-6 2xl:p-8 flex flex-col justify-between min-h-[380px] 2xl:min-h-[440px] transition-colors hover:bg-neutral-900/60 group">
                {/* L字コーナーブラケット装飾 */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-zinc-600/50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-zinc-600/50"></div>
                
                <div className="mb-6 2xl:mb-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-xs xl:text-sm text-emerald-400">[{item.id}]</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-emerald-500 transition-colors shadow-[0_0_8px_rgba(16,185,129,0)] group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  </div>
                  <h4 className="font-bold text-xl xl:text-2xl text-white mb-4 leading-tight">
                    {lang === "ja" ? item.titleJa : item.titleEn}
                  </h4>
                  <p className="text-xs 2xl:text-sm leading-relaxed text-zinc-400">
                    {lang === "ja" ? item.descJa : item.descEn}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-zinc-800/60">
                  <div className="font-mono text-[10px] xl:text-xs text-neutral-500 space-y-2 mb-8">
                    {item.specs.map((spec, sIdx) => <div key={sIdx}>{spec}</div>)}
                  </div>
                  <Link href={item.link} className="inline-flex items-center justify-between w-full font-mono text-[10px] lg:text-xs xl:text-sm text-neutral-300 hover:text-black group-hover:bg-white border border-zinc-800/60 bg-black/40 px-4 py-3 transition-colors hover:border-zinc-400">
                    <span>ACCESS MODULE</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
