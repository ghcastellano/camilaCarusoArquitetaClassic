'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CanvasBoundary from './CanvasBoundary';
import ArchitecturalModel from './ArchitecturalModel';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch { return false; }
}

export default function HeroCanvas() {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setReady(supportsWebGL());
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="absolute inset-0">
      {ready && (
        <CanvasBoundary>
          <Canvas
            frameloop={visible ? 'always' : 'never'}
            dpr={[1, 1.6]}
            shadows
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = .68;
            }}
            camera={{ position: [6.8, 5.2, 7.8], fov: 31, near: .1, far: 100 }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}><ArchitecturalModel /></Suspense>
          </Canvas>
        </CanvasBoundary>
      )}
    </div>
  );
}
