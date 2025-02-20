"use client";
import * as THREE from 'three'
import { useContext, useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import { generate } from 'random-words';
import Button from '@/components/elements/Button';
import ThemeContext from '@/store';
import { LyricsData } from '@/app/lyrics-game/page';

function Word({ word, id, currentWordInSong, emitCurrentWord, position, ...props} : {
  word: string,
  id: number,
  currentWordInSong: number | null,
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
      material.color.lerp(color.set(currentWordInSong !== null && id <= currentWordInSong ? '#20CC00' : '#e5e5e5'), 0.1);
    }
  })

  return (
    <Billboard position={position} {...props} onPointerOver={over} onPointerOut={out} onClick={() => emitCurrentWord(id, word)}>
      <Text ref={ref} {...fontProps}>{word}</Text>
    </Billboard>
  )
}

function Cloud({ 
  lyrics,
  count = 4, 
  radius = 20, 
  currentWordInSong, 
  emitCurrentWord 
}: {
  lyrics: { word: string, index: number }[],
  count: number,
  radius: number,
  currentWordInSong: number | null,
  emitCurrentWord: (id: number, word: string) => void
}) {




  const words = useMemo(() => {
    const temp: [THREE.Vector3, string][] = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (Math.ceil(count))
    const thetaSpan = (Math.PI * 2) / Math.ceil(count);
    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) { 
      temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), generate() as string])
      }
    }

    const tempWithNeil: [THREE.Vector3, { word: string; id: number }][] = temp.map(([pos], index) => {
      return [pos, {word: lyrics[index]?.word ?? '', id: lyrics[index]?.index ?? 0}]
    });
    const words = tempWithNeil.filter(([, lyric]) => lyric.word !== '');

    return words;
  }, [count, radius, lyrics]);

  return words.map(([pos, lyric], index) => <Word key={index} word={lyric.word as string} id={lyric.id} currentWordInSong={currentWordInSong} emitCurrentWord={emitCurrentWord} position={pos}/>);
}


type StructuredLyrics = Lyric[][];
type RawLyrics = Lyric[];
type Lyric = {word: string, index: number};

const WordGallery = ({
  lyrics
  }: {
  lyrics:LyricsData
  }) => {
  const [currentWordInSong, setcurrentWordInSong] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [wordsPerPage, setWordsPerPage] = useState<number>(25);

  const handleUpdateCurrentWord = (id: number) => {
   if (currentWordInSong !== null && id === currentWordInSong + 1) {
      setcurrentWordInSong(id);
    }

    //condition for when the user reaches the end of the page, we automatically goes to the next page
    if (id === currentWordInSong + 1 && id === ((page + 1) * wordsPerPage) - 1 && !isLastPage) {
      setPage(page + 1);
    }
  }

  const lyricsWithId = (lyrics: LyricsData) => {
    if (!lyrics) return null;
    let counter = 0;
    return lyrics.map((line: string[]) => line.map((word) => ({word, index: counter++})));
  }


  const structuredLyrics: StructuredLyrics | null = lyricsWithId(lyrics);
  const rawLyrics: RawLyrics | null = structuredLyrics?.flatMap((line:Lyric[]) => line) ?? null;
  const paginatedRawLyrics = useMemo(() => {
    if (!rawLyrics) return null;
    const startIndex = page * wordsPerPage;
    const endIndex = startIndex + wordsPerPage;
    const paginatedLyrics = rawLyrics.slice(startIndex, endIndex);
    const randomizedLyrics = paginatedLyrics.sort(() => Math.random() - 0.5);
    return randomizedLyrics;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, wordsPerPage, rawLyrics?.length]);

  const isLastPage = rawLyrics && paginatedRawLyrics && paginatedRawLyrics?.some(lyric => lyric.index === rawLyrics?.length - 1);

  if (!rawLyrics) return <div>Loading...</div>;
  if (rawLyrics.length === 0) return <div>No lyrics found.</div>;

  return (
    <div className='min-h-screen h-full w-full bg-lSecCream dark:bg-dSecDarkBlue text-lPrimaryGreen dark:text-dPrimaryGray rounded-md border border-lPrimaryGreen dark:border-dSecMaize relative'>
        <div className="words-so-far-container absolute top-0 left-0 p-4">
          <h2 className='text-xl font-bold'>Lyrics: {currentWordInSong + 1}/{rawLyrics?.length}</h2>
          {(currentWordInSong !== null && structuredLyrics) &&
            <div>
              {structuredLyrics.map((line, index) => {
                return line.some(word => word.index <= currentWordInSong) &&
                  <p key={index}>{line.map((word, i) => word.index <= currentWordInSong && 
                    <span key={`${index}-${i}`} className={'text-lSecDarkGreen dark:text-dPrimaryGray'}>{word.word} </span>)}</p>
              })}
              
            </div>
          }
        </div>
        {(isLastPage && currentWordInSong === Math.max(...paginatedRawLyrics.map(lyric => lyric.index))) && 
          <div className='absolute top-0 p-4 w-full text-center z-[1]'>
            <p className='text-xl font-bold animate-pulse'>Congratulations! You found all the lyrics.</p>
          </div>
        }
        {(!isLastPage && paginatedRawLyrics && currentWordInSong + 1 === Math.min(...paginatedRawLyrics.map(lyric => lyric.index))) && 
          <div className='absolute top-0 p-4 w-full text-center z-[1]'>
            <p className='text-xl font-bold animate-pulse'>You found all the lyrics so far! Can you find some more?</p>
          </div>
        }
      
      <div className='restart-button absolute top-0 right-0 p-4 z-[1]'>
        <Button onClick={() => {setcurrentWordInSong(0); setPage(0)}} variant='secondary'>Restart</Button>
      </div>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 125], fov: 90 }} style={{height: '100vh'}} className='h-full min-h-screen w-full'>
      {/* <fog attach="fog" args={['#202025', 0, 100]} /> */}
      <Suspense fallback={null}>
        <group rotation={[10, 10.5, 10]}>
          {paginatedRawLyrics && <Cloud lyrics={paginatedRawLyrics} count={Math.sqrt(paginatedRawLyrics.length + 1)} radius={paginatedRawLyrics.length} currentWordInSong={currentWordInSong} emitCurrentWord={handleUpdateCurrentWord} />}
        </group>
      </Suspense>
      <TrackballControls />
    </Canvas>
    </div>
  );
}

export default WordGallery;