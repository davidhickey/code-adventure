import WordleMain from "@/components/features/wordle/WordleMain";
const getWordleAnswer = async (): Promise<{ word: string } | null> => {
  try {
    const res = await fetch("https://random-word-api.vercel.app/api?words=1&length=5", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch wordle answer");
    }
    const data = await res.json();
    const word = {
      word: data[0],
    }
    return word;
  } catch (error) {
    console.error("Error fetching wordle answer", error);
    return null;
  }
};

const Wordle = async () => {
  const wordleAnswer = await getWordleAnswer();

  if (!wordleAnswer) {
    return <div>Error fetching today&apos;s wordle data.</div>;
  }

  return <WordleMain wordleAnswer={wordleAnswer.word} />;
};

export default Wordle;
