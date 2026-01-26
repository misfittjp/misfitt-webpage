"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";

const links = [
    { name: "Official Website", sub: "Brand Manifesto & Vision", url: "/" },
    { name: "Instagram", sub: "Visual Archive: Perspectives", url: "https://instagram.com/yutheguide" },
    { name: "YouTube", sub: "YuTube : Tokyo (Coming Soon)", url: "https://youtube.com/@YuTube.Global" },
    { name: "Academy", sub: "The Forge: Guide Training", url: "/academy" },
];

export default function MePage() {
    return (
        <main className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center">
            {/* Header */}
            <FadeIn>
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-serif tracking-tighter mb-2">Misfitt</h1>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/40">Off the Script.</p>
                </div>
            </FadeIn>

            {/* Link Buttons */}
            <div className="w-full max-w-sm space-y-4">
                {links.map((link, i) => (
                    <FadeIn key={link.name} delay={i * 0.1}>
                        <Link href={link.url} target={link.url.startsWith('http') ? "_blank" : "_self"}>
                            <div className="group border border-white/10 bg-white/[0.03] p-5 rounded-sm hover:bg-white/10 transition-all duration-500 text-center">
                                <p className="text-xs uppercase tracking-widest text-white/30 mb-1 group-hover:text-white/60 transition-colors">
                                    {link.sub}
                                </p>
                                <p className="text-lg font-serif tracking-wide">{link.name}</p>
                            </div>
                        </Link>
                    </FadeIn>
                ))}
            </div>

            {/* IMPORTANT: Link to /backup */}
            <FadeIn delay={0.6}>
                <div className="mt-12 w-full max-w-sm">
                    <Link href="/backup">
                        <div className="border border-white/40 p-5 rounded-sm text-center bg-white text-black hover:bg-transparent hover:text-white transition-all duration-500">
                            <p className="text-[10px] uppercase tracking-widest mb-1 opacity-60">Reserve / Support</p>
                            <p className="text-lg font-serif font-bold tracking-wide">back YU up!</p>
                        </div>
                    </Link>
                </div>
            </FadeIn>
        </main>
    );
}