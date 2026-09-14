"use client";

import { motion } from "framer-motion";
import { photoArchiveData } from "@/data";
import Image from "next/image";

// Simple dark skeleton placeholder
const skeletonSvg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+";

export default function PhotoArchive() {
  return (
    <section id="archive" className="bg-black py-16 md:py-28">
      <div className="mb-12 px-6 md:mb-24 md:px-12 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-100 uppercase mb-4">
            Archive
          </h2>
          <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
            Street × Luxury / Contact Sheet
          </p>
        </div>
        <p className="mt-6 md:mt-0 max-w-sm text-sm text-neutral-400">
          A raw, unfiltered glimpse into the visual narrative of our journeys. Tokyo, framed through cinematic glass.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-12 gap-1">
        {photoArchiveData.slice(0, 4).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group relative overflow-hidden bg-neutral-900 ${
              item.ratio === "portrait" ? "aspect-[3/4]" : "aspect-[4/3] md:aspect-[3/4]"
            }`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={skeletonSvg}
              className="object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-between p-6">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] tracking-widest text-white px-2 py-1 border border-white/20 backdrop-blur-sm">
                  {item.tag}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-white/70">
                  {item.focalLength} / {item.camera}
                </span>
              </div>
              
              <div className="flex flex-col justify-end">
                <h3 className="text-lg font-bold tracking-tighter text-white uppercase mb-1 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.title}
                </h3>
                <p className="font-mono text-[10px] tracking-widest text-white/70 mb-4 translate-y-2 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.location}
                </p>
                
                {/* EXIF Metadata floating up */}
                <div className="pt-4 border-t border-white/20 translate-y-4 opacity-0 transition-all duration-500 delay-150 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-mono text-[10px] tracking-widest text-neutral-400">
                    {item.exif}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center px-6">
        <a href="/archive" className="group flex items-center gap-4 border border-white/20 px-8 py-4 text-xs font-mono tracking-widest text-neutral-300 transition-all hover:bg-neutral-900 hover:text-neutral-100 uppercase">
          EXPLORE FULL ARCHIVE
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
