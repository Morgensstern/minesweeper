// TODO: reveal function that reavels nieghbours and breaks on number
// --------
// if the value of the cell === 0 then do reveal function for each neighbour
// for easier array manipulations we will use object array of {x, y}

const reveal = (oldGrid: [][], i: number, j: number): {grid: [][], status: string} => {
  const newGrid = JSON.parse(JSON.stringify(oldGrid)); // deep copy to work on
  const neighbours = [{x: j - 1, y: i - 1}, {x: j, y: i - 1}, {x: j + 1, y: i - 1},
                        {x: j - 1, y: i}, {x: j + 1, y: i},
                      {x: j - 1, y: i + 1}, {x: j - 1, y: i + 1}, {x: j - 1, y: i + 1}];
  
  const yBound = newGrid.length;
  const xBound = newGrid[0].length;
  // check if the cell is a mine
  if (newGrid[i][j].cell.value === "X") {
    newGrid[i][j].cell.revealed = true;
    return { grid: newGrid, status: "gameover" }
  }

  // check if the cell has neighbours
  if (newGrid[i][j].cell.value != 0 && newGrid[i][j].cell.value != "X") {
   newGrid[i][j].cell.revealed = true;
    return { grid: newGrid, status: "inpropgress" }
  }

  // if not a mine, iterate throgh neighbours and check their bounds, value, revealed 
  // and flagged varibles
  for (let z = 0; z < neighbours.length; z++) {
    if (neighbours[z].x >= 0 && xBound < neighbours[z].x && 
        neighbours[z].y >= 0 && yBound < neighbours[z].y) {
      if (newGrid[neighbours[z].y][neighbours[z].x].cell.value === 0) {
        newGrid[neighbours[z].y][neighbours[z].x].cell.revealed = true;
        return reveal(newGrid, neighbours[z].y, neighbours[z].x);
      } else {
        newGrid[neighbours[z].y][neighbours[z].x].cell.revealed = true;
        break;
      }
    } // is it in bounds?
      
  }

  return { grid: newGrid, status: "inpropgress" }; // later gonna us it in setGrid in board component
}

export default reveal;
