"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const SERVICES = [
  "Private Tour",
  "Photography",
  "Guide Academy",
  "General Inquiry"
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: ""
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center border border-white/10 p-12"
      >
        <div className="mb-6 rounded-full border border-white/20 p-4 bg-neutral-900">
          <Check className="h-8 w-8 text-neutral-100" />
        </div>
        <h3 className="text-2xl font-bold tracking-tighter text-neutral-100 uppercase mb-2">
          Request Received
        </h3>
        <p className="text-sm text-neutral-400 font-mono tracking-widest max-w-sm">
          Our concierge team will review your inquiry and respond within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-8">
        {/* Name */}
        <div className="relative group">
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-white/20 py-4 text-sm text-neutral-100 placeholder-transparent focus:border-white focus:outline-none transition-colors"
            placeholder="Name"
          />
          <label 
            htmlFor="name" 
            className="absolute left-0 top-4 text-xs font-mono tracking-widest text-neutral-500 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-neutral-300 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-neutral-300"
          >
            FULL NAME *
          </label>
        </div>

        {/* Email */}
        <div className="relative group">
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-white/20 py-4 text-sm text-neutral-100 placeholder-transparent focus:border-white focus:outline-none transition-colors"
            placeholder="Email"
          />
          <label 
            htmlFor="email" 
            className="absolute left-0 top-4 text-xs font-mono tracking-widest text-neutral-500 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-neutral-300 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-neutral-300"
          >
            EMAIL ADDRESS *
          </label>
        </div>

        {/* Date */}
        <div className="relative group">
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-white/20 py-4 text-sm text-neutral-100 focus:border-white focus:outline-none transition-colors color-scheme-dark"
          />
          <label 
            htmlFor="date" 
            className="absolute left-0 -top-4 text-[10px] font-mono tracking-widest text-neutral-500"
          >
            PREFERRED DATE (OPTIONAL)
          </label>
        </div>
      </div>

      {/* Services Multi-select */}
      <div>
        <label className="block text-[10px] font-mono tracking-widest text-neutral-500 mb-4">
          INTERESTED IN *
        </label>
        <div className="flex flex-wrap gap-3">
          {SERVICES.map(service => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              className={`px-4 py-2 text-xs font-mono tracking-widest border transition-all ${
                selectedServices.includes(service)
                  ? "border-neutral-100 bg-neutral-100 text-black"
                  : "border-white/20 text-neutral-400 hover:border-white/50"
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="relative group">
        <textarea
          name="message"
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="peer w-full bg-transparent border-b border-white/20 py-4 text-sm text-neutral-100 placeholder-transparent focus:border-white focus:outline-none transition-colors resize-none"
          placeholder="Message"
        />
        <label 
          htmlFor="message" 
          className="absolute left-0 top-4 text-xs font-mono tracking-widest text-neutral-500 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-neutral-300 peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-neutral-300"
        >
          MESSAGE / INQUIRY *
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || selectedServices.length === 0}
        className="group flex w-full items-center justify-between gap-6 border border-neutral-100 bg-neutral-100 px-8 py-4 text-sm font-bold tracking-widest text-neutral-950 uppercase transition-all hover:bg-transparent hover:text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isSubmitting ? "Processing..." : "Submit Request"}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
