# DEVELOPMENT_PLAN.md

## Assumptions

-   Repository initialized
-   Project structure created
-   `DEVELOPER_BIBLE.md` and `DESIGN_SYSTEM.md` are the source of truth
-   Community, Gamification, Placement Cell and AI integrations are
    deferred

# Development Priority

1.  Foundation

-   Shared layouts
-   Header
-   Sidebar
-   Theme
-   Reusable UI components

2.  Authentication & Roles

-   Login
-   Signup
-   Forgot Password
-   Email Verification
-   Protected routes

3.  Workspace

-   Create workspace
-   Join by access code
-   Workspace members

4.  Student Features

-   Dashboard
-   Companies Explorer
-   Company Details
-   Resume Analyzer (UI)
-   Roadmaps
-   OA Practice
-   AI Interview Practice (UI)
-   Resources
-   Profile
-   Notifications
-   Settings

5.  Faculty Features

-   Dashboard
-   Students
-   Student Profile
-   Resume Reviews
-   Analytics (non-AI)
-   Roadmaps
-   Announcements
-   Settings

6.  Admin

-   Dashboard
-   Users
-   Roles
-   Workspaces
-   Analytics
-   Settings

7.  Backend Integration (Non-AI)

-   Authentication
-   Database
-   Workspace APIs
-   Companies APIs
-   Resume Upload
-   Resources
-   Notifications
-   Search
-   Progress Tracking

8.  AI Integration (Last)

-   AI Mentor
-   Resume Analysis
-   AI Roadmaps
-   AI Interview
-   AI Analytics

# Team Distribution

## Member 1 -- Core Platform

Owns: - Layouts - Authentication - Shared Components - Navigation -
Theme - Workspace Pages: - Landing - Login - Signup - Forgot Password -
Verify Email - Dashboard - Notifications - Settings

## Member 2 -- Placement

Owns: - Companies Explorer - Company Details - Resources - Search -
Company UI

## Member 3 -- AI Preparation (UI)

Owns: - AI Mentor - Resume Analyzer - Roadmaps - OA Practice - AI
Interview Practice (Note: AI APIs later)

## Member 4 -- Faculty & Admin

Faculty: - Dashboard - Students - Student Profile - Resume Reviews -
Analytics - Roadmaps - Announcements Admin: - Dashboard - Users -
Roles - Workspaces - Analytics - Settings

# Branches

-   main
-   develop
-   feature/core
-   feature/placement
-   feature/ai-preparation
-   feature/faculty-admin

# Standby

-   Community
-   Gamification
-   Placement Cell
-   AI Integration

# MVP Complete

-   Responsive UI
-   Role-based dashboards
-   Workspace system
-   Backend integrated (non-AI)
-   Ready for AI integration
