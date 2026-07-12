# DESIGN_SYSTEM.md

> **Project:** Cevora  
> **Status:** Living Document  
> **Version:** 0.1.0

---

# Purpose

This document defines Cevora's visual language and user experience principles.

Every interface, component, animation, illustration, and interaction must follow this guide to ensure a consistent, professional, and scalable product.

If a design decision conflicts with this handbook, the handbook takes precedence unless it is intentionally updated.

---

# Design Philosophy

Cevora is not a social media app or a flashy AI demo.

It is a professional AI-powered career intelligence platform that students trust throughout their academic and placement journey.

Every design decision should communicate:

- Trust
- Clarity
- Professionalism
- Simplicity
- Intelligence
- Confidence

---

# Brand Personality

Cevora should feel:

- Professional, not corporate
- Modern, not trendy
- Intelligent, not complicated
- Friendly, not childish
- Premium, not luxurious
- Calm, not boring

---

# Core Design Principles

## Clarity First

Users should understand the interface without thinking.

Avoid unnecessary decoration.

## Consistency

Spacing, colors, typography, icons, and interactions should behave predictably across the product.

## Accessibility

Design for everyone.

Accessibility is a requirement—not an enhancement.

## Minimalism with Purpose

Every visual element must have a reason to exist.

Remove visual noise.

## Progressive Disclosure

Show users only what they need at the current moment.

Advanced functionality should appear only when relevant.

---

# Visual Style

Overall direction:

- Clean
- Spacious
- Minimal
- Modern
- Trustworthy
- Data-focused

Avoid:

- Neon themes
- Excessive gradients
- Heavy glassmorphism
- Visual clutter
- Unnecessary animations

---

# Color Philosophy

The palette should communicate trust and focus.

### Primary
A deep, confident blue for primary actions and navigation.

### Secondary
Neutral slate tones for supporting UI.

### Accent
A restrained teal or emerald for progress and positive actions.

### Semantic Colors

- Success
- Warning
- Error
- Information

---

# Typography

Characteristics:

- Clean
- Highly readable
- Professional

Hierarchy:

- Display
- H1
- H2
- H3
- Body Large
- Body
- Caption
- Label

Avoid decorative fonts.

---

# Spacing

Use a consistent spacing scale.

Prefer generous whitespace over crowded layouts.

---

# Border Radius

Rounded, but subtle.

---

# Shadows

Use shadows only to establish hierarchy.

Avoid dramatic floating effects.

---

# Icons

Use one icon library consistently.

Icons should:

- Be simple
- Match stroke width
- Follow consistent sizing
- Never replace meaningful text

---

# Motion

Animation should communicate state changes.

It should be:

- Fast
- Smooth
- Purposeful

Never animate for decoration alone.

---

# Component Principles

Every reusable component must be:

- Accessible
- Responsive
- Reusable
- Theme-aware
- Fully typed
- Consistent with this design system

---

# Responsive Design

Design mobile-first.

Support:

- Mobile
- Tablet
- Laptop
- Desktop

---

# Dark Mode

Dark mode is a first-class experience.

Both themes should receive equal attention.

---

# AI Design Rules

AI-generated interfaces must:

- Follow this document.
- Reuse existing components.
- Never invent unnecessary styles.
- Preserve consistency.
- Explain any proposed deviation.

---

# Definition of Good Design

A successful interface is one where:

- Users immediately understand what to do.
- The interface feels calm and trustworthy.
- Important information stands out naturally.
- Visual consistency is maintained.
- Users accomplish tasks with minimal friction.

---

# Living Document

This document evolves alongside Cevora.

Every design decision should strengthen these principles rather than contradict them.


---

# Design Tokens (Draft)

## Color Palette

> Final HEX values will be confirmed before implementation.

### Primary
- Primary 50–900: Deep professional blue scale
- Usage: Primary buttons, links, active navigation, focus states

### Neutral
- Neutral 50–950: Slate-based grayscale
- Usage: Backgrounds, text, borders, surfaces

### Accent
- Emerald/Teal scale
- Usage: Progress, success indicators, achievements

### Semantic
- Success
- Warning
- Error
- Info

Never use semantic colors for decorative purposes.

---

# Typography System

## Recommended Fonts

### Primary
**Geist** (preferred)

Fallback:
- Inter
- system-ui

### Monospace
Geist Mono (or JetBrains Mono)

## Type Scale

- Display
- H1
- H2
- H3
- H4
- Body Large
- Body
- Small
- Caption
- Label

Rules:

- Maximum three font weights on a page.
- Maintain consistent line height.
- Never rely on color alone to indicate importance.

---

# Spacing System

Use an 8-point spacing system.

Base units:

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64
- 80

Avoid arbitrary spacing values.

---

# Border Radius

Standard tokens:

- xs
- sm
- md
- lg
- xl

Default components should use the medium radius.

---

# Elevation

Only four elevation levels should exist:

1. Flat
2. Raised
3. Floating
4. Modal

Avoid stacking shadows excessively.

---

# Component Library

Every reusable component must support:

- Light mode
- Dark mode
- Keyboard navigation
- Disabled state
- Loading state (where applicable)
- Error state (where applicable)

Core components:

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Badge
- Card
- Avatar
- Dialog
- Drawer
- Tabs
- Table
- Tooltip
- Toast
- Skeleton

---

# Icons

Library:
- Lucide React

Rules:

- Use outline icons by default.
- Keep icon sizing consistent.
- Pair icons with labels when clarity is important.

---

# Responsive Breakpoints

Design mobile-first.

Target:

- Mobile
- Tablet
- Laptop
- Desktop
- Wide Desktop

Content should scale gracefully rather than simply stretching.

---

_End of Design System v0.2 (Part 2)_


---

# Theme Specification (Draft)

## Light Theme

Design goals:

- Bright without glare
- Strong readability
- Calm surfaces
- Clear hierarchy

Suggested token roles:

- Background
- Surface
- Elevated Surface
- Primary
- Secondary
- Muted
- Border
- Success
- Warning
- Error
- Info

## Dark Theme

Design goals:

- Comfortable for long study sessions
- High contrast without pure black
- Reduced eye strain
- Consistent component hierarchy

Rules:

- Avoid pure black backgrounds.
- Preserve contrast ratios.
- Use subtle elevation differences.

---

# Button Standards

Variants:

- Primary
- Secondary
- Outline
- Ghost
- Destructive
- Link

States:

- Default
- Hover
- Active
- Focus
- Disabled
- Loading

Rules:

- One primary action per section whenever possible.
- Buttons should communicate importance through hierarchy rather than size alone.

---

# Card Standards

Cards are the primary surface used throughout Cevora.

Every card should provide:

- Clear title
- Optional description
- Predictable padding
- Consistent spacing
- Optional footer/actions

Avoid decorative borders and excessive visual effects.

---

# Form Standards

Forms should minimize cognitive load.

Guidelines:

- One label per field.
- Inline validation when appropriate.
- Helpful error messages.
- Logical grouping of related fields.
- Required fields clearly indicated.

---

# Navigation

## Sidebar

Reserved for major product areas.

Keep navigation stable across the application.

## Top Navigation

Contains:

- Search
- Notifications
- User profile
- Theme toggle (optional)

Navigation should never compete with page content.

---

# Data Visualization

Charts should emphasize clarity over decoration.

Preferred chart types:

- Line
- Bar
- Area
- Donut (limited use)

Always:

- Label axes.
- Include legends when necessary.
- Use semantic colors consistently.

---

# Empty States

Every empty state should answer:

1. What happened?
2. Why is it empty?
3. What should the user do next?

---

# Loading States

Prefer skeletons over spinners for page content.

Loading indicators should preserve layout stability.

---

# Error States

Error messages must:

- Explain the problem.
- Avoid technical jargon.
- Offer a recovery action when possible.

Never expose stack traces to users.

---

# Motion & Micro-interactions

Animation duration should feel quick and responsive.

Use animation to communicate:

- Success
- Progress
- Navigation
- State changes

Avoid decorative motion that distracts from the task.

---

# Design Review Checklist

Before approving any UI:

- [ ] Follows the color system.
- [ ] Uses existing components.
- [ ] Responsive on all supported devices.
- [ ] Keyboard accessible.
- [ ] Consistent spacing.
- [ ] Clear visual hierarchy.
- [ ] Meets accessibility expectations.
- [ ] Matches Cevora's design philosophy.

---

_End of DESIGN_SYSTEM.md v0.3_


---

# UI Patterns & Page Templates

## Dashboard Layout

The dashboard should prioritize clarity and quick scanning.

Recommended layout:

- Persistent sidebar
- Top navigation
- Page header
- Primary content
- Optional right-side insights panel

Guidelines:

- Avoid nesting more than three visual sections.
- Important actions should remain visible without excessive scrolling.
- Keep page titles and actions consistent across the product.

---

## Page Header Standard

Every major page should include:

- Title
- Optional description
- Breadcrumb (when appropriate)
- Primary action
- Secondary actions (if needed)

Example:

-----------------------------------------------------
Dashboard                     [+ New Experience]
Track your placement journey.
-----------------------------------------------------

---

## Search Experience

Search should be available wherever users browse large datasets.

Rules:

- Instant feedback where practical.
- Preserve search terms when navigating back.
- Clearly indicate when filters are active.

---

## Filtering & Sorting

Filters should:

- Be easy to reset.
- Show active selections.
- Never hide important information unexpectedly.

Sort options should remain consistent across similar pages.

---

## Notification Design

Notifications should be informative without becoming distracting.

Priority levels:

- Information
- Success
- Warning
- Error

Prefer inline notifications over modal dialogs whenever possible.

---

## Tables

Tables should support:

- Sorting
- Searching
- Pagination when required
- Empty state
- Loading state

Avoid horizontal scrolling on common laptop resolutions whenever practical.

---

## Mobile Experience

The mobile experience is not a reduced version of desktop.

Instead:

- Prioritize the most common actions.
- Collapse secondary actions into menus.
- Preserve readability.
- Avoid overly dense interfaces.

---

## Content Guidelines

Writing should be:

- Clear
- Direct
- Friendly
- Professional

Avoid:

- Technical jargon
- Ambiguous labels
- Unnecessary marketing language

Buttons should begin with verbs where possible.

Examples:

Good:
- Save Changes
- View Profile
- Start Roadmap

Avoid:
- Click Here
- Continue Now!!
- Proceed

---

## Empty, Success & Celebration Moments

Celebrate meaningful achievements without overwhelming users.

Examples:

- Completing a roadmap
- Finishing an interview preparation plan
- Reaching a study milestone

Animations should be subtle and dismiss automatically.

---

## Design QA Checklist

Before merging any UI change, verify:

- [ ] Matches DESIGN_SYSTEM.md
- [ ] Uses reusable components
- [ ] Supports light & dark themes
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] No layout shift
- [ ] Text is concise and consistent
- [ ] Visual hierarchy is clear
- [ ] Works across common screen sizes

---

# Versioning Policy

This handbook follows semantic versioning.

- Patch: wording, clarifications, examples
- Minor: new design rules, new components
- Major: changes affecting the visual language

Record significant updates in the project changelog.

---

_End of DESIGN_SYSTEM.md v0.4_


---

# Appendix A — Component Specifications

This appendix defines the minimum requirements for reusable UI components.

## Button

Must support:

- Variants: Primary, Secondary, Outline, Ghost, Destructive, Link
- Sizes: Small, Medium, Large, Icon
- States: Default, Hover, Focus, Active, Disabled, Loading
- Optional leading/trailing icons

Accessibility:

- Visible focus ring
- Keyboard operable
- Minimum touch target of 44×44px where practical

---

## Input

Requirements:

- Label
- Placeholder
- Helper text
- Error message
- Disabled state
- Required indicator

Never rely on placeholder text as the only label.

---

## Card

Structure:

- Header
- Title
- Description (optional)
- Content
- Footer (optional)

Cards should not exceed one primary purpose.

---

## Modal & Dialog

Rules:

- Trap keyboard focus.
- Close with Escape when appropriate.
- Provide a clear primary and secondary action.
- Avoid using dialogs for simple notifications.

---

## Toasts

Use for short-lived feedback.

Duration:
- Success: short
- Warning/Error: long enough to read

Avoid stacking excessive notifications.

---

# Appendix B — Design Tokens Ownership

Changes to:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Motion

should be made only through centralized design tokens, never by overriding values in individual components.

---

# Appendix C — Design Decision Log

Record significant visual decisions here.

Template:

Date:
Decision:
Reason:
Alternatives Considered:
Impact:

This log helps preserve design consistency as the product evolves.

---

# Final Principle

Every new screen should feel like it naturally belongs to Cevora.

If a user can recognize the product without seeing the logo, the design system is doing its job.

**End of DESIGN_SYSTEM.md**
