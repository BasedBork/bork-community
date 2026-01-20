# Best Practices

Patterns for getting the most out of Claude Code.

## Guides

| Guide | What You'll Learn |
|-------|-------------------|
| [Prompting](./PROMPTING.md) | How to write effective prompts |
| [Context Management](./CONTEXT-MANAGEMENT.md) | Keep Claude focused and accurate |
| [Project Structure](./PROJECT-STRUCTURE.md) | Organize projects for Claude |
| [CLAUDE.md Guide](./CLAUDE-MD-GUIDE.md) | Advanced configuration patterns |
| [Plan Mode](./PLAN-MODE.md) | When and how to use plan mode |
| [Permissions](./PERMISSIONS.md) | Security model and skip-permissions |
| [Building Apps](./BUILDING-APPS.md) | Full-stack development workflow |

## Quick Tips

### Be Specific

```
# Good
claude> Add input validation to the signup form that checks for valid email format and password length

# Less Good
claude> Make the form better
```

### Use Plan Mode for Complex Tasks

```
claude> plan: Add user authentication to this app
```

Claude will analyze, propose, and wait for approval before coding.

### Clear Context When Switching Tasks

```
claude> /clear
```

Don't carry context from debugging auth bugs into writing new API endpoints.

### Reference Files Directly

```
# Good
claude> Update the function in src/utils/validators.js

# Less Good
claude> Update that validation function we talked about
```

### Create a CLAUDE.md

Put your tech stack, conventions, and project structure in CLAUDE.md. Claude reads it automatically at session start.

### Review Before Approving

Always look at the diff before pressing `y`. Use `e` to edit if needed.

### Commit Before Major Changes

```bash
git commit -am "checkpoint before AI changes"
```

Easy to revert if something goes wrong.

## Mental Model

Think of Claude Code in three modes:

1. **Chat Mode**: Ask questions, get answers
2. **Edit Mode**: Claude makes changes to files
3. **Plan Mode**: Claude thinks before acting

Start in chat mode. Use plan mode for anything non-trivial.

---

[Back to main](../README.md)
