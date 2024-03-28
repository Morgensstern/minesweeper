import createBoard from '../utils/creatboard';
import reveal from '../utils/reveal';
import { useEffect, useState } from 'react';

import Cell from './cell';
import TopPanel from './top-panel'

import './styles/board.css';

interface Props {
  rows?: number,
  cols?: number,
  mines?: number,
}

const Board = ({ rows = 10, cols = 10, mines = 15 }: Props) => {
  const [grid, setGrid] = useState(new Array());
  const [status, setStatus] = useState("O");
  const [flaggedCount, setFlaggedCount] = useState(0);
  const [timerActve, setTimerActive] = useState(false);
  const [minesPositions, setMinesPositions] = useState(new Array<{x: number, y: number}>());

  useEffect(() => {
    function freshBoard() {
      const newBoard = createBoard(cols, rows, mines);
      setGrid(newBoard.board);
      setMinesPositions(newBoard.minesPositions);
    }
    freshBoard();
  }, []);

  const handleRightClick = (i: number, j: number) => {
    if (status === "X" || status === "W") return;
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (!newGrid[i][j].flagged) {
      setFlaggedCount(flaggedCount + 1);
      newGrid[i][j].flagged = true;
    }
    else {
      setFlaggedCount(flaggedCount - 1);
      newGrid[i][j].flagged = false;
    }
    setGrid(newGrid);
  }

  const handleLeftClick = (i: number, j: number) =>  {
    const newGrid = reveal(grid, i, j, mines);
    if (status === "X" || status === "W") {
      return; 
    }
    
    setTimerActive(true);
    setStatus(newGrid.status);
    if (newGrid.status === "X") {
      minesPositions.forEach(pos => {
        newGrid.grid[pos.y][pos.x].revealed = true;
      })
    }

    setGrid(newGrid.grid);

    if (newGrid.status === "X" || newGrid.status === "W") setTimerActive(false);
  }
  
  const restart = () => {
    const newBoard = createBoard(cols, rows, mines);
    setGrid(newBoard.board);
    setMinesPositions(newBoard.minesPositions);
    setStatus("O");
    setFlaggedCount(0);
    setTimerActive(false);
  }

  return (
    <div className="game">
      <TopPanel isTimerActive={timerActve} boardRestart={restart} status={status} bombsLeft={mines - flaggedCount} />
      <div className="board"> 
        {grid.map((row, i: number) => {
          return (
            <div className="board-row">
              {row.map((cell: {value: any, x: number, y: number, flagged: boolean, revealed: boolean}, j: number) => {
                return <Cell status={status} key={(i * 10) + j} onLeftClick={() => handleLeftClick(i, j)} onRightClick={() => handleRightClick(i, j)} details={ { cell: cell, x: j, y: i } } />; // TODO: Swap it to the cell component later
              })}
            </div>);
        })}
      </div>
    </div>
  )

}

export default Board;
