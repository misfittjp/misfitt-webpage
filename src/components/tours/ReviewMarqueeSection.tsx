"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { highEndReviews, extendedReviews, standardReviews, type Review, reviewStats } from "@/data/sections/reviews";
import { useReadReviews } from "@/contexts/ReadReviewsContext";
import { ReviewModal } from "@/components/ui/ReviewModal";
import { useCarousel } from "@/hooks/useCarousel";
import { useLanguage } from "@/contexts/LanguageContext"; // Added

type FilterType = "all" | "8h" | "7h" | "6h";

/**
 * Review Marquee Section
 * Header (Title/Crown) + Filters + Marquee Reviews integrated into one cohesive section
 */
export function ReviewMarqueeSection() {
    const { language } = useLanguage();
    const dataKey = language === "ja" ? "ja" : "en";

    const [filter, setFilter] = useState<FilterType>("all");
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const { isRead, markAsRead } = useReadReviews();

    // ... (rest of logic: shuffledData state, useEffect, useCarousel, event handlers) ...
    // Note: Re-implementing the function body to insert the header content at the top.

    // シャッフルされたレビューデータを管理
    const [shuffledData, setShuffledData] = useState({
        highEnd: highEndReviews,
        extended: extendedReviews,
        standard: standardReviews
    });

    useEffect(() => {
        // マウント時にシャッフル
        const shuffle = (array: Review[]) => [...array].sort(() => Math.random() - 0.5);
        setShuffledData({
            highEnd: shuffle(highEndReviews),
            extended: shuffle(extendedReviews),
            standard: shuffle(standardReviews)
        });
    }, []);

    // カルーセル制御フック
    const upperCtrl = useCarousel({ speed: 0.8, direction: "left" });
    const lowerCtrl = useCarousel({ speed: 0.8, direction: "right" });

    // カードクリック時の処理 (上段)
    const handleCardClickUpper = (review: Review) => {
        if (!upperCtrl.isClickAllowed()) return;
        setSelectedReview(review);
        markAsRead(review.id);
        upperCtrl.setIsPlaying(false);
        lowerCtrl.setIsPlaying(false);
    };

    // カードクリック時の処理 (下段)
    const handleCardClickLower = (review: Review) => {
        if (!lowerCtrl.isClickAllowed()) return;
        setSelectedReview(review);
        markAsRead(review.id);
        upperCtrl.setIsPlaying(false);
        lowerCtrl.setIsPlaying(false);
    };

    // モーダルを閉じる
    const closeModal = () => {
        setSelectedReview(null);
        upperCtrl.setIsPlaying(true);
        lowerCtrl.setIsPlaying(true);
    };

    // 表示するレビューデータの決定
    const getReviewSets = () => {
        if (filter === "8h") {
            const list = shuffledData.highEnd;
            const midpoint = Math.ceil(list.length / 2);
            return {
                upper: list.slice(0, midpoint),
                lower: list.slice(midpoint)
            };
        }
        if (filter === "7h") {
            const list = shuffledData.extended;
            const midpoint = Math.ceil(list.length / 2);
            return {
                upper: list.slice(0, midpoint),
                lower: list.slice(midpoint)
            };
        }
        if (filter === "6h") {
            const list = shuffledData.standard;
            const midpoint = Math.ceil(list.length / 2);
            return {
                upper: list.slice(0, midpoint),
                lower: list.slice(midpoint)
            };
        }
        // ALL (Default) - Upper: 8h, Lower: 7h + 6h
        return {
            upper: shuffledData.highEnd,
            lower: [...shuffledData.extended, ...shuffledData.standard]
        };
    };

    const { upper, lower } = getReviewSets();

    // ナビゲーション用のリスト取得と移動処理
    const handleNavigate = (direction: "prev" | "next") => {
        if (!selectedReview) return;

        let list: Review[] = [];
        if (filter === "8h") list = shuffledData.highEnd;
        else if (filter === "7h") list = shuffledData.extended;
        else if (filter === "6h") list = shuffledData.standard;
        else list = [...shuffledData.highEnd, ...shuffledData.extended, ...shuffledData.standard];

        const currentIndex = list.findIndex(r => r.id === selectedReview.id);
        if (currentIndex === -1) return;

        let nextIndex;
        if (direction === "next") {
            nextIndex = (currentIndex + 1) % list.length;
        } else {
            nextIndex = (currentIndex - 1 + list.length) % list.length;
        }

        const nextReview = list[nextIndex];
        setSelectedReview(nextReview);
        markAsRead(nextReview.id);
    };

    return (
        <section className="relative py-12 md:py-20 bg-black overflow-hidden group/section">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Header Content (Integrated & Compact) */}
            <div className="max-w-4xl mx-auto px-6 relative z-10 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center space-y-4"
                >
                    {/* Top Tagline */}
                    <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.3em] font-light">
                        {reviewStats.badge[dataKey as keyof typeof reviewStats.badge]}
                    </p>

                    {/* 5-Star Animation & Title */}
                    <div className="flex flex-col items-center gap-4">
                        {/* 5 Stars */}
                        <div className="flex gap-3 relative">
                            {/* Glow behind stars */}
                            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full" />

                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.svg
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: i * 0.15, // Stagger effect (Left to Right)
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-yellow-500 w-6 h-6 md:w-8 md:h-8"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </motion.svg>
                            ))}
                        </div>

                        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wider flex flex-col items-center">
                            <span className="block bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                                {reviewStats.acclaim.title[dataKey as keyof typeof reviewStats.acclaim.title]}
                            </span>
                        </h2>
                    </div>

                    {/* Minimal Divider (Optional, kept for separation but minimal) */}
                    <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />

                    {/* Subtitle REMOVED as requested to save space */}
                </motion.div>
            </div>


            <div className="space-y-12">
                {/* フィルタリングボタン */}
                <div className="flex justify-center gap-4 relative z-10">
                    <FilterButton
                        active={filter === "all"}
                        onClick={() => setFilter("all")}
                        label="All Reviews"
                    />
                    <FilterButton
                        active={filter === "8h"}
                        onClick={() => setFilter("8h")}
                        label="8 Hours"
                    />
                    <FilterButton
                        active={filter === "7h"}
                        onClick={() => setFilter("7h")}
                        label="7 Hours"
                    />
                    <FilterButton
                        active={filter === "6h"}
                        onClick={() => setFilter("6h")}
                        label="6 Hours"
                    />
                </div>

                {/* --- カルーセルエリア (サンドイッチ構造) --- */}
                <div className="flex flex-col gap-6">

                    {/* Upper Control Bar */}
                    {upper.length > 0 && (
                        <div className="container mx-auto px-6 max-w-7xl">
                            <ControlBar
                                ctrl={upperCtrl}
                                align="right"
                            />
                        </div>
                    )}

                    {/* 上段（右→左） */}
                    {upper.length > 0 && (
                        <div
                            ref={upperCtrl.containerRef}
                            {...upperCtrl.dragHandlers}
                            className="flex overflow-x-hidden scrollbar-hide cursor-grab active:cursor-grabbing select-none"
                            style={{ touchAction: "pan-y" }}
                        >
                            <div className="flex shrink-0 gap-4 md:gap-8 px-4 md:px-8">
                                {upper.map((review) => (
                                    <ReviewCard
                                        key={`1-${review.id}`}
                                        review={review}
                                        isRead={isRead(review.id)}
                                        onClick={() => handleCardClickUpper(review)}
                                    />
                                ))}
                            </div>
                            <div className="flex shrink-0 gap-4 md:gap-8 px-4 md:px-8">
                                {upper.map((review) => (
                                    <ReviewCard
                                        key={`2-${review.id}`}
                                        review={review}
                                        isRead={isRead(review.id)}
                                        onClick={() => handleCardClickUpper(review)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 下段（左→右） */}
                    {lower.length > 0 && (
                        <div
                            ref={lowerCtrl.containerRef}
                            {...lowerCtrl.dragHandlers}
                            className="flex overflow-x-hidden scrollbar-hide cursor-grab active:cursor-grabbing select-none"
                            style={{ touchAction: "pan-y" }}
                        >
                            <div className="flex shrink-0 gap-4 md:gap-8 px-4 md:px-8">
                                {lower.map((review) => (
                                    <ReviewCard
                                        key={`1-${review.id}`}
                                        review={review}
                                        isRead={isRead(review.id)}
                                        onClick={() => handleCardClickLower(review)}
                                    />
                                ))}
                            </div>
                            <div className="flex shrink-0 gap-4 md:gap-8 px-4 md:px-8">
                                {lower.map((review) => (
                                    <ReviewCard
                                        key={`2-${review.id}`}
                                        review={review}
                                        isRead={isRead(review.id)}
                                        onClick={() => handleCardClickLower(review)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lower Control Bar */}
                    {lower.length > 0 && (
                        <div className="container mx-auto px-6 max-w-7xl">
                            <ControlBar
                                ctrl={lowerCtrl}
                                align="left"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* モーダル */}
            <AnimatePresence>
                {selectedReview && (
                    <ReviewModal
                        review={selectedReview}
                        onClose={closeModal}
                        onNext={() => handleNavigate("next")}
                        onPrev={() => handleNavigate("prev")}
                    />
                )}
            </AnimatePresence>

            {/* ホバー時のヒント（PCのみ） */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 pointer-events-none text-white/40 text-xs tracking-widest uppercase hidden md:block">
                Click to read full review
            </div>
        </section>
    );
}

/**
 * コントロールバーコンポーネント (再生ボタン + スライダー)
 */
function ControlBar({ ctrl, align }: { ctrl: any, align: "left" | "right" }) {
    return (
        <div className={`flex items-center gap-4 ${align === "right" ? "flex-row" : "flex-row-reverse"}`}>
            {/* Play/Pause Button */}
            <button
                onClick={() => ctrl.setIsPlaying(!ctrl.isPlaying)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-colors backdrop-blur-sm shrink-0"
                aria-label={ctrl.isPlaying ? "Pause" : "Play"}
            >
                {ctrl.isPlaying ? (
                    <div className="flex gap-0.5 h-3">
                        <span className="w-0.5 h-full bg-white rounded-full"></span>
                        <span className="w-0.5 h-full bg-white rounded-full"></span>
                    </div>
                ) : (
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                )}
            </button>

            {/* Slider */}
            <div className="flex-1 relative group/slider">
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={ctrl.progress || 0}
                    onChange={(e) => ctrl.onSliderChange(parseFloat(e.target.value))}
                    onMouseDown={() => ctrl.setIsPlaying(false)}
                    onMouseUp={() => ctrl.setIsPlaying(true)}
                    onTouchStart={() => ctrl.setIsPlaying(false)}
                    onTouchEnd={() => ctrl.setIsPlaying(true)}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-150 hover:[&::-webkit-slider-thumb]:bg-amber-500"
                />
            </div>
        </div>
    );
}

/**
 * フィルターボタン
 */
function FilterButton({
    active,
    onClick,
    label
}: {
    active: boolean;
    onClick: () => void;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`relative px-5 py-2 md:px-6 md:py-3 border rounded-full text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${active
                ? "border-white bg-white text-black scale-105"
                : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/80 bg-black/50 backdrop-blur-sm"
                }`}
        >
            {label}
        </button>
    );
}

/**
 * レビューカードコンポーネント
 */
function ReviewCard({
    review,
    isRead,
    onClick
}: {
    review: Review;
    isRead: boolean;
    onClick: () => void;
}) {
    // コンテンツは変更なし（既読マーク削除済み）
    return (
        <div
            onClick={onClick}
            className={`w-[380px] md:w-[420px] shrink-0 p-6 md:p-8 border rounded-2xl backdrop-blur-sm transition-all duration-300 cursor-pointer group relative overflow-hidden ${isRead
                ? "bg-white/10 border-amber-500/30 hover:bg-white/15 hover:border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
        >
            {/* プロフィール画像 */}
            <div className="flex items-center gap-4 mb-6">
                {review.image ? (
                    <img
                        src={review.image}
                        alt={review.name}
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-full object-cover transition-all duration-500 ${isRead
                            ? "grayscale-0 brightness-100 contrast-100 ring-2 ring-amber-500/30"
                            : "grayscale brightness-90 contrast-120 group-hover:grayscale-0 group-hover:brightness-100"
                            }`}
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
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white/40 text-2xl font-serif border ${isRead
                        ? "bg-amber-900/20 border-amber-500/30 text-amber-200/80"
                        : "bg-white/10 border-white/10"
                        }`}
                    style={{ display: review.image ? 'none' : 'flex' }}
                >
                    {review.name[0]}
                </div>

                <div className="flex-1 min-w-0">
                    <p className={`text-base truncate transition-colors ${isRead ? "text-amber-100 font-bold" : "text-white/80 font-semibold group-hover:text-white"
                        }`}>
                        {review.name}
                    </p>
                    <p className="text-white/50 text-sm">
                        {review.location}
                    </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${review.duration === "8h"
                    ? "bg-amber-500/20 text-amber-200 border border-amber-500/30"
                    : "bg-white/10 text-white/60 border border-white/20"
                    }`}>
                    <span>
                        {review.duration}
                    </span>
                </div>
            </div>

            {/* レビュー本文 */}
            <blockquote className={`text-sm md:text-base leading-relaxed mb-4 line-clamp-4 transition-colors ${isRead ? "text-white/90" : "text-white/60 group-hover:text-white/80"
                }`}>
                "{review.text}"
            </blockquote>

            {/* 日付 */}
            <div className="flex justify-between items-center">
                <p className="text-white/40 text-xs">
                    {review.date}
                </p>
                <span className={`text-xs uppercase tracking-wider transition-opacity ${isRead ? "text-amber-500/60 opacity-100" : "text-white/30 opacity-0 group-hover:opacity-100"
                    }`}>
                    {isRead ? "Read Again" : "Read Full Story →"}
                </span>
            </div>
        </div>
    );
}
