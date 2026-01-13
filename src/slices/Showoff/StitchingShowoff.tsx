"use client";

import { FC, useEffect, useRef } from "react";
import gsap from "gsap";

const StitchingShowoff: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".stitching-path-pink", {
        strokeDashoffset: -100,
        repeat: -1,
        duration: 12,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const PinkStitchingBlock = () => (
    <svg 
      className="w-full h-[1000px] shrink-0" 
      viewBox="0 0 1440 1000" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#EAA79C" strokeWidth="1.5" strokeDasharray="10, 10" opacity="0.35">
        
        {/* --- LINEE ORIZZONTALI (Coordinate da -1000 a 2500) --- */}
        <path className="stitching-path-pink" d="M-1000,100 C200,-100 1000,300 2500,50" />
        <path className="stitching-path-pink" d="M-1000,850 C500,700 1200,1000 2500,800" />
        <path className="stitching-path-pink" d="M2500,250 C1500,500 500,-100 -1000,350" />
        <path className="stitching-path-pink" d="M2500,650 C1200,800 300,400 -1000,700" />

        {/* --- LINEE VERTICALI / DIAGONALI ACCENTUATE --- */}
        {/* Sinistra */}
        <path className="stitching-path-pink" d="M100,-200 C300,300 -100,700 200,1200" />
        <path className="stitching-path-pink" d="M450,-200 C250,400 600,600 350,1200" />
        
        {/* Centro */}
        <path className="stitching-path-pink" d="M720,-200 C800,400 650,700 720,1200" />
        
        {/* Destra */}
        <path className="stitching-path-pink" d="M1000,-200 C800,300 1200,800 1050,1200" />
        <path className="stitching-path-pink" d="M1350,-200 C1100,500 1500,700 1300,1200" />

        {/* --- DIAGONALI LUNGHE INCROCIATE --- */}
        <path className="stitching-path-pink" d="M-200,-200 C500,500 1000,800 1600,1200" />

      </g>
    </svg>
  );

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col"
    >
      <PinkStitchingBlock />
      <PinkStitchingBlock />
      <PinkStitchingBlock />
    </div>
  );
};

export default StitchingShowoff;