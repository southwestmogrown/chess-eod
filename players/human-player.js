const Player = require('./player');

class HumanPlayer extends Player {
    constructor(name, isWhiteSide) {
        super(name, isWhiteSide);
        this.isHuman = true;
    }
}

module.exports = HumanPlayer;