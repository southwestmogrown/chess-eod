const King = require('./king');

class Rook extends King {
    constructor(white) {
        super(white);
    }

    canMove(board, start, end) {
        const { startX, startY, endX, endY } = this.findPositions(start, end);

        if (this.checkPieceColor(board, endX, endY)) return false;
        if ((startX !== endX) && (startY !== endY)) return false;
        // up
        for (let i = endX; i < startX; i++) {
            if (board[i][startY].getPiece()) {
                return false;
            } 
        }

        // down
        for (let i = endX; i > startX; i--) {
            if (board[i][startY].getPiece()) {
                return false;
            }
        }

        // left
        for (let i = endY; i < startY; i++) {
            if (board[startX][i].getPiece()) {
                return false;
            }
        }

        // right
        for (let i = endY; i > startY; i--) {
            if (board[startX][i].getPiece()) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Rook;