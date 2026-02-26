const Player = require("./player");
const BasicEngine = require("../ai/basic-engine");

class ComputerPlayer extends Player {
  constructor(name, isWhiteSide, engine = new BasicEngine()) {
    super(name, isWhiteSide);
    this.isHuman = false;
    this.engine = engine;
  }

  chooseMove(game) {
    const legalMoves = game.getLegalMovesForPlayer(this);
    return this.engine.chooseMove(legalMoves);
  }
}

module.exports = ComputerPlayer;
