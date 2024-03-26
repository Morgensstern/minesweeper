import createBoard from '../utils/creatboard';
import reveal from '../utils/reveal';
import { useEffect, useState } from 'react';

import Cell from './cell';

import './styles/board.css';

interface Props {
  rows?: number,
  cols?: number,
  mines?: number,
}

const Board = ({ rows = 10, cols = 10, mines = 15 }: Props) => {
  const [grid, setGrid] = useState(new Array());
  const [status, setStatus] = useState("O");
  useEffect(() => {
    function freshBoard() {
      const newBoard = createBoard(cols, rows, mines);
      setGrid(newBoard.board);
    }
    freshBoard();
  }, []);

  const handleRightClick = (e, i: number, j: number) => {
    if (status === "X") return;
    e.preventDefault();
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (!newGrid[i][j].flagged)
      newGrid[i][j].flagged = true;
    else
      newGrid[i][j].flagged = false;
    setGrid(newGrid);
  }

  const handleLeftClick = (i: number, j: number) =>  {
    const newGrid = reveal(grid, i, j);
    if (status === "X") return;

    console.log(newGrid.status);
    setStatus(newGrid.status);
    setGrid(newGrid.grid);
  }
  
  
  return (
    <>
      <div className="board">
        {grid.map((row, i: number) => {
          return (
            <div className="board-row">
              {row.map((cell, j: number) => {
                return <Cell key={(i * 10) + j} onLeftClick={(e) => handleLeftClick(i, j)} onRightClick={(e) => handleRightClick(e, i, j)} details={ { cell, j, i } } />; // TODO: Swap it to the cell component later
              })}
            </div>);
        })}
      </div>
      <p className='board-status'>{status === "X" && "Game Over!" || ""}</p>
    </>
  )

}

export default Board;
