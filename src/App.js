import React, { useState } from "react"

import Square from "./components/Square"
import Winner from "./components/Winner"
import gryf from "./assets/gryf.jpeg"

import "./App.css"

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [player, setPlayer] = useState("X")
  const [winner, setWinner] = useState(null)
  const [gameWon, setGameWon] = useState(false)

  // we want this to run on the click
  const takeTurn = (clickedSquare) => {
    if (squares[clickedSquare] === null && !winner) {
      // if empty square, we want to assign the value of the square to x or o aka player variable
      squares[clickedSquare] = player
      setPlayer(player === "X" ? "0" : "X")
      // reset the board with the update

      setSquares([...squares])
    }
    checkGameStatus()
  }

  const winningConditions = [
    // look at each array, check if all element's = x or 0.  .forEach()
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const checkGameStatus = () => {
    winningConditions.forEach((condition) => {
      //  .every() Hof - true if every item in array meets the condition
      if (condition.every((val) => squares[val] === player)) {
        setGameWon(true)
        setWinner(player)
        setTimeout(() => {
          alert(`🏆 ${player} WINS!!! 🏆`)
        }, 100)
        disableBoard()
      }
      return gameWon
    })
  }

  const disableBoard = () => {
    // grab whole board using css class
    const board = document.querySelector(".board")
    board.addEventListener("click", (event) => {
      // stops the click (it's default behavior)
      event.preventDefault()
    })
  }

  const restartGame = () => {
    setSquares(Array(9).fill(null))
    setPlayer("X")
    setWinner(null)
    setGameWon(false)
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="wrapper">
        {gameWon && <Winner winner={winner} />}
        <div className="board">
          {squares.map((value, index) => {
            return (
              <Square
                value={value}
                takeTurn={takeTurn}
                index={index}
                key={index}
              />
            )
          })}
          <button className="restart" onClick={restartGame}>
            PLAY AGAIN!
          </button>
        </div>
        {gameWon && <Winner winner={winner} />}
      </div>
    </>
  )
}

export default App
