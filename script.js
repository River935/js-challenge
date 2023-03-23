class Piece {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.empty = true;
    this.player = null;
  }
  isEmpty() {
    return this.empty;
  }
  setEmpty() {
    this.empty = !this.empty;
  }

  getPlayer() {
    return this.player;
  }

  setPlayer(player) {
    this.player = player;
  }

  checkWin(player, x, y) {
    // check vertically
    let countPlayerPieces = 0;
    for (let i = 5; i >= 0; i--) {
      if (boardPieces[x][i].getPlayer() === player) {
        countPlayerPieces++;
        if (countPlayerPieces === 4) {
          console.log('Win, ' + player);
          return;
        }
      } else {
        countPlayerPieces = 0;
      }
    }

    // check horizontally
    countPlayerPieces = 0;
    for (let j = 6; j >= 0; j--) {
      if (boardPieces[j][y].getPlayer() === player) {
        countPlayerPieces++;
        if (countPlayerPieces === 4) {
          console.log('Win row, ' + player);
          return;
        }
      } else {
        countPlayerPieces = 0;
      }
    }
    // check diagonally
    countPlayerPieces = 0;
  }
}

function createArrBoardPieces() {
  let boardPieces = new Array(7);
  for (let i = 0; i < boardPieces.length; i++) {
    boardPieces[i] = new Array(6);
    for (let j = 0; j < boardPieces[i].length; j++) {
      boardPieces[i][j] = new Piece(i, j);
    }
  }
  return boardPieces;
}

const boardPieces = createArrBoardPieces();

function addPieceToBoard(player, x) {
  for (let y = 5; y < boardPieces[x].length; y--) {
    if (boardPieces[x][y].isEmpty()) {
      boardPieces[x][y].setEmpty();
      boardPieces[x][y].setPlayer(player);
      // check if it is a win
      boardPieces[x][y].checkWin(player, x, y);
      return;
    }
  }
}

function checkIfWin(player, x) {
  // check vertically
}

addPieceToBoard(1, 6);
addPieceToBoard(2, 5);
addPieceToBoard(1, 4);
addPieceToBoard(1, 3);
addPieceToBoard(1, 6);
addPieceToBoard(1, 5);
addPieceToBoard(1, 4);
addPieceToBoard(1, 3);
