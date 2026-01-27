import { useRef, useEffect, useState } from 'react';
import { Canvas, extend, type ThreeElement } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import ThreeGlobe from 'three-globe';

extend({ ThreeGlobe });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      threeGlobe: ThreeElement<typeof ThreeGlobe>;
    }
  }
}

function GlobeContent() {
  const globeRef = useRef<ThreeGlobe>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!globeRef.current) return;

    const routes = [{
      startLat: 35.8617, startLng: 104.1954, // China
      endLat: 32.8872, endLng: 13.1913,     // Tripoli
    }];

    // Configure the globe
    globeRef.current
      .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
      .showAtmosphere(true)
      .atmosphereColor("#ea580c")
      .atmosphereAltitude(0.2)
      .arcsData(routes)
      .arcColor(() => '#fbbf24')
      .arcDashLength(0.5)
      .arcDashGap(2)
      .arcDashAnimateTime(2000)
      .arcStroke(1.5)
      .arcAltitude(0.3);

    setIsReady(true);

    // CLEANUP: This is crucial to prevent the "disappearing" bug
    return () => {
      if (globeRef.current) {
        // Clear data to free memory during remounts
        globeRef.current.arcsData([]);
      }
    };
  }, []);

  return (
    <>
      <ambientLight intensity={2.5} />
      <pointLight position={[150, 150, 150]} intensity={3} />
      
      {/* The globe element */}
      <threeGlobe ref={globeRef} />
      
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.5} 
        enableZoom={false} 
        minDistance={300}
        maxDistance={300}
      />
    </>
  );
}

export default function Globe() {
  return (
    <div className="h-[500px] w-full bg-[#04071d] rounded-3xl overflow-hidden flex items-center justify-center">
      {/* We use a key on the Canvas to force a fresh start if something breaks */}
      <Canvas key="biznas-globe-canvas">
        <PerspectiveCamera makeDefault position={[0, 0, 300]} fov={60} />
        <GlobeContent />
      </Canvas>
    </div>
  );
}