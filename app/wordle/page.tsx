"use client";

import { useState } from "react";


const Wordle = () => {
  const CORRECT_WORD = "rover".split("");
  const [guesses, setGuesses] = useState([]);
  const [boardForm, setBoardForm] = useState(Array(6).fill(null).map(item => Array(5).fill(null)));
  const [errMess, setErrMess] = useState('');
  const [winMessage, setWinMessage] = useState('');

  const currentGuess = boardForm[guesses.length > 0 ? guesses.length - 1 : 0];


  const handleChange = (rowI:number, cellI:number, val: string) => {
    setBoardForm((prevBoard) => (
      prevBoard.map((row, i) => (
        i === rowI ? (
          row.map((cell, index) => (
            index === cellI ?
            val: cell
          ))
        ): row
      ))
    )
    )
  };

  const handleSubmit = () => {
    setGuesses((prevGuesses) => [...prevGuesses, currentGuess]);
    if(currentGuess.join("") === CORRECT_WORD.join("")){
      setWinMessage('YOU WIN!')
    }
  }

  console.log('guesses ', guesses);
  console.log('correct word ', CORRECT_WORD.join(""))


  return (
    <div className="wordle-container flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Wordle</h1>
      <div className="board-container">
        {boardForm.map((row, i) => (
          <div key={i} className="row flex flex-row">
            {row.map((cell, cellI) => (
              <input key={cellI} disabled={i > guesses.length } type="text" val={boardForm[i][cellI]} onChange={(e) => handleChange(i,cellI,e.target.value)} className="border border-1 h-10 w-10 m-1" style={{
                backgroundColor: (CORRECT_WORD[cellI] === boardForm[i][cellI] && guesses.length > i) ? 'green' : (CORRECT_WORD.some(letter => letter === boardForm[i][cellI]) && guesses.length > i) ? 'orange' : ''
              }} /> 
            ))}
          </div>
        ))}
        <button onClick={handleSubmit} disabled={currentGuess.filter(guess => guess).length != 5 } className="border border-1 rounded-md p-4 mt-10">Submit Guess</button>
        {winMessage &&
        <div>
          {winMessage}
          </div>
        }

      </div>
      <div className="keyboard-container">

      </div>
    </div>
  );
};

export default Wordle;
