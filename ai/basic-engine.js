const { MoveRankingBST } = require("./move-ranking-bst");

class BasicEngine {
  constructor() {
    this.captureScores = {
      k: 100,
      q: 9,
      r: 5,
      b: 3,
      n: 3,
      p: 1,
    };
  }

  chooseMove(legalMoves) {
    if (!legalMoves || !legalMoves.length) {
      return null;
    }

    const rankedMoves = new MoveRankingBST();

    // The BST stores move candidates by score so students can inspect
    // insertion/search/traversal while building a practical game feature.
    for (let i = 0; i < legalMoves.length; i++) {
      const move = legalMoves[i];
      rankedMoves.insert(this._scoreMove(move), move);
    }

    const bestMoves = rankedMoves.getHighestRankedMoves();

    // A deterministic tie-breaker keeps tests stable and the behavior simple.
    return bestMoves[0];
  }

  _scoreMove(move) {
    const capturedPiece = move.endSquare.getPiece();

    if (!capturedPiece) {
      return 0;
    }

    return this.captureScores[capturedPiece.getSymbol()] || 0;
  }
}

module.exports = BasicEngine;
