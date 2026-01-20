# Your First 15 Minutes

A hands-on walkthrough to get comfortable with Claude Code.

## Starting Claude

Navigate to any project and start Claude:

```bash
cd your-project
claude
```

You'll see a prompt like:
```
claude>
```

You're now in an interactive session with Claude.

## Basic Interactions

### Ask Questions About Your Code

```
claude> What does this project do?
```

Claude reads your files and explains the codebase.

```
claude> Explain the main function in index.js
```

Claude finds and explains specific code.

### Make Changes

```
claude> Add a function that validates email addresses
```

Claude will:
1. Find the right file
2. Show you the changes it wants to make
3. Ask for permission to apply them

### Run Commands

```
claude> Run the tests
```

Claude will execute commands and show you the output.

## The Permission System

Claude asks before taking actions. You'll see prompts like:

```
Claude wants to edit src/utils.js
Allow? [y/n/e]
```

- `y` - Yes, make the change
- `n` - No, don't make the change
- `e` - Edit the change before applying

This keeps you in control.

## Essential Commands

Type these directly in the Claude prompt:

| Command | What It Does |
|---------|--------------|
| `/help` | Show all available commands |
| `/clear` | Clear context and start fresh |
| `/undo` | Undo the last change |
| `/model` | Switch between Claude models |
| `/stats` | Show token usage |

### Clearing Context

When to use `/clear`:
- Starting a new, unrelated task
- Claude seems confused about your intent
- You want to reset the conversation

```
claude> /clear
Context cleared. Starting fresh.
```

## Your First Practical Task

Let's do something useful. Try this:

### 1. Understand Your Codebase
```
claude> Give me an overview of this project's structure
```

### 2. Find Something Specific
```
claude> Where is user authentication handled?
```

### 3. Make a Small Change
```
claude> Add a console.log at the start of the main function that says "Starting..."
```

Review the change, approve it, and you've made your first AI-assisted edit.

## Plan Mode

For complex tasks, use plan mode. Press `Shift+Tab` or start with "plan:":

```
claude> plan: Add authentication to this app
```

Claude will:
1. Analyze your codebase
2. Propose an approach
3. Wait for your approval before coding

This prevents Claude from diving in without thinking.

## Tips for Effective Sessions

### Be Specific
```
# Good
claude> Add input validation to the signup form that checks for valid email format

# Less Good
claude> Make the form better
```

### Give Context
```
claude> I'm building a REST API. Add an endpoint that returns user data by ID.
```

### Iterate
```
claude> That looks good, but also add error handling for when the user isn't found
```

## Exiting

Type `exit` or press `Ctrl+C`:

```
claude> exit
Goodbye!
```

## What's Next?

You've completed your first session. Next steps:

1. **[Set Up CLAUDE.md](./CLAUDE-MD-SETUP.md)** - Configure Claude for your project
2. **[Plan Mode Guide](../best-practices/PLAN-MODE.md)** - Master complex tasks
3. **[Explore Tools](../tools/)** - Skills, hooks, and agents

## Quick Reference Card

```
Start:     claude
Help:      /help
Clear:     /clear
Undo:      /undo
Exit:      exit or Ctrl+C

Permissions:
  y = yes    n = no    e = edit

Plan Mode: Shift+Tab or "plan: your task"
```

---

[← Install](./INSTALL.md) | [CLAUDE.md Setup →](./CLAUDE-MD-SETUP.md)
