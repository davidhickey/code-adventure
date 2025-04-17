"use client";
import * as THREE from "three";
import { useMemo } from "react";
import { generate } from "random-words";
import { Word } from "./Word";

interface CloudProps {
  lyrics: { word: string; index: number }[];
  count: number;
  radius: number;
  currentWordInSong: number | null;
  emitCurrentWord: (id: number, word: string) => void;
}

export function Cloud({
  lyrics,
  count = 4,
  radius = 20,
  currentWordInSong,
  emitCurrentWord,
}: CloudProps) {
  const words = useMemo(() => {
    const temp: [THREE.Vector3, string][] = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / Math.ceil(count);
    const thetaSpan = (Math.PI * 2) / Math.ceil(count);
    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) {
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          generate() as string,
        ]);
      }
    }

    const wordsWithPositions: [THREE.Vector3, { word: string; id: number }][] =
      temp.map(([pos], index) => {
        return [
          pos,
          { word: lyrics[index]?.word ?? "", id: lyrics[index]?.index ?? 0 },
        ];
      });
    const words = wordsWithPositions.filter(([, lyric]) => lyric.word !== "");

    return words;
  }, [count, radius, lyrics]);

  return words.map(([pos, lyric], index) => (
    <Word
      key={index}
      word={lyric.word as string}
      id={lyric.id}
      currentWordInSong={currentWordInSong}
      emitCurrentWord={emitCurrentWord}
      position={pos}
    />
  ));
}
