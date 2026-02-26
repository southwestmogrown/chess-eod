const { expect } = require("chai");
const GameBehaviorExercises = require("./game-behavior");

describe("Starter Week 1 - OOP/TDD Exercise Lane", () => {
  describe("GameBehaviorExercises", () => {
    it("returns the invalid selection message", () => {
      const sut = new GameBehaviorExercises();
      expect(sut.getInvalidSelectionMessage()).to.equal(
        "Invalid piece selection.",
      );
    });

    it("switches turn to the other player", () => {
      const sut = new GameBehaviorExercises();
      const p1 = { name: "A" };
      const p2 = { name: "B" };

      expect(sut.getNextPlayer(p1, p1, p2)).to.equal(p2);
      expect(sut.getNextPlayer(p2, p1, p2)).to.equal(p1);
    });

    it("detects king capture correctly", () => {
      const sut = new GameBehaviorExercises();
      const king = { getSymbol: () => "k" };
      const queen = { getSymbol: () => "q" };

      expect(sut.didCaptureKing(king)).to.equal(true);
      expect(sut.didCaptureKing(queen)).to.equal(false);
      expect(sut.didCaptureKing(null)).to.equal(false);
    });
  });
});
