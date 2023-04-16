const King = require('./king');

class Rook extends King {
    constructor(white) {
        super(white);
        this.symbol = 'r';
    }

    canMove(board, start, end) {
        const { startX, startY, endX, endY } = this.findPositions(start, end);

        if (this.checkPieceColor(board, endX, endY)) return false;
        
        if ((startX !== endX) && (startY !== endY)) return false;

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

        return true;
    }
}

module.exports = Rook;