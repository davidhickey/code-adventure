"use client";

import Button from "@/components/elements/Button";
import Link from "next/link";
import { useState } from "react";

const WordleMain = ({ wordleAnswer }: { wordleAnswer: string }) => {
  const [boardForm, setBoardForm] = useState(
    Array(6)
      .fill(null)
      .map(() => Array(5).fill(""))
  );
  const [guessResults, setGuessResults] = useState<
    { letter: string; status: string }[][]
  >([]);
  const [message, setMessage] = useState("");

  const guessCount = guessResults.length;
  const keyboardGuesses = guessResults.flat();

  const WORDLE_ANSWER = wordleAnswer;
  const WORDLE_ANSWER_ARR = WORDLE_ANSWER.split("");

  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  const handleChange = (rowIndex: number, cellIndex: number, value: string) => {
    setBoardForm((prevBoard) =>
      prevBoard.map((row, rI) =>
        rI === rowIndex
          ? row.map((cell, cI) => (cI === cellIndex ? value : cell))
          : row
      )
    );
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (boardForm[guessCount].some((cell) => cell === "")) {
      setMessage("Please submit a valid guess.");
      return;
    }
    const result = checkGuess(boardForm[guessCount]);
    setGuessResults((prevResults) => [...prevResults, result]);
    if (result.every((letter) => letter.status === "correct")) {
      setMessage("You win!");
    } else if (guessCount === 5) {
      setMessage("You lose!");
    }
  };

  const checkGuess = (curGuess: string[]) => {
    // Initialize result array
    const result = Array(5).fill({
      letter: "",
      status: "absent",
    });

    // Create a map to track remaining letters in the answer
    const remainingLetters = WORDLE_ANSWER_ARR.reduce(
      (acc: { [key: string]: number }, letter) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
      },
      {}
    );

    // First pass: Mark correct letters
    curGuess.forEach((letter, index) => {
      if (letter === WORDLE_ANSWER_ARR[index]) {
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
    curGuess.forEach((letter, index) => {
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

  return (
    <div className="wordle-main-container relative flex flex-col items-center justify-center h-full w-full bg-lSecCream dark:bg-dSecDarkBlue text-lPrimaryGreen dark:text-dPrimaryGray">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl sm:text-5xl pb-4 text-center">Wordle</h1>
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

      {message && message === "You win!" && (
        <div className="message-behind absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-[20vw] pb-4 text-center transition-all duration-300 ease-in-out animate-pulse">
            You win!
          </h1>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      >
        <div className="board-container flex flex-col items-center justify-center">
          {boardForm.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="row flex flex-row items-center justify-center"
            >
              {row.map((cell, cellIndex) => (
                <input
                  key={cellIndex}
                  type="text"
                  maxLength={1}
                  className="cell w-10 h-10 text-center uppercase text-2xl border text-lPrimaryGreen dark:text-dSecDarkBlue border-lPrimaryGreen dark:border-dSecMaize rounded-md p-2 m-1"
                  value={boardForm[rowIndex][cellIndex]}
                  onChange={(e) =>
                    handleChange(
                      rowIndex,
                      cellIndex,
                      e.target.value.toUpperCase()
                    )
                  }
                  disabled={rowIndex < guessCount || rowIndex > guessCount}
                  style={{
                    backgroundColor:
                      guessResults[rowIndex] &&
                      guessResults[rowIndex][cellIndex].status === "correct"
                        ? "green"
                        : guessResults[rowIndex] &&
                            guessResults[rowIndex][cellIndex].status ===
                              "present"
                          ? "#fca311"
                          : rowIndex < guessCount
                            ? "gray"
                            : "",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </form>
      <div className="h-[52px]">
        {message && message === "Please submit a valid guess." && (
          <p className="text-center text-sm p-4 animate-pulse">{message}</p>
        )}
        {message && message === "You win!" && (
          <p className="text-center text-sm p-4 animate-pulse">
            The correct answer is{" "}
            <Link
              href={`https://www.merriam-webster.com/dictionary/${WORDLE_ANSWER.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {WORDLE_ANSWER}
            </Link>
          </p>
        )}
        {message && message === "You lose!" && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-sm p-4 animate-pulse">
              {`You lose! :(`} <button onClick={() => window.location.reload()} className="ml-2 underline">Play again</button>
            </p>
            
          </div>
        )}
      </div>
      <div className="keyboard-container flex flex-col items-center justify-center">
        {keyboard.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="keyboard-row flex flex-row items-center justify-center"
          >
            {row.map((letter, letterIndex) => (
              <Button
                variant="custom"
                key={letterIndex}
                className={`w-4 h-4 px-0 sm:w-6 sm:h-6 py-1 sm:px-1 m-[2px] text-sm border bg-white dark:bg-dSecDarkBlue text-lPrimaryGreen dark:text-dPrimaryGray border-lPrimaryGreen dark:border-dSecMaize rounded-md justify-center items-center flex`}
                style={{
                  width:
                    letter === "Enter"
                      ? "44px"
                      : letter === "Backspace"
                        ? "84px"
                        : "",
                  backgroundColor: keyboardGuesses.some(
                    (guess) =>
                      guess.letter === letter && guess.status === "correct"
                  )
                    ? "green"
                    : keyboardGuesses.some(
                          (guess) =>
                            guess.letter === letter &&
                            guess.status === "present"
                        )
                      ? "#fca311"
                      : keyboardGuesses.some(
                            (guess) =>
                              guess.letter === letter &&
                              guess.status === "absent"
                          )
                        ? "gray"
                        : "",
                }}
                onClick={() => {
                  if (letter !== "Backspace" && letter !== "Enter") {
                    handleChange(
                      guessCount,
                      boardForm[guessCount].filter((cell) => !!cell).length,
                      letter
                    );
                  } else if (letter === "Backspace") {
                    handleChange(
                      guessCount,
                      boardForm[guessCount].filter((cell) => !!cell).length
                        ? boardForm[guessCount].filter((cell) => !!cell)
                            .length - 1
                        : 0,
                      ""
                    );
                  } else if (letter === "Enter") {
                    handleSubmit();
                  }
                }}
                disabled={
                  letter === "Enter" &&
                  boardForm[guessCount].filter((cell) => !!cell).length !== 5
                }
              >
                {letter}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordleMain;
