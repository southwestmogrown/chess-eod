const Piece = require('./piece');

class Queen extends Piece {
    constructor(white) {
        super(white);
        this.symbol = 'q';
    }

    _checkOrthogonal(board, startX, endX, startY, endY) {
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

    _checkDiagonal(board, startX, startY, endX, endY) {
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

    canMove(board, start, end) {
        const { startX, startY, endX, endY } = this.findPositions(start, end);
        if (this.checkPieceColor(board, endX, endY)) return false;

        if (!(Math.abs(startX - endX) === Math.abs(startY - endY) || ((startX === endX) || (startY === endY)))) return false
       
        return this._checkDiagonal(board, startX, startY, endX, endY) || this._checkOrthogonal(board, startX, endX, startY, endY)
    }

    // canMoveDiagonal(board, start, end) {
    //     const { startX, startY, endX, endY } = this.findPositions(start, end);
    //     if (this.checkPieceColor(board, endX, endY)) return false;

    //     if (!(Math.abs(startX - endX) === Math.abs(startY - endY) || ((startX === endX) || (startY === endY)))) return false
       
    //     return this._checkDiagonal(board, startX, endX, startY, endY);
    // }
}

module.exports = Queen;