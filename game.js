class Game {
  constructor(player1Name = '', player2Name = '') {
    this.board = new Board();
    this.player1 = new Player(player1Name, 'red');
    this.player2 = new Player(player2Name, 'yellow');
    this.playerTurn = this.player1;
    this.rounds = 0;
    this.winners = [];
  }

  // add players based on input
  getPlayer1() {
    return this.player1;
  }

  getPlayer2() {
    return this.player2;
  }

  getPlayerTurn() {
    return this.playerTurn;
  }

  setPlayerTurn() {
    this.playerTurn =
      this.playerTurn === this.player1 ? this.player2 : this.player1;
  }

  setRounds() {
    this.rounds++;
  }

  getRounds() {
    return this.rounds;
  }

  checkWin(player, x, y) {
    if (this.rounds === 42) {
      //console.log('draw');
      return;
    }
    // check vertically
    let countPlayerPieces = 0;
    for (let i = 5; i >= 0; i--) {
      if (game.board.boardPieces[x][i].getPlayer() === player) {
        countPlayerPieces++;
        if (countPlayerPieces === 4) {
          game.displayWinner();

          return;
        }
      } else {
        countPlayerPieces = 0;
      }
    }

    // check horizontally
    countPlayerPieces = 0;
    for (let j = 6; j >= 0; j--) {
      if (game.board.boardPieces[j][y].getPlayer() === player) {
        countPlayerPieces++;
        if (countPlayerPieces === 4) {
          game.displayWinner();
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
    for (let x = 6; x >= 0; x--) {
      for (let i = 6; i >= 0; i--) {
        console.log(game.board.boardPieces[i][row], i, row);
        if (game.board.boardPieces[i][row].getPlayer() === player) {
          countPlayerPieces++;
          //console.log(player);
          if (countPlayerPieces === 4) {
            game.displayWinner();
            return;
          }
          row--;
        } else {
          countPlayerPieces = 0;
        }
      }
    }

    row = 5;

    for (let x = 0; x <= 6; x++) {
      for (let i = 0; i <= 6; i++) {
        if (game.board.boardPieces[i][row].getPlayer() === player) {
          countPlayerPieces++;
          if (countPlayerPieces === 4) {
            game.displayWinner();
            return;
          }
          row--;
        } else {
          countPlayerPieces = 0;
        }
      }
    }
  }

  displayWinner() {
    let winnerContainer = document.getElementsByClassName('board__winner');
    let winnerName = document.getElementsByClassName('board__winner-name');
    //console.log(winnerName[0]);
    winnerContainer[0].style.display = 'block';
    winnerName[0].innerHTML = ` Player ${game
      .getPlayerTurn()
      .getName()} won!! `;
  }
}

// on start game
class Board {
  constructor() {
    this.boardPieces = [];
    this.createBoard();
  }
  createBoard() {
    for (let x = 0; x < 7; x++) {
      this.boardPieces[x] = [];
      for (let y = 0; y < 6; y++) {
        this.boardPieces[x][y] = new Piece(x, y);
      }
    }
  }

  resetBoard() {
    // this.boardPieces = [];

    game.board.boardPieces.forEach((col, i) => {
      col.forEach((row, p) => {
        row.resetPiece();
        let pieceElement = document.getElementById(`${i}.${p}`);

        pieceElement.style.backgroundColor = 'white';
      });
    });
    //console.log(boardPieces);
  }
  addPiece(event) {
    let x = event.currentTarget.id;
    let currentPlayerTurn = game.getPlayerTurn();
    for (let y = 5; y >= 0; y--) {
      if (y < 0) return;
      //console.log('here', game.board.boardPieces[x][y]);
      if (game.board.boardPieces[x][y].isEmpty()) {
        game.board.boardPieces[x][y].setEmpty();
        game.board.boardPieces[x][y].setPlayer(currentPlayerTurn);
        const piece = document.getElementById(`${x}.${y}`);
        //console.log(currentPlayerTurn);

        piece.style.backgroundColor = currentPlayerTurn.color;

        // check if it is a win
        game.checkWin(currentPlayerTurn, x, y);
        game.setPlayerTurn();
        game.setRounds();
        return;
      }
    }
  }
}

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
}

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.wins = 0;
  }
  getName() {
    return this.name;
  }

  getWins() {
    return this.score;
  }

  setWins() {
    this.wins++;
  }
}

function eventHandlerGetNames() {
  event.preventDefault();
  let player1 = event.target[0].value;
  let player2 = event.target[1].value;
  return [player1, player2];
}

const game = new Game();
function startGame() {
  // get name inputs for each player
  let playersNames = eventHandlerGetNames();

  let form = document.getElementsByTagName('form');
  //console.log(form);
  form[0].style.display = 'none';

  let boardEl = document.getElementsByClassName('board');
  boardEl[0].style.display = 'flex';

  let playersEl = document.getElementsByClassName('main__container__player');
  playersEl[0].style.display = 'flex';
  playersEl[1].style.display = 'flex';
  let nameEl = document.getElementsByClassName('main__container__player-name');

  nameEl[0].innerHTML = playersNames[0];
  nameEl[1].innerHTML = playersNames[1];

  game.player1.name = playersNames[0];
  game.player2.name = playersNames[1];
}

function addPieceEventHandler(event) {
  game.board.addPiece(event);
}
