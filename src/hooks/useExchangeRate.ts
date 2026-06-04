// src/hooks/useExchangeRate.ts
'use client';

import { useEffect, useState } from 'react';
import { FALLBACK_EXCHANGE_RATE, type ExchangeRateData } from '@/lib/currency';

/**
 * 為替レート取得Hook
 * 
 * /api/exchange-rateから為替レートを取得し、状態管理
 * 
 * @returns {Object} - rate: 為替レート, loading: ローディング状態, error: エラー状態
 */
export function useExchangeRate() {
    const [rate, setRate] = useState<number>(FALLBACK_EXCHANGE_RATE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function fetchExchangeRate() {
            try {
                const response = await fetch('/api/exchange-rate');

                if (!response.ok) {
                    throw new Error('Failed to fetch exchange rate');
                }

                const data: ExchangeRateData = await response.json();

                if (mounted) {
                    setRate(data.rate);
                    setError(!!data.fallback); // フォールバック使用時はerror=true
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching exchange rate:', err);

                if (mounted) {
                    setRate(FALLBACK_EXCHANGE_RATE);
                    setError(true);
                    setLoading(false);
                }
            }
        }

        fetchExchangeRate();

        return () => {
            mounted = false;
        };
    }, []);

    return { rate, loading, error };
}
