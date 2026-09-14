"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function MissionCTA() {
  return (
    <section className="relative bg-neutral-950 pt-24 pb-12 overflow-hidden flex flex-col justify-end">
      {/* Background radial gradient for subtle luxury glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/30 via-neutral-950 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 max-w-6xl 2xl:max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-between">
        {/* HUD Top Boundary */}
        <div className="border-t border-neutral-900 pt-3 pb-12 flex justify-between font-mono text-[10px] text-neutral-600 tracking-wider">
          <span>[ SECTOR: 04 // DEPLOYMENT & CONTACT ]</span>
          <span>[ STATUS: ACTIVE ]</span>
        </div>

        {/* CTA Section */}
        <motion.div
          className="mb-16 md:mb-20 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-neutral-100 uppercase">
            Step Into <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-600">
              The Unknown
            </span>
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-sm md:text-base text-neutral-400 text-balance leading-relaxed">
            Whether you seek an uncompromising Tokyo experience, high-end editorial media, or strategic inbound consulting for your enterprise—our journey starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group flex w-full sm:w-auto h-14 items-center justify-center gap-4 sm:gap-6 border border-neutral-100 bg-neutral-100 px-6 sm:px-8 text-xs sm:text-sm font-bold tracking-widest text-neutral-950 uppercase transition-all hover:bg-transparent hover:text-neutral-100 whitespace-nowrap"
            >
              <span>Book Your Experience</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/contact?type=business"
              className="group flex w-full sm:w-auto h-14 items-center justify-center gap-4 sm:gap-6 border border-neutral-700 px-6 sm:px-8 text-[11px] sm:text-xs font-mono tracking-widest text-neutral-300 transition-all hover:bg-neutral-900 hover:text-neutral-100 uppercase whitespace-nowrap"
            >
              <span>Business & Partnership</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
