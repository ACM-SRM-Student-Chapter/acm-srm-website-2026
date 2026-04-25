"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// The individual glowing nodes representing your domains
function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);

  // Slowly rotate the entire network grid on the Y axis
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  // Plotting our nodes in 3D space with ACM accent colors
  const nodes = [
    { position: [2.5, 1.5, -2], color: "#00E5FF" }, // Electric Blue
    { position: [-2.5, 2, -1], color: "#7B61FF" }, // Violet
    { position: [1.5, -2, 1.5], color: "#005bb5" }, // Deep Blue
    { position: [-1.5, -1.5, 2], color: "#FF4081" }, // Pink
    { position: [0, 1.5, 2.5], color: "#00E676" }, // Green
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
          {/* OPTIMIZATION: Reduced segments from 32x32 to 16x16 (saves ~7500 triangles total) */}
          <Sphere
            args={[0.08, 16, 16]}
            position={new THREE.Vector3(...node.position)}
          >
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={2}
              toneMapped={false}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

export default function NetworkScene() {
  // OPTIMIZATION: IntersectionObserver to pause the 60fps WebGL loop when off-screen
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-background"
    >
      <Canvas
        // OPTIMIZATION: demand stops the render loop when invisible
        frameloop={isVisible ? "always" : "demand"}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <Stars
            radius={100}
            depth={50}
            count={2500}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <NetworkNodes />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
    </div>
  );
}
