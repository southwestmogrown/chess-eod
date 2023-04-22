const  Piece  = require('./piece');

class Bishop extends Piece {
    constructor(white) {
        super(white);
        this.symbol = 'b';
    }


    canMove(board, start, end) {
        const { startX, startY, endX, endY } = this.findPositions(start, end);

        if (this.checkPieceColor(board, endX, endY)) return false;
        if (Math.abs(startX - endX) !== Math.abs(startY - endY)) return false;


        // up/left
        if (!this._upLeft(startX - 1, startY - 1, endX, endY, board)) return false;

        // up/right

        if (!this._upRight(startX - 1, startY + 1, endX, endY, board)) return false;

        // down/left

        if (!this._downLeft(startX + 1, startY - 1, endX, endY, board)) return false;

        // down/right

        if (!this._downRight(startX + 1, startY + 1, endX, endY, board)) return false;

        return true;
    } 
}

module.exports = Bishop;