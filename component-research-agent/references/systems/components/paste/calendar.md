---
system: Twilio Paste
component: Calendar (within DatePicker)
url: https://paste.twilio.design/components/date-picker
last_verified: 2026-03-28
confidence: medium
---

# Calendar

## Approach
Twilio Paste does not provide a standalone Calendar component separate from its DatePicker. Since Paste's DatePicker uses native input[type=date], there is no custom calendar widget to expose as a standalone component. For use cases requiring an inline calendar display, Paste recommends evaluating whether a date picker or custom solution is needed.

## Key Decisions
Not applicable — component is handled via native browser DatePicker implementation, with no standalone calendar widget.

## Strengths & Gaps
- **Missing**: No standalone Calendar component; calendar functionality is handled by native browser via input[type=date]
