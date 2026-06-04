import { LanguageProvider } from '@/contexts/LanguageContext';
import { ReadReviewsProvider } from '@/contexts/ReadReviewsContext';

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const currentLang = (lang === 'en' ? 'en' : 'ja') as 'en' | 'ja';

    return (
        <LanguageProvider initialLanguage={currentLang}>
            <ReadReviewsProvider>
                {children}
            </ReadReviewsProvider>
        </LanguageProvider>
    );
}
