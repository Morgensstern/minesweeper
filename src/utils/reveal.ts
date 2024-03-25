// TODO: reveal function that reavels nieghbours and breaks on number
// --------
// if the value of the cell === 0 then do reveal function for each neighbour
// for easier array manipulations we will use object array of {x, y}

const reveal = (oldGrid: [][], i: number, j: number): [][] => {
  let newGrid = JSON.parse(JSON.stringify(oldGrid)); // deep copy to work on
  const neighbours = [
    {x: j - 1, y: i - 1}, {x: j, y: i - 1}, {x: j + 1, y: i - 1},
    {x: j - 1, y: i}, {x: j, y: i}, {x: j + 1, y: i},
    {x: j - 1, y: i + 1}, {x: j, y: i + 1}, {x: j + 1, y: i + 1}
  ];

  const yBound = newGrid.length;
  const xBound = newGrid[0].length;
  // check if the cell is a mine
  if (newGrid[i][j].value === "X") {
    newGrid[i][j].revealed = true;
  }

  // check if the cell has neighbours
  if (newGrid[i][j].value != 0 && newGrid[i][j].value != "X") {
    newGrid[i][j].revealed = true;
  } 

  // if not a mine, iterate throgh neighbours and check their bounds, value, revealed 
  // and flagged varibles
  for (let z = 0; z < neighbours.length; z++) {
    if (newGrid[i][j].revealed || newGrid[i][j].value !== 0) return newGrid;
    if (neighbours[z].x >= 0 && xBound > neighbours[z].x && 
        neighbours[z].y >= 0 && yBound > neighbours[z].y) {
      newGrid[neighbours[z].y][neighbours[z].x].revealed = true;
      newGrid = reveal(newGrid, neighbours[z].y, neighbours[z].x);
    } // is it in bounds?
  }

  return newGrid; // later gonna us it in setGrid in board component
}

export default reveal;
