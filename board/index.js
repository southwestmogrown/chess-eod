const Square = require('../squares');
const {
    King,
    Rook,
    Bishop,
    Knight,
    Queen,
    Pawn
} = require('../pieces');

class Board {
    constructor() {
        this.board = this.generateBoard();
    }

    generateBoard() {
        const board = [];
        for (let i = 0; i < 8; i++) {
            board.push([]);
        }

        board[0][0] = new Square(0, 0, new Rook());
        board[0][1] = new Square(0, 1, new Knight());
        board[0][2] = new Square(0, 2, new Bishop());
        board[0][3] = new Square(0, 3, new Queen());
        board[0][4] = new Square(0, 4, new King());
        board[0][5] = new Square(0, 5, new Bishop());
        board[0][6] = new Square(0, 6, new Knight());
        board[0][7] = new Square(0, 7, new Rook());

        board[1][0] = new Square(1, 0, new Pawn());
        board[1][1] = new Square(1, 1, new Pawn());
        board[1][2] = new Square(1, 2, new Pawn());
        board[1][3] = new Square(1, 3, new Pawn());
        board[1][4] = new Square(1, 4, new Pawn());
        board[1][5] = new Square(1, 5, new Pawn());
        board[1][6] = new Square(1, 6, new Pawn());
        board[1][7] = new Square(1, 7, new Pawn());

        for (let row = 2; row < 6; row++) {
            for (let col = 0; col < 8; col++) {
                board[row][col] = new Square(row, col, null);
            }
        }

        board[6][0] = new Square(6, 0, new Pawn(true));
        board[6][1] = new Square(6, 1, new Pawn(true));
        board[6][2] = new Square(6, 2, new Pawn(true));
        board[6][3] = new Square(6, 3, new Pawn(true));
        board[6][4] = new Square(6, 4, new Pawn(true));
        board[6][5] = new Square(6, 5, new Pawn(true));
        board[6][6] = new Square(6, 6, new Pawn(true));
        board[6][7] = new Square(6, 7, new Pawn(true));

        board[7][0] = new Square(7, 0, new Rook(true));
        board[7][1] = new Square(7, 1, new Knight(true));
        board[7][2] = new Square(7, 2, new Bishop(true));
        board[7][3] = new Square(7, 3, new Queen(true));
        board[7][4] = new Square(7, 4, new King(true));
        board[7][5] = new Square(7, 5, new Bishop(true));
        board[7][6] = new Square(7, 6, new Knight(true));
        board[7][7] = new Square(7, 7, new Rook(true));

        return board;
    }

    

    generateTestBoard() {
        const board = [];

        for (let i = 0; i < 8; i++) {
            board.push([]);
            for (let j = 0; j < 8; j++) {
                board[i][j] = new Square(i, j, null);
            }
        }

        return board;
    }
}

module.exports = Board;