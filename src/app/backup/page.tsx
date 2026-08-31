"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DollarSign, ArrowRight, ShieldCheck, Mail } from "lucide-react";

export default function BackupPage() {
  const [customTip, setCustomTip] = useState("");
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");

  const handleTip = (amount: number | string) => {
    alert(`Redirecting to secure Stripe Checkout for $${amount}...`);
  };

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Inquiry sent for ${inquiryName}. We will respond shortly.`);
  };

  return (
    <>
      <Header />
      
      <main className="flex-1 w-full relative z-10 bg-neutral-950 min-h-screen pt-32 pb-24">
        <div className="px-6 md:px-12 mx-auto max-w-4xl">
          
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4">
              Direct Access
            </h1>
            <p className="font-mono text-xs md:text-sm text-neutral-400 tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
              Secure Hub for Gratuities, Custom Payments, and Direct Bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Column: Tipping & Payments */}
            <div className="flex flex-col gap-12">
              {/* Gratuity Section */}
              <section>
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <DollarSign className="w-5 h-5 text-neutral-300" />
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider">Gratuity / Tip</h2>
                </div>
                
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                  If you enjoyed your unscripted Tokyo experience, tips are highly appreciated but never expected.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[20, 50, 100].map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleTip(amount)}
                      className="bg-neutral-900 border border-white/10 hover:border-white/40 hover:bg-neutral-800 transition-all py-4 flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="text-2xl font-black text-white group-hover:scale-110 transition-transform">${amount}</span>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">USD</span>
                    </button>
                  ))}
                  
                  <div className="bg-neutral-900 border border-white/10 py-4 px-4 flex flex-col items-center justify-center gap-2">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Custom Amount</span>
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-neutral-400">$</span>
                      <input 
                        type="number"
                        placeholder="0.00"
                        value={customTip}
                        onChange={(e) => setCustomTip(e.target.value)}
                        className="bg-transparent border-b border-neutral-700 focus:border-white w-full text-white text-center outline-none transition-colors"
                      />
                    </div>
                    {customTip && (
                      <button 
                        onClick={() => handleTip(customTip)}
                        className="mt-2 text-xs text-black bg-white px-4 py-1 font-bold uppercase tracking-widest hover:bg-neutral-200 w-full"
                      >
                        Send
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* Supported Payments */}
              <section className="bg-neutral-900 border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-neutral-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Secure Payments via Stripe</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1 text-neutral-300">Apple Pay</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1 text-neutral-300">Google Pay</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1 text-neutral-300">Visa</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1 text-neutral-300">Mastercard</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1 text-neutral-300">Amex</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 bg-white/5 px-3 py-1 text-neutral-300">Cash (JPY)</span>
                </div>
              </section>
            </div>

            {/* Right Column: Booking / Custom Inquiry */}
            <div className="flex flex-col gap-12">
              <section>
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <Mail className="w-5 h-5 text-neutral-300" />
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider">Direct Inquiry</h2>
                </div>

                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                  Bypass platform fees. Contact us directly to arrange custom tours, photography add-ons, or business consulting.
                </p>

                <form onSubmit={handleInquiry} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Name</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryName}
                      onChange={e => setInquiryName(e.target.value)}
                      className="bg-neutral-900 border border-white/10 p-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Email</label>
                    <input 
                      type="email" 
                      required
                      value={inquiryEmail}
                      onChange={e => setInquiryEmail(e.target.value)}
                      className="bg-neutral-900 border border-white/10 p-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Message / Request</label>
                    <textarea 
                      required
                      rows={4}
                      value={inquiryMessage}
                      onChange={e => setInquiryMessage(e.target.value)}
                      className="bg-neutral-900 border border-white/10 p-3 text-white focus:outline-none focus:border-white/40 transition-colors resize-none"
                      placeholder="Tell us about your trip..."
                    />
                  </div>
                  <button type="submit" className="mt-4 bg-white text-black font-bold uppercase tracking-widest text-sm py-4 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                    Send Request <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </section>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
