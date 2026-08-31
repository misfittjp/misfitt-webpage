"use client";

import { motion } from "framer-motion";
import { pricingPlans } from "@/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className="bg-neutral-950 py-16 md:py-28 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-100 uppercase mb-4">
            Commissions
          </h2>
          <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
            Bespoke Production Plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col border-b border-white/10 md:border-b-0 md:border-r md:last:border-r-0 p-8 md:p-12"
            >
              <div className="flex-1">
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-4 block">
                  Plan {String.fromCharCode(65 + index)}
                </span>
                <h3 className="text-2xl font-bold tracking-tighter text-neutral-100 uppercase mb-4">
                  {plan.name}
                </h3>
                <p className="text-sm text-neutral-400 mb-8 leading-relaxed">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-12">
                  {plan.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 font-mono text-xs text-neutral-300">
                      <span className="h-[2px] w-4 bg-neutral-700"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="group flex items-center justify-between border border-white/20 px-6 py-3 font-mono text-[10px] tracking-widest text-neutral-100 uppercase transition-all hover:bg-neutral-100 hover:text-neutral-950"
              >
                <span>Request</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
