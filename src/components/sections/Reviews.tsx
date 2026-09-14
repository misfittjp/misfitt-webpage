"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Star, X, ArrowLeft, ArrowRight } from "lucide-react";
import allReviewsData from "@/data/reviews.json";

// The data is already merged and typed
type ReviewItem = typeof allReviewsData[0] & { platform?: string; hostReply?: string; language?: string; translatedContent?: string };

const allReviews = allReviewsData as ReviewItem[];

// Deterministic pseudo-shuffle (e.g., by id hash or just a simple stride) to mix sources
const mixedReviews = allReviews.map((r, i) => ({ r: r as ReviewItem, sortKey: (i * 137) % allReviews.length }))
  .sort((a, b) => a.sortKey - b.sortKey)
  .map(item => item.r);

const chunkSize = Math.ceil(mixedReviews.length / 3);
const row1 = mixedReviews.slice(0, chunkSize);
const row2 = mixedReviews.slice(chunkSize, chunkSize * 2);
const row3 = mixedReviews.slice(chunkSize * 2);

const getListingUrl = (review: ReviewItem) => {
  const is6Hour = review.id?.includes("6h") || review.tourType?.includes("6-Hour");
  if (is6Hour) return "https://www.airbnb.com/experiences/4912141#reviews";
  return "https://www.airbnb.com/experiences/2909208#reviews";
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

  const displayText = showTranslation && review.translatedContent
    ? review.translatedContent
    : review.content;

  // Lock scroll when modal is open
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

  if (!mounted) return null;

  const platform = review.platform || (review.id?.includes("tbl") ? "ToursByLocals" : "Airbnb");

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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
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
                {review.location || 'GLOBAL'} &bull; {review.platform && review.platform.toLowerCase() === 'airbnb' ? 'VERIFIED AIRBNB REVIEW' : review.platform || 'REVIEW'}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#fbbf24', fontSize: '14px' }}>
              {'★'.repeat(Math.floor(review.rating || 5))}
            </div>
            <span style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {review.date}
            </span>
          </div>

          <div style={{ fontSize: '14px', lineHeight: 1.7, color: '#d4d4d4', whiteSpace: 'pre-line' }}>
            {displayText}
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
                🌐 {showTranslation ? 'SHOW ORIGINAL' : 'TRANSLATE TO ENGLISH'}
              </button>
            </div>
          )}

          {/* ホストの返信 */}
          {review.hostReply && (
            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '14px' }}>Y</span>
                </div>
                <span style={{ fontSize: '12px', color: '#aaaaaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Reply from Yuichi</span>
              </div>
              <p style={{ fontSize: '14px', color: '#aaaaaa', lineHeight: 1.6, backgroundColor: '#171717', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}>
                {review.hostReply}
              </p>
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

export default function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  const ReviewCard = ({ review }: { review: ReviewItem }) => (
    <div 
      onClick={() => setSelectedReview(review)}
      className="w-[320px] md:w-[420px] shrink-0 bg-neutral-950 border border-white/10 p-6 md:p-8 flex flex-col justify-between group hover:border-white/40 hover:bg-neutral-900 transition-all duration-300 cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            {[...Array(Math.floor(review.rating || 5))].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-white text-white" />
            ))}
          </div>
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">{review.date}</span>
        </div>
        <p className="text-sm md:text-base text-neutral-300 leading-relaxed italic line-clamp-6 mb-6">
          &quot;{review.content}&quot;
        </p>
      </div>
      
      <div className="flex items-center gap-4 pt-5 border-t border-white/10 mt-auto">
        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-white/20 flex items-center justify-center text-neutral-400 font-mono text-base">
          {review.author.charAt(0)}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-white text-sm tracking-tight truncate group-hover:text-white transition-colors">{review.author}</h4>
          <div className="flex items-center gap-2 mt-1">
            <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase truncate">
              {review.location || "Global Traveler"}
            </p>
            {review.platform && (
              <>
                <span className="text-neutral-700 text-[8px]">•</span>
                <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest truncate">
                  {review.platform === 'airbnb' ? 'VERIFIED AIRBNB REVIEW' : review.platform}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <a 
          href={getListingUrl(review)} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
        >
          Read on Airbnb ↗
        </a>
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="bg-black py-24 md:py-32 overflow-hidden border-t border-white/10 relative isolate">
      <motion.div style={{ y }} className="px-6 md:px-12 mx-auto max-w-7xl mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
        <div>
          <p className="font-mono text-[10px] md:text-xs text-neutral-400 tracking-[0.25em] uppercase mb-4">
            [ UNFILTERED FEEDBACK ]
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-2 leading-none">
            The Legacy
          </h2>
          <p className="font-mono text-[10px] md:text-xs tracking-widest text-neutral-500 uppercase mt-2">
            {allReviews.length} Reviews · Airbnb & ToursByLocals
          </p>
        </div>
        <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end gap-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-white text-white" />
            ))}
          </div>
          <span className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest mt-1">
            5.0 AVERAGE RATING
          </span>
        </div>
      </motion.div>

      <div className="flex flex-col gap-6 relative w-full overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
          className="flex w-max hover:[animation-play-state:paused]"
        >
          <div className="flex gap-6 pr-6">
            {row1.map(review => <ReviewCard key={review.id} review={review} />)}
          </div>
          <div className="flex gap-6 pr-6">
            {row1.map(review => <ReviewCard key={`${review.id}-dup`} review={review} />)}
          </div>
        </motion.div>

        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 90 }}
          className="flex w-max hover:[animation-play-state:paused] -ml-24"
        >
          <div className="flex gap-6 pr-6">
            {row2.map(review => <ReviewCard key={review.id} review={review} />)}
          </div>
          <div className="flex gap-6 pr-6">
            {row2.map(review => <ReviewCard key={`${review.id}-dup`} review={review} />)}
          </div>
        </motion.div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 75 }}
          className="flex w-max hover:[animation-play-state:paused] ml-12"
        >
          <div className="flex gap-6 pr-6">
            {row3.map(review => <ReviewCard key={review.id} review={review} />)}
          </div>
          <div className="flex gap-6 pr-6">
            {row3.map(review => <ReviewCard key={`${review.id}-dup`} review={review} />)}
          </div>
        </motion.div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedReview && (() => {
          const currentIndex = mixedReviews.findIndex(r => r.id === selectedReview.id);
          const handleNext = () => {
            if (currentIndex >= 0 && currentIndex < mixedReviews.length - 1) {
              setSelectedReview(mixedReviews[currentIndex + 1]);
            } else {
              setSelectedReview(mixedReviews[0]);
            }
          };
          const handlePrev = () => {
            if (currentIndex > 0) {
              setSelectedReview(mixedReviews[currentIndex - 1]);
            } else {
              setSelectedReview(mixedReviews[mixedReviews.length - 1]);
            }
          };
          return (
            <ReviewModal 
              review={selectedReview} 
              onClose={() => setSelectedReview(null)} 
              onNext={handleNext}
              onPrev={handlePrev}
            />
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
