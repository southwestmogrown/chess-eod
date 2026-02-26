# Week 3: BST + Graphs + AI Extension

## Teaching Goal

Reveal advanced structures through a visible feature: single-player AI decision-making.

## Concept Targets

- Binary Search Tree for ranking/selecting moves
- Graph modeling of board adjacency and reachability
- Strategy pattern for pluggable AI engines
- Test-driven extension of architecture

## Board Reveal Plan (Graph)

Now unveil the board as a graph interpretation:

- Nodes: squares
- Edges: legal adjacency relationships (piece-dependent)
- Traversal: path/ray exploration for movement logic

This is a conceptual layer on top of the existing matrix representation.

## BST Teaching Use

Use BST as a move-ranking structure:

- Insert candidate moves by heuristic score
- Retrieve highest-ranked node for AI selection
- Discuss balanced vs unbalanced behavior

## Suggested Lesson Flow

1. Build move scoring heuristic rubric
2. Insert moves into BST and retrieve best candidate
3. Introduce graph framing for movement/search intuition
4. Compare simple heuristic AI vs random AI behavior
5. Extend tests for deterministic AI decisions

## Suggested Exercises

- Add tie-breaker strategy for equal-score moves
- Visualize BST insertion order impact
- Implement graph helper for neighbor discovery on board
- Add a second AI engine and switch by configuration

## Assessment Criteria

- Can explain why BST is useful in this feature
- Can map board positions to graph concepts
- Can implement and test a deterministic AI decision path

## Instructor Notes

- Keep AI intentionally basic; focus on architecture and data structures.
- Reinforce separation of concerns (`Game` orchestration vs `Engine` decision logic).
- Encourage students to justify every added structure.
