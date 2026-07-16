# COMPONENT_LIBRARY.md

> Project: Cevora – AI-Powered Placement Intelligence Platform
> Version: 1.0

This is the consolidated Component Library generated from our conversation.

## Sections

1. Purpose & Philosophy
2. Design Principles
3. Folder Structure
4. Component Categories
5. Component Lifecycle
6. Component Status Matrix
7. Component Ownership
8. Dependency Rules
9. UI Primitives
10. Layout & Navigation Components
11. Shared & Landing Components
12. Feature Components
13. Form, Data Display, Feedback & Loading
14. Engineering Standards
15. AI Development Rules
16. Maintenance Workflow
17. Future Roadmap

---

### Purpose

Build once. Reuse everywhere.

Every reusable component must be:
- Modular
- Typed
- Accessible
- Theme-aware
- Responsive
- Documented

### Folder Structure

components/
- ui/
- shared/
- landing/
- dashboard/
- companies/
- resume/
- roadmaps/
- interview/
- oa-practice/
- analytics/
- settings/

### UI Primitives

Button, Card, Badge, Avatar, Input, Textarea, Select, Checkbox,
RadioGroup, Switch, Slider, Progress, Separator, Tabs, Accordion,
Tooltip, Popover, Dialog, Sheet, Dropdown, Pagination, Table,
ScrollArea, Skeleton, Spinner, EmptyState, Alert, Toast, Sonner,
Banner, Chip, Divider, FileUploader, Typography.

Rules:
- No business logic
- Reusable
- Accessible
- Typed

### Layout & Navigation

AppShell
Sidebar
OverlaySidebar
Header
LandingHeader
PageContainer
PageHeader
Section
SectionHeader
Breadcrumbs
WorkspaceSwitcher
NotificationDropdown
UserMenu
ThemeToggle
SearchBar

### Shared Components

Logo
FeatureCard
WorkflowTimeline
HeroShowcase
StudentDashboardPreview
FacultyWorkspacePreview
CTASection
Footer
MetricCard
InfoCard
ProgressOverview
StatusBadge
FilterBar
Combobox
DataTable
SearchInput
FileUploader
ActivityFeed

### Feature Components

Dashboard:
- WelcomeBanner
- DashboardStatCard
- MetricCard
- SectionCard
- QuickActionCard
- DailyGoalCard
- ResumeHealthCard
- RecommendationCard
- ProgressRing
- StatusBadge

Companies:
- CompanyCard
- CompanyHero
- EligibilityCard
- HiringTimeline

Resume:
- ResumeUploader
- ResumePreview
- ATSScoreCard
- ResumeInsightCard
- CompanyOptimizationCard

Roadmaps:
- RoadmapHero
- RoadmapTimeline
- ModuleCard
- LessonCard
- MilestoneCard

Interview:
- InterviewModeCard
- InterviewSessionCard
- FeedbackCard
- TranscriptCard

OA Practice:
- ProblemCard
- TestCard
- SubmissionCard

Analytics:
- MetricCard
- ProgressChart
- ActivityHeatmap

Settings:
- ProfileCard
- PreferenceCard
- SecurityCard

### Engineering Standards

- One component per file.
- PascalCase filenames.
- Tailwind CSS.
- Lucide React icons.
- Server Components by default.
- Client Components only when necessary.
- Reuse existing components before creating new ones.

### AI Development Rules

Always:
- Read Developer Bible
- Read Design System
- Read Architecture
- Read Component Library

Never:
- Duplicate components
- Hardcode colors
- Hardcode spacing
- Rebuild AppShell

### Maintenance

Whenever a reusable component changes:
1. Update component
2. Update documentation
3. Update status matrix
4. Verify responsiveness
5. Verify accessibility

Build once. Reuse everywhere. Document always.
