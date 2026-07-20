# CEVORA_EXECUTION_PLAN.md

> **Status:** Living Execution Document (v0.1)
>
> This document converts the Engineering Bible into actionable
> implementation work. It is the day-to-day command center for the team.

------------------------------------------------------------------------

# How to Use

-   Work Epic by Epic.
-   Do not skip dependencies.
-   Do not redesign existing UI.
-   Follow the existing Developer Bible and Design System.
-   Extend the current architecture only.

------------------------------------------------------------------------

# Overall Milestones

  Epic   Name                      Priority   Status
  ------ ------------------------- ---------- --------
  1      Diagnostic Engine         P0         ⬜
  2      Learning Profile Engine   P0         ⬜
  3      Adaptive Mission Engine   P0         ⬜
  4      Microlearning Engine      P0         ⬜
  5      Concept Intelligence      P0         ⬜
  6      AI Mentor 2.0             P0         ⬜
  7      Teacher Intelligence      P1         ⬜
  8      Polish & Demo             P0         ⬜

------------------------------------------------------------------------

# Epic 1 --- Diagnostic Engine

## Objective

Build the adaptive onboarding experience that classifies a student's
learning level and creates the initial Learning Profile.

## Why It Exists

This is the feature judges expect first. Without it, CEVORA is not
adaptive.

## Dependencies

-   Authentication
-   Existing user profile

## Pages

### New

-   /onboarding/goal
-   /onboarding/diagnostic
-   /onboarding/result

### Modify

-   Dashboard
-   Profile

## Components

Reuse:

-   Card
-   Button
-   Badge
-   Progress
-   Dialog

Create:

-   DiagnosticQuestionCard
-   ConfidenceSelector
-   DiagnosticProgress
-   AssessmentSummary
-   LearningLevelBadge

## Backend

Create:

-   DiagnosticService
-   AssessmentEvaluator
-   ClassificationEngine

## Database

Extend:

-   User
-   LearningProfile

Create:

-   DiagnosticAttempt
-   DiagnosticResponse

## APIs

POST /api/diagnostic/start

POST /api/diagnostic/submit

GET /api/diagnostic/result

## Acceptance Criteria

-   Student completes assessment.
-   AI classifies level.
-   Learning Profile created.
-   Dashboard adapts automatically.

## Estimated Effort

Frontend: 8--10 hrs

Backend: 8 hrs

AI: 4 hrs

Testing: 2 hrs

## Antigravity Prompt (Template)

Read the Developer Bible and Design System first. Implement Epic 1 while
preserving the existing architecture. Reuse shared UI components
wherever possible. Do not redesign existing pages. Explain Prisma
changes before implementing them.

------------------------------------------------------------------------

# Progress Tracker

-   [ ] Epic 1 Complete
-   [ ] Epic 2 Complete
-   [ ] Epic 3 Complete
-   [ ] Epic 4 Complete
-   [ ] Epic 5 Complete
-   [ ] Epic 6 Complete
-   [ ] Epic 7 Complete
-   [ ] Epic 8 Complete

------------------------------------------------------------------------

# Next Section Placeholder

Epic 2 --- Learning Profile Engine (To be appended in the next
revision.)

# Epic 2 --- Learning Profile Engine

## Objective

Create the persistent learner memory that powers every adaptive decision
in CEVORA.

Unlike a chat history, the Learning Profile continuously evolves as the
student learns.

------------------------------------------------------------------------

## Why This Epic Matters

Without a Learning Profile:

-   Every AI interaction starts from zero.
-   Missions cannot adapt.
-   Concept mastery cannot be measured.
-   Teacher insights become superficial.

This epic enables personalization across the entire platform.

------------------------------------------------------------------------

## Dependencies

-   ✅ Epic 1 (Diagnostic Engine)
-   Authentication
-   Existing User model

------------------------------------------------------------------------

## User Stories

### Student

-   I can see my current learning level.
-   I know my strengths and weaknesses.
-   My progress changes after every learning activity.

### Teacher

-   I can understand each student's mastery.
-   I can identify students who need intervention.

------------------------------------------------------------------------

## Pages

### Modify

-   Dashboard
-   Profile
-   Teacher Dashboard

### New

-   /progress/mastery

------------------------------------------------------------------------

## UI Changes

### Dashboard

Add:

-   Learning Level
-   Overall Mastery
-   Weak Concepts
-   Recommended Revision
-   Learning Streak
-   Weekly Growth

### Profile

Add:

-   Learning Statistics
-   Subject Progress
-   Learning Goal
-   Daily Target
-   Mission History

### Teacher Dashboard

Add:

-   Student Mastery Table
-   Concept Heatmap
-   Risk Indicator
-   Activity Timeline

------------------------------------------------------------------------

## Components

Reuse

-   Card
-   Progress
-   Badge
-   Tabs
-   Avatar
-   Tooltip

Create

-   LearningProfileCard
-   MasteryGauge
-   WeakConceptList
-   GrowthChart
-   LearningStatsCard
-   RevisionRecommendationCard

------------------------------------------------------------------------

## Backend Services

### LearningProfileService

Responsibilities:

-   Create profile
-   Update mastery
-   Calculate confidence
-   Update streak
-   Generate recommendations

### MasteryService

Responsibilities:

-   Update concept scores
-   Calculate readiness
-   Detect regression
-   Schedule revision

------------------------------------------------------------------------

## Prisma Evolution

Extend existing models.

Add (planned):

LearningProfile

-   masteryScore
-   readinessScore
-   confidenceScore
-   consistencyScore
-   learningLevel
-   currentMissionId
-   lastActivityAt

ConceptMastery

-   conceptId
-   masteryScore
-   attempts
-   confidenceScore
-   lastReviewedAt

------------------------------------------------------------------------

## APIs

GET /api/profile

GET /api/profile/mastery

PATCH /api/profile/update

GET /api/profile/recommendations

------------------------------------------------------------------------

## Testing Checklist

-   Profile created after diagnostic
-   Mastery updates after practice
-   Dashboard reflects new values
-   Teacher dashboard aggregates correctly
-   Recommendation updates automatically

------------------------------------------------------------------------

## Acceptance Criteria

-   Every student has one active Learning Profile.
-   Profile updates after every meaningful learning event.
-   Dashboard is personalized.
-   AI Mentor receives profile context.
-   Adaptive Engine consumes profile data.

------------------------------------------------------------------------

## Estimated Effort

Frontend: 10--12 hrs

Backend: 10 hrs

AI: 4 hrs

Testing: 3 hrs

------------------------------------------------------------------------

## Definition of Done

-   [ ] UI completed
-   [ ] APIs integrated
-   [ ] Prisma migration complete
-   [ ] Adaptive recommendations working
-   [ ] Teacher dashboard consuming profile
-   [ ] Build, lint and type-check pass

------------------------------------------------------------------------

## Antigravity Prompt

Read the Developer Bible, Design System and current repository.

Implement Epic 2 while preserving the existing architecture.

Requirements:

-   Extend existing Prisma models instead of replacing them.
-   Reuse existing UI primitives.
-   Keep all business logic inside feature modules.
-   Do not redesign the dashboard.
-   Explain database changes before implementation.
-   Keep all changes isolated to Learning Profile functionality.

# Epic 3 --- Adaptive Mission Engine

## Business Goal

Transform the dashboard from a static progress screen into an
intelligent daily learning planner.

**Hackathon Score Impact:** ⭐⭐⭐⭐⭐ (Very High)

**Priority:** P0

------------------------------------------------------------------------

## Objective

Generate exactly one personalized "Today's Mission" for every student
based on their Learning Profile, concept mastery, study goal, and recent
activity.

The mission becomes the primary call-to-action throughout the platform.

------------------------------------------------------------------------

## Dependencies

-   ✅ Epic 1 --- Diagnostic Engine
-   ✅ Epic 2 --- Learning Profile Engine

------------------------------------------------------------------------

## User Stories

### Student

-   I always know what to study next.
-   I understand *why* today's lesson was selected.
-   My mission changes automatically as I improve.

### Teacher

-   I can see each student's current mission.
-   I know whether students are progressing through their personalized
    plans.

------------------------------------------------------------------------

## Pages

### New

-   /mission/today

### Modify

-   /dashboard
-   /profile
-   /teacher

------------------------------------------------------------------------

## UI Checklist

### Dashboard

-   [ ] Today's Mission (Hero Card)
-   [ ] "Why this Mission?" explanation
-   [ ] Estimated completion time
-   [ ] Continue Mission CTA
-   [ ] Mission completion state

### Mission Page

-   [ ] Mission Header
-   [ ] Objective
-   [ ] Learning Outcomes
-   [ ] Lesson Content
-   [ ] Practice
-   [ ] Reflection
-   [ ] Completion Summary

------------------------------------------------------------------------

## Components

### Reuse

-   Card
-   Button
-   Badge
-   Progress
-   Tabs
-   Dialog

### Create

-   MissionHeroCard
-   MissionReasonCard
-   MissionTimeline
-   LearningOutcomeList
-   MissionCompletionCard
-   DailyFocusBanner

------------------------------------------------------------------------

## Backend Services

### AdaptiveMissionService

Responsibilities

-   Select next concept
-   Generate daily mission
-   Estimate completion time
-   Prevent duplicate missions
-   Trigger next recommendation

### RecommendationService

Responsibilities

-   Rank concepts
-   Calculate urgency
-   Prioritize revision
-   Recommend follow-up mission

------------------------------------------------------------------------

## Prisma Checklist

### Extend

-   LearningProfile
-   Mission

### New Fields

-   currentMissionId
-   generatedReason
-   estimatedMinutes
-   priorityScore
-   completedAt

------------------------------------------------------------------------

## API Checklist

-   [ ] GET /api/missions/today
-   [ ] POST /api/missions/complete
-   [ ] GET /api/missions/history
-   [ ] GET /api/missions/recommendation

------------------------------------------------------------------------

## AI Checklist

The mission generator must consider:

-   Learning level
-   Weak concepts
-   Diagnostic result
-   Previous mission
-   Study goal
-   Daily study time
-   Revision schedule

------------------------------------------------------------------------

## Testing Checklist

-   [ ] First mission generated after diagnostic
-   [ ] Mission updates after completion
-   [ ] Dashboard refreshes correctly
-   [ ] Recommendation reason displayed
-   [ ] Duplicate missions prevented

------------------------------------------------------------------------

## Common Mistakes

❌ Random missions

❌ Static roadmap

❌ No explanation for recommendations

❌ Multiple primary tasks

------------------------------------------------------------------------

## Judge Demo

1.  Complete diagnostic
2.  Dashboard generates Today's Mission
3.  Judge reads "Why this Mission?"
4.  Student completes mission
5.  Recommendation changes automatically

------------------------------------------------------------------------

## Definition of Done

-   [ ] UI complete
-   [ ] APIs integrated
-   [ ] Services tested
-   [ ] Prisma migrated
-   [ ] Dashboard personalized
-   [ ] Demo verified

------------------------------------------------------------------------

## Antigravity Prompt

Implement Epic 3 while preserving the existing architecture.

Requirements: - Reuse existing dashboard layout. - Do not redesign the
theme. - Introduce a mission generation service. - Show one clear
primary mission. - Explain every recommendation. - Extend Prisma instead
of replacing existing models.

# Epic 4 --- Microlearning Engine

## Business Goal

Deliver short, personalized learning sessions that fit into a student's
daily routine while directly addressing their weakest concepts.

**Hackathon Score Impact:** ⭐⭐⭐⭐⭐ (Very High)

**Priority:** P0

------------------------------------------------------------------------

## Objective

Replace long, generic study sessions with AI-curated 10-minute learning
missions that are personalized using the Learning Profile.

Each mission must end with measurable progress.

------------------------------------------------------------------------

## Dependencies

-   Epic 1 --- Diagnostic Engine
-   Epic 2 --- Learning Profile
-   Epic 3 --- Adaptive Mission Engine

------------------------------------------------------------------------

## Repository Changes

### Create

    app/mission/today/page.tsx
    features/mission/
      components/
      hooks/
      lib/
      service.ts
      actions.ts
      schema.ts

### Modify

    app/dashboard/page.tsx
    features/dashboard/*
    components/shared/*

------------------------------------------------------------------------

## Implementation Order

1.  Extend Prisma models.
2.  Implement MissionService.
3.  Create API routes.
4.  Build UI components.
5.  Connect AI lesson generation.
6.  Update mastery after completion.
7.  Add analytics events.
8.  Test end-to-end flow.

------------------------------------------------------------------------

## Pages

### New

-   /mission/today

### Existing

-   Dashboard
-   Practice
-   Mentor

------------------------------------------------------------------------

## Mission Structure

    Mission Header
    ↓
    Why This Mission?
    ↓
    Learning Objective
    ↓
    5 Minute Lesson
    ↓
    Worked Example
    ↓
    3 Practice Questions
    ↓
    Reflection
    ↓
    Mission Complete

------------------------------------------------------------------------

## UI Checklist

-   [ ] Mission Hero
-   [ ] Timer
-   [ ] Objective Card
-   [ ] Lesson Card
-   [ ] Example Card
-   [ ] Practice Cards
-   [ ] Reflection Card
-   [ ] Completion Modal

------------------------------------------------------------------------

## Components

Reuse: - Card - Progress - Dialog - Button - Badge

Create: - MissionHero - LessonCard - ExampleCard - ReflectionCard -
CompletionSummary - MissionTimer

------------------------------------------------------------------------

## Backend

### MissionService

-   Generate lesson
-   Fetch mission
-   Mark complete
-   Trigger mastery update

### LessonService

-   Build lesson prompt
-   Generate examples
-   Generate practice

------------------------------------------------------------------------

## Prisma

New/Extended Models

-   Mission
-   MissionLesson
-   MissionCompletion

Fields

-   objective
-   estimatedMinutes
-   generatedReason
-   completedAt

------------------------------------------------------------------------

## APIs

-   GET /api/missions/today
-   POST /api/missions/complete
-   GET /api/missions/history

------------------------------------------------------------------------

## AI Checklist

Prompt must include:

-   Student level
-   Current concept
-   Weak concepts
-   Study goal
-   Daily study time
-   Previous mission

Output must contain:

-   Explanation
-   Example
-   Practice
-   Reflection

------------------------------------------------------------------------

## Risk Register

  Risk               Mitigation
  ------------------ -----------------------------------
  Slow AI response   Cache generated mission
  Empty lesson       Fallback template
  API failure        Allow retry and preserve progress

------------------------------------------------------------------------

## Judge Demo

Student completes diagnostic → Today's Mission appears → Learns in \~10
minutes → Solves practice → Mastery updates → Tomorrow's recommendation
changes.

------------------------------------------------------------------------

## Definition of Done

-   [ ] Personalized mission generated
-   [ ] Lesson rendered
-   [ ] Practice embedded
-   [ ] Mastery updated
-   [ ] Dashboard refreshed
-   [ ] Demo verified

------------------------------------------------------------------------

## Antigravity Prompt

Implement Epic 4 while preserving the existing architecture.

Requirements: - Reuse existing design system. - Do not redesign
layouts. - Generate one personalized mission per day. - Keep lessons
concise (\~10 minutes). - Update Learning Profile on completion. -
Explain every recommendation shown to the user.

# Epic 5 --- Concept Intelligence Engine

## Business Goal

Create the intelligence layer that understands *what* a student knows
instead of only *what* they recently studied. This is the core
differentiator between CEVORA and a generic AI tutor.

**Hackathon Score Impact:** ⭐⭐⭐⭐⭐ (Highest)

**Priority:** P0

------------------------------------------------------------------------

## Objective

Build a concept graph that continuously tracks mastery, prerequisite
relationships, weak areas, and revision opportunities.

The Concept Intelligence Engine becomes the primary source of truth for
all adaptive recommendations.

------------------------------------------------------------------------

## Why This Epic Wins Judges

Without this engine:

-   AI is just conversational.
-   Progress is superficial.
-   Recommendations feel random.

With this engine:

-   Every mistake has meaning.
-   Every recommendation is explainable.
-   Every lesson updates the learner model.

------------------------------------------------------------------------

## Dependencies

-   ✅ Epic 1 --- Diagnostic Engine
-   ✅ Epic 2 --- Learning Profile
-   ✅ Epic 3 --- Adaptive Mission Engine
-   ✅ Epic 4 --- Microlearning Engine

------------------------------------------------------------------------

## Repository Changes

### Create

``` text
features/concepts/
├── components/
├── hooks/
├── lib/
├── graph.ts
├── service.ts
├── actions.ts
├── schema.ts
└── types.ts

app/concept-map/page.tsx
app/progress/mastery/page.tsx
```

### Modify

``` text
app/dashboard/page.tsx
app/mentor/page.tsx
app/practice/page.tsx
app/teacher/page.tsx
```

------------------------------------------------------------------------

## User Stories

### Student

-   See weak concepts.
-   Understand why concepts are locked.
-   Receive revision suggestions.
-   Watch mastery improve over time.

### Teacher

-   View class-wide weak concepts.
-   Identify prerequisite gaps.
-   Recommend targeted intervention.

------------------------------------------------------------------------

## Core Features

-   Concept Graph
-   Prerequisite Mapping
-   Mastery Tracking
-   Weak Concept Detection
-   Revision Recommendation
-   Concept Unlocking
-   Mastery Heatmap

------------------------------------------------------------------------

## UI Checklist

Dashboard

-   [ ] Weak Concepts
-   [ ] Recommended Revision
-   [ ] Mastery Summary

Concept Map

-   [ ] Interactive graph
-   [ ] Node status
-   [ ] Progress indicators
-   [ ] Locked concepts

Teacher Dashboard

-   [ ] Concept Heatmap
-   [ ] Class Weakness Ranking
-   [ ] Concept Trend

------------------------------------------------------------------------

## Components

Reuse

-   Card
-   Badge
-   Progress
-   Tabs
-   Tooltip

Create

-   ConceptGraph
-   ConceptNode
-   ConceptEdge
-   MasteryHeatmap
-   WeakConceptCard
-   RevisionSuggestionCard
-   UnlockIndicator

------------------------------------------------------------------------

## Backend Services

ConceptService - Load graph - Resolve prerequisites - Calculate
mastery - Unlock concepts

RevisionService - Schedule review - Recommend revisions - Detect
forgotten concepts

------------------------------------------------------------------------

## Prisma Checklist

Create / Extend

-   Concept
-   ConceptRelationship
-   ConceptMastery
-   RevisionSchedule

Important fields

-   masteryScore
-   confidenceScore
-   attempts
-   lastReviewedAt
-   prerequisiteSatisfied

------------------------------------------------------------------------

## APIs

-   GET /api/concepts
-   GET /api/concepts/mastery
-   GET /api/concepts/recommendations
-   POST /api/concepts/update

------------------------------------------------------------------------

## AI Integration

Every mentor response must include:

-   Active concept
-   Related concepts
-   Weak concepts
-   Mastery score
-   Suggested next concept

No prompt should be generated without concept context.

------------------------------------------------------------------------

## QA Scenarios

-   Student repeatedly fails recursion → mastery decreases.
-   Master prerequisite → child concept unlocks.
-   Dashboard immediately reflects changes.
-   Teacher sees updated class heatmap.

------------------------------------------------------------------------

## Risks & Mitigation

  Risk                Mitigation
  ------------------- ------------------------------
  Graph too complex   Start with subject-level DAG
  Slow calculations   Cache mastery summaries
  Incorrect unlocks   Unit test prerequisite rules

------------------------------------------------------------------------

## Definition of Done

-   [ ] Concept graph functional
-   [ ] Mastery updates automatically
-   [ ] Revision recommendations generated
-   [ ] Teacher analytics integrated
-   [ ] AI consumes concept context
-   [ ] Demo verified

------------------------------------------------------------------------

## Demo Script

1.  Student opens Concept Map.
2.  Judge sees weak concepts highlighted.
3.  Student completes a mission.
4.  Mastery increases.
5.  New concept unlocks.
6.  Dashboard recommendation changes.
7.  Teacher dashboard reflects updated class insights.

------------------------------------------------------------------------

## Ready-to-Merge Checklist

-   [ ] Build passes
-   [ ] Lint passes
-   [ ] TypeScript passes
-   [ ] No duplicated logic
-   [ ] Responsive UI
-   [ ] Demo flow verified

------------------------------------------------------------------------

## Antigravity Prompt

Implement Epic 5 while preserving the current CEVORA architecture.

Requirements: - Build a reusable Concept Intelligence Engine. - Extend
the existing Prisma schema only where necessary. - Reuse shared UI
primitives and maintain the existing design language. - Keep business
logic inside feature modules. - Ensure every practice session updates
concept mastery. - Ensure every AI interaction receives concept context
before prompt generation. - Do not introduce unrelated features or
redesign existing pages.

# Epic 6 --- Adaptive AI Layer (The Intelligence Core)

## Business Goal

Transform CEVORA from an AI-powered application into an adaptive
learning system whose AI responses are personalized, explainable, and
continuously improve the learner model.

**Hackathon Score Impact:** ⭐⭐⭐⭐⭐ (Highest)

**Priority:** P0

------------------------------------------------------------------------

## Objective

Every AI response must be generated using the student's learning context
instead of only the current prompt.

The AI should:

-   Understand the learner
-   Teach instead of answer
-   Update mastery after meaningful interactions
-   Explain recommendations

------------------------------------------------------------------------

## Dependencies

-   ✅ Epic 1 --- Diagnostic Engine
-   ✅ Epic 2 --- Learning Profile
-   ✅ Epic 3 --- Adaptive Mission Engine
-   ✅ Epic 5 --- Concept Intelligence Engine

------------------------------------------------------------------------

## Repository Changes

### Create

``` text
features/ai/
├── context/
├── prompts/
├── parsers/
├── orchestrator.ts
├── prompt-builder.ts
├── response-parser.ts
├── guardrails.ts
└── types.ts
```

### Modify

``` text
features/mentor/
app/mentor/page.tsx
app/api/mentor/*
```

------------------------------------------------------------------------

## AI Pipeline

``` text
Student Input
      ↓
Intent Detection
      ↓
Concept Extraction
      ↓
Learning Profile
      ↓
Current Mission
      ↓
Concept Context
      ↓
Prompt Builder
      ↓
LLM
      ↓
Structured Response
      ↓
Mastery Update Event
      ↓
Recommendation Engine
```

------------------------------------------------------------------------

## Context Builder

Every request should include:

-   Learning Level
-   Current Mission
-   Weak Concepts
-   Strong Concepts
-   Recent Mistakes
-   Current Subject
-   Target Difficulty
-   Daily Study Goal

No prompt should be sent without context.

------------------------------------------------------------------------

## Prompt Rules

The AI should:

-   Encourage thinking first
-   Provide hints before answers
-   Explain mistakes
-   Connect concepts together
-   Recommend the next step

The AI should not:

-   Dump complete solutions immediately
-   Ignore learner level
-   Recommend unrelated topics

------------------------------------------------------------------------

## Structured Response Contract

Every response should contain:

-   Explanation
-   Hint (optional)
-   Worked Example
-   Concept Tags
-   Difficulty
-   Follow-up Question
-   Mastery Impact

Avoid free-form, inconsistent outputs.

------------------------------------------------------------------------

## Backend Services

### AIOrchestrator

Responsibilities

-   Build prompt
-   Call model
-   Parse response
-   Trigger learning events

### ContextService

Responsibilities

-   Fetch profile
-   Fetch mission
-   Fetch concept graph
-   Build context payload

------------------------------------------------------------------------

## APIs

-   POST /api/mentor/chat
-   POST /api/mentor/explain
-   POST /api/mentor/image
-   GET /api/mentor/context

------------------------------------------------------------------------

## QA Scenarios

-   Same question, beginner vs advanced → different explanation.
-   Weak concept → AI recommends revision.
-   Correct answer → mastery increases.
-   Incorrect reasoning → AI hints before revealing.

------------------------------------------------------------------------

## Risks

  Risk              Mitigation
  ----------------- ----------------------------------------------
  Hallucination     Strict prompt templates + structured parsing
  Long latency      Stream responses and cache context
  Generic answers   Always inject learning profile

------------------------------------------------------------------------

## Definition of Done

-   [ ] Context builder implemented
-   [ ] Prompt builder implemented
-   [ ] Structured response parser working
-   [ ] Mentor personalized
-   [ ] Learning events generated
-   [ ] Recommendation updates verified

------------------------------------------------------------------------

## Judge Demo

1.  Judge asks the same question using two different student profiles.
2.  AI gives different explanations based on learner level.
3.  AI references today's mission.
4.  AI recommends a revision because of weak concept history.
5.  Dashboard updates after the interaction.

------------------------------------------------------------------------

## Ready-to-Merge Checklist

-   [ ] Build passes
-   [ ] Type-safe responses
-   [ ] Prompt templates versioned
-   [ ] Fallback handling implemented
-   [ ] Demo script rehearsed

------------------------------------------------------------------------

## Antigravity Prompt

Implement Epic 6 while preserving the existing architecture.

Requirements: - Build an AI orchestration layer instead of direct LLM
calls. - Inject Learning Profile, Mission, and Concept Intelligence into
every prompt. - Return structured AI responses. - Update mastery after
meaningful conversations. - Keep mentor educational, not
solution-oriented. - Preserve the existing UI and only extend
functionality.

# Epic 7 --- Teacher Intelligence Platform

## Business Goal

Empower educators with actionable insights instead of raw student data.
The platform should help teachers decide **who needs help, why they need
help, and what to do next.**

**Hackathon Score Impact:** ⭐⭐⭐⭐☆ (High)

**Priority:** P1

------------------------------------------------------------------------

## Objective

Convert individual learning events into class-level intelligence.

The system should surface:

-   Students at risk
-   Weakest concepts
-   Learning trends
-   AI-generated intervention suggestions
-   Cohort performance summaries

------------------------------------------------------------------------

## Dependencies

-   ✅ Epic 2 --- Learning Profile
-   ✅ Epic 5 --- Concept Intelligence
-   ✅ Epic 6 --- Adaptive AI Layer

------------------------------------------------------------------------

## Repository Changes

### Create

``` text
features/teacher/
├── analytics/
├── insights/
├── components/
├── service.ts
├── actions.ts
└── types.ts
```

### Modify

``` text
app/teacher/page.tsx
features/dashboard/*
```

------------------------------------------------------------------------

## User Stories

### Teacher

-   View class-wide mastery.
-   Identify students needing intervention.
-   Discover difficult concepts.
-   Receive AI-generated teaching suggestions.

### Student

-   No direct UI changes except improved recommendations driven by
    teacher insights.

------------------------------------------------------------------------

## Dashboard Layout

### Overview

-   Class Average Mastery
-   Active Students
-   Weekly Completion Rate
-   Learning Velocity

### Analytics

-   Concept Heatmap
-   Weakest Topics
-   Most Improved Students
-   Students at Risk

### AI Insights

-   Weekly Summary
-   Suggested Intervention
-   Recommended Revision Session

------------------------------------------------------------------------

## Components

Reuse

-   Card
-   Table
-   Badge
-   Progress
-   Tooltip

Create

-   CohortHeatmap
-   StudentRiskTable
-   AIInsightCard
-   ConceptTrendChart
-   InterventionPanel
-   LearningVelocityCard

------------------------------------------------------------------------

## Backend Services

TeacherAnalyticsService

Responsibilities

-   Aggregate mastery
-   Calculate cohort metrics
-   Detect risk
-   Build trend reports

InsightService

Responsibilities

-   Generate AI summaries
-   Recommend interventions
-   Explain concept trends

------------------------------------------------------------------------

## Prisma Evolution

Extend with derived analytics where required.

Potential additions:

-   TeacherClass
-   CohortSnapshot
-   InsightLog

Prefer computed analytics over duplicated data.

------------------------------------------------------------------------

## APIs

-   GET /api/teacher/dashboard
-   GET /api/teacher/cohort
-   GET /api/teacher/insights
-   GET /api/teacher/students/:id

------------------------------------------------------------------------

## Success Metrics

-   Teacher identifies at-risk students in under 30 seconds.
-   AI insight generation \< 5 seconds.
-   Cohort analytics refresh after meaningful learning events.

------------------------------------------------------------------------

## QA Scenarios

-   Multiple students fail the same concept → heatmap updates.
-   One student improves rapidly → trend reflects improvement.
-   AI summary references real cohort data.

------------------------------------------------------------------------

## Risks

  Risk                  Mitigation
  --------------------- ----------------------------
  Large datasets        Aggregate server-side
  Slow dashboards       Cache summaries
  Misleading insights   Display supporting metrics

------------------------------------------------------------------------

## Definition of Done

-   [ ] Teacher dashboard upgraded
-   [ ] Heatmap implemented
-   [ ] AI insights generated
-   [ ] Student risk detection working
-   [ ] Cohort metrics validated

------------------------------------------------------------------------

## Judge Demo

1.  Open Teacher Dashboard.
2.  Display class mastery heatmap.
3.  Show weakest concept.
4.  AI recommends a revision session.
5.  Drill into one student and view personalized learning profile.

------------------------------------------------------------------------

## Ready-to-Merge Checklist

-   [ ] Responsive UI
-   [ ] APIs tested
-   [ ] Analytics validated
-   [ ] AI summaries reviewed
-   [ ] Demo rehearsed

------------------------------------------------------------------------

## Antigravity Prompt

Implement Epic 7 while preserving the current architecture.

Requirements: - Extend the existing Teacher Dashboard instead of
redesigning it. - Reuse shared analytics components where possible. -
Compute analytics from Learning Profile and Concept Mastery. - Generate
concise AI teaching insights. - Keep all business logic in feature
services.

# Epic 8 --- Student Intelligence Dashboard

## Business Goal

Transform the dashboard into an intelligent decision center that always
answers:

> **What should I learn next, why, and how much progress am I making?**

**Hackathon Score Impact:** ⭐⭐⭐⭐☆ (High)

**Priority:** P0

------------------------------------------------------------------------

## Objective

Every dashboard widget must help the learner make a decision. Decorative
or low-value widgets should be removed from the MVP.

------------------------------------------------------------------------

## Repository Changes

### Modify

``` text
app/dashboard/page.tsx
features/dashboard/*
features/mission/*
features/learning-profile/*
```

### Create

``` text
features/dashboard/components/
├── MissionHeroCard
├── WhyThisMissionCard
├── WeakConceptsCard
├── WeeklyInsightsCard
├── NextMilestoneCard
└── DailyStreakCard
```

------------------------------------------------------------------------

## Information Hierarchy

1.  Today's Mission
2.  Why This Mission?
3.  Continue Learning
4.  Weak Concepts
5.  Weekly Progress
6.  Revision Suggestions
7.  Learning Streak
8.  Upcoming Milestone

------------------------------------------------------------------------

## Remove / Deprioritize

For MVP, avoid dashboard widgets that do not improve adaptive learning:

-   Generic quotes
-   Static announcements
-   Decorative statistics
-   Unused charts

------------------------------------------------------------------------

## Backend Requirements

DashboardService

Responsibilities:

-   Aggregate mission data
-   Aggregate profile data
-   Aggregate concept mastery
-   Return one optimized payload

Avoid multiple sequential API calls.

------------------------------------------------------------------------

## APIs

-   GET /api/dashboard
-   GET /api/dashboard/summary

------------------------------------------------------------------------

## Success Metrics

-   Student identifies today's task in under 5 seconds.
-   Dashboard loads in under 2 seconds (cached where possible).
-   Mission completion rate increases over time.

------------------------------------------------------------------------

## QA Scenarios

-   New user after diagnostic.
-   Returning student with incomplete mission.
-   Student with multiple weak concepts.
-   Student who completed today's mission.

------------------------------------------------------------------------

## Definition of Done

-   [ ] Dashboard personalized
-   [ ] Mission clearly visible
-   [ ] Recommendations explained
-   [ ] Responsive layout verified
-   [ ] Performance optimized

------------------------------------------------------------------------

## Antigravity Prompt

Upgrade the existing dashboard without redesigning it.

Requirements: - Preserve the current design language. - Make Today's
Mission the primary hero section. - Display "Why this Mission?" using
Adaptive Engine output. - Surface weak concepts and revision
suggestions. - Aggregate data server-side where possible.

# Epic 9 --- Production Readiness & Deployment

## Business Goal

Ensure CEVORA is stable, fast, accessible, and demo-ready. A polished
experience increases judge confidence and reduces the risk of demo
failures.

**Hackathon Score Impact:** ⭐⭐⭐⭐☆ (High)

**Priority:** P0

------------------------------------------------------------------------

## Objective

Harden the application without changing its core functionality.

------------------------------------------------------------------------

## Repository Changes

### Audit

``` text
app/*
features/*
components/*
lib/*
middleware.ts
next.config.*
```

### Create

``` text
features/system/
├── monitoring/
├── analytics/
├── health/
└── performance/
```

------------------------------------------------------------------------

## Performance Checklist

-   [ ] Route-level code splitting
-   [ ] Lazy load heavy charts
-   [ ] Image optimization
-   [ ] API response caching
-   [ ] Skeleton loaders
-   [ ] Remove unnecessary client components
-   [ ] Bundle analysis

Target:

-   First Load \< 3s
-   Dashboard \< 2s after authentication

------------------------------------------------------------------------

## Reliability Checklist

-   [ ] Global error boundary
-   [ ] Empty states
-   [ ] Retry actions
-   [ ] API timeout handling
-   [ ] Graceful AI failure message
-   [ ] Health endpoint

------------------------------------------------------------------------

## Accessibility Checklist

-   [ ] Keyboard navigation
-   [ ] Focus indicators
-   [ ] ARIA labels
-   [ ] Contrast validation
-   [ ] Screen reader support
-   [ ] Responsive layouts

------------------------------------------------------------------------

## Security Checklist

-   [ ] Protected routes
-   [ ] Server-side validation
-   [ ] Input sanitization
-   [ ] Rate limiting (AI endpoints)
-   [ ] Environment variable audit
-   [ ] Secrets excluded from repository

------------------------------------------------------------------------

## Deployment Checklist

-   [ ] Production environment variables
-   [ ] Database migration tested
-   [ ] Build succeeds
-   [ ] Lint succeeds
-   [ ] TypeScript succeeds
-   [ ] Analytics enabled
-   [ ] Error logging enabled

------------------------------------------------------------------------

## Demo Fallback Strategy

If AI API fails:

-   Display cached mission.
-   Continue using existing Learning Profile.
-   Explain that recommendations are based on the latest successful
    analysis.

If internet becomes unstable:

-   Use deployed production URL.
-   Keep screenshots and short demo video ready as backup.

------------------------------------------------------------------------

## QA Matrix

  Area                Status
  ------------------- --------
  Authentication      ⬜
  Diagnostic          ⬜
  Learning Profile    ⬜
  Mission Engine      ⬜
  AI Mentor           ⬜
  Teacher Dashboard   ⬜
  Deployment          ⬜

------------------------------------------------------------------------

## Definition of Done

-   [ ] Zero build errors
-   [ ] Zero TypeScript errors
-   [ ] Zero lint errors
-   [ ] Stable deployment
-   [ ] Demo fallback verified

------------------------------------------------------------------------

## Antigravity Prompt

Perform a production-readiness pass without redesigning the application.

Requirements: - Optimize performance. - Improve reliability. - Preserve
architecture. - Fix accessibility gaps. - Ensure successful production
deployment.

# Epic 10 --- Hackathon Delivery Kit

## Business Goal

Present CEVORA as a complete adaptive learning platform with a clear
story, confident demonstration, and technically defensible architecture.

**Hackathon Score Impact:** ⭐⭐⭐⭐⭐ (Highest)

**Priority:** P0

------------------------------------------------------------------------

## Objective

Maximize judging impact by ensuring the team demonstrates the right
features, in the right order, with a consistent narrative.

------------------------------------------------------------------------

## Deliverables

-   Final production deployment
-   Presentation deck
-   Live demo
-   Backup demo
-   Architecture diagram
-   Team speaking plan
-   Judge Q&A preparation

------------------------------------------------------------------------

## 5-Minute Demo Flow

### Minute 0--1

Problem

-   Students learn differently.
-   Current platforms are static.
-   Teachers lack actionable insights.

Introduce CEVORA as an Adaptive Learning Intelligence Platform.

------------------------------------------------------------------------

### Minute 1--2

Student Journey

1.  Sign up
2.  Complete diagnostic
3.  AI creates Learning Profile
4.  Personalized dashboard appears

------------------------------------------------------------------------

### Minute 2--3

Adaptive Learning

Show:

-   Today's Mission
-   Why This Mission?
-   10-minute lesson
-   Practice
-   AI Mentor

Intentionally answer one question incorrectly.

Demonstrate:

-   Concept mastery update
-   Recommendation changes

------------------------------------------------------------------------

### Minute 3--4

Teacher Experience

Show:

-   Cohort Heatmap
-   Weak Concepts
-   AI Insight
-   Student Risk View

------------------------------------------------------------------------

### Minute 4--5

Architecture & Impact

Highlight:

-   Adaptive Learning Loop
-   Learning Profile
-   Concept Intelligence
-   AI Context Layer

Finish with measurable impact and future scalability.

------------------------------------------------------------------------

## Presentation Deck

1.  Problem
2.  Existing Solutions
3.  CEVORA Vision
4.  Architecture
5.  Adaptive Learning Loop
6.  Key Features
7.  Technical Stack
8.  AI Pipeline
9.  Live Demo
10. Future Roadmap

------------------------------------------------------------------------

## Judge Questions

Prepare answers for:

-   Why is this different from ChatGPT?
-   How is learning personalized?
-   How does the AI remember progress?
-   How are weak concepts detected?
-   Why should schools adopt this?
-   How is data stored?
-   How would the platform scale?

Every answer should reference implemented features.

------------------------------------------------------------------------

## Team Roles

Presenter 1 - Problem - Vision

Presenter 2 - Live Demo

Presenter 3 - Architecture - AI - Technical Questions

------------------------------------------------------------------------

## Final Submission Checklist

### Code

-   [ ] Build passes
-   [ ] Lint passes
-   [ ] TypeScript passes

### Product

-   [ ] Diagnostic works
-   [ ] Mission generation works
-   [ ] Learning Profile updates
-   [ ] AI Mentor contextual
-   [ ] Teacher analytics available

### Demo

-   [ ] Internet tested
-   [ ] Backup deployment
-   [ ] Demo accounts created
-   [ ] Seed data prepared
-   [ ] Timer rehearsed

### Documentation

-   [ ] Engineering Bible updated
-   [ ] Execution Plan finalized
-   [ ] README refreshed

------------------------------------------------------------------------

## Bug Triage

Fix immediately:

-   Authentication
-   Crashes
-   Broken navigation
-   AI failures
-   Incorrect recommendations

Postpone:

-   Cosmetic tweaks
-   New features
-   Minor animations

------------------------------------------------------------------------

## Definition of Done

-   [ ] Successful deployment
-   [ ] Demo rehearsed
-   [ ] Team aligned
-   [ ] Documentation complete
-   [ ] Submission package ready

------------------------------------------------------------------------

## Project Freeze

After Epic 10:

-   No new features.
-   Bug fixes only.
-   Performance tuning only.
-   Demo rehearsal every day until submission.

------------------------------------------------------------------------

# Project Completion

Congratulations.

At this stage the implementation roadmap is complete.

The remaining work is execution, testing, polishing, and presenting
CEVORA with confidence.
