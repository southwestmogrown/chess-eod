const King = require('./king');

class Rook extends King {
    constructor(white) {
        super(white);
    }

    canMove(board, start, end) {

    }
}

module.exports = Rook;