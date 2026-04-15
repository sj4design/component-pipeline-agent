# EU Compliance — EN 301 549 + EAA

> Loaded with `--compliance=eu`. Supplements WCAG 2.2 AA baseline.

## EN 301 549 v3.2.1

- European harmonized standard for ICT accessibility.
- Maps to **WCAG 2.1 AA** for web content (Chapter 9).
- Also covers: non-web documents (Ch. 10), software (Ch. 11), hardware (Ch. 13).

### Additional requirements beyond WCAG

| Requirement | Detail |
|---|---|
| Mobile accessibility | Chapter 11 covers native mobile apps with requirements parallel to WCAG. |
| Closed functionality | Systems where AT cannot be installed must provide built-in accessibility (kiosks, embedded). |
| Real-time communication | Requirements for captioning, audio description in real-time comm tools. |
| Biometrics | If biometric identification is used, non-biometric alternative MUST exist. |

## European Accessibility Act (EAA)

- **Enforcement date**: June 28, 2025.
- Applies to: all products and services sold in the EU market.
- Scope: websites, mobile apps, e-commerce, banking, transport, e-books, telecom.
- Applies to businesses with 10+ employees OR €2M+ turnover.

### Impact on interaction specs

| Area | Requirement |
|---|---|
| Keyboard | Must be operable via keyboard. EN 301 549 §11.2.1.1 mirrors WCAG 2.1.1. |
| Touch | Mobile apps MUST meet accessibility requirements. Touch targets apply. |
| Status messages | aria-live / status messages required per EN 301 549 §11.4.1.3. |
| Error prevention | Forms MUST allow review/correction before submission for legal/financial transactions. |

## Documentation requirements

- **Accessibility statement**: Public statement on website declaring conformance level.
- **Feedback mechanism**: Users MUST be able to report accessibility barriers.
- **Conformance assessment**: Based on EN 301 549. Can be self-assessed or third-party.
- **Market surveillance**: EU member states will conduct compliance checks.

---
_Sources: EN 301 549 v3.2.1, European Accessibility Act (Directive 2019/882)_
