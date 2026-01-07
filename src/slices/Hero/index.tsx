"use client";

import { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Usiamo una Timeline con le configurazioni corrette per TS
      const tl = gsap.timeline({ 
        defaults: { ease: "power3.out", duration: 1 } 
      });

      tl.from(".hero-text-item", {
        x: -100,
        opacity: 0,
        stagger: 0.2,
      })
      .from(".hero-image", {
        x: 100,
        opacity: 0,
        duration: 1.2,
      }, "-=0.8")
      .from(".hero-button", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        // CORREZIONE TS: Avvolgiamo in un blocco per restituire void
        onComplete: () => {
          gsap.set(".hero-button", { clearProps: "all" });
        },
      }, "-=0.6");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#EAA79C] md:bg-transparent"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* 1. Background Image */}
      <div className="hidden md:block absolute inset-0 w-full h-full -z-10">
        <PrismicNextImage 
          field={slice.primary.image} 
          fill
          className="w-full h-full object-cover"
          alt=""
          priority
        />
      </div>

      <div className="w-full py-24 md:py-0">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="col-span-12 md:col-span-7 flex flex-col items-start text-left">
              <span className="hero-text-item font-unbounded font-medium text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-4 inline-block">
                About Us
              </span>
              
              <h1 className="hero-text-item text-4xl md:text-6xl lg:text-7xl font-unbounded font-black leading-[1.1] text-white mb-6">
                {slice.primary.title}
              </h1>

              <p className="hero-text-item font-unbounded font-light text-base md:text-lg leading-relaxed text-white/80 mb-10 max-w-xl">
                {slice.primary.description}
              </p>

              <a 
                href="#footer" 
                className="hero-button group relative px-10 py-4 rounded-full transition-all duration-500 overflow-hidden shadow-lg active:scale-95 inline-block z-20"
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-500 group-hover:bg-white/20"></div>
                <span className="relative z-10 font-unbounded font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] text-white">
                  {slice.primary.button_label}             
                </span>
              </a>
            </div>

            <div className="hidden md:flex col-span-5 justify-end">
              <div className="hero-image relative w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl border border-white/10">
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