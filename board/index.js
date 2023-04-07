const Square = require('../squares');
const {
    King,
    Piece
} = require('../pieces');

class Board {
    constructor() {
        this.matrix = this.generateBoard();
    }

    generateBoard() {
        let matrix = [];
        for (let i = 0; i < 8; i++) {
            matrix.push([]);
        }
        matrix[0][0] = new Square(0,0, new Piece(true));
        matrix[0][1] = new Square(0,1, new Piece(true));
        matrix[0][2] = new Square(0,2, new Piece(true));
        matrix[0][3] = new Square(0,3, new Piece(true));
        matrix[0][4] = new Square(0,4, new King(true));
        matrix[0][5] = new Square(0,5, new Piece(true));
        matrix[0][6] = new Square(0,6, new Piece(true));
        matrix[0][7] = new Square(0,7, new Piece(true));

        matrix[1][0] = new Square(1,0, new Piece(true));
        matrix[1][1] = new Square(1,1, new Piece(true));
        matrix[1][2] = new Square(1,2, new Piece(true));
        matrix[1][3] = new Square(1,3, new Piece(true));
        matrix[1][4] = new Square(1,4, new Piece(true));
        matrix[1][5] = new Square(1,5, new Piece(true));
        matrix[1][6] = new Square(1,6, new Piece(true));
        matrix[1][7] = new Square(1,7, new Piece(true));

        matrix[6][0] = new Square(6,0, new Piece(false));
        matrix[6][1] = new Square(6,1, new Piece(false));
        matrix[6][2] = new Square(6,2, new Piece(false));
        matrix[6][3] = new Square(6,3, new Piece(false));
        matrix[6][4] = new Square(6,4, new Piece(false));
        matrix[6][5] = new Square(6,5, new Piece(false));
        matrix[6][6] = new Square(6,6, new Piece(false));
        matrix[6][7] = new Square(6,7, new Piece(false));

        matrix[7][0] = new Square(7,0, new Piece(false));
        matrix[7][1] = new Square(7,1, new Piece(false));
        matrix[7][2] = new Square(7,2, new Piece(false));
        matrix[7][3] = new Square(7,3, new Piece(false));
        matrix[7][4] = new Square(7,4, new King(false));
        matrix[7][5] = new Square(7,5, new Piece(false));
        matrix[7][6] = new Square(7,6, new Piece(false));
        matrix[7][7] = new Square(7,7, new Piece(false));

        for (let i = 2; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                matrix[i][j] = new Square(i, j, null);
            }
        }

        return matrix;
    }

    generateTestBoard() {
        const matrix = [];
        for (let i = 0; i < 8; i++) {
            matrix.push([]);
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                matrix[i][j] = new Square(i, j, null);
            }
        }

        return matrix;
    }
}

// const b = new Board()
// const k = new King();
// const p = new Piece();
// const tb = b.generateTestBoard(k, p)
// console.log(tb)
// console.log(k.canMove(tb, tb[3][4], tb[3][5]));

module.exports = Board;