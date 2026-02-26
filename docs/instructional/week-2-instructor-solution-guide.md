# Week 2 Instructor Solution Guide (Big O + Early Data Structures)

This guide supports facilitation of the Week 2 red-first exercises in:

- `starter/week2/complexity-data-structures.spec.js`
- `starter/week2/complexity-data-structures.js`

## Session Goal

Help students map practical code decisions to complexity language and data-structure tradeoffs.

## Runbook

1. Run: `npm run test:week2` (expect failures)
2. Fix one test at a time using smallest possible implementation
3. Re-run Week 2 lane after each green step
4. Discuss complexity implications after each solved method

## Exercise Guidance

### 1) Map lookup (`getPieceCount`)

- Concept: hash map/object lookup expected constant time intuition
- Expected behavior: return count for existing symbol; `0` when missing
- Coaching prompt: Why use lookup maps here instead of scanning arrays each time?

### 2) Array append (`appendMoveHistory`)

- Concept: array append semantics and return values
- Expected behavior: add move to history and return resulting length
- Coaching prompt: What does “amortized” cost mean for append operations?

### 3) Linked list traversal (`linkedListToArray`)

- Concept: linear traversal and pointer movement
- Expected behavior: preserve node order in result array; empty list returns `[]`
- Coaching prompt: Why is conversion from linked list to array `O(n)`?

### 4) Complexity labeling (`getBoardScanComplexityLabel`)

- Concept: nested iteration over 2D board state
- Expected behavior: return `"O(n^2)"` for full two-dimensional scans
- Coaching prompt: How do loops over rows and columns combine complexity?

## Debrief

- Where each structure is already present in the chess codebase
- Why “clear first, optimize second” is still valid in fundamentals
- How complexity labels guide architecture, not just micro-optimizations

## Optional Reveal (Post-Lab)

Share only after students complete:

- `getPieceCount`: guarded lookup defaulting to `0`
- `appendMoveHistory`: `push` then return length
- `linkedListToArray`: while-loop traversal collecting `val`
- `getBoardScanComplexityLabel`: return constant string `"O(n^2)"`
