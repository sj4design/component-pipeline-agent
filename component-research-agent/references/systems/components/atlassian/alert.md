---
system: Atlassian Design System
component: Banner + SectionMessage + InlineMessage (three-tier hierarchy)
url: https://atlassian.design/components/banner/usage
last_verified: 2026-03-28
---

# Banner / SectionMessage / InlineMessage (Three-Tier Alert System)

## Approach

Atlassian is the only Tier 1 design system that ships three distinct, named components for inline persistent notifications instead of one. This is not redundancy — it is a carefully designed spatial hierarchy that maps each component to a specific scope of impact. The three components are: **Banner** (page-level, top of screen, system-wide announcements), **SectionMessage** (section-level, embedded within a page area, contextual to a content region), and **InlineMessage** (field-level or element-level, embedded directly in content flow, contextual to a specific item). Every Atlassian product team is expected to choose the right tier for the right scope rather than defaulting to a single catch-all component.

The reasoning behind this three-tier architecture is grounded in Atlassian's product portfolio: Jira, Confluence, Bitbucket, and Trello serve wildly different contexts — project management workflows, document collaboration, code review, and kanban boards. A system-wide degradation warning (e.g., "Jira is experiencing slow performance") belongs at the page level as a Banner. A configuration error in a specific project settings section belongs as a SectionMessage. A validation issue with a specific field value in a form row belongs as an InlineMessage. Conflating all three into one component forces product teams to make styling hacks based on context, producing inconsistency. Atlassian's three-tier approach codifies these context rules in the component names themselves.

The Toast vs. Inline distinction in Atlassian's system is handled by a fourth component (Flag, which is their Toast equivalent) — auto-dismissing, overlay, for transient feedback. All three inline tiers (Banner, SectionMessage, InlineMessage) are persistent and embedded in the page layout.

## Key Decisions

1. **Three-tier spatial hierarchy as explicit design decision** (HIGH) — The most significant architectural decision in Atlassian's alert system. Banner = page scope, SectionMessage = section scope, InlineMessage = element scope. Choosing the correct tier is a content decision as much as a design decision: the scope of the notification determines which component to use. A notification about something that affects the whole page belongs in Banner. A notification about something in a specific content section belongs in SectionMessage. A notification about a specific data item, form field, or inline element belongs in InlineMessage. This prevents the common failure mode where teams use a page-level banner for a field-level error, overwhelming the user with a prominent full-page alert for a small, local issue.

2. **Banner is fixed-position at top of page** (HIGH) — Atlassian's Banner component is specifically designed for page-level system announcements placed at the very top of the viewport, above the navigation. This is higher priority and more prominent than any section-level or inline alert. It is used for conditions that affect the entire page experience: system degradation, maintenance windows, critical account-level warnings, or discovery-tier announcements (new features affecting all users). Banners at this level are not dismissible by default in the same way as section-level messages — they persist until the underlying condition resolves or an admin clears them. This is the highest-urgency tier of Atlassian's inline notification hierarchy.

3. **SectionMessage for section-level contextual feedback** (HIGH) — SectionMessage is embedded within specific content regions — a settings panel, a form section, a project configuration area. It uses a contained, bordered visual treatment that frames the section it annotates without competing with page-level navigation or Banner announcements. SectionMessage supports all five Atlassian severity levels (success, warning, danger/error, information, discovery) and can include action buttons for contextual resolution. It is the most commonly used of the three tiers for product teams building configuration UIs, onboarding flows, and form-heavy interfaces.

4. **InlineMessage for point-of-context feedback** (MEDIUM) — InlineMessage is the most granular tier, designed to appear adjacent to or within specific content items — a table row, a list item, a form field, or a data card. It is visually minimal compared to SectionMessage, appropriate for field-level annotations that would be visually overwhelming if rendered as a full SectionMessage. InlineMessage supports a hover-reveal pattern for its action slot, keeping the inline context uncluttered by default but surfacing actions when the user directs attention to it. This pattern is unique to Atlassian and reflects the density requirements of Jira's issue view and Confluence's inline editing model.

5. **Five severity levels across all three tiers** (MEDIUM) — All three components share the same five-level severity vocabulary: success, warning, danger (error), information, and discovery. The discovery variant — absent from all other Tier 1 systems — is for announcing new features, opportunities, or capabilities. This is a product-management-driven addition reflecting Atlassian's reality that product teams frequently need to surface in-product feature announcements (e.g., "Try our new automation feature") alongside error and warning states. Using a distinct severity level for discovery prevents repurposing error/warning colors for positive promotional messages.

6. **Toast (Flag) is architecturally separated from all three inline tiers** (HIGH) — Atlassian's Flag component is their Toast equivalent: auto-dismissing, overlay-based, position-anchored, for transient feedback. It shares no component hierarchy with Banner, SectionMessage, or InlineMessage. This architectural separation means there is no API-level ambiguity between persistent inline and transient overlay notifications — they are completely different components, preventing usage errors at the code level.

## Notable Props

- `appearance` (all three): `'success' | 'warning' | 'danger' | 'information' | 'discovery'` — Five severity levels including the Atlassian-unique discovery variant.
- Actions slot: All three tiers support embedded action buttons/links, with constraints varying by tier. SectionMessage supports multiple actions. InlineMessage has a hover-revealed action slot.
- Close/dismiss: SectionMessage supports dismissal through an action button. Banner (page-level) typically persists until the system condition resolves. InlineMessage dismissal is context-dependent.

## A11y Highlights

- **Keyboard**: All three tiers ensure interactive elements (action buttons, dismiss triggers) are keyboard-reachable. InlineMessage's hover-reveal pattern requires careful focus management to ensure keyboard users can reach the revealed action without a mouse hover trigger.
- **Screen reader**: All three tiers use semantic ARIA roles for notification containers. Color is always paired with an icon to avoid color-only communication of severity. The design token system (color-mixing for dark/light modes) ensures contrast ratios are maintained across modes.
- **ARIA**: Role assignments follow the pattern established across other systems — more urgent severities (danger/warning) warrant assertive live regions; informational and discovery use polite. Specific role documentation per component tier should be verified against current ADS implementation.

## Strengths & Gaps

- **Best at**: The three-tier spatial hierarchy is the most sophisticated alert scoping model of any Tier 1 system, directly solving the "wrong-component-for-the-scope" failure mode that plagues simpler single-component notification systems. The `discovery` severity level is also unique and valuable for product-growth use cases.
- **Missing**: The three-tier system has a higher learning curve — teams must understand the scope rules to choose correctly, and there is no in-component enforcement of correct placement. InlineMessage's hover-reveal action pattern also creates a potential keyboard accessibility gap if not implemented carefully.
