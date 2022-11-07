import { createContext, useEffect, useState } from "react";
import './App.css';
import Board from './components/Board';
import GameOver from "./components/GameOver";
import KeyBoard from './components/KeyBoard';
import { boardDefault, generateWordSet } from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [WordSet, setWordSet] = useState([]);
  const [disabledLetters, setDisableLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [correctWord,setCorrectWord] = useState([])

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.NewWord.toUpperCase());
    });
  }, [])
  console.log(WordSet);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  }
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };
  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    currWord += "\r";
    console.log(currWord.toLowerCase());
    console.log('word from bank=', WordSet.includes(currWord.toLowerCase()))
    console.log("🚀 ~ file: App.js ~ line 48 ~ onEnter ~ ̥", WordSet)
    if (WordSet.includes(currWord.toLowerCase())) {
      console.log("inside curr increment");
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word Non Found");
    }

    if (currWord === correctWord) {
        setGameOver({
        gameOver: true,
        guessedWord:true
      });
     }
    if(currAttempt.attempt === 5){
      setGameOver({gameOver:true,
        guessedWord:false
      })
    }
  };

  return (
    <div className="App">
      <nav><h1>Wordle</h1></nav>
      <div className="game">
        <AppContext.Provider value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          correctWord,
          setDisableLetters,
          disabledLetters,
          setGameOver,
          gameOver
        }}>
          <Board />
         {gameOver.gameOver ? <GameOver /> : <KeyBoard />}
        </AppContext.Provider>
      </div>

    </div>
  );
}

export default App;
