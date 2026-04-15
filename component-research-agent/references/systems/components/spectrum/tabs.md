---
system: Adobe Spectrum
component: Tabs (React Spectrum / React Aria)
url: https://react-spectrum.adobe.com/react-spectrum/Tabs.html
last_verified: 2026-03-28
---

# Tabs

## Approach
Spectrum takes a composable architecture approach to tabs, splitting the component into three distinct pieces: `Tabs` (the container managing state and orientation), `TabList` (the row of clickable labels), and `TabPanel` (the content area). This separation exists because Adobe's product suite -- Photoshop, Lightroom, Analytics, Experience Platform -- frequently needs the tab list and tab panels in different DOM locations or even different layout contexts. By decoupling them, a team can place the TabList inside a sidebar while the TabPanel renders in a main content area without fighting the component's assumptions. Spectrum also provides two layers: React Spectrum (opinionated, themed components) and React Aria (headless hooks). This means teams that need Adobe's exact look use React Spectrum, while teams building custom UIs get the same keyboard/ARIA behavior through React Aria without any visual lock-in. The overflow strategy is distinctive: when horizontal tabs cannot fit, Spectrum collapses the entire TabList into a Picker (dropdown), rather than showing scroll arrows or a "more" button.

## Key Decisions
1. **Collapse-to-Picker overflow strategy** (HIGH) — When horizontal space is insufficient, Spectrum replaces the entire tab row with a single Picker dropdown. Most systems use scroll arrows or a disclosure popover. Spectrum chose full collapse because partial visibility of tab labels was found to confuse users in Adobe's dense tool panels -- either all tabs are visible and scannable, or they are presented as a structured list. The tradeoff is that collapsed mode loses the spatial affordance of tabs entirely, making it feel like a different component.

2. **First-class vertical orientation** (MEDIUM) — The `orientation="vertical"` prop rotates the tab list to a sidebar-style layout. Spectrum invested in this because several Adobe products (Properties panels, Inspector panels) use vertically stacked tab navigation. Arrow key direction automatically adjusts: Up/Down for vertical, Left/Right for horizontal. This is not just a CSS rotation but a full keyboard behavior adaptation.

3. **Headless + styled dual-layer architecture** (HIGH) — React Aria provides `useTabList`, `useTab`, and `useTabPanel` hooks with zero styling. React Spectrum wraps these with Spectrum CSS. This means the accessibility and interaction logic is tested and shared across both layers. The reason: Adobe serves both internal product teams (who use Spectrum's look) and external developers (who need only the behavior). Maintaining two separate implementations would cause drift, so the headless layer is the single source of truth.

## Notable Props
- `orientation`: Switches between horizontal and vertical layout with full keyboard adaptation -- not just visual but behavioral.
- `isDisabled` (on individual Tab): Disables specific tabs while keeping them visible, important for indicating features that exist but are not available in the current context.
- `disallowEmptySelection`: Ensures at least one tab is always selected, preventing an empty state that would leave the panel blank.
- `keyboardActivation="manual"`: Overrides automatic activation so focus and selection are decoupled -- users arrow to a tab then press Enter/Space to activate. Useful when tab panels are expensive to render.

## A11y Highlights
- **Keyboard**: Left/Right arrows in horizontal, Up/Down in vertical. Tab key exits the tablist into the active panel. Automatic activation by default (focus = select), with manual mode available.
- **Screen reader**: Each Tab announces its label and selected state. TabPanel is labeled via `aria-labelledby`. Focus management ensures panel content is reachable immediately after selection.
- **ARIA**: Standard `role="tablist"`, `role="tab"`, `role="tabpanel"` pattern. When collapsed to Picker, the ARIA pattern switches to a listbox, maintaining semantic correctness even in degraded layout.

## Strengths & Gaps
- **Best at**: Providing a reusable, headless tabs implementation that works across vastly different product contexts, from themed Adobe UIs to fully custom external projects.
- **Missing**: No built-in support for closable/editable tabs or badges -- teams building IDE-like interfaces with dynamic tab creation need to implement that layer themselves.
