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

  resetPiece() {
    (this.empty = true), (this.player = null);
  }

  checkWin(player, x, y) {
    // check vertically
    let countPlayerPieces = 0;
    for (let i = 5; i >= 0; i--) {
      if (boardPieces[x][i].getPlayer() === player) {
        countPlayerPieces++;
        if (countPlayerPieces === 4) {
          console.log('Win, ' + player);
          reset();
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

    //diagonal right to left
    let row = 5;
    for (let x = 6; x >= 3; x--) {
      for (let i = 6; i >= 0; i--) {
        if (boardPieces[i][row].getPlayer() === player) {
          countPlayerPieces++;
          if (countPlayerPieces === 4) {
            console.log('Win diagonal, ' + player);
            return;
          }
          row--;
        } else {
          countPlayerPieces = 0;
        }
      }

      row = 5;
    }

    for (let x = 0; x <= 3; x++) {
      for (let i = 0; i <= 6; i++) {
        if (boardPieces[i][row].getPlayer() === player) {
          countPlayerPieces++;
          if (countPlayerPieces === 4) {
            console.log('Win diagonal, ' + player);
            return;
          }
          row--;
        } else {
          countPlayerPieces = 0;
        }
      }
    }
  }
}

function reset() {
  boardPieces.forEach((col, i) => {
    col.forEach((row, p) => {
      row.resetPiece();
      let pieceElement = document.getElementById(`${i}.${p}`);

      pieceElement.style.backgroundColor = 'white';
    });
  });
  console.log(boardPieces);
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

const player1 = 'red';
const player2 = 'yellow';
let currentPlayerTurn = player1;

function addPieceToBoard(event) {
  let x = event.currentTarget.id;

  for (let y = 5; y < boardPieces[x].length; y--) {
    if (y < 0) return;
    if (boardPieces[x][y].isEmpty()) {
      boardPieces[x][y].setEmpty();
      boardPieces[x][y].setPlayer(currentPlayerTurn);
      const piece = document.getElementById(`${x}.${y}`);

      piece.style.backgroundColor = currentPlayerTurn;

      // check if it is a win
      boardPieces[x][y].checkWin(currentPlayerTurn, x, y);
      currentPlayerTurn = currentPlayerTurn === player1 ? player2 : player1;
      return;
    }
  }
}

function checkIfWin(player, x) {
  // check vertically
}

/* addPieceToBoard(2, 5); // 6:5
addPieceToBoard(2, 5); // 5:5
addPieceToBoard(1, 5); // 5:4
addPieceToBoard(1, 4); // 4:5
addPieceToBoard(2, 4); // 4:4
addPieceToBoard(2, 4); // 4:3
addPieceToBoard(1, 4); // 3:5
addPieceToBoard(2, 3); // 3:4
addPieceToBoard(2, 3); // 3:3
addPieceToBoard(1, 3); // 3:2
addPieceToBoard(2, 3); // 3:2
addPieceToBoard(1, 3); // 3:2
addPieceToBoard(2, 2); // 3:2
addPieceToBoard(1, 2); // 3:2
addPieceToBoard(2, 2); // 3:2
addPieceToBoard(1, 2); // 3:2
addPieceToBoard(2, 2); // 3:2
addPieceToBoard(1, 2); // 3:2 */

addPieceToBoard(2, 3);
addPieceToBoard(1, 3);
addPieceToBoard(1, 4);
addPieceToBoard(2, 4);
addPieceToBoard(1, 4);
addPieceToBoard(2, 5);
addPieceToBoard(2, 5);
addPieceToBoard(2, 5);
addPieceToBoard(1, 5);
addPieceToBoard(2, 6);
addPieceToBoard(2, 6);
addPieceToBoard(1, 6);
addPieceToBoard(2, 6);
addPieceToBoard(1, 6);

// console.log(boardPieces);
