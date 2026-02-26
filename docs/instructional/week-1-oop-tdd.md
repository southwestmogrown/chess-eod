# Week 1: OOP + TDD Foundations

## Teaching Goal

Build confidence in object-oriented design and test-first development without overwhelming students with board-internals complexity.

## Scope (Black-Box Board)

Students should treat the board as a provided dependency with known behavior:

- It has squares.
- Squares may contain pieces.
- Moves can be validated through piece rules.

Do **not** teach graph representation yet.

## Concept Targets

- Classes, inheritance, and polymorphism
- Encapsulation of game state
- Interface boundaries between `Game`, `Player`, `Piece`, and `Board`
- Red-Green-Refactor cycle

## Suggested Lesson Flow

1. Model walkthrough of `Piece` inheritance hierarchy
2. Write/inspect a failing test for a movement rule
3. Implement minimal behavior to pass
4. Refactor for readability and duplication removal
5. Repeat with one additional piece behavior

## Suggested TDD Exercises

- Add a failing test for invalid move selection feedback
- Add a failing test for turn switching
- Add a failing test for game ending on king capture
- Refactor move-validation helper methods without changing behavior

## Assessment Criteria

- Can explain why a class owns specific behavior
- Can produce a red test before implementation
- Can safely refactor with tests passing
- Can identify seams for extension (e.g., human vs computer player)

## Instructor Notes

- Keep students focused on behavior contracts, not full chess correctness.
- Prefer small tests over broad integration first.
- Track vocabulary: dependency, invariant, abstraction, polymorphism.
