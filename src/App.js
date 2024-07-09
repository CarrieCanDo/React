import { useState } from 'react';

// Square component represents each individual square/button in the board
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board component represents the tic-tac-toe game board
function Board({ xIsNext, squares, onPlay }) {
  // handleClick function handles click events on each square
  function handleClick(i) {
    // If there's a winner or the square is already filled, do nothing
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a copy of current squares array
    const nextSquares = squares.slice();
    // Update the clicked square with 'X' or 'O' based on xIsNext
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // Call onPlay function to update the game state with the new squares array
    onPlay(nextSquares);
  }

  // Determine the winner of the game based on current squares
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Render the game board with status and squares
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Game component manages the overall game state and history of moves
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // State for storing game history
  const [currentMove, setCurrentMove] = useState(0); // State for tracking current move index
  const xIsNext = currentMove % 2 === 0; // Determine if it's X's turn based on currentMove
  const currentSquares = history[currentMove]; // Get current squares based on currentMove

  // handlePlay function updates the game history with the new squares array
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // jumpTo function updates the currentMove to view a specific move in history
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Generate list of moves to display in the game info section
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render the tic-tac-toe game interface
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// calculateWinner function checks if there's a winner based on the current squares
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  // Check each line to see if all three squares have the same non-null value
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }
  return null; // Return null if there's no winner
}
