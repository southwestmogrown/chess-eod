const King = require('./piece');

class Rook extends King {
    constructor(white) {
        super(white);
    }

    canMove(board, start, end) {
        
    }
}

const rook = new Rook();
console.log(rook)