# Week 3 Student Worksheet: BST + Graphs + AI

Use this worksheet while extending the starter project in Week 3.

## Objective

Practice red/green TDD while introducing:

- BST-based move ranking
- graph thinking for board relationships
- pluggable AI strategy behavior

## Concept Frame

For Week 3, the board is no longer just a black box conceptually.
You may discuss board positions as a graph model:

- nodes = squares
- edges = legal adjacency/transition relationships

Implementation can still use the existing matrix representation.

## Recommended Files to Explore

- `ai/move-ranking-bst.js`
- `ai/basic-engine.js`
- `game/index.js` (`getLegalMovesForPlayer` boundary)
- `test/ai-spec.js`

## Commands

- Main suite: `npm test`
- Optional focused run: `npm test -- --grep "AI data structures and engine"`

## Red/Green Lab Tasks

### Task A: BST Ranking Behavior

1. Add a failing test for tie-handling behavior (equal score moves).
2. Implement the minimal code to make it pass.
3. Refactor for readability.

Reflection: Why does BST insertion order matter for equal keys?

### Task B: AI Tie-Break Strategy

1. Add a failing test for deterministic tie-break behavior.
2. Implement a stable tie-break rule.
3. Confirm existing AI tests remain green.

Reflection: Why is deterministic output important for testing?

### Task C: Graph Framing Exercise (Concept + Code)

1. Choose one piece movement pattern (rook, bishop, or knight).
2. Describe the node/edge model in 3–5 bullet points.
3. Add one test that validates a move-generation edge case.

Reflection: How does graph framing improve reasoning about legal moves?

### Task D: Strategy Extension

1. Add a failing test that uses an alternate AI engine strategy.
2. Implement minimal injection/configuration change.
3. Keep orchestration in `Game` separate from engine decision logic.

Reflection: What does this reveal about separation of concerns?

## Deliverables

- New/updated tests demonstrating red→green progression
- At least one BST-focused test and one strategy-focused test
- Short written note connecting graph model to movement logic

## Guardrails

- Do not over-optimize for chess strength.
- Keep focus on architecture, data structures, and testability.
- Prefer small, explainable changes over large rewrites.

## Challenge Extension (Optional)

Add a second AI engine with a different scoring heuristic and compare outcomes over 5 simulated turns.
Record observations about predictability and complexity.
