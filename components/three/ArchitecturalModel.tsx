'use client';

import { ContactShadows, Float, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, .42, 0]} castShadow>
        <cylinderGeometry args={[.035, .055, .85, 10]} />
        <meshStandardMaterial color="#72533c" roughness={.88} />
      </mesh>
      <mesh position={[0, 1, 0]} castShadow>
        <icosahedronGeometry args={[.42, 2]} />
        <meshStandardMaterial color="#284037" roughness={.92} />
      </mesh>
    </group>
  );
}

function Pergola() {
  return (
    <group position={[.1, 2.25, -.1]}>
      {Array.from({ length: 12 }).map((_, index) => (
        <mesh key={index} position={[-1.35 + index * .245, 0, 0]} castShadow>
          <boxGeometry args={[.035, .1, 2.65]} />
          <meshStandardMaterial color="#9b724d" metalness={.22} roughness={.5} />
        </mesh>
      ))}
    </group>
  );
}

function House() {
  return (
    <group>
      <RoundedBox args={[4.7, .22, 3.7]} radius={.08} position={[0, .12, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#817b72" roughness={.9} />
      </RoundedBox>

      <RoundedBox args={[2.5, 1.65, 2.25]} radius={.04} position={[-.85, 1.02, .12]} castShadow>
        <meshStandardMaterial color="#d8d0c3" roughness={.82} />
      </RoundedBox>
      <mesh position={[-.28, 1.05, 1.255]}>
        <planeGeometry args={[1.05, 1.22]} />
        <meshPhysicalMaterial color="#17252a" roughness={.12} metalness={.08} transparent opacity={.88} />
      </mesh>

      <group position={[1.1, 1.06, -.05]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 1.75, .12]} />
          <meshStandardMaterial color="#cdc3b5" roughness={.82} />
        </mesh>
        <mesh position={[0, 0, 1.23]} castShadow>
          <boxGeometry args={[2.2, .12, 2.35]} />
          <meshStandardMaterial color="#d2c7b8" roughness={.84} />
        </mesh>
        <mesh position={[0, 0, .57]}>
          <boxGeometry args={[2.05, 1.55, .045]} />
          <meshPhysicalMaterial color="#8eb1b2" transparent opacity={.3} transmission={.42} roughness={.12} metalness={.08} side={THREE.DoubleSide} />
        </mesh>
        {[-.72, 0, .72].map((x) => (
          <mesh key={x} position={[x, 0, .6]}>
            <boxGeometry args={[.025, 1.55, .05]} />
            <meshStandardMaterial color="#342c26" />
          </mesh>
        ))}
      </group>

      <Pergola />

      <mesh position={[1.05, .25, -2.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.55, 1.25]} />
        <meshPhysicalMaterial color="#376e75" transparent opacity={.82} roughness={.16} metalness={.1} />
      </mesh>
      <mesh position={[1.05, .27, -2.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[.13, .16, 32]} />
        <meshBasicMaterial color="#d9f0ed" transparent opacity={.6} />
      </mesh>

      <mesh position={[-1.85, .29, -1.8]} castShadow>
        <boxGeometry args={[.7, .34, .7]} />
        <meshStandardMaterial color="#615c51" roughness={.95} />
      </mesh>
      <Tree position={[-1.85, .48, -1.8]} scale={.85} />
      <Tree position={[2.05, .25, 1.35]} scale={.7} />
      <Tree position={[-2.05, .24, .95]} scale={.55} />

      <mesh position={[-.25, 2.37, -.2]} castShadow>
        <boxGeometry args={[4.3, .13, 3.05]} />
        <meshStandardMaterial color="#b9ad9b" roughness={.78} />
      </mesh>
    </group>
  );
}

export default function ArchitecturalModel() {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const scroll = typeof window === 'undefined' ? 0 : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.5);
    const targetY = -.08 + state.pointer.x * .09 + scroll * .07;
    const targetX = -.1 + state.pointer.y * .05 + scroll * .05;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, .035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, .035);
    group.current.position.y = Math.sin(t * .38) * .025 - scroll * .08;
    if (light.current) light.current.position.x = 5 + Math.sin(t * .16) * 1.2;
  });

  return (
    <>
      <ambientLight intensity={.7} />
      <hemisphereLight args={['#f3ede2', '#2b2b28', 1.05]} />
      <directionalLight ref={light} position={[5, 8, 5]} intensity={2.1} color="#fff2dd" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2.5, -3]} color="#c89662" intensity={2.4} distance={12} />
      <Float speed={.55} rotationIntensity={.015} floatIntensity={.045}>
        <group ref={group} rotation={[-.1, -.08, 0]} scale={.78}>
          <House />
        </group>
      </Float>
      <ContactShadows position={[0, -.03, 0]} opacity={.26} scale={8} blur={2.8} far={5} color="#171512" />
    </>
  );
}
