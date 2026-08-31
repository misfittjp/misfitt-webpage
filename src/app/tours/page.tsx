"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reviews from "@/components/sections/Reviews";
import { ArrowRight, CheckCircle2, Video, Camera, CreditCard, Banknote, Shield, Map, Clock, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

// Note: Replace with your actual Stripe publishable key in production
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

const PLANS = [
  {
    id: "6-hour",
    title: "6-Hour Essential",
    price: "¥77,000",
    usd: "~$480",
    desc: "2–3 spots, no rush. Perfect for a focused half-day exploration.",
    popular: false
  },
  {
    id: "7-hour",
    title: "7-Hour Standard",
    price: "¥90,000",
    usd: "~$560",
    desc: "2–3 spots + a proper lunch break. The ideal balance.",
    popular: true
  },
  {
    id: "8-hour",
    title: "8-Hour Ultimate",
    price: "¥100,000",
    usd: "~$630",
    desc: "3–4 spots + a proper lunch break. Full immersion into the city.",
    popular: false
  }
];

const PHOTO_PLANS = [
  {
    id: "standard",
    title: "Standard Story",
    price: "¥35,000",
    usd: "~$220",
    desc: "~50 high-res photos. Individual retouching & color grading.",
    popular: false
  },
  {
    id: "signature",
    title: "Signature Story",
    price: "¥45,000",
    usd: "~$280",
    desc: "~80 photos. Street snaps, portraits, full coverage of spots.",
    popular: true
  },
  {
    id: "ultimate",
    title: "Ultimate Documentary",
    price: "¥60,000",
    usd: "~$375",
    desc: "120+ photos. Complete documentary coverage of the entire tour.",
    popular: false
  }
];

export default function ToursPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    pax: "2",
    plan: "7-hour",
    photoAddon: "none",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.mockUrl) {
        // Mock redirect for testing
        alert("Redirecting to Mock Stripe Checkout...");
        window.location.href = data.mockUrl;
        return;
      }

      // Real Stripe Checkout redirect
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error } = await (stripe as any).redirectToCheckout({
        sessionId: data.id,
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      alert("Error starting checkout: " + err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      
      <main className="flex-1 w-full relative z-10 bg-neutral-950 pt-24 md:pt-32">
        {/* 1. FV (Hero) */}
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden mb-24">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/hero/A7V06864 Large.jpeg" 
              alt="Tokyo Cyberpunk Alley" 
              fill 
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 to-transparent" />
          </div>
          
          <div className="relative z-10 px-6 md:px-12 w-full max-w-7xl mx-auto">
            <p className="font-mono text-[10px] md:text-xs text-neutral-400 tracking-[0.25em] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-neutral-500 block"></span>
              Private Experiences
            </p>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase mb-6 leading-none max-w-4xl">
              Unscripted. <br className="hidden md:block"/>
              Bespoke. <br className="hidden md:block"/>
              Tokyo.
            </h1>
            <p className="text-lg md:text-2xl text-neutral-300 leading-relaxed font-serif italic max-w-2xl">
              &quot;Bypass the tourist traps. We curate bespoke journeys that plunge you into Tokyo&apos;s authentic rhythm.&quot;
            </p>
            <a href="#booking" className="inline-flex items-center gap-3 mt-10 font-mono text-xs text-white border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-colors px-6 py-4 uppercase tracking-widest backdrop-blur-sm">
              Book Your Journey <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* 2. Why Choose This Tour? */}
        <section className="px-6 md:px-12 mx-auto max-w-7xl mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="border-t border-white/20 pt-6">
              <Shield className="w-8 h-8 text-neutral-400 mb-6" />
              <h3 className="text-xl font-bold text-white uppercase mb-3">100% Private</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                No strangers, no large groups, no umbrella-following. This is an intimate experience exclusively for you and your group (up to 6 people) at a flat rate.
              </p>
            </div>
            <div className="border-t border-white/20 pt-6">
              <Map className="w-8 h-8 text-neutral-400 mb-6" />
              <h3 className="text-xl font-bold text-white uppercase mb-3">Fully Custom</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Every itinerary is built from scratch based on your interests. Whether it&apos;s hidden speakeasies, street food, architecture, or cyberpunk neon nights.
              </p>
            </div>
            <div className="border-t border-white/20 pt-6">
              <Star className="w-8 h-8 text-neutral-400 mb-6" />
              <h3 className="text-xl font-bold text-white uppercase mb-3">Certified Pro</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Guided by Yuichi Narisawa, a licensed National Guide (English) with over 10 years of experience and 6,000+ guests hosted. Pure quality, guaranteed.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Plans & Pricing */}
        <section className="bg-neutral-900 py-24 mb-32 border-y border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
          <div className="px-6 md:px-12 mx-auto max-w-7xl relative z-10">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2">
                Plans & Pricing
              </h2>
              <p className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                Flat rate for up to 6 guests
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {PLANS.map((plan) => (
                <div key={plan.id} className={`p-8 border ${plan.popular ? 'border-white/50 bg-neutral-950 shadow-2xl relative' : 'border-white/10 bg-neutral-900/50 hover:border-white/30'} flex flex-col justify-between transition-colors`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-white text-black font-mono text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                      ⭐ Most Popular
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase mb-2">{plan.title}</h3>
                    <p className="text-sm text-neutral-400 mb-8 leading-relaxed h-12">{plan.desc}</p>
                    <div className="mb-8">
                      <span className="text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-neutral-500 font-mono text-xs ml-2">{plan.usd}</span>
                    </div>
                  </div>
                  <a href="#booking" onClick={(e) => {
                    const el = document.getElementById("booking");
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    setFormData(prev => ({ ...prev, plan: plan.id }));
                  }} className="w-full text-center py-4 border border-white/20 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-white mt-8">
                    Select Plan
                  </a>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-black/50 p-6 border border-white/10">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <Clock className="w-5 h-5 text-neutral-400" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Extra Hour</h4>
                  <p className="text-xs text-neutral-400">Available on the day if you want to keep going. (&quot;My middle name is Flexible. haha&quot;)</p>
                </div>
              </div>
              <div className="font-mono text-white">
                ¥16,000 <span className="text-neutral-500 text-xs">(~$100)</span> / hr
              </div>
            </div>
          </div>
        </section>

        {/* 4. Inclusions & Exclusions */}
        <section className="px-6 md:px-12 mx-auto max-w-7xl mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-black text-white uppercase mb-8 border-b border-white/10 pb-4">What&apos;s Included</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span className="text-neutral-300">Private certified guide</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span className="text-neutral-300">Fully customized on-tour route</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span className="text-neutral-300">Authentic local storytelling & photography</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span className="text-neutral-300">Real-time travel insights & transit navigation during the tour</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase mb-8 border-b border-white/10 pb-4">What&apos;s Not Included</h3>
              <ul className="flex flex-col gap-4 mb-8">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-neutral-500 shrink-0" />
                  <span className="text-neutral-400">Transportation costs (trains, taxis for you and the guide)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-neutral-500 shrink-0" />
                  <span className="text-neutral-400">Admission fees to attractions</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-neutral-500 shrink-0" />
                  <span className="text-neutral-400">Food & drinks (Guests are kindly asked to invite the guide for lunch during the tour)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-neutral-500 shrink-0" />
                  <span className="text-neutral-400">Advance reservations or concierge bookings</span>
                </li>
              </ul>
              <div className="bg-neutral-900/50 p-6 border border-white/5">
                <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">Payment Methods</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-neutral-300">
                    <CreditCard className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm">Stripe (Credit Card / Apple Pay) via this site</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <Banknote className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm">Cash on site (JPY Only) upon request</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Optional Add-ons */}
        <section className="px-6 md:px-12 mx-auto max-w-7xl mb-32">
          <div className="relative border border-white/10 bg-neutral-950 overflow-hidden flex flex-col md:flex-row group mb-8">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative overflow-hidden">
              <Image src="/images/hero/A7V01385_GEN Large.jpeg" alt="Professional Photography" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="w-6 h-6 text-white" />
                <span className="font-mono text-xs text-white uppercase tracking-widest border border-white/20 px-3 py-1">Optional Add-on</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 leading-tight">Editorial<br/>Photography</h3>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Elevate your memories. High-resolution, cinematic street portraits taken during your tour with professional Sony Cinema line gear. Edited and color-graded to perfection. Choose the plan that best fits your story.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PHOTO_PLANS.map((plan) => (
              <div key={plan.id} className={`p-6 md:p-8 border ${plan.popular ? 'border-white/50 bg-neutral-950 shadow-2xl relative' : 'border-white/10 bg-neutral-900/50 hover:border-white/30'} flex flex-col justify-between transition-colors`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-white text-black font-mono text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                    ⭐ Most Popular
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-bold text-white uppercase mb-2">{plan.title}</h4>
                  <p className="text-sm text-neutral-400 mb-6 leading-relaxed h-12">{plan.desc}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-black text-white">{plan.price}</span>
                    <span className="text-neutral-500 font-mono text-xs ml-2">{plan.usd}</span>
                  </div>
                </div>
                <a href="#booking" onClick={(e) => {
                  const el = document.getElementById("booking");
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setFormData(prev => ({ ...prev, photoAddon: plan.id }));
                }} className="w-full text-center py-3 border border-white/20 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-white mt-4 block">
                  Select {plan.title}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Gallery & Guest Reviews */}
        <section className="mb-32">
          <div className="px-6 md:px-12 mx-auto max-w-7xl mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-2">
              Social Proof
            </h2>
            <p className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
              10 Years. 6,000+ Guests. 5-Star Average.
            </p>
          </div>
          {/* Snapshots */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-1 mb-8">
            <div className="aspect-square bg-neutral-900 relative overflow-hidden group">
              <Image src="/images/hero/A7V06841 Large.jpeg" alt="Tour Snapshot" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="aspect-square bg-neutral-900 relative overflow-hidden group">
              <Image src="/images/hero/A7V04684 Large.jpeg" alt="Tour Snapshot" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="aspect-square bg-neutral-900 relative overflow-hidden group">
              <Image src="/images/hero/A7V06864 Large.jpeg" alt="Tour Snapshot" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="aspect-square bg-neutral-900 relative overflow-hidden group flex items-center justify-center border border-white/10">
              <div className="text-center">
                <Video className="w-8 h-8 text-white/50 mx-auto mb-2" />
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Video Reel<br/>Coming Soon</span>
              </div>
            </div>
          </div>
          {/* Reviews Component using reviews.json */}
          <div className="-mt-4">
            <Reviews />
          </div>
        </section>

        {/* 7. Meet Your Guide */}
        <section className="px-6 md:px-12 mx-auto max-w-7xl mb-32">
          <div className="bg-neutral-900/30 border border-white/10 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
            {/* Using a generic camera icon if yuichi-portrait.jpg doesn't exist, but we assume it might not. Let's use an existing hero image */}
            <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden shrink-0 grayscale border border-white/20">
              <Image src="/images/hero/A7V00424 Large.jpeg" alt="Yuichi Narisawa" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase mb-2">Yuichi Narisawa</h2>
              <p className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-6">Founder & Creative Director / National Guide</p>
              <p className="text-neutral-300 leading-relaxed mb-8">
                Not a templated tour guide. I operate at the intersection of cultural storytelling and editorial aesthetics. With over a decade of experience and a certified National Guide license, my mission is to show you the unseen, raw, and refined sides of Tokyo that most travelers never reach.
              </p>
              <Link href="/me" className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white hover:text-neutral-400 transition-colors underline decoration-white/30 underline-offset-8">
                View Full Profile & Philosophy <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Booking & Payment Form */}
        <section className="px-6 md:px-12 mx-auto max-w-3xl mb-32 border-t border-white/10 pt-24" id="booking">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4">
              Direct Booking
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xl mx-auto">
              Ready for the unscripted? Fill out your details to secure your dates via Stripe secure checkout.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Name *</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white/40 font-mono text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Email *</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white/40 font-mono text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Preferred Date *</label>
                <input 
                  type="date" required
                  value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                  className="bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white/40 font-mono text-sm [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Group Size *</label>
                <input 
                  type="number" min="1" max="6" required
                  value={formData.pax} onChange={e => setFormData({...formData, pax: e.target.value})}
                  className="bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white/40 font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Tour Plan *</label>
              <select 
                value={formData.plan} onChange={e => setFormData({...formData, plan: e.target.value})}
                className="bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white/40 font-mono text-sm"
              >
                <option value="6-hour">6-Hour Essential (¥77,000)</option>
                <option value="7-hour">7-Hour Standard (¥90,000)</option>
                <option value="8-hour">8-Hour Ultimate (¥100,000)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Photography Add-on</label>
              <select 
                value={formData.photoAddon} onChange={e => setFormData({...formData, photoAddon: e.target.value})}
                className="bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white/40 font-mono text-sm"
              >
                <option value="none">No Photography Add-on</option>
                <option value="standard">Standard Story (+¥35,000)</option>
                <option value="signature">Signature Story (+¥45,000) ⭐ Most Popular</option>
                <option value="ultimate">Ultimate Documentary (+¥60,000)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Additional Requests</label>
              <textarea 
                rows={4}
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                className="bg-neutral-900 border border-white/10 p-4 text-white focus:outline-none focus:border-white/40 resize-none font-mono text-sm"
                placeholder="Dietary restrictions, must-see places, mobility issues..."
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-8 bg-white text-black font-black uppercase tracking-widest text-lg py-5 hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Proceed to Checkout"} <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center font-mono text-[10px] text-neutral-500 tracking-widest mt-2 uppercase">
              Secure payment powered by Stripe.
            </p>
          </form>
        </section>

      </main>
      
      <Footer />
    </>
  );
}
