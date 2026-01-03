"use client";

import { FC, Suspense } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Environment } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/MacchinaCucire.glb");
  // Scale impostato a 2 e posizione centrata
  return <primitive object={scene} scale={4} position={[0, 0, 0]} />;
}

export type BendoProps = SliceComponentProps<Content.BendoSlice>;

const Bendo: FC<BendoProps> = ({ slice }) => {
  return (
    <section
      className="relative w-full"
      style={{ height: "400vh" }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="absolute inset-0 bg-[#EAA79C]" />

      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
        <Suspense fallback={null}>
          <Canvas 
            dpr={[1, 2]} 
            camera={{ fov: 45, position: [0, 0, 5] }} 
            // Rimosso l'attributo shadows globale
            style={{ touchAction: 'none' }} 
          >
            <color attach="background" args={["#EAA79C"]} />
            
            {/* Luci ambientali senza ombre per un look pulito */}
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            <PresentationControls 
               speed={1.5} 
               global 
               zoom={1} 
               polar={[-0.1, Math.PI / 4]}
            >
              <Suspense fallback={null}>
                <Model />
                <Environment preset="city" />
                {/* Rimosso ContactShadows e ogni riferimento alle ombre */}
              </Suspense>
            </PresentationControls>
          </Canvas>
        </Suspense>
      </div>

      <div className="relative z-20 w-full pointer-events-none">
        <div className="h-screen flex items-center px-12 md:px-24">
          <h2 className="font-unbounded font-black text-5xl md:text-7xl text-white">
            L'Artigianato
          </h2>
        </div>
        
        <div className="h-screen flex items-center px-12 md:px-24 justify-end">
          <h2 className="font-unbounded font-black text-5xl md:text-7xl text-white text-right">
            Incontra il 3D
          </h2>
        </div>

        <div className="h-screen" />
      </div>
    </section>
  );
};

export default Bendo;

useGLTF.preload("/MacchinaCucire.glb");