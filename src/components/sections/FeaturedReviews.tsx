"use client";

import React, { useState, useEffect } from "react";
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
    platform: "Airbnb",
    avatar: "/images/reviews/rev-6h-106_guillermo.jpg"
  },
  {
    id: "feat-2",
    author: "Chanel",
    location: "USA",
    killerPhrase: "“This trip changed my life.”",
    content: "Stop what you’re doing. Book Yuichi right away before someone else does! What a rich experience filled with culture, kindness and creativity. Yuichi is incredible. This trip changed my life.",
    rating: 5,
    platform: "Airbnb",
    avatar: "/images/reviews/rev-8h-09_chanel.jpg"
  },
  {
    id: "feat-3",
    author: "Joseph D.",
    location: "USA",
    killerPhrase: "“Yu was phenomenal.”",
    content: "Yu exceeded every expectation. He turned what could have been a complicated and stressful experience into a truly memorable one...\n\nYu was phenomenal, knowledgeable, thoughtful, personable, flexible, and genuinely invested in making the experience meaningful for both of us.",
    rating: 5,
    platform: "ToursByLocals",
    avatar: "/images/reviews/rev-tbl-01_joseph_d.jpg"
  },
  {
    id: "feat-4",
    author: "Lloyd N.",
    location: "Malaysia",
    killerPhrase: "“A version of Tokyo most people never see.”",
    content: "We booked a private evening tour in Tokyo and it ended up being one of the standout experiences of our trip. Our guide was exceptional — sharp, engaging, and with excellent English.\n\nWhat really set him apart was his ability to read exactly what we were after. We had specifically asked to avoid the typical tourist trail, and what followed felt like being shown a version of Tokyo that most people never see. He introduced us to hidden spots and took us through unique areas that gave us a genuine sense of the local culture and atmosphere.\n\nThroughout the evening, he shared fascinating historical context and stories behind the places we visited, making the entire experience far richer and more memorable than a regular tour. He was easygoing, very easy to talk to, and tailored the pace seamlessly to suit us.\n\nAll in all, an outstanding five hours. If you want something more immersive, a bit edgy, and far removed from the standard tourist experience, this is it. Highly recommended.",
    rating: 5,
    platform: "ToursByLocals",
    avatar: "/images/reviews/rev-tbl-06_lloyd_n.jpg"
  },
  {
    id: "feat-5",
    author: "Lillie",
    location: "USA",
    killerPhrase: "“No other guide matched this level.”",
    content: "We have hired private guides for years in variety of cities around the globe, and no other guide has matched Yuichi’s level of diversity and depth of knowledge... took AMAZING photos.",
    rating: 5,
    platform: "Airbnb",
    avatar: "/images/reviews/rev-6h-141_lillie.jpg"
  },
  {
    id: "feat-6",
    author: "Pedro",
    location: "Mexico",
    killerPhrase: "“Es de otro nivel.”",
    translatedKillerPhrase: "“He is on another level.”",
    content: "No creo que pueda encontrar otro guía como Yu. Es de otro nivel... se siente más como un amigo y no un guía.",
    translatedContent: "I don't think I could find another guide like Yu. He is on another level... it feels more like a friend than a guide.",
    rating: 5,
    platform: "Airbnb",
    avatar: "/images/reviews/rev-8h-03_pedro.jpg"
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
  const [showTranslation, setShowTranslation] = useState(false);
  const isNonEnglish = review.language && review.language !== "en";

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

  // Use optional chaining or fallbacks for fields that might differ between featured and raw reviews
  const avatarPath = review.avatar; 
  const platform = review.platform || (review.id?.includes("tbl") ? "ToursByLocals" : "Airbnb");

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-neutral-950 border border-white/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
      >
        <div className="sticky top-0 bg-neutral-950/90 backdrop-blur-md border-b border-white/10 p-5 md:p-6 flex justify-between items-center z-20">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-800 border border-white/20 shrink-0">
              {avatarPath ? (
                <Image src={avatarPath} alt={review.author} fill className="object-cover" sizes="48px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-500 font-serif text-lg italic">
                  {review.author.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-lg tracking-tight">{review.author}</h3>
              <div className="flex gap-2 items-center mt-0.5">
                <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">{formatLocation(review.location)}</span>
                <span className="text-neutral-700 text-[8px]">•</span>
                <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">{platform}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-500 hover:text-white transition-colors hover:bg-white/5 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 md:p-12 flex flex-col gap-8">
          <div className="flex gap-1">
            {[...Array(review.rating || 5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-white text-white" />
            ))}
          </div>
          
          {review.killerPhrase && (
            <div className="relative min-h-[4rem]">
              <AnimatePresence mode="wait">
                <motion.h4 
                  key={showTranslation ? 'en-title' : 'original-title'}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight font-serif italic [text-wrap:balance]"
                >
                  {showTranslation && review.translatedKillerPhrase ? review.translatedKillerPhrase : review.killerPhrase}
                </motion.h4>
              </AnimatePresence>
            </div>
          )}
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.p 
                key={showTranslation ? 'en' : 'original'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-base md:text-lg text-neutral-300 leading-relaxed font-serif whitespace-pre-line"
              >
                {showTranslation && review.translatedContent ? review.translatedContent : review.content}
              </motion.p>
            </AnimatePresence>
          </div>

          {isNonEnglish && review.translatedContent && (
            <div className="pt-4 border-t border-white/10 mt-2">
              <button 
                onClick={() => setShowTranslation(!showTranslation)}
                className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                {showTranslation ? "Show Original" : "Translate to English"}
              </button>
            </div>
          )}
          
          {(onPrev || onNext) && (
            <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-4">
              {onPrev ? (
                <button onClick={onPrev} className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Prev
                </button>
              ) : <div />}
              {onNext ? (
                <button onClick={onNext} className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : <div />}
            </div>
          )}
        </div>
      </motion.div>
    </div>
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
            [ WORDS FROM THE FIELD ]
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
              
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-neutral-500 text-neutral-500" />
                  ))}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-neutral-300">{activeReview.author}</span>
                  <span className="text-neutral-700">•</span>
                  <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                    {activeReview.platform}
                  </span>
                </div>
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
                  className="flex flex-col justify-center h-full w-[340px] shrink-0 border-r-[8px] border-black bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer px-6 py-3 gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-white/5 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                      {review.avatar ? (
                        <Image src={review.avatar} alt={review.author} fill className="object-cover" sizes="40px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-500 font-serif text-[12px] italic">
                          {review.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex gap-0.5 mb-0.5">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star key={`star-${i}`} className="h-[10px] w-[10px] fill-neutral-500 text-neutral-500" />
                        ))}
                      </div>
                      <span className="font-bold text-white text-xs truncate leading-tight">{review.author}</span>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase shrink-0 leading-tight">{formatLocation(review.location)}</span>
                    </div>
                  </div>
                  <span className="text-neutral-400 text-xs line-clamp-2 italic font-serif opacity-80 leading-snug">
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
          Read All 312 Reviews On Tours Page
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
