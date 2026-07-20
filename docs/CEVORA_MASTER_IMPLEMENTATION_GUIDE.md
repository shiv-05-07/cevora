# CEVORA_MASTER_IMPLEMENTATION_GUIDE.md

> **Status:** Living Repository Implementation Guide (v0.1)

This document is the final implementation blueprint for CEVORA.

Unlike the Engineering Bible (architecture) and Execution Plan (epics),
this guide is **repository-oriented**.

Every section answers:

-   Which files should be created?
-   Which files should be modified?
-   Which existing components should be reused?
-   Which Prisma models should change?
-   Which APIs should be implemented?
-   What should Antigravity do?
-   What should NOT be changed?

------------------------------------------------------------------------

# How We Will Use This Guide

We will extend **this single file** until CEVORA is fully specified.

Every continuation will append implementation-ready sections.

No new documents will be created.

------------------------------------------------------------------------

# Repository Rules

## Never

-   Redesign the UI
-   Duplicate components
-   Replace existing architecture
-   Rewrite working modules

## Always

-   Extend current implementation
-   Reuse shared components
-   Preserve design system
-   Keep feature modules isolated
-   Keep Prisma backward compatible

------------------------------------------------------------------------

# Planned Sections

1.  Repository Audit
2.  Folder-by-Folder Implementation
3.  Dashboard Implementation
4.  Onboarding & Diagnostic
5.  Learning Profile
6.  Adaptive Mission Engine
7.  Microlearning
8.  Concept Intelligence
9.  AI Layer
10. Teacher Platform
11. APIs
12. Prisma
13. Testing
14. Deployment

------------------------------------------------------------------------

# Progress

-   [ ] Repository Audit
-   [ ] Dashboard
-   [ ] Diagnostic
-   [ ] Learning Profile
-   [ ] Mission Engine
-   [ ] Concept Intelligence
-   [ ] AI Layer
-   [ ] Teacher Platform
-   [ ] Prisma
-   [ ] APIs
-   [ ] Testing
-   [ ] Deployment

------------------------------------------------------------------------

# Next Section

## Repository Audit

This section will inspect the actual project structure and map every
existing folder to future implementation work.

# Section 1 --- Repository Audit (Actual Codebase)

> This section is based on the uploaded repository instead of
> assumptions.

## 1.1 Top-Level Structure

    - cevora-main/
      - .env.example
      - .gitignore
      - AGENTS.md
      - CLAUDE.md
      - README.md
      - app/
      - components/
      - components.json
      - constants/
      - data/
      - docs/
      - eslint.config.mjs
      - features/
      - hooks/
      - lib/
      - next-env.d.ts
      - next.config.ts
      - package-lock.json
      - package.json
      - postcss.config.mjs
      - prisma/
      - providers/
      - proxy.ts.bak
      - public/
      - services/
      - store/
      - tsconfig.json
      - types/
      - utils/

## 1.2 Module Classification

### 🟢 Keep & Extend

-   app/
-   components/
-   features/
-   hooks/
-   lib/
-   prisma/
-   providers/
-   services/
-   store/
-   types/
-   utils/

### 🟡 Review & Adapt

-   docs/
-   data/
-   constants/

Existing dashboard routes should be extended rather than recreated.

------------------------------------------------------------------------

## 1.3 First Implementation Target

### Modify (Do Not Replace)

-   app/(dashboard)/dashboard
-   app/(dashboard)/mentor
-   app/(dashboard)/profile

### Reuse Existing

-   components/ui/\*
-   shared layout
-   authentication flow
-   dashboard shell

### Create New Feature Modules

    features/
    ├── diagnostic/
    ├── learning-profile/
    ├── adaptive-engine/
    ├── mission/
    ├── concepts/
    └── ai/

Do not duplicate existing dashboard components. Integrate these modules
into the current architecture.

------------------------------------------------------------------------

## 1.4 Repository Rules

1.  Never create a second dashboard.
2.  Never replace authentication.
3.  Never duplicate UI primitives.
4.  Extend Prisma instead of replacing models.
5.  Keep business logic inside feature modules.
6.  Keep API routes thin; move logic into services.

------------------------------------------------------------------------

## 1.5 Next Implementation Section

The next section will begin **file-by-file implementation** of the
Dashboard, listing: - Exact files to edit - Exact components to add -
Integration order - API dependencies - Prisma dependencies - Acceptance
checklist

# Section 2 --- Dashboard Implementation (Repository-Specific)

> **Goal:** Upgrade the existing dashboard into the central decision hub
> without changing the overall design language.

------------------------------------------------------------------------

## 2.1 Files to Modify

Primary targets:

``` text
app/(dashboard)/dashboard/page.tsx
features/dashboard/*
components/shared/*
```

Do **not** create a second dashboard route.

------------------------------------------------------------------------

## 2.2 Existing Components to Reuse

Before creating anything new, reuse:

-   Card
-   Button
-   Badge
-   Progress
-   Tabs
-   Avatar
-   Tooltip
-   Skeleton
-   Dialog

Any new component should compose these primitives rather than replacing
them.

------------------------------------------------------------------------

## 2.3 New Dashboard Components

Create under `features/dashboard/components/`:

``` text
MissionHeroCard.tsx
WhyThisMissionCard.tsx
WeakConceptsCard.tsx
NextMilestoneCard.tsx
DailyStreakCard.tsx
WeeklyInsightCard.tsx
```

Each component should: - Receive typed props. - Support loading, empty,
and error states. - Avoid direct API calls; consume data from a parent
container.

------------------------------------------------------------------------

## 2.4 Information Hierarchy

Top-to-bottom order:

1.  Welcome Header
2.  Mission Hero
3.  Why This Mission?
4.  Continue Learning
5.  Weak Concepts
6.  Weekly Progress
7.  Revision Suggestions
8.  Upcoming Milestone

No decorative widgets should appear above the mission.

------------------------------------------------------------------------

## 2.5 Backend Integration

Create a Dashboard aggregation service that returns one payload.

Suggested shape:

``` ts
{
  mission,
  learningProfile,
  weakConcepts,
  recommendations,
  streak,
  weeklyProgress
}
```

The page should avoid making many sequential requests.

------------------------------------------------------------------------

## 2.6 API Integration

Primary endpoint:

``` text
GET /api/dashboard
```

Secondary endpoints (internal if needed):

``` text
GET /api/missions/today
GET /api/profile
GET /api/profile/recommendations
```

------------------------------------------------------------------------

## 2.7 Acceptance Checklist

-   [ ] Dashboard renders with one request.
-   [ ] Today's Mission is the primary CTA.
-   [ ] Recommendation explains *why* it was generated.
-   [ ] Weak concepts are visible.
-   [ ] Responsive layout verified.
-   [ ] Existing theme preserved.

------------------------------------------------------------------------

## 2.8 Antigravity Prompt

Implement the dashboard enhancement using the existing repository
structure.

Requirements:

-   Extend the current dashboard instead of redesigning it.
-   Reuse existing UI primitives.
-   Introduce the new dashboard cards as composable feature components.
-   Aggregate server data before rendering.
-   Preserve the current visual identity.

# Section 3 --- Repository Migration Strategy (Based on Actual Schema)

> **Observation:** The current Prisma schema is oriented toward
> placement preparation (Resume, Roadmap, Mock Interview, AI Chat, OA
> Practice). Rather than replacing this foundation, CEVORA should evolve
> it into an adaptive learning platform.

------------------------------------------------------------------------

## 3.1 Current Schema Assessment

### Existing Models to Keep

-   User
-   StudentProfile
-   UserProgress
-   AIChat
-   Roadmap
-   UserActivity
-   MockInterview

These already provide valuable user and activity data.

------------------------------------------------------------------------

## 3.2 Extend --- Do Not Replace

### User

Keep authentication and profile fields.

Add (planned):

``` text
onboardingCompleted Boolean
preferredLanguage String?
dailyStudyMinutes Int?
activeSubject String?
learningGoal String?
```

Reason: Support adaptive onboarding without affecting existing
authentication.

------------------------------------------------------------------------

### StudentProfile

Keep all placement-related fields.

Extend with:

``` text
learningLevel
readinessScore
consistencyScore
```

Do not remove college, degree, CGPA or target role fields.

------------------------------------------------------------------------

## 3.3 New Models

Create new feature-specific models instead of overloading existing ones.

``` text
LearningProfile
DiagnosticAttempt
DiagnosticResponse
Concept
ConceptRelationship
ConceptMastery
Mission
MissionCompletion
RevisionSchedule
```

These become the adaptive learning layer.

------------------------------------------------------------------------

## 3.4 Repository Migration Order

Step 1 - Add nullable fields to existing models.

Step 2 - Generate Prisma migration.

Step 3 - Create new adaptive models.

Step 4 - Backfill defaults.

Step 5 - Connect services.

Never perform destructive migrations before the hackathon.

------------------------------------------------------------------------

## 3.5 Anti-Pattern Checklist

Do NOT:

-   Remove Resume features.
-   Rename existing models.
-   Break Supabase authentication.
-   Duplicate user data already stored.

Instead, layer adaptive learning on top of the existing platform.

------------------------------------------------------------------------

## 3.6 Acceptance Criteria

-   Existing placement functionality still compiles.
-   Existing users remain valid.
-   New adaptive features use dedicated models.
-   Prisma migration is backward compatible.

# Section 4 --- Onboarding & Diagnostic (Repository-Specific)

> **Goal:** Integrate adaptive onboarding into the existing
> authentication flow without replacing your current auth
> implementation.

------------------------------------------------------------------------

## 4.1 Current Flow

``` text
Landing
   ↓
Authentication
   ↓
Dashboard
```

## 4.2 Target Flow

``` text
Landing
   ↓
Authentication
   ↓
Profile Check
   ↓
Goal Selection
   ↓
Study Preferences
   ↓
Diagnostic Assessment
   ↓
Learning Profile Creation
   ↓
Adaptive Dashboard
```

Users with `onboardingCompleted = true` should continue directly to the
dashboard.

------------------------------------------------------------------------

## 4.3 Repository Changes

### Create

``` text
app/(dashboard)/onboarding/
├── goal/page.tsx
├── preferences/page.tsx
├── diagnostic/page.tsx
└── result/page.tsx
```

### Create Feature Module

``` text
features/diagnostic/
├── components/
├── hooks/
├── lib/
├── service.ts
├── actions.ts
├── validation.ts
└── types.ts
```

------------------------------------------------------------------------

## 4.4 Components

### Reuse

-   Card
-   Button
-   Input
-   Progress
-   Dialog
-   Badge

### Create

-   GoalSelectionCard
-   SubjectSelectionCard
-   DiagnosticQuestionCard
-   ConfidenceSelector
-   DiagnosticProgress
-   ResultSummaryCard

------------------------------------------------------------------------

## 4.5 Navigation Rules

-   Prevent access to `/dashboard` until onboarding is completed.
-   Allow users to resume an interrupted diagnostic.
-   Save progress after every answered question.

------------------------------------------------------------------------

## 4.6 Backend Responsibilities

### DiagnosticService

Responsibilities:

-   Create assessment
-   Persist answers
-   Calculate score
-   Classify learner
-   Create Learning Profile

### RecommendationService

Immediately generate the student's first mission after classification.

------------------------------------------------------------------------

## 4.7 API Contracts

``` text
POST /api/diagnostic/start
POST /api/diagnostic/answer
POST /api/diagnostic/finish
GET  /api/diagnostic/result
```

Return typed responses and standardized error objects.

------------------------------------------------------------------------

## 4.8 State Management

Persist:

-   currentQuestion
-   answers
-   confidence
-   elapsedTime

Store temporarily during assessment and commit only after completion.

------------------------------------------------------------------------

## 4.9 Testing Checklist

-   [ ] New user completes onboarding.
-   [ ] Existing user bypasses onboarding.
-   [ ] Interrupted session resumes correctly.
-   [ ] Learning Profile is created.
-   [ ] First mission is generated automatically.

------------------------------------------------------------------------

## 4.10 Definition of Done

-   [ ] Routes implemented
-   [ ] Components reusable
-   [ ] APIs integrated
-   [ ] Learning Profile generated
-   [ ] Dashboard redirects correctly
-   [ ] No regression in existing authentication

------------------------------------------------------------------------

## 4.11 Antigravity Prompt

Implement adaptive onboarding by extending the existing authentication
flow.

Requirements: - Do not replace current auth. - Create onboarding routes
under the existing app structure. - Reuse shared UI components. -
Generate a Learning Profile immediately after diagnostic completion. -
Redirect users to the adaptive dashboard only after onboarding is
complete.

# Section 5 --- Learning Profile Engine (Repository-Specific)

> **Goal:** Build the persistent learner model that powers every
> adaptive decision while fitting cleanly into the current repository.

------------------------------------------------------------------------

## 5.1 Purpose

The Learning Profile is **the source of truth** for personalization.

Every feature should **read from** or **write to** the Learning Profile
instead of maintaining separate learning state.

------------------------------------------------------------------------

## 5.2 Repository Structure

### Create

``` text
features/learning-profile/
├── components/
├── hooks/
├── lib/
├── services/
├── actions.ts
├── types.ts
└── validation.ts
```

### Modify

``` text
app/(dashboard)/profile/*
app/(dashboard)/dashboard/*
features/dashboard/*
services/*
```

------------------------------------------------------------------------

## 5.3 Prisma Evolution

### Extend Existing Models

Do **not** replace existing user models.

Planned additions:

#### LearningProfile

``` text
userId
learningLevel
masteryScore
readinessScore
confidenceScore
consistencyScore
currentMissionId
lastActivityAt
```

#### ConceptMastery

``` text
userId
conceptId
masteryScore
confidenceScore
attempts
lastReviewedAt
```

Keep placement-related models independent.

------------------------------------------------------------------------

## 5.4 Service Layer

### LearningProfileService

Responsibilities

-   Create profile
-   Load profile
-   Update profile
-   Calculate readiness
-   Calculate consistency
-   Generate recommendations

### MasteryService

Responsibilities

-   Increase mastery
-   Decrease mastery after repeated failures
-   Trigger revision scheduling
-   Unlock prerequisite concepts

------------------------------------------------------------------------

## 5.5 Dashboard Integration

Expose:

-   Learning Level
-   Mastery %
-   Weak Concepts
-   Daily Streak
-   Recommended Revision
-   Current Mission

All dashboard widgets should consume the same aggregated profile.

------------------------------------------------------------------------

## 5.6 Teacher Integration

Teacher dashboard should consume derived profile data only.

Display:

-   Overall mastery
-   Students at risk
-   Weakest concepts
-   Learning velocity
-   Weekly progress

Avoid duplicating calculations on the frontend.

------------------------------------------------------------------------

## 5.7 APIs

``` text
GET    /api/profile
PATCH  /api/profile
GET    /api/profile/mastery
GET    /api/profile/recommendations
```

Return strongly typed payloads.

------------------------------------------------------------------------

## 5.8 Event Flow

``` text
Diagnostic
      ↓
Learning Profile Created
      ↓
Mission Generated
      ↓
Practice Completed
      ↓
Mastery Updated
      ↓
Dashboard Refreshed
      ↓
Teacher Analytics Updated
```

------------------------------------------------------------------------

## 5.9 Testing Matrix

  Scenario                  Expected Result
  ------------------------- ----------------------------
  Diagnostic completed      Learning Profile created
  Mission completed         Mastery increases
  Repeated mistakes         Weak concept detected
  Daily login               Streak updates
  Teacher opens dashboard   Aggregated metrics visible

------------------------------------------------------------------------

## 5.10 Definition of Done

-   [ ] Learning Profile persists correctly
-   [ ] Dashboard reads profile
-   [ ] Mission engine consumes profile
-   [ ] Mentor consumes profile
-   [ ] Teacher dashboard reflects updates
-   [ ] Existing placement features remain functional

------------------------------------------------------------------------

## 5.11 Antigravity Prompt

Implement the Learning Profile Engine without changing the existing
authentication or dashboard architecture.

Requirements: - Extend the Prisma schema with backward-compatible
changes. - Keep learning logic inside `features/learning-profile`. -
Aggregate profile data server-side. - Reuse existing UI components. -
Ensure all adaptive modules consume a single Learning Profile source of
truth.

# Section 6 --- Adaptive Mission Engine (Repository-Specific)

> **Goal:** Convert the existing dashboard into an adaptive planning
> workspace where every student receives one clear, personalized
> mission.

------------------------------------------------------------------------

## 6.1 Integration Points

### Existing Areas to Extend

``` text
app/(dashboard)/dashboard/
app/(dashboard)/study-assistant/
features/dashboard/
services/
```

Do not create parallel navigation.

------------------------------------------------------------------------

## 6.2 New Feature Module

``` text
features/mission/
├── components/
├── hooks/
├── services/
├── actions.ts
├── mission-generator.ts
├── recommendation.ts
├── validation.ts
└── types.ts
```

------------------------------------------------------------------------

## 6.3 Component Plan

Create:

-   MissionHeroCard
-   MissionReasonCard
-   LessonProgressCard
-   RevisionReminderCard
-   MissionCompletionDialog

Reuse:

-   Card
-   Progress
-   Badge
-   Button
-   Dialog
-   Skeleton

------------------------------------------------------------------------

## 6.4 Mission Generation Pipeline

``` text
Learning Profile
        ↓
Concept Mastery
        ↓
Revision Schedule
        ↓
Recommendation Engine
        ↓
Mission Generator
        ↓
Dashboard Hero
```

The generator must always produce **one primary mission**.

------------------------------------------------------------------------

## 6.5 Backend Services

MissionService

Responsibilities

-   Generate today's mission
-   Prevent duplicate missions
-   Track completion
-   Trigger mastery update

RecommendationEngine

Responsibilities

-   Rank concepts
-   Prioritize weak areas
-   Balance revision vs new learning

------------------------------------------------------------------------

## 6.6 API Contracts

``` text
GET    /api/missions/today
POST   /api/missions/complete
GET    /api/missions/history
GET    /api/missions/recommendations
```

Response payload should include:

``` ts
{
  mission,
  reason,
  estimatedMinutes,
  weakConcepts,
  nextMilestone
}
```

------------------------------------------------------------------------

## 6.7 UI Behaviour

Dashboard

-   Mission Hero always appears first.
-   "Why This Mission?" explains the recommendation.
-   Completion updates dashboard without full refresh.

Mission Page

-   Objective
-   Lesson
-   Example
-   Practice
-   Reflection
-   Completion

------------------------------------------------------------------------

## 6.8 Testing Matrix

  Scenario                       Expected Result
  ------------------------------ ------------------------------
  First login after diagnostic   Mission generated
  Mission completed              New recommendation scheduled
  Weak concept detected          Revision mission prioritized
  Consecutive login              Same mission until completed

------------------------------------------------------------------------

## 6.9 Definition of Done

-   [ ] Mission generated automatically
-   [ ] Dashboard personalized
-   [ ] Completion updates Learning Profile
-   [ ] Recommendation reason displayed
-   [ ] Existing study assistant remains functional

------------------------------------------------------------------------

## 6.10 Antigravity Prompt

Implement the Adaptive Mission Engine by extending the existing
dashboard and study assistant modules.

Requirements: - Preserve routing and visual design. - Generate one
primary daily mission. - Explain recommendation reasoning. - Integrate
with Learning Profile and Concept Mastery. - Keep business logic inside
feature services.

# Section 7 --- Concept Intelligence Engine (Repository-Specific)

> **Goal:** Introduce a repository-native knowledge model that
> understands concepts, prerequisites, mastery, and revision. This
> becomes the intelligence layer behind recommendations.

------------------------------------------------------------------------

## 7.1 Repository Integration

### Extend Existing Modules

``` text
features/
├── learning-profile/
├── mission/
└── mentor/
```

### Create

``` text
features/concepts/
├── components/
├── hooks/
├── services/
├── graph/
├── actions.ts
├── schema.ts
├── types.ts
└── utils.ts
```

No existing feature should own concept logic directly.

------------------------------------------------------------------------

## 7.2 Domain Model

    Subject
       ↓
    Topic
       ↓
    Concept
       ↓
    Sub-concept

Each Concept stores:

-   id
-   title
-   difficulty
-   estimatedMinutes
-   masteryThreshold
-   prerequisiteIds
-   childIds

------------------------------------------------------------------------

## 7.3 Repository Components

Create:

-   ConceptGraph.tsx
-   ConceptNode.tsx
-   WeakConceptPanel.tsx
-   RevisionQueue.tsx
-   MasteryProgress.tsx
-   UnlockAnimation.tsx

Reuse:

-   Card
-   Badge
-   Tooltip
-   Progress
-   Dialog

------------------------------------------------------------------------

## 7.4 Mastery Engine

Mastery should change after:

-   Diagnostic
-   Practice
-   Mission completion
-   Mentor interaction
-   Quiz

Suggested formula (MVP):

    newMastery =
    oldMastery
    + correctWeight
    - mistakePenalty
    + revisionBonus

Keep the calculation isolated inside `MasteryService`.

------------------------------------------------------------------------

## 7.5 Revision Scheduler

Priority order:

1.  Forgotten concepts
2.  Weak concepts
3.  Prerequisites
4.  New concepts

Revision must compete with new learning instead of replacing it
entirely.

------------------------------------------------------------------------

## 7.6 Backend Services

ConceptService

Responsibilities

-   Load graph
-   Resolve dependencies
-   Unlock concepts
-   Calculate mastery

RevisionService

Responsibilities

-   Build revision queue
-   Detect stale concepts
-   Recommend review sessions

------------------------------------------------------------------------

## 7.7 Prisma Evolution

Create:

``` text
Concept
ConceptRelationship
ConceptMastery
RevisionSchedule
```

Avoid storing duplicated mastery values across multiple tables.

------------------------------------------------------------------------

## 7.8 APIs

``` text
GET  /api/concepts
GET  /api/concepts/mastery
GET  /api/concepts/graph
GET  /api/concepts/revision
POST /api/concepts/update
```

------------------------------------------------------------------------

## 7.9 Dashboard Integration

Expose:

-   Weak Concepts
-   Recently Improved
-   Locked Concepts
-   Next Unlock
-   Revision Queue

Dashboard should explain why each recommendation exists.

------------------------------------------------------------------------

## 7.10 Teacher Integration

Teacher Dashboard should consume aggregated concept data.

Display:

-   Weakest concepts
-   Concept heatmap
-   Unlock progression
-   Cohort mastery

------------------------------------------------------------------------

## 7.11 QA Matrix

  Scenario                           Expected Behaviour
  ---------------------------------- ------------------------
  Student fails concept repeatedly   Mastery decreases
  Student masters prerequisite       Child concept unlocks
  Revision completed                 Queue updates
  Teacher opens analytics            Cohort graph generated

------------------------------------------------------------------------

## 7.12 Definition of Done

-   [ ] Concept graph operational
-   [ ] Mastery updates correctly
-   [ ] Revision queue generated
-   [ ] Dashboard integrated
-   [ ] Teacher analytics integrated
-   [ ] APIs documented

------------------------------------------------------------------------

## 7.13 Antigravity Prompt

Implement the Concept Intelligence Engine as a standalone feature
module.

Requirements:

-   Build a reusable concept graph.
-   Extend Prisma without replacing current models.
-   Keep calculations inside services.
-   Reuse shared UI components.
-   Integrate with Mission Engine, Learning Profile, AI Mentor and
    Teacher Dashboard.
-   Do not introduce duplicate mastery calculations.

# Section 8 --- AI Orchestration Layer (Repository-Specific)

> **Goal:** Ensure every AI interaction is routed through a single
> orchestration layer that injects learner context, validates prompts,
> parses responses, and records learning events.

------------------------------------------------------------------------

## 8.1 Architecture

``` text
Student Request
      ↓
Intent Detection
      ↓
Context Builder
      ↓
Prompt Builder
      ↓
AI Provider
      ↓
Response Parser
      ↓
Learning Event
      ↓
Learning Profile Update
```

Never call an LLM directly from a page or component.

------------------------------------------------------------------------

## 8.2 Repository Structure

Create:

``` text
features/ai/
├── providers/
├── prompts/
├── parsers/
├── context/
├── services/
├── orchestrator.ts
├── prompt-builder.ts
├── response-parser.ts
├── guardrails.ts
└── types.ts
```

Modify:

``` text
app/(dashboard)/mentor/*
features/mentor/*
services/*
```

------------------------------------------------------------------------

## 8.3 Context Builder

Every request should automatically include:

-   User ID
-   Learning Level
-   Current Mission
-   Active Subject
-   Weak Concepts
-   Concept Mastery
-   Recent Mistakes
-   Preferred Difficulty

If any context is unavailable, use graceful defaults and continue.

------------------------------------------------------------------------

## 8.4 AI Provider Abstraction

Support multiple providers behind one interface.

``` text
AIProvider
├── GeminiProvider
├── OpenAIProvider
└── MockProvider
```

Pages should depend only on `AIProvider`, never on a specific SDK.

------------------------------------------------------------------------

## 8.5 Prompt Templates

Create reusable prompt families:

-   Diagnostic
-   Mentor
-   Lesson
-   Mission
-   Revision
-   Teacher Summary

Version prompts so changes can be tracked without affecting the UI.

------------------------------------------------------------------------

## 8.6 Structured Response Contract

``` ts
{
  explanation,
  hints,
  workedExample,
  conceptTags,
  masteryImpact,
  followUpQuestion,
  recommendations
}
```

Reject malformed responses before updating learner state.

------------------------------------------------------------------------

## 8.7 Learning Events

The orchestrator should emit events for:

-   Mission Completed
-   Quiz Completed
-   Mentor Session
-   Diagnostic Finished
-   Concept Mastered

These events feed the Learning Profile and analytics.

------------------------------------------------------------------------

## 8.8 APIs

``` text
POST /api/mentor/chat
POST /api/mentor/explain
POST /api/mentor/image
GET  /api/mentor/context
```

------------------------------------------------------------------------

## 8.9 Error Handling

If AI fails:

-   Retry once.
-   Return cached context if available.
-   Show educational fallback message.
-   Never lose learner progress.

------------------------------------------------------------------------

## 8.10 Definition of Done

-   [ ] Single orchestration layer implemented
-   [ ] Context injected automatically
-   [ ] Prompt templates versioned
-   [ ] Structured parser validated
-   [ ] Learning events emitted
-   [ ] AI provider abstraction complete

------------------------------------------------------------------------

## 8.11 Antigravity Prompt

Implement an AI orchestration layer instead of direct model calls.

Requirements: - Centralize prompt creation. - Inject Learning Profile,
Mission, and Concept context. - Parse structured responses. - Update
learner state through events. - Preserve the current mentor UI and
extend functionality only.

# Section 9 --- Teacher Intelligence Platform (Repository-Specific)

> **Goal:** Transform the existing teacher experience into an
> intelligence platform that helps educators make better decisions, not
> just view student data.

------------------------------------------------------------------------

## 9.1 Repository Integration

### Modify

``` text
app/(dashboard)/teacher/
features/teacher/
features/analytics/
services/
```

### Create

``` text
features/teacher/
├── analytics/
├── insights/
├── recommendations/
├── reports/
├── service.ts
├── actions.ts
└── types.ts
```

Keep the current dashboard shell and navigation.

------------------------------------------------------------------------

## 9.2 Information Hierarchy

Display information in this order:

1.  Class Health Summary
2.  Students Requiring Attention
3.  Weakest Concepts
4.  AI Teaching Insights
5.  Cohort Progress
6.  Weekly Trends
7.  Recent Student Activity

Avoid overwhelming teachers with raw tables before surfacing insights.

------------------------------------------------------------------------

## 9.3 Components

### Reuse

-   Card
-   Table
-   Badge
-   Progress
-   Tabs
-   Tooltip
-   Dialog

### Create

``` text
ClassHealthCard.tsx
StudentRiskTable.tsx
ConceptHeatmap.tsx
TeachingInsightCard.tsx
LearningVelocityChart.tsx
InterventionPanel.tsx
```

------------------------------------------------------------------------

## 9.4 Analytics Pipeline

``` text
Student Events
      ↓
Learning Profile
      ↓
Concept Mastery
      ↓
Cohort Aggregation
      ↓
Teacher Analytics
      ↓
AI Summary
```

Only aggregate data on the server.

------------------------------------------------------------------------

## 9.5 Backend Services

TeacherAnalyticsService

Responsibilities:

-   Build class summaries
-   Aggregate mastery
-   Detect struggling students
-   Rank weak concepts

TeacherInsightService

Responsibilities:

-   Generate AI summaries
-   Suggest interventions
-   Explain trends
-   Recommend revision sessions

------------------------------------------------------------------------

## 9.6 API Contracts

``` text
GET /api/teacher/dashboard
GET /api/teacher/analytics
GET /api/teacher/insights
GET /api/teacher/student/:id
```

All endpoints should return typed responses and pagination where
applicable.

------------------------------------------------------------------------

## 9.7 Success Metrics

-   Teacher identifies at-risk learners in \<30 seconds.
-   Cohort summary loads in \<2 seconds.
-   AI summary references actual learner data.
-   Analytics refresh automatically after meaningful learning events.

------------------------------------------------------------------------

## 9.8 Testing Matrix

  Scenario                             Expected Behaviour
  ------------------------------------ ------------------------------------------
  Multiple students fail one concept   Heatmap updates
  Student mastery improves             Trend reflects improvement
  New mission completed                Teacher dashboard refreshes
  AI summary requested                 Summary generated from current analytics

------------------------------------------------------------------------

## 9.9 Definition of Done

-   [ ] Teacher dashboard upgraded
-   [ ] Cohort analytics implemented
-   [ ] AI insights available
-   [ ] Student drill-down working
-   [ ] Existing functionality preserved

------------------------------------------------------------------------

## 9.10 Antigravity Prompt

Extend the existing Teacher Dashboard.

Requirements:

-   Preserve navigation and design system.
-   Aggregate analytics server-side.
-   Reuse existing UI primitives.
-   Generate AI teaching summaries using Learning Profile and Concept
    Intelligence.
-   Avoid duplicating calculations on the frontend.

# Section 10 --- API & Backend Standards (Repository-Specific)

> **Goal:** Standardize every backend endpoint so future features
> integrate consistently and are easy to maintain.

------------------------------------------------------------------------

## 10.1 Folder Convention

Keep API handlers lightweight.

``` text
app/api/
    feature/
        route.ts

features/
    feature/
        service.ts
        validation.ts
        types.ts
```

Business logic belongs in `features/*/service.ts`, not in route
handlers.

------------------------------------------------------------------------

## 10.2 Standard Request Flow

``` text
HTTP Request
      ↓
Authentication
      ↓
Validation
      ↓
Service Layer
      ↓
Database / AI
      ↓
Response Formatter
      ↓
Client
```

------------------------------------------------------------------------

## 10.3 Response Contract

Every endpoint should return:

``` ts
{
  success: boolean,
  data?: T,
  error?: {
    code: string,
    message: string
  }
}
```

Avoid returning inconsistent shapes.

------------------------------------------------------------------------

## 10.4 Validation

Use one validation layer per feature.

Suggested layout:

``` text
features/
  mission/
    validation.ts
```

Validate: - body - params - query - authenticated user

------------------------------------------------------------------------

## 10.5 Authentication Rules

Protected routes:

-   Dashboard
-   Mentor
-   Missions
-   Learning Profile
-   Teacher Analytics

Public routes:

-   Landing
-   Authentication
-   Health check

------------------------------------------------------------------------

## 10.6 Logging

Log only:

-   Learning events
-   AI failures
-   API failures
-   Critical errors

Do not log sensitive user information.

------------------------------------------------------------------------

## 10.7 Error Handling

Use centralized error helpers.

Categories:

-   ValidationError
-   AuthenticationError
-   AuthorizationError
-   AIProviderError
-   DatabaseError

Surface friendly messages to users.

------------------------------------------------------------------------

## 10.8 Performance

-   Batch related queries.
-   Avoid N+1 database access.
-   Cache dashboard aggregation.
-   Cache concept graph where possible.

------------------------------------------------------------------------

## 10.9 Definition of Done

-   [ ] Consistent API responses
-   [ ] Validation added
-   [ ] Thin route handlers
-   [ ] Services documented
-   [ ] Logging standardized

------------------------------------------------------------------------

## 10.10 Antigravity Prompt

Refactor backend APIs while preserving existing behavior.

Requirements: - Keep route handlers minimal. - Move business logic into
feature services. - Standardize responses and errors. - Preserve
authentication.

# Section 11 --- Frontend Standards & Component Architecture (Repository-Specific)

> **Goal:** Keep the frontend consistent as new adaptive learning
> features are added. Every new screen should look and behave like it
> belongs to the existing CEVORA application.

------------------------------------------------------------------------

## 11.1 Design Principles

-   Extend existing layouts.
-   Reuse shared UI primitives.
-   Prefer composition over duplication.
-   Keep feature-specific UI inside `features/*/components`.
-   Keep page files focused on composition.

------------------------------------------------------------------------

## 11.2 Repository Conventions

### Pages

``` text
app/
  (dashboard)/
    dashboard/
    mentor/
    profile/
```

Pages should: - Fetch data. - Compose feature components. - Avoid
complex business logic.

### Features

``` text
features/
  mission/
  concepts/
  learning-profile/
```

Each feature owns: - components - hooks - services - types - validation

------------------------------------------------------------------------

## 11.3 Component Rules

### Shared UI

Reuse:

-   Card
-   Button
-   Badge
-   Dialog
-   Progress
-   Tabs
-   Avatar
-   Skeleton
-   Tooltip

Never recreate primitives that already exist.

### Feature Components

Each component should support:

-   Loading state
-   Empty state
-   Error state
-   Responsive layout
-   Accessibility labels

------------------------------------------------------------------------

## 11.4 Server vs Client Components

Prefer Server Components for:

-   Dashboard data
-   Analytics
-   Learning Profile
-   Mission loading

Use Client Components for:

-   Forms
-   Interactive quizzes
-   Chat
-   Timers
-   Drag-and-drop

------------------------------------------------------------------------

## 11.5 State Management

Use local component state for UI.

Use feature hooks for shared state.

Persist only long-lived learning data:

-   Learning Profile
-   Mission progress
-   Diagnostic progress

Avoid global state for temporary UI interactions.

------------------------------------------------------------------------

## 11.6 Performance Guidelines

-   Lazy-load heavy visualizations.
-   Use Skeleton components while loading.
-   Minimize unnecessary client rendering.
-   Memoize expensive calculations.
-   Fetch aggregated data where possible.

------------------------------------------------------------------------

## 11.7 Accessibility Checklist

-   Keyboard navigation
-   Visible focus states
-   Semantic headings
-   ARIA labels
-   Mobile responsiveness
-   Contrast compliance

------------------------------------------------------------------------

## 11.8 Definition of Done

-   [ ] Shared components reused
-   [ ] Feature boundaries respected
-   [ ] No duplicate UI primitives
-   [ ] Responsive layouts verified
-   [ ] Accessibility reviewed

------------------------------------------------------------------------

## 11.9 Antigravity Prompt

Implement new frontend features by extending the existing component
architecture.

Requirements: - Preserve the design language. - Reuse shared UI
primitives. - Keep business logic outside page components. - Prefer
Server Components where appropriate. - Ensure responsive and accessible
implementations.

# Section 12 --- Testing, QA & Release Gates (Repository-Specific)

> **Goal:** Ensure every adaptive learning feature is verifiable before
> merge and before the hackathon demo.

------------------------------------------------------------------------

## 12.1 Testing Pyramid

``` text
                End-to-End
            Integration Tests
              Unit Tests
```

Priority: 1. Business logic 2. API contracts 3. Critical user flows 4.
UI polish

------------------------------------------------------------------------

## 12.2 Unit Tests (Highest Priority)

Test these services first:

-   LearningProfileService
-   MissionService
-   ConceptService
-   MasteryService
-   AIOrchestrator
-   TeacherAnalyticsService

Each service should have deterministic tests that do not depend on an AI
provider.

------------------------------------------------------------------------

## 12.3 Integration Tests

Validate:

-   Authentication → Onboarding
-   Onboarding → Learning Profile
-   Learning Profile → Mission Generation
-   Mission → Concept Mastery
-   Mentor → Learning Event
-   Teacher Dashboard → Analytics

------------------------------------------------------------------------

## 12.4 End-to-End Demo Flows

### Flow A --- New Student

Landing → Signup → Diagnostic → Dashboard → Mission → Mentor →
Completion

### Flow B --- Returning Student

Login → Dashboard → Continue Mission → Revision → Updated Recommendation

### Flow C --- Teacher

Login → Analytics → Heatmap → Student Drill-down → AI Summary

------------------------------------------------------------------------

## 12.5 Regression Checklist

Before every merge:

-   [ ] Authentication still works
-   [ ] Existing placement modules still work
-   [ ] Dashboard loads
-   [ ] Mentor responds
-   [ ] AI failures handled
-   [ ] Prisma migrations tested

------------------------------------------------------------------------

## 12.6 Release Gates

A feature cannot merge unless:

-   Build passes
-   Lint passes
-   TypeScript passes
-   QA checklist complete
-   Responsive verified
-   Accessibility checked

------------------------------------------------------------------------

## 12.7 Demo Readiness Checklist

-   [ ] Seed database populated
-   [ ] Demo accounts created
-   [ ] AI keys configured
-   [ ] Internet fallback prepared
-   [ ] Cached mission available
-   [ ] Screenshots available

------------------------------------------------------------------------

## 12.8 Bug Severity

### Critical (Fix immediately)

-   Authentication
-   Data loss
-   Dashboard crash
-   Broken AI flow
-   Broken navigation

### High

-   Incorrect recommendations
-   Missing analytics
-   Slow loading

### Low

-   Minor alignment
-   Animation issues
-   Typography

------------------------------------------------------------------------

## 12.9 Definition of Done

-   [ ] Critical flows tested
-   [ ] Demo rehearsed
-   [ ] Release gates passed
-   [ ] Rollback strategy documented

------------------------------------------------------------------------

## 12.10 Antigravity Prompt

Perform a repository-wide QA and stabilization pass.

Requirements: - Do not add new features. - Fix regressions. - Verify
adaptive learning flows. - Validate APIs and Prisma migrations. -
Prepare the application for production demonstration.

# Section 13 --- Repository Audit & Refactoring Plan (Repository-Specific)

> **Goal:** Focus development effort on high-impact work by classifying
> the current repository into areas to preserve, extend, postpone, or
> avoid changing before the hackathon.

------------------------------------------------------------------------

## 13.1 Keep As-Is (Stable Foundation)

These areas already provide value and should remain stable unless fixing
bugs:

-   Authentication
-   Shared UI primitives
-   Layouts and navigation
-   Theme and design tokens
-   Existing routing structure

Rule: **Extend, don't rewrite.**

------------------------------------------------------------------------

## 13.2 Extend Immediately (P0)

These modules directly improve hackathon scoring:

``` text
features/dashboard
features/mentor
features/learning-profile
features/mission
features/concepts
features/teacher
prisma/
app/api/
```

Target: integrate adaptive learning without breaking current
functionality.

------------------------------------------------------------------------

## 13.3 Defer Until After Hackathon (P2)

Unless required for a bug fix, avoid major investment in:

-   Cosmetic redesigns
-   New animations
-   Additional themes
-   Non-essential profile customization
-   Extra social/community features

------------------------------------------------------------------------

## 13.4 Technical Debt Backlog

Create a `TECH_DEBT.md` for items intentionally postponed.

Example entries:

-   Component duplication cleanup
-   API response normalization
-   Folder naming improvements
-   Query optimization
-   Design polish

This keeps the team focused during the event.

------------------------------------------------------------------------

## 13.5 Code Review Checklist

Every pull request should answer:

-   Does this reuse an existing component?
-   Does this duplicate business logic?
-   Does it preserve the current design language?
-   Is adaptive learning improved?
-   Are TypeScript types complete?
-   Are loading/error states handled?

If any answer is "No", revise before merging.

------------------------------------------------------------------------

## 13.6 Merge Strategy

Suggested branches:

``` text
main
develop

feature/diagnostic
feature/profile
feature/mission
feature/concepts
feature/mentor-ai
feature/teacher
```

Merge only after: - Build passes - QA complete - Reviewer approval

------------------------------------------------------------------------

## 13.7 Final Repository Health Checklist

-   [ ] No dead routes
-   [ ] No duplicate services
-   [ ] Shared UI reused
-   [ ] Feature boundaries respected
-   [ ] Prisma migrations documented
-   [ ] Environment variables documented

------------------------------------------------------------------------

## 13.8 Definition of Done

-   [ ] Repository classified
-   [ ] Technical debt documented
-   [ ] Refactoring priorities agreed
-   [ ] Team implementation order finalized

------------------------------------------------------------------------

## 13.9 Antigravity Prompt

Audit the repository before adding new functionality.

Requirements: - Preserve stable architecture. - Remove unnecessary
duplication. - Document technical debt instead of expanding scope. -
Prioritize adaptive learning features over cosmetic improvements.

# Section 14 --- Deployment, DevOps & Production Operations

> **Goal:** Ensure CEVORA can be deployed, monitored, demonstrated, and
> recovered quickly during the hackathon.

------------------------------------------------------------------------

## 14.1 Environment Strategy

### Local

``` text
.env.local
```

Contains:

-   Database URL
-   Authentication secrets
-   AI provider keys
-   Analytics keys

Never commit secrets.

------------------------------------------------------------------------

## 14.2 Deployment Targets

Recommended stack:

-   Frontend: Vercel
-   Database: Supabase PostgreSQL
-   ORM: Prisma
-   Storage: Supabase Storage
-   AI: Gemini/OpenAI (through AI Orchestrator)

------------------------------------------------------------------------

## 14.3 Environment Variables

Group by purpose:

``` text
DATABASE_*
AUTH_*
AI_*
ANALYTICS_*
APP_*
```

Document every variable in the repository README.

------------------------------------------------------------------------

## 14.4 Monitoring

Track:

-   Login failures
-   API failures
-   AI provider failures
-   Mission generation failures
-   Diagnostic completion rate

Surface logs without exposing sensitive data.

------------------------------------------------------------------------

## 14.5 Performance Targets

  Area                 Target
  -------------------- --------
  Initial Load         \<3 s
  Dashboard            \<2 s
  AI Response          \<5 s
  Mission Generation   \<2 s

------------------------------------------------------------------------

## 14.6 Backup Plan

If AI provider fails:

-   Show cached mission
-   Preserve learning profile
-   Allow practice mode
-   Display friendly fallback

If deployment fails:

-   Keep previous deployment available.
-   Maintain demo accounts with seeded data.

------------------------------------------------------------------------

## 14.7 Security Review

-   [ ] Route protection verified
-   [ ] Server-side validation
-   [ ] Prisma migrations reviewed
-   [ ] Secrets excluded
-   [ ] Rate limiting enabled for AI endpoints

------------------------------------------------------------------------

## 14.8 Pre-Deployment Checklist

-   [ ] Build passes
-   [ ] Lint passes
-   [ ] TypeScript passes
-   [ ] Environment variables configured
-   [ ] Database migrated
-   [ ] Seed data loaded
-   [ ] Demo accounts verified

------------------------------------------------------------------------

## 14.9 Definition of Done

-   [ ] Production deployment stable
-   [ ] Monitoring configured
-   [ ] Backup strategy documented
-   [ ] Team ready for live demo

------------------------------------------------------------------------

## 14.10 Antigravity Prompt

Prepare the repository for production deployment.

Requirements: - Preserve architecture. - Optimize performance. -
Configure environment variables. - Validate deployment. - Ensure
graceful degradation for AI failures.

# Section 15 --- Master Build Order (Repository-Specific)

> **Goal:** Give the team one definitive implementation sequence so
> multiple developers can work in parallel without blocking each other.

------------------------------------------------------------------------

## 15.1 Development Principles

-   Build foundations before features.
-   Merge frequently into `develop`.
-   Keep pull requests small and reviewable.
-   Never implement UI before the supporting API contract exists.

------------------------------------------------------------------------

## 15.2 Dependency Graph

``` text
Authentication
      ↓
Prisma Schema
      ↓
API Contracts
      ↓
Learning Profile
      ↓
Diagnostic Engine
      ↓
Concept Intelligence
      ↓
Mission Engine
      ↓
AI Orchestrator
      ↓
Teacher Platform
      ↓
Dashboard Polish
      ↓
Testing
      ↓
Deployment
```

------------------------------------------------------------------------

## 15.3 Sprint 1 --- Foundation (P0)

### Backend

-   [ ] Finalize Prisma schema
-   [ ] Create migrations
-   [ ] Standardize API responses
-   [ ] Configure AI provider abstraction

### Frontend

-   [ ] Dashboard shell stabilization
-   [ ] Shared component audit
-   [ ] Loading & error states

Deliverable: - Stable foundation with zero build errors.

------------------------------------------------------------------------

## 15.4 Sprint 2 --- Adaptive Learning (P0)

Implement in this order:

1.  Diagnostic
2.  Learning Profile
3.  Concept Mastery
4.  Mission Engine
5.  Dashboard integration

Deliverable: - Personalized student experience.

------------------------------------------------------------------------

## 15.5 Sprint 3 --- Intelligence (P0)

Implement:

-   AI Orchestrator
-   Mentor improvements
-   Revision engine
-   Recommendation engine

Deliverable: - Context-aware AI mentor.

------------------------------------------------------------------------

## 15.6 Sprint 4 --- Teacher Platform (P1)

Implement:

-   Cohort analytics
-   Student risk detection
-   AI summaries
-   Heatmaps

Deliverable: - Teacher intelligence dashboard.

------------------------------------------------------------------------

## 15.7 Sprint 5 --- Stabilization (P0)

-   Performance optimization
-   Accessibility review
-   QA
-   Bug fixing
-   Deployment
-   Demo rehearsal

------------------------------------------------------------------------

## 15.8 Parallel Team Allocation

### Developer A

-   Prisma
-   Backend APIs
-   Services

### Developer B

-   Dashboard
-   Missions
-   Learning Profile UI

### Developer C

-   AI Layer
-   Mentor
-   Teacher Analytics

Merge only after passing release gates from Section 12.

------------------------------------------------------------------------

## 15.9 Daily Definition of Success

Every day should end with:

-   [ ] Build passing
-   [ ] No broken routes
-   [ ] Reviewed pull requests
-   [ ] Updated implementation guide
-   [ ] Demo still functional

------------------------------------------------------------------------

## 15.10 Project Completion Criteria

The project is considered complete when:

-   Adaptive learning loop works end-to-end.
-   Teacher analytics are functional.
-   AI responses are contextual.
-   Deployment is stable.
-   Demo can be completed without manual fixes.

------------------------------------------------------------------------

## 15.11 Antigravity Prompt

Follow this build order exactly.

Requirements: - Respect feature dependencies. - Avoid parallel work on
the same files. - Keep the repository deployable after every merge. -
Prioritize adaptive learning features before cosmetic improvements.

# Section 16 --- Hackathon Judge Playbook

> **Goal:** Maximize judging impact by presenting CEVORA as a complete
> adaptive learning platform rather than a collection of features.

------------------------------------------------------------------------

## 16.1 Presentation Structure (5 Minutes)

### Minute 1 --- The Problem

Explain:

-   Students learn differently.
-   Existing platforms are mostly static.
-   Teachers lack actionable learning intelligence.

Then introduce CEVORA:

> **"An AI-powered adaptive learning platform that continuously
> diagnoses, personalizes, teaches, measures, and improves."**

------------------------------------------------------------------------

### Minute 2 --- Student Journey

Walk through:

1.  Sign up
2.  Diagnostic assessment
3.  Learning Profile creation
4.  Adaptive dashboard
5.  Today's Mission

Avoid spending time on settings or profile editing.

------------------------------------------------------------------------

### Minute 3 --- Adaptive Intelligence

Demonstrate:

-   AI Mentor
-   Weak concept detection
-   Mission recommendation
-   Learning Profile update
-   Concept mastery improvement

Show **why** recommendations changed.

------------------------------------------------------------------------

### Minute 4 --- Teacher Experience

Highlight:

-   Cohort health
-   Concept heatmap
-   At-risk students
-   AI teaching insights
-   Suggested interventions

------------------------------------------------------------------------

### Minute 5 --- Technical Differentiation

Present the adaptive loop:

``` text
Diagnostic
      ↓
Learning Profile
      ↓
Concept Intelligence
      ↓
Mission Engine
      ↓
AI Mentor
      ↓
Learning Events
      ↓
Teacher Analytics
```

Finish with scalability and real-world impact.

------------------------------------------------------------------------

## 16.2 Likely Judge Questions

Prepare concise answers for:

-   Why isn't this just ChatGPT?
-   How does personalization work?
-   How are recommendations generated?
-   What happens after a student makes mistakes?
-   Can teachers trust the analytics?
-   How would this scale to multiple schools?
-   Why did you choose this architecture?

Always reference implemented features rather than hypothetical ones.

------------------------------------------------------------------------

## 16.3 Demo Rules

-   Use seeded accounts.
-   Keep stable internet.
-   Have cached data available.
-   Never demonstrate unfinished functionality.
-   If a feature fails, continue with the prepared flow.

------------------------------------------------------------------------

## 16.4 Final Submission Checklist

-   [ ] Production deployment verified
-   [ ] Demo accounts created
-   [ ] Documentation updated
-   [ ] Team roles assigned
-   [ ] Demo rehearsed at least three times

------------------------------------------------------------------------

## 16.5 Definition of Done

-   [ ] Team confident with demo
-   [ ] Architecture explained clearly
-   [ ] Adaptive learning story communicated
-   [ ] Backup plan prepared

# Section 17 --- Antigravity Master Prompt Library

> **Goal:** Provide production-ready prompts that generate code
> consistent with the CEVORA architecture, repository structure, and
> design system.

------------------------------------------------------------------------

## 17.1 Global Rules (Include in Every Prompt)

Always prepend these instructions:

``` text
Read the current repository before making changes.

Requirements:
- Preserve the existing architecture.
- Do not redesign the UI.
- Reuse existing shared components.
- Extend Prisma instead of replacing models.
- Keep business logic inside feature modules.
- Follow TypeScript best practices.
- Keep builds, linting and type checking clean.
```

------------------------------------------------------------------------

## 17.2 Backend Generation Prompt

Use when implementing APIs or services.

Objectives:

-   Thin route handlers
-   Feature-based services
-   Validation layer
-   Typed responses
-   Reusable utilities

Expected output:

-   Modified files
-   New files
-   Prisma changes
-   API contracts
-   Testing notes

------------------------------------------------------------------------

## 17.3 Frontend Generation Prompt

Objectives:

-   Extend existing pages
-   Preserve design language
-   Reuse shared UI
-   Support loading/error/empty states
-   Responsive implementation

Expected output:

-   Components
-   Props
-   State management
-   Accessibility notes

------------------------------------------------------------------------

## 17.4 Prisma Prompt

Objectives:

-   Extend schema safely
-   Avoid destructive migrations
-   Keep backward compatibility
-   Explain migration order

Always request generated migration SQL review.

------------------------------------------------------------------------

## 17.5 AI Prompt

Objectives:

-   Build Prompt Builder
-   Build Context Builder
-   Structured response parser
-   Event emission
-   AI provider abstraction

Never allow direct LLM calls from UI components.

------------------------------------------------------------------------

## 17.6 Code Review Prompt

Review every PR for:

-   Architecture compliance
-   Duplicate logic
-   UI consistency
-   Performance
-   Accessibility
-   Type safety
-   Security

Return actionable review comments.

------------------------------------------------------------------------

## 17.7 Bug Fix Prompt

Requirements:

-   Reproduce bug
-   Explain root cause
-   Fix minimal surface area
-   Preserve architecture
-   Add regression tests where appropriate

------------------------------------------------------------------------

## 17.8 Deployment Prompt

Requirements:

-   Validate environment variables
-   Verify production build
-   Check Prisma migration
-   Test AI fallback
-   Confirm deployment readiness

------------------------------------------------------------------------

## 17.9 Repository Evolution Prompt

When introducing a new feature:

1.  Audit repository.
2.  Identify reusable modules.
3.  Explain architectural impact.
4.  List files to modify.
5.  List files to create.
6.  Produce implementation plan.
7.  Generate code.

Never skip the planning step.

------------------------------------------------------------------------

# Guide Completion

Congratulations.

The CEVORA Master Implementation Guide is now complete.

Use it together with:

-   CEVORA Engineering Bible
-   CEVORA Execution Plan

These three documents together provide:

-   Product vision
-   System architecture
-   Repository implementation
-   Build order
-   Deployment strategy
-   Demo preparation
-   Long-term maintainability

# Appendix A --- Feature Specification Template (Use for Every New Feature)

> **Purpose:** From this point onward, every new feature added to CEVORA
> should follow the same specification format. This keeps
> implementation, QA, and future maintenance consistent.

------------------------------------------------------------------------

## Feature Template

### 1. Overview

-   Feature Name:
-   Priority: P0 / P1 / P2
-   Owner:
-   Dependencies:
-   Target Release:

------------------------------------------------------------------------

### 2. Problem Statement

-   What user problem does this solve?
-   Why is it important?
-   How does it improve adaptive learning?

------------------------------------------------------------------------

### 3. User Stories

Student: - ...

Teacher: - ...

Administrator (if applicable): - ...

------------------------------------------------------------------------

### 4. UX Flow

``` text
Entry Point
    ↓
Primary Action
    ↓
System Response
    ↓
Completion
```

Include: - Loading state - Empty state - Error state - Success state

------------------------------------------------------------------------

### 5. Repository Mapping

Files to Modify:

``` text
app/
features/
components/
services/
prisma/
```

Files to Create:

``` text
features/<feature>/
```

------------------------------------------------------------------------

### 6. Database Impact

-   Existing models affected
-   New models required
-   Migration strategy
-   Rollback strategy

------------------------------------------------------------------------

### 7. API Contract

Endpoints:

``` text
GET
POST
PATCH
DELETE (if needed)
```

Document: - Request - Response - Errors - Authorization

------------------------------------------------------------------------

### 8. AI Impact (If Applicable)

Context Required:

-   Learning Profile
-   Mission
-   Concept Mastery
-   Student Intent

Expected Output:

-   Structured response
-   Learning event
-   Recommendation

------------------------------------------------------------------------

### 9. Analytics

Track:

-   Feature usage
-   Completion rate
-   Errors
-   Performance
-   AI latency (if applicable)

------------------------------------------------------------------------

### 10. Acceptance Criteria

-   [ ] Functional
-   [ ] Responsive
-   [ ] Accessible
-   [ ] Tested
-   [ ] Documented
-   [ ] Demo Ready

------------------------------------------------------------------------

## Recommendation

Create one specification using this template **before** implementing
every major feature after the hackathon. It will keep CEVORA
maintainable as it grows.
