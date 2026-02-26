# Week 1 Instructor Solution Guide (Starter Lane)

This guide supports facilitation of the red-first exercises in:

- `starter/week1/game-behavior.spec.js`
- `starter/week1/game-behavior.js`

Use this as instructor-only material during live labs.

## Session Goal

Students practice Red → Green → Refactor while treating board behavior as a black box.

## Runbook

1. Run the lane: `npm run test:week1` (expect failures)
2. Pick one failing test at a time
3. Implement the smallest passing change
4. Re-run only Week 1 tests
5. Refactor for clarity once green

## Exercise 1: Invalid Selection Message

### What Students See

Failing test expects:

- `"Invalid piece selection."`

### Coaching Prompts

- Where else in the app is this string used?
- Why should behavior be exact here?
- What would make this easy to centralize later?

### Expected Minimal Fix Shape

- `getInvalidSelectionMessage()` returns the exact expected string.

## Exercise 2: Turn Switching

### What Students See

Given `currentPlayer`, `p1`, `p2`, return the other player.

### Coaching Prompts

- What assumptions are safe?
- How should the method behave if inputs are malformed?
- Is comparing by identity or by value more appropriate?

### Expected Minimal Fix Shape

- If `currentPlayer === p1`, return `p2`; otherwise return `p1`.

## Exercise 3: King Capture Detection

### What Students See

Method should return:

- `true` when piece symbol is `k`
- `false` for non-king pieces
- `false` when piece is null

### Coaching Prompts

- How do we guard against null safely?
- Why keep this logic tiny and composable?

### Expected Minimal Fix Shape

- Null check
- Symbol check against `"k"`

## Suggested Debrief Topics

- Why these methods are easy to test in isolation
- How this maps back to larger `Game` orchestration behavior
- Why black-box board treatment lowers cognitive load early

## Optional Reveal (After Students Finish)

Example implementation pattern (share only after students complete):

- `getInvalidSelectionMessage` → return exact string
- `getNextPlayer` → ternary by identity (`currentPlayer === p1 ? p2 : p1`)
- `didCaptureKing` → `!!capturedPiece && capturedPiece.getSymbol() === "k"`

## Instructor Checklist

- Students run red tests before coding
- Students commit green state after each exercise
- Students explain one refactor decision in plain language
