"use client";

import { FC, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { MessageCircle } from "lucide-react";

export type NavbarProps = SliceComponentProps<Content.NavbarSlice>;

const Navbar: FC<NavbarProps> = ({ slice }) => {
  const [isOverLightSection, setIsOverLightSection] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsOverLightSection(entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px -90% 0px" }
    );
    const section = document.getElementById("showoff-section");
    if (section) observer.observe(section);
    return () => { if (section) observer.unobserve(section); };
  }, []);

  // Funzione per tornare su in modo smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-12 md:py-6 flex justify-center">
      <div 
        className={`transition-all duration-500 rounded-full backdrop-blur-md border flex items-center 
        ${isOverLightSection ? "bg-[#EAA79C]/40 border-[#EAA79C]/20" : "bg-[#fce7f3]/20 border-white/10"}
        w-auto px-6 py-2 
        md:w-full md:max-w-7xl md:justify-between md:px-8 md:py-3`}
      >
        
        {/* Placeholder per centratura Desktop */}
        <div className="hidden md:block md:flex-1"></div>

        {/* LOGO: Cliccabile per tornare su */}
        <div className="flex justify-center">
          <div 
            onClick={scrollToTop}
            className="h-6 md:h-10 w-auto max-w-[120px] md:max-w-none cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            <PrismicNextImage 
              field={slice.primary.logo} 
              className="h-full w-auto object-contain" 
            />
          </div>
        </div>

        {/* CONTATTACI: Link al footer */}
        <div className="hidden md:flex md:flex-1 justify-end items-center">
          <a 
            href="#footer" 
            className="group flex items-center gap-3 cursor-pointer outline-none"
          >
            <span className="font-unbounded font-medium text-sm tracking-[0.2em] text-white">
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