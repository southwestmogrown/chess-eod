const Piece = require('./piece');

class Knight extends Piece {
    constructor(white) {
        super(white);
        this.symbol = 'n'
    }

    canMove(board, start, end) {
        const { startX, startY, endX, endY } = this.findPositions(start, end);

        if (this.checkPieceColor(board, endX, endY)) return false;
        let x = Math.abs(startX - endX)
        let y = Math.abs(startY - endY)
        if (x * y !== 2) return false;
        return true;
    }

}

module.exports = Knight;