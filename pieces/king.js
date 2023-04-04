const Piece = require('./piece');
const { findPositions, checkPieceColor } = require('../utils');

class King extends Piece {
    constructor(white) {
        super(white);
        this.castlingDone = false;
    }

    isCastlingDone() {
        return this.castlingDone;
    }

    setCastlingDone() {
        this.castlingDone = !this.castlingDone;
    }

    canMove(board, start, end) {
        
        // const startX = start.getX();
        // const startY = start.getY();
        // const endX = end.getX();
        // const endY = end.getY();
        // const endPiece = board[endX][endY].piece;

        const { startX, startY, endX, endY } = findPositions(start, end);
        if (checkPieceColor(board, endX, endY, startX, startY)) return false;
        
        const moves = [
            [startX + 1, startY],
            [startX - 1, startY],
            [startX, startY + 1],
            [startX, startY - 1],
            [startX + 1, startY + 1],
            [startX + 1, startY - 1],
            [startX - 1, startY + 1],
            [startX - 1, startY - 1],
        ]

        for (let move of moves) {
            if (move[0] === endX && move[1] === endY) {
                return true;
            }
        }

        return false;
    }
}

module.exports = King;