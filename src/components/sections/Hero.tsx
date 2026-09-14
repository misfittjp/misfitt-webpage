"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import exifDataRaw from "@/data/heroExif.json";
import { useLanguage } from "@/context/LanguageContext";

type ExifData = Record<string, {
  model: string | null;
  lens: string | null;
  focalLength: string | null;
  fNumber: string | null;
  exposureTime: string | null;
  iso: string | null;
  capturedAt: string | null;
} | null>;
const exifData: ExifData = exifDataRaw as unknown as ExifData;

const ALL_HERO_IMAGES = [
  "/images/hero/A7V00029 Large.jpeg",
  "/images/hero/A7V00059 Large.jpeg",
  "/images/hero/A7V00084 Large.jpeg",
  "/images/hero/A7V00141 Large.jpeg",
  "/images/hero/A7V00415 Large.jpeg",
  "/images/hero/A7V00420 Large.jpeg",
  "/images/hero/A7V00423 Large.jpeg",
  "/images/hero/A7V00424 Large.jpeg",
  "/images/hero/A7V00502 Large.jpeg",
  "/images/hero/A7V00552_GEN Large.jpeg",
  "/images/hero/A7V00582_GEN 2 Large.jpeg",
  "/images/hero/A7V00603 Large.jpeg",
  "/images/hero/A7V00778 Large.jpeg",
  "/images/hero/A7V01385_GEN Large.jpeg",
  "/images/hero/A7V01584_GEN 2 Large.jpeg",
  "/images/hero/A7V01591 Large.jpeg",
  "/images/hero/A7V01679 Large.jpeg",
  "/images/hero/A7V01716 Large.jpeg",
  "/images/hero/A7V01808 Large.jpeg",
  "/images/hero/A7V02332 Large.jpeg",
  "/images/hero/A7V02458 Large.jpeg",
  "/images/hero/A7V03138 Large.jpeg",
  "/images/hero/A7V03170 Large.jpeg",
  "/images/hero/A7V03291 Large.jpeg",
  "/images/hero/A7V03435 Large.jpeg",
  "/images/hero/A7V03980 Large.jpeg",
  "/images/hero/A7V04684 Large.jpeg",
  "/images/hero/A7V04705 Large.jpeg",
  "/images/hero/A7V04824 1 Large.jpeg",
  "/images/hero/A7V04882 Large.jpeg",
  "/images/hero/A7V05079 Large.jpeg",
  "/images/hero/A7V05188 Large.jpeg",
  "/images/hero/A7V05277 Large.jpeg",
  "/images/hero/A7V06015 Large.jpeg",
  "/images/hero/A7V06061 Large.jpeg",
  "/images/hero/A7V06098 Large.jpeg",
  "/images/hero/A7V06223 Large.jpeg",
  "/images/hero/A7V06246 Large.jpeg",
  "/images/hero/A7V06568 Large.jpeg",
  "/images/hero/A7V06589_GEN Large.jpeg",
  "/images/hero/A7V06833 Large.jpeg",
  "/images/hero/A7V06841 Large.jpeg",
  "/images/hero/A7V06862 Large.jpeg",
  "/images/hero/A7V06864 Large.jpeg",
  "/images/hero/A7V06929 Large.jpeg",
  "/images/hero/A7V07738 Large.jpeg",
  "/images/hero/A7V07996 Large.jpeg",
  "/images/hero/A7V08069 Large.jpeg",
  "/images/hero/A7V08076 Large.jpeg",
  "/images/hero/A7V08633 Large.jpeg",
  "/images/hero/A7V08907 Large.jpeg",
  "/images/hero/A7V09688 Large.jpeg",
  "/images/hero/A7V09793 Large.jpeg",
  "/images/hero/A7V09801 Large.jpeg",
  "/images/hero/A7V09802_GEN Large.jpeg",
  "/images/hero/A7V09913 Large.jpeg",
  "/images/hero/A7V09923 Large.jpeg",
  "/images/hero/A7V09939 Large.jpeg",
  "/images/hero/A7V09951 Large.jpeg",
  "/images/hero/A7V09981 Large.jpeg",
];

const CARD_TEXTS = [
  { tag: "[ 01 // PERSPECTIVE ]", main: "UNSEEN TOKYO." },
  { tag: "[ PHILOSOPHY ]", main: "NOT A TOUR GUIDE." },
  { tag: "[ LOCATION ]", main: "TOKYO, JAPAN" },
  { tag: "[ FIELD NOTE ]", main: "RAW & REFINED." },
  { tag: "[ MANIFESTO ]", main: "DISRUPT THE ORDINARY." },
  { tag: "[ NIGHTSCAPE ]", main: "SHADOW & CHROME." },
  { tag: "[ SIGNAL ]", main: "AUTHENTIC FIELDWORK." },
  { tag: "[ ARCHIVE ]", main: "EDITORIAL FOOTAGE." },
];

const CARD_THEMES = [
  "optic-white",
  "acid-yellow",
  "crimson-red",
  "electric-cyan",
  "klein-blue",
  "safety-orange",
  "concrete-grey",
  "deep-obsidian"
] as const;
type CardTheme = typeof CARD_THEMES[number];

type SlotItem = 
  | { type: "image"; src: string; key: string }
  | { type: "card"; theme: CardTheme; tag: string; main: string; key: string };

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 動的レイアウトパターン（3種類）
const LAYOUT_PATTERNS = [
  [[1.4, 0.8, 1], [0.8, 1.4, 1], [1, 0.8, 1.4], [1.4, 1, 0.8], [1, 1.4, 0.8]],
  [[0.8, 1.4, 1], [1.4, 0.8, 1], [1.4, 1, 0.8], [0.8, 1.4, 1], [1.4, 0.8, 1]],
  [[1, 0.8, 1.4], [1, 1.4, 0.8], [0.8, 1.4, 1], [1.4, 0.8, 1], [0.8, 1, 1.4]],
];

const getCardThemeClasses = (theme: CardTheme) => {
  switch (theme) {
    case "optic-white": return "bg-white text-black";
    case "acid-yellow": return "bg-[#E6FF00] text-black";
    case "crimson-red": return "bg-[#FF2E00] text-white";
    case "electric-cyan": return "bg-[#00F0FF] text-black";
    case "klein-blue": return "bg-[#002FA7] text-white";
    case "safety-orange": return "bg-[#FF5500] text-white";
    case "concrete-grey": return "bg-neutral-800 text-neutral-100 border border-white/10";
    case "deep-obsidian": return "bg-neutral-950 text-neutral-300 border border-white/10";
  }
};

export default function Hero() {
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const { lang } = useLanguage();
  const [patternIndex, setPatternIndex] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [viewerImage, setViewerImage] = useState<string | null>(null);

  const viewerImageRef = React.useRef(viewerImage);
  const showInfoRef = React.useRef(showInfo);

  useEffect(() => {
    viewerImageRef.current = viewerImage;
  }, [viewerImage]);

  useEffect(() => {
    showInfoRef.current = showInfo;
  }, [showInfo]);

  // スクロールロック
  useEffect(() => {
    if (viewerImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [viewerImage]);

  const generateSlots = () => {
    const availableThemes = shuffle([...CARD_THEMES]);
    const availableTexts = shuffle([...CARD_TEXTS]);
    const availableImages = shuffle([...ALL_HERO_IMAGES]);
    
    const newSlots: SlotItem[] = [];
    const imgIndices: number[] = [];

    for (let i = 0; i < 15; i++) {
      // 約28%の確率でカード化
      const shouldBeCard = Math.random() < 0.28;
      
      if (shouldBeCard && availableThemes.length > 0 && availableTexts.length > 0) {
        const theme = availableThemes.pop()!;
        const text = availableTexts.pop()!;
        newSlots.push({
          type: "card",
          theme,
          tag: text.tag,
          main: text.main,
          key: `card-${i}-${Date.now()}`,
        });
      } else {
        newSlots.push({
          type: "image",
          src: availableImages.pop()!,
          key: `img-${i}-${Date.now()}`,
        });
        imgIndices.push(i);
      }
    }

    return {
      newSlots,
      newActiveColorIndex: imgIndices.length > 0 ? imgIndices[Math.floor(Math.random() * imgIndices.length)] : 0
    };
  };

  useEffect(() => {
    const { newSlots, newActiveColorIndex } = generateSlots();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlots(newSlots);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveColorIndex(newActiveColorIndex);
  }, []);

  // Viewer モーダル閉じる用 & Info開閉用のキーバインド
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (viewerImageRef.current) {
          setViewerImage(null);
        } else {
          setShowInfo((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ランダム周期の一斉オーガニック・レイアウトモーフィング＆置換 (20s ~ 50s)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const morphLayout = () => {
      // 1. レイアウトパターンの循環切り替え
      setPatternIndex((prev) => (prev + 1) % LAYOUT_PATTERNS.length);

      // 2. 全スロットの一斉置換（重複なし）
      const { newSlots, newActiveColorIndex } = generateSlots();
      setSlots(newSlots);
      setActiveColorIndex(newActiveColorIndex);

      // 3. 次のタイマーを20秒〜50秒でセット
      const nextDelay = Math.floor(Math.random() * 30000) + 20000;
      timeoutId = setTimeout(morphLayout, nextDelay);
    };

    // 初回のタイマーをセット
    const initialDelay = Math.floor(Math.random() * 30000) + 20000;
    timeoutId = setTimeout(morphLayout, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  const currentPattern = LAYOUT_PATTERNS[patternIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none isolate">
      {/* 最上部ヘッダー視認性確保グラデーション */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-20 pointer-events-none" />

      {/* 5カラム オーガニック Masonry グリッド */}
      <div className="absolute inset-0 flex flex-row gap-1.5 p-1.5 h-full w-full">
        {currentPattern.map((col, colIdx) => (
          <div
            key={`col-${colIdx}`}
            className={`flex flex-col gap-1.5 flex-1 h-full ${
              colIdx >= 2 ? "hidden md:flex" : ""
            } ${colIdx >= 3 ? "hidden lg:flex" : ""}`}
          >
            {col.map((flexValue, rowIdx) => {
              const globalIndex = colIdx * 3 + rowIdx;
              const slot = slots[globalIndex];
              const isColor = activeColorIndex === globalIndex;

              if (!slot) return null;

              return (
                <motion.div
                  key={`slot-${globalIndex}`}
                  layout
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ flex: flexValue }}
                  className="relative w-full overflow-hidden border border-white/5 bg-neutral-950"
                >
                  <AnimatePresence mode="wait">
                    {slot.type === "image" ? (
                      <motion.div
                        key={slot.key}
                        layout
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full h-full relative group ${!showInfo ? "cursor-zoom-in" : "cursor-default"}`}
                        onClick={() => {
                          if (!showInfo) setViewerImage(slot.src);
                        }}
                      >
                        <div
                          className={`w-full h-full relative transition-all duration-[1200ms] ${
                            isColor
                              ? "grayscale-0 contrast-100 brightness-100"
                              : "grayscale contrast-125 brightness-85 group-hover:grayscale-0 group-hover:brightness-100"
                          }`}
                        >
                          <Image
                            alt="Tokyo Perspectives"
                            className="object-cover pointer-events-none select-none"
                            style={{ objectPosition: "center 30%" }}
                            fill
                            priority={true}
                            quality={90}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            src={slot.src}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={slot.key}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.8 }}
                        className={`w-full h-full flex flex-col justify-between p-4 relative ${getCardThemeClasses(slot.theme)}`}
                      >
                        <span className={`font-mono text-[9px] tracking-widest uppercase opacity-75 z-10 ${slot.theme === "optic-white" ? "font-bold" : ""}`}>
                          {slot.tag}
                        </span>
                        <div className="z-10">
                          <span className={`font-black text-xs md:text-sm lg:text-base tracking-tighter uppercase leading-tight block ${slot.theme === "optic-white" ? "text-black" : ""}`}>
                            {slot.main}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 中央フローティング・タイポグラフィボックス（3Dフリップ開閉） */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none z-30" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          {showInfo ? (
            <motion.div
              key="info-box"
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
              className="pointer-events-auto relative bg-neutral-950/90 backdrop-blur-md border border-white/10 px-5 py-8 sm:p-10 md:p-12 max-w-[92vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-center shadow-2xl select-none"
            >
              {/* 上部ラベル */}
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-4 sm:mb-6">
                <span>[ MISFITT // BESPOKE TOKYO ]</span>
                <button onClick={() => setShowInfo(false)} className="cursor-pointer hover:text-white transition tracking-widest">
                  [ × / HIDE ]
                </button>
              </div>

              {/* メイン見出し：スマホで縮小して左右はみ出しを完全防止 */}
              <h1 className="font-extrabold tracking-tight text-white font-sans uppercase leading-[1.15] sm:leading-tight my-4">
                <span className="block text-[1.25rem] xs:text-[1.4rem] sm:text-2xl md:text-4xl lg:text-[2.75rem] whitespace-nowrap">
                  DESIGNING EXPERIENCES.
                </span>
                <span className="block text-[1.25rem] xs:text-[1.4rem] sm:text-2xl md:text-4xl lg:text-[2.75rem] whitespace-nowrap">
                  DOCUMENTING STORIES.
                </span>
              </h1>

              {/* サブコピー */}
              <p className="text-[11px] sm:text-xs md:text-sm text-neutral-300 tracking-wide leading-relaxed font-sans mt-4 sm:mt-6 text-center">
                {lang === "ja" ? (
                  <span className="block whitespace-pre-line">
                    東京を歩き 東京の&quot;今&quot;に触れる{"\n"}
                    プライベートツアーとシネマティック・フォト
                  </span>
                ) : (
                  <>
                    <span className="block">
                      Walking Tokyo, touching its living present.
                    </span>
                    <span className="block">
                      Bespoke private tours &amp; cinematic photography.
                    </span>
                  </>
                )}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="show-btn"
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "center" }}
              className="absolute bottom-6 left-6 flex flex-col md:flex-row md:items-center gap-3 pointer-events-auto"
            >
              <button
                onClick={() => setShowInfo(true)}
                className="font-mono text-xs backdrop-blur-md bg-black/60 border border-white/20 px-4 py-2 text-neutral-300 hover:text-white hover:bg-black/80 transition-all tracking-widest uppercase shrink-0"
              >
                [ ＋ VIEW INFO ]
              </button>
              <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                [ CLICK PHOTO TO INSPECT ]
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Viewer Modal (ライトボックス) */}
      <AnimatePresence>
        {viewerImage && (
          <motion.div
            key="viewer-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] w-screen h-screen bg-black/95 backdrop-blur-2xl flex items-center justify-center cursor-zoom-out isolate p-4 md:p-12"
            onClick={() => setViewerImage(null)}
          >
            <div 
              className="relative w-full h-full max-w-6xl flex items-center justify-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setViewerImage(null)}
                className="absolute top-0 right-0 z-[110] text-[10px] font-mono text-neutral-400 hover:text-white transition-colors tracking-widest bg-black/50 px-4 py-2 border border-white/10"
              >
                [ ✕ / CLOSE ]
              </button>
              
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex flex-col items-center justify-center cursor-auto"
              >
                <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
                  <Image
                    alt="Tokyo Perspectives Viewer"
                    className="object-contain"
                    fill
                    sizes="100vw"
                    src={viewerImage}
                  />
                </div>
                
                {/* エディトリアルEXIFデータ表示 */}
                <div className="absolute bottom-0 right-0 p-4 md:p-6 bg-black/70 backdrop-blur-md border border-white/10 text-right pointer-events-none shadow-2xl">
                  {(() => {
                    const exif = viewerImage ? exifData[viewerImage] : null;
                    if (!exif || (!exif.model && !exif.lens && !exif.fNumber && !exif.exposureTime && !exif.iso && !exif.capturedAt)) {
                      return (
                        <div className="font-mono text-[11px] text-neutral-400 space-y-1 tracking-wider uppercase">
                          <p>EXIF UNRECORDED</p>
                        </div>
                      );
                    }
                    return (
                      <div className="font-mono text-[11px] text-neutral-400 space-y-1 tracking-wider uppercase">
                        {exif.model && <div>BODY: <span className="text-white">{exif.model}</span></div>}
                        {exif.lens && <div>LENS: <span className="text-white">{exif.lens}</span> {exif.focalLength && `@ ${exif.focalLength}`}</div>}
                        {(exif.fNumber || exif.exposureTime || exif.iso) && (
                          <div>
                            EXP: <span className="text-white">{[exif.fNumber, exif.exposureTime, exif.iso ? `ISO ${exif.iso}` : null].filter(Boolean).join(" · ")}</span>
                          </div>
                        )}
                        {exif.capturedAt && (
                          <div>
                            CAPTURED: <span className="text-neutral-200">{exif.capturedAt}</span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
