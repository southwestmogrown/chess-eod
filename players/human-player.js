const Player = require('./player');

class HumanPlayer extends Player {
    constructor(isWhiteSide) {
        super(isWhiteSide);
        this.isHuman = true;
    }
}

module.exports = HumanPlayer;