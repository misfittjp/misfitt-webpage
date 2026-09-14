import React from "react";
import Link from "next/link";

export default function TerminalFooter() {
  return (
    <footer className="w-full bg-black border-t border-neutral-900 pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-[400px]">
        {/* CTA エリア */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-16 border-b border-neutral-900">
          <div className="md:col-span-7">
            <span className="font-mono text-[10px] text-neutral-500 tracking-widest block uppercase mb-2">
              [ CALL TO ACTION // DEPLOYMENT ]
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              STEP INTO THE UNKNOWN
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
              Whether you seek an uncompromising Tokyo experience, high-end editorial media, or strategic inbound consulting for your enterprise—our journey starts here.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <Link href="/contact" className="w-full py-4 px-6 bg-white text-black font-mono text-xs uppercase font-semibold flex items-center justify-between hover:bg-neutral-200 transition-colors">
              <span>BOOK YOUR EXPERIENCE</span>
              <span>→</span>
            </Link>
            <Link href="/contact" className="w-full py-4 px-6 border border-neutral-800 text-neutral-300 font-mono text-xs uppercase flex items-center justify-between hover:border-neutral-600 transition-colors">
              <span>BUSINESS & PARTNERSHIP</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ターミナルフッター情報 */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-xs text-neutral-500">
          <div>
            <div className="text-white font-bold tracking-widest">MISFITT INC.</div>
            <div className="text-[10px] text-neutral-600 mt-0.5">TOKYO, JAPAN // LICENSED RECON & CREATIVE</div>
          </div>

          <div className="flex gap-6 text-[11px]">
            <Link href="/tours" className="hover:text-white transition-colors">TOURS</Link>
            <Link href="/photography" className="hover:text-white transition-colors">PHOTOGRAPHY</Link>
            <Link href="/me" className="hover:text-white transition-colors">DOSSIER</Link>
            <Link href="/contact" className="hover:text-white transition-colors">CONTACT</Link>
          </div>

          <div className="text-[10px] text-neutral-600">
            © {new Date().getFullYear()} MISFITT INC. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
