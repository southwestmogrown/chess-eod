# Starter Branch: First Commit Checklist

Purpose: establish a clean instructional baseline while keeping the board as a black-box dependency in early lessons.

## Commit Objective

Create a classroom-ready starting point that is stable, testable, and concept-scoped.

## Checklist

- [x] Confirm branch context (`starter`) and clean git status
- [x] Preserve main app functionality and passing baseline tests
- [x] Keep board implementation treated as black box for Week 1
- [x] Keep instructional docs separate from root showcase README
- [x] Add first wave of starter TODO markers in student-target files
- [x] Add scaffolded tests for Week 1 tasks (initially failing or skipped by design)
- [x] Prepare branch handoff notes for instructors

## Black-Box Board Rule (Week 1)

During Week 1 activities, students should consume board behavior through existing interfaces only:

- Interact via `Game`, `Square`, and piece `canMove` contracts
- Avoid teaching board internals as graph/adjacency structures
- Delay graph framing until Week 3 modules

## Suggested First Student Tasks (Week 1)

1. Add/repair a movement validation test
2. Add/repair turn transition behavior test
3. Refactor one duplicated branch in move-selection flow
4. Explain class responsibility boundaries in a short write-up

## Handoff Note Template (for instructor)

- Starter branch tag:
- Expected Node version:
- Commands to run (`npm install`, `npm test`, `node index.js`):
- Known intentionally incomplete areas:
- Week 1 success criteria:
