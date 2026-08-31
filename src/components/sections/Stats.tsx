"use client";

import { motion } from "framer-motion";
import { statsData } from "@/data";

export default function Stats() {
  return (
    <section className="border-y border-white/10 bg-neutral-950">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col items-center justify-center border-white/10 p-12 text-center ${
              index % 2 !== 0 ? "" : "border-r"
            } ${
              index < 2 ? "border-b md:border-b-0" : ""
            } md:border-r md:last:border-r-0`}
          >
            <span className="mb-2 text-4xl md:text-5xl font-bold tracking-tighter text-neutral-100">
              {stat.number}
            </span>
            <span className="mb-4 font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
              {stat.label}
            </span>
            <p className="text-xs text-neutral-400 max-w-[150px] mx-auto text-balance">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
