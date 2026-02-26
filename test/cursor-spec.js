const { expect } = require("chai");

const Cursor = require("../game/cursor");
const Screen = require("../game/screen");

describe("The Cursor class", () => {
  let originalAddCommand;
  let originalSetBackgroundColor;
  let originalRender;

  beforeEach(() => {
    originalAddCommand = Screen.addCommand;
    originalSetBackgroundColor = Screen.setBackgroundColor;
    originalRender = Screen.render;

    Screen.addCommand = () => {};
    Screen.setBackgroundColor = () => {};
    Screen.render = () => {};
    Screen.availableMoves = null;
  });

  afterEach(() => {
    Screen.addCommand = originalAddCommand;
    Screen.setBackgroundColor = originalSetBackgroundColor;
    Screen.render = originalRender;
    Screen.availableMoves = null;
  });

  describe("the selectMove() method", () => {
    it("should return safely when there is no current move and no available moves", () => {
      const cursor = new Cursor(8, 8);

      expect(() => cursor.selectMove()).to.not.throw();
      expect(cursor.row).to.equal(0);
      expect(cursor.col).to.equal(0);
      expect(cursor.currentMove).to.equal(null);
    });

    it("should start from available move head and wrap to head after reaching tail", () => {
      const firstMove = { val: [2, 3], next: null };
      const secondMove = { val: [4, 5], next: null };
      firstMove.next = secondMove;

      Screen.availableMoves = { head: firstMove };

      const cursor = new Cursor(8, 8);

      cursor.selectMove();
      expect(cursor.row).to.equal(2);
      expect(cursor.col).to.equal(3);
      expect(cursor.currentMove).to.equal(secondMove);

      cursor.selectMove();
      expect(cursor.row).to.equal(4);
      expect(cursor.col).to.equal(5);
      expect(cursor.currentMove).to.equal(firstMove);
    });
  });
});
