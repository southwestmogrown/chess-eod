# Week 2: Big O + Early Data Structures

## Teaching Goal

Connect runtime/space complexity thinking to real project choices using existing arrays, linked lists, and map-like lookups.

## Concept Targets

- Time complexity basics (`O(1)`, `O(n)`, `O(n^2)`)
- Space trade-offs
- Arrays vs linked lists in practical use
- Hash map lookup behavior and constant-time intuition

## Where to Look in Project

- Board traversal loops in game move generation (nested iteration)
- Move history linked-list style structures (`AvailableMovesList`, `CompletedMovesList`)
- Piece symbol maps and color maps as hash-like dictionaries

## Suggested Lesson Flow

1. Complexity labeling exercise on existing methods
2. Compare traversal-heavy methods vs direct lookup methods
3. Discuss linked-list insertion/removal trade-offs
4. Refactor one method for readability while preserving complexity

## Suggested Exercises

- Annotate complexity for selected methods in comments/doc notes
- Add tests that verify linked-list behavior under multiple inserts/removals
- Introduce a simple move-cache map and discuss invalidation costs

## Assessment Criteria

- Can estimate complexity of current game operations
- Can justify structure choice with trade-offs
- Can identify hotspots where complexity scales poorly

## Instructor Notes

- Keep examples concrete and project-attached.
- Avoid premature optimization debates.
- Emphasize: clear code + measured complexity awareness.
