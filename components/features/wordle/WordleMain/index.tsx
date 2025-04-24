"use client";

import Button from "@/components/elements/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BackspaceIcon } from "@heroicons/react/24/outline";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const keyboard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

type LetterStatus = "correct" | "present" | "absent";
type EvaluatedGuess = {
  letter: string;
  status: LetterStatus;
}[];
const letterBgColor = (status?: LetterStatus) => {
  switch (status) {
    case "correct":
      return "green";
    case "present":
      return "yellow";
    case "absent":
      return "gray";
    default:
      return "white";
  }
};

const WordleMain = ({ wordleAnswer }: { wordleAnswer: string }) => {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<EvaluatedGuess[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

  const targetWord = wordleAnswer.toUpperCase();

  const evaluatedGuess = (guess: string): EvaluatedGuess => {
    const result = Array(WORD_LENGTH).fill({
      letter: "",
      status: "absent",
    });
    const currentGuessArr = guess.split("");
    const targetWordArr = targetWord.split("");

    // Create a map to track remaining letters in the answer
    const remainingLetters = targetWordArr.reduce(
      (acc: { [key: string]: number }, letter) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
      },
      {}
    );

    // First pass: Mark correct letters
    currentGuessArr.forEach((letter, index) => {
      if (letter === targetWordArr[index]) {
        result[index] = {
          letter: letter,
          status: "correct",
        };
        remainingLetters[letter]--;
      } else {
        result[index] = {
          ...result[index],
          letter: letter,
        };
      }
    });

    // Second pass: Mark present letters
    currentGuessArr.forEach((letter, index) => {
      if (result[index].status !== "correct" && remainingLetters[letter] > 0) {
        result[index] = {
          letter: letter,
          status: "present",
        };
        remainingLetters[letter]--;
      }
    });

    return result;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isGameOver) return;
    setErrorMessage("");

    if (e.key === "Enter") {
      if (currentGuess.length !== WORD_LENGTH) {
        setErrorMessage("Please submit a valid guess.");
        return;
      }

      const upperGuess = currentGuess.toUpperCase();
      const newGuesses = [...guesses, evaluatedGuess(upperGuess)];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (upperGuess === targetWord) {
        setIsGameWon(true);
        setIsGameOver(true);
      } else if (newGuesses.length === MAX_GUESSES) {
        setIsGameOver(true);
      }
    } else if (e.key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + e.key.toUpperCase());
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="wordle-main-container relative flex flex-col justify-self-center items-center justify-center w-full bg-lSecCream dark:bg-dSecDarkBlue text-lPrimaryGreen dark:text-dPrimaryGray">
      <div className="flex flex-col items-center justify-center pb-4 sm:pb-10">
        <h1 className="text-3xl sm:text-5xl text-center sm:pt-4 sm:px-4">
          Wordle
        </h1>
        <p className="text-center text-sm">
          Based off of the{" "}
          <Link
            href="https://www.nytimes.com/games/wordle/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {" "}
            NY Times Wordle
          </Link>{" "}
          game.
        </p>
      </div>

      {isGameWon && (
        <div className="message-behind absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center sm:justify-start">
          <h1 className="text-[20vw] pb-4 text-center transition-all duration-300 ease-in-out animate-pulse">
            You win!
          </h1>
        </div>
      )}

      <div className="board-container flex flex-col items-center justify-center">
        {Array.from({ length: MAX_GUESSES }).map((_, index) =>
          index === guesses.length ? (
            <div
              data-key={index}
              key={index}
              className="board-row current-guess-row flex flex-row items-center justify-center"
            >
              {Array.from({ length: WORD_LENGTH }).map((_, letterIndex) => (
                <div
                  key={letterIndex}
                  className="board-cell w-10 h-10 text-center uppercase leading-6 text-2xl border text-lPrimaryGreen dark:text-dSecDarkBlue border-lPrimaryGreen dark:border-dSecMaize rounded-md p-2 mt-1 mx-[2px]"
                  style={{ backgroundColor: letterBgColor() }}
                >
                  {currentGuess[letterIndex]}
                </div>
              ))}
            </div>
          ) : (
            <div
              key={index}
              className="board-row flex flex-row items-center justify-center"
              data-key={index}
            >
              {Array.from({ length: WORD_LENGTH }).map((_, letterIndex) => (
                <div
                  key={letterIndex}
                  className="board-cell w-10 h-10 text-center uppercase leading-6 text-2xl border text-lPrimaryGreen dark:text-dSecDarkBlue border-lPrimaryGreen dark:border-dSecMaize rounded-md p-2 mt-1 mx-[2px]"
                  style={{
                    backgroundColor: letterBgColor(
                      guesses[index]?.[letterIndex]?.status
                    ),
                  }}
                >
                  {guesses[index]?.[letterIndex]?.letter}
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <div className="h-[32px] sm:h-[52px]">
        {errorMessage && (
          <p className="text-center text-sm sm:p-4 animate-pulse">
            {errorMessage}
          </p>
        )}
        {isGameWon && (
          <p className="text-center text-sm sm:p-4 animate-pulse">
            The correct answer is{" "}
            <Link
              href={`https://www.merriam-webster.com/dictionary/${targetWord.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {targetWord}
            </Link>
          </p>
        )}
        {isGameOver && !isGameWon && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-sm sm:p-4 animate-pulse">
              {`You lose! :(`}{" "}
              <button
                onClick={() => window.location.reload()}
                className="ml-2 underline"
              >
                Play again
              </button>
            </p>
          </div>
        )}
      </div>
      <div className="keyboard-container flex flex-col items-center justify-start h-[152px] sm:h-48 gap-1">
        {keyboard.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="keyboard-row flex flex-row items-center justify-center h-full"
          >
            {row.map((letter, letterIndex) => (
              <Button
                variant="custom"
                key={letterIndex}
                className={`w-4 h-full m-[2px] text-sm border bg-white dark:bg-dSecDarkBlue text-lPrimaryGreen dark:text-dPrimaryGray border-lPrimaryGreen dark:border-dSecMaize rounded-md justify-center items-center flex`}
                style={{
                  width:
                    letter === "Enter"
                      ? "44px"
                      : letter === "Backspace"
                        ? "44px"
                        : "32px",
                  backgroundColor: guesses
                    .flat()
                    .some(
                      (guess) =>
                        guess.letter === letter && guess.status === "correct"
                    )
                    ? letterBgColor("correct")
                    : guesses
                          .flat()
                          .some(
                            (guess) =>
                              guess.letter === letter &&
                              guess.status === "present"
                          )
                      ? letterBgColor("present")
                      : guesses
                            .flat()
                            .some(
                              (guess) =>
                                guess.letter === letter &&
                                guess.status === "absent"
                            )
                        ? letterBgColor("absent")
                        : "",
                }}
                onClick={() => {
                  if (letter !== "Backspace" && letter !== "Enter") {
                    handleKeyDown({ key: letter } as KeyboardEvent);
                  } else if (letter === "Backspace") {
                    handleKeyDown({ key: "Backspace" } as KeyboardEvent);
                  } else if (letter === "Enter") {
                    handleKeyDown({ key: "Enter" } as KeyboardEvent);
                  }
                }}
              >
                {letter === "Backspace" ? (
                  <BackspaceIcon className="size-6" />
                ) : (
                  letter
                )}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordleMain;
