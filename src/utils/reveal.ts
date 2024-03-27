// TODO: reveal function that reavels nieghbours and breaks on number
// --------
// if the value of the cell === 0 then do reveal function for each neighbour
// for easier array manipulations we will use object array of {x, y}

// returns grid that is used to update the game display and game status 
// that is used to check the game progress
const reveal = (oldGrid: [][], i: number, j: number): {grid: [][], status: string} => {
  let newGrid = JSON.parse(JSON.stringify(oldGrid)); // deep copy to work on
  const neighbours = getNeighbours(i, j);
  newGrid[i][j].revealed = true; // reveal the clicked cell

  // check if the cell is a mine
  if (newGrid[i][j].value === "X") {
    return {grid: newGrid, status: "X"};
  }
  // check if the cell has neighbours
  if (newGrid[i][j].value != 0 && newGrid[i][j].value != "X") {
    return {grid: newGrid, status: "O"};
  } 

  // if not a mine, iterate throgh neighbours
  newGrid = revealNeighbours(newGrid, neighbours); 

  return {grid: newGrid, status: "O"};
}

// reveal neighbours on passed positions
const revealNeighbours = (oldGrid: [][], neighbours: {x: number, y: number}[]) => {
  let newGrid = JSON.parse(JSON.stringify(oldGrid))
  
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

const getNeighbours = (i: number, j: number): {x: number, y: number}[] => {
  return [
    {x: j - 1, y: i - 1}, {x: j, y: i - 1}, {x: j + 1, y: i - 1},
    {x: j - 1, y: i}, {x: j + 1, y: i},
    {x: j - 1, y: i + 1}, {x: j, y: i + 1}, {x: j + 1, y: i + 1}
  ];
}


export default reveal;
