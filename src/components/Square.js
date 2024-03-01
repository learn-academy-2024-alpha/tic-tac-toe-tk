import React from "react"

const Square = ({ takeTurn, index, value }) => {
  const handleClick = () => {
    takeTurn(index)
  }

  return (
    <div className="square" onClick={handleClick}>
      {value}
    </div>
  )
}
export default Square
