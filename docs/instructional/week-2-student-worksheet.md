# Week 2 Student Worksheet: Big O + Early Data Structures

Use this worksheet while working in the Week 2 starter lane.

## Objective

Practice red/green TDD while applying Big O thinking to:

- map/object lookup
- array append behavior
- linked-list traversal
- nested-loop complexity labeling

## Files You Will Use

- `starter/week2/complexity-data-structures.spec.js`
- `starter/week2/complexity-data-structures.js`

## Commands

- Run only Week 2 exercises: `npm run test:week2`
- (Optional) Run full project suite: `npm test`

## Ground Rules

1. Keep tests red before implementing each method.
2. Make the smallest possible change to go green.
3. Refactor only after tests pass.
4. Do not introduce board internals in Week 2 exercises.

## Exercise Order

### Exercise A: Map Lookup

Target method: `getPieceCount(pieceCountMap, symbol)`

- Goal: return the count for `symbol`
- If symbol is missing, return `0`

### Exercise B: Array Append

Target method: `appendMoveHistory(history, move)`

- Goal: append `move` to `history`
- Return the new array length

### Exercise C: Linked List Traversal

Target method: `linkedListToArray(head)`

- Goal: collect `val` from each node into an array
- Preserve list order
- Return `[]` when `head` is `null`

### Exercise D: Complexity Label

Target method: `getBoardScanComplexityLabel(rows, cols)`

- Goal: return `"O(n^2)"` for full 2D board scans
- Focus on conceptual complexity, not runtime measurement

## Reflection Prompts (Write 1–2 sentences each)

1. Why is map lookup typically treated as constant-time intuition?
2. Why is linked-list-to-array conversion linear?
3. Why do nested row/col scans map to quadratic complexity labeling?
4. What changed between your first and final implementation?

## Deliverables

- All Week 2 exercise tests passing
- Short complexity notes for each method
- One refactor example with explanation

## Challenge Extension (Optional)

Add a method (and tests) that returns unique piece symbols from a move list.
Then describe expected complexity in terms of input size.
