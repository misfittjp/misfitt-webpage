import { HomeClient } from "@/components/home/HomeClient";

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ja' }];
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    // Validate lang
    const validLang = (lang === 'en' || lang === 'ja') ? lang : 'en';

    return <HomeClient lang={validLang} />;
}
