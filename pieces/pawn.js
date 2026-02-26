const Piece = require("./piece");

class Pawn extends Piece {
  constructor(white) {
    super(white);
    this.firstMove = true;
    this.symbol = "p";
  }

  getFirstMove() {
    return this.firstMove;
  }

  setFirstMove() {
    this.firstMove = !this.firstMove;
  }

  canMove(board, start, end) {
    const { startX, startY, endX, endY } = this.findPositions(start, end);
    if (this.checkPieceColor(board, endX, endY)) return false;

    const endPiece = board[endX][endY].piece;
    const direction = this.isWhite() ? -1 : 1;
    const oneStepX = startX + direction;
    const twoStepX = startX + 2 * direction;

    if (endY === startY) {
      if (endX === oneStepX && !endPiece) {
        return true;
      }

      if (this.getFirstMove() && endX === twoStepX && !endPiece) {
        const middleSquarePiece = board[oneStepX][startY].piece;
        if (!middleSquarePiece) {
          return true;
        }
      }
    }

    const wDiagonalMoves = [
      [startX - 1, startY - 1],
      [startX - 1, startY + 1],
    ];

    const bDiagonalMoves = [
      [startX + 1, startY - 1],
      [startX + 1, startY + 1],
    ];

    if (this.isWhite()) {
      for (let move of wDiagonalMoves) {
        if (move[0] === endX && move[1] === endY && endPiece) {
          return true;
        }
      }
    } else {
      for (let move of bDiagonalMoves) {
        if (move[0] === endX && move[1] === endY && endPiece) {
          return true;
        }
      }
    }

    return false;
  }

  canAttack(board, start, end) {
    const { startX, startY, endX, endY } = this.findPositions(start, end);

    if (this.checkPieceColor(board, endX, endY)) return false;

    const endPiece = board[endX][endY].piece;

    const wDiagonalMoves = [
      [startX - 1, startY - 1],
      [startX - 1, startY + 1],
    ];

    const bDiagonalMoves = [
      [startX + 1, startY - 1],
      [startX + 1, startY + 1],
    ];

    if (this.white) {
      for (let move of wDiagonalMoves) {
        if (move[0] === endX && move[1] === endY) {
          return true;
        }
      }
    } else {
      for (let move of bDiagonalMoves) {
        if (move[0] === endX && move[1] === endY) {
          return true;
        }
      }
    }
    return false;
  }
}

module.exports = Pawn;
