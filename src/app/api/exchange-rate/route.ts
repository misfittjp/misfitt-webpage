// src/app/api/exchange-rate/route.ts
import { NextResponse } from 'next/server';
import { FALLBACK_EXCHANGE_RATE, type ExchangeRateData } from '@/lib/currency';

/**
 * 為替レートのキャッシュ時間（秒）
 * 60分 = 3600秒
 */
export const revalidate = 3600;

/**
 * 為替レートAPI endpoint
 * GET /api/exchange-rate
 * 
 * Exchange Rate APIから最新のUSD→JPYレートを取得
 * エラー時はフォールバックレート（¥140/USD）を返す
 */
export async function GET() {
    try {
        // Exchange Rate API（無料版）を使用
        const response = await fetch(
            'https://api.exchangerate-api.com/v4/latest/USD',
            {
                next: { revalidate: 3600 },
                // タイムアウト設定
                signal: AbortSignal.timeout(5000)
            }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const jpyRate = data.rates?.JPY;

        if (!jpyRate || typeof jpyRate !== 'number' || jpyRate <= 0) {
            throw new Error('Invalid exchange rate data');
        }

        // 正常なレートが取得できた場合
        const result: ExchangeRateData = {
            rate: jpyRate,
            timestamp: new Date().toISOString()
        };

        return NextResponse.json(result, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
            }
        });

    } catch (error) {
        console.error('Exchange rate API error:', error);

        // フォールバックレートを返す
        const fallbackResult: ExchangeRateData = {
            rate: FALLBACK_EXCHANGE_RATE,
            fallback: true,
            timestamp: new Date().toISOString()
        };

        return NextResponse.json(fallbackResult, {
            status: 200, // クライアント側でエラーにしない
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' // 5分キャッシュ
            }
        });
    }
}
