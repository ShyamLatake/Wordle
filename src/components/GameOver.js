import React, { useContext } from 'react'
import { AppContext } from '../App'

const GameOver = () => {
    const {gameOver,correctWord,currAttempt,setCorrectWord} = useContext(AppContext)
  return (
    <div className='gameover'>
        <h3>{gameOver.guessedWord ? "You Correctly Guessed" : "You Failed"}</h3>
        <h1>Correct Word: {correctWord}</h1>
        {gameOver.guessedWord && (
          <h3>You Guessed in {currAttempt.attempt} attempts</h3>
        )}
        <button class="newWord" onClick={()=> window.location.reload()}>New Word</button>
    </div>
  )
}

export default GameOver