"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { toursContent } from "@/data/tours";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { calculateJPY, formatCurrency } from "@/lib/currency";

/**
 * 料金プラン（6h/7h/8h）をカード形式で表示
 * 為替レート連動：USD基準価格 → JPY動的計算
 */
export function TourPlansSection() {
    const { language } = useLanguage();
    const content = toursContent[language].plans;
    const { rate, loading } = useExchangeRate();

    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-black to-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                {/* セクションタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm uppercase tracking-widest text-white/40 mb-4">{content.subtitle}</p>
                    <h2 className={`text-4xl md:text-5xl font-bold text-white ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                        {content.title}
                    </h2>
                </motion.div>

                {/* プランカード */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {content.options.map((plan, index) => {
                        const usdPrice = plan.basePrice;
                        const jpyPrice = plan.displayJPY; // 固定表示価格を使用

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className={`group relative overflow-hidden rounded-2xl bg-white/5 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${plan.popular ? "border-white/30 shadow-lg" : "border-white/10"
                                    }`}
                            >
                                {/* Popularバッジ */}
                                {plan.popular && (
                                    <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Popular
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* 期間 */}
                                    <h3 className={`text-3xl font-bold text-white mb-2 ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                                        {plan.duration}
                                    </h3>

                                    {/* 説明 */}
                                    <p className="text-white/60 mb-6">{plan.description}</p>

                                    {/* 料金 - 日本円メイン */}
                                    <div className="mb-8">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold text-white">
                                                {formatCurrency(jpyPrice, 'JPY')}
                                            </span>
                                        </div>

                                        {/* USD参考価格 */}
                                        <p className="text-sm text-white/40 mt-2">
                                            {formatCurrency(usdPrice, 'USD')} {language === "en" ? "USD reference" : "USD参考"}
                                        </p>

                                        {/* 為替レート表示 */}
                                        {rate && !loading && (
                                            <p className="text-xs text-white/30 mt-1">
                                                1 USD = ¥{rate.toFixed(2)}
                                            </p>
                                        )}
                                    </div>

                                    {/* 特徴リスト */}
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span className="text-white/40 mt-1">✓</span>
                                                <span className="text-white/70 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ホバー時のグラデーション */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* 免責事項 */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center text-sm text-white/40 max-w-2xl mx-auto"
                >
                    {content.disclaimer}
                </motion.p>
            </div>
        </section>
    );
}
