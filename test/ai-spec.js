const { expect } = require("chai");

const BasicEngine = require("../ai/basic-engine");
const { MoveRankingBST } = require("../ai/move-ranking-bst");

function buildSquare(symbol) {
  return {
    getPiece: () => {
      if (!symbol) return null;
      return {
        getSymbol: () => symbol,
      };
    },
  };
}

describe("AI data structures and engine", () => {
  describe("MoveRankingBST", () => {
    it("should store duplicate scores and retrieve highest-ranked moves", () => {
      const tree = new MoveRankingBST();
      const moveA = { id: "A" };
      const moveB = { id: "B" };
      const moveC = { id: "C" };

      tree.insert(1, moveA);
      tree.insert(5, moveB);
      tree.insert(5, moveC);

      const found = tree.search(5);
      expect(found).to.not.equal(null);
      expect(found.moves).to.eql([moveB, moveC]);
      expect(tree.getHighestRankedMoves()).to.eql([moveB, moveC]);
    });
  });

  describe("BasicEngine", () => {
    it("should prioritize capturing a higher-value piece over non-capture moves", () => {
      const engine = new BasicEngine();
      const quietMove = {
        start: [1, 1],
        end: [2, 1],
        endSquare: buildSquare(null),
      };
      const captureMove = {
        start: [3, 3],
        end: [4, 4],
        endSquare: buildSquare("q"),
      };

      const chosenMove = engine.chooseMove([quietMove, captureMove]);
      expect(chosenMove).to.equal(captureMove);
    });
  });
});
