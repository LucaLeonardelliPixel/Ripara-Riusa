"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type BendoProps = SliceComponentProps<Content.BendoSlice>;

const Bendo: FC<BendoProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Path corretto basato sulla tua configurazione Prismic
  const items = (slice.primary.items || []) as any[];

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const ctx = gsap.context(() => {
      const itemsElements = gsap.utils.toArray<HTMLElement>(".process-item");
      
      itemsElements.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#EAA79C] py-24 md:py-40 font-unbounded"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Sezione */}
        <div className="mb-24 max-w-3xl">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight">
            {slice.primary.title}
          </h2>
          <div className="text-lg text-white/80 font-light leading-relaxed">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* LATO SINISTRO: Testo */}
          <div className="flex-1 space-y-32 md:space-y-64 pb-[50vh]">
            {items.map((item, index) => (
              <div 
                key={index} 
                className={`process-item transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100" : "opacity-20"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-2xl md:text-3xl font-black text-white">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-black text-white mb-6">
                      {item.step_title}
                    </h3>
                    <div className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                      <PrismicRichText field={item.step_description} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LATO DESTRO: Immagine Sticky Quadrata */}
          <div className="hidden md:block flex-1">
            <div className="sticky top-1/4 w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-white/10 border border-white/20">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <PrismicNextImage 
                    field={item.process_image} 
                    fill 
                    className="object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Bendo;