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

  const handleRightClick = (i: number, j: number) => {
    if (status === "X" || status === "W") return;
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (!newGrid[i][j].flagged)
      newGrid[i][j].flagged = true;
    else
      newGrid[i][j].flagged = false;
    setGrid(newGrid);
  }

  const handleLeftClick = (i: number, j: number) =>  {
    const newGrid = reveal(grid, i, j, mines);
    if (status === "X" || status === "W") return;

    setStatus(newGrid.status);
    setGrid(newGrid.grid);
  }
  
  
  return (
    <>
      <div className="board">
        {grid.map((row, i: number) => {
          return (
            <div className="board-row">
              {row.map((cell: {value: any, x: number, y: number, flagged: boolean, revealed: boolean}, j: number) => {
                return <Cell key={(i * 10) + j} onLeftClick={() => handleLeftClick(i, j)} onRightClick={() => handleRightClick(i, j)} details={ { cell: cell, x: j, y: i } } />; // TODO: Swap it to the cell component later
              })}
            </div>);
        })}
      </div>
      <p className={status ==="W" && "board-status-win" || 'board-status-go'}>{status === "X" && "Game Over!" || (status === "W" && "You Win!" || "")}</p>
    </>
  )

}

export default Board;
