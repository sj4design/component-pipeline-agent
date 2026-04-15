---
component: Timeline
tier: 2
last_verified: 2026-03-31
---

# Timeline — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Timeline (not present) | Not present; activity logs use ChatLog or custom list patterns | medium |
| Salesforce Lightning | ActivityTimeline | Dedicated component for Salesforce record activity; expandable items with icons per activity type (call, email, task, event); right-aligned timestamps | high |
| GitHub Primer | Timeline / TimelineItem | Dedicated component for issue/PR activity feeds; condensed items for grouping related events; badge-style icons per event type; left-border connector | high |
| shadcn/ui | Timeline (community) | Not in core library; community implementations exist using Tailwind + ordered list; no official component | medium |
| Playbook | Timeline | Dedicated component for activity tracking; date-grouped items; custom icons per item; vertical connector line | medium |
| REI Cedar | Timeline (not present) | Not present in public docs; outdoor retail context has limited timeline use cases | low |
| Wise Design | Timeline (not present) | Not present; financial transaction history uses list-based patterns with status badges | low |
| Dell Design System | Timeline (not present) | Not present in public docs; enterprise IT workflows use custom activity log patterns | low |

## Key Decision Patterns

**Lightning ActivityTimeline as CRM reference:** Lightning's ActivityTimeline is purpose-built for Salesforce's record detail pages — every CRM record (opportunity, case, lead, account) has an activity timeline showing calls, emails, tasks, and events. Each activity type has a distinct icon and color. Items are expandable to show full activity details. This is the most mature product-specific timeline implementation in Tier 2, though its tight coupling to Salesforce's activity model limits generalizability.

**Primer TimelineItem for developer activity:** Primer's Timeline is optimized for GitHub's issue and pull request activity feeds. The `TimelineItem.Condensed` variant groups related events (multiple label additions, assignment changes) into compact single-line items, reducing visual noise in long activity threads. The `TimelineItem.Badge` provides the colored circle icon that distinguishes event types (comment, commit, review, label change). This condensed/full duality is a unique pattern for high-volume activity feeds.

**Playbook's date-grouped timeline:** Playbook groups timeline items by date, providing natural visual breaks in long activity histories. This date-grouping pattern is particularly useful for eBay's listing and order activity where events span days or weeks. Each group has a date header, and items within the group are connected by a vertical line.

**Rare dedicated component:** Timeline is uncommon as a standardized design system component. Only 3 of 8 Tier 2 systems (Lightning, Primer, Playbook) have dedicated timeline components. The remaining systems either lack the component entirely or handle activity feeds through product-specific implementations. This rarity reflects the challenge of generalizing a component whose content structure varies dramatically by product domain.

## A11y Consensus
- Timeline container: `<ol>` or `<ul>` with `aria-label` describing the timeline context (e.g., "Issue activity", "Order history")
- Chronological order: use `<ol>` when temporal sequence matters; `<ul>` when events are unordered
- Timestamps: `<time datetime>` for machine-readable dates; visible text for human-readable format
- Event type: icon-only event type indicators need `aria-label` or visually-hidden text ("Comment", "Email", "Deployment")
- Expandable items: `aria-expanded` on trigger; expanded content in a region associated with the trigger
- Dynamic loading: new timeline items announced via `aria-live="polite"` or focus management

## Recommended Use
Use Lightning ActivityTimeline as the reference for CRM-style record activity with expandable items and typed icons. Use Primer TimelineItem for developer-tool activity feeds with condensed event grouping. Use Playbook Timeline for date-grouped activity histories. For systems without a dedicated timeline, build custom using `<ol>` + connector lines + icon indicators, following the a11y consensus above. Distinguish from Steps: timeline shows past events (history), Steps shows future progression (wizard navigation).
