# ♟️ Terminal Chess

> *A fully playable chess engine in your terminal — built to be read, not just run.*

Terminal Chess is a polished command-line chess application built with JavaScript and Node.js. What started as a teaching tool for App Academy students became a mild obsession: a complete, playable game with an AI opponent, comprehensive test coverage, and a codebase deliberately structured to teach.

The code is meant to be explored. Every architectural decision — from piece inheritance to move validation to the AI engine — is an opportunity to learn something real about software design.

---

## ✨ Features

- **Two game modes** — Human vs. AI and Human vs. Human
- **Full rules enforcement** — check, checkmate, and turn validation
- **AI opponent** — deterministic-first move ranking with an intentional "thinking" delay
- **Polished terminal UI** — startup splash screen, labeled board, live capture panels
- **Comprehensive test suite** — unit and integration coverage across game flow, board logic, and every piece type

---

## 🎓 Built to Teach

This project was designed as a living demonstration of three core software engineering concepts taught simultaneously through a single, coherent codebase:

| Concept | Where You'll See It |
|---|---|
| **Object Oriented Programming** | Piece class hierarchy — shared behavior, specialized movement |
| **Data Structures & Algorithms** | Board representation, move generation, AI ranking logic |
| **Test Driven Development** | Full test suite written alongside the implementation |

### Educational Branch

The `starter` branch contains a **scaffolded version of this project** with staged exercises — designed for students to build the engine incrementally, guided by failing tests.

If you're learning and want to build this yourself before reading the solution, start there:

```bash
git checkout starter
```

---

## 🚀 Getting Started

### 1. Clone

```bash
git clone <your-repo-url>
cd terminal-chess
```

### 2. Install

```bash
npm install
```

### 3. Play

```bash
node index.js
```

When prompted:
- `1` — Single-player (Human vs. AI)
- `2` — Two-player (Human vs. Human)

---

## 🎮 Controls

| Key | Action |
|---|---|
| `↑ ↓ ← →` | Move cursor |
| `return` | Select / confirm |
| `f` | Forfeit |
| `q` | Quit |

---

## 🧪 Testing

```bash
# Full test suite
npm test

# Regression checks only
npm run test:regression
```

Tests cover game flow, board logic, individual piece movement rules, and AI behavior. The suite is designed to be readable — a good entry point for understanding how the pieces fit together before diving into the implementation.

---

## 🏗️ Architecture

```
chess/
├── game/        # Orchestration, cursor flow, screen rendering, command handling
├── board/       # Board primitive and coordinate system
├── squares/     # Square representation
├── pieces/      # Piece classes — King, Queen, Rook, Bishop, Knight, Pawn
├── players/     # Human and computer player models
├── ai/          # Move ranking and engine behavior
├── moves/       # Available and completed move structures
└── test/        # Unit and integration coverage
```

The `pieces/` directory is the best place to start reading. Each piece encapsulates its own movement rules, inheriting shared behavior from a base class. It's a clean, real-world example of OOP that goes beyond the typical "Animal → Dog" tutorial.

---

## 🛠️ Tech Stack

**Runtime:** Node.js · JavaScript (CommonJS)

**Packages:**
- `prompt-sync` — interactive terminal prompts
- `keypress` — real-time board navigation

**Testing:**
- `mocha` — test runner
- `chai` — assertions
- `chai-spies` — behavior verification

---

## 💡 Design Notes

- **The AI is intentionally lightweight.** Deterministic-first move selection keeps it readable and testable — understanding *how* it works matters more than *how well* it plays.
- **The codebase is structured for extension.** Adding a new piece, a new rule, or a new game mode should feel natural, not like surgery.
- **Readability is a feature.** Comments explain *why*, not just *what*.
