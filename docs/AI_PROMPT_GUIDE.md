# AI Prompt Guide

**Version:** 1.0\
**Project:** Cevora\
**Purpose:** Standard instructions for AI coding assistants
(Antigravity, Replit AI, ChatGPT, Codex, Claude, Gemini, Cursor,
Windsurf, etc.)

------------------------------------------------------------------------

# Overview

This document defines how AI assistants should contribute to the Cevora
codebase.

The highest priority is **maintaining architectural consistency**. AI
should extend the existing project rather than redesign or restructure
it.

Before implementing any feature, always review the project
documentation.

------------------------------------------------------------------------

# Required Reading

Before generating or modifying any code, read the following documents in
order:

1.  `docs/DEVELOPER_BIBLE.md`
2.  `docs/DESIGN_SYSTEM.md`

These documents override any assumptions.

------------------------------------------------------------------------

# Project Goals

Build a scalable, modular, production-ready placement preparation
platform.

Every implementation should prioritize:

-   Consistency
-   Reusability
-   Maintainability
-   Performance
-   Accessibility

------------------------------------------------------------------------

# Architecture Rules

Follow the existing project structure.

``` text
app/
components/
    dashboard/
    landing/
    shared/
    ui/

constants/
features/
hooks/
lib/
providers/
services/
types/
utils/
public/
docs/
```

Do **not** introduce new top-level folders unless explicitly requested.

------------------------------------------------------------------------

# Component Reuse Policy

Always check for existing components before creating new ones.

Reuse components in this order.

## 1. UI Components

Located in:

``` text
components/ui/
```

Examples:

-   Button
-   Card
-   Input
-   Badge
-   Avatar
-   Dialog
-   Sheet
-   Tooltip
-   Tabs
-   Separator
-   EmptyState

Never duplicate these.

------------------------------------------------------------------------

## 2. Shared Components

Located in:

``` text
components/shared/
```

Examples:

-   Logo
-   ThemeToggle
-   Footer
-   OverlaySidebar
-   Hero
-   FeatureCard

Reuse whenever possible.

------------------------------------------------------------------------

## 3. Feature Components

Create feature-specific components only when they are not reusable
elsewhere.

------------------------------------------------------------------------

# Styling Rules

Follow `DESIGN_SYSTEM.md` exactly.

Use:

-   Tailwind CSS
-   Existing spacing scale
-   Existing typography
-   Existing color palette
-   Existing animations

Avoid:

-   Inline styles
-   Random spacing
-   Arbitrary colors
-   Unnecessary CSS files

------------------------------------------------------------------------

# UI Consistency

Every new screen should look like it belongs to the existing
application.

Maintain:

-   Layout spacing
-   Typography
-   Card design
-   Border radius
-   Shadows
-   Motion
-   Dark mode compatibility

Do not redesign existing pages.

------------------------------------------------------------------------

# Navigation Rules

Reuse the existing navigation system.

Do not replace or redesign:

-   Sidebar
-   OverlaySidebar
-   Header
-   AppShell
-   Navigation constants

Only extend them if required.

------------------------------------------------------------------------

# Next.js Rules

Use the App Router.

Prefer Server Components.

Use `"use client"` only when necessary.

Do not introduce the Pages Router.

------------------------------------------------------------------------

# TypeScript

Use strict typing.

Prefer:

-   Interfaces
-   Type aliases
-   Utility types

Avoid `any`.

Never ignore TypeScript errors.

------------------------------------------------------------------------

# State Management

Prefer:

-   Local state
-   Context Providers
-   React hooks

Do not introduce additional state libraries unless requested.

------------------------------------------------------------------------

# Performance

Prefer:

-   Reusable components
-   Lazy loading
-   Server Components
-   Minimal client-side JavaScript

Avoid unnecessary re-renders.

------------------------------------------------------------------------

# Accessibility

Every component should support:

-   Keyboard navigation
-   Focus states
-   Responsive layouts
-   Dark mode

Accessibility is mandatory.

------------------------------------------------------------------------

# Before Creating Anything

Before creating a component, hook, utility, or constant:

1.  Search the project.
2.  Reuse existing implementations.
3.  Extend existing code if appropriate.
4.  Only create new files when necessary.

------------------------------------------------------------------------

# File Naming

Components

``` text
UserCard.tsx
```

Hooks

``` text
useTheme.ts
```

Utilities

``` text
formatDate.ts
```

Constants

``` text
navigation.ts
```

Use descriptive names.

------------------------------------------------------------------------

# Restrictions

Do not:

-   Create duplicate components
-   Rename project folders
-   Modify unrelated files
-   Rewrite working code unnecessarily
-   Delete files without instruction
-   Install dependencies without approval
-   Change architecture without approval

------------------------------------------------------------------------

# Definition of Done

A task is complete only if:

-   Project builds successfully
-   No TypeScript errors
-   No ESLint errors
-   Responsive on all screen sizes
-   Supports dark mode
-   Uses reusable components
-   Matches the Design System
-   Matches the Developer Bible
-   Avoids duplicated logic

------------------------------------------------------------------------

# Standard AI Workflow

For every implementation:

1.  Read `DEVELOPER_BIBLE.md`.
2.  Read `DESIGN_SYSTEM.md`.
3.  Inspect existing components.
4.  Reuse before creating.
5.  Follow existing folder structure.
6.  Implement only the requested feature.
7.  Verify the build passes.
8.  Avoid unrelated changes.

------------------------------------------------------------------------

# Core Principle

**Consistency is more important than originality.**

AI should integrate seamlessly into the existing codebase instead of
introducing new patterns.

When in doubt:

-   Reuse existing components.
-   Follow existing architecture.
-   Preserve the current UI and coding style.
