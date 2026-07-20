# CEVORA_ENGINEERING_BIBLE.md

> Status: Living Document (v0.1)

This document will be continuously extended until the hackathon ends.

## Table of Contents

### Part I

-   Vision
-   Problem Statement Analysis
-   Judge Matrix

### Part II

-   Adaptive Learning Loop
-   Architecture
-   User Journey

### Part III

-   Diagnostic Engine
-   Learning Profile
-   Adaptive Learning Engine
-   Microlearning
-   Concept Intelligence
-   AI Mentor
-   Teacher Dashboard

### Part IV

-   Backend
-   Prisma
-   APIs
-   AI

### Part V

-   UI/UX
-   Components
-   Pages

### Part VI

-   Execution Plan
-   Demo
-   Presentation
-   Checklist

## Rules

-   Single source of truth.
-   Extend this document only.
-   Reuse existing architecture and components.
-   Every feature must support adaptive learning.

## Current Priority

1.  Diagnostic Engine
2.  Adaptive Learning Engine
3.  Concept Intelligence
4.  Microlearning
5.  Teacher Analytics

------------------------------------------------------------------------

Next section to be written:

# Chapter 1 -- Adaptive Learning Engine

# Chapter 1 --- Adaptive Learning Engine (The Brain of CEVORA)

## 1.1 Purpose

The Adaptive Learning Engine is the central decision-making subsystem of
CEVORA.

It does **not** teach students directly.

Its responsibility is to continuously decide:

-   What the student should learn next.
-   Why that topic should be learned now.
-   Which learning resources should be shown.
-   Which practice problems should be assigned.
-   When revision should occur.
-   When the learning path should change.

> **Principle:** The AI Mentor teaches. The Adaptive Learning Engine
> decides.

------------------------------------------------------------------------

## 1.2 Why This Exists

Most EdTech platforms are content-first.

Most AI tutors are conversation-first.

CEVORA is **decision-first**.

The platform should know the learner before selecting the lesson.

------------------------------------------------------------------------

## 1.3 Adaptive Learning Loop

``` text
Diagnostic Assessment
        ↓
Learning Profile
        ↓
Adaptive Learning Engine
        ↓
Today's Mission
        ↓
Micro Lesson
        ↓
Practice
        ↓
AI Mentor
        ↓
Concept Mastery Update
        ↓
Knowledge Graph Update
        ↓
Teacher Analytics
        ↓
Next Mission
```

Every subsystem contributes data back into this loop.

------------------------------------------------------------------------

## 1.4 Inputs

The engine consumes:

-   Diagnostic Result
-   Student Goal
-   Daily Available Study Time
-   Current Mastery
-   Weak Concepts
-   Previous Missions
-   Practice Accuracy
-   AI Mentor Conversation Context
-   Revision Schedule

------------------------------------------------------------------------

## 1.5 Outputs

The engine generates:

-   One Primary Daily Mission
-   Recommended 10-minute Lesson
-   Three Embedded Practice Questions
-   Suggested Revision Topic
-   Recommended Difficulty
-   Reason Trace ("Why this mission was selected")

------------------------------------------------------------------------

## 1.6 Non-Negotiable Rules

1.  Every recommendation must include a human-readable reason.
2.  Never generate a generic learning path.
3.  Always adapt after meaningful student activity.
4.  One primary mission per day.
5.  Recommendations must respect prerequisite concepts.

------------------------------------------------------------------------

## 1.7 MVP Acceptance Criteria

-   Student completes diagnostic.
-   Learning profile is generated.
-   Dashboard displays Today's Mission.
-   Mission changes after progress.
-   Weak concepts influence future recommendations.
-   Teacher dashboard reflects updated mastery.

------------------------------------------------------------------------

## 1.8 Implementation Priority

P0 (Must Build Before Demo)

This subsystem is the architectural heart of CEVORA and all remaining
chapters depend on it.

# Chapter 2 --- Diagnostic Assessment Engine

## 2.1 Purpose

The Diagnostic Assessment Engine is the first intelligent interaction
after onboarding.

Its goal is **not to test the student**. Its goal is to estimate the
learner's current mastery so CEVORA can generate a personalized learning
experience.

This chapter directly satisfies the hackathon requirement for a
5-question diagnostic with automatic level classification.

------------------------------------------------------------------------

## 2.2 User Journey

Signup → Profile Setup → Goal Selection → Subject Selection → Daily
Study Time → Diagnostic Assessment → AI Classification → Learning
Profile → Adaptive Dashboard

Students should never enter the dashboard before completing the initial
diagnostic unless they explicitly skip it.

------------------------------------------------------------------------

## 2.3 Assessment Principles

-   Maximum duration: 5 minutes
-   Exactly 5 core questions for MVP
-   Questions increase or decrease in difficulty based on responses
-   Mix conceptual understanding and application
-   Capture confidence along with correctness

------------------------------------------------------------------------

## 2.4 Assessment Outputs

The engine produces:

-   Overall Level
    -   Foundational
    -   Grade-Level
    -   Advanced
-   Subject Readiness Score
-   Initial Concept Mastery
-   Weak Concepts
-   Strong Concepts
-   Recommended Learning Path

------------------------------------------------------------------------

## 2.5 Frontend Pages

### New Pages

-   /onboarding/goal
-   /onboarding/diagnostic
-   /onboarding/result

### Existing Pages to Modify

Dashboard - Display Today's Mission after assessment - Show Learning
Level badge - Show "Why this mission?"

Profile - Add Learning Profile summary

------------------------------------------------------------------------

## 2.6 Components

Reuse existing UI primitives wherever possible.

New feature components:

-   DiagnosticQuestionCard
-   DiagnosticProgress
-   ConfidenceSelector
-   AssessmentSummaryCard
-   SkillBadge
-   LearningPathPreview

No duplicate buttons, cards, dialogs or layouts.

------------------------------------------------------------------------

## 2.7 Backend Responsibilities

Services:

-   Generate assessment
-   Evaluate answers
-   Classify student
-   Create Learning Profile
-   Trigger Adaptive Learning Engine

------------------------------------------------------------------------

## 2.8 Suggested Prisma Models

-   DiagnosticAttempt
-   DiagnosticQuestion
-   DiagnosticResponse
-   LearningProfile (extended)
-   ConceptMastery

These will be mapped onto the existing schema rather than replacing
current models.

------------------------------------------------------------------------

## 2.9 APIs

POST /api/diagnostic/start POST /api/diagnostic/submit GET
/api/diagnostic/result

------------------------------------------------------------------------

## 2.10 Acceptance Criteria

✓ Student completes diagnostic ✓ Learning profile is stored ✓ Dashboard
adapts automatically ✓ Mission generated without manual selection ✓
Teacher can view classified student level

# Chapter 3 --- Learning Profile Engine

## 3.1 Purpose

The Learning Profile Engine is the permanent memory of CEVORA.

Unlike a traditional AI chatbot, CEVORA never starts every conversation
from zero. Every recommendation, lesson, practice set, and AI response
is informed by this profile.

> **Design Principle:** Conversations are temporary. Learning is
> cumulative.

------------------------------------------------------------------------

## 3.2 Responsibilities

The engine maintains a continuously updated model of the learner.

It is responsible for:

-   Tracking concept mastery
-   Recording weak and strong concepts
-   Measuring learning velocity
-   Monitoring consistency
-   Storing assessment history
-   Tracking completed missions
-   Updating confidence scores
-   Providing context to the Adaptive Learning Engine and AI Mentor

------------------------------------------------------------------------

## 3.3 Learning Profile Data Model

### Student Identity

-   Goal
-   Role
-   Preferred Language
-   Daily Study Time
-   Active Subject

### Learning State

-   Current Level
-   Mastery Percentage
-   Readiness Score
-   Confidence Score
-   Consistency Score

### Knowledge State

-   Strong Concepts
-   Weak Concepts
-   Locked Concepts
-   Recently Revised Concepts

### Activity

-   Completed Missions
-   Practice Accuracy
-   AI Mentor Sessions
-   Mini Quiz History

------------------------------------------------------------------------

## 3.4 Profile Update Events

The Learning Profile is updated after:

-   Diagnostic completion
-   Mission completion
-   Practice submission
-   Mini Quiz
-   AI Mentor interaction (meaningful)
-   Teacher assessment (future)

No meaningful learning event should leave the profile unchanged.

------------------------------------------------------------------------

## 3.5 Mastery Rules (MVP)

Every concept has a mastery score (0--100).

Suggested interpretation:

-   0--29 → Not Learned
-   30--59 → Developing
-   60--79 → Proficient
-   80--100 → Mastered

Mastery increases through repeated successful practice and decreases
slowly after prolonged inactivity to encourage revision.

------------------------------------------------------------------------

## 3.6 Dashboard Integration

The student dashboard should display:

-   Learning Level Badge
-   Today's Mission
-   Current Mastery
-   Weak Concepts
-   Recommended Revision
-   Weekly Progress
-   Next Milestone

Teacher dashboard should expose:

-   Average Mastery
-   Weakest Concepts
-   Students Requiring Attention

------------------------------------------------------------------------

## 3.7 Backend Flow

Student Event → Validation → Learning Profile Service → Mastery
Calculation → Database Update → Adaptive Learning Engine → Dashboard
Refresh

------------------------------------------------------------------------

## 3.8 Prisma Evolution (Planned)

Existing models should be extended instead of replaced.

Likely additions:

-   masteryScore
-   confidenceScore
-   readinessScore
-   consistencyScore
-   lastReviewedAt
-   recommendedNextConcept

A dedicated ConceptMastery relation should map students to concepts.

------------------------------------------------------------------------

## 3.9 API Contracts

GET /api/profile PATCH /api/profile/mastery GET /api/profile/mastery GET
/api/profile/recommendations

Response objects must remain strongly typed and reusable.

------------------------------------------------------------------------

## 3.10 UI Components

New reusable components:

-   LearningProfileCard
-   MasteryProgressCard
-   ConceptBadge
-   WeakConceptList
-   RecommendationCard
-   MissionReasonCard

All components must reuse existing Card, Badge, Progress, Tabs and
Typography primitives.

------------------------------------------------------------------------

## 3.11 Acceptance Criteria

✓ Every student owns exactly one active Learning Profile. ✓ Profile
updates after every meaningful learning event. ✓ Dashboard reflects
updated mastery. ✓ AI Mentor receives Learning Profile context. ✓
Adaptive Learning Engine consumes Learning Profile before generating the
next mission.

------------------------------------------------------------------------

## 3.12 Implementation Notes

**Priority:** P0

This subsystem should be implemented immediately after the Diagnostic
Engine because every downstream module (Mission Planner, AI Mentor,
Concept Intelligence, Teacher Analytics, and Recommendations) depends on
it.

# Chapter 4 --- Concept Intelligence Engine

## 4.1 Purpose

The Concept Intelligence Engine is the subsystem that differentiates
CEVORA from a generic AI tutor.

Instead of remembering only conversations, CEVORA remembers **concept
mastery**.

The engine answers questions such as:

-   Which concepts has the student mastered?
-   Which prerequisite concepts are missing?
-   Which topic should be revised next?
-   Which mistakes occur repeatedly?
-   Which concept is blocking future progress?

------------------------------------------------------------------------

## 4.2 Core Philosophy

Questions are temporary.

Concept mastery is permanent.

Every interaction should strengthen or weaken one or more concept nodes.

The AI should never update only a chat history; it should update the
learner's conceptual model.

------------------------------------------------------------------------

## 4.3 Concept Graph

Every subject is represented as a Directed Acyclic Graph (DAG).

Example:

``` text
Programming
│
├── Variables
├── Data Types
├── Operators
└── Control Flow
      │
      ├── Loops
      ├── Functions
      └── Arrays
             │
             ├── Searching
             ├── Sorting
             └── Recursion
```

Each node contains:

-   Concept ID
-   Display Name
-   Subject
-   Difficulty
-   Parent Concepts
-   Child Concepts
-   Estimated Learning Time
-   Mastery Threshold

------------------------------------------------------------------------

## 4.4 Knowledge States

Every concept belongs to one of four states.

  State       Meaning
  ----------- --------------------------
  Locked      Prerequisites incomplete
  Available   Ready to learn
  Learning    Currently active
  Mastered    Threshold achieved

------------------------------------------------------------------------

## 4.5 Mastery Propagation

Completing a practice session updates:

Concept ↓ Mastery Score ↓ Parent Confidence ↓ Child Availability ↓
Adaptive Learning Engine

Mastering a prerequisite may unlock multiple future concepts.

------------------------------------------------------------------------

## 4.6 Weak Concept Detection

Signals include:

-   Repeated incorrect answers
-   Long response times
-   Low confidence selections
-   Frequent AI help requests
-   Failed mini quizzes

Weak concepts should appear on:

-   Student Dashboard
-   Teacher Dashboard
-   Mission Reason Card

------------------------------------------------------------------------

## 4.7 Frontend Pages

### New

-   /concept-map
-   /progress/mastery

### Dashboard Changes

Add:

-   Weak Concepts Card
-   Mastery Heatmap
-   Locked Concepts
-   Recommended Revision

------------------------------------------------------------------------

## 4.8 UI Components

New reusable components:

-   ConceptGraph
-   ConceptNode
-   ConceptEdge
-   MasteryHeatmap
-   WeakConceptCard
-   PrerequisiteBadge
-   RevisionSuggestionCard

Reuse existing Card, Badge, Progress, Tooltip, Dialog and Tabs.

------------------------------------------------------------------------

## 4.9 Backend Services

ConceptService

Responsibilities:

-   Load graph
-   Calculate mastery
-   Unlock concepts
-   Recommend revisions
-   Supply context to AI Mentor

------------------------------------------------------------------------

## 4.10 Prisma Evolution

Potential models:

-   Concept
-   ConceptRelationship
-   ConceptMastery
-   RevisionSchedule

Relationships should support multiple prerequisites instead of a linear
roadmap.

------------------------------------------------------------------------

## 4.11 APIs

GET /api/concepts GET /api/concepts/mastery GET
/api/concepts/recommendations POST /api/concepts/update

------------------------------------------------------------------------

## 4.12 Acceptance Criteria

✓ Every practice session updates concept mastery. ✓ Weak concepts are
visible. ✓ Locked concepts respect prerequisites. ✓ AI Mentor receives
concept context. ✓ Adaptive Learning Engine uses concept mastery while
generating missions.

------------------------------------------------------------------------

## 4.13 Judge Demonstration

Demo Flow

Student answers recursion questions incorrectly → Concept "Recursion"
mastery decreases → Dashboard highlights weakness → Tomorrow's mission
changes automatically → Teacher dashboard reflects class-wide weakness

This single workflow demonstrates adaptive intelligence instead of
static content delivery.

# Chapter 5 --- Microlearning Engine

## 5.1 Purpose

The Microlearning Engine transforms large learning goals into focused,
achievable daily sessions.

Rather than overwhelming students with long courses, CEVORA delivers one
concise learning mission that can realistically be completed in
approximately 10 minutes.

This directly aligns with the hackathon requirement for personalized
microlearning.

------------------------------------------------------------------------

## 5.2 Design Principles

-   One clear objective per lesson.
-   Complete within 10 minutes.
-   Personalized to the student's Learning Profile.
-   Ends with measurable understanding.
-   Feeds results back into the Adaptive Learning Engine.

------------------------------------------------------------------------

## 5.3 Standard Lesson Structure

``` text
Today's Mission
      ↓
Learning Objective
      ↓
3–5 Minute Explanation
      ↓
Worked Example
      ↓
Interactive Activity
      ↓
3 Practice Questions
      ↓
1 Minute Reflection
      ↓
Mission Complete
```

Every lesson should conclude with a mastery update.

------------------------------------------------------------------------

## 5.4 Personalization Inputs

Lesson generation considers:

-   Diagnostic level
-   Current mastery
-   Weak concepts
-   Available study time
-   Previous mission performance
-   Revision schedule

Two students studying the same subject may receive completely different
lessons.

------------------------------------------------------------------------

## 5.5 Frontend Experience

### New Page

`/mission/today`

Sections:

1.  Mission Header
2.  Why This Mission?
3.  Learning Objective
4.  AI Lesson
5.  Worked Example
6.  Practice
7.  Reflection
8.  Completion Summary

------------------------------------------------------------------------

## 5.6 UI Components

New reusable components:

-   MissionHeader
-   MissionTimer
-   LessonContentCard
-   WorkedExampleCard
-   PracticeQuestionCard
-   ReflectionCard
-   MissionCompletionDialog

Reuse existing Button, Card, Progress, Badge, Dialog and Typography
components.

------------------------------------------------------------------------

## 5.7 Backend Responsibilities

MissionService

-   Generate lesson
-   Select practice
-   Store completion
-   Trigger mastery update
-   Notify Adaptive Learning Engine

------------------------------------------------------------------------

## 5.8 Suggested Prisma Models

-   Mission
-   MissionLesson
-   MissionPractice
-   MissionCompletion

Extend rather than replace existing roadmap/progress entities.

------------------------------------------------------------------------

## 5.9 API Endpoints

GET /api/missions/today POST /api/missions/complete GET
/api/missions/history GET /api/missions/recommendation

------------------------------------------------------------------------

## 5.10 AI Workflow

Learning Profile ↓ Mission Context ↓ Prompt Builder ↓ LLM ↓ Lesson ↓
Practice ↓ Completion ↓ Mastery Update

The generated lesson must explain **why** it was selected for the
learner.

------------------------------------------------------------------------

## 5.11 Acceptance Criteria

✓ Student receives one personalized mission. ✓ Lesson duration remains
approximately 10 minutes. ✓ Three embedded practice questions are
included. ✓ Completion updates mastery. ✓ Next mission adapts
automatically.

------------------------------------------------------------------------

## 5.12 Judge Demo

Judge opens dashboard → Today's Mission explains *why* it was assigned →
Student finishes lesson → Completes practice → Mastery increases →
Tomorrow's recommendation changes

This demonstrates an adaptive learning cycle rather than static content
delivery.

# Chapter 6 --- AI Mentor 2.0 (Context-Aware Learning Assistant)

## 6.1 Purpose

The AI Mentor is **not** the core product.

Its responsibility is to execute learning decisions made by the Adaptive
Learning Engine.

Unlike generic chatbots, the AI Mentor always understands the student's
current learning context before generating a response.

------------------------------------------------------------------------

## 6.2 Product Positioning

❌ ChatGPT Wrapper

Question → LLM → Answer

✅ CEVORA AI Mentor

Question ↓ Student Learning Profile ↓ Today's Mission ↓ Current Concept
↓ Weak Concepts ↓ Difficulty Level ↓ Prompt Builder ↓ LLM ↓ Learning
Update

The mentor teaches inside the student's journey rather than outside it.

------------------------------------------------------------------------

## 6.3 Mentor Modes

### Concept Teacher

Explains a concept using the learner's current level.

### Guided Practice

Provides hints instead of immediately revealing answers.

### Homework Helper

Uses a Socratic approach to encourage thinking before solving.

### Revision Coach

Summarizes previously learned concepts and highlights forgotten areas.

### Motivation Coach

Uses progress history to encourage continued learning.

------------------------------------------------------------------------

## 6.4 Anti-Solver Rules

The mentor should never become an answer generator.

Default flow:

Question → Clarify understanding → Give Hint → Ask Student Attempt →
Explain Mistake → Reveal Solution (only if appropriate)

This differentiates CEVORA from generic AI chatbots.

------------------------------------------------------------------------

## 6.5 Prompt Context

Every AI request should include:

-   Student Goal
-   Learning Level
-   Current Mission
-   Active Concept
-   Weak Concepts
-   Mastery Score
-   Previous Mistakes
-   Preferred Explanation Style (future)

------------------------------------------------------------------------

## 6.6 Frontend

### Existing Page Enhancement

/mentor

New panels:

-   Mission Context
-   Current Concept
-   Related Resources
-   Learning Summary

Chat remains central but context cards appear alongside.

------------------------------------------------------------------------

## 6.7 Components

New reusable components:

-   MentorContextCard
-   ConceptSummaryCard
-   HintTimeline
-   LearningInsightCard
-   SuggestedQuestions

Reuse existing cards, sheets, dialogs and typography.

------------------------------------------------------------------------

## 6.8 Backend Services

MentorService

Responsibilities:

-   Build AI prompt
-   Inject learning context
-   Parse AI response
-   Update mastery events
-   Log conversation
-   Trigger recommendation updates

------------------------------------------------------------------------

## 6.9 APIs

POST /api/mentor/chat POST /api/mentor/image GET /api/mentor/history GET
/api/mentor/context

------------------------------------------------------------------------

## 6.10 AI Prompt Pipeline

Student Input ↓ Intent Detection ↓ Concept Detection ↓ Learning Profile
Retrieval ↓ Mission Retrieval ↓ Prompt Assembly ↓ LLM ↓ Structured
Response ↓ Mastery Update Event

------------------------------------------------------------------------

## 6.11 OCR Workflow (Future Ready)

Image Upload ↓ OCR ↓ Concept Extraction ↓ Learning Context ↓ Guided
Explanation

Images should strengthen the Learning Profile, not bypass it.

------------------------------------------------------------------------

## 6.12 Acceptance Criteria

✓ Mentor knows today's mission. ✓ Mentor knows learner level. ✓ Mentor
knows weak concepts. ✓ Mentor provides guided learning before direct
answers. ✓ Every meaningful interaction updates the Learning Profile.

------------------------------------------------------------------------

## 6.13 Hackathon Demonstration

Judge uploads a handwritten recursion problem.

The mentor:

1.  Identifies the concept.
2.  Detects recursion is already weak.
3.  Explains recursion at the student's level.
4.  Gives hints before revealing the solution.
5.  Updates mastery after completion.

This demonstrates contextual AI rather than conversational AI.

# Chapter 7 --- Implementation Blueprint (Execution Plan)

## 7.1 Objective

This chapter converts architecture into executable work. Every task maps
to the existing CEVORA architecture and follows the Developer Bible:
preserve reusable components, avoid unnecessary refactoring, and extend
existing modules.

------------------------------------------------------------------------

## 7.2 Guiding Rules

-   Reuse `components/ui` before creating new UI.
-   Keep business logic inside `features/*`.
-   Prefer Server Components where possible.
-   Extend Prisma models instead of replacing them.
-   Every new feature must plug into the Adaptive Learning Loop.

------------------------------------------------------------------------

## 7.3 Routes

### New Routes

    /onboarding/goal
    /onboarding/diagnostic
    /onboarding/result
    /mission/today
    /concept-map
    /progress/mastery

### Existing Routes to Enhance

    /dashboard
    /mentor
    /profile
    /teacher
    /practice

------------------------------------------------------------------------

## 7.4 Suggested Feature Structure

    features/
      diagnostic/
      learning-profile/
      adaptive-engine/
      mission/
      concepts/
      mentor/

Each feature should contain:

-   components/
-   actions/
-   hooks/
-   lib/
-   types/
-   validation/

------------------------------------------------------------------------

## 7.5 Team Parallelization

### Developer A

Frontend: - Diagnostic UI - Mission UI - Dashboard updates

### Developer B

Backend: - Prisma - APIs - Services

### Developer C

AI: - Prompt templates - Context builder - Recommendation engine

### Shared

Testing Integration Bug fixes

------------------------------------------------------------------------

## 7.6 Sprint Order

Sprint 1 - Diagnostic - Learning Profile

Sprint 2 - Adaptive Engine - Mission

Sprint 3 - Concept Intelligence

Sprint 4 - Mentor Context

Sprint 5 - Teacher Analytics

Sprint 6 - Polish - Demo - Performance

------------------------------------------------------------------------

## 7.7 Definition of MVP

The demo is successful if a judge can:

1.  Sign up.
2.  Complete a diagnostic.
3.  Receive a personalized mission.
4.  Learn through a microlesson.
5.  Complete practice.
6.  Observe concept mastery update.
7.  See recommendations change.
8.  View teacher analytics.

------------------------------------------------------------------------

## 7.8 Features by Priority

### P0 (Mandatory)

-   Authentication
-   Diagnostic
-   Learning Profile
-   Adaptive Engine
-   Today's Mission
-   AI Mentor Context
-   Concept Mastery
-   Teacher Dashboard

### P1

-   OCR
-   Revision Planner
-   Knowledge Graph Visualization

### P2

-   Offline mode
-   Gamification
-   Parent Portal

------------------------------------------------------------------------

## 7.9 Antigravity Prompt Pattern

Before every implementation:

1.  Read DEVELOPER_BIBLE.md
2.  Preserve architecture.
3.  Reuse existing components.
4.  Modify only necessary files.
5.  Explain Prisma changes before implementing.
6.  Keep UI consistent with current design system.

------------------------------------------------------------------------

## 7.10 Exit Criteria

Before submission:

-   Zero TypeScript errors
-   Zero lint errors
-   Working authentication
-   Working diagnostic
-   Adaptive dashboard
-   Context-aware mentor
-   Personalized mission
-   Teacher insights
-   Stable deployment
-   Demo rehearsed

This concludes the implementation planning phase. Remaining chapters
will focus on Prisma evolution, API contracts, page-by-page
specifications, demo strategy, and judge Q&A.

# Chapter 8 --- Repository Integration Blueprint (Codebase-Specific)

> **Objective:** Translate the Engineering Bible into concrete
> implementation tasks that fit the existing CEVORA architecture without
> unnecessary refactoring.

------------------------------------------------------------------------

## 8.1 Architectural Principles

The implementation **must not** introduce a parallel architecture.

Instead:

-   Extend existing modules.
-   Reuse shared UI primitives.
-   Keep business logic inside `features/*`.
-   Keep routing inside `app/*`.
-   Follow the Developer Bible.

------------------------------------------------------------------------

## 8.2 Recommended Folder Expansion

``` text
app/
├── onboarding/
│   ├── goal/
│   ├── diagnostic/
│   └── result/
│
├── mission/
│   └── today/
│
├── concept-map/
│
└── progress/
    └── mastery/

features/
├── diagnostic/
├── learning-profile/
├── adaptive-engine/
├── mission/
├── concepts/
├── mentor/
└── analytics/
```

Each feature should contain:

``` text
components/
hooks/
lib/
types/
validation/
actions.ts
service.ts
```

------------------------------------------------------------------------

## 8.3 Existing Pages to Enhance

### Dashboard

Add:

-   Learning Level
-   Today's Mission
-   Weak Concepts
-   Next Recommendation
-   "Why this Mission?" card
-   Daily Streak
-   Weekly Progress

### Practice

Add:

-   Mission Context
-   Concept Tags
-   Mastery Update Trigger

### Mentor

Add:

-   Active Mission
-   Weak Concepts
-   Related Lessons
-   Suggested Questions

### Teacher Dashboard

Add:

-   Class Mastery Heatmap
-   Weakest Concepts
-   Students Requiring Attention
-   Daily Activity Summary

------------------------------------------------------------------------

## 8.4 Shared Components to Reuse

Always reuse before creating new UI.

-   Card
-   Button
-   Badge
-   Tabs
-   Dialog
-   Progress
-   Avatar
-   Tooltip
-   Skeleton
-   Empty State

Only introduce new components when they represent new business
capabilities.

------------------------------------------------------------------------

## 8.5 New Feature Components

Diagnostic

-   DiagnosticQuestionCard
-   ConfidenceSelector
-   DiagnosticProgress

Mission

-   MissionHeader
-   LessonCard
-   ReflectionCard

Concepts

-   ConceptGraph
-   WeakConceptList
-   MasteryHeatmap

Mentor

-   MentorContextCard
-   HintCard
-   LearningInsightCard

Analytics

-   CohortHeatmap
-   StudentProgressTable
-   ConceptTrendChart

------------------------------------------------------------------------

## 8.6 Service Layer

DiagnosticService

-   Start Assessment
-   Evaluate Answers
-   Generate Classification

LearningProfileService

-   Update Mastery
-   Update Confidence
-   Compute Recommendations

AdaptiveEngineService

-   Generate Daily Mission
-   Select Lesson
-   Recommend Practice

ConceptService

-   Update Graph
-   Unlock Concepts
-   Recommend Revision

MentorService

-   Build Prompt
-   Inject Context
-   Parse Response

------------------------------------------------------------------------

## 8.7 Integration Order

1.  Authentication
2.  Diagnostic
3.  Learning Profile
4.  Adaptive Engine
5.  Mission
6.  Concept Intelligence
7.  Mentor Context
8.  Teacher Analytics

No later subsystem should be implemented before its dependencies exist.

------------------------------------------------------------------------

## 8.8 Definition of Integration Complete

-   New modules compile without warnings.
-   Existing pages continue functioning.
-   No duplicated business logic.
-   UI remains visually consistent.
-   All adaptive features consume the Learning Profile.

# Chapter 9 --- Feature Traceability Matrix & Hackathon Compliance

> **Purpose:** Ensure every requirement from the hackathon problem
> statement maps to a concrete implementation in CEVORA. No feature
> should exist without supporting the problem statement, and no
> requirement should remain unimplemented.

------------------------------------------------------------------------

## 9.1 Traceability Matrix

  ------------------------------------------------------------------------------
  Hackathon       CEVORA Module      Frontend   Backend   Database   AI   Demo
  Requirement                                                             
  --------------- ------------------ ---------- --------- ---------- ---- ------
  Student         Authentication +   ✓          ✓         ✓          \-   ✓
  onboarding      Onboarding                                              

  5-question      Diagnostic Engine  ✓          ✓         ✓          ✓    ✓
  diagnostic                                                              

  Personalized    Adaptive Learning  ✓          ✓         ✓          ✓    ✓
  learning path   Engine                                                  

  10-minute       Microlearning      ✓          ✓         ✓          ✓    ✓
  lessons         Engine                                                  

  AI doubt        AI Mentor          ✓          ✓         ✓          ✓    ✓
  solving                                                                 

  Concept gap     Concept            ✓          ✓         ✓          ✓    ✓
  detection       Intelligence                                            

  Mastery         Learning Profile   ✓          ✓         ✓          ✓    ✓
  tracking                                                                

  Teacher         Teacher Analytics  ✓          ✓         ✓          ✓    ✓
  insights                                                                

  Progress        Dashboard          ✓          ✓         ✓          \-   ✓
  monitoring                                                              
  ------------------------------------------------------------------------------

------------------------------------------------------------------------

## 9.2 Feature Dependency Graph

``` text
Authentication
      │
      ▼
Diagnostic Engine
      │
      ▼
Learning Profile
      │
      ▼
Adaptive Learning Engine
      │
 ┌────┴────────────┐
 ▼                 ▼
Mission        AI Mentor
 │                 │
 └──────┬──────────┘
        ▼
Concept Intelligence
        ▼
Teacher Analytics
```

No module should bypass this dependency chain.

------------------------------------------------------------------------

## 9.3 MVP Scope Lock

### Included

-   Authentication
-   Student onboarding
-   Diagnostic assessment
-   Adaptive dashboard
-   Personalized mission
-   AI Mentor
-   Concept mastery
-   Teacher dashboard

### Deferred

-   Parent portal
-   Gamification
-   Institution management
-   Marketplace
-   Offline sync (basic PWA support acceptable)
-   Social learning

------------------------------------------------------------------------

## 9.4 Demo Success Checklist

A judge should be able to observe the following within 8--10 minutes:

1.  Student signs up.
2.  Completes diagnostic.
3.  Receives AI-generated learning profile.
4.  Dashboard adapts automatically.
5.  Completes today's mission.
6.  Makes an intentional mistake.
7.  Concept mastery changes.
8.  AI Mentor explains using learning context.
9.  Teacher dashboard reflects updated analytics.

------------------------------------------------------------------------

## 9.5 Technical Exit Checklist

### Frontend

-   Responsive layouts
-   Loading states
-   Empty states
-   Error boundaries
-   Accessible navigation

### Backend

-   Input validation
-   Authentication checks
-   Typed responses
-   Error handling

### AI

-   Context-aware prompts
-   Structured outputs
-   Fallback handling

### Quality

-   TypeScript passes
-   Lint passes
-   Build passes
-   Production deployment verified

------------------------------------------------------------------------

## 9.6 Next Phase

The remaining chapters will become implementation-grade specifications
including:

-   Complete Prisma evolution (field-by-field)
-   API contracts
-   Page-by-page UI specification
-   Component catalogue
-   Service architecture
-   Prompt engineering
-   Demo presentation
-   Judge Q&A
-   Deployment checklist

# Chapter 10 --- Prisma Evolution & Data Architecture (Implementation Grade)

> **Objective:** Evolve the existing Prisma schema without breaking the
> current application. Extend the data model to support adaptive
> learning while preserving authentication, dashboards, and existing
> workflows.

------------------------------------------------------------------------

## 10.1 Design Principles

-   Extend existing models instead of replacing them.
-   Avoid duplicate sources of truth.
-   One responsibility per model.
-   Record learning history instead of overwriting it.
-   Keep models reusable for future AI features.

------------------------------------------------------------------------

## 10.2 Entity Relationship Overview

``` text
User
 │
 ├── LearningProfile (1:1)
 │       │
 │       ├── ConceptMastery (1:N)
 │       ├── DiagnosticAttempt (1:N)
 │       ├── Mission (1:N)
 │       └── MentorSession (1:N)
 │
 └── TeacherAnalytics (derived)
```

------------------------------------------------------------------------

## 10.3 Existing Model Evolution

### User

Add fields (if absent):

-   onboardingCompleted
-   activeSubject
-   learningGoal
-   preferredLanguage
-   dailyStudyMinutes

These should be optional initially to preserve backward compatibility.

------------------------------------------------------------------------

### LearningProfile

Purpose: Persistent learner memory.

Suggested fields:

-   readinessScore
-   masteryScore
-   confidenceScore
-   consistencyScore
-   currentLevel
-   currentMissionId
-   recommendedConceptId
-   lastActivityAt

------------------------------------------------------------------------

### DiagnosticAttempt

Stores:

-   startedAt
-   completedAt
-   levelAssigned
-   score
-   confidenceAverage

Never overwrite historical attempts.

------------------------------------------------------------------------

### Concept

Represents curriculum nodes.

Suggested fields:

-   name
-   slug
-   subject
-   difficulty
-   estimatedMinutes
-   description

------------------------------------------------------------------------

### ConceptRelationship

Represents prerequisite graph.

Fields:

-   parentConceptId
-   childConceptId
-   relationshipType

Supports multiple prerequisites.

------------------------------------------------------------------------

### ConceptMastery

Links:

Student ↔ Concept

Fields:

-   masteryScore
-   attempts
-   lastReviewedAt
-   confidenceScore

------------------------------------------------------------------------

### Mission

Represents one adaptive learning session.

Fields:

-   title
-   objective
-   status
-   generatedReason
-   estimatedMinutes
-   completedAt

------------------------------------------------------------------------

## 10.4 Index Recommendations

Create indexes on:

-   userId
-   conceptId
-   missionId
-   currentLevel
-   lastActivityAt

Avoid indexing rarely queried columns.

------------------------------------------------------------------------

## 10.5 Migration Strategy

Phase 1 - Add nullable columns.

Phase 2 - Populate defaults.

Phase 3 - Enable new services.

Phase 4 - Remove deprecated fields (if any).

Never perform destructive migrations before the demo.

------------------------------------------------------------------------

## 10.6 Acceptance Criteria

✓ Existing authentication continues to work. ✓ Existing dashboards
continue to render. ✓ New adaptive features use the extended schema. ✓
Historical data remains valid. ✓ No breaking Prisma migrations.

# Chapter 11 --- Page-by-Page UI Specification (Part I)

> This chapter defines the user experience for every major screen. All
> new UI **must** reuse the existing design system, shared components,
> spacing, typography, color tokens, and interaction patterns.

------------------------------------------------------------------------

# 11.1 Landing Page

## Purpose

The landing page should convince users within 30 seconds that CEVORA is
an Adaptive Learning Intelligence Platform---not another chatbot.

## Primary CTA

-   Get Started
-   Sign In

## Sections

1.  Hero
2.  Problem Statement
3.  How CEVORA Works
4.  Feature Highlights
5.  Teacher Benefits
6.  Student Benefits
7.  Testimonials (placeholder)
8.  Footer

------------------------------------------------------------------------

# 11.2 Onboarding

Flow

``` text
Signup
↓
Role
↓
Goal Selection
↓
Study Time
↓
Subject
↓
Diagnostic
↓
Dashboard
```

Never allow the student to skip directly to the dashboard without
warning.

------------------------------------------------------------------------

# 11.3 Dashboard

## Purpose

The dashboard answers one question:

> "What should I do next?"

### Layout Priority

1.  Welcome Header
2.  Today's Mission
3.  Why This Mission?
4.  Learning Progress
5.  Weak Concepts
6.  Recommended Revision
7.  Weekly Activity
8.  Continue Learning

### Cards

-   MissionCard
-   LearningLevelCard
-   WeakConceptCard
-   RecommendationCard
-   ProgressCard

------------------------------------------------------------------------

# 11.4 Mission Page

Route

`/mission/today`

Sections

-   Mission Header
-   Estimated Time
-   Objective
-   Lesson
-   Example
-   Practice
-   Reflection
-   Completion

Completion should trigger mastery updates automatically.

------------------------------------------------------------------------

# 11.5 Mentor Page

Layout

Left: - Conversation

Right: - Mission Context - Current Concept - Weak Concepts - Suggested
Questions

The mentor should always explain why an answer matters to the student's
roadmap.

------------------------------------------------------------------------

# 11.6 Practice Page

Each practice session should display:

-   Difficulty
-   Active Concept
-   Mission Link
-   Progress
-   Confidence Selector

Every submission updates the Learning Profile.

------------------------------------------------------------------------

# 11.7 Accessibility

Every page must support:

-   Keyboard navigation
-   Visible focus
-   Screen reader labels
-   High contrast
-   Mobile responsiveness

------------------------------------------------------------------------

# 11.8 Acceptance Criteria

✓ Dashboard always recommends one clear next action. ✓ Student never
wonders what to study next. ✓ All pages reuse existing design
components. ✓ UI remains visually consistent with the existing CEVORA
theme.
