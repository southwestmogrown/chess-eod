const Piece = require('./piece');

class Knight extends Piece {
    constructor(white) {
        super(white);
    }

    canMove(board, start, end) {
        const { startX, startY, endX, endY } = this.findPositions(start, end);

        if (this.checkPieceColor(board, endX, endY)) return false;
        if (Math.abs(Math.abs(startX - endX) - Math.abs(startY - endY)) !== 1) return false;
        return true;
    }

}

module.exports = Knight;