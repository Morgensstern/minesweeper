// returns grid that is used to update the game display and game status 
// that is used to check the game progress
interface Cell {
  value: any,
  x: number,
  y: number,
  flagged: boolean,
  revealed: boolean
}

const reveal = (oldGrid: Cell[][], i: number, j: number, mines: number): {grid: Cell[][], status: string} => {
  let newGrid = JSON.parse(JSON.stringify(oldGrid)); // deep copy to work on
  const neighbours = getNeighbours(i, j);
  newGrid[i][j].revealed = true; // reveal the clicked cell

  // check if the cell is a mine
  if (newGrid[i][j].value === "X") {
    return {grid: newGrid, status: "X"};
  }
  // check if the cell has neighbours
  if (newGrid[i][j].value != 0 && newGrid[i][j].value != "X") { 
    return hasWon(newGrid, mines);
  } 
  
  // if not a mine, iterate throgh neighbours
  newGrid = revealNeighbours(newGrid, neighbours);
  
  return hasWon(newGrid, mines);
}

// reveal neighbours on passed positions
const revealNeighbours = (oldGrid: Cell[][], neighbours: {x: number, y: number}[]) => {
  let newGrid = JSON.parse(JSON.stringify(oldGrid));

  const yBound = newGrid.length;
  const xBound = newGrid[0].length;

  for (let i = 0; i < neighbours.length; i++) {
    const posX = neighbours[i].x; 
    const posY = neighbours[i].y;

    if (posX >= 0 && xBound > posX && 
        posY >= 0 && yBound > posY) {
     if (newGrid[posY][posX].revealed || newGrid[posY][posX].flagged) continue; // is it revealed
      newGrid[posY][posX].revealed = true;
      
      if (newGrid[posY][posX].value != 0) continue;
      
      // get new neighbours
      const newNeighbours = getNeighbours(posY, posX);
      newGrid = revealNeighbours(newGrid, newNeighbours);
    } // bound check
    
  }

  return newGrid;
}

const hasWon = (newGrid: Cell[][], mines: number) => {
  let revealed = 0;

  const yBound = newGrid.length;
  const xBound = newGrid[0].length;

  for (let i = 0; i < yBound; i++) {
    for (let j = 0; j < xBound; j++) {
      revealed += newGrid[i][j].revealed && 1 || 0;
    }
  }

  if (revealed >= (yBound * xBound) - mines)
    return {grid: newGrid, status: "W"};

  return {grid: newGrid, status: "O"};
}

const getNeighbours = (i: number, j: number): {x: number, y: number}[] => {
  return [
    {x: j - 1, y: i - 1}, {x: j, y: i - 1}, {x: j + 1, y: i - 1},
    {x: j - 1, y: i}, {x: j + 1, y: i},
    {x: j - 1, y: i + 1}, {x: j, y: i + 1}, {x: j + 1, y: i + 1}
  ];
}


export default reveal;
