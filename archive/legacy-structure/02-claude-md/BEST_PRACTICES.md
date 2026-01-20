# CLAUDE.md Best Practices

Writing effective configuration for Claude.

## Structure Your File

Use clear sections with headers:

```markdown
# Project Name

## Overview
Brief description.

## Tech Stack
- Language
- Framework
- Database

## Structure
- dir/ - What's in it
- other/ - What's in it

## Conventions
How you write code.

## Commands
How to build/test/run.
```

## Be Specific, Not Verbose

### Too Vague
```markdown
## Structure
The code is organized logically.
```

### Too Verbose
```markdown
## Structure
The src directory contains all source code. Within src, we have
components which holds all React components. These components are
organized by feature. Each feature has its own directory...
```

### Just Right
```markdown
## Structure
- src/components/ - React components by feature
- src/lib/ - Utilities and helpers
- src/app/ - Next.js pages (App Router)
- prisma/ - Database schema and migrations
```

## Include Actionable Information

### Not Actionable
```markdown
We use TypeScript.
```

### Actionable
```markdown
## TypeScript
- Strict mode enabled
- Use explicit return types on exported functions
- Prefer interfaces over types for objects
- Zod for runtime validation
```

## Tell Claude What NOT to Do

Negative constraints are powerful:

```markdown
## Don'ts
- Don't add comments explaining obvious code
- Don't use `any` type
- Don't create utility functions for one-time operations
- Don't add error handling for impossible cases
```

## Include Build/Run Commands

```markdown
## Commands

### Development
```bash
npm run dev
```

### Testing
```bash
npm test              # All tests
npm test -- --watch   # Watch mode
npm test -- file.test # Single file
```

### Build
```bash
npm run build
npm start
```
```

## Document Conventions Clearly

### Naming
```markdown
## Naming
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Constants: UPPER_SNAKE (MAX_RETRIES)
- Files: kebab-case (user-service.ts)
```

### Patterns
```markdown
## Patterns
- Data fetching: Server Components with fetch
- Forms: React Hook Form + Zod
- State: URL state for filters, React state for UI
- Errors: Error boundaries at route level
```

## Context That Helps

### Good Context
```markdown
## Current Work
- Migrating from pages/ to app/ router
- Auth currently uses NextAuth, moving to Clerk

## Known Issues
- /api/users endpoint is slow, needs caching
- Mobile nav breaks at 768px

## External Services
- Stripe for payments (test mode)
- Resend for email
- Vercel Blob for file uploads
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
Link to detailed docs instead of copying them:
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

## Template Selection Guide

| Your Project | Use Template |
|--------------|--------------|
| New to Claude Code | [basic.md](./templates/basic.md) |
| Next.js/React | [nextjs.md](./templates/nextjs.md) |
| Python/FastAPI | [python.md](./templates/python.md) |
| Multiple packages | [monorepo.md](./templates/monorepo.md) |
| React Native | [mobile.md](./templates/mobile.md) |

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

[← CLAUDE.md](./README.md) | [Templates →](./templates/basic.md)
