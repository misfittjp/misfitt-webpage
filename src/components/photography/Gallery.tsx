"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { photoArchiveData } from "@/data";
import { PhotoArchiveItem } from "@/types";

const CATEGORIES = ["ALL", "STREET", "PORTRAIT", "ARCHITECTURE", "CULTURE"];

const skeletonSvg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PC9zdmc+";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeImage, setActiveImage] = useState<PhotoArchiveItem | null>(null);

  const filteredPhotos = activeCategory === "ALL" 
    ? photoArchiveData 
    : photoArchiveData.filter(photo => photo.tag === activeCategory);

  return (
    <section className="bg-black py-16 md:py-28 min-h-screen">
      <div className="px-6 md:px-12 mx-auto max-w-7xl">
        {/* Header & Filter */}
        <div className="mb-12 flex flex-col items-center justify-center space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-100 uppercase mb-4">
              Visual Assets
            </h1>
            <p className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
              Tokyo Archive
            </p>
          </div>

          <p className="max-w-2xl text-center text-sm text-neutral-400">
            A curated collection of cinematic street photography and architectural studies. Tokyo, untamed and deeply saturated.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-white/10 pb-4 w-full max-w-3xl">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-2 py-1 font-mono text-[10px] md:text-xs tracking-widest transition-colors ${
                  activeCategory === category ? "text-neutral-100" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute -bottom-[17px] left-0 right-0 h-[1px] bg-neutral-100"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveImage(photo)}
                className={`group cursor-pointer relative overflow-hidden bg-neutral-900 ${
                  photo.ratio === "portrait" ? "aspect-[3/4]" : "aspect-[4/3] md:aspect-[3/4]"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  placeholder="blur"
                  blurDataURL={skeletonSvg}
                  className="object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] tracking-widest text-white px-2 py-1 border border-white/20 backdrop-blur-sm">
                      {photo.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setActiveImage(null)}
          >
            <div className="relative w-full h-full max-w-7xl flex flex-col lg:flex-row gap-8 items-center justify-center">
              
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveImage(null); }}
                className="absolute top-0 right-0 z-10 p-4 text-neutral-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <motion.div 
                layoutId={`image-${activeImage.id}`}
                className="relative w-full lg:w-2/3 h-[60vh] lg:h-full max-h-[800px]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.title}
                  fill
                  className="object-contain"
                />
              </motion.div>

              <div 
                className="w-full lg:w-1/3 flex flex-col justify-end lg:justify-center border-l-0 lg:border-l border-white/10 lg:pl-12 pt-8 lg:pt-0"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-4 block">
                  {activeImage.tag}
                </span>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-neutral-100 uppercase mb-2">
                  {activeImage.title}
                </h2>
                <p className="font-mono text-xs tracking-widest text-neutral-400 mb-12">
                  {activeImage.location}
                </p>

                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase mb-1">Equipment</h4>
                    <p className="font-mono text-xs text-neutral-300">{activeImage.camera} {"//"} {activeImage.focalLength}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase mb-1">Metadata</h4>
                    <p className="font-mono text-xs text-neutral-300">{activeImage.exif}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
