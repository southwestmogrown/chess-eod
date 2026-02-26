const keypress = require("keypress");
const Command = require("./command");
const CaptureTable = require("../captures");

class Screen {
  static whitePieces = {
    k: "0x265A",
    q: "0x265B",
    r: "0x265C",
    b: "0x265D",
    n: "0x265E",
    p: "0x265F",
  };

  static blackPieces = {
    k: "0x2654",
    q: "0x2655",
    r: "0x2656",
    b: "0x2657",
    n: "0x2658",
    p: "0x2659",
  };

  static numCols = 0;
  static numRows = 0;
  static grid = [];
  static availableMoves = null;

  static borderChar = " ";
  static spacerCount = 1;

  static gridLines = false;

  static defaultTextColor = "\x1b[37m"; // white
  static defaultBackgroundColor = "\x1b[40m"; // black

  static textColors = [];
  static backgroundColors = [];

  static message = "";

  static commands = {};

  static keypressCallback = null;

  static initialized = false;

  static captures = new CaptureTable();

  static initialize(numRows = 8, numCols = 8, board) {
    Screen.numRows = numRows;
    Screen.numCols = numCols;

    Screen.grid = [];
    Screen.textColors = [];
    Screen.backgroundColors = [];

    for (let row = 0; row < numRows; row++) {
      Screen.grid.push([]);
      for (let col = 0; col < numCols; col++) {
        const piece = board[row][col].getPiece();
        if (piece) {
          if (piece.isWhite()) {
            Screen.grid[row][col] = String.fromCharCode(
              Screen.whitePieces[piece.symbol],
            );
          } else {
            Screen.grid[row][col] = String.fromCharCode(
              Screen.blackPieces[piece.symbol],
            );
          }
        } else {
          Screen.grid[row][col] = " ";
        }
      }
      Screen.textColors.push(new Array(numCols).fill(Screen.defaultTextColor));
      Screen.backgroundColors.push(
        new Array(numCols).fill(Screen.defaultBackgroundColor),
      );
    }

    Screen.setQuitMessage("\nThank you for playing! \nGoodbye.\n");
    const quitCmd = new Command("q", "quit the game", Screen.quit);
    Screen.commands["q"] = quitCmd;

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

  static quit(showMessage = true) {
    if (showMessage) {
      console.log(Screen.quitMessage);
    }

    process.exit(1);
  }

  static setAvailableMoves(moves) {
    this.availableMoves = moves;
  }

  static setBackgroundColor(row, col, color) {
    if (!Screen.initialized) return;

    const colorCodes = {
      // background color
      blackBg: "\x1b[40m",
      redBg: "\x1b[41m",
      greenBg: "\x1b[42m",
      yellowBg: "\x1b[43m",
      blueBg: "\x1b[44m",
      cyanBg: "\x1b[46m",
      whiteBg: "\x1b[47m",
      magentaBg: "\x1b[45m",
    };

    let code = colorCodes[color + "Bg"];

    if (!code) {
      throw new Error("Invalid background color");
    }

    Screen.backgroundColors[row][col] = code;
  }

  static addCommand(key, description, action) {
    if (key === "q") {
      throw new Error("you cannot overwrite 'q'");
    }

    Screen.commands[key] = new Command(key, description, action);
  }

  static render() {
    if (!Screen.initialized) return;

    const spacer = new Array(Screen.spacerCount).fill(" ").join("");
    const columnLabels = Array.from({ length: Screen.numCols }, (_, idx) =>
      String.fromCharCode(65 + idx),
    );
    const columnSeparator = Screen.gridLines ? " | " : "   ";
    const filesHeader = `    ${columnLabels.join(columnSeparator)}`;

    console.clear();

    let borderLength = Screen.numCols * (Screen.spacerCount * 2 + 1) + 2;
    if (Screen.gridLines) borderLength += Screen.numCols - 1;
    const horizontalBorder = `|${"-".repeat(borderLength - 2)}|`;
    const rankDivider = "--";
    const borderedHorizontal = `${rankDivider}${horizontalBorder}${rankDivider}`;

    const sectionWidth = Math.max(borderLength + 6, 40);
    const sectionDivider = "=".repeat(sectionWidth);
    const subsectionDivider = "-".repeat(sectionWidth);
    const whiteCaptures =
      Screen.captures.getWhiteCaptures().join(" ") || "None";
    const blackCaptures =
      Screen.captures.getBlackCaptures().join(" ") || "None";

    console.log(sectionDivider);
    console.log("♟  CHESS 4 LESS");
    console.log(sectionDivider);
    console.log(`White Captures: ${whiteCaptures}`);
    console.log(subsectionDivider);
    console.log(filesHeader);
    console.log(borderedHorizontal);

    for (let row = 0; row < Screen.numRows; row++) {
      const rowCopy = [...Screen.grid[row]];

      for (let col = 0; col < Screen.numCols; col++) {
        let textColor = Screen.textColors[row][col]
          ? Screen.textColors[row][col]
          : "";
        let backgroundColor = Screen.backgroundColors[row][col]
          ? Screen.backgroundColors[row][col]
          : "";
        if (!(textColor && backgroundColor)) textColor = "\x1b[0m";

        let vertLine = Screen.gridLines && col > 0 ? "|" : "";
        rowCopy[col] =
          `${Screen.defaultBackgroundColor}${vertLine}\x1b[0m${textColor}${backgroundColor}${spacer}${rowCopy[col]}${spacer}\x1b[0m`;
      }

      if (Screen.gridLines && row > 0) {
        let horizontalGridLine = new Array(rowCopy.length * 4 - 1).fill("-");
        horizontalGridLine.unshift(`|`);
        horizontalGridLine.push(`|`);

        console.log(
          `${rankDivider}${horizontalGridLine.join("")}${rankDivider}`,
        );
      }

      rowCopy.unshift("|");
      rowCopy.push("|");

      const rank = 8 - row;
      console.log(`${rank} ${rowCopy.join("")} ${rank}`);
    }

    console.log(borderedHorizontal);
    console.log(filesHeader);
    console.log(subsectionDivider);
    console.log(`Black Captures: ${blackCaptures}`);
    console.log(sectionDivider);
    console.log(`Status: ${Screen.message}`);
    console.log("Controls: arrows move | return select | f forfeit | q quit");
    console.log(sectionDivider);
  }

  static setQuitMessage(quitMessage) {
    Screen.quitMessage = quitMessage;
  }

  static setTextColor(row, col, color) {
    if (!Screen.initialized) return;

    const colorCodes = {
      black: "\x1b[30m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",
    };

    let code = colorCodes[color];

    if (!code) {
      throw new Error("Invalid color");
    }

    Screen.textColors[row][col] = code;
  }

  static printCommands() {
    console.log("");

    for (let cmd in Screen.commands) {
      let description = Screen.commands[cmd].description;
      console.log(`  ${cmd} - ${description}`);
    }

    console.log("");
  }

  static waitForInput() {
    keypress(process.stdin);

    process.stdin.on("keypress", function (ch, key) {
      if (!key) {
        console.log("Warning: Unknown keypress");
      } else if (!Screen.commands.hasOwnProperty(key.name)) {
        Screen.render();
        console.log(`${key.name} not supported.`);

        Screen.printCommands();
      } else {
        Screen.render();
        Screen.commands[key.name].execute();
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  static setKeypressCallback(keypressCallback) {
    Screen.keypressCallback = keypressCallback;
  }
}

module.exports = Screen;
