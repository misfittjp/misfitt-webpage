"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BackYuUpPage() {
  const [amount, setAmount] = useState<number | string>(50);
  const [loading, setLoading] = useState(false);

  const presets = [25, 50, 100];

  const handleCheckout = async () => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount < 5) {
      alert("Please enter an amount of $5 or more.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout-tip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numAmount }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`Error ${res.status}: ${text}`);
        alert(`Payment initiation failed (Status: ${res.status}). Please try again.`);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center px-6 py-16 relative overflow-hidden selection:bg-white selection:text-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="w-full max-w-md space-y-8 text-center relative z-10 p-6 sm:p-8 rounded-2xl border border-white/5 bg-neutral-900/30 backdrop-blur-sm shadow-2xl">
        <div className="space-y-3">
          <p className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase">
            [ MISFITT // EPISODE ARCHIVE ]
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight leading-none uppercase text-white">
            BACK YU UP!
            <span className="text-neutral-400 block mt-2 text-lg sm:text-xl font-normal tracking-normal">
              FOR THE NEXT EPISODE.
            </span>
          </h1>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-2">
            Thank you for walking the living depths of Tokyo with me. Your support directly fuels our field research, gear acquisition, and upcoming content production across YouTube, Instagram, and visual storytelling projects.
          </p>
        </div>

        <div className="space-y-5 pt-4 border-t border-white/10">
          <div className="text-left">
            <label className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
              Select or Enter Amount
            </label>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {presets.map((p) => {
              const isActive = Number(amount) === p;
              return (
                <button
                  key={p}
                  onClick={() => setAmount(p)}
                  type="button"
                  className={`py-3 text-sm font-mono border transition ${
                    isActive
                      ? "bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : "bg-neutral-950/50 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  ${p}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <span
              className={`absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm transition ${
                !presets.includes(Number(amount)) && amount !== "" ? "text-white" : "text-neutral-500"
              }`}
            >
              $
            </span>
            <input
              type="number"
              min="5"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Custom amount (e.g. 150, 200...)"
              className={`w-full pl-8 pr-4 py-3.5 bg-neutral-950/80 border rounded-none text-white font-mono text-sm focus:outline-none transition placeholder:text-neutral-600 ${
                !presets.includes(Number(amount)) && amount !== ""
                  ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  : "border-white/10 focus:border-white/30"
              }`}
            />
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="group flex items-center justify-center gap-3 w-full py-4 px-6 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition duration-200 shadow-md disabled:opacity-50 cursor-pointer mt-2"
          >
            <span>{loading ? "Connecting..." : `Fuel with $${amount || 0} →`}</span>
          </button>
        </div>

        <div className="space-y-3 pt-2">
          <Link className="block w-full py-3.5 px-6 border border-white/20 text-neutral-300 font-mono text-xs uppercase tracking-widest hover:border-white hover:text-white transition duration-200" href="/tours">
            Explore Future Tours &amp; Itineraries
          </Link>
          <Link className="block w-full py-3.5 px-6 border border-white/10 text-neutral-400 font-mono text-xs uppercase tracking-widest hover:border-neutral-500 hover:text-neutral-300 transition duration-200" href="/me">
            Founder Dossier &amp; Philosophy
          </Link>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center font-mono text-xs text-neutral-400">
          <a
            href="https://www.instagram.com/yutheguide/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-white transition group"
          >
            <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>@yutheguide</span>
          </a>
          <span className="text-neutral-500">TOKYO, JAPAN</span>
        </div>
      </div>
    </main>
  );
}
