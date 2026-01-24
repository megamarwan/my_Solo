import { useRef, useEffect } from 'react';
// 1. Change Object3DNode to ThreeElement
import { Canvas, extend, type ThreeElement } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import ThreeGlobe from 'three-globe';

extend({ ThreeGlobe });

// 2. Update the TypeScript declaration to use ThreeElement
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Pass the type of ThreeGlobe to the ThreeElement helper
      threeGlobe: ThreeElement<typeof ThreeGlobe>;
    }
  }
}

function GlobeScene() {
  const globeRef = useRef<ThreeGlobe>(null);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .showAtmosphere(true)
        .atmosphereColor("#ea580c");
    }
  }, []);

  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <threeGlobe ref={globeRef} />
      <OrbitControls autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export default function Globe() {
  return (
    <div className="h-[500px] w-full bg-[#04071d] rounded-3xl overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 300]} />
        <GlobeScene />
      </Canvas>
    </div>
  );
}