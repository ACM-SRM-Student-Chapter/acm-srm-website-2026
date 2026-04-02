"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// The individual glowing nodes representing your domains (AI, Web, Cloud, etc.)
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
          <Sphere
            args={[0.08, 32, 32]}
            position={new THREE.Vector3(...node.position)}
          >
            {/* emissive materials literally glow in Three.js */}
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
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        {/* The digital particle network */}
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
        {/* Allows the scene to slowly rotate, but prevents the user from zooming and breaking the layout */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* This gradient overlay seamlessly fades the bottom of the 3D canvas into the next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background " />
    </div>
  );
}
