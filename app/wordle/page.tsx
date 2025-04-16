import WordleMain from "@/components/features/wordle/WordleMain";

const getWordleAnswer = async () => {
  try {
    const res = await fetch(" https://wordle-api-kappa.vercel.app/answer", {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
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
