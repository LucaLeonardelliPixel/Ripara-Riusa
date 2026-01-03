"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#EAA79C] md:bg-transparent"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* 1. Immagine di Sfondo (Desktop) */}
      <div className="hidden md:block absolute inset-0 w-full h-full -z-10">
        <PrismicNextImage 
          field={slice.primary.image} 
          fill
          className="w-full h-full object-cover" // object-cover garantisce che riempia la slice
          alt=""
          priority
        />
      </div>

      {/* 2. Contenuto della Slice */}
      <div className="w-full py-24 md:py-0">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LATO SINISTRO: Testi */}
            <div className="col-span-12 md:col-span-7 flex flex-col items-start text-left">
              <span className="font-unbounded font-medium text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-4">
                About Us
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-unbounded font-black leading-[1.1] text-white mb-6">
                {slice.primary.title}
              </h1>

              <p className="font-unbounded font-light text-base md:text-lg leading-relaxed text-white/80 mb-10 max-w-xl">
                {slice.primary.description}
              </p>

              {/* BOTTONE */}
              <button className="group relative px-10 py-4 rounded-full transition-all duration-500 overflow-hidden shadow-lg active:scale-95">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-500 group-hover:bg-white/20"></div>
                <span className="relative z-10 font-unbounded font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] text-white">
                  {slice.primary.button_label}             
                </span>
              </button>
            </div>

            {/* LATO DESTRO: Image Hero (Nascosta su Mobile) */}
            <div className="hidden md:flex col-span-5 justify-end">
              <div className="relative w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl border border-white/10">
                <PrismicNextImage 
                  field={slice.primary.image_hero} 
                  fill
                  className="object-cover"
                  alt=""
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;