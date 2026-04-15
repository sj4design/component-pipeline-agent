---
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent, TodoWrite, mcp__figma-console__figma_execute, mcp__figma-console__figma_take_screenshot, mcp__figma-console__figma_search_components, mcp__figma-console__figma_get_selection, mcp__figma-console__figma_get_file_data, mcp__figma-console__figma_capture_screenshot, mcp__figma-console__figma_navigate, mcp__figma-console__figma_create_child, mcp__figma-console__figma_clone_node, mcp__figma-console__figma_resize_node, mcp__figma-console__figma_set_fills, mcp__figma-console__figma_set_text, mcp__figma-console__figma_set_strokes, mcp__figma-console__figma_rename_node, mcp__figma-console__figma_move_node, mcp__figma-console__figma_delete_node, mcp__figma-console__figma_instantiate_component, mcp__figma-console__figma_get_component, mcp__figma-console__figma_arrange_component_set, mcp__figma-console__figma_set_description
description: "Generate Figma components from pipeline outputs (config.json)"
---

# /generate $ARGUMENTS

Read `figma-generation-agent/SKILL.md` first, then execute.

Input: `outputs/$ARGUMENTS-config.json` (ONLY — do NOT read spec.md or enriched.md)
Output: Figma components on the current page

The component name is: $ARGUMENTS
