"use client";

import { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Mail, Phone, Instagram, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export type FooterProps = SliceComponentProps<Content.FooterSlice>;

const Footer: FC<FooterProps> = ({ slice }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  
  // Testo senza spazi extra alla fine della stringa
  const marqueeText = "HANDMADE QUALITY ✦ UNIQUE DESIGN ✦ ITALIAN SOUL ✦";

  useEffect(() => {
    if (!marqueeInnerRef.current) return;

    const target = marqueeInnerRef.current;
    const width = target.offsetWidth;

    // Animazione fluida: muoviamo il nastro verso sinistra
    // Usiamo width / 2 perché abbiamo due blocchi identici per il loop
    gsap.to(target, {
      x: `-${width / 2}`,
      duration: 200, // Aumenta per rallentare, diminuisci per velocizzare
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section 
      id="footer"
      className="bg-[#F9F4F0] pt-24 pb-12 font-unbounded border-t border-[#EAA79C]/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Parte Superiore: Contact & Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10">
          <div className="flex flex-col space-y-8">
            <div className="text-[#EAA79C] text-4xl md:text-6xl font-black itali mb-15">
              <PrismicRichText field={slice.primary.title} />
            </div>
            
            <div className="flex flex-col space-y-6">
              <a href={`mailto:${slice.primary.email}`} className="group flex items-center gap-4 text-[#333] hover:text-[#EAA79C] transition-colors duration-300">
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                  <Mail size={20} />
                </div>
                <span className="text-lg md:text-xl font-medium">{slice.primary.email}</span>
              </a>

              <a href={`tel:${slice.primary.phone}`} className="group flex items-center gap-4 text-[#333] hover:text-[#EAA79C] transition-colors duration-300">
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                  <Phone size={20} />
                </div>
                <span className="text-lg md:text-xl font-medium">{slice.primary.phone}</span>
              </a>

              <PrismicNextLink field={slice.primary.instagram_link} className="group flex items-center gap-4 text-[#333] hover:text-[#EAA79C] transition-colors duration-300">
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                  <Instagram size={20} />
                </div>
                <span className="text-lg md:text-xl font-medium">Instagram</span>
              </PrismicNextLink>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end justify-center">
            <div className="w-48 md:w-64">
               <PrismicNextImage field={slice.primary.logo} className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* --- MARQUEE STRIP SENZA SPAZI --- */}
      <div 
        ref={marqueeRef}
        className="relative w-full bg-[#EAA79C] py-5 overflow-hidden flex"
      >
        <div 
          ref={marqueeInnerRef}
          className="flex whitespace-nowrap will-change-transform"
        >
          {/* Primo set di scritte */}
          {[...Array(15)].map((_, i) => (
            <span key={`a-${i}`} className="text-white text-sm md:text-base font-bold uppercase tracking-[0.2em] px-4 flex-none">
              {marqueeText}
            </span>
          ))}
          {/* Secondo set identico (necessario per il loop infinito senza scatti) */}
          {[...Array(15)].map((_, i) => (
            <span key={`b-${i}`} className="text-white text-sm md:text-base font-bold uppercase tracking-[0.2em] px-4 flex-none">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="pt-12 border-t border-[#EAA79C]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#333]/50 text-xs tracking-widest uppercase">
            {slice.primary.copyright_text}
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-[#EAA79C] uppercase tracking-tighter">
            <span className="cursor-pointer hover:underline">Privacy Policy</span>
            <span className="cursor-pointer hover:underline">Cookies</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;