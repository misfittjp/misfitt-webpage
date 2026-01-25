"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";

const links = [
    { name: "Official Website", sub: "Brand Manifesto & Vision", url: "/" },
    { name: "Instagram", sub: "Visual Archive: Perspectives", url: "https://instagram.com/yutheguide" },
    { name: "YouTube", sub: "YuTube : Tokyo (Coming Soon)", url: "https://youtube.com/@YuTube.Global" },
    { name: "Academy", sub: "The Forge: Guide Training", url: "/academy" },
    { name: "Journal", sub: "Field Notes: Off the Script", url: "/blog" },
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
                            <div className="group border border-white/10 bg-white/[0.03] p-5 rounded-sm hover:bg-white/10 transition-all duration-500">
                                <p className="text-xs uppercase tracking-widest text-white/30 mb-1 group-hover:text-white/60 transition-colors">
                                    {link.sub}
                                </p>
                                <p className="text-lg font-serif tracking-wide">{link.name}</p>
                            </div>
                        </Link>
                    </FadeIn>
                ))}
            </div>

            {/* Footer */}
            <FadeIn delay={0.8}>
                <div className="mt-20">
                    <Link href="/pay" className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white/60 transition-colors">
                        Secure Payment / Tip
                    </Link>
                </div>
            </FadeIn>
        </main>
    );
}