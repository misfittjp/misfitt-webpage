// src/lib/stripe.ts
// Stripe決済の将来的な統合のための準備ファイル

/**
 * Stripe設定
 * 
 * このファイルは将来的なStripe決済統合のために準備されています。
 * Google Workspace予約システムと連携して、予約確定後の決済フローを実装する予定です。
 * 
 * 実装予定の機能:
 * - 予約確定後の決済リンク生成
 * - Payment Intent の作成
 * - Webhook処理（支払い確認）
 * - 領収書の自動発行
 * 
 * 必要な環境変数（.env.local）:
 * - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 * - STRIPE_SECRET_KEY
 * - STRIPE_WEBHOOK_SECRET
 */

// Stripe初期化（将来の実装用）
// import Stripe from 'stripe';
//
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: '2024-11-20.acacia',
// });

/**
 * 料金プランとStripe Price IDのマッピング（将来の実装用）
 */
export const TOUR_PRICES = {
    '6h': {
        usd: 'price_6h_usd', // Stripe Price ID
        jpy: 'price_6h_jpy',
        amount: {
            usd: 50000, // cents
            jpy: 7000000 // yen (in smallest currency unit)
        }
    },
    '7h': {
        usd: 'price_7h_usd',
        jpy: 'price_7h_jpy',
        amount: {
            usd: 55000,
            jpy: 7700000
        }
    },
    '8h': {
        usd: 'price_8h_usd',
        jpy: 'price_8h_jpy',
        amount: {
            usd: 66000,
            jpy: 9240000
        }
    }
} as const;

export type TourDuration = keyof typeof TOUR_PRICES;
export type Currency = 'usd' | 'jpy';

/**
 * 決済リンク生成（将来の実装用）
 * 
 * @param duration - ツアーの長さ (6h, 7h, 8h)
 * @param currency - 支払い通貨 (usd or jpy)
 * @param metadata - 予約情報（ゲスト名、日時など）
 * @returns Stripe Checkout Session URL
 */
export async function createPaymentLink(
    duration: TourDuration,
    currency: Currency,
    metadata: {
        guestName: string;
        guestEmail: string;
        bookingDate: string;
        groupSize: number;
    }
): Promise<string> {
    // TODO: Stripe Checkout Session を作成
    // const session = await stripe.checkout.sessions.create({
    //     mode: 'payment',
    //     line_items: [{
    //         price: TOUR_PRICES[duration][currency],
    //         quantity: 1,
    //     }],
    //     metadata,
    //     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tours/booking-confirmed`,
    //     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tours`,
    // });
    // return session.url!;

    throw new Error('Stripe integration not yet implemented');
}

/**
 * Webhook処理（将来の実装用）
 * 
 * 支払い完了時にGoogleカレンダーの予約を確定する
 */
export async function handlePaymentSuccess(
    sessionId: string
): Promise<void> {
    // TODO: 
    // 1. Stripe Session から支払い情報を取得
    // 2. Googleカレンダーの予約を確定
    // 3. 確認メールを送信
    // 4. データベースに記録

    throw new Error('Webhook handler not yet implemented');
}
