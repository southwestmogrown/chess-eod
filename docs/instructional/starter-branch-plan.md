# Starter Branch Plan (Concept Isolation)

This plan creates a teaching-friendly branch strategy where concepts are introduced incrementally before integrating into the full game.

## Branch Strategy

- `main`: integrated, fully assembled project
- `starter/week-1-oop-tdd`: minimal scaffolding and tests for OOP/TDD practice
- `starter/week-2-big-o-ds`: adds linear structures and complexity-focused tasks
- `starter/week-3-bst-graphs`: introduces BST/graph extension points and AI hooks

## Implementation Pattern

1. Create starter branch from a stable baseline.
2. Remove/disable advanced features not yet taught.
3. Leave TODO-guided tests and skeleton interfaces.
4. Merge forward into next week’s starter branch.
5. Compare against `main` in recap sessions.

## What to Isolate by Week

### Week 1 Starter

- Keep: piece classes, move validation tests, turn logic basics
- Hide: AI internals, graph framing, advanced optimization concerns
- Include: explicit failing tests and refactor checkpoints

### Week 2 Starter

- Keep Week 1 content
- Add: linked-list behavior tasks and complexity analysis prompts
- Add: map/dictionary lookup exercises
- Hide: BST and graph dependencies

### Week 3 Starter

- Keep Weeks 1–2 content
- Add: BST move-ranking module skeleton
- Add: graph helper abstractions for board relationships
- Add: AI strategy interface and one simple implementation target

## Suggested Classroom Workflow

- Day start: pull branch + run tests
- Lab: complete targeted TODOs
- Wrap-up: review complexity and architecture decisions
- Optional: cherry-pick notable student solutions into demo branch

## Quality Gates Per Branch

- Passing tests for scoped week goals
- No leaked advanced APIs from future weeks
- Inline comments that explain design intent (why), not syntax (what)
