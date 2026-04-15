---
system: Atlassian Design System
component: Media Picker (Pattern)
url: https://atlassian.design/patterns/media-picker/
last_verified: 2026-03-28
---

# Media Picker

## Approach

Atlassian's approach to file upload is architecturally different from every other Tier 1 system: it is not a component at all, but a documented **pattern** classified alongside Forms, Inline Edit, and Messages in the Patterns section of atlassian.design. This classification decision reflects Atlassian's product context. In Jira, Confluence, and Trello, file attachment and media insertion are deeply integrated into rich collaborative workflows. Attachments appear in issue comments, page content, cards, and inline in the document editor. A single generic DropZone component would not serve the Confluence page editor (which embeds images inline in rich text), the Jira issue sidebar (which lists attachments in a structured list), and the Trello card attachment picker (which pulls from cloud services). Atlassian's answer is to describe a pattern that can be instantiated with contextually appropriate UI rather than shipping a single canonical component.

The Media Picker pattern centers on what Atlassian calls "multi-source file selection" — acknowledging that users' files are scattered across local storage, cloud drives, and recently used Atlassian uploads. The pattern provides an upload area (supporting drag-and-drop, traditional file picker, and camera capture on supported devices), a recently-uploaded files browser, and integration hooks for third-party storage services like Dropbox. The design emphasizes user choice: users can insert files they already uploaded to Atlassian products rather than re-uploading, and they can connect cloud accounts to avoid local file management entirely.

The preferred interaction model is direct drag-and-drop into the application surface itself (Confluence page, Jira comment field) rather than opening the Media Picker dialog. The dialog form of the pattern is a fallback and secondary pathway — this is explicitly stated in the Atlassian pattern documentation. This "drag into the live canvas" philosophy distinguishes Atlassian from all other Tier 1 systems, which treat the upload component UI as the primary interface.

## Key Decisions

1. **Pattern instead of component — multi-context flexibility** (HIGH) — Classifying Media Picker as a pattern rather than a component is a deliberate architectural choice that reflects Atlassian's product diversity. The same conceptual action (attaching a file) is implemented differently in Confluence's editor toolbar, Jira's sidebar attachment list, and Trello's card popover. A rigid component with fixed visual structure would require heavy customization in each context. The cost is that there is no single implementation teams can drop in — each surface must instantiate the pattern with appropriate structure.

2. **Multi-source file selection in one dialog** (HIGH) — The Media Picker dialog integrates local file upload, recently uploaded Atlassian media, and third-party cloud service integrations (Dropbox and others) into a single tabbed interface. The WHY is Atlassian's deep understanding of how collaborative knowledge workers operate: files referenced in a Jira issue or Confluence page have often already been uploaded to Atlassian's media service, and re-uploading from local disk creates duplicate assets and wastes time. By surfacing recent uploads, the pattern eliminates a significant friction point in document collaboration workflows.

3. **Direct drag-into-canvas as the preferred pathway** (HIGH) — Atlassian's pattern documentation explicitly states that drag-and-drop directly into the application surface is preferred over opening the Media Picker dialog. This is unusual: most systems treat their drop zone widget as the primary affordance. Atlassian's position is that the editing canvas itself should be a drop target — dragging a screenshot directly onto a Confluence page is faster and more natural than locating and clicking an upload button. The Media Picker dialog is positioned as the secondary fallback for users who need to browse or connect cloud services.

4. **View switcher between grid and list modes** (MEDIUM) — The media picker dialog includes a toggle to switch between thumbnail grid view and metadata list view for recently uploaded files. The WHY is that media files in Atlassian products span a wide range of types: screenshots and diagrams benefit from thumbnail recognition; documents, spreadsheets, and PDFs are better found by filename and date metadata. A single fixed view would disadvantage one of these major use cases. The switcher respects different user mental models and file types.

5. **Badge count on selection for batch confidence** (MEDIUM) — When multiple files are selected in the Media Picker, a numeric badge appears on the upload tab indicating how many files are queued. The primary action button label dynamically changes from "Insert" to "Insert 3 files." The WHY is preventing accidental partial insertions: in a collaborative document, inserting fewer files than intended is a subtle error that users may not notice until after submission. Dynamic button labeling creates a confirmation checkpoint that names the scope of the action.

## Notable Props

Atlassian's Media Picker is a pattern rather than a public component with a stable documented API, so individual prop documentation is limited. Known architectural elements include:

- **Upload area**: Accepts drag-and-drop, file picker dialog, and camera capture — the three input methods are treated as peers in the upload tab.
- **View preference state**: Grid/list toggle is persistent across sessions in Atlassian products, reflecting the system's user-preference-aware design philosophy.
- **Integration account state**: The pattern manages connected/disconnected states for third-party services, including an account settings dialog for linking accounts.
- **Selection tracking**: File selection state is maintained across tab navigation within the dialog — switching from Upload to a cloud integration does not deselect previously chosen files.

## A11y Highlights

- **Keyboard**: The pattern's documentation does not specify keyboard interaction in detail. Based on the modal dialog structure, standard dialog keyboard patterns apply — Tab cycles through interactive elements, Escape closes, and the grid/list of files should support arrow key navigation. The upload area functions as a button (Enter/Space to trigger file picker). However, Atlassian's own pattern documentation explicitly lacks ARIA and keyboard detail, which is a notable gap.
- **Screen reader**: No explicit guidance is provided in the pattern documentation on screen reader behavior for file selection, selection count updates, or upload progress announcements. The badge count indicator and dynamic button label are visual features whose screen reader equivalents are not specified.
- **ARIA**: The pattern documentation does not specify ARIA roles for the drag target, live regions for selection count changes, or state announcements for upload progress. This represents a significant accessibility documentation gap compared to Carbon (which explicitly addresses per-file ARIA state) and Polaris (which documents the accessible label structure).

## Strengths & Gaps

- **Best at**: Multi-source file selection in a collaborative product ecosystem — the integration of recent uploads, cloud service connections, and direct canvas drag-and-drop into a coherent pattern is uniquely suited to Atlassian's Jira/Confluence context and has no equivalent among the other Tier 1 systems.
- **Missing**: Accessible interaction specification — the pattern lacks ARIA guidance, keyboard navigation details, and screen reader announcement strategy, making it the weakest of the Tier 1 systems from an accessibility documentation standpoint; implementers must derive these from Atlassian's broader accessibility guidelines independently.
