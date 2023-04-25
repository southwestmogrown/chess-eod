const Piece = require('./piece');

class King extends Piece {
    constructor(white) {
        super(white);
        this.castlingDone = false;
        this.symbol = 'k';
    }

    isCastlingDone() {
        return this.castlingDone;
    }

    setCastlingDone() {
        this.castlingDone = !this.castlingDone;
    }

    _locateOtherKing(board) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = board[i][j].getPiece();
                if (piece && piece.isWhite() !== this.isWhite()) {
                    return board[i][j];
                }
            }
        }
    }

    _wouldBeCheck(board, start, end) {
        
        // const visited = new Set();
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                
                let piece = board[row][col].getPiece();
                
                if (piece) {
                    if (piece == start.getPiece()) continue;
                    if (piece.getSymbol() !== 'k') {
                        if (piece.isWhite() === this.isWhite()) {
                            continue;
                        }
                        if (piece.getSymbol() === 'p') {
                            if (piece.canAttack(board, board[row][col], end)) {
                                return true;
                            } else {
                                continue;
                            }
                        }
                        if (piece.canMove(board, board[row][col], end)) {
                            return true;
                        }
                    } 
                } 
                
            }
        }
        return false;
    }

    canMove(board, start, end) {

        const { startX, startY, endX, endY } = this.findPositions(start, end);
        const otherKingSquare = this._locateOtherKing(board)
        if (otherKingSquare) {
            const x = otherKingSquare.getX();
            const y = otherKingSquare.getY();
            const otherKing = otherKingSquare.getPiece();

            if (otherKing.canMove(board, board[x][y], end)) return false;
        }
        if (this.checkPieceColor(board, endX, endY)) return false;
        if (this._wouldBeCheck(board, start, end)) return false;
        
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