const { expect } = require('chai');

const Board = require('../board');
const Square = require('../squares');
const {
    Queen,
    Piece,
    Pawn
} = require('../pieces');

describe('The Queen Class', () => {
    let q1;
    let q2;
    let board;

    beforeEach(() => {
        q1 = new Queen(true);
        q2 = new Queen();
        board = new Board();
    });

    describe('the constructor', () => {
        it ('should inherit from the Piece class', () => {
            expect(q1 instanceof Queen).to.be.true;
            expect(q1 instanceof Piece).to.be.true;
        });
    });

    describe('the canMove() method', () => {
        
        it ('should be able to move any number of spaces up', () => {

            const testB = board.generateTestBoard();
            testB[4][3] = new Square(4, 3, q1);
    
            /*
                [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','Q','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ]
            */
            expect(q1.canMove(testB, testB[4][3], testB[3][3])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[2][3])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[1][3])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[0][3])).to.be.true;
            
        });

        it ('should be able to move any number of spaces down', () => {

            const testB = board.generateTestBoard();
            testB[4][3] = new Square(4, 3, q1);
    
            /*
                [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','Q','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ]
            */
            expect(q1.canMove(testB, testB[4][3], testB[5][3])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[6][3])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[7][3])).to.be.true;
            
        });

        it ('should be able to move any number of spaces left', () => {

            const testB = board.generateTestBoard();
            testB[4][3] = new Square(4, 3, q1);
    
            /*
                [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','Q','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ]
            */
            expect(q1.canMove(testB, testB[4][3], testB[4][2])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[4][1])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[4][0])).to.be.true;
            
        });

        it ('should be able to move any number of spaces right', () => {

            const testB = board.generateTestBoard();
            testB[4][3] = new Square(4, 3, q1);
    
            /*
                [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','Q','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ]
            */
            expect(q1.canMove(testB, testB[4][3], testB[4][4])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[4][5])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[4][6])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[4][7])).to.be.true;
            
        });

        it ('should be able to move any number of spaces up/left diagonally', () => {

            const testB = board.generateTestBoard();
            testB[4][3] = new Square(4, 3, q1);
    
            /*
                [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','Q','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ]
            */
            expect(q1.canMove(testB, testB[4][3], testB[3][2])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[2][1])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[1][0])).to.be.true;
            
        });

        it ('should be able to move any number of spaces up/right diagonally', () => {

            const testB = board.generateTestBoard();
            testB[4][3] = new Square(4, 3, q1);
    
            /*
                [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','Q','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ]
            */
            expect(q1.canMove(testB, testB[4][3], testB[3][4])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[2][5])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[1][6])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[0][7])).to.be.true;
            
        });

        it ('should be able to move any number of spaces down/left diagonally', () => {

            const testB = board.generateTestBoard();
            testB[4][3] = new Square(4, 3, q1);
    
            /*
                [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','Q','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ]
            */
            expect(q1.canMove(testB, testB[4][3], testB[5][2])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[6][1])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[7][0])).to.be.true;
            
        });

        it ('should be able to move any number of spaces down/right diagonally', () => {

            const testB = board.generateTestBoard();
            testB[4][3] = new Square(4, 3, q1);
    
            /*
                [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','Q','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ]
            */
            expect(q1.canMove(testB, testB[4][3], testB[5][4])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[6][5])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[7][6])).to.be.true;
            
        });

        it ('should not be able to move to any space beyond an occupied space', () => {

            const testB = board.generateTestBoard();
            testB[4][3] = new Square(4, 3, q1);
            testB[2][3] = new Square(2, 3, q2);
            testB[6][3] = new Square(6, 3, q2);
            testB[4][1] = new Square(4, 1, q2);
            testB[4][5] = new Square(4, 5, q2);
            testB[2][1] = new Square(2, 1, q2);
            testB[2][5] = new Square(2, 5, q2);
            testB[6][1] = new Square(6, 1, q2);
            testB[6][5] = new Square(6, 5, q2);
    
            /*
                [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','q','.','q','.','q','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','q','.','Q','.','q','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','q','.','q','.','5','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ]
            */
            expect(q1.canMove(testB, testB[4][3], testB[3][3])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[2][3])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[1][3])).to.be.false;
            expect(q1.canMove(testB, testB[4][3], testB[0][3])).to.be.false;

            expect(q1.canMove(testB, testB[4][3], testB[5][3])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[6][3])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[7][3])).to.be.false;

            expect(q1.canMove(testB, testB[4][3], testB[4][2])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[4][1])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[4][0])).to.be.false;

            expect(q1.canMove(testB, testB[4][3], testB[4][4])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[4][5])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[4][6])).to.be.false;
            expect(q1.canMove(testB, testB[4][3], testB[4][7])).to.be.false;

            expect(q1.canMove(testB, testB[4][3], testB[3][2])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[2][1])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[1][0])).to.be.false;

            expect(q1.canMove(testB, testB[4][3], testB[3][4])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[2][5])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[1][6])).to.be.false;
            expect(q1.canMove(testB, testB[4][3], testB[0][7])).to.be.false;

            expect(q1.canMove(testB, testB[4][3], testB[5][2])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[6][1])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[7][0])).to.be.false;

            expect(q1.canMove(testB, testB[4][3], testB[5][4])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[6][5])).to.be.true;
            expect(q1.canMove(testB, testB[4][3], testB[7][6])).to.be.false;
            
        });
    });

    it ('should not be able to move to a square that is not exactly up, down, left, right, or diagonal', () => {

        const testB = board.generateTestBoard();
        testB[4][3] = new Square(4, 3, q1);

        /*
            [
            ['.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.'],
            ['.','.','.','Q','.','.','.','.'],
            ['.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.'],
            ]
        */
        expect(q1.canMove(testB, testB[4][3], testB[3][1])).to.be.false;
        expect(q1.canMove(testB, testB[4][3], testB[6][0])).to.be.false;
        expect(q1.canMove(testB, testB[4][3], testB[3][5])).to.be.false;
        
    });

    describe('the canMove() method with a full game board', () => {
        it ('should allow a queen to move any number of spaces diagonally', () => {
            const b = board.generateBoard();
            b[6][4] = new Square(6,4,null);
            b[4][4] = new Square(4,4, new Pawn(true).setFirstMove());
            const queen = b[7][3].getPiece();

            /*
                [
                ['r','n','b','q','k','b','n','r'],
                ['p','p','p','p','p','p','p','p'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','P','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['P','P','P','P','.','P','P','P'],
                ['R','N','B','Q','K','B','N','R'],
                ]
            */
       
           expect(queen.canMove(b, b[7][3], b[5][1])).to.be.false;
           expect(queen.canMove(b, b[7][3], b[4][0])).to.be.false;
           expect(queen.canMove(b, b[7][3], b[6][4])).to.be.true;
           expect(queen.canMove(b, b[7][3], b[5][5])).to.be.true;
           expect(queen.canMove(b, b[7][3], b[4][6])).to.be.true;
           expect(queen.canMove(b, b[7][3], b[3][7])).to.be.true;


        });

        it ('should allow a queen to move any number of spaces diagonally', () => {
            const b = board.generateBoard();
            b[6][4] = new Square(6,4,null);
            b[4][4] = new Square(4,4, new Pawn(true));
            b[6][3] = new Square(6, 3, null);
            b[4][3] = new Square(4, 3, new Pawn(true));
            b[7][3] = new Square(7, 3, null);
            b[5][5] = new Square(5, 5, q1);
            const queen = b[5][5].getPiece();

            /*
                [
                ['r','n','b','q','k','b','n','r'],
                ['p','p','p','p','p','p','p','p'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','P','P','.','.','.'],
                ['.','.','.','.','.','Q','.','.'],
                ['P','P','P','.','.','P','P','P'],
                ['R','N','B','.','K','B','N','R'],
                ]
            */
       
           expect(queen.canMove(b, b[5][5], b[4][4])).to.be.false;
           expect(queen.canMove(b, b[5][5], b[3][3])).to.be.false;
        //    expect(queen.canMove(b, b[7][3], b[6][4])).to.be.true;
        //    expect(queen.canMove(b, b[7][3], b[5][5])).to.be.true;
        //    expect(queen.canMove(b, b[7][3], b[4][6])).to.be.true;
        //    expect(queen.canMove(b, b[7][3], b[3][7])).to.be.true;


        });
    });

});