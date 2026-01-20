# CLAUDE.md Configuration

The file that makes Claude smarter about your project.

## What is CLAUDE.md?

CLAUDE.md is a configuration file that lives in your project root. Claude reads it automatically when you start a session, giving it immediate context about:

- What your project does
- How it's structured
- What conventions you follow
- What Claude should and shouldn't do

## Why It Matters

Without CLAUDE.md:
- Claude has to discover your project structure
- May miss important conventions
- Asks more questions
- Makes more assumptions

With CLAUDE.md:
- Claude knows your project from the start
- Follows your conventions
- Produces more accurate code
- Fewer iterations needed

## Quick Start

Create a `CLAUDE.md` in your project root:

```markdown
# Project: My App

## Overview
A Next.js app for managing tasks.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma with PostgreSQL

## Structure
- src/app/ - Pages and API routes
- src/components/ - React components
- src/lib/ - Utilities and helpers
- prisma/ - Database schema

## Conventions
- Use named exports
- Components in PascalCase
- Utilities in camelCase
- Tests next to source files (*.test.ts)
```

## Creating Your CLAUDE.md

### Option 1: Use /init
```
claude> /init
```
Claude asks questions and generates a CLAUDE.md for you.

### Option 2: Use a Template
Copy from our [templates](./templates/) and customize.

### Option 3: Write From Scratch
Use [BEST_PRACTICES.md](./BEST_PRACTICES.md) as a guide.

## What to Include

### Must Have
- **Tech stack**: Languages, frameworks, databases
- **Structure**: Where things live
- **Conventions**: Naming, formatting, patterns

### Good to Have
- **Don'ts**: Common mistakes to avoid
- **Testing**: How to run tests
- **Build**: How to build and run
- **External services**: APIs, integrations

### Nice to Have
- **Recent changes**: What's new or in progress
- **Known issues**: Things to watch out for
- **Ownership**: Who owns what

## Templates

Ready-to-use templates for common setups:

| Template | Best For |
|----------|----------|
| [basic.md](./templates/basic.md) | General projects |
| [nextjs.md](./templates/nextjs.md) | Next.js apps |
| [python.md](./templates/python.md) | Python projects |
| [monorepo.md](./templates/monorepo.md) | Monorepo setups |
| [mobile.md](./templates/mobile.md) | React Native/Mobile |

## Where to Put It

```
your-project/
├── CLAUDE.md         # <-- here
├── package.json
├── src/
└── ...
```

Claude looks for `CLAUDE.md` in:
1. Current directory
2. Parent directories (up to git root)
3. `~/.claude/CLAUDE.md` (global defaults)

## Multiple CLAUDE.md Files

In monorepos, you can have multiple:

```
monorepo/
├── CLAUDE.md              # Repo-wide config
├── packages/
│   ├── web/
│   │   └── CLAUDE.md      # Web app specific
│   └── api/
│       └── CLAUDE.md      # API specific
```

Claude merges them, with more specific files taking precedence.

---

[← Core Concepts](../01-core-concepts/) | [Best Practices →](./BEST_PRACTICES.md)
