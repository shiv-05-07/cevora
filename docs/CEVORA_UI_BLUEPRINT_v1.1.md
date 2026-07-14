# CEVORA_UI_BLUEPRINT.md

> Project: Cevora\
> Version: Draft 1.1 (Updated MVP)\
> Scope: First Deployable Version

## Overview

This blueprint defines the navigation, page hierarchy, user flows, and
high-level wireframes for the **first deployable MVP** of Cevora.

### Active Roles

-   Student
-   Faculty Mentor
-   Platform Admin

### Deferred Modules

-   Community
-   Gamification
-   Placement Cell
-   AI integrations (UI exists, intelligence added later)

**Total MVP Pages: 36**

------------------------------------------------------------------------

# Global Authentication Flow

``` text
Landing
   │
   ├── Login
   ├── Sign Up
   ├── Forgot Password
   └── Verify Email
            │
            ▼
      Profile Setup
            │
      Select Role
            │
      Join Workspace
      (Access Code)
            │
            ▼
Dashboard
```

------------------------------------------------------------------------

# Global Authenticated Layout

``` text
┌────────────────────────────────────────────────────────────────────────────┐
│ ☰  Breadcrumb   Search   Workspace ▼   🔔  Theme  Profile ▼               │
├──────────────┬─────────────────────────────────────────────────────────────┤
│ Sidebar      │ Page Header                                                 │
│              ├─────────────────────────────────────────────────────────────┤
│ Dashboard    │                                                             │
│ Companies    │                                                             │
│ AI Mentor    │                  Page Content                               │
│ Roadmaps     │                                                             │
│ Resume       │                                                             │
│ OA Practice  │                                                             │
│ AI Interview │                                                             │
│ Resources    │                                                             │
│ Profile      │                                                             │
│ Settings     │                                                             │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

Header: - Sidebar Toggle - Breadcrumb - Global Search - Workspace
Selector - Notifications - Theme Toggle - Profile Menu

------------------------------------------------------------------------

# Student Navigation

-   Dashboard
-   Companies
-   AI Mentor
-   Resume Analyzer
-   Roadmaps
-   OA Practice
-   AI Interview Practice
-   Resources
-   Profile
-   Notifications
-   Settings

> **Interview Experiences removed from MVP (Standby).**

------------------------------------------------------------------------

# Student Journey

``` text
Dashboard
    │
    ▼
Companies
    │
    ▼
Company Details
    │
    ├── Prepare with AI
    ├── Resume Analyzer
    └── Save Company
          │
          ▼
Roadmaps
    │
    ▼
OA Practice
    │
    ▼
AI Interview Practice
    │
    ▼
Track Progress
```

------------------------------------------------------------------------

# Core Pages

## Dashboard

Hero • Stats • Today's Mission (static) • Upcoming Companies • Learning
Progress • Quick Actions

Buttons: - Explore Companies - Continue Roadmap - Resume Analyzer - AI
Mentor

------------------------------------------------------------------------

## Companies Explorer

Search • Filters • Company Grid • Insights Panel

Flow: Search → Filter → Company Details

------------------------------------------------------------------------

## Company Details

Hero • Timeline • Eligibility • Hiring Process • Resources • Preparation
Plan (UI) • Related Companies

Flow: Prepare → AI Mentor

------------------------------------------------------------------------

## AI Mentor (UI First)

Conversation • Suggested Prompts • Context Panel • Input

> Responses use placeholder/mock data until AI integration.

------------------------------------------------------------------------

## Resume Analyzer (UI First)

Upload • Preview • Version History • Resume Health • Company Selection

> ATS analysis and suggestions added during AI phase.

------------------------------------------------------------------------

## Roadmaps

Static roadmap • Progress • Modules • Continue Learning

------------------------------------------------------------------------

## OA Practice

Topics • Coding • MCQs • Timer • Results

------------------------------------------------------------------------

## AI Interview Practice (UI First)

Modes: - Technical - HR - Behavioral - Viva - Resume Based - Company
Specific

Flow: Select Mode → Interview UI → Placeholder Feedback

------------------------------------------------------------------------

## Resources

Categories • Search • Downloads

------------------------------------------------------------------------

## Profile

Personal Information • Skills • Activity • Progress

------------------------------------------------------------------------

## Notifications

Timeline • Read/Unread

------------------------------------------------------------------------

## Settings

Account • Appearance • Workspace • Security

------------------------------------------------------------------------

# Faculty Pages

-   Dashboard
-   Students
-   Student Profile
-   Resume Reviews
-   Student Roadmaps
-   Analytics (non-AI)
-   Announcements
-   Settings

Flow: Dashboard → Students → Student Profile → Resume Review

------------------------------------------------------------------------

# Admin Pages

-   Dashboard
-   Users
-   Roles
-   Workspaces
-   Platform Analytics
-   Settings

------------------------------------------------------------------------

# Current Development Roadmap

Phase 1 - Foundation - Shared UI - Layouts

Phase 2 - Authentication - Roles

Phase 3 - Workspace

Phase 4 - Student Portal

Phase 5 - Faculty Portal

Phase 6 - Admin Portal

Phase 7 - Backend Integration (Non-AI)

Phase 8 - AI Integration

------------------------------------------------------------------------

# Page Count

  Module         Pages
  ----------- --------
  Public             5
  Student           12
  Faculty            8
  Admin              6
  Shared             5
  **Total**     **36**

This blueprint is the master reference for implementing the frontend.
Every page will later receive a dedicated specification with detailed
wireframes, interactions, responsive behavior, and component mapping.
