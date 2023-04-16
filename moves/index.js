class Move {
    constructor(player, start, end) {
        this.player = player;
        this.start = start;
        this.end = end;
        this.pieceMoved = start.getPiece();
        this.pieceCaptured = end.getPiece();
        this.isCastlingMove = false;
        this.isPromotion = false;
    }

    getPlayer() {
        return this.player;
    }

    getStart() {
        return this.start;
    }

    getEnd() {
        return this.end;
    }

    getMoved() {
        return this.pieceMoved;
    }

    getCaptured() {
        return this.pieceCaptured
    }

    getIsCastlingMove() {
        return this.isCastlingMove;
    }

    setIsCastlingMove() {
        this.isCastlingMove = !this.isCastlingMove;
    }

    getIsPromotion() {
        return this.isPromotion;
    }

    setIsPromotion() {
        this.isPromotion = !this.isPromotion;
    }

}

module.exports = Move;