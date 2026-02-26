const Player = require("./player");
const BasicEngine = require("../ai/basic-engine");

class ComputerPlayer extends Player {
  constructor(name, isWhiteSide, engine = new BasicEngine()) {
    super(name, isWhiteSide);
    this.isHuman = false;
    // STARTER TODO (Week 3): let students inject alternate engines
    // (heuristic, random, or graph-aware) through this strategy seam.
    this.engine = engine;
  }

  chooseMove(game) {
    const legalMoves = game.getLegalMovesForPlayer(this);
    return this.engine.chooseMove(legalMoves);
  }
}

module.exports = ComputerPlayer;
