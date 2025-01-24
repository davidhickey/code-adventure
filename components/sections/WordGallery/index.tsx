"use client";
import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense, ReactHTML, ReactHTMLElement } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import { generate } from 'random-words';
import { useRouter } from 'next/navigation';


//create a game that passes in a verse from a song
//the user needs to click on the words in order to form the song
//if the user clicks on a word ouf of order the word should turn red
//if the user clicks on a correct word the word should turn green

// todos:
//print out correct lyrics below the game - complete
//add a button to restart the game - complete
//get song lyrics from an api - Genious API
//set up Oauth for Genius API


const rawNeil = `Look out, Mama, there's a white boat comin' up the river
With a big red beacon and a flag and a man on the rail
I think you'd better call John
'Cause it don't look like they're here to deliver the mail
And it's less than a mile away, I hope they didn't come to stay
It's got numbers on the side and a gun, and it's makin' big waves`;

const neil = rawNeil.split(' ').map((word, index) => ({ word, index }));


function Word({ word, id, currentWordInVerse, emitCurrentWord, position, ...props} : {
  word: string,
  id: number,
  currentWordInVerse: number | null,
  emitCurrentWord: (id: number, word: string) => void,
  position: THREE.Vector3 | string | string[];
}) {
  const router = useRouter();
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
  useFrame(({ camera }) => {
    if (ref.current) {
      const material = Array.isArray(ref.current.material) ? ref.current.material[0] as THREE.MeshBasicMaterial : ref.current.material as THREE.MeshBasicMaterial;
      material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1);
      material.color.lerp(color.set(currentWordInVerse !== null && id <= currentWordInVerse ? '#20CC00' : 'white'), 0.1);
    }
  })

  return (
    <Billboard position={position} {...props} onPointerOver={over} onPointerOut={out} onClick={() => emitCurrentWord(id, word)}>
      <Text ref={ref} {...fontProps}>{word}</Text>
    </Billboard>
  )
}

function Cloud({ 
  count = 4, 
  radius = 20, 
  currentWordInVerse, 
  emitCurrentWord 
}: {
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

    const tempWithNeil = temp.map(([pos, word], index) => {
      return [pos, neil[index]?.word ?? '']
    });

    return tempWithNeil
  }, [count, radius]);

  return words.map(([pos, word], index) => <Word key={index} word={word as string} id={index} currentWordInVerse={currentWordInVerse} emitCurrentWord={emitCurrentWord} position={pos}/>)
}

const WordGallery = () => {
  const [currentWordInVerse, setCurrentWordInVerse] = useState<null | number>(null);

  const handleUpdateCurrentWord = (id: number, word: string) => {
    if (id === 0 && currentWordInVerse === null) {
      setCurrentWordInVerse(0);
    } else if (currentWordInVerse !== null && id === currentWordInVerse + 1) {
      setCurrentWordInVerse(id);
    }

  }

  return (
    <div className='min-h-screen h-full w-full bg-[#202025] relative'>
      {currentWordInVerse !== null && 
        <div className="words-so-far-container absolute top-0 left-0 p-4">
          <h1 className='text-white text-2xl'>Words so far:</h1>
          <p className='text-white text-xl'>{neil.slice(0, currentWordInVerse + 1).map(({ word }) => word).join(' ')}</p>
        </div>
      }
      <div className='restart-button absolute top-0 right-0 p-4 z-[1]'>
        <button onClick={() => setCurrentWordInVerse(null)} className='bg-white text-black p-2 rounded-md'>Restart</button>
      </div>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }} style={{height: '100vh'}} className='h-full min-h-screen w-full'>
      <fog attach="fog" args={['#202025', 0, 80]} />
      <Suspense fallback={null}>
        <group rotation={[10, 10.5, 10]}>
          <Cloud count={Math.sqrt(neil.length)} radius={20} currentWordInVerse={currentWordInVerse} emitCurrentWord={handleUpdateCurrentWord} />
        </group>
      </Suspense>
      <TrackballControls />
    </Canvas>
    </div>
  );
}

export default WordGallery;