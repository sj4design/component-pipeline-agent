---
name: build-agent
description: >
  Component pipeline orchestrator: research → spec → enrich → spec-completo.md.
  Uses pre-generated data when available (customize flow) or synthesizes from scratch.
  Triggers on: "build [component]", "construir [component]", "pipeline completo".
---

# Build Agent

Read `build-agent/build-compact.md` for all instructions. That single file contains the complete pipeline logic for all 3 modes (Guided, Brief, Max), both flows (Customize and From Scratch), spec-completo format, and all phase rules.

Do NOT read individual agent SKILL.md files (research, spec, enrich) — build-compact.md consolidates everything.
