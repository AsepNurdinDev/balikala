"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Preload the model in public folder
useGLTF.preload("/penjor.glb");

function PenjorModel({ autoRotate }: { autoRotate: boolean }) {
  const { scene } = useGLTF("/penjor.glb");
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.6;
          mat.metalness = 0.1;
        }
      }
    });

    // Normalize model to fit the viewport
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 4.5 / maxDim : 1;
    scene.scale.setScalar(scale);
    scene.position.sub(center);
    scene.position.y += 0.2;
    scene.rotation.set(0, Math.PI * 0.1, 0);
  }, [scene]);

  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.12;
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

interface PenjorCanvasProps {
  autoRotate: boolean;
  cameraResetKey: number;
  zoomLevel: number;
}

export default function PenjorCanvas({
  autoRotate,
  cameraResetKey,
  zoomLevel,
}: PenjorCanvasProps) {
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [cameraResetKey]);

  useEffect(() => {
    if (cameraRef.current && controlsRef.current) {
      const distance = 4.8 / zoomLevel;
      const currentPos = new THREE.Vector3().copy(cameraRef.current.position);
      currentPos.normalize().multiplyScalar(distance);
      cameraRef.current.position.copy(currentPos);
      controlsRef.current.update();
    }
  }, [zoomLevel]);

  return (
    <div className="w-full h-full relative bg-[#F3EFE9]/40">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.4, 4.8], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onCreated={({ camera }) => {
          if (camera instanceof THREE.PerspectiveCamera) {
            cameraRef.current = camera;
          }
        }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color="#FFF9E6"
        />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#E6F2FF" />
        <pointLight position={[5, -2, 5]} intensity={0.5} color="#FFF2D6" />

        <Suspense fallback={null}>
          <PenjorModel autoRotate={autoRotate} />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={1.5}
          maxDistance={10}
          maxPolarAngle={Math.PI / 1.7}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
