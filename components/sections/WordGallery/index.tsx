"use client";
import * as THREE from 'three'
import { useContext, useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import { generate } from 'random-words';
import Button from '@/components/elements/Button';
import ThemeContext from '@/store';
import { LyricsData } from '@/app/lyrics-game/page';

function Word({ word, id, currentWordInVerse, emitCurrentWord, position, ...props} : {
  word: string,
  id: number,
  currentWordInVerse: number | null,
  emitCurrentWord: (id: number, word: string) => void,
  position: THREE.Vector3 | string | string[];
}) {
  const {isDarkTheme} = useContext(ThemeContext);
  const color = new THREE.Color();
  const fontProps = { font: '/Inter_Bold.ttf', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const over = (e:Event) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered])
  // Tie component to the render-loop
  useFrame(() => {
    if (ref.current) {
      const material = Array.isArray(ref.current.material) ? ref.current.material[0] as THREE.MeshBasicMaterial : ref.current.material as THREE.MeshBasicMaterial;
      material.color.lerp(color.set(hovered ? '#fa2720' : isDarkTheme ? '#e5e5e5' : '#606c38' ), 0.1);
      material.color.lerp(color.set(currentWordInVerse !== null && id <= currentWordInVerse ? '#20CC00' : '#e5e5e5'), 0.1);
    }
  })

  return (
    <Billboard position={position} {...props} onPointerOver={over} onPointerOut={out} onClick={() => emitCurrentWord(id, word)}>
      <Text ref={ref} {...fontProps}>{word}</Text>
    </Billboard>
  )
}

function Cloud({ 
  rawLyrics,
  count = 4, 
  radius = 20, 
  currentWordInVerse, 
  emitCurrentWord 
}: {
  rawLyrics: { word: string, index: number }[],
  count: number,
  radius: number,
  currentWordInVerse: number | null,
  emitCurrentWord: (id: number, word: string) => void
}) {
  const words = useMemo(() => {
    const temp = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (Math.ceil(count))
    const thetaSpan = (Math.PI * 2) / Math.ceil(count);
    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) { 
      temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), generate()])
      }
    }

    const tempWithNeil = temp.map(([pos], index) => {
      return [pos, rawLyrics[index]?.word ?? '']
    });

    return tempWithNeil
  }, [count, radius]);

  return words.map(([pos, word], index) => <Word key={index} word={word as string} id={index} currentWordInVerse={currentWordInVerse} emitCurrentWord={emitCurrentWord} position={pos}/>)
}


type StructuredLyrics = Lyric[][];
type RawLyrics = Lyric[];
type Lyric = {word: string, index: number};

const WordGallery = ({
  lyrics
  }: {
  lyrics:LyricsData
  }) => {
  const [currentWordInVerse, setCurrentWordInVerse] = useState<null | number>(5);

  const handleUpdateCurrentWord = (id: number) => {
    if (id === 0 && currentWordInVerse === null) {
      setCurrentWordInVerse(0);
    } else if (currentWordInVerse !== null && id === currentWordInVerse + 1) {
      setCurrentWordInVerse(id);
    }
  }

  const lyricsWithId = (lyrics: LyricsData) => {
    if (!lyrics) return null;
    let counter = 0;
    return lyrics.map((line: string[]) => line.map((word) => ({word, index: counter++})));
  }


  const structuredLyrics: StructuredLyrics | null = lyricsWithId(lyrics);
  const rawLyrics: RawLyrics | null = structuredLyrics?.flatMap((line:Lyric[]) => line) ?? null;

  return (
    <div className='min-h-screen h-full w-full bg-lSecCream dark:bg-dSecDarkBlue text-lPrimaryGreen dark:text-dPrimaryGray rounded-md border border-lPrimaryGreen dark:border-dSecMaize relative'>
        <div className="words-so-far-container absolute top-0 left-0 p-4">
          <h2 className='text-xl font-bold'>Lyrics:</h2>
          {(currentWordInVerse !== null && structuredLyrics) &&
            <div>
              {structuredLyrics.map((line, index) => {
                return line.some(word => word.index <= currentWordInVerse) &&
                  <p key={index}>{line.map((word, i) => word.index <= currentWordInVerse && 
                    <span key={`${index}-${i}`} className={'text-lSecDarkGreen dark:text-dPrimaryGray'}>{word.word} </span>)}</p>
              })}
              
            </div>
          }
        </div>
        {(rawLyrics && currentWordInVerse === rawLyrics?.length - 1) && 
        <div className='absolute top-0 p-4 w-full text-center'>
          <p className='text-xl font-bold animate-pulse'>Congratulations! You completed the song!</p>
        </div>
        }
      
      <div className='restart-button absolute top-0 right-0 p-4 z-[1]'>
        <Button onClick={() => setCurrentWordInVerse(null)} variant='secondary'>Restart</Button>
      </div>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 125], fov: 90 }} style={{height: '100vh'}} className='h-full min-h-screen w-full'>
      {/* <fog attach="fog" args={['#202025', 0, 100]} /> */}
      <Suspense fallback={null}>
        <group rotation={[10, 10.5, 10]}>
          {rawLyrics && <Cloud rawLyrics={rawLyrics} count={Math.sqrt(rawLyrics.length + 10)} radius={rawLyrics.length / 4} currentWordInVerse={currentWordInVerse} emitCurrentWord={handleUpdateCurrentWord} />}
        </group>
      </Suspense>
      <TrackballControls />
    </Canvas>
    </div>
  );
}

export default WordGallery;