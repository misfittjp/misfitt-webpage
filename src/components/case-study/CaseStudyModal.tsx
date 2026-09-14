'use client';

import { useState, useEffect, useCallback, TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryItem {
  src: string;
  alt: string;
  captionEn: string;
  captionJa: string;
}

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: {
    meta: {
      guest: string;
      date: string;
      route: string;
      group: string;
    };
    en: {
      title: string;
      subtitle: string;
      fieldNote: string;
      guestVoice: string;
      dialogue: {
        request: string;
        curation: string;
      };
    };
    ja: {
      title: string;
      subtitle: string;
      fieldNote: string;
      guestVoice: string;
      dialogue: {
        request: string;
        curation: string;
      };
    };
    gallery: GalleryItem[];
  };
  lang?: 'ja' | 'en';
}

export default function CaseStudyModal({
  isOpen,
  onClose,
  caseData,
  lang = 'en',
}: CaseStudyModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const total = caseData?.gallery?.length ?? 0;

  const nextPhoto = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevPhoto = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // モーダル展開時のリセット
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentIndex(0);
    }
  }, [isOpen]);

  // キーボード操作（矢印キーで送り、ESCで閉じる）
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, nextPhoto, prevPhoto, onClose]);

  // スワイプ操作のハンドラー
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) nextPhoto();
    else if (distance < -50) prevPhoto();
    setTouchStart(null);
  };

  if (!isOpen || !caseData || total === 0) return null;

  const currentPhoto = caseData.gallery[currentIndex];
  const t = lang === 'ja' ? caseData.ja : caseData.en;
  
  // "CASE 01 // 家族のための東京ハイライト" からタイトル部分だけ抽出
  const mainTitle = t.title.split('//').length > 1 ? t.title.split('//')[1].trim() : t.title;
  const caseNumber = t.title.split('//')[0]?.trim() || "CASE";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-950 text-white select-none overflow-hidden">
      
      {/* TOP BAR */}
      <div className="flex-none flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 z-10 bg-neutral-950">
        <div className="flex items-center space-x-2 sm:space-x-4 font-mono text-xs tracking-widest text-neutral-400">
          <span className="text-white font-bold">{caseNumber}</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline">{caseData.meta.guest}</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors p-1"
          aria-label="Close"
        >
          <span className="hidden sm:block">CLOSE</span>
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* SPLIT CONTENT (2 Columns on PC, Stacked on Mobile) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT COLUMN: PHOTOGRAPHY SLIDER */}
        <div className="relative w-full md:w-[55%] lg:w-[65%] h-[40vh] md:h-full flex flex-col border-b md:border-b-0 md:border-r border-white/10 bg-black">
          <div 
            className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 左矢印 */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/50 hover:text-white bg-black/40 hover:bg-black/80 backdrop-blur-sm rounded-full transition-all"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* 写真 */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 65vw"
                priority
              />
            </div>

            {/* 右矢印 */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/50 hover:text-white bg-black/40 hover:bg-black/80 backdrop-blur-sm rounded-full transition-all"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* CAPTION & COUNTER */}
          <div className="flex-none px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-neutral-300 font-sans z-10 bg-black">
            <div className="truncate pr-4 select-text">
              {lang === 'ja' ? currentPhoto.captionJa : currentPhoto.captionEn}
            </div>
            <div className="font-mono text-[10px] sm:text-xs text-neutral-500 shrink-0">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EDITORIAL STORY */}
        <div className="w-full md:w-[45%] lg:w-[35%] h-[60vh] md:h-full overflow-y-auto bg-neutral-950 select-text scroll-smooth">
          <div className="p-6 md:p-8 lg:p-10 lg:pt-12">
            
            {/* Header / Tags */}
            <div className="font-mono text-[10px] tracking-widest text-neutral-500 mb-3 uppercase">
              {caseData.meta.group} <span className="mx-2">·</span> {caseData.meta.date}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug text-pretty">
              {mainTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mb-10 pb-6 border-b border-white/10">
              {t.subtitle} <span className="mx-2">/</span> {caseData.meta.route}
            </p>

            {/* Story Sections */}
            <div className="space-y-10">
              
              <section>
                <h3 className="font-mono text-[10px] tracking-widest text-neutral-500 mb-3">▼ THE REQUEST</h3>
                <p className={`text-sm text-neutral-300 italic leading-relaxed ${lang === 'ja' ? 'text-pretty' : ''}`}>
                  {t.dialogue.request}
                </p>
              </section>

              <section>
                <h3 className="font-mono text-[10px] tracking-widest text-neutral-500 mb-3">▼ THE CURATION</h3>
                <p className={`text-sm text-neutral-200 leading-relaxed ${lang === 'ja' ? 'text-pretty' : ''}`}>
                  {t.dialogue.curation}
                </p>
              </section>

              <section>
                <h3 className="font-mono text-[10px] tracking-widest text-neutral-500 mb-3">▼ FIELD NOTE</h3>
                <p className={`text-sm text-neutral-300 font-light leading-relaxed ${lang === 'ja' ? 'text-pretty' : ''}`}>
                  {t.fieldNote}
                </p>
              </section>

              <section className="bg-white/5 border border-white/10 p-5 rounded-sm">
                <h3 className="font-mono text-[10px] tracking-widest text-neutral-500 mb-3">▼ GUEST VOICE</h3>
                <p className={`text-sm text-white italic leading-relaxed ${lang === 'ja' ? 'text-pretty' : ''}`}>
                  {t.guestVoice}
                </p>
                <div className="mt-3 text-right font-mono text-[10px] text-neutral-500">
                  — {caseData.meta.guest}
                </div>
              </section>

            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-white/10 pb-8 md:pb-0">
              <Link
                href="/tours"
                onClick={onClose}
                className="block w-full py-4 text-center font-mono text-xs tracking-wider border border-white/30 text-neutral-300 hover:bg-white hover:text-black transition-all uppercase"
              >
                {lang === 'ja' ? 'オーダーメイドツアーを相談する ➔' : 'INQUIRE BESPOKE TOUR ➔'}
              </Link>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
