# Context Management

Controlling what Claude knows about your project.

## What is Context?

Context is everything Claude knows during your session:
- Files it has read
- Commands it has run
- Your conversation history
- Project configuration (CLAUDE.md)

More context = more informed responses, but also more tokens and potential confusion.

## The Context Window

Claude has a limited context window (how much it can "remember"). When you exceed it:
- Older context gets pushed out
- Claude may "forget" earlier parts of your conversation
- Responses may become less accurate

## Managing Context

### Clear When Switching Tasks

Before starting a new task:
```
claude> /clear
```

Don't carry context from debugging auth bugs into writing new API endpoints.

### Use /compact for Long Sessions

When you want to keep working but reduce tokens:
```
claude> /compact
```

Claude summarizes the important context and discards the rest.

### Check Usage with /stats

```
claude> /stats
```

If token count is high, consider:
- `/clear` if starting something new
- `/compact` if continuing the same work

## CLAUDE.md: Persistent Context

Your CLAUDE.md file provides context that persists across sessions:

```markdown
# Project Context

This is a Next.js app with:
- TypeScript
- Tailwind CSS
- Prisma ORM with PostgreSQL

## Important Files
- src/app/ - App router pages
- src/components/ - React components
- prisma/schema.prisma - Database schema
```

Claude reads this automatically when you start a session.

## Context Strategies

### Strategy 1: Fresh Start
```bash
# New session for each distinct task
claude
/clear
# work on feature A
exit

claude
# work on feature B
```

**Pros**: No context pollution
**Cons**: Loses helpful context between related tasks

### Strategy 2: Continuous Session
```bash
claude
# work on multiple related tasks
# /compact when needed
```

**Pros**: Builds understanding over time
**Cons**: Risk of confusion, high token usage

### Strategy 3: Hybrid (Recommended)
```bash
claude
# work on related tasks
/clear  # when switching to unrelated work
# continue
```

## What Affects Context

### High Context Impact
- Reading large files
- Exploring many files
- Long conversations
- Verbose responses

### Low Context Impact
- Specific, targeted questions
- Small file edits
- Using `/compact`

## Signs of Context Problems

### Claude "Forgets" Earlier Work
```
claude> Remember that auth function we discussed?
> I don't see any auth function in our conversation...
```

Solution: Context was pushed out. Re-explain or reference the file directly.

### Claude Makes Contradictory Suggestions
Claude suggests something that conflicts with earlier decisions.

Solution: `/clear` and restart with explicit constraints.

### Slow Responses
Very high token counts slow things down.

Solution: `/compact` or `/clear`.

## Best Practices

### 1. Start Sessions with Intent
```
claude> I'm working on the checkout feature today. The relevant files are in src/checkout/
```

### 2. Be Explicit About Scope
```
claude> Just focus on the validateCart function. Don't worry about the rest of the file.
```

### 3. Reference Files, Not Memory
```
# Good
claude> Update the function in src/utils/validators.js

# Less Good
claude> Update that validation function we talked about
```

### 4. Use CLAUDE.md for Stable Context
Put project structure, conventions, and important paths in CLAUDE.md so they're always available.

### 5. Clear Between Mental Contexts
If you're mentally switching gears, Claude should too.

---

[← Prompting](./PROMPTING.md) | [Project Structure →](./PROJECT-STRUCTURE.md)
