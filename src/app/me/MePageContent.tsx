'use client';

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import MissionCTA from "@/components/sections/MissionCTA";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const dossierData = {
  en: {
    educationTitle: "EDUCATION",
    educationItems: [
      "Waseda University, M.A. in Global Information and Telecommunication Studies",
      "Waseda University, B.A. in Education (Major in Social Sciences)",
    ],
    creativeTitle: "CREATIVE CAREER",
    creativeBody:
      "Background in art direction and video production—bringing a cinematic eye for light, spatial composition, and urban storytelling to every private tour.",
    rootsTitle: "ROOTS & PHYSICALITY",
    rootsItems: [
      "Okinawa Goju-ryu Karate — Black Belt (Shodan)",
      "Former Freestyle Skier — Tackling backcountry terrains across North America, New Zealand, and of course Japan; grounding a tireless physical stamina in the field.",
    ],
  },
  ja: {
    educationTitle: "学歴",
    educationItems: [
      "早稲田大学 大学院 国際情報通信研究科 修士課程修了 (M.A.)",
      "早稲田大学 教育学部 学士 (B.A.)",
    ],
    creativeTitle: "クリエイティブ経歴",
    creativeBody:
      "アートディレクションおよび映像制作などのクリエイティブ出身。空間の切り取り方、光と影の捉え方、都市を物語として魅せる視点はこうしたキャリアの賜物。",
    rootsTitle: "身体性・バックボーン",
    rootsItems: [
      "沖縄剛柔流空手 初段",
      "元フリースタイルスキーヤー — 北米、NZ、日本の山々を滑る",
    ],
  },
};

export const capabilities = [
  {
    titleEn: "Bespoke Private Tours",
    titleJa: "Bespoke Private Tours",
    descEn: "Fully tailored private journeys crafted for high-end travelers and families.",
    descJa: "完全オーダーメイドのプライベートツアー企画・個別キュレーション。",
    link: "/tours",
    linkTextEn: "EXPLORE TOURS",
    linkTextJa: "ツアーを見る",
  },
  {
    titleEn: "Editorial Street Photography",
    titleJa: "エディトリアル・ストリート撮影",
    descEn: "Cinematic portraiture set against Tokyo's raw urban textures—capturing once-in-a-lifetime memories in frames that never fade.",
    descJa: "東京の街そのものを舞台に、旅の温度と記憶をシネマティックに切り取るプライベート撮影。一生モノの記録を写真に残す。",
    link: "/archive",
    linkTextEn: "VIEW PORTFOLIO",
    linkTextJa: "作品・撮影詳細",
  },
  {
    titleEn: "Tourism Strategy & Advisory",
    titleJa: "観光戦略・インバウンドアドバイザリー",
    descEn: "Strategic consulting for municipalities and operators to develop high-yield cultural products.",
    descJa: "自治体・DMO・観光事業者向けの高付加価値インバウンド商品造成・戦略アドバイザリー。",
    link: "/contact?type=advisory",
    linkTextEn: "INQUIRE CONSULTING",
    linkTextJa: "アドバイザリー相談",
  },
  {
    titleEn: "Guide Academy",
    titleJa: "ガイド起業アカデミー",
    descEn: "A practical mentorship program turning English enthusiasm into professional field guiding—empowering aspiring talent from zero to pro.",
    descJa: "「英語を活かしたい」未経験から、選ばれるプロのインバウンドガイドへ。現場で通用する案内技術と運用方法を伝授。",
    link: "/academy",
    linkTextEn: "ACADEMY DETAILS",
    linkTextJa: "アカデミー詳細を見る",
  },
];

export default function MePageContent() {
  const { lang } = useLanguage();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-32 font-sans selection:bg-white selection:text-black">
        
        {/* ① HERO PROFILE */}
        <section className="mb-20 w-full max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="md:col-span-5 w-full max-w-[320px] mx-auto md:mx-0 relative aspect-[3/4] overflow-hidden rounded-sm border border-zinc-800">
              <Image
                src="/images/founder/yu.jpg"
                alt="Yuichi Narisawa"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
            
            <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
              <span className="font-mono text-xs text-emerald-500 tracking-widest mb-4 block">[ FOUNDER DOSSIER ]</span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4 uppercase leading-none">
                {lang === "en" ? "YUICHI NARISAWA" : "成澤 祐一"}
              </h1>
              <h2 className="text-sm lg:text-base font-mono tracking-widest text-neutral-400 mb-8 uppercase leading-relaxed">
                {lang === "en" ? "Creative Director, MISFITT" : "MISFITT クリエイティブディレクター"}<br />
                <span className="text-xs text-zinc-500 mt-2 block">National Government Licensed Guide Interpreter</span>
              </h2>
              
              {lang === "en" ? (
                <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light italic border-l-2 border-emerald-500/50 pl-6 py-2 text-left">
                  "Uncovering Tokyo's raw pulse through bespoke private journeys & visual narrative."
                </p>
              ) : (
                <div className="border-l-2 border-emerald-500/50 pl-6 py-2 text-left mt-4 text-neutral-300 font-sans text-base md:text-lg leading-relaxed break-keep">
                  <p>定型を捨て、東京の『今』に触れる。</p>
                  <p className="text-white font-medium mt-1">プライベートツアーとクリエイティビティ。</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ② TRUST METRICS BAR */}
        <section className="mb-32 border-y border-zinc-800/60 bg-neutral-950/30 py-10 w-full">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 xl:px-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-zinc-800">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-white mb-2">10<span className="text-xl md:text-2xl text-zinc-500"> YRS</span></span>
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-emerald-500 uppercase">{lang === 'en' ? 'Field Experience' : '現場経験10年'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-white mb-2">6,000<span className="text-xl md:text-2xl text-zinc-500">+</span></span>
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-emerald-500 uppercase">{lang === 'en' ? 'Guests Guided' : '案内実績人数'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-white mb-2">50<span className="text-xl md:text-2xl text-zinc-500">+</span></span>
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-emerald-500 uppercase">{lang === 'en' ? 'Countries/Regions' : 'ゲスト国籍'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-white mb-2">300<span className="text-xl md:text-2xl text-zinc-500">+</span></span>
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-emerald-500 uppercase">{lang === 'en' ? '5-Star Reviews' : '5つ星レビュー'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ③ MANIFESTO */}
        <section className="mb-32 w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-24 flex flex-col items-center relative py-20">
          <div className="absolute inset-0 pointer-events-none border border-zinc-900/50"></div>
          
          <h3 className="text-[10px] md:text-xs font-mono tracking-widest text-emerald-500 mb-10 uppercase text-center">
            [ PERSONAL MANIFESTO ]
          </h3>
          
          {lang === "en" ? (
            <div className="space-y-8 text-2xl md:text-4xl lg:text-5xl text-white leading-[1.2] font-bold text-center max-w-5xl tracking-tight">
              <p>No templated sightseeing.</p>
              <p className="text-zinc-500 font-light italic">Uncovering deep history and living culture to touch the city's pulse today.</p>
              <p>A bespoke journey aligning the rhythm of Tokyo with your distinct curiosity.</p>
              <p className="text-emerald-400">Moments that stay vivid—etched in memory and framed in time.</p>
            </div>
          ) : (
            <div className="space-y-8 text-xl md:text-3xl lg:text-4xl text-white leading-tight font-bold text-center max-w-4xl text-pretty tracking-tight">
              <p>ありふれた観光地巡りはしない。</p>
              <p className="text-zinc-500 font-light">歴史と文化を紐解き、都市の『今』に触れる。</p>
              <p>街のリズムと、あなたの好奇心を重ね合わせるオーダーメイドの旅。</p>
              <p className="text-emerald-400">記憶にも記録にも、色褪せない瞬間を。</p>
            </div>
          )}
        </section>

        {/* ④ WHAT I DO */}
        <section className="mb-40 w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-24">
          <div className="flex justify-between items-end border-b border-zinc-800 pb-4 mb-12">
            <div>
              <span className="text-[10px] md:text-xs font-mono tracking-widest text-neutral-500 block uppercase mb-2">
                [ CAPABILITIES ]
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                WHAT I DO
              </h3>
            </div>
            <span className="font-mono text-[10px] md:text-xs text-neutral-500">01 — 04</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {capabilities.map((item, idx) => (
              <div key={idx} className="relative border border-zinc-800/80 bg-neutral-950/40 p-8 xl:p-10 flex flex-col justify-between min-h-[320px] transition-colors hover:bg-neutral-900/60 group">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-zinc-600/50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-zinc-600/50"></div>
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-xs xl:text-sm text-emerald-400">[0{idx + 1}]</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-emerald-500 transition-colors shadow-[0_0_8px_rgba(16,185,129,0)] group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  </div>
                  <h4 className="font-bold text-lg xl:text-2xl text-white mb-4 leading-tight uppercase">
                    {lang === 'ja' ? item.titleJa : item.titleEn}
                  </h4>
                  <p className="text-zinc-400 text-sm xl:text-base leading-relaxed break-keep">
                    {lang === 'ja' ? item.descJa : item.descEn}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-800/60">
                  <Link href={item.link} className="inline-flex items-center justify-between w-full font-mono text-[10px] lg:text-xs xl:text-sm text-neutral-300 hover:text-black group-hover:bg-white border border-zinc-800/60 bg-black/40 px-4 py-3 transition-colors hover:border-zinc-400">
                    <span>{lang === 'ja' ? item.linkTextJa : item.linkTextEn}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ⑤ DOSSIER / BACKGROUND */}
        <section className="mb-32 w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-24">
          <div className="border border-zinc-800/80 bg-neutral-950/30 p-8 md:p-16">
            <h3 className="text-[10px] md:text-xs font-mono tracking-widest text-emerald-500 mb-12 uppercase border-b border-zinc-800 pb-4">
              [ DOSSIER & BACKGROUND ]
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              {/* Education & Creative */}
              <div className="space-y-12">
                <div>
                  <h4 className="text-sm font-mono text-zinc-500 tracking-widest mb-6 uppercase border-l-2 border-zinc-800 pl-4">{dossierData[lang].educationTitle}</h4>
                  <ul className="space-y-4 text-base text-zinc-300 pl-4">
                    {dossierData[lang].educationItems.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-emerald-500 mr-4 font-bold">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-mono text-zinc-500 tracking-widest mb-6 uppercase border-l-2 border-zinc-800 pl-4">{dossierData[lang].creativeTitle}</h4>
                  <p className={`text-base text-zinc-300 leading-relaxed font-light pl-4 ${lang === 'ja' ? 'text-pretty' : ''}`}>
                    {dossierData[lang].creativeBody}
                  </p>
                </div>
              </div>

              {/* Roots & Physicality */}
              <div>
                <h4 className="text-sm font-mono text-zinc-500 tracking-widest mb-6 uppercase border-l-2 border-zinc-800 pl-4">{dossierData[lang].rootsTitle}</h4>
                <ul className="space-y-4 text-base text-zinc-300 pl-4">
                  {dossierData[lang].rootsItems.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-emerald-500 mr-4 font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ⑥ CONTACT & SOCIAL */}
        <section className="w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-24 mb-24">
          <div className="border-t border-zinc-800 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <Link
              href="/contact"
              className="w-full md:w-auto px-10 py-5 bg-white text-black text-xs md:text-sm font-mono tracking-widest uppercase hover:bg-neutral-200 transition-colors text-center font-bold"
            >
              {lang === 'en' ? 'Inquire a Bespoke Tour / Contact Yu' : 'ツアーのご相談・お問い合わせ'}
            </Link>

            <div className="flex items-center gap-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="mailto:info@misfitt.tokyo" className="text-zinc-500 hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Back to Flagship */}
        <div className="pb-16 text-center">
          <Link 
            href="/"
            className="group inline-flex items-center gap-4 text-xs font-mono tracking-widest text-zinc-500 hover:text-white transition-colors uppercase"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {lang === 'en' ? 'Back to Flagship Studio' : 'トップページへ戻る'}
          </Link>
        </div>

      </main>
      
      <MissionCTA />
      <Footer />
    </>
  );
}
