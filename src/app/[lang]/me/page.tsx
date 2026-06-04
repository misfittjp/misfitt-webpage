import { MePageClient } from "@/components/me/MePageClient";

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ja' }];
}

export default async function MePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const validLang = (lang === 'en' || lang === 'ja') ? lang : 'en';

    return <MePageClient lang={validLang} />;
}