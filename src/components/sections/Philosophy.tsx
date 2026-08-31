"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="relative border-b border-white/10 bg-neutral-950 py-16 px-6 md:px-12 md:py-28 flex items-center justify-center">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-8 block font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
            Our Manifesto
          </span>
          <h2 className="mb-12 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight text-neutral-100 uppercase text-balance">
            We reject the <span className="italic font-serif font-normal opacity-70">superficial</span>. We embrace the raw, the authentic, and the profound.
          </h2>
          <div className="mx-auto max-w-2xl space-y-6 text-sm md:text-base text-neutral-400 leading-relaxed text-left md:text-center text-balance">
            <p>
              Misfitt is born from the streets of Tokyo. We don&apos;t do tourist traps, scripted speeches, or crowded buses. We are professionals of the field—immersed in the subcultures, the high-end gastronomy, and the architectural brilliance that defines this city.
            </p>
            <p>
              Whether it&apos;s capturing editorial street photography in Kabukicho or navigating the hidden omakase counters of Ginza, our approach is always cinematic, always uncompromising.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
