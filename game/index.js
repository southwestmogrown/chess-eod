let prompt = require("prompt-sync")();

const Board = require("../board");
const Screen = require("./screen");
const Cursor = require("./cursor");
const { HumanPlayer, ComputerPlayer } = require("../players");
const { AvailableMovesList, CompletedMovesList, Move } = require("../moves");

const GameStatus = {
  ACTIVE: "ACTIVE",
  BLACK_WIN: "BLACK_WIN",
  WHITE_WIN: "WHITE_WIN",
  FORFEIT: "FORFEIT",
  STALEMATE: "STALEMATE",
  RESIGNATION: "RESIGNATION",
};

class Game {
  constructor() {
    // Mode selection keeps the main game loop reusable while allowing
    // different player strategies (human vs AI) to plug into the same flow.
    const modeChoice = prompt(
      "Enter game mode (1 for single-player, 2 for two-player). ",
    );
    this.isSinglePlayer = modeChoice === "1";

    const p1Name = prompt("Player 1, please enter your name. ");
    console.log(`Welcome ${p1Name}\n`);
    const p2Name = this.isSinglePlayer
      ? "Computer"
      : prompt("Player 2, please enter your name. ");
    console.log(`Welcome ${p2Name}\n`);
    // setTimeout(() => console.log('Initializing in 3...'), 1000);
    // setTimeout(() => console.log('2...'), 2000);
    // setTimeout(() => console.log('1...'), 3000);

    setTimeout(() => {
      const chooseStarter = Math.floor(Math.random() * 2);

      if (!chooseStarter) {
        this.p1 = new HumanPlayer(p1Name, true);
        this.p2 = this.isSinglePlayer
          ? new ComputerPlayer(p2Name, false)
          : new HumanPlayer(p2Name, false);
        this.currentPlayer = this.p1;
      } else {
        this.p1 = new HumanPlayer(p1Name, false);
        this.p2 = this.isSinglePlayer
          ? new ComputerPlayer(p2Name, true)
          : new HumanPlayer(p2Name, true);
        this.currentPlayer = this.p2;
      }

      this.gameBoard = new Board();
      this.status = GameStatus.ACTIVE;
      this.completedMoves = new CompletedMovesList();

      this.cursor = new Cursor(8, 8);

      this.startingPosition = null;

      Screen.initialize(8, 8, this.gameBoard.board);
      Screen.setGridLines(true);

      Screen.setBackgroundColor(0, 0, "yellow");

      Screen.addCommand(
        "up",
        "move the cursor up",
        this.cursor.up.bind(this.cursor),
      );
      Screen.addCommand(
        "down",
        "move the cursor down",
        this.cursor.down.bind(this.cursor),
      );
      Screen.addCommand(
        "left",
        "move the cursor left",
        this.cursor.left.bind(this.cursor),
      );
      Screen.addCommand(
        "right",
        "move the cursor right",
        this.cursor.right.bind(this.cursor),
      );
      Screen.addCommand("f", "forfeit the game", this.forfeit.bind(this));
      Screen.addCommand("return", "select your move", this.select.bind(this));

      Screen.setMessage(`${this.currentPlayer.name}'s turn!`);
      Screen.render();

      this._processComputerTurn();
    }, 500);
  }

  static checkWin(endPiece, currentPlayer) {
    if (endPiece.getSymbol() === "k") {
      Game.endGame(currentPlayer);
    }
  }

  static endGame(winner) {
    Screen.setMessage(`${winner.name} wins!`);
    Screen.render();
    Screen.quit();
  }

  _clearMoveSelectionState() {
    if (this.cursor && this.cursor.getIsMoveSelection()) {
      this.cursor.setIsMoveSelection();
    }

    if (this.cursor) {
      this.cursor.currentMove = null;
    }

    this.startingPosition = null;
    Screen.availableMoves = null;
  }

  _isCoordinateInMovesList(movesList, row, col) {
    if (!movesList || !movesList.head || !movesList.length) {
      return false;
    }

    let curr = movesList.head;
    let count = 0;
    while (curr && count < movesList.length) {
      const [moveRow, moveCol] = curr.val;
      if (moveRow === row && moveCol === col) {
        return true;
      }
      curr = curr.next;
      count++;
    }

    return false;
  }

  forfeit() {
    const winner = this.currentPlayer.name === this.p1.name ? this.p2 : this.p1;
    Game.endGame(winner);
  }

  doMove(endCoords) {
    if (!this.startingPosition) {
      this._clearMoveSelectionState();
      Screen.setMessage("Select a piece first.");
      Screen.render();
      return;
    }

    const [endRow, endCol] = endCoords;
    const [startRow, startCol] = this.startingPosition;
    const board = this.gameBoard.board;
    const endPiece = board[endRow][endCol].getPiece();
    const startPiece = board[startRow][startCol].getPiece();

    if (!startPiece) {
      this._clearMoveSelectionState();
      Screen.setMessage("Select a piece first.");
      Screen.render();
      return;
    }

    if (endPiece) {
      Game.checkWin(endPiece, this.currentPlayer);
      endPiece.setCaptured();
      if (endPiece.isWhite()) {
        Screen.captures.addWhiteCapture(
          String.fromCharCode(Screen.whitePieces[endPiece.getSymbol()]),
        );
      } else {
        Screen.captures.addBlackCapture(
          String.fromCharCode(Screen.blackPieces[endPiece.getSymbol()]),
        );
      }
    }

    if (startPiece.getSymbol() === "p" && startPiece.getFirstMove()) {
      startPiece.setFirstMove();
    }

    this.completedMoves.addToTail(
      new Move(
        this.currentPlayer,
        board[startRow][startCol],
        board[endRow][endCol],
      ),
    );
    this.currentPlayer =
      this.currentPlayer.name === this.p1.name ? this.p2 : this.p1;

    board[endRow][endCol].setPiece(startPiece);
    board[startRow][startCol].setPiece(null);
    this._clearMoveSelectionState();

    Screen.setGrid(startRow, startCol, " ");
    let symbol = startPiece.getSymbol();
    symbol = startPiece.isWhite()
      ? String.fromCharCode(Screen.whitePieces[symbol])
      : String.fromCharCode(Screen.blackPieces[symbol]);
    Screen.setGrid(endRow, endCol, symbol);

    // let winner = TTT.checkWin(this.grid);
    // if (winner) return TTT.endGame(winner);

    // check for check

    // check for checkmate

    // check for castling move

    // check for promotion

    this._resetBackground(endRow, endCol);

    Screen.setMessage(`${this.currentPlayer.name}'s move!`);
    Screen.render();

    this._processComputerTurn();
  }

  _processComputerTurn() {
    if (!this.currentPlayer || this.currentPlayer.getIsHuman()) {
      return;
    }

    const selectedMove = this.currentPlayer.chooseMove(this);

    if (!selectedMove) {
      Screen.setMessage(`${this.currentPlayer.name} has no legal moves.`);
      Screen.render();
      return;
    }

    this.startingPosition = selectedMove.start;
    this.doMove(selectedMove.end);
  }

  _resetBackground(cRow, cCol) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === cRow && col === cCol) {
          continue;
        }
        Screen.setBackgroundColor(row, col, "black");
      }
    }
  }

  select() {
    const { row: cRow, col: cCol } = this.cursor.position();

    if (this.cursor.getIsMoveSelection()) {
      if (!this.startingPosition) {
        this._clearMoveSelectionState();
        Screen.setMessage("Select a piece first.");
        Screen.render();
        return;
      }

      const [startRow, startCol] = this.startingPosition;
      const startSquare = this.gameBoard.board[startRow][startCol];
      const startPiece = startSquare.getPiece();

      if (
        !startPiece ||
        startPiece.isWhite() !== this.currentPlayer.getIsWhiteSide()
      ) {
        this._clearMoveSelectionState();
        Screen.setMessage("Select a piece first.");
        Screen.render();
        return;
      }

      if (!this._isCoordinateInMovesList(Screen.availableMoves, cRow, cCol)) {
        this._clearMoveSelectionState();
        Screen.setMessage("Select a valid destination.");
        Screen.render();
        return;
      }

      this.doMove([cRow, cCol]);
    } else {
      this._resetBackground(cRow, cCol);
      const square = this.gameBoard.board[this.cursor.row][this.cursor.col];
      const piece = square.getPiece();
      if (!piece) {
        Screen.setMessage("You must select a piece.");
        Screen.render();
      } else if (piece.isWhite() !== this.currentPlayer.getIsWhiteSide()) {
        Screen.setMessage("Invalid piece selection.");
        Screen.render();
      } else {
        const movesList = this.validMoves(piece, square);
        if (!movesList.length) {
          Screen.setMessage("Cannot move this piece");
          Screen.render();
        } else {
          this.startingPosition = [cRow, cCol];
          this.chooseMove(movesList, piece);
        }
      }
    }
  }

  chooseMove(movesList, piece) {
    let curr = movesList.head;
    let count = 1;
    while (curr && count <= movesList.length) {
      const [row, col] = curr.val;
      Screen.setBackgroundColor(row, col, "green");

      curr = curr.next;
      count++;
    }
    if (!this.cursor.getIsMoveSelection()) {
      this.cursor.setIsMoveSelection();
    }

    Screen.setMessage("Where would you like to move?");
    Screen.render();
  }

  _collectValidMoves(piece, square) {
    let moves = new AvailableMovesList();
    let board = this.gameBoard.board;

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (piece.canMove(board, square, board[row][col])) {
          moves.addToTail([row, col]);
        }
      }
    }

    return moves;
  }

  validMoves(piece, square) {
    const moves = this._collectValidMoves(piece, square);
    this.cursor.currentMove = moves.head;

    Screen.availableMoves = moves;
    return moves;
  }

  getLegalMovesForPlayer(player) {
    const legalMoves = [];
    const board = this.gameBoard.board;

    // This method intentionally returns plain objects so both AI engines and
    // tests can consume the same legal-move data without screen side effects.
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const startSquare = board[row][col];
        const piece = startSquare.getPiece();

        if (!piece || piece.isWhite() !== player.getIsWhiteSide()) {
          continue;
        }

        const possibleMoves = this._collectValidMoves(piece, startSquare);
        let curr = possibleMoves.head;
        let count = 0;

        while (curr && count < possibleMoves.length) {
          const [endRow, endCol] = curr.val;
          legalMoves.push({
            start: [row, col],
            end: [endRow, endCol],
            startSquare,
            endSquare: board[endRow][endCol],
            piece,
          });
          curr = curr.next;
          count++;
        }
      }
    }

    return legalMoves;
  }
}

module.exports = Game;
