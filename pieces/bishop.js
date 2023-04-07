const  Piece  = require('./piece');

class Bishop extends Piece {
    constructor(white) {
        super(white);
    }

    canMove(board, start, end) {
        const { startX, startY, endX, endY } = this.findPositions(start, end);

        if (this.checkPieceColor(board, endX, endY)) return false;
        if (Math.abs(startX - endX) !== Math.abs(startY - endY)) return false


        // up-left
        for (let row = endX + 1; row < startX; row++) {
            for (let col = endY + 1; col < startY; col++) {
                if (board[row][col].getPiece()) return false;
            }
        }

        // up-right
        for (let row = endX + 1; row < startX; row++) {
            for (let col = endY - 1; col > startY; col--) {
                if (board[row][col].getPiece()) return false;
            }
        }

        // down-left
        for (let row = endX - 1; row > startX; row--) {
            for (let col = endY + 1; col < startY; col++) {
                if (board[row][col].getPiece()) return false;
            }
        }

        // down-right
        for (let row = endX - 1; row > startX; row--) {
            for (let col = endY - 1; col > startY; col--) {
                if (board[row][col].getPiece()) return false;
            }
        }

        return true;
    } 
}

module.exports = Bishop;