# Chess 4 Less

Chess 4 Less is a polished terminal chess application built with JavaScript and Node.js. The project emphasizes clean object-oriented design, test-driven development, and a readable gameplay experience in the command line.

## Project Highlights

- Full playable chess loop in the terminal
- Single-player mode (human vs computer) and two-player mode (human vs human)
- Check and checkmate enforcement
- Turn-based input flow with AI “thinking” delay
- Enhanced terminal presentation (startup splash, board labeling, capture panels)
- Comprehensive automated test coverage across game flow, board logic, and pieces

## Demo Screenshots

You can drop in your screenshots later at the paths below.

![Startup screen](assets/screenshots/startup.png)
![Board during play](assets/screenshots/gameplay.png)
![Single-player turn flow](assets/screenshots/single-player.png)
![Endgame state](assets/screenshots/endgame.png)

## Installation

### 1) Clone

```bash
git clone <your-repo-url>
cd chess-eod
```

### 2) Install dependencies

```bash
npm install
```

### 3) Start the game

```bash
node index.js
```

When prompted for mode:

- Enter `1` for single-player
- Enter `2` for two-player

## Controls

- `up`, `down`, `left`, `right`: move cursor
- `return`: select/confirm
- `f`: forfeit
- `q`: quit

## Testing

Run the full test suite:

```bash
npm test
```

Run focused regression checks:

```bash
npm run test:regression
```

## Technologies & Packages

### Runtime

- Node.js
- JavaScript (CommonJS modules)

### Core Packages

- `prompt-sync` for interactive terminal prompts
- `keypress` for real-time board navigation and command handling

### Testing

- `mocha` as the test runner
- `chai` for assertions
- `chai-spies` for behavior verification in selected tests

## Architecture Overview

- `game/`: orchestration, cursor flow, screen rendering, command handling
- `board/`, `squares/`: board and coordinate primitives
- `pieces/`: piece-specific movement rules (king, queen, rook, bishop, knight, pawn)
- `players/`: human/computer player models
- `ai/`: move-ranking and engine behavior for computer turns
- `moves/`: available/completed move structures
- `test/`: integration and unit coverage

## Notes

- AI is intentionally lightweight and deterministic-first for clarity and testability.
- The codebase is structured to support learning, extension, and refactoring.

## Educational Branch

For scaffolded instructional materials and staged exercises, use the `starter` branch.
