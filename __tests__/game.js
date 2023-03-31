class Game {
  constructor(player1Name = '', player2Name = '') {
    this.board = new Board();
    this.player1 = new Player(player1Name, 'red');
    this.player2 = new Player(player2Name, 'yellow');
    this.playerTurn = {};

    this.rounds = 0;
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

  setFirstPlayerTurn() {
    this.playerTurn =
      Math.floor(Math.random() * 2) === 0 ? this.player1 : this.player2;
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
      this.displayWinner('draw');
      return "It's a draw";
    }

    if (
      this.checkVerticalWin(player, x, y) ||
      this.checkHorizontalWin(player, x, y) ||
      this.checkDiagonalWin(player, x, y)
    ) {
      this.displayWinner('winner');
    }
    return;
  }

  checkVerticalWin(player, x, y) {
    let countPieces = 0;
    for (let i = 5; i >= 0; i--) {
      if (this.board.getPiece(x, i).getPlayer() === player) {
        countPieces++;
        if (countPieces === 4) {
          return true;
        }
      } else {
        countPieces = 0;
      }
    }
    return false;
  }

  checkHorizontalWin(player, x, y) {
    let countPieces = 0;
    for (let j = 6; j >= 0; j--) {
      if (this.board.getPiece(j, y).getPlayer() === player) {
        countPieces++;
        if (countPieces === 4) {
          return true;
        }
      } else {
        countPieces = 0;
      }
    }
    return false;
  }

  checkDiagonalWin(player, x, y) {
    return (
      this.checkRightToLeftDiagonalWin(player, x, y) ||
      this.checkLeftToRightDiagonalWin(player, x, y)
    );
  }

  checkRightToLeftDiagonalWin(player, x, y) {
    for (let i = 6; i >= 3; i--) {
      for (let j = 5; j >= 3; j--) {
        if (
          this.board.getPiece(i, j).getPlayer() === player &&
          this.board.getPiece(i - 1, j - 1).getPlayer() === player &&
          this.board.getPiece(i - 2, j - 2).getPlayer() === player &&
          this.board.getPiece(i - 3, j - 3).getPlayer() === player
        ) {
          return true;
        }
      }
    }
    return false;
  }

  checkLeftToRightDiagonalWin(player, x, y) {
    for (let i = 0; i <= 3; i++) {
      for (let j = 5; j >= 3; j--) {
        if (
          this.board.getPiece(i, j).getPlayer() === player &&
          this.board.getPiece(i + 1, j - 1).getPlayer() === player &&
          this.board.getPiece(i + 2, j - 2).getPlayer() === player &&
          this.board.getPiece(i + 3, j - 3).getPlayer() === player
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // display winner
  displayWinner(result) {
    let winnerContainer = document.getElementsByClassName('board__winner');
    let winnerName = document.getElementsByClassName('board__winner-name');

    winnerContainer[0].style.display = 'block';
    if (result === 'winner') {
      winnerName[0].innerHTML = ` Player ${this.getPlayerTurn().getName()} won!! `;
      celebrate();
      this.getPlayerTurn().setWins();
      if (this.getPlayerTurn() === this.getPlayer1()) {
        let player1Wins = document.getElementById('player1Wins');
        player1Wins.innerHTML = this.getPlayer1().getWins();
      } else {
        let player2Wins = document.getElementById('player2Wins');
        player2Wins.innerHTML = this.getPlayer2().getWins();
      }
    } else if (result === 'draw') {
      winnerName[0].innerHTML = ` it´s a draw!!! `;
    }
    let btnRestart = document.getElementById('restartGame');
    btnRestart.addEventListener('click', () => {
      this.restartGame();
    });
    let btnNextGame = document.getElementById('nextGame');
    btnNextGame.addEventListener('click', () => {
      this.nextGame();
    });
  }

  restartGame() {
    window.location.reload();
  }

  nextGame() {
    this.board.resetBoard();
    let winnerContainer = document.getElementsByClassName('board__winner');
    winnerContainer[0].style.display = 'none';
  }
}

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
    game.board.boardPieces.forEach((col, i) => {
      col.forEach((row, p) => {
        row.resetPiece();
        let pieceElement = document.getElementById(`${i}.${p}`);
        pieceElement.style.backgroundColor = 'white';
      });
    });
  }
  addPiece(event) {
    let x = event.currentTarget.id;
    let currentPlayerTurn = game.getPlayerTurn();
    for (let y = 5; y >= 0; y--) {
      if (y < 0) return;

      if (game.board.boardPieces[x][y].isEmpty()) {
        game.board.boardPieces[x][y].setEmpty();
        game.board.boardPieces[x][y].setPlayer(currentPlayerTurn);
        const piece = document.getElementById(`${x}.${y}`);

        piece.style.backgroundColor = currentPlayerTurn.color;

        // check if it is a win

        game.setRounds();
        game.checkWin(currentPlayerTurn, x, y);

        game.setPlayerTurn();
        displayCurrentPlayerTurn();
        return;
      }
    }
  }

  getPiece(x, y) {
    return this.boardPieces[x][y];
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
    return this.wins;
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

  form[0].style.display = 'none';

  let playerTurnEl = document.getElementsByClassName(
    'main__container__player-turn',
  );
  playerTurnEl[0].style.display = 'block';

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
  game.setFirstPlayerTurn();
  displayCurrentPlayerTurn();

  let player1Wins = document.getElementById('player1Wins');
  player1Wins.innerHTML = game.player1.getWins();
  let player2Wins = document.getElementById('player2Wins');
  player2Wins.innerHTML = game.player2.getWins();
}

function addPieceEventHandler(event) {
  game.board.addPiece(event);
}

//confetti
/* const canvas = document.querySelector('#confetti');
const jsConfetti = new JSConfetti();

function celebrate() {
  jsConfetti
    .addConfetti({
      emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🦄', '🌸'],
    })
    .then(() => jsConfetti.addConfetti());
} */

function displayCurrentPlayerTurn() {
  const playerTurnNameEl = document.getElementById('player-turn');
  playerTurnNameEl.innerHTML = game.getPlayerTurn().getName();
  playerTurnNameEl.style.color = game.getPlayerTurn().color;
}
module.exports = {
  Game,
  Board,
  Piece,
  Player,
};
