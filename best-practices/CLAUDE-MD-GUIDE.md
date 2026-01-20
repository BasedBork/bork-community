# CLAUDE.md Guide

Advanced configuration patterns for Claude Code.

## Why CLAUDE.md?

CLAUDE.md gives Claude immediate context about your project. Without it, Claude has to discover your project structure, conventions, and constraints each session.

## Basic Structure

```markdown
# Project Name

## Overview
Brief description of what this project does.

## Tech Stack
- Language/Framework
- Database
- Key libraries

## Structure
- dir/ - What's in it
- other/ - What's in it

## Conventions
How you write code.

## Commands
How to build/test/run.
```

## What to Include

### Must Have

**Tech Stack** - Languages, frameworks, databases:
```markdown
## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Prisma with PostgreSQL
```

**Structure** - Where things live:
```markdown
## Structure
- src/app/ - Next.js pages and API routes
- src/components/ - React components by feature
- src/lib/ - Utilities and helpers
- prisma/ - Database schema and migrations
```

**Conventions** - Naming, formatting, patterns:
```markdown
## Conventions
- Use named exports
- Components in PascalCase
- Utilities in camelCase
- Tests next to source files (*.test.ts)
```

### Good to Have

**Don'ts** - Common mistakes to avoid:
```markdown
## Don'ts
- Don't add comments explaining obvious code
- Don't use `any` type
- Don't create utility functions for one-time operations
- Don't add error handling for impossible cases
```

**Commands** - How to run things:
```markdown
## Commands
npm run dev       # Development server
npm test          # All tests
npm run build     # Production build
npm run db:push   # Push schema to DB
```

**External Services**:
```markdown
## Services
- Stripe for payments (test mode in dev)
- Resend for email
- Vercel Blob for file uploads
```

### Nice to Have

**Current Work**:
```markdown
## Current Work
- Migrating from pages/ to app/ router
- Auth moving from NextAuth to Clerk
```

**Known Issues**:
```markdown
## Known Issues
- /api/users endpoint is slow, needs caching
- Mobile nav breaks at 768px
```

## Writing Style

### Be Specific, Not Verbose

```markdown
# Too vague
The code is organized logically.

# Too verbose
The src directory contains all source code. Within src, we have
components which holds all React components. These components are
organized by feature. Each feature has its own directory...

# Just right
- src/components/ - React components by feature
- src/lib/ - Utilities and helpers
- src/app/ - Next.js pages (App Router)
```

### Make It Actionable

```markdown
# Not actionable
We use TypeScript.

# Actionable
## TypeScript
- Strict mode enabled
- Use explicit return types on exported functions
- Prefer interfaces over types for objects
- Zod for runtime validation
```

### Tell Claude What NOT to Do

```markdown
## Don'ts
- Don't add comments explaining obvious code
- Don't use `any` type
- Don't create utility functions for one-time operations
- Don't add error handling for impossible cases
```

## Multiple CLAUDE.md Files

### In Monorepos

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

### Search Order

Claude looks for `CLAUDE.md` in:
1. Current directory
2. Parent directories (up to git root)
3. `~/.claude/CLAUDE.md` (global defaults)

## Common Patterns

### For API Projects

```markdown
# API Project

## Tech Stack
- Node.js with Express
- TypeScript
- PostgreSQL with Prisma
- Zod for validation

## Structure
- src/routes/ - API endpoints
- src/services/ - Business logic
- src/middleware/ - Auth, validation, error handling
- src/utils/ - Helpers

## Conventions
- Controllers handle HTTP, services handle logic
- All routes return { data } or { error }
- Use Zod schemas for request validation
- Errors use standard HTTP status codes

## Commands
npm run dev         # Development with nodemon
npm test            # Jest tests
npm run db:migrate  # Run migrations
```

### For React Projects

```markdown
# React App

## Tech Stack
- React 18 with Vite
- TypeScript
- Tailwind CSS
- React Query for data fetching
- React Hook Form + Zod for forms

## Structure
- src/components/ - Shared components
- src/features/ - Feature-specific code
- src/hooks/ - Custom hooks
- src/services/ - API calls

## Conventions
- Components: PascalCase
- One component per file
- Colocate tests with source
- Use React Query for all API calls

## Don'ts
- Don't use useEffect for data fetching
- Don't create wrapper components that just pass props
```

### For Python Projects

```markdown
# Python API

## Tech Stack
- Python 3.11
- FastAPI
- SQLAlchemy with PostgreSQL
- Pydantic for validation
- pytest for testing

## Structure
- app/api/ - API routes
- app/models/ - SQLAlchemy models
- app/schemas/ - Pydantic schemas
- app/services/ - Business logic

## Conventions
- Type hints everywhere
- Async functions for I/O
- Dependency injection for services
- Black for formatting

## Commands
make run      # Development server
make test     # Run tests
make lint     # Type check and lint
```

## Avoid These Mistakes

### 1. Too Long
Keep it scannable. If it's over 100 lines, trim it.

### 2. Outdated Information
Update when your stack changes. Wrong info is worse than no info.

### 3. Obvious Statements
```markdown
# Don't
We use git for version control.
```

### 4. Duplicating Docs
Link to detailed docs instead of copying:
```markdown
## API
See /docs/api.md for endpoint documentation.
```

### 5. Personal Preferences
```markdown
# Don't
I like tabs over spaces.

# Do (if it matters)
## Formatting
- 2-space indentation (enforced by Prettier)
```

## Iterate Over Time

Your CLAUDE.md should evolve:

1. **Start minimal**: Just tech stack and structure
2. **Add as needed**: When Claude makes mistakes, add a convention
3. **Prune regularly**: Remove what's no longer relevant

## Checklist

Before committing your CLAUDE.md:

- [ ] Tech stack is accurate
- [ ] Structure matches reality
- [ ] Commands actually work
- [ ] No outdated information
- [ ] Readable in under 2 minutes

---

[← Project Structure](./PROJECT-STRUCTURE.md) | [Plan Mode →](./PLAN-MODE.md)
