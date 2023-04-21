const keypress = require('keypress');
const Command = require('./command');

class Screen {

    static whitePieces = {
        'k': '0x265A',
        'q': '0x265B',
        'r': '0x265C',
        'b': '0x265D',
        'n': '0x265E',
        'p': '0x265F'
    }

    static blackPieces = {
        'k': '0x2654',
        'q': '0x2655',
        'r': '0x2656',
        'b': '0x2657',
        'n': '0x2658',
        'p': '0x2659'
    }

    static numCols = 0;
    static numRows = 0;
    static grid = [];
    static availableMoves = null;

    static borderChar = " ";
    static spacerCount = 1;

    static gridLines = false;

    static defaultTextColor = '\x1b[37m';       // white
    static defaultBackgroundColor = '\x1b[40m'; // black

    static textColors = [];
    static backgroundColors = [];

    static message = "";

    static commands = {};

    static keypressCallback = null;

    static initialized = false;

    static initialize(numRows = 8, numCols = 8, board) {
        Screen.numRows = numRows;
        Screen.numCols = numCols;

        Screen.grid = [];
        Screen.textColors = [];
        Screen.backgroundColors = [];

        for (let row = 0 ; row < numRows; row++) {
            Screen.grid.push([]);
            for (let col = 0; col < numCols; col++) {
                const piece = board[row][col].getPiece();
                if (piece) {
                    if (piece.isWhite()) {
                        Screen.grid[row][col] = String.fromCharCode(Screen.whitePieces[piece.symbol]);
                    } else {
                        Screen.grid[row][col] = String.fromCharCode(Screen.blackPieces[piece.symbol]);
                    }
                } else {
                    Screen.grid[row][col] = ' '
                }
            }
            Screen.grid.push(new Array(numCols).fill(" "));
            Screen.textColors.push(new Array(numCols).fill(Screen.defaultTextColor));
            Screen.backgroundColors.push(new Array(numCols).fill(Screen.defaultBackgroundColor));
        }

        Screen.setQuitMessage("\nThank you for playing! \nGoodbye.\n");
        const quitCmd = new Command('q', 'quit the game', Screen.quit);
        Screen.commands['q'] = quitCmd;

        Screen.initialized = true;

        Screen.waitForInput();
    }

    static setGridLines(gridLines) {
        Screen.gridLines = gridLines;
        Screen.render();
    }

    static setMessage(msg) {
        Screen.message = msg;
    }

    static setGrid(row, col, char) {
        if (!Screen.initialized) return;

        if (char.length !== 1) {
            throw new Error("invalid grid character");
        }
        Screen.grid[row][col] = char;
    }

    static quit(showMessage=true) {
        if (showMessage) {
            //!!START SILENT
            console.log(Screen.quitMessage);                // #1 of 13
            //!!END
            //!!ADD
            // // console.log(Screen.quitMessage);              // #1 of 13
            //!!END_ADD
        };

        //!!START SILENT
        process.exit(1);                                    // #2 of 13
        //!!END
        //!!ADD
        // // process.exit(1);                                  // #2 of 13
        //!!END_ADD
    }

    static setAvailableMoves(moves) {
        this.availableMoves = moves;
    }

    static setBackgroundColor(row, col, color) {

        if (!Screen.initialized) return;

        const colorCodes = { // background color
            blackBg: '\x1b[40m',
            redBg: '\x1b[41m',
            greenBg: '\x1b[42m',
            yellowBg: '\x1b[43m',
            blueBg: '\x1b[44m',
            cyanBg: '\x1b[46m',
            whiteBg: '\x1b[47m',
            magentaBg: '\x1b[45m',
        }

        let code = colorCodes[color + 'Bg'];

        if (!code) {
            throw new Error("Invalid background color");
        }

        Screen.backgroundColors[row][col] = code;
    }

    static addCommand(key, description, action) {

        if (key === 'q') {
          throw new Error("you cannot overwrite 'q'");
        }

        Screen.commands[key] = new Command(key, description, action);
    }

    static render() {

        if (!Screen.initialized) return;

        const spacer = new Array(Screen.spacerCount).fill(' ').join('');

        //!!START SILENT
        console.clear();                                    // #3 of 13
        //!!END
        //!!ADD
        // // console.clear();                                  // #3 of 13
        //!!END_ADD

        let borderLength = Screen.numCols * (Screen.spacerCount * 2 + 1) + 2;
        if (Screen.gridLines) borderLength += Screen.numCols - 1;
        let horizontalBorder = new Array(borderLength).fill(Screen.borderChar).join('');

        //!!START SILENT
        console.log(horizontalBorder);                      // #4 of 13
        //!!END
        //!!ADD
        // // console.log(horizontalBorder);                    // #4 of 13
        //!!END_ADD

        for (let row = 0 ; row < Screen.numRows ; row++) {

            const rowCopy = [...Screen.grid[row]];

            for (let col = 0 ; col < Screen.numCols ; col++) {

                let textColor = Screen.textColors[row][col] ? Screen.textColors[row][col] : "";
                let backgroundColor = Screen.backgroundColors[row][col] ? Screen.backgroundColors[row][col] : "";
                if (!(textColor && backgroundColor)) textColor = '\x1b[0m';

                let vertLine = (Screen.gridLines && col > 0) ? '|' : '';
                rowCopy[col] = `${Screen.defaultBackgroundColor}${vertLine}\x1b[0m${textColor}${backgroundColor}${spacer}${rowCopy[col]}${spacer}\x1b[0m`;
            }

            if (Screen.gridLines && row > 0) {
                let horizontalGridLine = new Array(rowCopy.length * 4 - 1).fill('-');
                horizontalGridLine.unshift(`${Screen.borderChar}${Screen.defaultBackgroundColor}`);
                horizontalGridLine.push(`\x1b[0m${Screen.borderChar}`);

                //!!START SILENT
                console.log(horizontalGridLine.join(''));   // #5 of 13
                //!!END
                //!!ADD
                // // console.log(horizontalGridLine.join('')); // #5 of 13
                //!!END_ADD
            }

            rowCopy.unshift(`${Screen.borderChar}`);
            rowCopy.push(`${Screen.borderChar}`);

            //!!START SILENT
            console.log(rowCopy.join(''));                  // #6 of 13
            //!!END
            //!!ADD
            // // console.log(rowCopy.join(''));                // #6 of 13
            //!!END_ADD
        }

        //!!START SILENT
        console.log(horizontalBorder);                      // #7 of 13

        console.log("");                                    // #8 of 13

        console.log(Screen.message);                        // #9 of 13
        //!!END
        //!!ADD
        // // console.log(horizontalBorder);                    // #7 of 13

        // // console.log("");                                  // #8 of 13

        // // console.log(Screen.message);                      // #9 of 13
        //!!END_ADD
    }

    static setQuitMessage(quitMessage) {
        Screen.quitMessage = quitMessage;
    }

    static setTextColor(row, col, color) {

        if (!Screen.initialized) return;

        const colorCodes = {
            black: '\x1b[30m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m',
        }

        let code = colorCodes[color];

        if (!code) {
            throw new Error("Invalid color");
        }

        Screen.textColors[row][col] = code;
    }

    static printCommands() {

        //!!START SILENT
        console.log('');                                    // #10 of 13
        //!!END
        //!!ADD
        // // console.log('');                                  // #10 of 13
        //!!END_ADD

        for (let cmd in Screen.commands) {
            let description = Screen.commands[cmd].description;
            console.log(`  ${cmd} - ${description}`);
        }

        //!!START SILENT
        console.log('');                                    // #11 of 13
        //!!END
        //!!ADD
        // // console.log('');                                  // #11 of 13
        //!!END_ADD
    }

    static waitForInput() {
        keypress(process.stdin);

        process.stdin.on('keypress', function (ch, key) {

            if (!key) {
                //!!START SILENT
                console.log("Warning: Unknown keypress");   // #12 of 13
                //!!END
                //!!ADD
                // // console.log("Warning: Unknown keypress");     // #12 of 13
                //!!END_ADD
            } else if (!Screen.commands.hasOwnProperty(key.name)) {
                Screen.render();
                //!!START SILENT
                console.log(`${key.name} not supported.`);   // #13 of 13
                //!!END
                //!!ADD
                // // console.log(`${key.name} not supported.`);    // #13 of 13
                //!!END_ADD
                Screen.printCommands();
            } else {
                Screen.render();
                Screen.commands[key.name].execute();
            }
        });

        process.stdin.setRawMode(true);
        process.stdin.resume();
    }

    static setKeypressCallback (keypressCallback) {
        Screen.keypressCallback = keypressCallback;
    }

}


module.exports = Screen;