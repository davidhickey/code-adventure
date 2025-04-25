"use client";
import { useState, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import Button from "@/components/elements/Button";
import { LyricsData } from "@/app/lyrics-game/page";
import { Cloud } from "./Cloud";

type StructuredLyrics = Lyric[][];
type RawLyrics = Lyric[];
type Lyric = { word: string; index: number };

const WordGallery = ({ lyrics }: { lyrics: LyricsData }) => {
  const [currentWordInSong, setcurrentWordInSong] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [wordsPerPage, setWordsPerPage] = useState<number>(25);

  const handleUpdateCurrentWord = (id: number) => {
    if (currentWordInSong !== null && id === currentWordInSong + 1) {
      setcurrentWordInSong(id);
    }
    //condition for when the user reaches the end of the page, we automatically goes to the next page
    if (
      id === currentWordInSong + 1 &&
      id === (page + 1) * wordsPerPage - 1 &&
      !isLastPage
    ) {
      setPage(page + 1);
    }
  };

  const lyricsWithId = (lyrics: LyricsData) => {
    if (!lyrics) return null;
    let counter = 0;
    return lyrics.map((line: string[]) =>
      line.map((word) => ({ word, index: counter++ }))
    );
  };

  const structuredLyrics: StructuredLyrics | null = lyricsWithId(lyrics);
  const rawLyrics: RawLyrics | null =
    structuredLyrics?.flatMap((line: Lyric[]) => line) ?? null;

  //getting passed into the cloud component
  const paginatedRawLyrics = useMemo(() => {
    if (!rawLyrics) return null;
    const startIndex = page * wordsPerPage;
    const endIndex = startIndex + wordsPerPage;
    const paginatedLyrics = rawLyrics.slice(startIndex, endIndex);
    const randomizedLyrics = paginatedLyrics.sort(() => Math.random() - 0.5);
    return randomizedLyrics;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, wordsPerPage, rawLyrics?.length]);

  const isLastPage =
    rawLyrics &&
    paginatedRawLyrics &&
    paginatedRawLyrics?.some((lyric) => lyric.index === rawLyrics?.length - 1);

  if (!rawLyrics) return <div>Loading...</div>;
  if (rawLyrics.length === 0) return <div>No lyrics found.</div>;

  return (
    <div className="min-h-[400px] sm:min-h-[600px] w-full max-w-[1200px] mx-auto bg-lSecCream dark:bg-dSecDarkBlue text-lPrimaryGreen dark:text-dPrimaryGray rounded-md border border-lPrimaryGreen dark:border-dSecMaize relative">
      <div className="words-so-far-container absolute top-0 left-0 p-4">
        <h2 className="text-md sm:text-lg font-bold">
          Lyrics: {currentWordInSong + 1}/{rawLyrics?.length}
        </h2>
        {currentWordInSong !== null && structuredLyrics && (
          <div>
            {structuredLyrics.map((line, index) => {
              return (
                line.some((word) => word.index <= currentWordInSong) && (
                  <p key={index} className="text-sm sm:text-md">
                    {line.map(
                      (word, i) =>
                        word.index <= currentWordInSong && (
                          <span
                            key={`${index}-${i}`}
                            className={
                              "text-lSecDarkGreen dark:text-dPrimaryGray"
                            }
                          >
                            {word.word !== "?" ? " ": ""}{word.word}
                          </span>
                        )
                    )}
                  </p>
                )
              );
            })}
          </div>
        )}
      </div>
      {isLastPage &&
        currentWordInSong ===
          Math.max(...paginatedRawLyrics.map((lyric) => lyric.index)) && (
          <div className="absolute top-0 p-4 w-full text-center z-[1]">
            <p className="text-xl font-bold animate-pulse">
              Congratulations! You found all the lyrics.
            </p>
          </div>
        )}
      {!isLastPage &&
        paginatedRawLyrics &&
        currentWordInSong + 1 ===
          Math.min(...paginatedRawLyrics.map((lyric) => lyric.index)) && (
          <div className="absolute top-0 p-4 w-full text-center z-[1]">
            <p className="text-xl font-bold animate-pulse">
              You found all the lyrics so far! Can you find some more?
            </p>
          </div>
        )}

      <div className="restart-button absolute top-0 right-0 p-4 z-[1]">
        <Button
          onClick={() => {
            setcurrentWordInSong(0);
            setPage(0);
          }}
          variant="secondary"
        >
          Restart
        </Button>
      </div>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 125], fov: 50 }}
        style={{ height: "600px" }}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <group rotation={[10, 10.5, 10]}>
            {paginatedRawLyrics && (
              <Cloud
                lyrics={paginatedRawLyrics}
                count={Math.sqrt(paginatedRawLyrics.length + 1)}
                radius={paginatedRawLyrics.length}
                currentWordInSong={currentWordInSong}
                emitCurrentWordAction={handleUpdateCurrentWord}
              />
            )}
          </group>
        </Suspense>
        <TrackballControls />
      </Canvas>
    </div>
  );
};

export default WordGallery;
