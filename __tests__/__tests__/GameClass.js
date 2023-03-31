const myGame = require('../game.js');

// to be able to run this tests you need to comment in the line 306 to 317 of game.js file

const { Game, Board, Pieces, Player } = myGame;

describe('Game class', () => {
  // Arrange
  let newGame;
  beforeEach(() => {
    newGame = new Game('Tiago', 'Chiara');
  });

  test('should create a new game instance', () => {
    expect(newGame).toBeInstanceOf(Game);
  });

  test('should have two player properties that are a instance of Player()', () => {
    expect(newGame.player1).toBeInstanceOf(Player);
    expect(newGame.player2).toBeInstanceOf(Player);
  });

  test('should have a board property that is an instance of Board()', () => {
    expect(newGame.board).toBeInstanceOf(Board);
  });

  test('should have a playerTurn property that has the value of the property Player1', () => {
    expect(newGame.playerTurn).toBe(newGame.player1);
  });

  test('should have a rounds property that has the value of 0 at start', () => {
    expect(newGame.rounds).toBe(0);
  });

  test('should have a getPlayer1() method that returns the value of the player1 property', () => {
    expect(newGame.getPlayer1()).toBe(newGame.player1);
  });

  /*  test('should return a draw if there are no winners and all slots are filled', () => {
    // setup
    const player1 = newGame.getPlayer1();
    const player2 = newGame.getPlayer2();

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (j % 2 === 0) {
          console.log(newGame.board.boardPieces[i][j]);
          newGame.board.boardPieces[i][j].setPlayer(player1);
          console.log(newGame.board.boardPieces[i][j].player);
        } else {
          newGame.board.boardPieces[i][j].setPlayer(player2);
          console.log(newGame.board.boardPieces[i][j].player);
        }
      }
    }

    // execute

  }); */
});
