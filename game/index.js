// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

let prompt = require('prompt-sync')();

const Board = require('../board');
const Screen = require('./screen');
const Cursor = require('./cursor');
const { HumanPlayer, Player } = require('../players');

const GameStatus = {
    ACTIVE: 'ACTIVE',
    BLACK_WIN: 'BLACK_WIN',
    WHITE_WIN: 'WHITE_WIN',
    FORFEIT: 'FORFEIT',
    STALEMATE: 'STALEMATE',
    RESIGNATION: 'RESIGNATION'
}
// rl.question('Player one, please enter your name. ', (answer) => {
    //     res(answer);
    //     console.log(`Welcome ${answer}!`);
    //     rl.close();
    // });
class Game {
    constructor() {
        const p1Name = prompt('Player 1, please enter your name. ');
        console.log(`Welcome ${p1Name}\n`)
        const p2Name = prompt('Player 2, please enter your name. ');
        console.log(`Welcome ${p2Name}\n`)
        setTimeout(() => console.log('Initializing in 3...'), 1000);
        setTimeout(() => console.log('2...'), 2000);
        setTimeout(() => console.log('1...'), 3000);

    
        setTimeout(() => {
            const chooseStarter = Math.floor(Math.random() * 2);
    
            if (!chooseStarter) {
                this.p1 = new HumanPlayer(p1Name, true);
                this.p2 = new HumanPlayer(p2Name, false);
                this.currentPlayer = this.p1;
            } else {
                this.p1 = new HumanPlayer(p1Name, false);
                this.p2 = new HumanPlayer(p2Name, true);
                this.currentPlayer = this.p2;
            }
    
            this.gameBoard = new Board();
            this.status = GameStatus.ACTIVE;
    
            this.cursor = new Cursor(8, 8);
    
            Screen.initialize(8, 8, this.gameBoard.board)
            Screen.setGridLines(true);
    
            Screen.setBackgroundColor(0, 0, "yellow");
    
            Screen.addCommand('up', 'move the cursor up', this.cursor.up.bind(this.cursor));
            Screen.addCommand('down', 'move the cursor down', this.cursor.down.bind(this.cursor));
            Screen.addCommand('left', 'move the cursor left', this.cursor.left.bind(this.cursor));
            Screen.addCommand('right', 'move the cursor right', this.cursor.right.bind(this.cursor));
            Screen.addCommand('f', 'forfeit the game', Game.endGame.bind(this, this.currentPlayer))
            Screen.addCommand('return', 'select your move', this.select.bind(this));
    
            Screen.setMessage(`${this.currentPlayer.name}'s turn!`)
            Screen.render();

        }, 4000)
    }

    static checkWin(grid) {
        
    }

    static endGame(winner) {
        if (winner === 'O' || winner === 'X') {
            Screen.setMessage(`Player ${winner} wins!`);
        } else if (winner === 'T') {
            Screen.setMessage(`Tie game!`);
        } else {
            Screen.setMessage(`Game Over`);
        }
        Screen.render();
        Screen.quit();
    }

    doMove(row, col) {
        this.grid[row][col] = this.playerTurn;
        Screen.setGrid(row, col, this.playerTurn);

        let winner = TTT.checkWin(this.grid);
        if (winner) return TTT.endGame(winner);

        this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X';
        Screen.setMessage(`Player ${this.playerTurn}'s turn`);
        Screen.render();
    }

    select() {
        
        const square = this.gameBoard.board[this.cursor.row][this.cursor.col];
        const piece = square.getPiece()
        if (!piece) {
            Screen.setMessage("You must select a piece.");
            Screen.render();
        } else if (piece.isWhite() !== this.currentPlayer.getIsWhiteSide()){
            Screen.setMessage("Invalid piece selection.");
            Screen.render();
        } else {
            const validMoves = this.validMoves(piece, square);

            console.log(validMoves)
        }
    }
    
    validMoves(piece, square) {
        let moves = [];
        let board = this.gameBoard.board

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (piece.canMove(board, square, board[row][col])) {
                    moves.push([row, col]);
                }
            }
        }
        return moves;
    }
}

module.exports = Game;