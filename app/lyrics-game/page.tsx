import WordGallery from "@/components/sections/WordGallery";

const LyricsGame = () => {
  return (
    <div className="text-lPrimaryGreen dark:text-dPrimaryGray">
      <h1 className="text-3xl sm:text-5xl py-10 text-center">Lyrics Game</h1>
      <p className="text-center text-xl pb-20">{`How does the first verse of "Powderfinger" by Neil Young go?`}</p>
        <WordGallery />
    </div>
  )
}

export default LyricsGame;