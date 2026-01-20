# Monorepo CLAUDE.md Template

For projects with multiple packages/apps.

---

```markdown
# Monorepo Name

[Brief description of the overall project]

## Tech Stack

- Package Manager: [pnpm / npm / yarn] workspaces
- Build System: [Turborepo / Nx / Lerna]
- Languages: TypeScript
- Shared: ESLint, Prettier, TypeScript configs

## Monorepo Structure

```
monorepo/
├── apps/
│   ├── web/              # Main web application
│   ├── api/              # Backend API
│   ├── admin/            # Admin dashboard
│   └── docs/             # Documentation site
├── packages/
│   ├── ui/               # Shared UI components
│   ├── config/           # Shared configs (ESLint, TS, etc.)
│   ├── database/         # Database client and schema
│   └── utils/            # Shared utilities
├── turbo.json            # Turborepo config
├── pnpm-workspace.yaml   # Workspace definition
└── package.json          # Root package.json
```

## Package Descriptions

### Apps

| App | Description | Port |
|-----|-------------|------|
| `web` | Main Next.js app | 3000 |
| `api` | Express/Fastify API | 4000 |
| `admin` | Admin dashboard | 3001 |
| `docs` | Documentation | 3002 |

### Packages

| Package | Description | Used By |
|---------|-------------|---------|
| `@repo/ui` | Shared React components | web, admin |
| `@repo/config` | ESLint, TS, Prettier configs | all |
| `@repo/database` | Prisma client | api, web |
| `@repo/utils` | Shared utilities | all |

## Conventions

### Package Naming
- Apps: lowercase (web, api, admin)
- Packages: @repo/package-name

### Imports Between Packages
```typescript
// In apps/web
import { Button } from '@repo/ui'
import { db } from '@repo/database'
import { formatDate } from '@repo/utils'
```

### New Package Checklist
1. Create directory in packages/
2. Add package.json with @repo/ prefix
3. Add to workspace config
4. Configure TypeScript references
5. Add to Turbo pipeline if needed

## Commands

### Root Commands
```bash
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all packages and apps
pnpm lint             # Lint everything
pnpm test             # Test everything
pnpm clean            # Clean all build outputs
```

### Filtered Commands
```bash
pnpm --filter web dev           # Run single app
pnpm --filter @repo/ui build    # Build single package
pnpm --filter "./apps/*" build  # Build all apps
```

### Adding Dependencies
```bash
# To a specific package
pnpm --filter web add lodash

# To multiple packages
pnpm --filter "@repo/*" add typescript -D

# To root (dev tools)
pnpm add -w -D turbo
```

## Development Workflow

### Starting Development
```bash
pnpm install    # Install all dependencies
pnpm dev        # Start all apps
```

### Working on One App
```bash
pnpm --filter web dev
```

### Working on Shared Package
```bash
# Terminal 1: Watch package
pnpm --filter @repo/ui dev

# Terminal 2: App that uses it
pnpm --filter web dev
```

## Build Order

Turbo handles build order automatically, but the dependency graph is:

```
@repo/config → @repo/utils → @repo/database → @repo/ui → apps/*
```

## Don'ts

- Don't import between apps directly (use packages)
- Don't add dependencies to root unless truly shared
- Don't bypass TypeScript project references
- Don't skip running full build before PRs

## Per-App Notes

### apps/web
```
# Web-specific CLAUDE.md content
[See apps/web/CLAUDE.md for details]
```

### apps/api
```
# API-specific CLAUDE.md content
[See apps/api/CLAUDE.md for details]
```

## Notes

[Overall project notes, current work, etc.]
```

---

## Per-Package CLAUDE.md

Each app/package can have its own CLAUDE.md for specific context:

```
apps/web/CLAUDE.md
packages/ui/CLAUDE.md
```

Claude will merge them automatically.
