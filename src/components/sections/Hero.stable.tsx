"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

const CARD_PRESETS = [
  { theme: "dark", tag: "[ 01 // PERSPECTIVE ]", main: "UNSEEN TOKYO.", sub: "35°39'29\"N 139°41'33\"E" },
  { theme: "static", tag: "[ SIGNAL // RAW ]", main: "NO TOURIST TRAPS.", sub: "AUTHENTIC FIELDWORK" },
  { theme: "acid", tag: "[ MANIFESTO ]", main: "DISRUPT THE ORDINARY.", sub: "CURATED EXPERIENCES" },
  { theme: "scan", tag: "[ ARCHIVE // 026 ]", main: "SHADOW & CHROME.", sub: "EDITORIAL FOOTAGE" },
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 5カラム・各3段（計15枠）。極端な引き伸ばしを抑えたバランス比率
const COLUMN_LAYOUTS = [
  [{ flex: "flex-[1.2]" }, { flex: "flex-[0.9]" }, { flex: "flex-1" }],
  [{ flex: "flex-[0.9]" }, { flex: "flex-[1.2]" }, { flex: "flex-1" }],
  [{ flex: "flex-1" }, { flex: "flex-[0.9]" }, { flex: "flex-[1.2]" }],
  [{ flex: "flex-[1.2]" }, { flex: "flex-1" }, { flex: "flex-[0.9]" }],
  [{ flex: "flex-1" }, { flex: "flex-[1.2]" }, { flex: "flex-[0.9]" }],
];

// カード専用固定スロット（インデックス4と10の2箇所のみ）
const CARD_SLOT_INDICES = [4, 10];

export default function Hero() {
  const [photoSlots, setPhotoSlots] = useState<{ [key: number]: { src: string; key: string } }>({});
  const [cardSlots, setCardSlots] = useState<{ [key: number]: (typeof CARD_PRESETS)[0] & { key: string } }>({});
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);

  useEffect(() => {
    const shuffled = shuffle(ALL_HERO_IMAGES);
    const initialPhotos: typeof photoSlots = {};
    const initialCards: typeof cardSlots = {};
    let imgIdx = 0;

    for (let i = 0; i < 15; i++) {
      if (CARD_SLOT_INDICES.includes(i)) {
        const preset = CARD_PRESETS[i === 4 ? 0 : 1];
        initialCards[i] = { ...preset, key: `card-${i}-${Date.now()}` };
      } else {
        initialPhotos[i] = {
          src: shuffled[imgIdx % shuffled.length],
          key: `img-${imgIdx}-${Date.now()}`,
        };
        imgIdx++;
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhotoSlots(initialPhotos);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCardSlots(initialCards);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveColorIndex(0);
  }, []);

  // 3.5秒ごとのアンビエント置換（写真は写真枠の中だけで置換、カードはカード枠の中だけで置換）
  useEffect(() => {
    const photoIndices = Array.from({ length: 15 }, (_, i) => i).filter(
      (i) => !CARD_SLOT_INDICES.includes(i)
    );

    const interval = setInterval(() => {
      const isCardUpdate = Math.random() < 0.2;

      if (isCardUpdate) {
        // カード枠（4または10）の内容を切り替え
        const targetSlot = CARD_SLOT_INDICES[Math.floor(Math.random() * CARD_SLOT_INDICES.length)];
        const nextPreset = CARD_PRESETS[Math.floor(Math.random() * CARD_PRESETS.length)];
        setCardSlots((prev) => ({
          ...prev,
          [targetSlot]: { ...nextPreset, key: `card-${Date.now()}` },
        }));
      } else {
        // 写真枠の内容を切り替え（重複排除）
        const targetSlot = photoIndices[Math.floor(Math.random() * photoIndices.length)];
        setActiveColorIndex(targetSlot);

        setPhotoSlots((prev) => {
          const currentSources = Object.values(prev).map((p) => p.src);
          const available = ALL_HERO_IMAGES.filter((src) => !currentSources.includes(src));
          const nextSrc = available.length > 0
            ? available[Math.floor(Math.random() * available.length)]
            : ALL_HERO_IMAGES[Math.floor(Math.random() * ALL_HERO_IMAGES.length)];

          return {
            ...prev,
            [targetSlot]: { src: nextSrc, key: `img-${Date.now()}` },
          };
        });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none">
      {/* 最上部ヘッダー視認性確保グラデーション */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-20 pointer-events-none" />

      {/* 5カラム Masonry グリッド */}
      <div className="absolute inset-0 flex flex-row gap-1.5 p-1.5 h-full w-full">
        {COLUMN_LAYOUTS.map((col, colIdx) => (
          <div
            key={`col-${colIdx}`}
            className={`flex flex-col gap-1.5 flex-1 h-full ${
              colIdx >= 2 ? "hidden md:flex" : ""
            } ${colIdx >= 3 ? "hidden lg:flex" : ""}`}
          >
            {col.map((conf, rowIdx) => {
              const globalIndex = colIdx * 3 + rowIdx;
              const isCard = CARD_SLOT_INDICES.includes(globalIndex);
              const photo = photoSlots[globalIndex];
              const card = cardSlots[globalIndex];
              const isColor = activeColorIndex === globalIndex;

              return (
                <div
                  key={`slot-${globalIndex}`}
                  className={`relative w-full ${conf.flex} overflow-hidden border border-white/5 bg-neutral-950`}
                >
                  <AnimatePresence mode="wait">
                    {!isCard && photo ? (
                      <motion.div
                        key={photo.key}
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full relative"
                      >
                        <div
                          className={`w-full h-full relative transition-all duration-700 ${
                            isColor
                              ? "grayscale-0 contrast-100 brightness-100"
                              : "grayscale contrast-125 brightness-85 hover:grayscale-0"
                          }`}
                        >
                          <Image
                            alt="Tokyo Perspectives"
                            className="object-cover"
                            style={{ objectPosition: "center 30%" }}
                            fill
                            priority={globalIndex < 6}
                            quality={90}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            src={photo.src}
                          />
                        </div>
                      </motion.div>
                    ) : isCard && card ? (
                      <motion.div
                        key={card.key}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.6 }}
                        className={`w-full h-full flex flex-col justify-between p-4 relative ${
                          card.theme === "acid"
                            ? "bg-[#E6FF00] text-black"
                            : card.theme === "static"
                            ? "bg-neutral-950 text-white"
                            : card.theme === "scan"
                            ? "bg-neutral-900/90 text-neutral-200 border border-white/10"
                            : "bg-neutral-900 text-neutral-300 border border-white/5"
                        }`}
                      >
                        {card.theme === "static" && (
                          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px] animate-pulse" />
                        )}
                        {card.theme === "scan" && (
                          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_4px]" />
                        )}
                        <span className="font-mono text-[9px] tracking-widest uppercase opacity-75 z-10">
                          {card.tag}
                        </span>
                        <div className="z-10">
                          <span className="font-black text-xs md:text-sm lg:text-base tracking-tighter uppercase leading-tight block">
                            {card.main}
                          </span>
                          <span className="font-mono text-[8px] opacity-60 tracking-wider mt-1 block">
                            {card.sub}
                          </span>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 中央フローティング・タイポグラフィボックス */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="pointer-events-auto backdrop-blur-2xl bg-neutral-950/85 border border-white/10 p-6 md:p-10 text-center max-w-[90vw] md:max-w-2xl shadow-2xl"
        >
          <p className="font-mono text-[10px] md:text-xs text-neutral-400 tracking-[0.25em] uppercase">
            [ MISFITT // BESPOKE TOKYO ]
          </p>
          <h1 className="font-black text-2xl md:text-5xl tracking-tighter text-white uppercase mt-2 md:mt-3 leading-tight">
            DESIGNING EXPERIENCES.
            <br />
            CAPTURING PERSPECTIVES.
          </h1>
          <p className="text-xs md:text-sm text-neutral-300 font-medium tracking-wider mt-3 md:mt-4">
            気鋭のディレクターが切り取る、東京の輪郭。
          </p>
          <p className="text-[10px] md:text-xs text-neutral-400 mt-2 font-light leading-relaxed max-w-lg mx-auto">
            予定調和の観光を捨て、街の熱量と美学をダイレクトに体験する。完全オーダーメイドのプライベートツアーと、エディトリアル水準の写真表現。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
