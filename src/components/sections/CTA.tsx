"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="inquire" className="relative bg-neutral-950 py-16 md:py-28 flex items-center justify-center overflow-hidden">
      {/* Background radial gradient for subtle luxury glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-neutral-950 to-neutral-950" />
      
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
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
          <p className="mx-auto mb-12 max-w-lg text-sm md:text-base text-neutral-400">
            Whether you seek an uncompromising Tokyo experience, striking editorial photography, or the path to becoming an elite guide—your journey starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="mailto:contact@misfitt.tokyo"
              className="group flex w-full sm:w-auto items-center justify-between gap-6 border border-neutral-100 bg-neutral-100 px-8 py-4 text-sm font-bold tracking-widest text-neutral-950 uppercase transition-all hover:bg-transparent hover:text-neutral-100"
            >
              <span>Book Your Experience</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/academy"
              className="flex w-full sm:w-auto items-center justify-center border border-white/20 px-8 py-4 text-sm font-mono tracking-widest text-neutral-300 transition-all hover:bg-neutral-900 hover:text-neutral-100"
            >
              Join The Academy
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
