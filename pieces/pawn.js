const Piece = require('./piece');

class Pawn extends Piece {
    constructor(white) {
        super(white);
        this.firstMove = true;
        this.symbol = 'p';
    }

    getFirstMove() {
        return this.firstMove;
    }

    setFirstMove() {
        this.firstMove = !this.firstMove;
    }

    canMove(board, start, end) {

        const { startX, startY, endX, endY } = this.findPositions(start, end);
        console.log({startX})
        if (this.checkPieceColor(board, endX, endY)) return false;

        const endPiece = board[endX][endY].piece;
        const wMoves = [
            [startX - 2, startY],
            [startX - 1, startY],
        ];

        const bMoves = [
            [startX + 2, startY],
            [startX + 1, startY],
        ];

        if (this.isWhite()) {
            let [move1, move2] = wMoves;
            console.log({move1})
            console.log({move2})
            if (this.getFirstMove()) {
                if ((move1[0] === endX && move1[1] === endY) ||
                    (move2[0] === endX && move2[1] === endY) &&
                    !endPiece) {
                    return true;
                }
            } else {
                if (move2[0] === endX && move2[1] === endY && !endPiece) {
                    return true;
                }
            }
        } else if (!this.isWhite()) {
            let [move1, move2] = bMoves;
            console.log({move1});
            console.log({move2});
            if (this.getFirstMove()){
                if ((move1[0] === endX && move1[1] === endY) ||
                    (move2[0] === endX && move2[1] === endY) &&
                    !endPiece) {
                    return true;
                }
            } else {
                if ((move2[0] === endX && move2[1] === endY) && !endPiece) {
                    return true;
                }
            }
        }

        const wDiagonalMoves = [
            [startX - 1, startY - 1],
            [startX - 1, startY + 1],
        ];

        const bDiagonalMoves = [
            [startX + 1, startY - 1],
            [startX + 1, startY + 1],
        ];

        if (this.white) {
            for (let move of wDiagonalMoves) {
                if (move[0] === endX && move[1] === endY && endPiece) {
                    return true;
                }
            }
        } else {
            for (let move of bDiagonalMoves) {
                if (move[0] === endX && move[1] === endY && endPiece) {
                    return true;
                }
            }
        }

        return false;
    }

    // canAttack(board, start, end) {
    //     const { startX, startY, endX, endY } = this.findPositions(start, end);

    //     if (this.checkPieceColor(board, endX, endY)) return false;

    //     const endPiece = board[endX][endY].piece;

    //     const wDiagonalMoves = [
    //         [startX - 1, startY - 1],
    //         [startX - 1, startY + 1],
    //     ];

    //     const bDiagonalMoves = [
    //         [startX + 1, startY - 1],
    //         [startX + 1, startY + 1],
    //     ];

    //     if (this.white) {
    //         for (let move of wDiagonalMoves) {
    //             if (move[0] === endX && move[1] === endY && endPiece) {
    //                 return true;
    //             }
    //         }
    //     } else {
    //         for (let move of bDiagonalMoves) {
    //             if (move[0] === endX && move[1] === endY && endPiece) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }

}

module.exports = Pawn;
