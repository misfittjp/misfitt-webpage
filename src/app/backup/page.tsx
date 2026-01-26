"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Calendar, Heart, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

export default function BackupPage() {
    return (
        <main className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center justify-center">
            {/* Header Section */}
            <FadeIn>
                <div className="text-center mb-16">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-4">back YU up!</p>
                    <h1 className="text-3xl font-serif tracking-tight mb-2">Reserve / Support</h1>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 italic">for the Next EPISODE.</p>
                </div>
            </FadeIn>

            <div className="w-full max-w-sm space-y-6">
                {/* Reservation / Booking */}
                <FadeIn delay={0.2}>
                    <Link href="/#services" className="block group border border-white/20 p-8 text-center hover:bg-white/5 transition-all">
                        <Calendar className="w-6 h-6 mx-auto mb-4 text-white/40 group-hover:text-white transition-colors" strokeWidth={1} />
                        <h2 className="text-xl font-serif mb-2">Start a Narrative</h2>
                        <p className="text-[10px] uppercase tracking-widest text-white/30">Book a Private Tour / Session</p>
                    </Link>
                </FadeIn>

                {/* Support / Tip via Stripe */}
                <FadeIn delay={0.4}>
                    <a href="https://buy.stripe.com/..." target="_blank" rel="noopener noreferrer" className="block group border border-white/20 p-8 text-center hover:bg-white/5 transition-all">
                        <Heart className="w-6 h-6 mx-auto mb-4 text-white/40 group-hover:text-white transition-colors" strokeWidth={1} />
                        <h2 className="text-xl font-serif mb-2">Ignite the Episode</h2>
                        <p className="text-[10px] uppercase tracking-widest text-white/30">Support via Credit Card / Apple Pay</p>
                    </a>
                </FadeIn>

                {/* Bank Transfer via Wise */}
                <FadeIn delay={0.6}>
                    <a href="https://wise.com/pay/me/..." target="_blank" rel="noopener noreferrer" className="block group border border-white/10 p-6 text-center hover:bg-white/5 transition-all">
                        <div className="flex items-center justify-center gap-3">
                            <ArrowRightLeft className="w-4 h-4 text-white/40" strokeWidth={1} />
                            <span className="text-sm font-serif tracking-wide text-white/60">Direct Support (Wise)</span>
                        </div>
                    </a>
                </FadeIn>
            </div>

            {/* Security Note */}
            <FadeIn delay={0.8}>
                <p className="mt-12 text-[8px] text-white/10 uppercase tracking-[0.4em] text-center">
                    Every support fuels the next piece of visual storytelling.
                </p>
            </FadeIn>
        </main>
    );
}