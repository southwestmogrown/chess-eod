# Chess 4 Less (Node.js)

A terminal-based chess game built in JavaScript with an emphasis on object-oriented design, test-driven development, and educational architecture.

## Overview

This started as a small learning aid project.

Once I got moving, I had to finish the game.

I got stuck and stepped away from it for a while, but going back through Boot.dev as a refresher gave me the momentum to come back and ship it as one of my project submissions. I hope the educators there enjoy this as much as I enjoyed building it.

This repo is also part of my professional portfolio, so the `main` branch is focused on showcasing a complete, playable application.

## Features

- Playable terminal chess experience
- Two-player mode (human vs human)
- Single-player mode (human vs basic AI)
- Piece movement validation and capture handling
- Game-end flow (forfeit and king capture)
- Tested architecture across board, pieces, and game flow

## Demo Screenshots

Add your screenshots at the paths below (or update paths to match your structure).

![Main menu / startup](assets/screenshots/startup.png)
![Gameplay board](assets/screenshots/gameplay.png)
![Single-player mode](assets/screenshots/single-player.png)
![Captures and endgame](assets/screenshots/endgame.png)

## Download & Setup

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd chess-eod
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run the game

```bash
node index.js
```

When prompted:

- Enter `1` for single-player (vs computer)
- Enter `2` for two-player

## Running Tests

```bash
npm test
```

## Controls

- `up`, `down`, `left`, `right` to move the cursor
- `return` to select a piece / confirm a move
- `f` to forfeit
- `q` to quit

## Tech Stack

- Node.js
- Mocha
- Chai

## For Educators / Learners

If you want the instructional version with scaffolded exercises and concept-isolated progression, use the `starter` branch.

The `starter` branch is designed for learning OOP, TDD, complexity analysis, and data structures in staged milestones.

## Notes

- The AI is intentionally simple by design.
- The focus is clarity, architecture, and learning value over chess strength.
