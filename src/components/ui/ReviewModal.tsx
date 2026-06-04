"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { type Review } from "@/data/sections/reviews";
import { useReadReviews } from "@/contexts/ReadReviewsContext";

/**
 * レビューモーダル（3Dフリップエフェクト）
 * 左右矢印キーまたはボタンでナビゲーション可能
 */
export function ReviewModal({
    review,
    onClose,
    onPrev,
    onNext
}: {
    review: Review;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
}) {
    const { isRead } = useReadReviews();

    // キーボード操作対応
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" && onPrev) onPrev();
            if (e.key === "ArrowRight" && onNext) onNext();
            if (["Escape", " ", "Enter", "x", "X"].includes(e.key)) {
                e.preventDefault(); // スペースでのスクロール等を防ぐ
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onPrev, onNext, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
        >
            {/* 左矢印ボタン (PC) */}
            {onPrev && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrev();
                    }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-colors z-50 hidden md:block group cursor-pointer"
                    aria-label="Previous Review"
                >
                    <div className="bg-black/50 p-2 rounded-full border border-white/10 group-hover:border-white/40 transition-colors backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                </button>
            )}

            {/* 右矢印ボタン (PC) */}
            {onNext && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-colors z-50 hidden md:block group cursor-pointer"
                    aria-label="Next Review"
                >
                    <div className="bg-black/50 p-2 rounded-full border border-white/10 group-hover:border-white/40 transition-colors backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            )}
            {/* ... (省略) ... */}

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 200
                }}
                className="relative max-w-2xl w-full max-h-[80vh] bg-black border-2 border-white/20 rounded-3xl p-8 md:p-12 overflow-y-auto cursor-pointer shadow-2xl flex flex-col"
                onClick={(e) => {
                    // ユーザー要望により、カードタップでも閉じる
                    // onClickイベントは親に伝播させるので、ここでは何もしない
                }}
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* 閉じるボタン */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl leading-none transition-colors z-10"
                    aria-label="Close"
                >
                    ×
                </button>

                {/* コンテンツラッパー */}
                <div className="flex-1">
                    {/* ヘッダー */}
                    <div className="flex items-center gap-6 mb-8">
                        {review.image ? (
                            <img
                                src={review.image}
                                alt={review.name}
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                                style={{
                                    filter: isRead(review.id)
                                        ? "grayscale(0%) brightness(100%) contrast(100%)"
                                        : "grayscale(100%) brightness(90%) contrast(120%)"
                                }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const fallback = target.nextElementSibling as HTMLDivElement;
                                    if (fallback) fallback.style.display = 'flex';
                                }}
                            />
                        ) : null}

                        {/* フォールバック用イニシャル */}
                        <div
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-4xl font-serif"
                            style={{ display: review.image ? 'none' : 'flex' }}
                        >
                            {review.name[0]}
                        </div>

                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif">
                                {review.name}
                            </h3>
                            <p className="text-white/60">
                                {review.location} • {review.date}
                            </p>
                            <div
                                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs uppercase tracking-wider ${review.duration === "8h"
                                    ? "bg-amber-500/20 text-amber-200 border border-amber-500/30"
                                    : "bg-white/10 text-white/60 border border-white/20"
                                    }`}
                            >
                                {review.duration} Experience
                            </div>
                        </div>
                    </div>

                    {/* 全文 */}
                    <blockquote className="text-white/90 text-base md:text-lg leading-relaxed font-sans mb-8">
                        "{review.text}"
                    </blockquote>
                </div>

                {/* キーボード操作案内 */}
                <div className="mt-auto pt-6 border-t border-white/10 text-center text-white/30 text-xs tracking-widest uppercase hidden md:block font-mono">
                    Keyboard controls: <span className="text-white/50">← Prev</span> <span className="mx-2">•</span> <span className="text-white/50">Next →</span> <span className="mx-2">•</span> <span className="text-white/50">Esc / Space / X to Close</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
