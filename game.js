class Game {
  constructor(player1Name = '', player2Name = '') {
    this.board = new Board();
    this.player1 = new Player(player1Name, 'red');
    this.player2 = new Player(player2Name, 'yellow');
    this.playerTurn = this.player1;
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
      console.log('draw');
      game.displayWinner('draw');
      return;
    }
    // check vertically
    let countPlayerPieces = 0;
    for (let i = 5; i >= 0; i--) {
      if (game.board.boardPieces[x][i].getPlayer() === player) {
        countPlayerPieces++;
        if (countPlayerPieces === 4) {
          game.displayWinner('winner');
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
          game.displayWinner('winner');
          return;
        }
      } else {
        countPlayerPieces = 0;
      }
    }
    // check diagonally

    //check diagonal right to left
    for (let i = 6; i >= 3; i--) {
      for (let j = 5; j >= 3; j--) {
        if (game.board.boardPieces[i][j].getPlayer() === player) {
          if (
            game.board.boardPieces[i - 1][j - 1].getPlayer() === player &&
            game.board.boardPieces[i - 2][j - 2].getPlayer() === player &&
            game.board.boardPieces[i - 3][j - 3].getPlayer() === player
          ) {
            game.displayWinner('winner');
            return;
          }
        }
      }
    }
    //check left to right
    for (let i = 0; i <= 3; i++) {
      for (let j = 5; j >= 3; j--) {
        if (game.board.boardPieces[i][j].getPlayer() === player) {
          if (
            game.board.boardPieces[i + 1][j - 1].getPlayer() === player &&
            game.board.boardPieces[i + 2][j - 2].getPlayer() === player &&
            game.board.boardPieces[i + 3][j - 3].getPlayer() === player
          ) {
            game.displayWinner('winner');
            return;
          }
        }
      }
    }
  }

  // display winner
  displayWinner(result) {
    let winnerContainer = document.getElementsByClassName('board__winner');
    let winnerName = document.getElementsByClassName('board__winner-name');
    //console.log(winnerName[0]);
    winnerContainer[0].style.display = 'block';
    if (result === 'winner') {
      winnerName[0].innerHTML = ` Player ${game
        .getPlayerTurn()
        .getName()} won!! `;
      game.getPlayerTurn().setWins();
      if (game.getPlayerTurn() === game.getPlayer1()) {
        console.log('player1 wins', game.getPlayer1().getWins());
        let player1Wins = document.getElementById('player1Wins');
        player1Wins.innerHTML = game.getPlayer1().getWins();
      } else {
        let player2Wins = document.getElementById('player2Wins');
        player2Wins.innerHTML = game.getPlayer2().getWins();
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
    game.board.resetBoard();
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
      //console.log('here', game.board.boardPieces[x][y]);
      if (game.board.boardPieces[x][y].isEmpty()) {
        game.board.boardPieces[x][y].setEmpty();
        game.board.boardPieces[x][y].setPlayer(currentPlayerTurn);
        const piece = document.getElementById(`${x}.${y}`);
        //console.log(currentPlayerTurn);

        piece.style.backgroundColor = currentPlayerTurn.color;

        // check if it is a win

        game.setRounds();
        game.checkWin(currentPlayerTurn, x, y);
        game.setPlayerTurn();
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
    return this.wins;
  }

  setWins() {
    this.wins++;
  }
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

  let player1Wins = document.getElementById('player1Wins');
  player1Wins.innerHTML = game.player1.getWins();
  let player2Wins = document.getElementById('player2Wins');
  player2Wins.innerHTML = game.player2.getWins();
}

function addPieceEventHandler(event) {
  game.board.addPiece(event);
}

function eventHandlerGetNames() {
  event.preventDefault();
  let player1 = event.target[0].value;
  let player2 = event.target[1].value;
  return [player1, player2];
}
