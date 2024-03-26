interface Cell {
  value: string | number,
  x: number,
  y: number,
  flagged: boolean,
  reaveled: boolean,
}

const generateBoard = (board: Cell[][], width: number, height: number) => {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      board[i][j] = {
        value: 0,
        x: j,
        y: i,
        flagged: false,
        reaveled: false,
      }
    }
  }
}

const generateMinefield = (board: Cell[][], minesAmount: number, width: number, height: number): {x: number, y: number}[] => {
  const minefield: {x: number, y: number}[] = [];

  while (minefield.length < minesAmount) {
    const randomIndexY = Math.floor(Math.random() * height);
    const randomIndexX = Math.floor(Math.random() * width);
    const objToCheck = {x: randomIndexX, y: randomIndexY};
    
    const isInArray = minefield.some(obj => obj.x === objToCheck.x && obj.y === objToCheck.y);
    if (!isInArray) {
      minefield.push(objToCheck);
      board[randomIndexY][randomIndexX].value = "X";
      notifyNeighbours(board, {x: randomIndexX, y: randomIndexY}, width, height);
    }
  }

  return minefield;
}

const notifyNeighbours = (board: Cell[][], pos: {x: number, y: number}, maxWidth: number, maxHeight: number) => {
  const neighbours: {x: number, y: number}[] = [{x: pos.x - 1, y: pos.y - 1}, {x: pos.x, y: pos.y - 1}, {x: pos.x + 1, y: pos.y - 1},
                                                {x: pos.x - 1, y: pos.y}, {x: pos.x, y: pos.y}, {x: pos.x + 1, y: pos.y},
                                                {x: pos.x - 1, y: pos.y + 1}, {x: pos.x, y: pos.y + 1}, {x: pos.x + 1, y: pos.y + 1}];
  
  for (let i = 0; i < neighbours.length; i++) {
    const posX = neighbours[i].x;
    const posY = neighbours[i].y;
    if (posX >= 0 && posX < maxWidth &&
        posY >= 0 && posY < maxHeight && board[posY][posX].value != 'X')
          board[posY][posX].value += 1; // stfu i checked if it is a number
  }
}

const createBoard = (width: number, height: number, minesAmount: number) => {
  const board: Cell[][] = new Array(height);

  for (let i = 0; i < height; i++) {
    board[i] = new Array(width);
  }
  
  generateBoard(board, width, height);

  const minesPositions: {x: number, y: number}[] = generateMinefield(board, minesAmount, width, height);

  return {board, minesPositions}
}

export default createBoard;
