"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// 暗号解読ストリーム演出
const MatrixStream = () => {
  const [text, setText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノ";

  useEffect(() => {
    const generate = () => {
      let res = "";
      for (let i = 0; i < 300; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
        if (i % 38 === 37) res += "\n";
      }
      return res;
    };
    setText(generate());
    const interval = setInterval(() => setText(generate()), 35);
    return () => clearInterval(interval);
  }, [chars]);

  return (
    <div className="font-mono text-[9px] md:text-[10px] text-emerald-400 whitespace-pre-wrap leading-tight break-all select-none opacity-85">
      {text}
    </div>
  );
};

export default function FounderMe() {
  const [decodePhase, setDecodePhase] = useState<"public" | "matrix" | "secret">("public");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTargetLocked, setIsTargetLocked] = useState(false);
  const [isJittering, setIsJittering] = useState(false);
  const [matchRate, setMatchRate] = useState(0);

  // スマホ用長押しステート
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // 通常モード復帰
  const revertToPublic = useCallback(() => {
    if (decodePhase === "secret") {
      setDecodePhase("matrix");
      setTimeout(() => setDecodePhase("public"), 250);
    }
  }, [decodePhase]);

  // ESCキーリセット
  useEffect(() => {
    if (decodePhase !== "secret") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") revertToPublic();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [decodePhase, revertToPublic]);

  // 認証実行
  const executeAccessGranted = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(40);
    }
    setIsJittering(true);
    setDecodePhase("matrix");
    setTimeout(() => {
      setDecodePhase("secret");
      setIsJittering(false);
      setHoldProgress(0);
    }, 450);
  }, []);

  // PC: マウス追従 & 瞳マグネット吸着 (X: 42.5%, Y: 40%)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || decodePhase === "secret") return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      const targetX = 0.425;
      const targetY = 0.40;

      const dist = Math.sqrt(Math.pow(xPercent - targetX, 2) + Math.pow(yPercent - targetY, 2));
      let rate = Math.max(0, Math.floor((1 - dist / 0.35) * 100));
      let renderX = x;
      let renderY = y;

      if (dist < 0.055) {
        rate = 100;
        setIsTargetLocked(true);
        renderX = targetX * rect.width;
        renderY = targetY * rect.height;
      } else {
        setIsTargetLocked(false);
      }

      setMatchRate(rate);
      setMousePos({ x: renderX, y: renderY });
    });
  };

  const handleMouseLeave = () => {
    if (decodePhase === "secret") return;
    setIsTargetLocked(false);
    setMatchRate(0);
  };

  // PC用クリック判定
  const handleContainerClick = () => {
    if (decodePhase === "secret") {
      revertToPublic();
      return;
    }
    if (!isTargetLocked) return;
    executeAccessGranted();
  };

  // スマホ用長押し（HOLD）チャージ
  const handleTouchStart = (e: React.TouchEvent) => {
    if (decodePhase === "secret") return;
    e.stopPropagation();

    let current = 0;
    holdTimerRef.current = setInterval(() => {
      current += 4;
      if (current >= 100) {
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
        setHoldProgress(100);
        executeAccessGranted();
      } else {
        setHoldProgress(current);
      }
    }, 30);
  };

  const handleTouchEnd = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    setHoldProgress(0);
  };

  return (
    <section 
      className="w-full bg-black border-t border-neutral-900 py-16 md:py-28 px-6 relative select-none"
      onClick={revertToPublic}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8 md:gap-10">
        
        {/* HUDステータスバー */}
        <div className="border-b border-neutral-900 pb-3 flex justify-between font-mono text-[10px] text-neutral-500 tracking-wider">
          <span>[ SECTOR: 03 // OPERATIVE PROFILE ]</span>
          <span className={decodePhase === "secret" ? "text-cyan-400 font-bold" : "text-neutral-500"}>
            {decodePhase === "secret" ? "[ STATUS: OVERRIDE // CLASSIFIED ]" : "[ STATUS: ACTIVE // PUBLIC ]"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* 写真コンソール（スマホではこの枠内で情報が完結） */}
          <div className="md:col-span-5 flex justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                e.stopPropagation();
                handleContainerClick();
              }}
              className={`relative w-full max-w-[340px] aspect-[4/5] border bg-neutral-950 overflow-hidden cursor-crosshair group transition-all duration-300 ${
                decodePhase === "secret"
                  ? "border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                  : isTargetLocked || holdProgress > 0
                  ? "border-cyan-400"
                  : "border-neutral-800 hover:border-neutral-700"
              } ${isJittering ? "translate-x-1 -translate-y-0.5 skew-x-1 filter invert contrast-200" : ""}`}
            >
              {/* ポートレート画像 */}
              <Image
                src="/images/founder/yu.jpg"
                alt="Yuichi Narisawa"
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className={`object-cover pointer-events-none transition-all duration-700 ${
                  decodePhase === "secret"
                    ? "grayscale-0 contrast-125 saturate-125 brightness-105"
                    : "grayscale contrast-125"
                }`}
                priority
              />

              {/* CRT走査線 */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

              {/* --- 丸いスピンHUDレティクル（円形・回転レーダー・点滅コア） --- */}
              {decodePhase !== "secret" && (
                <div
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchEnd}
                  className="absolute z-20 transition-all duration-100 p-2 -translate-x-1/2 -translate-y-1/2 md:p-0 top-[40%] left-[42.5%] md:top-0 md:left-0 md:pointer-events-none"
                  style={{
                    ...(typeof window !== "undefined" && window.innerWidth >= 768
                      ? {
                          left: `${mousePos.x}px`,
                          top: `${mousePos.y}px`,
                          opacity: matchRate > 15 ? 1 : 0,
                        }
                      : {
                          opacity: 1,
                        }),
                  }}
                >
                  <div className={`relative w-12 h-12 rounded-full border border-cyan-400/40 flex items-center justify-center transition-all ${
                    isTargetLocked || holdProgress > 0
                      ? "border-cyan-400 bg-cyan-500/20 scale-110 shadow-[0_0_15px_#22d3ee]"
                      : "animate-pulse"
                  }`}>
                    {/* スピンする破線リング */}
                    <div className="absolute inset-1 rounded-full border border-dashed border-cyan-400/80 animate-[spin_4s_linear_infinite]" />
                    
                    {/* 内側のターゲットリング */}
                    <div className="w-5 h-5 rounded-full border border-cyan-300/80 flex items-center justify-center">
                      {/* 中心ドット */}
                      <div className={`w-2 h-2 rounded-full bg-cyan-400 ${
                        isTargetLocked || holdProgress > 0 ? "animate-ping shadow-[0_0_8px_#22d3ee]" : ""
                      }`} />
                    </div>

                    {/* 十字レティクルライン */}
                    <div className="absolute w-full h-[1px] bg-cyan-400/30" />
                    <div className="absolute h-full w-[1px] bg-cyan-400/30" />
                  </div>

                  {/* スマホ長押しパーセント表示 */}
                  {holdProgress > 0 && (
                    <div className="md:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cyan-400 font-bold bg-black/90 px-1.5 py-0.5 border border-cyan-500 whitespace-nowrap">
                      HOLD: {holdProgress}%
                    </div>
                  )}
                </div>
              )}

              {/* 写真下部HUDバー */}
              <div className={`absolute bottom-3 left-3 right-3 border px-2.5 py-1.5 backdrop-blur-sm flex items-center justify-center pointer-events-none z-20 transition-colors ${
                decodePhase === "secret"
                  ? "border-cyan-500 bg-cyan-950/80 text-cyan-300"
                  : isTargetLocked || holdProgress > 0
                  ? "border-cyan-400 bg-black/90 text-cyan-400"
                  : "border-neutral-800 bg-black/80 text-neutral-500"
              }`}>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider whitespace-nowrap">
                  {decodePhase === "secret"
                    ? "[ ACCESS GRANTED // TAP TO CLOSE ]"
                    : holdProgress > 0
                    ? `[ SCANNING: ${holdProgress}% ]`
                    : isTargetLocked
                    ? "[ MATCH: 100% // CLICK TO ACCESS ]"
                    : "[ OPTICAL RECON // STANDBY ]"}
                </span>
              </div>

              {/* --- スマホ専用：写真枠内にオーバーレイ展開する調書/マトリックス --- */}
              {decodePhase === "matrix" && (
                <div className="md:hidden absolute inset-0 z-30 bg-black/95 p-4 flex flex-col justify-center items-center">
                  <div className="font-mono text-[10px] text-emerald-400 mb-2 tracking-widest animate-pulse">
                    &gt;&gt; DECRYPTING...
                  </div>
                  <MatrixStream />
                </div>
              )}

              {decodePhase === "secret" && (
                <div className="md:hidden absolute inset-0 z-30 bg-black/90 backdrop-blur-md p-4 flex flex-col justify-between font-mono text-[10px] text-neutral-200 overflow-y-auto">
                  <div className="space-y-2">
                    <div className="border-b border-cyan-500/40 pb-1.5 flex justify-between text-[9px] text-cyan-400">
                      <span>[ DOSSIER: SEC-06104 ]</span>
                      <span>[ LEVEL 5 ]</span>
                    </div>
                    <div className="text-white font-bold text-xs">YUICHI NARISAWA // "YU"</div>
                    <div className="text-[9px] text-emerald-400">ACTIVE FIELD OPERATIVE // TOKYO</div>
                    <div className="space-y-1.5 pt-1.5 border-t border-neutral-800 text-[9px] leading-snug">
                      <div><span className="text-neutral-500 block">[ INTEL ]</span>WASEDA UNIV. (B.S./M.S.) // NY DEPLOYMENT // TOEIC 905</div>
                      <div><span className="text-neutral-500 block">[ DIRECTIVE ]</span>ART DIRECTOR / PLANETARIUM DIR / VIDEO PROD</div>
                      <div><span className="text-neutral-500 block">[ ESCORT ]</span>10+ YEARS // 6,000+ ASSETS (VERIFIED 4.99/5.0)</div>
                      <div><span className="text-neutral-500 block">[ MEDIA OPS ]</span>PROJECT: SHOH-17 // 15K+ CADRE // MULTI 1M+ HITS</div>
                      <div><span className="text-neutral-500 block">[ COMBAT ]</span>GOJU-RYU KARATE [BLACK BELT] // EX-SKI SPECIALIST</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-[9px]">
                    <Link href="/me" className="text-cyan-400 hover:text-cyan-300">
                      [ FULL ARCHIVE → ]
                    </Link>
                    <span className="text-neutral-500">[ TAP ANYWHERE TO CLOSE ]</span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* PC用テキストカラム（md以上で表示、スマホ時は非表示にして縦伸び崩壊を完全防止） */}
          <div className="hidden md:flex md:col-span-7 min-h-[460px] flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            {decodePhase === "matrix" ? (
              <div className="w-full h-full min-h-[440px] flex flex-col justify-center items-center border border-emerald-950 bg-black p-6">
                <div className="font-mono text-xs text-emerald-400 mb-3 tracking-widest animate-pulse">
                  &gt;&gt; OVERRIDING PROTOCOL // DECRYPTING DOSSIER...
                </div>
                <MatrixStream />
              </div>
            ) : decodePhase === "public" ? (
              /* 表：CEOモード */
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-neutral-500 tracking-widest block uppercase mb-1">
                    [ EXECUTIVE IDENTITY ]
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                    YUICHI NARISAWA
                  </h3>
                  <p className="font-mono text-xs text-neutral-400 mt-1">
                    Founder & Representative Director, Misfitt Inc.
                  </p>
                </div>

                <div className="space-y-3 text-neutral-300 text-sm md:text-base leading-relaxed">
                  <p className="italic font-serif text-neutral-400 border-l-2 border-neutral-700 pl-3">
                    "We do not skim the surface of Tokyo. We dissect its layers, unscripted and uncompromising."
                  </p>
                  <p className="text-neutral-400 text-xs md:text-sm">
                    Leading an uncompromising creative practice and bespoke tour consultancy. Bridging 10 years of frontline field experience with cinematic narrative.
                  </p>
                </div>

                {/* 公的スペック表 */}
                <div className="pt-4 border-t border-neutral-900 font-mono text-xs text-neutral-400 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">CLIENT RATING</span>
                    <span className="text-neutral-200">4.99 / 5.0 (AIRBNB VERIFIED)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">FIELD VOLUME</span>
                    <span className="text-neutral-200">6,000+ PRIVATE CLIENTS ESCORTED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">EXPERIENCE</span>
                    <span className="text-neutral-200">10+ YEARS IN-FIELD COMMAND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">GOV ACCREDITATION</span>
                    <span className="text-neutral-200">NATIONAL LICENSED GUIDE (EN06104)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">PRIMARY SYSTEM</span>
                    <span className="text-neutral-200">SONY α7V // EDITORIAL RAW</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/me" className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-white transition-colors group">
                    <span>[ VIEW FULL PROFILE & DOSSIER ]</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* 裏：CLASSIFIED AGENT DOSSIER（PC版） */
              <div className="font-mono text-xs space-y-4 animate-fadeIn">
                <div className="border-b border-cyan-500/30 pb-2 flex justify-between text-[10px] text-cyan-500">
                  <span>[ RECORD: DOSSIER // SEC-06104 ]</span>
                  <span>[ CLEARANCE: LEVEL 5 ]</span>
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-sm">YUICHI NARISAWA // CODE: "YU"</div>
                  <div className="text-neutral-400 text-[11px]">COVER: CEO, MISFITT INC. // GOV-LICENSED GUIDE [EN06104]</div>
                  <div className="text-emerald-400 text-[11px]">STATUS: ACTIVE FIELD OPERATIVE // TOKYO SECTOR</div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-neutral-900 text-[10px] text-neutral-300 leading-relaxed">
                  <div>
                    <span className="text-neutral-500 block">[ INTEL & ACADEMIC DOSSIER ]</span>
                    WASEDA UNIV. (B.S. SOC / M.S. INT. INFO & COMM) // NY ADVANCED TRAINING // TOEIC 905
                  </div>
                  <div>
                    <span className="text-neutral-500 block">[ COVERT CREATIVE DIRECTIVE ]</span>
                    ART DIRECTOR / PROJECT MGR / PLANETARIUM PRODUCER / CINEMATIC DIRECTOR
                  </div>
                  <div>
                    <span className="text-neutral-500 block">[ FIELD ESCORT COMMAND ]</span>
                    10+ YEARS ACTIVE RECON // 6,000+ HIGH-VALUE ASSETS ESCORTED (VERIFIED 4.99 / 5.0)
                  </div>
                  <div>
                    <span className="text-neutral-500 block">[ COVERT MEDIA OPS // PROJECT: SHOH-17 ]</span>
                    INDEPENDENT TRANSMISSION NETWORK DEPLOYED DURING LOCKDOWN // TRACKED ELITE TARGET // COMMANDED 15K+ NETWORK WITH MULTIPLE 1M+ VIEWS
                  </div>
                  <div>
                    <span className="text-neutral-500 block">[ COMBAT & PHYSICAL APTITUDE ]</span>
                    OKINAWA GOJU-RYU KARATE [BLACK BELT] // EX-FREESTYLE SKI SPECIALIST
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-900">
                  <Link href="/me" className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300">
                    <span>[ ACCESS UNREDACTED ARCHIVE // /ME ]</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
