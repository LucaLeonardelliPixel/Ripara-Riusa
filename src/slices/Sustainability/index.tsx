"use client";

import { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ShinyText from "@/components/ShinyText"; // Controlla il percorso del file!

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type SustainabilityProps = SliceComponentProps<Content.SustainabilitySlice>;

const Sustainability: FC<SustainabilityProps> = ({ slice }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([textRef.current, imageRef.current], {
        opacity: 0,
        y: 20,
        duration: 1.2,
        stagger: 0.3,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-[80vh] w-full bg-[#EAA79C] flex items-center py-20 px-8 md:px-20 font-unbounded overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Immagine */}
        <div ref={imageRef} className="relative aspect-square w-full max-w-md mx-auto lg:mx-0">
          <div className="w-full h-full overflow-hidden rounded-xl">
            <PrismicNextImage 
              field={slice.primary.sustainability_icon} 
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Testo con ShinyText */}
        <div ref={textRef} className="text-white">
          <div className="text-3xl md:text-6xl font-bold tracking-tight mb-6">
            <h1 className="uppercase flex flex-wrap items-baseline gap-x-3">
              <ShinyText 
                text="Riparare per Rigenerare" 
                disabled={false} 
                speed={3} 
                className="shiny-text" 
              />
            </h1>
          </div>
          
          <div className="text-white/80 text-base md:text-lg font-light leading-relaxed max-w-md">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Sustainability;