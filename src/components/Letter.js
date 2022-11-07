import React,{ useContext, useEffect } from 'react'
import { AppContext } from '../App.js';

function Letter({letterPos, attemptVal,}){
    const { board,currAttempt,correctWord,setDisableLetters} = useContext(AppContext);

      console.log(correctWord);
    const  letter  = board[attemptVal][letterPos];
    const correct = correctWord[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.includes(letter);
    const letterState = currAttempt.attempt > attemptVal && (correct ? "correct": almost ?"almost" : "error");

    useEffect(()=>{
      if(letter !== "" && !correct && !almost){
        setDisableLetters((prev)=> [...prev,letter]);
      }
    },[currAttempt.attempt])
  return (
    <div className="letter" id={letterState}>{letter}</div>
  );
}

export default Letter;