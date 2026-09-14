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
    <section className="w-full min-h-screen bg-black border-t border-neutral-900 py-20 md:py-32 px-6 flex flex-col justify-center">
      <div className="max-w-5xl 2xl:max-w-6xl mx-auto w-full space-y-12">
        
        {/* HUDヘッダー */}
        <div className="border-b border-neutral-900 pb-3 flex justify-between font-mono text-[10px] text-neutral-500 tracking-wider">
          <span>[ SECTOR: 02 // MISSION & CAPABILITIES ]</span>
          <span>[ STATUS: ACTIVE ]</span>
        </div>

        {/* 重厚なManifesto */}
        <div className="max-w-3xl space-y-6">
          <span className="font-mono text-[11px] text-neutral-500 tracking-widest block uppercase">
            OUR MANIFESTO
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            WE REJECT THE <span className="italic font-serif font-light text-neutral-400">SUPERFICIAL</span>.<br />
            WE EMBRACE THE RAW, THE AUTHENTIC, AND THE PROFOUND.
          </h2>
          <div className="space-y-4 text-neutral-400 text-sm md:text-base leading-relaxed">
            <p>
              Misfitt is born from the streets of Tokyo. We don&apos;t do tourist traps, scripted speeches, or crowded buses. We are professionals of the field—immersed in the subcultures, the high-end gastronomy, and the architectural brilliance that defines this city.
            </p>
            <p>
              Whether it&apos;s capturing editorial street photography in Kabukicho or navigating historic culinary backstreets and authentic counter-culture, our approach is always cinematic, always uncompromising.
            </p>
          </div>
        </div>

        {/* SERVICES */}
        <div className="w-full pt-8 border-t border-neutral-900">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="font-mono text-[10px] text-neutral-500 tracking-widest block uppercase mb-1">
                [ CAPABILITIES ]
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                OUR SERVICES
              </h3>
            </div>
            <span className="font-mono text-[10px] text-neutral-500">01 — 04</span>
          </div>

          {/* スマホ用ボタン切り替えUI */}
          <div className="md:hidden flex items-center justify-between pb-3 border-b border-neutral-900 mb-4">
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
                ← PREV
              </button>
              <button
                onClick={() => setActiveIndex((p) => (p === services.length - 1 ? 0 : p + 1))}
                className="px-2.5 py-1 border border-neutral-800 hover:text-white"
              >
                NEXT →
              </button>
            </div>
          </div>

          {/* スマホ表示 */}
          <div className="md:hidden">
            {(() => {
              const item = services[activeIndex];
              return (
                <div className="w-full border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between min-h-[260px]">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs text-emerald-400">[{item.id}]</span>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase">[ ACTIVE MODULE ]</span>
                    </div>
                    <h4 className="font-bold text-base text-white">
                      {lang === "ja" ? item.titleJa : item.titleEn}
                    </h4>
                    <p className="text-neutral-400 text-xs mt-2 leading-relaxed">
                      {lang === "ja" ? item.descJa : item.descEn}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-neutral-900">
                    <div className="font-mono text-[9px] text-neutral-500 space-y-0.5">
                      {item.specs.map((spec, sIdx) => <div key={sIdx}>{spec}</div>)}
                    </div>
                    <Link href={item.link} className="inline-flex items-center justify-between w-full font-mono text-xs text-neutral-200 bg-neutral-900 border border-neutral-800 px-4 py-2.5 mt-4 hover:border-neutral-600 hover:text-white">
                      <span>ACCESS MODULE</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* PC表示：2×2グリッド */}
          <div className="hidden md:grid md:grid-cols-2 gap-4">
            {services.map((item, idx) => (
              <div key={idx} className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-emerald-400 block mb-2">[{item.id}]</span>
                  <h4 className="font-bold text-base md:text-lg text-white">
                    {lang === "ja" ? item.titleJa : item.titleEn}
                  </h4>
                  <p className="text-neutral-400 text-xs md:text-sm mt-2 leading-relaxed">
                    {lang === "ja" ? item.descJa : item.descEn}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-900">
                  <div className="font-mono text-[10px] text-neutral-500 space-y-1">
                    {item.specs.map((spec, sIdx) => <div key={sIdx}>{spec}</div>)}
                  </div>
                  <Link href={item.link} className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-300 hover:text-white mt-4 group">
                    <span>ACCESS MODULE</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
