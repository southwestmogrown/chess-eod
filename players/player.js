class Player {
    constructor(isWhiteSide) {
        this.isWhiteSide = isWhiteSide;
        this.isHuman;
    }

    getIsWhiteSide() {
        return this.isWhiteSide;
    }

    getIsHuman() {
        return this.isHuman;
    }
}

module.exports = Player;