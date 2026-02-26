const { expect } = require("chai");
const ComplexityDataStructuresExercises = require("./complexity-data-structures");

describe("Starter Week 2 - Big O + Early Data Structures", () => {
  describe("ComplexityDataStructuresExercises", () => {
    it("reads piece counts from a map-like object", () => {
      const sut = new ComplexityDataStructuresExercises();
      const countMap = { p: 4, q: 1 };

      expect(sut.getPieceCount(countMap, "p")).to.equal(4);
      expect(sut.getPieceCount(countMap, "r")).to.equal(0);
    });

    it("appends moves to array history and returns new length", () => {
      const sut = new ComplexityDataStructuresExercises();
      const history = [{ from: [1, 1], to: [2, 1] }];
      const nextMove = { from: [6, 6], to: [5, 6] };

      const length = sut.appendMoveHistory(history, nextMove);
      expect(length).to.equal(2);
      expect(history[1]).to.equal(nextMove);
    });

    it("converts linked list to array preserving order", () => {
      const sut = new ComplexityDataStructuresExercises();
      const head = {
        val: "move-1",
        next: {
          val: "move-2",
          next: {
            val: "move-3",
            next: null,
          },
        },
      };

      expect(sut.linkedListToArray(head)).to.eql([
        "move-1",
        "move-2",
        "move-3",
      ]);
      expect(sut.linkedListToArray(null)).to.eql([]);
    });

    it("labels full 2D board scans as O(n^2)", () => {
      const sut = new ComplexityDataStructuresExercises();
      expect(sut.getBoardScanComplexityLabel(8, 8)).to.equal("O(n^2)");
      expect(sut.getBoardScanComplexityLabel(4, 16)).to.equal("O(n^2)");
    });
  });
});
