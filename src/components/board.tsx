import createBoard from '../utils/creatboard'
import { useEffect, useState } from 'react';

import Cell from './cell';

import './styles/board.css';

const Board = () => {
  const [grid, setGrid] = useState(new Array());
  useEffect(() => {
    function freshBoard() {
      const newBoard = createBoard(10, 10, 15);
      setGrid(newBoard.board);
    }
    freshBoard();
  }, []);

  const handleRightClick = (e, i: number, j: number) => {
    e.preventDefault();
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (!newGrid[i][j].flagged)
      newGrid[i][j].flagged = true;
    else
      newGrid[i][j].flagged = false;
    setGrid(newGrid);
  }
  
  
  return (
    <div className="board">
      {grid.map((row, i: number) => {
        return (
          <div className="board-row">
            {row.map((cell, j: number) => {
              return <Cell onRightClick={(e) => handleRightClick(e, i, j)} details={ { cell, j, i } } />; // TODO: Swap it to the cell component later
            })}
          </div>);
      })}
    </div>
  )

}

export default Board;
