class Piece {
    constructor(white=false) {
        this.white = white;
        this.captured = false;
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

    setCaptured(captured) {
        this.captured = captured;
    }

    canMove(board, start, end) {

    }
}

module.exports = Piece;