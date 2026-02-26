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
    // STARTER TODO (Week 1): Keep board internals black-boxed in early labs.
    // Students should work through Game/Player/Piece interfaces first.

    // Mode selection keeps the main game loop reusable while allowing
    // different player strategies (human vs AI) to plug into the same flow.
    let modeChoice = String(
      prompt("Enter game mode (1 for single-player, 2 for two-player). "),
    ).trim();
    while (modeChoice !== "1" && modeChoice !== "2") {
      modeChoice = String(
        prompt(
          "Invalid selection. Enter 1 for single-player or 2 for two-player. ",
        ),
      ).trim();
    }
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
      this.computerMoveDelayMs = 900;
      this.pendingComputerTurn = null;

      this.cursor = new Cursor(8, 8);
      this._setInitialCursorPosition();

      this.startingPosition = null;

      Screen.initialize(8, 8, this.gameBoard.board);
      this._highlightCursor();
      Screen.setGridLines(true);

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

  static endGame(winner, message = null) {
    Screen.setMessage(message || `${winner.name} wins!`);
    Screen.render();
    Screen.quit();
  }

  _otherPlayer(player) {
    return player && player.name === this.p1.name ? this.p2 : this.p1;
  }

  _findKingSquare(isWhiteSide) {
    const board = this.gameBoard.board;

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const piece = board[row][col].getPiece();
        if (
          piece &&
          piece.getSymbol() === "k" &&
          piece.isWhite() === isWhiteSide
        ) {
          return board[row][col];
        }
      }
    }

    return null;
  }

  _isSquareAttacked(targetSquare, byWhiteSide) {
    const board = this.gameBoard.board;
    const targetX = targetSquare.getX();
    const targetY = targetSquare.getY();

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const attackingSquare = board[row][col];
        const piece = attackingSquare.getPiece();

        if (!piece || piece.isWhite() !== byWhiteSide) {
          continue;
        }

        const symbol = piece.getSymbol();
        if (symbol === "k") {
          const kingX = attackingSquare.getX();
          const kingY = attackingSquare.getY();
          const xDelta = Math.abs(kingX - targetX);
          const yDelta = Math.abs(kingY - targetY);
          if (xDelta <= 1 && yDelta <= 1 && (xDelta !== 0 || yDelta !== 0)) {
            return true;
          }
          continue;
        }

        if (symbol === "p") {
          if (piece.canAttack(board, attackingSquare, targetSquare)) {
            return true;
          }
          continue;
        }

        if (piece.canMove(board, attackingSquare, targetSquare)) {
          return true;
        }
      }
    }

    return false;
  }

  _isKingInCheck(player) {
    const kingSquare = this._findKingSquare(player.getIsWhiteSide());
    if (!kingSquare) {
      return false;
    }

    return this._isSquareAttacked(kingSquare, !player.getIsWhiteSide());
  }

  _isLegalMove(startSquare, endSquare, piece) {
    const endPiece = endSquare.getPiece();
    if (endPiece && endPiece.getSymbol() === "k") {
      return false;
    }

    const board = this.gameBoard.board;
    const startX = startSquare.getX();
    const startY = startSquare.getY();
    const endX = endSquare.getX();
    const endY = endSquare.getY();

    board[endX][endY].setPiece(piece);
    board[startX][startY].setPiece(null);

    const movingPlayer = {
      getIsWhiteSide: () => piece.isWhite(),
    };
    const leavesKingInCheck = this._isKingInCheck(movingPlayer);

    board[startX][startY].setPiece(piece);
    board[endX][endY].setPiece(endPiece);

    return !leavesKingInCheck;
  }

  _evaluateCurrentPlayerState() {
    const inCheck = this._isKingInCheck(this.currentPlayer);
    const legalMoves = this.getLegalMovesForPlayer(this.currentPlayer);

    if (legalMoves.length) {
      return { ended: false, inCheck };
    }

    if (inCheck) {
      const winner = this._otherPlayer(this.currentPlayer);
      Game.endGame(winner, `Checkmate! ${winner.name} wins!`);
      return { ended: true, inCheck: true };
    }

    Screen.setMessage("Stalemate! It's a draw.");
    Screen.render();
    Screen.quit();
    return { ended: true, inCheck: false };
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
    const startSquare = board[startRow][startCol];
    const endSquare = board[endRow][endCol];
    const endPiece = board[endRow][endCol].getPiece();
    const startPiece = board[startRow][startCol].getPiece();

    if (!startPiece) {
      this._clearMoveSelectionState();
      Screen.setMessage("Select a piece first.");
      Screen.render();
      return;
    }

    if (
      startPiece.isWhite() !== this.currentPlayer.getIsWhiteSide() ||
      !startPiece.canMove(board, startSquare, endSquare) ||
      !this._isLegalMove(startSquare, endSquare, startPiece)
    ) {
      this._clearMoveSelectionState();
      Screen.setMessage("Select a valid destination.");
      Screen.render();
      return;
    }

    if (endPiece) {
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
      new Move(this.currentPlayer, startSquare, endSquare),
    );
    this.currentPlayer =
      this.currentPlayer.name === this.p1.name ? this.p2 : this.p1;

    endSquare.setPiece(startPiece);
    startSquare.setPiece(null);
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
    this._highlightCursor();

    const { ended, inCheck } = this._evaluateCurrentPlayerState();
    if (ended) {
      return;
    }

    if (inCheck) {
      Screen.setMessage(
        `Check on ${this.currentPlayer.name}! ${this.currentPlayer.name}'s move!`,
      );
    } else {
      Screen.setMessage(`${this.currentPlayer.name}'s move!`);
    }
    Screen.render();

    this._processComputerTurn();
  }

  _processComputerTurn() {
    const isHumanTurn =
      !this.currentPlayer ||
      !this.currentPlayer.getIsHuman ||
      this.currentPlayer.getIsHuman();

    if (isHumanTurn) {
      return;
    }

    // STARTER TODO (Week 1): Replace this direct call with a mockable seam
    // in tests so students can practice dependency isolation.

    if (this.pendingComputerTurn) {
      return;
    }

    Screen.setMessage(`${this.currentPlayer.name} is thinking...`);
    Screen.render();

    this.pendingComputerTurn = setTimeout(() => {
      this.pendingComputerTurn = null;

      const isHumanNow =
        !this.currentPlayer ||
        !this.currentPlayer.getIsHuman ||
        this.currentPlayer.getIsHuman();

      if (isHumanNow) {
        return;
      }

      const selectedMove = this.currentPlayer.chooseMove(this);

      if (!selectedMove) {
        this._evaluateCurrentPlayerState();
        return;
      }

      this.startingPosition = selectedMove.start;
      this.doMove(selectedMove.end);
    }, this.computerMoveDelayMs);
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

  _setInitialCursorPosition() {
    if (!this.cursor) {
      return;
    }

    const activeHuman =
      this.currentPlayer &&
      this.currentPlayer.getIsHuman &&
      this.currentPlayer.getIsHuman()
        ? this.currentPlayer
        : [this.p1, this.p2].find(
            (player) => player && player.getIsHuman && player.getIsHuman(),
          );

    if (!activeHuman) {
      return;
    }

    this.cursor.row = activeHuman.getIsWhiteSide() ? 7 : 0;
    this.cursor.col = 0;
  }

  _highlightCursor() {
    if (!this.cursor) {
      return;
    }

    const hasPositionMethod = typeof this.cursor.position === "function";
    const row = hasPositionMethod
      ? this.cursor.position().row
      : this.cursor.row;
    const col = hasPositionMethod
      ? this.cursor.position().col
      : this.cursor.col;

    if (typeof row !== "number" || typeof col !== "number") {
      return;
    }

    Screen.setBackgroundColor(row, col, "yellow");
  }

  select() {
    const isHumanTurn =
      this.currentPlayer &&
      (!this.currentPlayer.getIsHuman || this.currentPlayer.getIsHuman());

    if (!isHumanTurn) {
      Screen.setMessage(`${this.currentPlayer.name} is thinking...`);
      Screen.render();
      return;
    }

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
        const endSquare = board[row][col];
        if (
          piece.canMove(board, square, endSquare) &&
          this._isLegalMove(square, endSquare, piece)
        ) {
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

    // STARTER NOTE: This method is intentionally the AI-facing boundary.
    // Early lessons should use this boundary and avoid direct board internals.

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
