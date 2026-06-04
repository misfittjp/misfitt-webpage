"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { toursContent } from "@/data/tours";

/**
 * Googleカレンダー統合による予約セクション
 */
export function BookingSection() {
    const { language } = useLanguage();
    const content = toursContent[language].booking;

    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 to-black">
            <div className="max-w-6xl mx-auto px-6">
                {/* セクションタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-sm uppercase tracking-widest text-white/40 mb-4">{content.subtitle}</p>
                    <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                        {content.title}
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        {content.description}
                    </p>
                </motion.div>

                {/* 予約プロセス */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid md:grid-cols-4 gap-6 mb-16"
                >
                    {content.process.map((step: any, index: number) => (
                        <div key={index} className="text-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <h3 className="text-white font-semibold mb-2">{step.step}</h3>
                            <p className="text-white/60 text-sm">{step.description}</p>
                        </div>
                    ))}
                </motion.div>

                {/* 支払い方法 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-16 max-w-2xl mx-auto"
                >
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <span>💰</span>
                            {language === "en" ? "Payment Method" : "支払い方法"}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                            {language === "en"
                                ? "Currently accepting cash payment only. Credit card payment will be available soon. Payment is due on the day of the tour."
                                : "現在は現金決済のみとなります。カード決済は近日中に導入予定です。お支払いはツアー当日にお願いいたします。"}
                        </p>
                    </div>
                </motion.div>

                {/* Googleカレンダー埋め込み */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="rounded-2xl overflow-hidden border border-white/10 bg-white"
                >
                    <iframe
                        src={content.googleCalendarUrl}
                        className="w-full"
                        style={{ height: '700px', border: 0 }}
                        title={language === "en" ? "Book your tour" : "ツアーを予約"}
                    />
                </motion.div>

                {/* 注意事項 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-sm text-white/40">
                        {language === "en"
                            ? "Your booking will be pending until confirmed by Yu. You'll receive confirmation details within 24 hours."
                            : "予約はYuが確認するまで保留されます。24時間以内に確認の詳細が送信されます。"}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
