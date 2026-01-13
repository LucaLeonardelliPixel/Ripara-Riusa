"use client";

import { FC, useState, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";

export type NavbarProps = SliceComponentProps<Content.NavbarSlice>;

const Navbar: FC<NavbarProps> = ({ slice }) => {
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  
  const navContainerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const leftSpacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => setIsOverLightSection(entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px -90% 0px" }
    );   
    const section = document.getElementById("showoff-section");
    if (section) observer.observe(section);

    // GSAP Animation
    const isDesktop = window.innerWidth >= 768;

    if (isDesktop && navContainerRef.current && contactRef.current && leftSpacerRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Setup Iniziale: Navbar stretta sul logo
      // Usiamo width invece di maxWidth per un controllo più preciso durante l'elasticità
      gsap.set(navContainerRef.current, { width: "165px", minWidth: "80px" });
      gsap.set([contactRef.current, leftSpacerRef.current], { opacity: 0, display: "none" });

      // 2. Animazione
      tl.to(navContainerRef.current, {
        width: "100%",
        maxWidth: "1280px", // max-w-7xl
        duration: 1.8,
        ease: "elastic.out(1, 0.75)",
        onStart: () => {
          // Rendiamo visibili i componenti laterali appena inizia l'espansione
          gsap.set([contactRef.current, leftSpacerRef.current], { display: "flex" });
        }
      })
      .to([contactRef.current, leftSpacerRef.current], {
        opacity: 1,
        duration: 0.4,
      }, "-=1.2"); // Appaiono mentre la barra finisce di vibrare
    }

    return () => { if (section) observer.unobserve(section); };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-12 md:py-6 flex justify-center">
      <div 
        ref={navContainerRef}
        className={`transition-colors duration-500 rounded-full backdrop-blur-md border flex items-center justify-between
        ${isOverLightSection ? "bg-[#EAA79C]/40 border-[#EAA79C]/20" : "bg-[#fce7f3]/20 border-white/10"}
        px-6 py-2 md:px-8 md:py-3 overflow-hidden whitespace-nowrap`}
      >
        
        {/* Placeholder Sinistro: ora con Ref per controllarne l'opacità */}
        <div ref={leftSpacerRef} className="hidden md:flex md:flex-1"></div>

        {/* LOGO: Punto focale centrale */}
        <div className="flex justify-center shrink-0 mx-auto md:mx-0">
          <div 
            onClick={scrollToTop}
            className="h-6 md:h-10 w-auto cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            <PrismicNextImage 
              field={slice.primary.logo} 
              className="h-full w-auto object-contain" 
            />
          </div>
        </div>

        {/* CONTATTACI: Placeholder Destro */}
        <div 
          ref={contactRef}
          className="hidden md:flex md:flex-1 justify-end items-center"
        >
          <a 
            href="#footer" 
            className="group flex items-center gap-3 cursor-pointer outline-none"
          >
            <span className="font-unbounded font-medium text-[10px] lg:text-sm tracking-[0.2em] text-white">
              {slice.primary.button_label}
            </span>
            <div className="text-white group-hover:scale-110 transition-all duration-300">
              <MessageCircle size={20} strokeWidth={1.5} />
            </div>
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;