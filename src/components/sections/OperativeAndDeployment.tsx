"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const generateNoise = (text: string, chars: string) => {
  return text.split("").map((char) => {
    if (char === " " || char === "\n" || char === "/" || char === "[" || char === "]") return char;
    return chars[Math.floor(Math.random() * chars.length)];
  }).join("");
};

const DecryptText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*アイウエオカキクケコ";
  const [displayedText, setDisplayedText] = useState(() => generateNoise(text, chars));

  useEffect(() => {
    let frame = 0;
    const maxFrames = 4;
    const stepDuration = 30; // 30ms * 4 = 120ms
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        if (frame >= maxFrames) {
          clearInterval(interval);
          setDisplayedText(text);
          return;
        }
        setDisplayedText(generateNoise(text, chars));
      }, stepDuration);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

// 暗号解読ストリーム演出
const MatrixStream = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノ";
  
  const generate = useCallback(() => {
    let res = "";
    for (let i = 0; i < 300; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
      if (i % 38 === 37) res += "\n";
    }
    return res;
  }, [chars]);

  const [text, setText] = useState(generate);

  useEffect(() => {
    const interval = setInterval(() => setText(generate()), 25);
    return () => clearInterval(interval);
  }, [generate]);

  return (
    <div className="font-mono text-[9px] md:text-[10px] text-emerald-400 whitespace-pre-wrap leading-tight break-all select-none opacity-85">
      {text}
    </div>
  );
};

export default function OperativeAndDeployment() {
  const [decodePhase, setDecodePhase] = useState<"public" | "matrix" | "secret">("public");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTargetLocked, setIsTargetLocked] = useState(false);
  const isTargetLockedRef = useRef(false);
  const [isGlitchingSnap, setIsGlitchingSnap] = useState(false);
  const [matchRate, setMatchRate] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // スマホ用長押しステート
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // 通常モード復帰
  const revertToPublic = useCallback(() => {
    if (decodePhase === "public") return;
    setDecodePhase("matrix");
    setTimeout(() => {
      setDecodePhase("public");
      setIsHovering(false);
      isTargetLockedRef.current = false;
      setIsTargetLocked(false);
      setHoldProgress(0);
      setMatchRate(0);
    }, 120);
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
  const triggerDecode = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    
    if (decodePhase === 'secret') {
      // 裏から表に戻す時も一瞬マトリックスを挟む
      setDecodePhase('matrix');
      setTimeout(() => {
        setDecodePhase('public');
        setIsGlitchingSnap(false);
        setHoldProgress(0);
        setIsHovering(false);
        isTargetLockedRef.current = false;
        setIsTargetLocked(false);
      }, 120);
      return;
    }
    
    // ロックしてなければ絶対に反応させない
    if (!isTargetLocked && holdProgress < 100) return;

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(40);
    }
    setIsGlitchingSnap(true);
    // 表から裏へ：確実に matrix を経由させる
    setDecodePhase('matrix');
    setTimeout(() => {
      setDecodePhase('secret');
      setIsGlitchingSnap(false);
      setHoldProgress(0);
    }, 350); // 350ms間マトリックスを画面に描画した後に裏を出す
  }, [decodePhase, isTargetLocked, holdProgress]);

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
        if (!isTargetLockedRef.current) {
          isTargetLockedRef.current = true;
          setIsTargetLocked(true);
          setIsGlitchingSnap(true);
          setTimeout(() => {
            setIsGlitchingSnap(false); // 80msで即座に平常表示へ
          }, 80);
        }
        renderX = targetX * rect.width;
        renderY = targetY * rect.height;
      } else if (dist > 0.075) {
        if (isTargetLockedRef.current) {
          isTargetLockedRef.current = false;
          setIsTargetLocked(false);
          setIsGlitchingSnap(false);
        }
      } else {
        // ヒステリシス：中間領域では以前のロック状態を維持
        if (isTargetLockedRef.current) {
          rate = 100;
          renderX = targetX * rect.width;
          renderY = targetY * rect.height;
        }
      }

      setMatchRate(rate);
      setMousePos({ x: renderX, y: renderY });
    });
  };

  const handleMouseLeave = () => {
    if (decodePhase === "secret") return;
    setIsHovering(false);
    isTargetLockedRef.current = false;
    setIsTargetLocked(false);
    setMatchRate(0);
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
        triggerDecode();
      } else {
        setHoldProgress(current);
      }
    }, 30);
  };

  const handleTouchEnd = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    setHoldProgress(0);
  };

  const getReticleClasses = () => {
    const activeRate = Math.max(matchRate, holdProgress);
    if (isTargetLocked || holdProgress >= 100 || activeRate >= 80) return {
      main: "border-red-500 bg-red-500/20 shadow-[0_0_20px_#ef4444]",
      ring: "border-red-500/80",
      inner: "border-red-400/80",
      dot: "bg-red-500 shadow-[0_0_10px_#ef4444]",
      line: "bg-red-500/30"
    };
    return {
      main: "border-amber-400/80 bg-amber-500/10",
      ring: "border-amber-400/80",
      inner: "border-amber-300/80",
      dot: "bg-amber-400",
      line: "bg-amber-400/30"
    };
  };
  const reticleClasses = getReticleClasses();

  const getHudStatus = () => {
    if (decodePhase === "secret") return { text: "[ ACCESS GRANTED // TAP TO CLOSE ]", color: "text-cyan-400", border: "border-cyan-500/50 bg-black/60" };
    if (isTargetLocked || holdProgress >= 100) return { text: "[ RETINAL LOCK: 100% // CLICK TO ACCESS ]", color: "text-red-500 animate-pulse font-bold", border: "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] bg-red-950/60" };
    if (isHovering || holdProgress > 0) {
      const activeRate = Math.max(matchRate, holdProgress);
      const isDanger = activeRate >= 80;
      return { 
        text: `[ SCANNING... ${activeRate}% ]`, 
        color: isDanger ? "text-red-500" : "text-amber-400",
        border: isDanger ? "border-red-500/50 bg-red-900/40" : "border-amber-400/50 bg-amber-900/40"
      };
    }
    return { text: "[ OPTICAL RECON // STANDBY ]", color: "text-neutral-500", border: "border-neutral-800/80 bg-black/40" };
  };
  const hudState = getHudStatus();

  return (
    <>
      <section 
        className="w-full bg-black border-t border-zinc-900/40 py-24 2xl:py-36 px-6 md:px-12 2xl:px-16 flex flex-col justify-center relative select-none"
        onClick={revertToPublic}
      >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes mobile-stealth-glitch {
          0%, 97%, 100% { opacity: 0; filter: none; transform: translate(0, 0) scale(1); }
          97.5% { opacity: 0.8; filter: drop-shadow(-2px 0 cyan) drop-shadow(2px 0 red); transform: translate(-2px, 2px) scale(1.05); }
          98% { opacity: 0; }
          99% { opacity: 0.9; filter: drop-shadow(2px 0 cyan); transform: translate(2px, -2px) scale(0.95); }
          99.5% { opacity: 0; }
        }
        @keyframes micro-jitter {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1px, 1px); box-shadow: -2px 0 8px cyan, 2px 0 8px red; border-color: cyan; }
          50% { transform: translate(1px, -1px); box-shadow: 2px 0 8px cyan, -2px 0 8px red; border-color: white; }
          75% { transform: translate(-1px, -1px); box-shadow: -2px 0 8px cyan, 2px 0 8px red; border-color: cyan; }
        }
        @keyframes bad-reception {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          10% { clip-path: inset(10% 0 80% 0); transform: translate(-4px, 2px); }
          20% { clip-path: inset(80% 0 10% 0); transform: translate(4px, -2px); }
          30% { clip-path: inset(40% 0 40% 0); transform: translate(-2px, 4px); }
          40% { clip-path: inset(20% 0 60% 0); transform: translate(2px, -4px); }
          50% { clip-path: inset(60% 0 20% 0); transform: translate(-4px, 2px); }
        }
        @keyframes scanline-flash {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
      `}} />
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto w-full flex flex-col gap-8 md:gap-12 lg:gap-16">
        
        {/* HUDステータスバー */}
        <div className="border-b border-neutral-900 pb-3 flex justify-between font-mono text-[9px] text-neutral-500 tracking-wider">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-zinc-500 uppercase whitespace-nowrap">
            // 03 DOSSIER
          </span>
          <span className={decodePhase === "secret" ? "text-cyan-400 font-bold" : "text-neutral-500"}>
            {decodePhase === "secret" ? "[ STATUS: OVERRIDE // CLASSIFIED ]" : "[ STATUS: ACTIVE // PUBLIC ]"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 2xl:gap-24 items-start">
          
          {/* 写真コンソール（スマホではこの枠内で情報が完結） */}
          <div className="md:col-span-5 flex justify-center">
            <div
              ref={containerRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={triggerDecode}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className={`relative w-full max-w-[340px] 2xl:max-w-[380px] aspect-[4/5] border bg-neutral-950 overflow-hidden cursor-crosshair group ${
                isGlitchingSnap ? "" : "transition-colors duration-100"
              } ${
                decodePhase === "secret"
                  ? "border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                  : isGlitchingSnap
                  ? "border-cyan-400 shadow-[-3px_0_#00ffff,3px_0_#ff0055] scale-[1.02] [animation:bad-reception_0.08s_infinite]"
                  : isTargetLocked || holdProgress > 0
                  ? "border-cyan-400"
                  : "border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {/* ポートレート画像 */}
              <Image
                src="/images/founder/yu.jpg"
                alt="Yuichi Narisawa"
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className={`object-cover pointer-events-none transition-all duration-700 ${
                  decodePhase === "secret"
                    ? "grayscale-0 contrast-105 saturate-100"
                    : "grayscale contrast-125"
                }`}
                priority
              />

              {/* CRT走査線 */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

              {/* 吸着時の発光スキャンライン */}
              {isGlitchingSnap && (
                <>
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-white shadow-[0_0_20px_#67e8f9,0_0_40px_#ffffff] z-15 pointer-events-none [animation:scanline-flash_0.08s_ease-in]" />
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-300 shadow-[0_0_15px_#67e8f9] z-15 pointer-events-none [animation:scanline-flash_0.08s_ease-in_0.02s]" />
                </>
              )}

              {/* --- 丸いスピンHUDレティクル（円形・回転レーダー・点滅コア） --- */}
              {decodePhase !== "secret" && (
                <>
                  {/* スマホ用（固定配置・表示はmd未満のみ） */}
                  <div
                    className={`absolute md:hidden z-20 pointer-events-none p-2 -translate-x-1/2 -translate-y-1/2 top-[40%] left-[42.5%] ${
                      holdProgress > 0 ? "opacity-100" : "[animation:mobile-stealth-glitch_8s_infinite]"
                    }`}
                  >
                    <div className={`relative w-12 h-12 rounded-full border flex items-center justify-center ${reticleClasses.main} ${
                      isGlitchingSnap ? "" : "transition-all duration-100"
                    } ${
                      isTargetLocked || holdProgress > 0
                        ? "scale-[1.3]"
                        : ""
                    } ${isGlitchingSnap ? "[animation:micro-jitter_0.05s_infinite]" : ""}`}>
                      {/* スピンする破線リング */}
                      <div className={`absolute inset-1 rounded-full border border-dashed ${reticleClasses.ring} ${
                        isGlitchingSnap ? "animate-[spin_0.1s_linear_infinite]" :
                        isTargetLocked || holdProgress >= 100 ? "animate-[spin_0.5s_linear_infinite]" : "animate-[spin_4s_linear_infinite]"
                      }`} />
                      
                      {/* 内側のターゲットリング */}
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${reticleClasses.inner}`}>
                        {/* 中心ドット */}
                        <div className={`w-2 h-2 rounded-full ${reticleClasses.dot} ${
                          isTargetLocked || holdProgress >= 100 ? "animate-ping" : ""
                        }`} />
                      </div>

                      {/* 十字レティクルライン */}
                      <div className={`absolute w-full h-[1px] ${reticleClasses.line}`} />
                      <div className={`absolute h-full w-[1px] ${reticleClasses.line}`} />
                    </div>

                    {/* スマホ長押しパーセント表示 */}
                    {holdProgress > 0 && (
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cyan-400 font-bold bg-black/90 px-1.5 py-0.5 border border-cyan-500 whitespace-nowrap">
                        HOLD: {holdProgress}%
                      </div>
                    )}
                  </div>

                  {/* PC用（マウス追従・表示はmd以上のみ） */}
                  <div
                    className={`hidden md:block absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 ${
                      isGlitchingSnap ? "" : "transition-all duration-100"
                    } ${
                      isHovering ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      left: `${mousePos.x}px`,
                      top: `${mousePos.y}px`,
                    }}
                  >
                    <div className={`relative w-12 h-12 rounded-full border flex items-center justify-center ${reticleClasses.main} ${
                      isGlitchingSnap ? "" : "transition-all duration-100"
                    } ${
                      isTargetLocked
                        ? "scale-[1.3]"
                        : ""
                    } ${isGlitchingSnap ? "[animation:micro-jitter_0.05s_infinite]" : ""}`}>
                      {/* スピンする破線リング */}
                      <div className={`absolute inset-1 rounded-full border border-dashed ${reticleClasses.ring} ${
                        isGlitchingSnap ? "animate-[spin_0.1s_linear_infinite]" :
                        isTargetLocked ? "animate-[spin_0.5s_linear_infinite]" : "animate-[spin_4s_linear_infinite]"
                      }`} />
                      
                      {/* 内側のターゲットリング */}
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${reticleClasses.inner}`}>
                        {/* 中心ドット */}
                        <div className={`w-2 h-2 rounded-full ${reticleClasses.dot} ${
                          isTargetLocked ? "animate-ping" : ""
                        }`} />
                      </div>

                      {/* 十字レティクルライン */}
                      <div className={`absolute w-full h-[1px] ${reticleClasses.line}`} />
                      <div className={`absolute h-full w-[1px] ${reticleClasses.line}`} />
                    </div>
                  </div>
                </>
              )}

              {/* 写真下部HUDバー */}
              <div className={`absolute bottom-3 left-3 right-3 border px-2.5 py-1.5 backdrop-blur-sm flex items-center justify-center pointer-events-none z-20 transition-colors ${
                hudState.border
              }`}>
                <span className={`font-mono text-[9px] sm:text-[10px] tracking-wider whitespace-nowrap ${hudState.color}`}>
                  {hudState.text}
                </span>
              </div>

              {/* --- スマホ専用：写真枠内にオーバーレイ展開する調書/マトリックス --- */}
              {decodePhase === "matrix" && (
                <div className="md:hidden absolute inset-0 z-30 bg-black/95 p-4 flex flex-col justify-center items-center">
                  <div className="font-mono text-[10px] text-emerald-400 mb-2 tracking-widest animate-pulse">
                    &gt;&gt; DECRYPTING LEVEL 5 ARCHIVE...
                  </div>
                  <MatrixStream />
                </div>
              )}

              {decodePhase === "secret" && (
                <div className="md:hidden absolute inset-0 z-30 bg-black/90 backdrop-blur-md p-4 flex flex-col justify-between font-mono text-[10px] text-neutral-200 overflow-y-auto">
                  <div className="space-y-2">
                    <div className="border-b border-cyan-500/40 pb-1.5 flex justify-between text-[9px] text-cyan-400">
                      <span><DecryptText text="[ DOSSIER: SEC-06104 ]" delay={0} /></span>
                      <span><DecryptText text="[ LEVEL 5 ]" delay={0} /></span>
                    </div>
                    <div className="text-white font-bold text-xs"><DecryptText text='YUICHI NARISAWA // "YU"' delay={50} /></div>
                    <div className="text-[9px] text-emerald-400"><DecryptText text="ACTIVE FIELD OPERATIVE // TOKYO" delay={100} /></div>
                    <div className="space-y-1.5 pt-1.5 border-t border-neutral-800 text-[9px] leading-snug">
                      <div><span className="text-neutral-500 block"><DecryptText text="[ INTEL ]" delay={150} /></span><DecryptText text="WASEDA UNIV. (B.S./M.S.) // NY DEPLOYMENT // TOEIC 905" delay={200} /></div>
                      <div><span className="text-neutral-500 block"><DecryptText text="[ DIRECTIVE ]" delay={250} /></span><DecryptText text="ART DIRECTOR / PLANETARIUM DIR / VIDEO PROD" delay={300} /></div>
                      <div><span className="text-neutral-500 block"><DecryptText text="[ ESCORT ]" delay={350} /></span><DecryptText text="10+ YEARS // 6,000+ ASSETS (VERIFIED 4.99/5.0)" delay={400} /></div>
                      <div><span className="text-neutral-500 block"><DecryptText text="[ MEDIA OPS ]" delay={450} /></span><DecryptText text="PROJECT: SHOH-17 // 15K+ CADRE // MULTI 1M+ HITS" delay={500} /></div>
                      <div><span className="text-neutral-500 block"><DecryptText text="[ COMBAT ]" delay={550} /></span><DecryptText text="GOJU-RYU KARATE [BLACK BELT] // EX-SKI SPECIALIST" delay={600} /></div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-[9px]">
                    <Link href="/me" className="text-cyan-400 hover:text-cyan-300">
                      <DecryptText text="[ FULL ARCHIVE → ]" delay={650} />
                    </Link>
                    <span className="text-neutral-500"><DecryptText text="[ TAP ANYWHERE TO CLOSE ]" delay={650} /></span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* PC用テキストカラム（md以上で表示、スマホ時は非表示にして縦伸び崩壊を完全防止） */}
          <div className="hidden md:flex md:col-span-7 min-h-[460px] flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            {decodePhase === "matrix" ? (
              <div className="w-full h-full min-h-[440px] flex flex-col justify-center items-center border border-emerald-950 bg-black/90 p-6">
                <div className="font-mono text-xs text-emerald-400 mb-3 tracking-widest animate-pulse">
                  &gt;&gt; DECRYPTING LEVEL 5 ARCHIVE...
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
                  <h3 className="text-3xl md:text-4xl 2xl:text-5xl font-bold tracking-tight text-white">
                    YUICHI NARISAWA
                  </h3>
                  <p className="font-mono text-xs text-neutral-400 mt-1">
                    Founder & Representative Director, Misfitt Inc.
                  </p>
                </div>

                <div className="space-y-3 text-neutral-300 text-xs md:text-sm 2xl:text-base leading-relaxed">
                  <p className="italic font-serif text-neutral-400 border-l-2 border-neutral-700 pl-3">
                    "We do not skim the surface of Tokyo. We dissect its layers, unscripted and uncompromising."
                  </p>
                  <p className="text-neutral-400">
                    Leading an uncompromising creative practice and bespoke tour consultancy. Bridging 10 years of frontline field experience with cinematic narrative.
                  </p>
                </div>

                {/* 公的スペック表 */}
                <div className="pt-4 border-t border-neutral-900 font-mono text-[10px] md:text-xs 2xl:text-sm tracking-wider text-neutral-400 space-y-2">
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
                  <Link href="/me" className="inline-flex items-center gap-1.5 font-mono text-xs 2xl:text-sm text-neutral-400 hover:text-white transition-colors group">
                    <span>[ VIEW FULL PROFILE & DOSSIER ]</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* 裏：CLASSIFIED AGENT DOSSIER（PC版） */
              <div className="font-mono text-xs space-y-4 animate-fadeIn">
                <div className="border-b border-cyan-500/30 pb-2 flex justify-between text-[10px] text-cyan-500">
                  <span><DecryptText text="[ RECORD: DOSSIER // SEC-06104 ]" delay={0} /></span>
                  <span><DecryptText text="[ CLEARANCE: LEVEL 5 ]" delay={0} /></span>
                </div>

                <div className="space-y-1">
                  <div className="text-white font-bold text-sm"><DecryptText text='YUICHI NARISAWA // CODE: "YU"' delay={50} /></div>
                  <div className="text-neutral-400 text-[11px]"><DecryptText text="COVER: CEO, MISFITT INC. // GOV-LICENSED GUIDE [EN06104]" delay={100} /></div>
                  <div className="text-emerald-400 text-[11px]"><DecryptText text="STATUS: ACTIVE FIELD OPERATIVE // TOKYO SECTOR" delay={150} /></div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-neutral-900 text-[10px] text-neutral-300 leading-relaxed">
                  <div>
                    <span className="text-neutral-500 block"><DecryptText text="[ INTEL & ACADEMIC DOSSIER ]" delay={200} /></span>
                    <DecryptText text="WASEDA UNIV. (B.S. SOC / M.S. INT. INFO & COMM) // NY ADVANCED TRAINING // TOEIC 905" delay={250} />
                  </div>
                  <div>
                    <span className="text-neutral-500 block"><DecryptText text="[ COVERT CREATIVE DIRECTIVE ]" delay={300} /></span>
                    <DecryptText text="ART DIRECTOR / PROJECT MGR / PLANETARIUM PRODUCER / CINEMATIC DIRECTOR" delay={350} />
                  </div>
                  <div>
                    <span className="text-neutral-500 block"><DecryptText text="[ FIELD ESCORT COMMAND ]" delay={400} /></span>
                    <DecryptText text="10+ YEARS ACTIVE RECON // 6,000+ HIGH-VALUE ASSETS ESCORTED (VERIFIED 4.99 / 5.0)" delay={450} />
                  </div>
                  <div>
                    <span className="text-neutral-500 block"><DecryptText text="[ COVERT MEDIA OPS // PROJECT: SHOH-17 ]" delay={500} /></span>
                    <DecryptText text="INDEPENDENT TRANSMISSION NETWORK DEPLOYED DURING LOCKDOWN // TRACKED ELITE TARGET // COMMANDED 15K+ NETWORK WITH MULTIPLE 1M+ VIEWS" delay={550} />
                  </div>
                  <div>
                    <span className="text-neutral-500 block"><DecryptText text="[ COMBAT & PHYSICAL APTITUDE ]" delay={600} /></span>
                    <DecryptText text="OKINAWA GOJU-RYU KARATE [BLACK BELT] // EX-FREESTYLE SKI SPECIALIST" delay={650} />
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-900">
                  <Link href="/me" className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300">
                    <span><DecryptText text="[ ACCESS UNREDACTED ARCHIVE // /ME ]" delay={700} /></span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

      {/* =========================================
          SECTION 4: DEPLOYMENT (CTA)
      ========================================= */}
      <section className="w-full bg-black border-t border-zinc-900/40 pt-24 pb-12 2xl:pt-36 px-6 md:px-12 2xl:px-16 flex flex-col justify-between relative select-none">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto w-full flex flex-col justify-center flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-zinc-500 uppercase whitespace-nowrap block mb-2">
                // 04 DEPLOYMENT
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
                STEP INTO THE UNKNOWN
              </h2>
              <p className="text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
                Whether you seek an uncompromising Tokyo experience, high-end editorial media, or strategic inbound consulting for your enterprise—our journey starts here.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3">
              <Link href="/contact" className="w-full py-4 px-6 bg-white text-black font-mono text-xs uppercase font-semibold flex items-center justify-between hover:bg-neutral-200 transition-colors">
                <span>BOOK YOUR EXPERIENCE</span>
                <span>→</span>
              </Link>
              <Link href="/contact" className="w-full py-4 px-6 border border-neutral-800 text-neutral-300 font-mono text-xs uppercase flex items-center justify-between hover:border-neutral-600 transition-colors">
                <span>BUSINESS & PARTNERSHIP</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
