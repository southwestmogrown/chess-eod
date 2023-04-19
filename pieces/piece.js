class Piece {
    constructor(white=false) {
        this.white = white;
        this.captured = false;
        this.symbol = '*'
    }

    getSymbol() {
        return this.symbol;
    }

    isWhite() {
        return this.white;
    }

    setWhite(white) {
        this.white = white;
    }

    isCaptured() {
        return this.captured;
    }

    setCaptured() {
        this.captured = !this.captured;
    }

    findPositions(start, end) {
        return {
            startX: start.getX(),
            startY: start.getY(),
            endX: end.getX(),
            endY: end.getY(),
        }
    }
    
    checkPieceColor(board, endX, endY) {
        
        const endPiece = board[endX][endY].piece;
        
        return endPiece && endPiece.white === this.white
    }

    canMove(board, start, end) {

    }
}

module.exports = Piece;