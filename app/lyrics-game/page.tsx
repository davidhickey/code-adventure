"use client";
import { useEffect, useState } from "react";
import WordGallery from "@/components/sections/WordGallery";
import Button from "@/components/elements/Button";

type LyricFormData = {
  artist: string;
  song: string;
}

export type LyricsData = string[][] | null;

const LyricsGame = () => {
  const [lyrics, setLyrics] = useState<LyricsData>([]);
  const [lyricForm, setLyricForm] = useState<LyricFormData>({
    artist: "Bob Marley",
    song: "Three Little Birds"
  });
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const parseLyrics = (lyrics: string) => {
    return lyrics
      .split(/\r?\n+/) // Split by new lines
      .map(line => line.trim().split(/\s+/).filter(word => word !== "")); // Split each line into words
  }


  const getLyrics = async ({artist, song}: LyricFormData) => {
    setErrMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch lyrics: ${res.statusText}. Status code: ${res.status}.`);
      }
      const data = await res.json();
      const lyrics = parseLyrics(data.lyrics);
      setLyrics(lyrics);
    } catch (error) {
      console.error(error);
      setErrMessage("Failed to fetch lyrics. Please make sure there are no spelling mistakes.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLyricForm({
      ...lyricForm,
      [name]: value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!lyricForm.artist || !lyricForm.song) {
      setErrMessage("Please fill in both fields.");
      return;
    }
    getLyrics(lyricForm);
  }

  useEffect(() => {
    getLyrics(lyricForm);
  }, []);

  return (
    <div className="text-lPrimaryGreen dark:text-dPrimaryGray">
      <h1 className="text-3xl sm:text-5xl py-4 text-center">Lyrics Game</h1>
      <div className="flex gap-4 flex-col items-center pb-8">
        <p className="text-center text-xl">{`Search for a song and artist and try to guess the lyrics in order.`}</p>
        <div className="lyrics-search-container flex justify-center items-center relative">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row" onFocus={() => setErrMessage(null)}>
            <div className="flex flex-col gap-1">
              <label htmlFor="artist">Artist:</label>
              <input type="text" name="artist" id="artist" value={lyricForm.artist} onChange={handleChange} className="text-lPrimaryGreen dark:text-dSecDarkBlue border border-lPrimaryGreen dark:border-dSecMaize rounded-md p-2" placeholder="Neil Young" style={{border: errMessage ? "1px solid #ef4444" : ""}}/>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="song">Song:</label>
              <input type="text" name="song" id="song" value={lyricForm.song} onChange={handleChange} className="text-lPrimaryGreen dark:text-dSecDarkBlue border border-lPrimaryGreen dark:border-dSecMaize rounded-md p-2" placeholder="Harvest Moon" style={{border: errMessage ? "1px solid #ef4444" : ""}}/>
            </div>
            <div className="flex flex-col gap-1 sm:self-end">
              <Button className="min-w-[200px]" type="submit" variant="primary">{isLoading ? <span className="animate-pulse">Loading</span>:<span>Submit</span>}</Button>
            </div>
          </form>
          {(errMessage && !isLoading) && <div className="text-red-500 absolute bottom-[-1rem] left-0 text-xs">{errMessage}</div>}
          {(isLoading && !errMessage) && <div className="absolute bottom-[-1rem] left-0 animate-pulse text-xs">Loading...</div>}
        </div>
      </div>
      <WordGallery lyrics={lyrics}/>
    </div>
  )
}

export default LyricsGame;