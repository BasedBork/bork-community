# Plan Mode

The feature that makes Claude Code powerful for complex tasks.

## What is Plan Mode?

Plan Mode tells Claude to think before acting. Instead of immediately writing code, Claude will:

1. Analyze the request
2. Research your codebase
3. Outline an approach
4. Ask clarifying questions
5. Get your approval before starting

## Why It Matters

Without plan mode, Claude might:
- Start coding in the wrong place
- Miss important context
- Make assumptions you didn't intend
- Need multiple attempts to get it right

With plan mode:
- Claude understands the full scope first
- You can course-correct before any changes
- Complex tasks get broken down into steps
- Better results with less back-and-forth

## How to Enter Plan Mode

### Keyboard Shortcut
Press `Shift+Tab` before typing your request.

### In Your Message
Start with "plan" or "let's plan":
```
claude> plan: Add authentication to this app
```

### Explicit Request
```
claude> Before making any changes, analyze this codebase and propose how to add user authentication
```

## Plan Mode Workflow

### 1. Make Your Request
```
claude> plan: Add a dark mode toggle to the settings page
```

### 2. Claude Analyzes
Claude will:
- Search for relevant files
- Understand the current implementation
- Identify what needs to change

### 3. Claude Proposes
You'll see something like:
```
Here's my plan for adding dark mode:

1. Create a ThemeContext in src/contexts/
2. Add theme toggle component to Settings
3. Update CSS variables in styles/globals.css
4. Persist preference in localStorage

Shall I proceed with this approach?
```

### 4. You Review and Approve
- Ask questions
- Request modifications
- Approve when ready

### 5. Execution
Once approved, Claude implements the plan step by step.

## When to Use Plan Mode

### Use Plan Mode For:
- New features
- Refactoring
- Changes across multiple files
- Unfamiliar codebases
- Anything you'd want a human to "think about first"

### Skip Plan Mode For:
- Quick fixes
- Simple questions
- Single-file changes you're confident about

## Examples

### Feature Implementation
```
claude> plan: Add a search feature to the product listing page
```
Claude will identify data sources, suggest UI placement, and outline the implementation.

### Refactoring
```
claude> plan: Refactor the authentication module to use JWT instead of sessions
```
Claude will map all affected files, dependencies, and migration steps.

### Bug Investigation
```
claude> plan: Figure out why the checkout flow fails for users with multiple addresses
```
Claude will trace the code path, identify potential issues, and propose debugging steps.

## Tips for Effective Planning

### 1. Provide Context
```
# Good
claude> plan: Add pagination to the API. We're using Express and PostgreSQL.

# Less Good
claude> plan: Add pagination
```

### 2. State Your Constraints
```
claude> plan: Add user profiles. Keep it simple - we don't need social features, just basic info display.
```

### 3. Mention Preferences
```
claude> plan: Add form validation. I prefer Zod over Yup for schema validation.
```

### 4. Ask for Alternatives
```
claude> plan: Add state management. What are my options and which do you recommend for this project size?
```

## Plan Mode vs Regular Mode

| Aspect | Regular Mode | Plan Mode |
|--------|--------------|-----------|
| Speed | Faster for simple tasks | Slower upfront, faster overall |
| Control | Less visibility | Full visibility before changes |
| Best for | Quick fixes, questions | Features, refactoring, complex tasks |
| Mistakes | May need reverts | Caught before implementation |

## Common Mistakes

### 1. Skipping Plan Mode for Complex Tasks
Leads to: Multiple undo commands, frustrated iteration.

### 2. Over-Planning Simple Tasks
Not everything needs a plan. `Add console.log to debug` doesn't need plan mode.

### 3. Not Reviewing the Plan
Claude's plan isn't always perfect. Review and adjust before approving.

### 4. Being Too Vague
`plan: make it better` doesn't give Claude enough to work with.

---

[← Core Concepts](./README.md) | [Slash Commands →](./SLASH_COMMANDS.md)
