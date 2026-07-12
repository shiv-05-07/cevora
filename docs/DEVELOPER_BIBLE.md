# DEVELOPER_BIBLE.md

> **Project:** Cevora  
> **Status:** Living Document  
> **Version:** 0.1.0 (Draft)

---

# Table of Contents

## Part I — Foundation
1. Purpose of this Handbook
2. Engineering Philosophy
3. Core Principles
4. Decision-Making Framework

## Part II — Architecture
5. Architecture Philosophy
6. Project Structure
7. Layer Responsibilities
8. Naming Conventions

## Part III — Development Standards
9. React & Next.js Standards
10. TypeScript Standards
11. Component Guidelines
12. API Standards
13. Database Standards
14. Security Standards

## Part IV — Design Standards
15. UI System
16. Accessibility
17. Performance

## Part V — Collaboration
18. Git Workflow
19. Code Reviews
20. Documentation

## Part VI — AI Development
21. AI Coding Assistant Rules
22. Prompting Guidelines
23. AI Code Review Checklist

## Part VII — Quality
24. Testing
25. Definition of Done
26. Anti-Patterns

## Part VIII — Future
27. Scalability
28. Future-Proofing

---

# Part I — Foundation

## 1. Purpose

This handbook defines how Cevora is engineered. It is the authoritative reference for all contributors—human or AI—and should be consulted before introducing new code, architecture, or dependencies.

### Goals

- Keep the codebase consistent.
- Enable safe scaling.
- Reduce technical debt.
- Make AI-generated code predictable.
- Maintain production-quality engineering standards.

### Scope

This handbook focuses on **how Cevora is built**. Product requirements, feature specifications, user stories, and business goals belong in the Product Requirements Document (PRD), not here.

---

## 2. Engineering Philosophy

Every engineering decision should optimize for the following priorities:

1. Correctness
2. Maintainability
3. Simplicity
4. Security
5. Scalability
6. Performance
7. Developer Experience

### Guiding Principles

- Prefer proven solutions over trendy ones.
- Avoid premature optimization.
- Write code for the next developer, not just the current task.
- Favor explicitness over cleverness.
- Small, incremental improvements beat large, risky rewrites.

---

## 3. Core Principles

### Build for clarity

Code should communicate intent before implementation details.

### Keep modules cohesive

Each module should have a single, well-defined responsibility.

### Minimize coupling

Reduce dependencies between features and layers.

### Prefer composition

Favor composition over inheritance wherever practical.

### Design for change

Expect requirements to evolve. Structure code so change is localized.

---

## 4. Decision-Making Framework

When multiple approaches are possible, evaluate them in this order:

1. Is it correct?
2. Is it secure?
3. Is it maintainable?
4. Is it simple?
5. Will it scale?
6. Does it improve developer experience?

If a proposal fails one of the higher-priority questions, reconsider it before optimizing lower-priority concerns.

---

> **End of Draft Part 1**

The remaining sections will expand this document into the complete Engineering Handbook while preserving this structure.


---

# Part II — Architecture

## 5. Architecture Philosophy

### Purpose
Architecture exists to make change safe, predictable, and inexpensive.

### Principles

- Feature-first organization over technology-first organization.
- Business logic must not depend on UI.
- Infrastructure should be replaceable with minimal impact.
- Keep dependencies flowing inward toward business logic.
- Avoid global state unless there is a clear justification.

### Rules

✅ Build features as independent modules whenever possible.

✅ Prefer server-side execution for sensitive logic.

❌ Never let UI components directly communicate with the database.

---

## 6. Project Structure

```
app/
components/
  ui/
  shared/
features/
  feature-name/
    components/
    actions/
    hooks/
    lib/
    types/
    validation/
lib/
services/
hooks/
types/
utils/
styles/
prisma/
public/
```

### Why

This structure scales without creating "miscellaneous" folders filled with unrelated files.

---

## 7. Layer Responsibilities

### app/
Responsible only for routing, layouts, pages, and route-level composition.

### features/
Contains business logic grouped by domain.

### components/
Reusable UI that is not tied to one feature.

### lib/
Shared infrastructure, helpers, and integrations.

### services/
External service integrations.

### prisma/
Database schema and migrations.

---

## 8. Naming Conventions

### Files

Components:
```
InterviewCard.tsx
```

Hooks:
```
useInterview.ts
```

Utilities:
```
formatDate.ts
```

Server Actions:
```
actions.ts
```

Validation:
```
schema.ts
```

### Variables

Use descriptive names.

Good:

```
interviewExperience
```

Bad:

```
data
temp
obj
```

---

# Part III — Development Standards

## 9. React & Next.js Standards

### Components

Prefer Server Components by default.

Use Client Components only when needed for:
- browser APIs
- local interactive state
- event handlers

### Rules

✅ Keep components focused.

✅ One responsibility per component.

✅ Extract repeated UI.

❌ Do not create massive "God Components."

### Server Actions

Prefer Server Actions for mutations that originate from your own application.

Prefer API Routes when:
- exposing public endpoints
- integrating with third parties
- handling webhooks

---

## 10. TypeScript Standards

### Rules

- Enable strict mode.
- Avoid `any`.
- Prefer `unknown` over `any`.
- Create shared types only when reused.

Good:

```ts
type Interview = {
  id: string;
  company: string;
}
```

Avoid unnecessary abstractions or deeply nested generic types unless they provide measurable value.

---

_End of Draft Part 2_


## 11. Component Design Guidelines

### Principles

- Components should be small, predictable, and reusable.
- Separate presentation from business logic whenever practical.
- Prefer composition over large configurable components.

### Component Categories

- **UI Components** (`components/ui`) — Generic building blocks.
- **Shared Components** (`components/shared`) — Reusable across features.
- **Feature Components** (`features/<feature>/components`) — Used only within a specific feature.

### Rules

✅ Keep props explicit.

✅ Use meaningful names.

✅ Extract repeated logic into hooks or utilities.

❌ Avoid components longer than ~250 lines unless justified.

❌ Avoid deeply nested prop drilling; prefer composition or context where appropriate.

---

## 12. Hooks Guidelines

Create a custom hook only when logic is reused or significantly improves readability.

Good examples:

```
useAuth()
useInterviewSearch()
useTheme()
```

Rules:

- Hooks must begin with `use`.
- Hooks should not render UI.
- One responsibility per hook.
- Return the minimum API required by consumers.

---

## 13. Utility Functions

Utilities must:

- Be pure whenever possible.
- Have no UI dependencies.
- Avoid hidden side effects.
- Be independently testable.

Examples:

```
formatDate()
slugify()
calculateProgress()
```

---

## 14. API Design Standards

### REST Principles

- Use nouns for resources.
- Use proper HTTP status codes.
- Validate every input.
- Return consistent response shapes.

Example:

```json
{
  "success": true,
  "data": {},
  "message": ""
}
```

Never expose internal implementation details or stack traces to clients.

---

## 15. Database Standards

### General Rules

- Normalize before optimizing.
- Use UUIDs where appropriate.
- Add indexes for frequently queried columns.
- Enforce constraints at the database level.

### Prisma

- One model per domain entity.
- Use descriptive relation names.
- Keep migrations small and reviewable.
- Never edit an already applied migration.

---

## 16. Security Standards

Security is a default requirement—not an optional enhancement.

Always:

- Validate inputs.
- Sanitize outputs where needed.
- Protect secrets using environment variables.
- Apply authorization checks on the server.
- Follow the principle of least privilege.

Never:

- Commit secrets.
- Trust client-side validation.
- Expose private keys.
- Log sensitive user information.

---

## 17. Environment Variables

Rules:

- Store secrets only in `.env`.
- Never hardcode credentials.
- Access environment variables through a centralized configuration layer when practical.
- Document every required variable in the README.

---

_End of Draft Part 3_


---

# Part IV — Collaboration & Quality

## 18. Git Workflow

### Branch Strategy

- `main` — Production-ready code only.
- `develop` *(optional as the team grows)* — Integration branch.
- Feature branches:
  - `feature/<short-name>`
  - `fix/<short-name>`
  - `refactor/<short-name>`
  - `docs/<short-name>`
  - `chore/<short-name>`

### Rules

- Keep branches focused on a single objective.
- Rebase or merge frequently to reduce conflicts.
- Never commit directly to `main`.

---

## 19. Conventional Commits

Use the Conventional Commits specification.

Examples:

```
feat: add interview experience form
fix: resolve authentication redirect
refactor: simplify dashboard layout
docs: update developer handbook
test: add unit tests for progress service
chore: upgrade Next.js dependencies
```

Commit messages should explain **what changed**, not every implementation detail.

---

## 20. Pull Request Standards

Every PR should:

- Solve one logical problem.
- Be small enough to review comfortably.
- Include screenshots for UI changes.
- Explain any architectural decisions.
- Pass linting and tests.

### PR Checklist

- [ ] Builds successfully
- [ ] Lint passes
- [ ] Types pass
- [ ] No secrets committed
- [ ] Documentation updated if needed

---

## 21. Code Review Checklist

Review for:

- Correctness
- Readability
- Simplicity
- Security
- Performance
- Accessibility
- Consistency with this handbook

Review the design—not just the syntax.

---

## 22. Documentation Standards

Every feature should document:

- Purpose
- Public API
- Important assumptions
- Known limitations

Prefer self-documenting code over excessive comments.

Write comments to explain **why**, not **what**.

---

## 23. Testing Philosophy

Testing should provide confidence, not just coverage.

Priority:

1. Business logic
2. Critical workflows
3. Utilities
4. UI interactions

Avoid brittle tests that depend on implementation details.

---

# Part V — AI Development Standards

## 24. AI Coding Assistant Rules

AI assistants must:

- Read existing code before generating new code.
- Match the current architecture.
- Preserve naming conventions.
- Avoid unnecessary refactoring.
- Modify only files relevant to the requested task unless broader changes are justified.
- Explain assumptions when requirements are ambiguous.

AI must never:

- Invent APIs or database fields.
- Remove existing functionality without instruction.
- Introduce new dependencies without justification.
- Rewrite unrelated modules.

---

## 25. Prompting Guidelines

When asking AI to implement work:

- Define the goal clearly.
- Specify constraints.
- Reference this handbook.
- Request explanations for architectural decisions.
- Prefer incremental implementation over large rewrites.

Example:

> Read `DEVELOPER_BIBLE.md`. Implement the requested feature while preserving existing architecture and conventions. Explain any trade-offs before introducing new patterns.

---

_End of Draft Part 4_


## 26. AI Code Review Checklist

Before considering a task complete, an AI assistant should verify:

### Correctness
- [ ] Requirements are fully implemented.
- [ ] No existing functionality was unintentionally changed.

### Architecture
- [ ] Folder structure follows this handbook.
- [ ] No unnecessary abstractions were introduced.
- [ ] New code matches existing patterns.

### Quality
- [ ] No duplicated logic.
- [ ] Types are explicit.
- [ ] Error handling exists where appropriate.
- [ ] Code is readable without excessive comments.

### Security
- [ ] Sensitive operations occur on the server.
- [ ] Inputs are validated.
- [ ] Secrets are not exposed.

### Final Review

The AI should ask itself:

- Can this solution be simpler?
- Does it introduce technical debt?
- Would another developer understand this in six months?

---

## 27. Definition of Done

A feature is considered complete only when:

- Requirements are satisfied.
- Code follows this handbook.
- Linting passes.
- Types pass.
- Tests are added where appropriate.
- Documentation is updated.
- No known regressions exist.
- Performance impact has been considered.
- Security implications have been reviewed.

"Works on my machine" is not a definition of done.

---

## 28. Technical Debt Policy

Technical debt is acceptable only when:

- It is intentional.
- It is documented.
- There is a clear reason.
- A follow-up plan exists.

Avoid accumulating hidden debt.

If a shortcut is taken, create a tracking issue before merging.

---

## 29. Dependency Management

Every new dependency must answer:

1. Why is it needed?
2. Can the platform solve this natively?
3. Is it actively maintained?
4. Is the community trustworthy?
5. What is the long-term maintenance cost?

Avoid adding libraries that solve trivial problems.

---

## 30. Architecture Decision Records (ADR)

Major engineering decisions should be documented.

Each ADR should include:

- Context
- Problem
- Alternatives considered
- Decision
- Consequences

Record decisions such as:
- Introducing a new framework.
- Changing authentication.
- Migrating databases.
- Adopting a new state management approach.

---

## 31. Performance Guidelines

Performance should be considered from the beginning.

Priorities:

- Reduce unnecessary JavaScript.
- Prefer Server Components.
- Lazy-load heavy modules.
- Optimize images.
- Cache expensive operations where appropriate.

Measure before optimizing.

Never optimize based purely on assumptions.

---

## 32. Accessibility Standards

Accessibility is a core quality requirement.

Always:

- Use semantic HTML.
- Support keyboard navigation.
- Provide accessible labels.
- Maintain sufficient color contrast.
- Preserve visible focus states.

Accessibility should never be treated as an optional enhancement.

---

_End of Draft Part 5_


---

# Part VI — Long-Term Engineering Principles

## 33. Anti-Patterns

The following practices are discouraged unless there is a compelling, documented reason.

### Architecture

❌ God components that own unrelated responsibilities.

❌ Circular dependencies between modules.

❌ Business logic inside UI components.

❌ Shared utilities that secretly depend on feature-specific code.

### Code

❌ Excessive nesting.

❌ Duplicate implementations.

❌ Large functions with multiple responsibilities.

❌ Unexplained magic numbers or strings.

### Project

❌ Introducing a new pattern without team agreement.

❌ Mixing experimental code with production code.

---

## 34. Things We Never Do

Regardless of project stage, Cevora will never:

- Commit secrets or API keys.
- Ignore TypeScript errors.
- Silence lint errors without justification.
- Merge unreviewed large refactors.
- Add dependencies for trivial utilities.
- Bypass server-side authorization.
- Sacrifice maintainability for cleverness.
- Introduce breaking changes without documenting them.

When in doubt, choose the safer and simpler approach.

---

## 35. Scalability Principles

Every new feature should be designed with future growth in mind.

### Codebase

- Keep modules independent.
- Prefer reusable building blocks.
- Reduce coupling between features.

### Infrastructure

- Design integrations behind interfaces where practical.
- Avoid vendor lock-in unless it provides clear value.
- Keep deployment repeatable and automated.

### Database

- Design schemas for clarity first.
- Add indexes based on measured query patterns.
- Avoid premature denormalization.

---

## 36. Future-Proofing Guidelines

Technology changes. Engineering principles last longer.

Prefer:

- Stable APIs
- Standard web technologies
- Framework conventions
- Incremental upgrades

Avoid:

- Depending on unstable APIs in production.
- Reinventing solved problems.
- Building infrastructure before there is a demonstrated need.

---

## 37. Engineering Checklists

### Before Writing Code

- [ ] Understand the requirement.
- [ ] Review existing implementation.
- [ ] Check this handbook for applicable standards.
- [ ] Identify edge cases.

### Before Opening a Pull Request

- [ ] Build succeeds.
- [ ] Lint passes.
- [ ] Types pass.
- [ ] Documentation updated if necessary.
- [ ] No unnecessary files added.

### Before Merging

- [ ] Architecture remains consistent.
- [ ] Performance impact considered.
- [ ] Security implications reviewed.
- [ ] Technical debt documented if introduced.

---

## 38. Maintaining This Handbook

This handbook is a living document.

Update it whenever:

- A new engineering standard is adopted.
- A recurring issue suggests a missing guideline.
- Architecture changes significantly.
- New tooling becomes part of the standard workflow.

Changes should be deliberate, reviewed, and documented.

---

# Closing Statement

Engineering quality is the result of consistent decisions made over time.

Every contributor—human or AI—is expected to preserve the simplicity, clarity, security, and maintainability of Cevora.

When a choice is unclear:

**Prefer the solution that future developers will thank you for.**

---

**End of DEVELOPER_BIBLE.md**
