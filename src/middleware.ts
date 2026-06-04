import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['ja', 'en'];
const defaultLocale = 'ja';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    console.log('[Middleware] Processing:', pathname);

    // 既に言語プレフィックスがある場合はスキップ
    const pathnameHasLocale = supportedLocales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        console.log('[Middleware] Locale already present, skipping');
        return NextResponse.next();
    }

    // Accept-Languageヘッダーから言語を判定
    const acceptLanguage = request.headers.get('accept-language') || '';
    console.log('[Middleware] Accept-Language:', acceptLanguage);

    let locale = defaultLocale;

    // Accept-Languageヘッダーをパース
    if (acceptLanguage) {
        const languages = acceptLanguage
            .split(',')
            .map(lang => {
                const parts = lang.trim().split(';');
                const code = parts[0].split('-')[0].toLowerCase();
                const qPart = parts.find(p => p.trim().startsWith('q='));
                const quality = qPart ? parseFloat(qPart.split('=')[1]) : 1.0;
                return { code, quality };
            })
            .sort((a, b) => b.quality - a.quality);

        // 最優先言語が英語の場合のみ英語にする、日本語の場合はjaにする
        if (languages.length > 0) {
            if (languages[0].code === 'en') {
                locale = 'en';
            } else if (languages[0].code === 'ja') {
                locale = 'ja';
            }
        }
    }

    console.log('[Middleware] Selected locale:', locale);

    // リダイレクト先のパスを構築
    const redirectPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    const redirectUrl = new URL(redirectPath, request.url);

    console.log('[Middleware] Redirecting to:', redirectUrl.toString());

    return NextResponse.redirect(redirectUrl);
}

export const config = {
    // 画像やスタイル、スクリプト、動画などの静的ファイル、Next.js内部パス、APIを除外
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images/|videos/|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.gif|.*\\.mp4|.*\\.webm|.*\\.JPG|.*\\.PNG|.*\\.JPEG|api/).*)'
    ],
};