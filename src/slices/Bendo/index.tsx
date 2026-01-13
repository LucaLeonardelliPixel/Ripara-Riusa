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
  const items = (slice.primary.items || []) as any[];

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const ctx = gsap.context(() => {
      const itemsElements = gsap.utils.toArray<HTMLElement>(".process-item");
      itemsElements.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "20% center", 
          end: "80% center",
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
      className="relative py-24 md:py-40 font-unbounded"
      style={{ backgroundColor: "#EAA79C" }}
    >

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <span className="hero-text-item font-unbounded font-medium text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-4 inline-block">
          Our method
        </span>
        
        <div className="max-w-5xl text-white">
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
            {slice.primary.title}
          </h2>
        </div>
        <div className="mb-24 max-w-3xl text-white">
          <div className="text-lg font-light leading-relaxed opacity-80">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="flex-1 space-y-32 md:space-y-64 pb-[12vh] pt-[7vh]">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="process-item relative"
              >
                {/* NUMERO GIGANTE - Posizionato in modo da non interferire con lo scroll */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <span 
                    className={`absolute -left-12 md:-left-28 top-1/2 -translate-y-1/2 text-8xl md:text-[15rem] font-black transition-all duration-1000 ease-in-out text-white
                    ${activeIndex === index ? "opacity-60 scale-100" : "opacity-0 scale-90"}`}
                  >
                    {index + 1}
                  </span>
                </div>

                <div className={`relative z-10 transition-all duration-700 ease-in-out text-white p-8 md:p-12 rounded-[2.5rem] border border-white/10 ${
                  activeIndex === index 
                    ? "opacity-100 translate-x-4 bg-white/10 backdrop-blur-xl shadow-2xl" 
                    : "opacity-20 translate-x-0"
                }`}>
                  <div className="flex items-start gap-6">
                    {/* Rimosso il numero piccolo interno */}
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black mb-6">
                        {item.step_title}
                      </h3>
                      <div className="text-base md:text-lg leading-relaxed font-light opacity-80">
                        <PrismicRichText field={item.step_description} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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