import { ToursPageClient } from "@/components/tours/ToursPageClient";

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ja' }];
}

export default async function ToursPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const validLang = (lang === 'en' || lang === 'ja') ? lang : 'en';

    return <ToursPageClient lang={validLang} />;
}
