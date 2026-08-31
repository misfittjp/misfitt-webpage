"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function ConciergeInfo() {
  const [copied, setCopied] = useState(false);
  const email = "concierge@misfitt.tokyo";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full border border-white/10 bg-black p-8 md:p-12">
      <div>
        <h3 className="text-2xl font-bold tracking-tighter text-neutral-100 uppercase mb-8">
          Direct Access
        </h3>
        <p className="text-sm text-neutral-400 mb-12 leading-relaxed">
          For urgent matters, press inquiries, or direct communication with our concierge team.
        </p>

        <div className="mb-12">
          <span className="block font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-3">
            Email
          </span>
          <button 
            onClick={handleCopy}
            className="group flex items-center gap-4 text-sm md:text-lg font-mono text-neutral-200 hover:text-white transition-colors"
          >
            {email}
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
            )}
          </button>
          {copied && (
            <span className="mt-2 block font-mono text-[10px] text-green-500">
              Copied to clipboard
            </span>
          )}
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 space-y-6">
        <div>
          <span className="block font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">
            Timezone
          </span>
          <p className="font-mono text-xs text-neutral-300">
            JST (UTC +9:00)
          </p>
        </div>
        <div>
          <span className="block font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">
            Location
          </span>
          <p className="font-mono text-xs text-neutral-300">
            Tokyo, Japan<br />
            35&deg;39&apos;29&quot;N 139&deg;41&apos;33&quot;E
          </p>
        </div>
      </div>
    </div>
  );
}
