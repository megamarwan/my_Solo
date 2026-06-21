import { useRef, useEffect } from 'react';
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

  useEffect(() => {
    if (!globeRef.current) return;

    const routes = [
      {
        id: "China-Libya",
        startLat: 35.8617, startLng: 104.1954,
        endLat: 32.8872, endLng: 13.1913,
        time: 3000
      },
      {
        id: "Argentina-Libya",
        startLat: -34.6037, startLng: -58.3816,
        endLat: 32.8872, endLng: 13.1913,
        time: 5000
      },
      {
        id: "UK-Libya",
        startLat: 51.5074, startLng: -0.1278,
        endLat: 32.8872, endLng: 13.1913,
        time: 2000
      }
    ];

    globeRef.current
      .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
      .showAtmosphere(true)
      .atmosphereColor("#ea580c")
      .atmosphereAltitude(0.2)
      .arcColor(() => '#fbbf24')
      .arcDashLength(0.4)
      .arcDashGap(2)
      .arcStroke(1.2)
      .arcDashAnimateTime((d: any) => d.time)
      .arcAltitude((d: any) => d.id === "Argentina-Libya" ? 0.5 : 0.3);

    const timer = setTimeout(() => {
        if(globeRef.current) {
            globeRef.current.arcsData(routes);
        }
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (globeRef.current) {
        globeRef.current.arcsData([]);
        globeRef.current.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m: any) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <>
      <ambientLight intensity={2.5} />
      <pointLight position={[150, 150, 150]} intensity={3} />
      
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
    <div className="h-[500px] w-full bg-[#010411] rounded-3xl overflow-hidden flex items-center justify-center">
      <Canvas key="biznas-globe-canvas" dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 0, 300]} fov={60} />
        <GlobeContent />
      </Canvas>
    </div>
  );
}