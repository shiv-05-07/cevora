# ARCHITECTURE.md

> **Project:** Cevora\
> **Version:** 1.0\
> **Architecture:** Feature-Oriented Modular Monolith\
> **Framework:** Next.js App Router + React + TypeScript + Tailwind CSS

------------------------------------------------------------------------

# Overview

This document defines the software architecture of Cevora.

It explains:

-   Project structure
-   Folder responsibilities
-   Component hierarchy
-   Data flow
-   State management
-   Reusability guidelines
-   Development workflow
-   Team collaboration standards

This document is the single source of truth for how the codebase should
evolve.

------------------------------------------------------------------------

# Architectural Goals

The architecture is designed to achieve the following goals:

-   Modular
-   Maintainable
-   Reusable
-   Scalable
-   Predictable
-   AI-friendly
-   Team-friendly

Every implementation should extend the existing architecture instead of
introducing new patterns.

------------------------------------------------------------------------

# Core Principles

## 1. Reuse Before Creating

Always search for an existing implementation before creating a new one.

Never duplicate:

-   Components
-   Hooks
-   Utilities
-   Constants

## 2. Separation of Concerns

Every folder has a single responsibility.

-   UI should never contain business logic.
-   Services should never contain UI.
-   Utilities should never depend on React.

## 3. Feature Isolation

Every feature owns its own components, hooks, services, and types.

Only reusable code should leave the feature folder.

## 4. Consistency

Every page should feel like it belongs to the same application.

Consistency is more important than originality.

------------------------------------------------------------------------

# High-Level Architecture

``` text
User
   │
   ▼
Page
   │
   ▼
Feature Components
   │
   ▼
Shared Components
   │
   ▼
UI Primitives
```

------------------------------------------------------------------------

# Project Structure

``` text
app/

components/
    ui/
    shared/
    dashboard/
    landing/

features/

hooks/

providers/

services/

constants/

types/

utils/

data/

docs/

public/
```

Each folder has a clearly defined purpose.

------------------------------------------------------------------------

# App Router Architecture

``` text
app/

page.tsx
layout.tsx

(dashboard)/
    dashboard/
    companies/
    roadmaps/
    resume/
    mentor/
    interview/
    analytics/
    settings/
```

## Public Routes

Contains:

-   Landing Page

Future:

-   Login
-   Register
-   Privacy
-   Terms
-   Documentation

These pages must never depend on dashboard providers.

## Dashboard Routes

All authenticated pages inherit `AppShell` through:

``` text
app/(dashboard)/layout.tsx
```

This layout owns:

-   Sidebar
-   Header
-   Breadcrumbs
-   Theme
-   Workspace Context

------------------------------------------------------------------------

# Component Architecture

## Layer 1 --- UI

`components/ui/`

Generic UI primitives.

Examples:

-   Button
-   Card
-   Badge
-   Input
-   Avatar
-   Dialog
-   Sheet
-   Tabs
-   Tooltip
-   Progress
-   Table
-   EmptyState

These should never contain business logic.

## Layer 2 --- Shared

`components/shared/`

Reusable project-wide components.

Examples:

-   Logo
-   ThemeToggle
-   Footer
-   OverlaySidebar
-   Hero
-   SectionHeader

## Layer 3 --- Dashboard

`components/dashboard/`

Reusable dashboard components.

Examples:

-   AppShell
-   Sidebar
-   Header
-   PageHeader
-   StatCard
-   MetricCard
-   ChartCard
-   SectionCard
-   TimelineCard

## Layer 4 --- Feature Components

``` text
features/
```

Each feature owns:

-   components
-   hooks
-   services
-   types

------------------------------------------------------------------------

# Component Creation Rules

-   Used across the entire application → `components/ui`
-   Used across multiple pages → `components/shared`
-   Dashboard-specific → `components/dashboard`
-   Feature-specific → `features/<feature>`

------------------------------------------------------------------------

# Data Flow

``` text
User
 ↓
Page
 ↓
Feature
 ↓
Service
 ↓
API
 ↓
Database
```

Pages should never call APIs directly.

------------------------------------------------------------------------

# State Management

Priority:

1.  Local State
2.  Context Providers
3.  Server State

Avoid unnecessary global state.

------------------------------------------------------------------------

# Providers

Current:

-   ThemeProvider
-   WorkspaceProvider
-   SidebarProvider

Future:

-   AuthProvider

Keep providers small and focused.

------------------------------------------------------------------------

# Services Layer

Examples:

``` text
services/
    resume.ts
    companies.ts
    analytics.ts
    roadmaps.ts
```

Business logic and API communication belong here.

------------------------------------------------------------------------

# Hooks

Reusable React logic belongs in `hooks/`.

Feature-specific hooks remain inside their feature.

------------------------------------------------------------------------

# Utilities

Pure helper functions belong in `utils/`.

Utilities must never import React.

------------------------------------------------------------------------

# Constants

Examples:

-   navigation.ts
-   dashboard.ts
-   roles.ts
-   theme.ts

Avoid hardcoded values.

------------------------------------------------------------------------

# Types

Shared interfaces belong in `types/`.

Avoid duplicate interfaces.

------------------------------------------------------------------------

# Mock Data

``` text
data/
```

Contains development-only mock data.

Replace with services during API integration.

------------------------------------------------------------------------

# Styling Architecture

Follow `DESIGN_SYSTEM.md`.

Use:

-   Tailwind CSS
-   Existing spacing scale
-   Existing typography
-   Existing design tokens

Avoid inline styles and arbitrary values.

------------------------------------------------------------------------

# Navigation Architecture

Landing Page

↓

Overlay Sidebar

↓

Platform Navigation

↓

Workspace Navigation

Dashboard

↓

Fixed Sidebar

↓

Workspace Navigation

Navigation definitions must remain centralized in
`constants/navigation.ts`.

------------------------------------------------------------------------

# Dashboard Architecture

Every dashboard page automatically inherits `AppShell`.

Do not recreate:

-   Sidebar
-   Header
-   Breadcrumbs

------------------------------------------------------------------------

# Landing Page

The Landing Page is independent.

It must not depend on:

-   WorkspaceProvider
-   SidebarProvider
-   Dashboard context

------------------------------------------------------------------------

# Authentication (Future)

The architecture supports future additions such as:

-   Protected routes
-   Role-based access
-   Workspace membership
-   Permission system

without changing the folder structure.

------------------------------------------------------------------------

# API Layer (Future)

External integrations (Gemini API, database, authentication, storage)
should always go through the Services layer.

------------------------------------------------------------------------

# File Naming

Components:

``` text
PageHeader.tsx
```

Hooks:

``` text
useTheme.ts
```

Utilities:

``` text
formatDate.ts
```

Constants:

``` text
navigation.ts
```

Types:

``` text
company.ts
```

------------------------------------------------------------------------

# Import Rules

Prefer path aliases:

``` text
@/components
@/hooks
@/services
@/types
```

Avoid long relative imports.

------------------------------------------------------------------------

# Development Workflow

1.  Read project documentation.
2.  Reuse existing components.
3.  Implement the feature.
4.  Verify the build.
5.  Submit focused changes.

------------------------------------------------------------------------

# Team Collaboration

-   Own a feature.
-   Avoid unrelated modifications.
-   Keep pull requests focused.
-   Pull the latest `develop` before starting work.

------------------------------------------------------------------------

# Scalability Rules

Never duplicate:

-   Components
-   Hooks
-   Utilities
-   Constants

Always extend the existing architecture.

------------------------------------------------------------------------

# Architecture Checklist

Before completing a feature:

-   Correct folder placement
-   Reused existing components
-   Naming conventions followed
-   TypeScript passes
-   Responsive
-   Accessible
-   Build passes
-   Matches Design System
-   Matches Developer Bible

------------------------------------------------------------------------

# Core Philosophy

The architecture should make adding new features easier---not more
complicated.

Every decision should improve:

-   Maintainability
-   Readability
-   Reusability
-   Consistency

If an implementation increases complexity without meaningful benefit,
reconsider it.

------------------------------------------------------------------------

*End of Document*
