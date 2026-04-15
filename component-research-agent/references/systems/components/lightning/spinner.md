---
system: Salesforce Lightning Design System
component: Spinner
url: https://lightningdesignsystem.com/components/spinners/
last_verified: 2026-03-28
confidence: high
---

# Spinner

## Approach
Lightning's Spinner is a circular indeterminate loading indicator used throughout Salesforce CRM for async operations — loading related list data, processing form submissions, and async validation in inputs. Lightning provides two styles (border spinner and dot spinner), multiple sizes, and both standalone and inline variants. The spinner is commonly used with an overlay to block a page section while loading.

## Key Decisions
1. **Container overlay pattern** (HIGH) — Lightning documents a specific pattern for using the Spinner within a position:relative container with a white overlay, creating the "loading section" pattern ubiquitous in Salesforce CRM page sections.
2. **Dot variant** (MEDIUM) — Dot-based spinner variant (three dots) as alternative to the circular ring, giving visual variety for different loading contexts.
3. **Inverse variant** (MEDIUM) — Inverse (white) spinner variant for use on dark/brand-colored backgrounds in Lightning's varied header and modal contexts.

## Notable Props
- `variant`: "base" | "brand" | "inverse" — color variant
- `size`: "xx-small" | "x-small" | "small" | "medium" | "large"
- `alternativeText`: Required accessible text describing what is loading

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Title element inside SVG announces the alternativeText; loading state communicated
- **ARIA**: SVG title as accessible label; spinner content has no interactive ARIA

## Strengths & Gaps
- **Best at**: Container overlay loading pattern; inverse variant for dark backgrounds; comprehensive size range
- **Missing**: alternativeText required but not strictly enforced at code level; no progress communication
