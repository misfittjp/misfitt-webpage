"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCarousel } from "@/hooks/useCarousel";

// 仮の写真データ
const tourPhotos = [
    { id: 1, src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", alt: "Tokyo Street", caption: "Urban Exploration" },
    { id: 2, src: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80", alt: "Shibuya Crossing", caption: "The Pulse of Tokyo" },
    { id: 3, src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80", alt: "Tokyo Tower", caption: "Iconic Views" },
    { id: 4, src: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&q=80", alt: "Izakaya", caption: "Local Flavors" },
    { id: 5, src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", alt: "Lanterns", caption: "Hidden Alleys" },
    { id: 6, src: "https://images.unsplash.com/photo-1528360983277-13d9012356ee?w=800&q=80", alt: "Food Market", caption: "Culinary Journey" },
    { id: 7, src: "https://images.unsplash.com/photo-1519965365511-b0625409b52a?w=800&q=80", alt: "Shrine", caption: "Spiritual Side" },
    { id: 8, src: "https://images.unsplash.com/photo-1553531580-652231dae097?w=800&q=80", alt: "Night View", caption: "Cyberpunk City" },
];

/**
 * Tour Photo Gallery Section
 */
export function InteractiveReviewSection() {
    const [selectedPhoto, setSelectedPhoto] = useState<typeof tourPhotos[0] | null>(null);
    const [viewedIds, setViewedIds] = useState<number[]>([]);

    // カルーセル制御フック
    const carouselCtrl = useCarousel({ speed: 0.8, direction: "left" });

    // 閲覧済みIDのロード
    useEffect(() => {
        const saved = localStorage.getItem("viewed_photos");
        if (saved) {
            try {
                setViewedIds(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse viewed photos", e);
            }
        }
    }, []);

    // キーボード操作とナビゲーション
    useEffect(() => {
        if (!selectedPhoto) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePhotoNavigate("prev");
            if (e.key === "ArrowRight") handlePhotoNavigate("next");
            if (["Escape", " ", "Enter", "x", "X"].includes(e.key)) {
                e.preventDefault();
                setSelectedPhoto(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedPhoto]);

    const markAsViewed = (id: number) => {
        if (!viewedIds.includes(id)) {
            const newIds = [...viewedIds, id];
            setViewedIds(newIds);
            localStorage.setItem("viewed_photos", JSON.stringify(newIds));
        }
    };

    const handlePhotoClick = (photo: typeof tourPhotos[0]) => {
        if (!carouselCtrl.isClickAllowed()) return;
        setSelectedPhoto(photo);
        markAsViewed(photo.id);
        carouselCtrl.setIsPlaying(false); // モーダル開くときは停止
    };

    const handlePhotoNavigate = (direction: "prev" | "next") => {
        if (!selectedPhoto) return;
        const currentIndex = tourPhotos.findIndex(p => p.id === selectedPhoto.id);
        if (currentIndex === -1) return;

        let nextIndex;
        if (direction === "next") {
            nextIndex = (currentIndex + 1) % tourPhotos.length;
        } else {
            nextIndex = (currentIndex - 1 + tourPhotos.length) % tourPhotos.length;
        }

        const nextPhoto = tourPhotos[nextIndex];
        setSelectedPhoto(nextPhoto);
        markAsViewed(nextPhoto.id);
    };

    // モーダルを閉じる
    const closeModal = () => {
        setSelectedPhoto(null);
        carouselCtrl.setIsPlaying(true);
    };

    return (
        <section className="relative py-16 md:py-24 bg-black overflow-hidden group/section">
            {/* タイトル */}
            <div className="text-center mb-12">
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">
                    Captured Moments
                </p>
                <h2 className="text-3xl md:text-4xl text-white font-serif">
                    The Gallery
                </h2>
            </div>

            {/* 写真カルーセル */}
            <div
                ref={carouselCtrl.containerRef}
                {...carouselCtrl.dragHandlers}
                className="flex overflow-x-hidden scrollbar-hide cursor-grab active:cursor-grabbing select-none py-8"
                style={{ touchAction: "pan-y" }}
            >
                {/* ループ用に2セット配置 */}
                <div className="flex shrink-0 gap-4 md:gap-8 px-4 md:px-8">
                    {tourPhotos.map((photo) => (
                        <PhotoCard
                            key={`1-${photo.id}`}
                            photo={photo}
                            isViewed={viewedIds.includes(photo.id)}
                            onClick={() => handlePhotoClick(photo)}
                        />
                    ))}
                </div>
                <div className="flex shrink-0 gap-4 md:gap-8 px-4 md:px-8">
                    {tourPhotos.map((photo) => (
                        <PhotoCard
                            key={`2-${photo.id}`}
                            photo={photo}
                            isViewed={viewedIds.includes(photo.id)}
                            onClick={() => handlePhotoClick(photo)}
                        />
                    ))}
                </div>
            </div>

            {/* --- コントローラーエリア --- */}
            <div className="container mx-auto px-6 mt-12 max-w-xl">
                <div className="flex flex-col items-center gap-6">
                    {/* スライダー */}
                    <div className="w-full relative group/slider">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={carouselCtrl.progress || 0}
                            onChange={(e) => carouselCtrl.onSliderChange(parseFloat(e.target.value))}
                            onMouseDown={() => carouselCtrl.setIsPlaying(false)}
                            onMouseUp={() => carouselCtrl.setIsPlaying(true)}
                            onTouchStart={() => carouselCtrl.setIsPlaying(false)}
                            onTouchEnd={() => carouselCtrl.setIsPlaying(true)}
                            className="range-slider"
                            aria-label="Gallery Control"
                        />
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/40 uppercase tracking-widest opacity-0 group-hover/slider:opacity-100 transition-opacity pointer-events-none">
                            Drag to explore
                        </div>
                    </div>

                    {/* Play/Pause ボタン */}
                    <button
                        onClick={() => carouselCtrl.setIsPlaying(!carouselCtrl.isPlaying)}
                        className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm group cursor-pointer"
                    >
                        <div className="w-3 h-3 relative flex items-center justify-center">
                            {carouselCtrl.isPlaying ? (
                                // Pause Icon
                                <div className="flex gap-1 h-3">
                                    <span className="w-1 h-full bg-white rounded-full"></span>
                                    <span className="w-1 h-full bg-white rounded-full"></span>
                                </div>
                            ) : (
                                // Play Icon
                                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1"></div>
                            )}
                        </div>
                        <span className="text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                            {carouselCtrl.isPlaying ? "Pause" : "Play"}
                        </span>
                    </button>
                </div>
            </div>

            {/* 写真拡大モーダル */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 cursor-pointer"
                        onClick={closeModal}
                    >
                        {/* 左矢印ボタン (PC) */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePhotoNavigate("prev");
                            }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-colors z-50 hidden md:block group cursor-pointer"
                            aria-label="Previous Photo"
                        >
                            <div className="bg-black/50 p-2 rounded-full border border-white/10 group-hover:border-white/40 transition-colors backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                        </button>

                        {/* 右矢印ボタン (PC) */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePhotoNavigate("next");
                            }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-colors z-50 hidden md:block group cursor-pointer"
                            aria-label="Next Photo"
                        >
                            <div className="bg-black/50 p-2 rounded-full border border-white/10 group-hover:border-white/40 transition-colors backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center cursor-default" // 中身はデフォルトカーソル
                            onClick={(e) => {
                                // ユーザー希望によりタップで閉じる（親のonClickイベントへバブリングさせる）
                            }}
                        >
                            <img
                                src={selectedPhoto.src}
                                alt={selectedPhoto.alt}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl pointer-events-none"
                            />
                            <div className="mt-4 text-center pointer-events-none">
                                <h3 className="text-2xl text-white font-serif mb-1">{selectedPhoto.caption}</h3>
                                <p className="text-white/50 text-sm">{selectedPhoto.alt}</p>
                            </div>

                            <button
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeModal();
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* キーボード操作案内 */}
                            <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/30 text-xs tracking-widest uppercase hidden md:block font-mono w-full">
                                Keyboard controls: <span className="text-white/50">← Prev</span> <span className="mx-2">•</span> <span className="text-white/50">Next →</span> <span className="mx-2">•</span> <span className="text-white/50">Esc / Space / X to Close</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function PhotoCard({ photo, isViewed, onClick }: { photo: typeof tourPhotos[0], isViewed: boolean, onClick: () => void }) {
    return (
        <div
            className="relative group cursor-pointer"
            onClick={onClick}
        >
            <div className="overflow-hidden rounded-lg w-[280px] h-[200px] md:w-[400px] md:h-[280px] relative">
                <img
                    src={photo.src}
                    alt={photo.alt}
                    className={`w-full h-full object-cover transition-all duration-700 ${isViewed
                        ? "filter-none brightness-100 scale-100"
                        : "filter sepia brightness-75 group-hover:filter-none group-hover:brightness-100 group-hover:scale-110"
                        }`}
                />
                <div className={`absolute inset-0 transition-colors duration-500 ${isViewed ? "bg-transparent" : "bg-black/20 group-hover:bg-transparent"
                    }`} />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <p className="text-white font-serif text-lg tracking-wider border-b border-white/50 pb-1">
                        {photo.caption}
                    </p>
                </div>

                {isViewed && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/50 backdrop-blur-sm shadow-sm" />
                )}
            </div>
        </div>
    );
}
