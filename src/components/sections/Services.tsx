"use client";

import { motion } from "framer-motion";
import { servicesData } from "@/data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="bg-neutral-950">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-16 md:px-12 md:py-28">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-100 uppercase">
          Divisions
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 border-b border-white/10 md:grid-cols-3">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group flex flex-col justify-between border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-12 md:last:border-r-0 hover:bg-neutral-900/50 transition-colors duration-500`}
          >
            <div>
              <div className="mb-12 flex items-start justify-between">
                <span className="font-mono text-xs tracking-widest text-neutral-500">
                  {service.tag}
                </span>
                <Link
                  href={service.link}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-all group-hover:border-neutral-100 group-hover:bg-neutral-100 group-hover:text-neutral-950"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <h3 className="mb-2 text-2xl font-bold tracking-tighter text-neutral-100 uppercase">
                {service.title}
              </h3>
              <h4 className="mb-6 font-mono text-xs tracking-widest text-neutral-500 uppercase">
                {service.subtitle}
              </h4>

              <p className="mb-8 text-sm text-neutral-400 leading-relaxed">
                {service.description}
              </p>
            </div>

            <ul className="space-y-3 font-mono text-xs text-neutral-500">
              {service.bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-neutral-700"></span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
