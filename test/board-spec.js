const chai = require('chai');
const { expect } = chai;


const Square = require('../squares');
const Board = require('../board');
const {
    Pawn,
    Rook,
    Knight,
    Bishop,
    King,
    Queen
} = require('../pieces');

describe('The Board Class', () => {
    
    describe('the constructor', () => {

        it('should have a "board" property', () => {
            let chess = new Board();

            expect(chess).to.have.property("board");
        });

    });

    describe('the generateBoard method', () => {
        it ('should create a new board filled with all the correct pieces', () => {
            const board = new Board();

            const expectedBoard = [];

            for (let i = 0; i < 8; i++) {
                expectedBoard.push([]);
            }

            expectedBoard[0][0] = new Square(0, 0, new Rook());
            expectedBoard[0][1] = new Square(0, 1, new Knight());
            expectedBoard[0][2] = new Square(0, 2, new Bishop());
            expectedBoard[0][3] = new Square(0, 3, new Queen());
            expectedBoard[0][4] = new Square(0, 4, new King());
            expectedBoard[0][5] = new Square(0, 5, new Bishop());
            expectedBoard[0][6] = new Square(0, 6, new Knight());
            expectedBoard[0][7] = new Square(0, 7, new Rook());

            expectedBoard[1][0] = new Square(0, 0, new Pawn());
            expectedBoard[1][1] = new Square(0, 1, new Pawn());
            expectedBoard[1][2] = new Square(0, 2, new Pawn());
            expectedBoard[1][3] = new Square(0, 3, new Pawn());
            expectedBoard[1][4] = new Square(0, 4, new Pawn());
            expectedBoard[1][5] = new Square(0, 5, new Pawn());
            expectedBoard[1][6] = new Square(0, 6, new Pawn());
            expectedBoard[1][7] = new Square(0, 7, new Pawn());

            for (let row = 2; row < 6; row++) {
                for (let col = 0; col < 8; col++) {
                    expectedBoard[row][col] = new Square(row, col, null);
                }
            }

            expectedBoard[6][0] = new Square(6, 0, new Pawn(true));
            expectedBoard[6][1] = new Square(6, 1, new Pawn(true));
            expectedBoard[6][2] = new Square(6, 2, new Pawn(true));
            expectedBoard[6][3] = new Square(6, 3, new Pawn(true));
            expectedBoard[6][4] = new Square(6, 4, new Pawn(true));
            expectedBoard[6][5] = new Square(6, 5, new Pawn(true));
            expectedBoard[6][6] = new Square(6, 6, new Pawn(true));
            expectedBoard[6][7] = new Square(6, 7, new Pawn(true));

            expectedBoard[7][0] = new Square(7, 0, new Rook(true));
            expectedBoard[7][1] = new Square(7, 1, new Knight(true));
            expectedBoard[7][2] = new Square(7, 2, new Bishop(true));
            expectedBoard[7][3] = new Square(7, 3, new Queen(true));
            expectedBoard[7][4] = new Square(7, 4, new King(true));
            expectedBoard[7][5] = new Square(7, 5, new Bishop(true));
            expectedBoard[7][6] = new Square(7, 6, new Knight(true));
            expectedBoard[7][7] = new Square(7, 7, new Rook(true));

            expect(board.board).to.eql(expectedBoard);

        });

    });

    describe('the generateTestBoard method', () => {
        
        it('should generate a board full of squares with no pieces for testing purposes', () => {
            const chess = new Board();

            const expected = [];

            for (let row = 0; row < 8; row++) {
                expected.push([]);
                for (let col = 0; col < 8; col++) {
                    expected[row][col] = new Square(row, col, null);
                }
            }
            
            expect(chess.generateTestBoard()).to.eql(expected);
        });
    });
});