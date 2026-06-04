// src/lib/currency.ts
// 為替レート連動の料金計算ユーティリティ

/**
 * USD基準価格（固定）
 */
export const TOUR_BASE_PRICES_USD = {
    '6h': 500,
    '7h': 550,
    '8h': 660
} as const;

export type TourDuration = keyof typeof TOUR_BASE_PRICES_USD;

/**
 * フォールバック為替レート（APIエラー時）
 * 2026年2月の平均的なレート
 */
export const FALLBACK_EXCHANGE_RATE = 140;

/**
 * USD価格からJPY価格を計算
 * 
 * @param usd - USD価格
 * @param rate - 為替レート（1 USD = X JPY）
 * @returns JPY価格（100円単位で丸める）
 */
export function calculateJPY(usd: number, rate: number): number {
    const rawJPY = usd * rate;
    // 100円単位で丸める（例: 74,234 → 74,200）
    return Math.round(rawJPY / 100) * 100;
}

/**
 * 通貨フォーマット
 * 
 * @param amount - 金額
 * @param currency - 通貨タイプ
 * @returns フォーマット済み文字列
 */
export function formatCurrency(amount: number, currency: 'JPY' | 'USD'): string {
    if (currency === 'JPY') {
        return `¥${amount.toLocaleString('ja-JP')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
}

/**
 * 為替レート情報の型
 */
export interface ExchangeRateData {
    rate: number;
    timestamp?: string;
    fallback?: boolean;
}
