const { expect } = require("chai");
const Board = require("../board");
const Screen = require("../game/screen");
const { Rook, King, Pawn, Queen } = require("../pieces");
const { ComputerPlayer } = require("../players");

function loadGameWithPromptResponses(responses) {
  const gamePath = require.resolve("../game");
  const promptSyncPath = require.resolve("prompt-sync");

  const originalGameCache = require.cache[gamePath];
  const originalPromptSyncCache = require.cache[promptSyncPath];

  let index = 0;
  require.cache[promptSyncPath] = {
    id: promptSyncPath,
    filename: promptSyncPath,
    loaded: true,
    exports: () => () => responses[index++],
  };

  delete require.cache[gamePath];
  const Game = require("../game");

  return {
    Game,
    restore: () => {
      if (originalPromptSyncCache) {
        require.cache[promptSyncPath] = originalPromptSyncCache;
      } else {
        delete require.cache[promptSyncPath];
      }

      if (originalGameCache) {
        require.cache[gamePath] = originalGameCache;
      } else {
        delete require.cache[gamePath];
      }
    },
  };
}

describe("The Game Class", () => {
  describe("game flow integration", () => {
    it("should start a game and end it through forfeit", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);

      const originalSetTimeout = global.setTimeout;
      const originalMathRandom = Math.random;
      const originalInitialize = Screen.initialize;
      const originalSetGridLines = Screen.setGridLines;
      const originalSetBackgroundColor = Screen.setBackgroundColor;
      const originalAddCommand = Screen.addCommand;
      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;
      const originalQuit = Screen.quit;

      const commands = {};
      const messages = [];
      let quitCalled = false;

      try {
        global.setTimeout = (fn) => fn();
        Math.random = () => 0;

        Screen.initialize = () => {};
        Screen.setGridLines = () => {};
        Screen.setBackgroundColor = () => {};
        Screen.addCommand = (key, description, action) => {
          commands[key] = action;
        };
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};
        Screen.quit = () => {
          quitCalled = true;
        };

        const game = new Game();

        expect(game.p1.name).to.equal("Alice");
        expect(game.p2.name).to.equal("Bob");
        expect(game.currentPlayer).to.equal(game.p1);
        expect(commands).to.have.property("f");

        commands.f();

        expect(messages[messages.length - 1]).to.equal("Bob wins!");
        expect(quitCalled).to.be.true;
      } finally {
        global.setTimeout = originalSetTimeout;
        Math.random = originalMathRandom;
        Screen.initialize = originalInitialize;
        Screen.setGridLines = originalSetGridLines;
        Screen.setBackgroundColor = originalSetBackgroundColor;
        Screen.addCommand = originalAddCommand;
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        Screen.quit = originalQuit;
        restore();
      }
    });

    it("should reject moves that attempt to capture a king", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);
      const game = Object.create(Game.prototype);

      const boardObj = new Board();
      const board = boardObj.generateTestBoard();
      board[0][0].setPiece(new Rook(true));
      board[0][1].setPiece(new King(false));
      board[7][4].setPiece(new King(true));

      game.gameBoard = { board };
      game.startingPosition = [0, 0];
      game.currentPlayer = {
        name: "Alice",
        getIsWhiteSide: () => true,
      };
      game.p1 = { name: "Alice" };
      game.p2 = { name: "Bob" };
      let isMoveSelection = true;
      game.cursor = {
        getIsMoveSelection: () => isMoveSelection,
        setIsMoveSelection: () => {
          isMoveSelection = !isMoveSelection;
        },
      };

      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;
      const originalQuit = Screen.quit;

      const messages = [];
      let quitCalled = false;

      try {
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};
        Screen.quit = () => {
          quitCalled = true;
        };

        expect(() => game.doMove([0, 1])).to.not.throw();
        expect(messages[messages.length - 1]).to.equal(
          "Select a valid destination.",
        );
        expect(quitCalled).to.be.false;
        expect(board[0][0].getPiece()).to.be.instanceOf(Rook);
        expect(board[0][1].getPiece()).to.be.instanceOf(King);
      } finally {
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        Screen.quit = originalQuit;
        restore();
      }
    });

    it("should notify when the next player is in check", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);
      const game = Object.create(Game.prototype);

      const boardObj = new Board();
      const board = boardObj.generateTestBoard();
      board[7][4].setPiece(new King(true));
      board[0][4].setPiece(new King(false));
      board[1][0].setPiece(new Rook(true));

      game.gameBoard = { board };
      game.startingPosition = [1, 0];
      game.currentPlayer = {
        name: "Alice",
        getIsWhiteSide: () => true,
        getIsHuman: () => true,
      };
      game.p1 = game.currentPlayer;
      game.p2 = {
        name: "Bob",
        getIsWhiteSide: () => false,
        getIsHuman: () => true,
      };
      game.completedMoves = { addToTail: () => {} };
      game.cursor = {
        getIsMoveSelection: () => false,
        setIsMoveSelection: () => {},
      };

      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;
      const originalSetGrid = Screen.setGrid;
      const originalSetBackgroundColor = Screen.setBackgroundColor;

      const messages = [];

      try {
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};
        Screen.setGrid = () => {};
        Screen.setBackgroundColor = () => {};

        game.doMove([1, 4]);

        expect(messages[messages.length - 1]).to.equal(
          "Check on Bob! Bob's move!",
        );
      } finally {
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        Screen.setGrid = originalSetGrid;
        Screen.setBackgroundColor = originalSetBackgroundColor;
        restore();
      }
    });

    it("should end the game on checkmate and declare the winner", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);
      const game = Object.create(Game.prototype);

      const boardObj = new Board();
      const board = boardObj.generateTestBoard();
      board[2][2].setPiece(new King(true));
      board[2][1].setPiece(new Queen(true));
      board[0][0].setPiece(new King(false));

      game.gameBoard = { board };
      game.startingPosition = [2, 1];
      game.currentPlayer = {
        name: "Alice",
        getIsWhiteSide: () => true,
        getIsHuman: () => true,
      };
      game.p1 = game.currentPlayer;
      game.p2 = {
        name: "Bob",
        getIsWhiteSide: () => false,
        getIsHuman: () => true,
      };
      game.completedMoves = { addToTail: () => {} };
      game.cursor = {
        getIsMoveSelection: () => false,
        setIsMoveSelection: () => {},
      };

      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;
      const originalSetGrid = Screen.setGrid;
      const originalSetBackgroundColor = Screen.setBackgroundColor;
      const originalQuit = Screen.quit;

      const messages = [];
      let quitCalled = false;

      try {
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};
        Screen.setGrid = () => {};
        Screen.setBackgroundColor = () => {};
        Screen.quit = () => {
          quitCalled = true;
        };

        game.doMove([1, 1]);

        expect(quitCalled).to.equal(true);
        expect(messages[messages.length - 1]).to.equal(
          "Checkmate! Alice wins!",
        );
      } finally {
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        Screen.setGrid = originalSetGrid;
        Screen.setBackgroundColor = originalSetBackgroundColor;
        Screen.quit = originalQuit;
        restore();
      }
    });

    it("should recover from invalid piece selection to valid move selection", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);
      const game = Object.create(Game.prototype);

      const boardObj = new Board();
      const board = boardObj.generateTestBoard();
      board[0][0].setPiece(new Pawn(false));
      board[1][1].setPiece(new Pawn(true));

      game.gameBoard = { board };
      game.currentPlayer = {
        getIsWhiteSide: () => true,
      };

      const cursorState = { row: 0, col: 0 };
      game.cursor = {
        getIsMoveSelection: () => false,
        position: () => ({ row: cursorState.row, col: cursorState.col }),
        get row() {
          return cursorState.row;
        },
        get col() {
          return cursorState.col;
        },
      };

      const messages = [];
      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;
      let chooseMoveCalled = false;
      let chosenPiece = null;

      game._resetBackground = () => {};
      game.validMoves = () => ({ length: 1, head: { val: [2, 1] } });
      game.chooseMove = (movesList, piece) => {
        chooseMoveCalled = true;
        chosenPiece = piece;
      };

      try {
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};

        game.select();
        expect(messages[messages.length - 1]).to.equal(
          "Invalid piece selection.",
        );
        expect(chooseMoveCalled).to.be.false;

        cursorState.row = 1;
        cursorState.col = 1;
        game.select();

        expect(chooseMoveCalled).to.be.true;
        expect(chosenPiece).to.equal(board[1][1].getPiece());
        expect(game.startingPosition).to.eql([1, 1]);
      } finally {
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        restore();
      }
    });

    it("should create a ComputerPlayer in single-player mode", () => {
      const { Game, restore } = loadGameWithPromptResponses(["1", "Alice"]);

      const originalSetTimeout = global.setTimeout;
      const originalMathRandom = Math.random;
      const originalInitialize = Screen.initialize;
      const originalSetGridLines = Screen.setGridLines;
      const originalSetBackgroundColor = Screen.setBackgroundColor;
      const originalAddCommand = Screen.addCommand;
      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;

      try {
        global.setTimeout = (fn) => fn();
        Math.random = () => 0;
        Screen.initialize = () => {};
        Screen.setGridLines = () => {};
        Screen.setBackgroundColor = () => {};
        Screen.addCommand = () => {};
        Screen.setMessage = () => {};
        Screen.render = () => {};

        const game = new Game();
        expect(game.isSinglePlayer).to.equal(true);
        expect(game.p2).to.be.instanceOf(ComputerPlayer);
      } finally {
        global.setTimeout = originalSetTimeout;
        Math.random = originalMathRandom;
        Screen.initialize = originalInitialize;
        Screen.setGridLines = originalSetGridLines;
        Screen.setBackgroundColor = originalSetBackgroundColor;
        Screen.addCommand = originalAddCommand;
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        restore();
      }
    });

    it("should automatically process an AI turn when the computer starts", () => {
      const { Game, restore } = loadGameWithPromptResponses(["1", "Alice"]);

      const originalSetTimeout = global.setTimeout;
      const originalMathRandom = Math.random;
      const originalInitialize = Screen.initialize;
      const originalSetGridLines = Screen.setGridLines;
      const originalSetBackgroundColor = Screen.setBackgroundColor;
      const originalAddCommand = Screen.addCommand;
      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;

      const messages = [];

      try {
        global.setTimeout = (fn) => fn();
        Math.random = () => 1;
        Screen.initialize = () => {};
        Screen.setGridLines = () => {};
        Screen.setBackgroundColor = () => {};
        Screen.addCommand = () => {};
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};

        const game = new Game();

        expect(messages[messages.length - 1]).to.equal("Alice's move!");
        expect(game.currentPlayer.name).to.equal("Alice");
        expect(game.cursor.getIsMoveSelection()).to.equal(false);
      } finally {
        global.setTimeout = originalSetTimeout;
        Math.random = originalMathRandom;
        Screen.initialize = originalInitialize;
        Screen.setGridLines = originalSetGridLines;
        Screen.setBackgroundColor = originalSetBackgroundColor;
        Screen.addCommand = originalAddCommand;
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        restore();
      }
    });

    it("should show a thinking message before a delayed AI move", () => {
      const { Game, restore } = loadGameWithPromptResponses(["1", "Alice"]);

      const originalSetTimeout = global.setTimeout;
      const originalMathRandom = Math.random;
      const originalInitialize = Screen.initialize;
      const originalSetGridLines = Screen.setGridLines;
      const originalSetBackgroundColor = Screen.setBackgroundColor;
      const originalAddCommand = Screen.addCommand;
      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;

      const messages = [];
      const scheduledCallbacks = [];

      try {
        global.setTimeout = (fn) => {
          scheduledCallbacks.push(fn);
          return scheduledCallbacks.length;
        };
        Math.random = () => 1;
        Screen.initialize = () => {};
        Screen.setGridLines = () => {};
        Screen.setBackgroundColor = () => {};
        Screen.addCommand = () => {};
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};

        const game = new Game();

        expect(scheduledCallbacks.length).to.equal(1);
        scheduledCallbacks.shift()();

        expect(messages[messages.length - 1]).to.equal(
          "Computer is thinking...",
        );
        expect(scheduledCallbacks.length).to.equal(1);

        scheduledCallbacks.shift()();

        expect(messages[messages.length - 1]).to.equal("Alice's move!");
        expect(game.currentPlayer.name).to.equal("Alice");
      } finally {
        global.setTimeout = originalSetTimeout;
        Math.random = originalMathRandom;
        Screen.initialize = originalInitialize;
        Screen.setGridLines = originalSetGridLines;
        Screen.setBackgroundColor = originalSetBackgroundColor;
        Screen.addCommand = originalAddCommand;
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        restore();
      }
    });

    it("should restore cursor highlight after move background reset", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);
      const game = Object.create(Game.prototype);

      game.gameBoard = new Board();
      game.startingPosition = [6, 0];
      game.currentPlayer = {
        name: "Alice",
        getIsWhiteSide: () => true,
        getIsHuman: () => true,
      };
      game.p1 = game.currentPlayer;
      game.p2 = {
        name: "Bob",
        getIsWhiteSide: () => false,
        getIsHuman: () => true,
      };
      game.completedMoves = { addToTail: () => {} };
      game.cursor = {
        position: () => ({ row: 0, col: 0 }),
        getIsMoveSelection: () => false,
        setIsMoveSelection: () => {},
        currentMove: null,
      };

      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;
      const originalSetGrid = Screen.setGrid;
      const originalSetBackgroundColor = Screen.setBackgroundColor;

      const colorCalls = [];

      try {
        Screen.setMessage = () => {};
        Screen.render = () => {};
        Screen.setGrid = () => {};
        Screen.setBackgroundColor = (row, col, color) => {
          colorCalls.push({ row, col, color });
        };

        game.doMove([5, 0]);

        const cursorCellCalls = colorCalls.filter(
          (call) => call.row === 0 && call.col === 0,
        );
        expect(cursorCellCalls.length).to.be.greaterThan(0);
        expect(cursorCellCalls[cursorCellCalls.length - 1].color).to.equal(
          "yellow",
        );
      } finally {
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        Screen.setGrid = originalSetGrid;
        Screen.setBackgroundColor = originalSetBackgroundColor;
        restore();
      }
    });

    it("should safely handle doMove when no valid starting piece is selected", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);
      const game = Object.create(Game.prototype);

      const boardObj = new Board();
      game.gameBoard = { board: boardObj.generateTestBoard() };
      game.startingPosition = [0, 0];

      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;

      const messages = [];

      try {
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};

        expect(() => game.doMove([0, 1])).to.not.throw();
        expect(messages[messages.length - 1]).to.equal("Select a piece first.");
      } finally {
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        restore();
      }
    });

    it("should not generate a forward capture move for a pawn in game flow", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);
      const game = Object.create(Game.prototype);

      const boardObj = new Board();
      const board = boardObj.generateTestBoard();

      const blackPawn = new Pawn(false);
      const whitePawn = new Pawn(true);
      const whiteQueen = {
        isWhite: () => true,
        getSymbol: () => "q",
      };

      board[1][3].setPiece(blackPawn);
      board[2][3].setPiece(whiteQueen);
      board[2][2].setPiece(whitePawn);

      game.gameBoard = { board };
      game.cursor = { currentMove: null };

      try {
        const movesList = game.validMoves(blackPawn, board[1][3]);
        const generatedMoves = [];

        let curr = movesList.head;
        let count = 0;
        while (curr && count < movesList.length) {
          generatedMoves.push(curr.val.join(","));
          curr = curr.next;
          count++;
        }

        expect(generatedMoves).to.include("2,2");
        expect(generatedMoves).to.not.include("2,3");
      } finally {
        restore();
      }
    });

    it("should clear stale move-selection state when starting piece no longer exists", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);
      const game = Object.create(Game.prototype);

      const boardObj = new Board();
      game.gameBoard = { board: boardObj.generateTestBoard() };
      game.startingPosition = [0, 0];
      game.currentPlayer = { getIsWhiteSide: () => true };

      let isMoveSelection = true;
      game.cursor = {
        position: () => ({ row: 0, col: 0 }),
        getIsMoveSelection: () => isMoveSelection,
        setIsMoveSelection: () => {
          isMoveSelection = !isMoveSelection;
        },
        currentMove: { val: [0, 0], next: null },
      };

      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;
      const messages = [];

      try {
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};

        game.select();

        expect(isMoveSelection).to.equal(false);
        expect(game.startingPosition).to.equal(null);
        expect(messages[messages.length - 1]).to.equal("Select a piece first.");
      } finally {
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        restore();
      }
    });

    it("should reject stale destination coordinates not in available moves", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Alice",
        "Bob",
      ]);
      const game = Object.create(Game.prototype);

      const boardObj = new Board();
      const board = boardObj.generateTestBoard();
      const whitePawn = new Pawn(true);
      board[6][0].setPiece(whitePawn);

      game.gameBoard = { board };
      game.startingPosition = [6, 0];
      game.currentPlayer = { getIsWhiteSide: () => true };

      let isMoveSelection = true;
      game.cursor = {
        position: () => ({ row: 4, col: 4 }),
        getIsMoveSelection: () => isMoveSelection,
        setIsMoveSelection: () => {
          isMoveSelection = !isMoveSelection;
        },
        currentMove: { val: [5, 0], next: null },
      };

      Screen.availableMoves = {
        head: { val: [5, 0], next: null },
        length: 1,
      };

      let doMoveCalled = false;
      game.doMove = () => {
        doMoveCalled = true;
      };

      const originalSetMessage = Screen.setMessage;
      const originalRender = Screen.render;
      const messages = [];

      try {
        Screen.setMessage = (msg) => messages.push(msg);
        Screen.render = () => {};

        game.select();

        expect(doMoveCalled).to.equal(false);
        expect(isMoveSelection).to.equal(false);
        expect(game.startingPosition).to.equal(null);
        expect(messages[messages.length - 1]).to.equal(
          "Select a valid destination.",
        );
      } finally {
        Screen.setMessage = originalSetMessage;
        Screen.render = originalRender;
        restore();
      }
    });
  });

  describe("the forfeit() method", () => {
    it("should award the win to the non-current player at the moment forfeit is called", () => {
      const { Game, restore } = loadGameWithPromptResponses([
        "2",
        "Player 1",
        "Player 2",
      ]);
      const game = Object.create(Game.prototype);
      game.p1 = { name: "Player 1" };
      game.p2 = { name: "Player 2" };

      let winner;
      const originalEndGame = Game.endGame;
      Game.endGame = (player) => (winner = player);

      try {
        game.currentPlayer = game.p1;
        game.forfeit();
        expect(winner).to.equal(game.p2);

        game.currentPlayer = game.p2;
        game.forfeit();
        expect(winner).to.equal(game.p1);
      } finally {
        Game.endGame = originalEndGame;
        restore();
      }
    });
  });
});
