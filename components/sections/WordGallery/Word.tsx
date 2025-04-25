"use client";
import * as THREE from "three";
import { useContext, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import ThemeContext from "@/store";

interface WordProps {
  word: string;
  id: number;
  currentWordInSong: number | null;
  emitCurrentWordAction: (id: number, word: string) => void;
  position: THREE.Vector3 | string | string[];
}

export function Word({
  word,
  id,
  currentWordInSong,
  emitCurrentWordAction,
  position,
  ...props
}: WordProps) {
  const { isDarkTheme } = useContext(ThemeContext);
  const color = new THREE.Color();
  const fontProps = {
    font: "/Inter_Bold.ttf",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const over = (e: Event) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame(() => {
    if (ref.current) {
      const material = Array.isArray(ref.current.material)
        ? (ref.current.material[0] as THREE.MeshBasicMaterial)
        : (ref.current.material as THREE.MeshBasicMaterial);
      material.color.lerp(
        color.set(hovered ? "#fa2720" : isDarkTheme ? "#e5e5e5" : "#606c38"),
        0.1
      );
      material.color.lerp(
        color.set(
          currentWordInSong !== null && id <= currentWordInSong
            ? "#20CC00"
            : "#e5e5e5"
        ),
        0.1
      );
    }
  });

  return (
    <Billboard
      position={position}
      {...props}
      onPointerOver={over}
      onPointerOut={out}
      onPointerDown={() => emitCurrentWordAction(id, word)}
      // onClick={() => emitCurrentWord(id, word)}
    >
      <Text ref={ref} {...fontProps}>
        {word}
      </Text>
    </Billboard>
  );
}
