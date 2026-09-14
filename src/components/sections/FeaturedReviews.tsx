"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, ArrowRight, ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import allReviewsData from "@/data/reviews.json";

const formatLocation = (loc?: string) => {
  if (!loc) return "Global Traveler";
  const cleanLoc = loc.replace(/[・。、\s]+$/, "");
  const parts = cleanLoc.split(/[,、]/);
  const lastPart = parts[parts.length - 1].trim();

  const countryMap: Record<string, string> = {
    "オーストラリア": "Australia",
    "カリフォルニア州": "USA",
    "ドイツ": "Germany",
    "アメリカ合衆国": "USA",
    "イギリス": "UK",
    "フランス": "France",
    "カナダ": "Canada",
    "シンガポール": "Singapore",
    "ニューヨーク州": "USA",
    "ハワイ州": "USA",
    "テキサス州": "USA",
    "ワシントン州": "USA",
    "フロリダ州": "USA",
    "ニュージーランド": "New Zealand",
    "スイス": "Switzerland",
    "メキシコ": "Mexico",
    "スペイン": "Spain",
    "イタリア": "Italy",
    "香港": "Hong Kong",
    "台湾": "Taiwan",
    "大韓民国": "South Korea",
    "中国": "China"
  };

  return countryMap[lastPart] || lastPart;
};

const tickerReviews = allReviewsData.slice(0, 40);

const FEATURED_REVIEWS = [
  {
    id: "feat-1",
    author: "Guillermo",
    location: "USA (Miami, FL)",
    killerPhrase: "“He is Tokyo.”",
    content: "Fantastic experience, really really amazing. He is Tokyo. Don’t second think this experience. Do it!",
    rating: 5,
    avatar: "/images/reviews/rev-6h-106_guillermo.jpg",
    source: "6hour"
  },
  {
    id: "feat-2",
    author: "Chanel",
    location: "USA",
    killerPhrase: "“This trip changed my life.”",
    content: "Stop what you’re doing. Book Yuichi right away before someone else does! What a rich experience filled with culture, kindness and creativity. Yuichi is incredible. This trip changed my life.",
    rating: 5,
    avatar: "/images/reviews/rev-8h-09_chanel.jpg",
    source: "8hour"
  },
  {
    id: "feat-3",
    author: "Joseph D.",
    location: "USA",
    killerPhrase: "“Yu was phenomenal.”",
    content: "Yu exceeded every expectation. He turned what could have been a complicated and stressful experience into a truly memorable one...\n\nYu was phenomenal, knowledgeable, thoughtful, personable, flexible, and genuinely invested in making the experience meaningful for both of us.",
    rating: 5,
    avatar: "/images/reviews/rev-tbl-01_joseph_d.jpg",
    source: "tbl"
  },
  {
    id: "feat-4",
    author: "Lloyd N.",
    location: "Malaysia",
    killerPhrase: "“A version of Tokyo most people never see.”",
    content: "We booked a private evening tour in Tokyo and it ended up being one of the standout experiences of our trip. Our guide was exceptional — sharp, engaging, and with excellent English.\n\nWhat really set him apart was his ability to read exactly what we were after. We had specifically asked to avoid the typical tourist trail, and what followed felt like being shown a version of Tokyo that most people never see. He introduced us to hidden spots and took us through unique areas that gave us a genuine sense of the local culture and atmosphere.\n\nThroughout the evening, he shared fascinating historical context and stories behind the places we visited, making the entire experience far richer and more memorable than a regular tour. He was easygoing, very easy to talk to, and tailored the pace seamlessly to suit us.\n\nAll in all, an outstanding five hours. If you want something more immersive, a bit edgy, and far removed from the standard tourist experience, this is it. Highly recommended.",
    rating: 5,
    avatar: "/images/reviews/rev-tbl-06_lloyd_n.jpg",
    source: "tbl"
  },
  {
    id: "feat-5",
    author: "Lillie",
    location: "USA",
    killerPhrase: "“No other guide matched this level.”",
    content: "We have hired private guides for years in variety of cities around the globe, and no other guide has matched Yuichi’s level of diversity and depth of knowledge... took AMAZING photos.",
    rating: 5,
    avatar: "/images/reviews/rev-6h-141_lillie.jpg",
    source: "6hour"
  },
  {
    id: "feat-6",
    author: "Pedro",
    location: "Mexico",
    killerPhrase: "“Es de otro nivel.”",
    translatedKillerPhrase: "“He is on another level.”",
    content: "No creo que pueda encontrar otro guía como Yu. Es de otro nivel... se siente más como un amigo y no un guía.",
    translatedContent: "I don't think I could find another guide like Yu. He is on another level... it feels more like a friend than a guide.",
    platform: "Airbnb",
    language: "es",
    source: "8hour"
  }
];

type ReviewItem = {
  id?: string;
  author: string;
  location?: string;
  content: string;
  rating?: number;
  platform?: string;
  avatar?: string | null;
  killerPhrase?: string;
  translatedKillerPhrase?: string;
  translatedContent?: string;
  date?: string;
  tourType?: string;
  hostReply?: string | null;
  language?: string;
  source?: string;
};

// プラットフォーム表記フォーマッター
const getPlatformLabel = (source?: string) => {
  if (!source) return "VERIFIED GUEST REVIEW";
  const s = source.toLowerCase();
  if (s.includes("airbnb")) return "VERIFIED AIRBNB REVIEW";
  if (s.includes("toursbylocals") || s.includes("tbl")) return "VERIFIED TOURSBYLOCALS REVIEW";
  return `VERIFIED ${source.toUpperCase()} REVIEW`;
};

const ReviewModal = ({ 
  review, 
  onClose,
  onNext,
  onPrev
}: { 
  review: ReviewItem, 
  onClose: () => void,
  onNext?: () => void,
  onPrev?: () => void
}) => {
  const [mounted, setMounted] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // 翻訳ボタン表示判定（非英語かつ英訳データが存在し、原文と異なる場合のみ）
  const isNonEnglish = review.language && review.language.toLowerCase() !== 'en';
  const hasTranslation = Boolean(review.translatedContent && review.translatedContent !== review.content);
  const showTranslateButton = isNonEnglish && hasTranslation;

  const getListingUrl = (review: ReviewItem) => {
    const is6Hour = review.id?.includes("6h") || review.tourType?.includes("6-Hour") || review.source === '6hour';
    if (is6Hour) return "https://www.airbnb.com/experiences/4912141#reviews";
    return "https://www.airbnb.com/experiences/2909208#reviews";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  const platform = review.platform || (review.id?.includes("tbl") || review.source === 'tbl' || review.source === 'toursbylocals' ? "ToursByLocals" : "Airbnb");

  const cleanQuote = (q?: string) => q ? q.replace(/^["“]+|["”]+$/g, '') : '';

  if (!mounted) return null;

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '80vh',
          backgroundColor: '#121212',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 固定ヘッダー */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: '#121212'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#262626',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#e5e5e5',
              fontFamily: 'serif'
            }}>
              {review.author.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#ffffff' }}>
                {review.author}
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#888888', textTransform: 'uppercase' }}>
                {formatLocation(review.location)} &bull; {getPlatformLabel(platform)}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#888888',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            ✕
          </button>
        </div>

        {/* スクロール本文エリア */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }} className="custom-scrollbar">
          <div style={{ color: '#fbbf24', fontSize: '14px' }}>
            {'★'.repeat(Math.floor(review.rating || 5))}
          </div>
          
          {review.killerPhrase && (
            <div style={{ position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.h4 
                  key={showTranslation ? 'en-title' : 'original-title'}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: '24px', fontStyle: 'italic', color: '#ffffff', lineHeight: 1.4, fontFamily: 'serif' }}
                >
                  &ldquo;{cleanQuote(showTranslation && review.translatedKillerPhrase ? review.translatedKillerPhrase : review.killerPhrase)}&rdquo;
                </motion.h4>
              </AnimatePresence>
            </div>
          )}
          
          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.p 
                key={showTranslation ? 'en' : 'original'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: '14px', lineHeight: 1.7, color: '#d4d4d4', whiteSpace: 'pre-line' }}
              >
                {showTranslation && review.translatedContent ? review.translatedContent : review.content}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 翻訳トグルボタン */}
          {showTranslateButton && (
            <div style={{ paddingTop: '8px' }}>
              <button 
                onClick={() => setShowTranslation(!showTranslation)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  cursor: 'pointer'
                }}
              >
                🌐 {showTranslation ? "SHOW ORIGINAL" : "TRANSLATE TO ENGLISH"}
              </button>
            </div>
          )}
        </div>

        {/* 固定フッター */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: '#121212'
        }}>
          {onPrev ? (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              style={{ background: 'none', border: 'none', color: '#aaaaaa', fontSize: '12px', letterSpacing: '0.1em', cursor: 'pointer' }}
            >
              ← PREV
            </button>
          ) : <div style={{ width: '64px' }} />}

          {platform.toLowerCase() !== 'toursbylocals' ? (
            <a
              href={getListingUrl(review)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ color: '#aaaaaa', fontSize: '11px', letterSpacing: '0.1em', textDecoration: 'underline', textUnderlineOffset: '4px' }}
            >
              READ ON AIRBNB ↗
            </a>
          ) : (
            <div />
          )}

          {onNext ? (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              style={{ background: 'none', border: 'none', color: '#aaaaaa', fontSize: '12px', letterSpacing: '0.1em', cursor: 'pointer' }}
            >
              NEXT →
            </button>
          ) : <div style={{ width: '64px' }} />}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default function FeaturedReviews() {
  const [modalState, setModalState] = useState<{ index: number, source: 'featured' | 'ticker' } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate
  useEffect(() => {
    if (isHovered || modalState) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_REVIEWS.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered, modalState]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % FEATURED_REVIEWS.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + FEATURED_REVIEWS.length) % FEATURED_REVIEWS.length);

  const activeReview = FEATURED_REVIEWS[activeIndex];

  const handleNextModal = () => {
    if (!modalState) return;
    const list = modalState.source === 'featured' ? FEATURED_REVIEWS : tickerReviews;
    setModalState({ ...modalState, index: (modalState.index + 1) % list.length });
  };

  const handlePrevModal = () => {
    if (!modalState) return;
    const list = modalState.source === 'featured' ? FEATURED_REVIEWS : tickerReviews;
    setModalState({ ...modalState, index: (modalState.index - 1 + list.length) % list.length });
  };

  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/10 relative isolate overflow-hidden flex flex-col">
      <div className="px-6 md:px-12 mx-auto max-w-7xl flex flex-col w-full">
        <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
          <p className="font-mono text-[10px] md:text-xs text-neutral-400 tracking-[0.25em] uppercase mb-4">
            [ WORDS FROM THE GUESTS ]
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-2 leading-none">
            The Verdict
          </h2>
        </div>

        {/* Cinematic Stage (Top Half) */}
        <div 
          className="relative w-full max-w-4xl mx-auto min-h-[320px] md:min-h-[400px] flex items-center justify-center py-12 px-8 md:px-24 group mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col items-center text-center cursor-pointer relative z-10 max-w-3xl mx-auto"
              onClick={() => setModalState({ index: activeIndex, source: 'featured' })}
            >
              <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-white leading-tight mb-8 [text-wrap:balance]">
                {activeReview.killerPhrase}
              </h3>
              
              <div className="flex justify-center items-center gap-1 my-3">
                {[...Array(5)].map((_, i) => (
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" key={i}/>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-bold text-neutral-300">{activeReview.author}</span>
                <span className="text-neutral-700">•</span>
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                  {getPlatformLabel(activeReview.platform)}
                </span>
              </div>

              <div className="mt-8 flex items-center gap-2 text-neutral-500 group-hover:text-white transition-colors duration-300">
                <span className="font-mono text-[10px] tracking-widest uppercase border-b border-neutral-700 group-hover:border-white pb-1">
                  Read Full Review
                </span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Manual Navigation Controls */}
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 p-4 text-neutral-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hidden md:block"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 p-4 text-neutral-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hidden md:block"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 35mm Film Strip Ticker (Bottom Half) */}
      <div className="w-full flex flex-col items-center relative my-12 group">
        <div className="w-full flex flex-col bg-[#050505] overflow-hidden" style={{ height: "160px" }}>
          
          {/* Top Sprocket Holes */}
          <div 
            className="h-3 w-full bg-black shrink-0 z-10" 
            style={{ backgroundImage: 'repeating-linear-gradient(to right, #171717 0, #171717 12px, transparent 12px, transparent 20px)' }} 
          />
          
          {/* Film Frames */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 140 }} // Cinematic slow speed
              className="flex w-max items-center h-full hover:[animation-play-state:paused]"
            >
              {[...tickerReviews, ...tickerReviews].map((review, idx) => (
                <div 
                  key={`film-frame-${idx}`} 
                  onClick={() => setModalState({ index: idx % tickerReviews.length, source: 'ticker' })}
                  className="flex flex-col justify-center h-full w-[340px] shrink-0 border-r-[8px] border-black bg-neutral-900 opacity-50 hover:opacity-100 hover:border-white/30 hover:bg-neutral-900/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.07)] transition-all duration-300 cursor-pointer px-6 py-3 gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-white/5 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center text-neutral-500 font-serif text-[12px] italic">
                      {review.author.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={`star-${i}`} className="h-[10px] w-[10px] fill-amber-400/90 text-amber-400/90 transition-colors duration-300" />
                          ))}
                        </div>
                      <span className="font-bold text-neutral-400 group-hover:text-white transition-colors duration-300 text-xs truncate leading-tight">{review.author}</span>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase shrink-0 leading-tight">{formatLocation(review.location)}</span>
                    </div>
                  </div>
                  <span className="text-neutral-400 group-hover:text-white transition-colors duration-300 text-xs line-clamp-2 italic font-serif opacity-80 leading-snug">
                    &quot;{review.content}&quot;
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Sprocket Holes */}
          <div 
            className="h-3 w-full bg-black shrink-0 z-10" 
            style={{ backgroundImage: 'repeating-linear-gradient(to right, #171717 0, #171717 12px, transparent 12px, transparent 20px)' }} 
          />
        </div>
      </div>

      <div className="flex justify-center mt-8 px-6">
        <Link href="/tours" className="group flex items-center gap-4 text-white font-mono uppercase tracking-widest text-xs hover:text-neutral-400 transition-colors">
          READ ALL REVIEWS ON TOURS PAGE
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      <AnimatePresence>
        {modalState && (
          <ReviewModal 
            review={modalState.source === 'featured' ? FEATURED_REVIEWS[modalState.index] : tickerReviews[modalState.index]} 
            onClose={() => setModalState(null)} 
            onNext={handleNextModal}
            onPrev={handlePrevModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
