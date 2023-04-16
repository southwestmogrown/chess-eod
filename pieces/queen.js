const Piece = require('./piece');

class Queen extends Piece {
    constructor(white) {
        super(white);
        this.symbol = 'q';
    }

    canMove(board, start, end) {
        const { startX, startY, endX, endY } = this.findPositions(start, end);
        if (this.checkPieceColor(board, endX, endY)) return false;

        if (!(Math.abs(startX - endX) === Math.abs(startY - endY) || ((startX === endX) || (startY === endY)))) return false

        // up
        for (let row = startX; row > endX + 1; row--) {
            if (board[row - 1][startY].getPiece()) return false;
        }

        //down
        for (let row = startX; row < endX - 1; row++) {
            if (board[row + 1][startY].getPiece()) return false;
        }

        // left
        for (let col = startY; col > endY + 1; col--) {
            if (board[startX][col - 1].getPiece()) return false;
        }

        // right
        for (let col = startY; col < endY - 1; col++) {
            if (board[startX][col + 1].getPiece()) return false;
        }

        // up/left
        for (let row = startX; row > endX + 1; row--) {
            for (let col = startY; col > endY + 1; col--) {
                if (board[row - 1][col - 1].getPiece()) return false;
            }
        }

        // up/right
        for (let row = startX; row > endX + 1; row--) {
            for (let col = startY; col < endY - 1; col++) {
                if (board[row - 1][col + 1].getPiece()) return false;
            }
        }

        // down/left
        for (let row = startX; row < endX - 1; row++) {
            for (let col = startY; col > endY + 1; col--) {
                if (board[row + 1][col - 1].getPiece()) return false;
            }
        }

        // down/right
        for (let row = startX; row < endX - 1; row++) {
            for (let col = startY; col < endY - 1; col++) {
                if (board[row + 1][col + 1].getPiece()) return false;
            }
        }

        return true;
    }
}

module.exports = Queen;