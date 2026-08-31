"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
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

const ReviewModal = ({ review, onClose }: { review: ReviewItem, onClose: () => void }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const isNonEnglish = review.language && review.language !== "en";

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-neutral-950 border border-white/20 w-full max-w-2xl max-h-[85vh] overflow-y-auto z-10 flex flex-col shadow-2xl"
      >
        <div className="sticky top-0 bg-neutral-950/90 backdrop-blur-sm border-b border-white/10 p-4 md:p-6 flex justify-between items-center z-20">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-800 border border-white/20 shrink-0">
              {review.avatar ? (
                <Image src={review.avatar} alt={review.author} fill className="object-cover" sizes="48px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-500 font-mono text-sm">
                  {review.author.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">{review.author}</h3>
              <div className="flex gap-2 items-center">
                <span className="font-mono text-xs text-neutral-500">{review.location || "Global Traveler"}</span>
                {review.platform && (
                  <>
                    <span className="text-neutral-700">•</span>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">{review.platform}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white transition-colors bg-neutral-900 rounded-full border border-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-white text-white" />
              ))}
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{review.date}</span>
          </div>
          <p className="text-base md:text-lg text-neutral-200 leading-relaxed whitespace-pre-wrap">
            {showTranslation && review.translatedContent ? review.translatedContent : review.content}
          </p>

          {isNonEnglish && review.translatedContent && (
            <button 
              onClick={() => setShowTranslation(!showTranslation)}
              className="mt-4 text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase transition-colors underline decoration-white/20 underline-offset-4"
            >
              {showTranslation ? "Show Original" : "Translate to English"}
            </button>
          )}

          {review.hostReply && (
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <span className="text-black font-bold text-sm">Y</span>
                </div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Reply from Yuichi</span>
              </div>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed bg-neutral-900 p-4 border border-white/5 rounded-sm">
                {review.hostReply}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
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
        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-white/20">
          {review.avatar ? (
            <Image src={review.avatar} alt={review.author} fill className="object-cover" sizes="48px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500 font-mono text-sm">
              {review.author.charAt(0)}
            </div>
          )}
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
                <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest truncate">{review.platform}</span>
              </>
            )}
          </div>
        </div>
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
        {selectedReview && (
          <ReviewModal 
            review={selectedReview} 
            onClose={() => setSelectedReview(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
