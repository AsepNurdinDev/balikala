"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Preload to speed up loading
useGLTF.preload("/ogoh-ogoh.glb");

function OgohModel({ autoRotate }: { autoRotate: boolean }) {
  // Load the glb from the public folder
  const { scene } = useGLTF("/ogoh-ogoh.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Set up shadow properties and normalize the model's transform.
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 5.5 / maxDim : 1;

    scene.scale.setScalar(scale);
    scene.position.sub(center);
    scene.position.y += 0.12;
    scene.rotation.set(0, Math.PI * 0.08, 0);
  }, [scene]);

  // Slowly rotate if autoRotate is toggled
  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[0, 0, 0]}
      dispose={null}
    />
  );
}

interface OgohCanvasProps {
  autoRotate: boolean;
  cameraResetKey: number;
}

export default function OgohCanvas({ autoRotate, cameraResetKey }: OgohCanvasProps) {
  const controlsRef = useRef<any>(null);

  // Reset controls back to default view when key changes
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [cameraResetKey]);

  return (
    <div className="w-full h-full relative bg-[#1F1F1F]">
      <Canvas
        shadows
        camera={{ position: [0, 0.6, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={["#181818"]} />
        
        {/* Lights */}
        {/* Soft fill light */}
        <ambientLight intensity={0.65} />

        {/* Dramatic high contrast warm spotlight */}
        <spotLight
          position={[6, 8, 6]}
          angle={0.38}
          penumbra={0.75}
          intensity={4.4}
          castShadow
          shadow-mapSize={1024}
          color="#ffedcc"
        />

        {/* Cool color back rim light to draw silhouette edges */}
        <spotLight
          position={[-6, 6, -6]}
          angle={0.5}
          penumbra={0.85}
          intensity={2.4}
          color="#cce4ff"
        />

        {/* Point light to brighten front details */}
        <pointLight position={[0, 2, 4]} intensity={1.8} color="#ffffff" />

        {/* Fill key light to brighten the lower body */}
        <pointLight position={[0, -1, 2]} intensity={0.7} color="#ffd7b0" />

        {/* Suspended model loading */}
        <Suspense fallback={null}>
          <OgohModel autoRotate={autoRotate} />
        </Suspense>

        {/* Scene lighting */}
        <hemisphereLight color="#ffffff" groundColor="#222222" intensity={0.45} />
        <ambientLight intensity={0.5} />

        {/* Controls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={1.8}
          maxDistance={15}
          maxPolarAngle={Math.PI / 1.7} // Prevent looking completely from below the floor
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
