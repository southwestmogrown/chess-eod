let prompt = require('prompt-sync')();

const Board = require('../board');
const Screen = require('./screen');
const Cursor = require('./cursor');
const { HumanPlayer } = require('../players');
const { MovesList } = require('../moves');

const GameStatus = {
    ACTIVE: 'ACTIVE',
    BLACK_WIN: 'BLACK_WIN',
    WHITE_WIN: 'WHITE_WIN',
    FORFEIT: 'FORFEIT',
    STALEMATE: 'STALEMATE',
    RESIGNATION: 'RESIGNATION'
}

class Game {
    constructor() {
        const p1Name = prompt('Player 1, please enter your name. ');
        console.log(`Welcome ${p1Name}\n`)
        const p2Name = prompt('Player 2, please enter your name. ');
        console.log(`Welcome ${p2Name}\n`)
        // setTimeout(() => console.log('Initializing in 3...'), 1000);
        // setTimeout(() => console.log('2...'), 2000);
        // setTimeout(() => console.log('1...'), 3000);

    
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

            this.startingPosition = null;
    
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

        }, 500)
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

    doMove(endCoords) {
        const [ endRow, endCol ] = endCoords;
        const [ startRow, startCol ] = this.startingPosition; 
        const board = this.gameBoard.board;
        const endPiece = board[endRow][endCol].getPiece();
        const startPiece = board[startRow][startCol].getPiece();

        if (!endPiece) {
            board[endRow][endCol].setPiece(startPiece);
            board[startRow][startCol].setPiece(null);
            Screen.setGrid(startRow, startCol, ' ');
            let symbol = startPiece.getSymbol();
            symbol = startPiece.isWhite ? symbol.toUpperCase() : symbol;
            Screen.setGrid(endRow, endCol, symbol);
        }


        // Screen.setMessage(piece)
        // this.grid[row][col] = this.playerTurn;
        // Screen.setGrid(row, col, this.playerTurn);

        // let winner = TTT.checkWin(this.grid);
        // if (winner) return TTT.endGame(winner);

        // this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X';
        // Screen.setMessage(`Player ${this.playerTurn}'s turn`);
        Screen.render();
    }

    select() {
        const { row: cRow, col: cCol} = this.cursor.position();

        if (this.cursor.getIsMoveSelection()) {
            
            this.doMove([cRow, cCol]);
            this.cursor.setIsMoveSelection();
        } else {
    
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (row === cRow && col === cCol) {
                        continue;
                    } 
                    Screen.setBackgroundColor(row, col, 'black');
                }
            }
            const square = this.gameBoard.board[this.cursor.row][this.cursor.col];
            const piece = square.getPiece()
            if (!piece) {
                Screen.setMessage("You must select a piece.");
                Screen.render();
            } else if (piece.isWhite() !== this.currentPlayer.getIsWhiteSide()){
                Screen.setMessage("Invalid piece selection.");
                Screen.render()
            } else {
                
                const movesList = this.validMoves(piece, square);
    
                if (!movesList.length) {
                    Screen.setMessage("Cannot move this piece");
                    Screen.render();
                } else {
                    this.chooseMove(movesList)
                    this.startingPosition = [cRow, cCol];
                }
                
            }
        }
    }

    chooseMove(movesList) {
        
        let curr = movesList.head;
        let count = 1;
        while (curr && count <= movesList.length) {
            const [row, col] = curr.val;
            Screen.setBackgroundColor(row, col, 'green')
            
            curr = curr.next;
            count++;
        }
        this.cursor.setIsMoveSelection();
        Screen.setMessage('Where would you like to move?')
        Screen.render();
    }
    
    validMoves(piece, square) {
        let moves = new MovesList();
        let board = this.gameBoard.board

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (piece.canMove(board, square, board[row][col])) {
                    moves.addToTail([row, col]);
                }
            }
        }
        this.cursor.currentMove = moves.head;
        Screen.availableMoves = moves;
        return moves;
    }
}



module.exports = Game;