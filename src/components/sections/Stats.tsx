"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const stats = [
  {
    value: "10+",
    labelEn: "YEARS FIELD EXPERIENCE",
    labelJa: "経験",
    descEn: "Over a decade of private tours.",
    descJa: "10年以上に及ぶプライベートツアー実績",
  },
  {
    value: "6K+",
    labelEn: "GUESTS GUIDED",
    labelJa: "累計案内人数",
    descEn: "Global clientele served in Tokyo.",
    descJa: "世界中から迎えたゲストの案内実績",
  },
  {
    value: "50+",
    labelEn: "COUNTRIES & REGIONS",
    labelJa: "国・地域",
    descEn: "Connecting across diverse cultural contexts.",
    descJa: "50以上の国と地域からの旅人を案内",
  },
  {
    value: "5.0",
    labelEn: "STAR RATING",
    labelJa: "レビュー評価",
    descEn: "Consistently verified perfect feedback.",
    descJa: "クオリティとホスピタリティの証明",
  },
];

export default function Stats() {
  const { lang } = useLanguage();

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border-t border-b border-white/10">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-neutral-950 p-6 md:p-10 text-center flex flex-col justify-center items-center"
          >
            {/* 数値 */}
            <div className="font-sans text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2 md:mb-3">
              {stat.value}
            </div>

            {/* ラベル */}
            <div className="font-mono text-[11px] md:text-xs font-semibold tracking-widest text-neutral-300 uppercase mb-2">
              {lang === "ja" ? stat.labelJa : stat.labelEn}
            </div>

            {/* 説明文：max-w を設けて中央でバランスよく改行または1行表示させる */}
            <p className="font-sans text-xs md:text-[13px] text-neutral-400 leading-relaxed max-w-[220px] break-keep mx-auto">
              {lang === "ja" ? stat.descJa : stat.descEn}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
