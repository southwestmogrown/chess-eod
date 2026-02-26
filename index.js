const Game = require("./game");

function renderStartupSplash() {
  console.clear();

  const width = 52;
  const line = "=".repeat(width);
  const inner = "-".repeat(width);

  console.log(line);
  console.log("♟  WELCOME TO CHESS 4 LESS");
  console.log("   Terminal chess with style");
  console.log(line);
  console.log("Preview Board");
  console.log(inner);
  console.log("    A   B   C   D   E   F   G   H");
  console.log("  +---+---+---+---+---+---+---+---+");

  for (let rank = 8; rank >= 1; rank--) {
    let row = `${rank} `;
    for (let file = 0; file < 8; file++) {
      row += "|   ";
    }
    row += `| ${rank}`;
    console.log(row);
    console.log("  +---+---+---+---+---+---+---+---+");
  }

  console.log("    A   B   C   D   E   F   G   H");
  console.log(inner);
  process.stdout.write("Loading game setup");
  console.log("");
}

function startGameWithIntroAnimation() {
  if (process.env.NODE_ENV === "test") {
    new Game();
    return;
  }

  renderStartupSplash();

  let dotCount = 0;
  const intervalId = setInterval(() => {
    dotCount += 1;
    process.stdout.write(".");

    if (dotCount >= 3) {
      clearInterval(intervalId);
      console.log("\n");
      new Game();
    }
  }, 300);
}

startGameWithIntroAnimation();
