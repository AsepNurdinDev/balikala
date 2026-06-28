"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Loader2 } from "lucide-react";

// Preload the main Saraswati model
useGLTF.preload("/saraswati.glb");

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Enhance material aesthetics slightly
        const mesh = child as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = Math.max(mat.roughness, 0.3);
          mat.metalness = Math.min(mat.metalness, 0.6);
        }
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Scale model nicely within view
    const scale = maxDim > 0 ? 2.5 / maxDim : 1;
    scene.scale.setScalar(scale);
    scene.position.sub(center);
    scene.position.y += 0.1; // adjust height slightly
  }, [scene, url]);

  return <primitive ref={modelRef} object={scene} dispose={null} />;
}

// Inner camera controller component — drives smooth camera transitions on symbol select.
// Uses a fast lerp (0.07) so the pan feels responsive but not jarring.
function CameraController({
  target,
  position,
  controlsRef,
}: {
  target: [number, number, number];
  position: [number, number, number];
  controlsRef: React.MutableRefObject<any>;
}) {
  const targetVec = useRef(new THREE.Vector3(...target));
  const posVec = useRef(new THREE.Vector3(...position));
  // Track whether we are actively animating so we can suppress OrbitControls
  const animating = useRef(false);

  useEffect(() => {
    targetVec.current.set(...target);
    posVec.current.set(...position);
    animating.current = true; // new destination → start animating
  }, [target, position]);

  useFrame((state) => {
    if (!animating.current) return;

    const lerpSpeed = 0.07;
    state.camera.position.lerp(posVec.current, lerpSpeed);

    if (controlsRef.current) {
      // Synchronise OrbitControls target so orbit pivot matches view centre
      controlsRef.current.target.lerp(targetVec.current, lerpSpeed);
      controlsRef.current.update();
    }

    // Stop animating when we are close enough (avoids continuous rerenders)
    const distCam = state.camera.position.distanceTo(posVec.current);
    const distTarget = controlsRef.current
      ? controlsRef.current.target.distanceTo(targetVec.current)
      : 0;
    if (distCam < 0.005 && distTarget < 0.005) {
      animating.current = false;
    }
  });

  return null;
}

interface GoddessViewerProps {
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
}

export default function GoddessViewer({ cameraTarget, cameraPosition }: GoddessViewerProps) {
  const controlsRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loader state to handle initial Canvas mount gracefully
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[500px] relative bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-xs">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 4.0], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Lights configuration for premium museum feel */}
        <ambientLight intensity={0.9} />
        
        {/* Main warm Key Light */}
        <spotLight
          position={[5, 8, 5]}
          angle={0.35}
          penumbra={0.8}
          intensity={3.5}
          castShadow
          shadow-mapSize={1024}
          color="#fff6e6"
        />

        {/* Soft cool fill Light */}
        <spotLight
          position={[-5, 5, -5]}
          angle={0.4}
          penumbra={0.9}
          intensity={1.8}
          color="#e6f2ff"
        />

        {/* Highlight points from front and back */}
        <pointLight position={[0, 1.5, 3]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, -1, 1.5]} intensity={0.6} color="#ffe5cc" />
        <hemisphereLight color="#ffffff" groundColor="#dddddd" intensity={0.5} />

        <Suspense fallback={null}>
          <Model url="/saraswati.glb" />
        </Suspense>

        {/* Camera transition animation */}
        <CameraController
          target={cameraTarget}
          position={cameraPosition}
          controlsRef={controlsRef}
        />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.06}
          minDistance={1.0}   // allow zooming close enough to see symbol details
          maxDistance={6.5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.5}
          // Do NOT set a fixed target here — CameraController drives it via lerp
        />
      </Canvas>

      {/* Floating Instructions */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-100 shadow-xs">
          🖱️ Seret untuk memutar • Cubit untuk zoom
        </span>
      </div>

      {/* R3F Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Memuat Model Museum...
          </span>
        </div>
      )}
    </div>
  );
}
