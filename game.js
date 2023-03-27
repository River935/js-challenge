class Game {
  constructor(player1Name, player2Name) {
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

  checkWin(player, x, y) {}
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

  addPiece() {}

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

function startGame() {
  // get name inputs for each player
  let playersNames = eventHandlerGetNames();

  let form = document.getElementsByTagName('form');
  console.log(form);
  form[0].style.display = 'none';

  let boardEl = document.getElementsByClassName('board');
  boardEl[0].style.display = 'flex';

  const newGame = new Game(playersNames[0], playersNames[1]);
  console.log(newGame);
  console.log(newGame.board);
  console.log(newGame.getPlayer2());
}
