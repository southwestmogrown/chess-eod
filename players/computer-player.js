const Player = require('./player');

class ComputerPlayer extends Player {
    constructor(isWhiteSide) {
        super(isWhiteSide);
        this.isHuman = false;
    }
}

module.exports = ComputerPlayer;