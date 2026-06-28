"use client";

import { Suspense, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SymbolData } from "../../type";
import { Lightbulb, Stars } from "lucide-react";

function SymbolModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

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
    const scale = maxDim > 0 ? 1.8 / maxDim : 1;
    scene.scale.setScalar(scale);
    scene.position.sub(center.multiplyScalar(scale));
  }, [scene, url]);

  return <primitive ref={ref} object={scene} dispose={null} />;
}

interface SymbolInformationProps {
  symbol: SymbolData;
}

export default function SymbolInformation({ symbol }: SymbolInformationProps) {
  // Preload symbol models
  useEffect(() => {
    if (symbol.modelPath !== "/saraswati.glb") {
      useGLTF.preload(symbol.modelPath);
    }
  }, [symbol.modelPath]);

  const showMiniModel = symbol.id !== "empat-lengan";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={symbol.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6 h-full"
      >
        {/* Symbol Header */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-blue-50 border border-blue-100/50 rounded-2xl flex items-center justify-center text-3xl select-none shrink-0">
            {symbol.emoji}
          </div>
          <div>
            <h3 className="font-serif text-2xl font-extrabold text-slate-800">
              {symbol.name}
            </h3>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mt-0.5 block">
              Simbol Dewi Saraswati
            </span>
          </div>
        </div>

        {/* Mini 3D Model Viewer */}
        {showMiniModel && (
          <div className="w-full h-52 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
            <Canvas
              camera={{ position: [0, 0.3, 2.8], fov: 40 }}
              gl={{ antialias: true, alpha: true }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <ambientLight intensity={1.0} />
              <spotLight position={[4, 6, 4]} angle={0.4} penumbra={0.8} intensity={3.0} color="#fff6e0" castShadow />
              <spotLight position={[-4, 4, -4]} angle={0.5} penumbra={0.9} intensity={1.5} color="#e8f4ff" />
              <pointLight position={[0, 1, 2.5]} intensity={1.2} color="#ffffff" />
              <Suspense fallback={null}>
                <SymbolModel url={symbol.modelPath} />
              </Suspense>
              <OrbitControls
                enableDamping
                dampingFactor={0.06}
                autoRotate
                autoRotateSpeed={1.0}
                minDistance={1}
                maxDistance={5}
                maxPolarAngle={Math.PI / 1.8}
              />
            </Canvas>
          </div>
        )}

        {/* Meaning */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500">
            <Stars className="w-3.5 h-3.5" />
            Makna Simbol
          </div>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            {symbol.meaning}
          </p>
        </div>

        {/* Value */}
        <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <Lightbulb className="w-3.5 h-3.5" />
            Nilai yang Dapat Diterapkan
          </div>
          <p className="text-slate-700 text-sm leading-relaxed font-semibold">
            {symbol.value}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
