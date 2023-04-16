const  Piece  = require('./piece');

class Bishop extends Piece {
    constructor(white) {
        super(white);
        this.symbol = 'b';
    }

    canMove(board, start, end) {
        const { startX, startY, endX, endY } = this.findPositions(start, end);

        if (this.checkPieceColor(board, endX, endY)) return false;
        if (Math.abs(startX - endX) !== Math.abs(startY - endY)) return false


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

module.exports = Bishop;