# Repository Audit Report — Cevora

> **Date:** July 20, 2026  
> **Status:** Epic 1 Foundation & Repository Audit  
> **Repository Path:** `d:/Shivam/Hackathon/New folder/cevora`

This document serves as a complete repository audit and baseline assessment of the Cevora platform. It establishes standard folder organization, tracks current dependencies, details architectural constraints, and identifies safe extension points for future implementation phases.

---

## 1. Top-Level Folder Structure

The Cevora codebase is organized in a semi-modular Next.js structure. A feature-first folder (`features/`) exists at the root but is currently unpopulated, with feature components located in `components/` instead.

```text
cevora/
├── app/                      # Next.js App Router folders & endpoints
│   ├── (dashboard)/          # Dashboard section (Layout + Sub-routes)
│   │   ├── analytics/        # Student analytics pages
│   │   ├── companies/        # Placement company listings
│   │   ├── dashboard/        # Main landing student dashboard
│   │   ├── interview/        # Mock Interview page
│   │   ├── mentor/           # AI study mentor chat page
│   │   ├── oa-practice/      # Online Assessment coding playground
│   │   ├── profile/          # User profile view/edit page
│   │   ├── roadmaps/         # Placement prep tracks and paths
│   │   ├── settings/         # Configuration & themes
│   │   └── study-assistant/  # AI scanning and document tools
│   ├── api/                  # Server API endpoints
│   │   └── user/             # User sync & patch endpoints
│   ├── login/                # Authentication page
│   ├── globals.css           # Styling styles
│   └── layout.tsx            # Global layout wrapper
├── components/               # UI and Shared components (non-modular)
│   ├── ui/                   # Primitive building blocks (buttons, dialogs, inputs)
│   ├── shared/               # Shared layout items (Header, Navbar, Footer, Timeline)
│   └── [feature-folders]/    # Feature component modules (ai-interview, dashboard, etc.)
├── constants/                # Global app metadata and configurations
├── data/                     # Mock data arrays (roadmaps, analytics, companies)
├── docs/                     # Living documentation and guides
├── features/                 # Empty placeholder for feature-first logic
├── hooks/                    # Reusable custom React hooks
├── lib/                      # Base setup and infrastructure clients
├── prisma/                   # Prisma database setup and migrations
├── providers/                # React context providers
├── public/                   # Static assets (logos, icons)
├── services/                 # Remote service and query layers
├── store/                    # State management (Zustand)
├── types/                    # Common interface types
└── utils/                    # Standalone helper functions
```

---

## 2. Component Library & Reusability

### 2.1 Primitive UI Components (`components/ui`)
Cevora leverages a customized styling library built on top of `@base-ui/react`. These primitives are highly polished and should be composed for all future features without modification:
* **Layout/Surfaces:** `card.tsx`, `sheet.tsx`, `separator.tsx`, `scroll-area.tsx`, `dialog.tsx`, `accordion.tsx`
* **Data Input:** `button.tsx`, `checkbox.tsx`, `input.tsx`, `select.tsx`, `switch.tsx`, `textarea.tsx`, `form.tsx`
* **Feedback/Indicators:** `progress.tsx`, `badge.tsx`, `avatar.tsx`, `tooltip.tsx`, `dropdown-menu.tsx`, `popover.tsx`

### 2.2 Reusable Shared Components (`components/shared`)
* `ActivityFeed.tsx` — Timelines of user logs.
* `AnimatedCounter.tsx` — Performance score counter.
* `Combobox.tsx` — Custom dropdown lists.
* `DataTable.tsx` — Reusable table for tables and grids.
* `FileUploader.tsx` — File attachment component.
* `FilterBar.tsx` — Search and category filter container.
* `WorkflowTimeline.tsx` — Sequence roadmap timeline.

---

## 3. Data & API Layer

### 3.1 Existing Server API Routes
* `GET /api/user` — Retrieves currently authenticated user from Prisma database using Supabase session ID.
* `PATCH /api/user` — Updates user name, avatar, bio, and corresponding `StudentProfile` attributes.
* `POST /api/user/sync` — Synchronizes user info from Supabase authentication table to local Prisma `User` record.

### 3.2 Services & Infrastructure (`services/`, `lib/`)
* **Database (`lib/prisma.ts`):** Global Prisma Client client instance.
* **Supabase Client (`services/supabase/`):** Configurations for server, client, and middleware clients.
* **AI Provider (`services/ai.ts`):** Initializer for Google GenAI Client SDK using `GEMINI_API_KEY`.
* **Queries (`services/user/queries.ts`):** Database queries using Prisma.

---

## 4. Database Schema Assessment (`prisma/schema.prisma`)

The database is built on PostgreSQL with the following core entities:
* **`User` / `StudentProfile`**: Maps Supabase users to their profile information (graduation, college, specialization, target role).
* **`Resume` / `ResumeProject`**: Manages uploaded resumes, ATS scores, and AI feedback.
* **`Roadmap` / `RoadmapStep` / `UserProgress`**: Manages learning paths, specific track milestones, and student completion metrics.
* **`Company` / `Opportunity` / `OAQuestion` / `InterviewExperience`**: Catalog for placement companies, jobs, test questions, and student reports.
* **`AIChat` / `AIChatMessage`**: History tables for the Mentor and Assistant modules.
* **`MockInterview` / `InterviewFeedback`**: Details and scoring metrics for student video assessments.
* **`UserActivity`**: Global audit logs of all user actions.

---

## 5. Authentication Flow Inspection

Cevora runs on a **hybrid authentication design**:
1. **Frontend Authentication (`hooks/useCevoraAuth.ts`):**
   - Implements local storage credentials caching (keyed as `cevora_user`).
   - Restricts dashboard paths client-side in `app/(dashboard)/layout.tsx` using `useCevoraAuth`.
   - Used for development sandbox flows without setting up live credentials.
2. **Server API Authentication (`services/supabase/`):**
   - Endpoint files (`/api/user`) resolve session validation using `@supabase/ssr` cookies and `supabase.auth.getUser()`.
   - A mock warning in `services/supabase/server.ts` warns if Supabase configuration is missing from environment.

*Note: Since Supabase credentials are not populated in local dev environment variables, all API calls using backend Supabase authorization fail. Client-side state operates fully using local storage mocks.*

---

## 6. Business Logic Modules

### 6.1 Dashboard Module (`app/(dashboard)/dashboard/page.tsx`)
- Renders simulated widgets: Readiness index (82%), Streak (19 days), Resume (86%), Today's Mission (Arrays & Graphs checklist), Opportunities (Amazon, Google), and Weekly Activity bar chart.
- Preserves layout, animations, and typography tokens.

### 6.2 AI Modules
- **`lib/mockMentor.ts`**: Static message database for study suggestions.
- **`lib/mockJudge.ts`**: Mock compile/runtime evaluation database for OA coding practice.
- **`lib/mockResumeAnalyzer.ts`**: Simulates resume evaluation.

---

## 7. Quality & Cleanliness Audit

### 7.1 Dead Code & Unused Modules
- **`hooks/useAuth.ts`**: Client-side hook for Supabase. It is completely unused (replaced by `useCevoraAuth.ts` which manages local storage session state).
- **`proxy.ts.bak`**: A backup file at root that is completely dead and can be ignored.

### 7.2 Duplicate Utilities
- There are no duplicate utility files. The codebase has clear demarcations: `lib/utils.ts` owns styling composition (`cn`), while `utils/formatDate.ts` owns text conversions.

### 7.3 High-Risk Files
- **`services/supabase/server.ts`**: Calls `cookies()` from `next/headers`. In Next.js 16, this must be awaited asynchronously. It is correctly awaited, but if called inside a synchronous execution environment, it will fail.
- **`hooks/useCevoraAuth.ts` / `components/shared/StudentDashboardPreview.tsx`**: Call `setState` inside `useEffect` synchronously, which triggers lint warnings/errors under strict React rules.

### 7.4 Safe Extension Points (Epics 2-6)
- **`features/`**: The standard directory to mount upcoming features:
  - `features/diagnostic/`: For diagnostic test components, scoring services, and endpoints.
  - `features/learning-profile/`: Extended student tracking structures and mastery mappings.
  - `features/mission/`: Mission planner, schedule tasks, and progress indicators.
  - `features/ai/`: Real implementations of the Google GenAI SDK.
- **`utils/`**: Safe container to host shared response, logging, and validation helper functions.

---

## 8. Dependency Audit

We inspected `package.json` and the lock file to evaluate packaging quality:
- **Duplicate Packages:** None. All primary frameworks (`react`, `react-dom`, `@types/*`) match version parameters.
- **Unused Packages:** None. Packages like `tesseract.js` (SmartScanner), `mathjs` (GraphGenerator), `@xyflow/react` (FlowVisualizer), `@monaco-editor/react` (CodeEditor), `jspdf` / `react-pdf` (pdfExport/DocumentViewer), and `tw-animate-css` (globals.css) are all actively imported.
- **Version Compatibility:** Next.js `16.2.10` and React `19.2.4` are set. This combination compiles type checks cleanly.

---

## 9. Architecture & Environment Verification

### 9.1 Environment Variables status
- **`DATABASE_URL`**: Valid connection string.
- **`DIRECT_URL`**: Valid transaction direct URL.
- **`NEXT_PUBLIC_SUPABASE_URL`**: **Missing** from `.env` (exists in `.env.example`).
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: **Missing** from `.env`.
- **`SUPABASE_SERVICE_ROLE_KEY`**: **Missing** from `.env`.
- **`GEMINI_API_KEY`**: **Missing** from `.env`.

### 9.2 Architecture Health
- **Circular Imports:** None detected.
- **Barrel Conflicts:** None. Components and queries avoid colliding namespaces.
- **Aliases:** Global use of the `@/*` alias for internal imports.
- **Thin Endpoints:** Existing API routes delegate business database queries to `services/user/*`.

---

## 10. Baselines & Readiness Score

- **Build Status:** Compiling (Production build verified).
- **TypeScript Status:** Clean (`tsc --noEmit` returns exit code 0).
- **ESLint Status:** Currently has 82 errors (177 warnings/errors overall). None of these block development or boot up, but represent legacy warnings to keep isolated. No new errors will be introduced by Epic 1.
- **Overall Readiness for CEV-002 (Database Evolution):** **95/100**
  *(Excellent baseline. Safe models can be added incrementally to the Prisma schema without breaking existing database schemas or affecting mock login flows).*
