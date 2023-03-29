const myGame = require('../game.js');

describe('Game', () => {
  const game = new myGame.Game();
  it('should create a new game instance', () => {
    expect(game).toBeInstanceOf(myGame.Game);
  });

  it('should have two player properties that are a instance of Player()', () => {
    expect(game.player1).toBeInstanceOf(myGame.Player);
    expect(game.player2).toBeInstanceOf(myGame.Player);
  });

  it('should have a board property that is an instance of Board()', () => {
    expect(game.board).toBeInstanceOf(myGame.Board);
  });

  it('should have a playerTurn property that has the value of the property Player1', () => {
    expect(game.playerTurn).toBe(game.player1);
  });

  it('should have a rounds property that has the value of 0', () => {
    expect(game.rounds).toBe(0);
  });

  it('should have a getPlayer1() method that returns the value of the player1 property', () => {
    expect(game.getPlayer1()).toBe(game.player1);
  });

  it('should call displayWinner() with a draw when checking win at the 42nd round', () => {
    //setup
    class newGame extends myGame.Game {
      constructor() {
        super();
        this.rounds = 42;
      }
      displayWinner(result) {
        return result;
      }
    }

    const newGameObj = new newGame();

    newGameObj.checkWin(newGameObj.player1, 2, 4);
    expect(newGameObj.displayWinner).toHaveBeenCalledWith('draw');
  });
});
