"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface UseCarouselOptions {
    speed?: number; // 画素/フレーム
    direction?: "left" | "right";
    isHoverPause?: boolean;
}

export function useCarousel({
    speed = 0.5,
    direction = "left",
    isHoverPause = true
}: UseCarouselOptions = {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0); // 0 to 100
    const [isPlaying, setIsPlaying] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    // 内部状態（レンダリングを伴わない更新用）
    const scrollPosRef = useRef(0);
    const animationFrameRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const isHoveringRef = useRef(false);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollStartRef = useRef(0);

    // 慣性スクロール用
    const velocityRef = useRef(0);
    const isMomentumRef = useRef(false);
    const lastDragTimeRef = useRef(0);
    const lastDragXRef = useRef(0);

    // クリック判定用
    const dragDistanceRef = useRef(0);

    // スクロール位置の正規化とループ処理
    const normalizeScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const maxScroll = container.scrollWidth / 2; // アイテムを2セット置く前提
        if (scrollPosRef.current >= maxScroll) {
            scrollPosRef.current -= maxScroll;
            // 瞬時に戻す（DOMも同期）
            container.scrollLeft = scrollPosRef.current;
        } else if (scrollPosRef.current < 0) {
            scrollPosRef.current += maxScroll;
            container.scrollLeft = scrollPosRef.current;
        }
    }, []);

    const updateProgress = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;
        const maxScroll = container.scrollWidth / 2;
        // 進行度を計算 (0-100)
        // scrollWidthが取れない初期は0
        if (maxScroll > 0) {
            setProgress((scrollPosRef.current / maxScroll) * 100);
        }
    }, []);

    // アニメーションループ
    const animate = useCallback((time: number) => {
        if (lastTimeRef.current === 0) lastTimeRef.current = time;
        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;

        const container = containerRef.current;
        if (!container) {
            animationFrameRef.current = requestAnimationFrame(animate);
            return;
        }

        // 1. ドラッグ中はスクロール処理しない（onMouseMoveで制御）
        if (isDraggingRef.current) {
            // velocity計算のために直近の移動を記録したい場合はここでやるが、
            // onMouseMoveで計算するほうが素直
        }
        // 2. 慣性スクロール中
        else if (isMomentumRef.current) {
            scrollPosRef.current += velocityRef.current;
            velocityRef.current *= 0.95; // 摩擦係数（減速）

            // 速度が十分小さくなったら慣性終了 -> 自動スクロールへ移行
            if (Math.abs(velocityRef.current) < 0.1) {
                isMomentumRef.current = false;
                velocityRef.current = 0;
            }

            normalizeScroll();
            container.scrollLeft = scrollPosRef.current;
            updateProgress();
        }
        // 3. 通常自動スクロール
        else {
            const shouldScroll = isPlaying && (!isHoveringRef.current || !isHoverPause);
            if (shouldScroll) {
                if (direction === "left") {
                    scrollPosRef.current += speed;
                } else {
                    // direction rightなら減らす（左へ動く＝コンテンツは右へ流れるように見える）
                    // ただしDOMのscrollLeftの仕様上、0より小さくはなれないので
                    // 右方向への無限ループは工夫が必要。
                    // 「右へ流れる」＝「左側の隠れている領域が出てくる」＝ scrollLeftを減らす
                    // scrollLeft = maxScroll からスタートして減らしていくのが定石
                    scrollPosRef.current -= speed;
                }
                normalizeScroll();
                container.scrollLeft = scrollPosRef.current;
                updateProgress();
            }
        }

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [isPlaying, speed, direction, isHoverPause, normalizeScroll, updateProgress]);

    // 開始・終了
    useEffect(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [animate]);

    // 方向が変わった時の初期位置調整（右方向なら真ん中からスタートさせたい等）
    // 今回はシンプルに0からスタートし、ループで補正させる

    // ドラッグイベントハンドラ
    const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        isDraggingRef.current = true;
        isMomentumRef.current = false; // 慣性停止
        velocityRef.current = 0;
        dragDistanceRef.current = 0; // 距離リセット

        const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
        startXRef.current = pageX;
        lastDragXRef.current = pageX;
        lastDragTimeRef.current = performance.now();
        scrollStartRef.current = scrollPosRef.current;
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDraggingRef.current) return;

        // TouchEventの場合はpreventDefaultしないとスクロールしてしまうが、
        // passive: falseをつけているのでOK
        if (e.cancelable) e.preventDefault();

        const pageX = 'touches' in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
        const deltaX = startXRef.current - pageX; // total delta

        // 直近の速度計算 (慣性用)
        const now = performance.now();
        const dt = now - lastDragTimeRef.current;
        const dx = lastDragXRef.current - pageX; // 今回の微小移動 (左ドラッグでプラス)

        if (dt > 0) {
            // 左方向への速度（これが正ならscrollLeftが増える）
            // 多少スムージングしてもいいが、生の値を使う
            velocityRef.current = dx;
            // velocityはフレームごとの移動量として扱うので、時間で割る必要はない（animateがRAFだから）
            // ただしマウスイベントの頻度とRAFの頻度は違うので、本当は調整が必要だが、簡易的にdxを使う。
            // 動きが速すぎないようにキャップしてもいい
        }

        lastDragXRef.current = pageX;
        lastDragTimeRef.current = now;

        scrollPosRef.current = scrollStartRef.current + deltaX;

        // ドラッグ距離の更新 (絶対値の累積ではなく、始点からの最大変位とするか、単純に変位とするか)
        // ここでは「開始点からどれだけ離れたか」で判定する
        dragDistanceRef.current = Math.abs(deltaX);

        normalizeScroll();
        if (containerRef.current) containerRef.current.scrollLeft = scrollPosRef.current;
        updateProgress();
    };

    const onMouseUp = () => {
        setIsDragging(false);
        isDraggingRef.current = false;

        // 慣性開始
        isMomentumRef.current = true;
        // マウスを止めてから離した場合、velocityが残っていると不自然なので、
        // 直近の最後のmoveから時間が経ちすぎていたらvelocityを0にする手もあるが、今回は省略
    };

    // グローバルなマウスイベント（ドラッグ用）
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove as any);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchmove', onMouseMove as any, { passive: false });
            window.addEventListener('touchend', onMouseUp);
        } else {
            window.removeEventListener('mousemove', onMouseMove as any);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onMouseMove as any);
            window.removeEventListener('touchend', onMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove as any);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onMouseMove as any);
            window.removeEventListener('touchend', onMouseUp);
        };
    }, [isDragging]);

    // スライダー操作用
    const handleSliderChange = (val: number) => {
        const container = containerRef.current;
        if (!container) return;
        const maxScroll = container.scrollWidth / 2;

        const newPos = (val / 100) * maxScroll;
        scrollPosRef.current = newPos;
        isMomentumRef.current = false; // スライダー操作で慣性停止
        container.scrollLeft = newPos;
        setProgress(val);
    };

    // ホバー制御
    const onMouseEnter = () => { isHoveringRef.current = true; };
    const onMouseLeave = () => { isHoveringRef.current = false; };

    // クリック許可判定関数
    const isClickAllowed = useCallback(() => {
        // 5px以上の移動があったらクリックを無効化
        return dragDistanceRef.current < 5;
    }, []);

    return {
        containerRef,
        progress,
        isPlaying,
        setIsPlaying,
        onSliderChange: handleSliderChange,
        isClickAllowed, // これをエクスポート
        dragHandlers: {
            onMouseDown,
            onTouchStart: onMouseDown,
            onMouseEnter,
            onMouseLeave
            // onClickをここでハンドリングしない。親で isClickAllowed() を呼んで制御する。
        }
    };
}
