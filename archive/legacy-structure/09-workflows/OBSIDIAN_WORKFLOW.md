# Obsidian Workflow

Claude Code + Obsidian for knowledge management.

## Why Obsidian + Claude?

Obsidian is a markdown-based note-taking app. Claude Code can:

- Read your Obsidian vault
- Create and edit notes
- Search across your knowledge base
- Link notes together
- Generate content from your notes

## Setup

### 1. Open Your Vault

```bash
cd ~/Documents/ObsidianVault
claude
```

### 2. CLAUDE.md for Vault

Create a `CLAUDE.md` in your vault root:

```markdown
# Obsidian Vault

This is my personal knowledge base.

## Structure
- /daily/ - Daily notes (YYYY-MM-DD.md)
- /projects/ - Project notes
- /references/ - Reference material
- /ideas/ - Ideas and drafts

## Conventions
- Use [[wiki links]] for internal links
- Tags: #project, #idea, #reference
- Front matter for metadata

## Don'ts
- Don't modify files in /archive/
- Don't delete without confirmation
```

## Common Tasks

### Daily Notes

```
claude> Create today's daily note with sections for:
        - Morning tasks
        - Meeting notes
        - End of day reflection
```

### Meeting Notes

```
claude> Create a meeting note for "Q1 Planning".
        Include attendees, agenda, decisions, action items.
```

### Research Notes

```
claude> I'm researching async/await patterns.
        Create a reference note with key concepts and examples.
```

### Linking Notes

```
claude> Find all notes that should link to the "Project Alpha"
        note and add backlinks.
```

### Search and Summarize

```
claude> Search my vault for everything about "authentication"
        and create a summary note.
```

## Workflows

### Weekly Review

```
claude> Create a weekly review note that:
        1. Links to all daily notes from this week
        2. Summarizes completed tasks
        3. Lists carry-over items
        4. Identifies themes
```

### Project Kickoff

```
claude> Create a project note for "New Feature X" with:
        - Objectives
        - Key stakeholders
        - Timeline
        - Links to related notes
```

### Idea Development

```
claude> I have an idea: [describe idea]
        Create an idea note and link it to relevant existing notes.
```

### Content Drafting

```
claude> Using my notes on TypeScript, draft a blog post outline
        about type guards.
```

## Templates

### Daily Note Template

```markdown
# {{date}}

## Morning
- [ ] Task 1
- [ ] Task 2

## Notes

## End of Day
### What went well?
### What to improve?
```

Claude can use templates:
```
claude> Create today's daily note using the daily template
```

### Project Template

```markdown
# {{project name}}

## Overview
Brief description

## Objectives
- Objective 1
- Objective 2

## Key Links
- [[Related Note 1]]
- [[Related Note 2]]

## Log
### {{date}}
Update...
```

## Knowledge Building

### From Conversations

```
claude> Our discussion about database sharding was useful.
        Create a reference note capturing the key points.
```

### From Reading

```
claude> I just read an article about [topic].
        Create a literature note with key takeaways.
```

### From Code

```
claude> Document how our authentication system works
        as a reference note. Link to relevant code files.
```

## Tips

### Vault Organization
Keep a consistent structure. Claude works better with predictable paths.

### Frontmatter
Use frontmatter for metadata Claude can query:
```yaml
---
type: reference
tags: [typescript, patterns]
created: 2024-01-15
---
```

### Tagging Strategy
Consistent tags help Claude find related content:
```
claude> Find all notes tagged #project and summarize their status
```

### Regular Reviews
```
claude> Find orphan notes (no incoming links) that might need
        to be connected to other notes
```

## Integration with MCP

With Obsidian MCP server (if available):
- Full vault search
- Graph visualization data
- Plugin interactions

Without MCP, Claude uses file system access directly.

---

[← Content Workflow](./CONTENT_WORKFLOW.md) | [Back to Workflows](./README.md)
