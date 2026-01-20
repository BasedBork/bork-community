# Workflows

Advanced patterns for real-world projects.

## What Are Workflows?

Workflows are structured approaches to complex tasks. Instead of ad-hoc prompting, workflows provide:

- Consistent processes
- Better outcomes
- Reproducible results
- Scalable patterns

## Available Workflows

| Workflow | Best For |
|----------|----------|
| [TDD](./TDD_WORKFLOW.md) | Test-driven development |
| [PR](./PR_WORKFLOW.md) | Pull request lifecycle |
| [Content](./CONTENT_WORKFLOW.md) | Research → Draft → Publish |
| [Obsidian](./OBSIDIAN_WORKFLOW.md) | Note-taking and knowledge management |

## Workflow Philosophy

### 1. Plan Before Act
Every workflow starts with understanding. Use plan mode.

### 2. Iterate in Small Steps
Break work into small, reviewable pieces.

### 3. Verify at Each Step
Don't assume success. Check results.

### 4. Document Decisions
Leave a trail for future reference.

## Choosing a Workflow

### Building Features
1. Start with TDD workflow for test-first development
2. Or use PR workflow for feature branch development

### Creating Content
1. Use Content workflow for blog posts, docs
2. Use Obsidian workflow for personal knowledge

### Debugging Issues
1. Use the debug-helper skill
2. Follow systematic reproduction → isolation → fix

## Combining Workflows

Workflows can combine:

```
TDD Workflow → PR Workflow → Deploy
   (build)      (review)    (ship)
```

## Creating Custom Workflows

Adapt these workflows to your needs:

1. Start with an existing workflow
2. Identify what doesn't fit
3. Modify those parts
4. Document your changes
5. Share with your team

---

[← Tools Overview](../README.md) | [TDD Workflow →](./TDD_WORKFLOW.md)
