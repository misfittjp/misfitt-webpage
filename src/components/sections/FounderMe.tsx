"use client";

import { motion } from "framer-motion";
import { founderData } from "@/data";
import Image from "next/image";

export default function FounderMe() {
  return (
    <section id="founder" className="bg-black py-16 md:py-28 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900"
          >
            <Image
              src="https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=1000"
              alt="Yuichi Narisawa"
              fill
              className="object-cover grayscale contrast-125"
            />
            {/* Cinematic overlay lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-8 left-8 h-8 w-px bg-white/30" />
              <div className="absolute top-8 left-8 h-px w-8 bg-white/30" />
              <div className="absolute bottom-8 right-8 h-8 w-px bg-white/30" />
              <div className="absolute bottom-8 right-8 h-px w-8 bg-white/30" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase mb-4">
              The Director
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-neutral-100 uppercase mb-2">
              Yuichi Narisawa
            </h2>
            <h3 className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 mb-12">
              {founderData.role}
            </h3>

            <div className="space-y-6 text-sm md:text-base text-neutral-300 leading-relaxed">
              <p className="border-l border-white/20 pl-6 italic text-neutral-400">
                {founderData.bio}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">
                  Track Record
                </h4>
                <p className="text-sm text-neutral-300">
                  {founderData.trackRecord}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">
                  Aesthetics & Gear
                </h4>
                <p className="text-sm text-neutral-300">
                  {founderData.gear}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
