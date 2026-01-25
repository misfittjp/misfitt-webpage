"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { CreditCard, ArrowRightLeft } from "lucide-react";

export default function PayPage() {
    return (
        <main className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center justify-center">
            <FadeIn>
                <div className="text-center mb-16">
                    <h1 className="text-2xl font-serif tracking-tight mb-4 text-white/90">Settlement & Appreciation</h1>
                    <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
                        Choose your preferred method for payments and tips.
                    </p>
                </div>
            </FadeIn>

            <div className="w-full max-w-sm space-y-6">
                {/* Stripe / Credit Card */}
                <FadeIn delay={0.2}>
                    <a href="https://buy.stripe.com/..." target="_blank" className="block group border border-white/20 p-8 text-center hover:bg-white/5 transition-all">
                        <CreditCard className="w-6 h-6 mx-auto mb-4 text-white/40 group-hover:text-white transition-colors" strokeWidth={1} />
                        <h2 className="text-xl font-serif mb-2">Express Checkout</h2>
                        <p className="text-[10px] uppercase tracking-widest text-white/30">Credit Card / Apple Pay / Google Pay</p>
                    </a>
                </FadeIn>

                {/* Wise */}
                <FadeIn delay={0.4}>
                    <a href="https://wise.com/pay/me/..." target="_blank" className="block group border border-white/20 p-8 text-center hover:bg-white/5 transition-all">
                        <ArrowRightLeft className="w-6 h-6 mx-auto mb-4 text-white/40 group-hover:text-white transition-colors" strokeWidth={1} />
                        <h2 className="text-xl font-serif mb-2">Direct Transfer</h2>
                        <p className="text-[10px] uppercase tracking-widest text-white/30">Wise / Best Exchange Rate</p>
                    </a>
                </FadeIn>
            </div>

            <FadeIn delay={0.6}>
                <p className="mt-12 text-[9px] text-white/20 uppercase tracking-widest text-center px-10">
                    All transactions are secured and encrypted.
                </p>
            </FadeIn>
        </main>
    );
}