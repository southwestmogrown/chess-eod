const Screen = require("./screen");

class Cursor {

    constructor(numRows = 8, numCols = 8) {
        this.numRows = numRows;
        this.numCols = numCols;

        this.row = 0;
        this.col = 0;

        this.gridColor = 'black';       // "\u001b[40m"
        this.cursorColor = 'yellow';    // "\u001b[43m"

        this.isMoveSelection = false;
        this.currentMove = null;
    }

    getIsMoveSelection() {
        return this.isMoveSelection;
    }

    setIsMoveSelection() {
        this.isMoveSelection = !this.isMoveSelection;
    }

    position() {
        return {row: this.row, col: this.col};
    }

    selectMove() {
        
        Screen.addCommand('s', 'select a different piece', () => {
            const { row: cRow, col: cCol} = this.position();
            this.setIsMoveSelection()
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (row === cRow && col === cCol) {
                        continue;
                    } 
                    Screen.setBackgroundColor(row, col, 'black');
                }
            }
            Screen.render()
        });
        Screen.setBackgroundColor(this.row, this.col, 'green');
        this.row = this.currentMove.val[0];
        this.col = this.currentMove.val[1];
        Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
        this.currentMove = this.currentMove.next;

        Screen.render();
    }

    up() {
        if (this.getIsMoveSelection()) {
            this.selectMove();
        } else {
            Screen.setBackgroundColor(this.row, this.col, this.gridColor);
            this.row > 0 ? this.row -= 1 : this.row;
            Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
            Screen.render();
        }
    }

    down() {
        if (this.getIsMoveSelection()) {
            this.selectMove();
        } else {
            Screen.setBackgroundColor(this.row, this.col, this.gridColor);
            this.row < 7 ? this.row += 1 : this.row;
            Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
            Screen.render();
        }
    }

    left() {
        if (this.getIsMoveSelection()) {
            this.selectMove();
        } else {
            Screen.setBackgroundColor(this.row, this.col, this.gridColor);
            this.col > 0 ? this.col -= 1 : this.col;
            Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
            Screen.render();
        }
    }

    right() {
        if (this.getIsMoveSelection()) {
            this.selectMove();
        } else {
            Screen.setBackgroundColor(this.row, this.col, this.gridColor);
            this.col < 7 ? this.col += 1 : this.col;
            Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
            Screen.render();
        }
    }

}

module.exports = Cursor;