# BORK Community - Instructions for Claude Code

This repository contains documentation, skills, and resources for Claude Code.

## Repository Structure

- `quick-start/` - Get productive fast
  - Installation, first session, CLAUDE.md setup, troubleshooting
  - `templates/` - Ready-to-use CLAUDE.md templates
- `tools/` - Extend Claude Code
  - `skills/` - Custom slash commands
  - `agents/` - Autonomous subagents
  - `hooks/` - Event-driven automation
  - `mcp/` - External service integrations
  - `workflows/` - Advanced workflow patterns
- `best-practices/` - Master Claude Code
  - Prompting, context management, project structure
  - CLAUDE.md guide, plan mode, permissions
- `archive/` - Legacy structure (preserved for old links)

## Working on This Repo

### Adding Documentation

1. Use clear, accessible language
2. Lead with value - what does this help the reader do?
3. Include code examples where relevant
4. Keep paragraphs short and scannable

### Adding Skills

Skills go in `tools/skills/`. Follow the structure:
```
skill-name/
├── README.md      # What it does, how to use it
├── SKILL.md       # The actual skill file
└── examples/      # Usage examples (optional)
```

### Adding Hooks

Hooks go in `tools/hooks/`. Include:
- Clear explanation of the hook's purpose
- The hook type (PreToolUse, PostToolUse, Stop, etc.)
- Example configuration

### Adding Agents

Agents go in `tools/agents/examples/`. Document:
- When to use this agent
- What tools it has access to
- Example prompts

## Voice Guidelines

When writing content for this repo:

- **Helpful first**: Lead with what the reader can do
- **Technically accurate**: Use specific details, not vague descriptions
- **Accessible**: Explain complex things simply
- **Community-focused**: Use "we" not "I"

## File Naming

- Use UPPERCASE for main docs: `README.md`, `INSTALL.md`, `GUIDE.md`
- Use lowercase-with-dashes for directories: `smart-commit/`, `test-gen/`
- Keep names descriptive but concise

## Testing Changes

Before submitting:

1. Verify all links work
2. Test any code examples
3. Check that skill files are valid markdown
4. Ensure examples run without errors
