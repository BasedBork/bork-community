# Setting Up CLAUDE.md

The file that makes Claude smarter about your project.

## What is CLAUDE.md?

CLAUDE.md is a configuration file in your project root. Claude reads it automatically when you start a session, giving it immediate context about your project.

## Why It Matters

| Without CLAUDE.md | With CLAUDE.md |
|-------------------|----------------|
| Claude discovers your project each time | Claude knows your project from the start |
| May miss conventions | Follows your conventions |
| More questions | Fewer iterations |
| More assumptions | More accurate code |

## Quick Start

Create `CLAUDE.md` in your project root:

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

## Commands
- `npm run dev` - Development server
- `npm test` - Run tests
- `npm run build` - Production build
```

## Creating Your CLAUDE.md

### Option 1: Use /init
```
claude> /init
```
Claude asks questions and generates a CLAUDE.md for you.

### Option 2: Use a Template
Copy from our [templates](./templates/) and customize:
- [basic.md](./templates/basic.md) - General projects
- [nextjs.md](./templates/nextjs.md) - Next.js apps
- [python.md](./templates/python.md) - Python projects
- [monorepo.md](./templates/monorepo.md) - Monorepo setups
- [mobile.md](./templates/mobile.md) - React Native/Mobile

### Option 3: Ask Claude
```
claude> Create a CLAUDE.md for this project
```

## What to Include

### Must Have
- **Tech stack**: Languages, frameworks, databases
- **Structure**: Where things live
- **Conventions**: Naming, formatting, patterns

### Good to Have
- **Don'ts**: Common mistakes to avoid
- **Testing**: How to run tests
- **Build**: How to build and run

### Nice to Have
- **Recent changes**: What's in progress
- **Known issues**: Things to watch out for

## Pro Tips

### Be Specific, Not Verbose

```markdown
# Too vague
The code is organized logically.

# Too verbose
The src directory contains all source code. Within src, we have
components which holds all React components...

# Just right
- src/components/ - React components by feature
- src/lib/ - Utilities and helpers
- src/app/ - Next.js pages (App Router)
```

### Tell Claude What NOT to Do

```markdown
## Don'ts
- Don't add comments explaining obvious code
- Don't use `any` type
- Don't create utility functions for one-time operations
```

### Include Commands That Work

```markdown
## Commands
npm run dev     # Development
npm test        # All tests
npm run build   # Production build
```

## Where Claude Looks

Claude searches for `CLAUDE.md` in:
1. Current directory
2. Parent directories (up to git root)
3. `~/.claude/CLAUDE.md` (global defaults)

## Multiple CLAUDE.md Files

In monorepos:

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

## Checklist

Before committing your CLAUDE.md:

- [ ] Tech stack is accurate
- [ ] Structure matches reality
- [ ] Commands actually work
- [ ] No outdated information
- [ ] Readable in under 2 minutes

---

[← First 15 Minutes](./FIRST-15-MINUTES.md) | [Common Pitfalls →](./COMMON-PITFALLS.md)
