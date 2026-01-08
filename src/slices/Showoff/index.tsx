"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from "lucide-react";

export type ShowoggProps = SliceComponentProps<Content.ShowoggSlice>;

const Showogg: FC<ShowoggProps> = ({ slice }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayOptions = {
    delay: 3000,
    stopOnInteraction: false, 
    stopOnMouseEnter: true,   
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, 
    [Autoplay(autoplayOptions)] 
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      id="showoff-section"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-6 font-unbounded overflow-hidden bg-[#F9F4F0]"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* 1. Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#F9F4F0]/20" />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10">
        {/* Titolo Sezione */}
        <div className="max-w-6xl mx-auto mb-10 md:mb-16">
          <div className="text-4xl text-center md:text-7xl font-black text-[#EAA79C]">
            <PrismicRichText field={slice.primary.title} />
          </div> 
        </div>

        <div className="relative max-w-5xl mx-auto w-full">
          {/* Carosello */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {(slice.primary.items ?? []).map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4 md:px-10">
                  <div className="flex flex-col items-center">
                    
                    {/* Immagine Centrale Arrotondata */}
                    <div className="w-full aspect-[4/5] md:aspect-square max-w-md bg-white rounded-[3.5rem] overflow-hidden shadow-2xl mb-10 border border-[#EAA79C]/10">
                      <PrismicNextImage 
                        field={item.image} 
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Info Sotto Immagine */}
                    <div className="text-center max-w-2xl">
                      <div className="text-[#333] text-xl md:text-3xl mb-8 font-medium leading-snug">
                        {item.description}
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-wider">
                        <span className="bg-[#EAA79C] text-white px-8 py-3 rounded-full shadow-sm">
                          {item.price}€
                        </span>
                        <span className="border-2 border-[#EAA79C] text-[#EAA79C] px-8 py-3 rounded-full bg-white/50 backdrop-blur-sm">
                          {item.materials}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frecce di Navigazione */}
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg text-[#EAA79C] hover:bg-white transition-all hidden md:block z-30"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg text-[#EAA79C] hover:bg-white transition-all hidden md:block z-30"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Indicatori (Dots) */}
        <div className="flex justify-center gap-3 mt-14">
          {(slice.primary.items ?? []).map((_, i) => (
            <div 
              key={i} 
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                i === selectedIndex ? "bg-[#EAA79C]" : "bg-[#EAA79C]/30"
              }`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showogg;