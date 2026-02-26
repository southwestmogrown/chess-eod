# Instructional Guide Set (Supplemental)

This folder contains curriculum-focused readmes intended for instructional delivery.
It is intentionally separate from the project root `README.md`.

## Structure

- `week-1-oop-tdd.md`
- `week-2-big-o-linear-ds.md`
- `week-3-bst-graphs-ai.md`
- `starter-branch-plan.md`
- `starter-first-commit-checklist.md`
- `week-1-instructor-solution-guide.md`

## Recommended Sequence

1. Week 1: Treat the board as a **black box** while teaching OOP and TDD fundamentals.
2. Week 2: Introduce Big O and core linear/non-tree structures in the existing implementation.
3. Week 3: Reveal board-adjacency as a graph concept and integrate BST/graph-driven AI extension.

## Starter Exercise Lane

For intentionally failing TDD exercises (separate from the main suite):

- Run `npm run test:week1`
- Implement TODOs in `starter/week1/game-behavior.js`

## Instructional Positioning

- Use this project as a **progressive reveal** codebase.
- Keep implementation quality practical over optimal.
- Prioritize design clarity, testability, and explicit data-structure choice.
