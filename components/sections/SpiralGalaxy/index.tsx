"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl"; 

const CustomGeometryParticles = (props: { count: number }) => {
  const { count } = props;
  const radius = 2;

  // This reference gives us direct access to our points
  const points = useRef<THREE.Points>(null);

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * radius;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uRadius: {
        value: radius,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (points.current) {
      const material = points.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};

const SpiralGalaxy = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas camera={{ position: [1.0, 1.0, 1.0], fov: 105 }}>
        <ambientLight intensity={0.1} />
        <CustomGeometryParticles count={10000} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default SpiralGalaxy;
