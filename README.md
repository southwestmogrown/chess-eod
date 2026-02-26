# Terminal Chess (Node.js)

A terminal-based chess app built in JavaScript with an object-oriented design, test-driven workflow, and instructional architecture for classroom use.

## Features

- Full board initialization and piece movement rules
- Two-player mode (human vs human)
- Single-player mode (human vs basic AI)
- Basic AI move selection with a Binary Search Tree-backed move ranking flow
- Test suite for pieces, board behavior, and game flow integration

## Tech Stack

- Node.js
- Mocha + Chai

## Quick Start

```bash
npm install
node index.js
```

At launch, choose:

- `1` for single-player (vs computer)
- `2` for two-player

## Run Tests

```bash
npm test
```

## Controls

- Arrow-key commands via screen command mapping (`up`, `down`, `left`, `right`)
- `return` to select piece / confirm move
- `f` to forfeit
- `q` to quit

## Project Goals

This project is intentionally designed to support:

- object-oriented programming (OOP)
- test-driven development (TDD)
- progressive introduction of data structures and algorithmic thinking

## Learning / Starter Branch

The `main` branch is intended to showcase the app experience.

For instructional use, use a separate starter branch with:

- scaffolded or stubbed implementation points
- guided exercises and docs
- progressive concept reveal for students

Instructional documentation lives in:

- `docs/instructional/`

## Suggested Branch Convention

- `main` → polished, app-facing branch for GitHub visitors
- `starter` (or `starter/<cohort-or-term>`) → classroom branch with stubs + exercises

Examples:

- `starter`
- `starter/spring-2026`
- `starter/fundamentals`

## Suggested Release/Tag Convention

Use lightweight tags to mark teaching milestones:

- `app-v1.0.0` (showcase baseline)
- `starter-v1.0.0` (initial classroom baseline)
- `starter-v1.1.0` (updated exercises/tests)

## Notes

- The AI is intentionally simple by design.
- The focus is architecture clarity and instructional value over chess strength.
