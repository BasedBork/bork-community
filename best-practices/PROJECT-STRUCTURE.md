# Project Structure

How to organize your codebase for effective Claude Code sessions.

## Why Structure Matters

Claude works best when it can:
- Find relevant files quickly
- Understand relationships between components
- Follow consistent patterns
- Navigate without reading everything

## General Principles

### 1. Colocate Related Files

Keep related files together:

```
# Good - related files are together
src/features/auth/
├── AuthForm.tsx
├── AuthForm.test.tsx
├── useAuth.ts
├── auth.api.ts
└── types.ts

# Less ideal - files scattered by type
src/
├── components/AuthForm.tsx
├── hooks/useAuth.ts
├── api/auth.api.ts
├── tests/AuthForm.test.tsx
└── types/auth.types.ts
```

### 2. Use Descriptive Names

```
# Good - clear what each file does
src/
├── UserProfile.tsx
├── validateEmail.ts
├── formatDate.ts
└── useUserData.ts

# Less ideal - vague names
src/
├── Profile.tsx
├── validate.ts
├── format.ts
└── useData.ts
```

### 3. Keep Files Focused

One component, hook, or utility per file:

```
# Good - single responsibility
src/utils/
├── formatDate.ts
├── formatCurrency.ts
└── formatPhoneNumber.ts

# Less ideal - everything in one file
src/utils/format.ts  # 500 lines with all formatters
```

## Framework-Specific Structures

### Next.js (App Router)

```
project/
├── CLAUDE.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   └── (dashboard)/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/           # Generic components
│   │   └── features/     # Feature-specific
│   ├── lib/              # Utilities and helpers
│   └── hooks/            # Custom React hooks
├── prisma/
│   └── schema.prisma
└── tests/
```

### React (Vite/CRA)

```
project/
├── CLAUDE.md
├── src/
│   ├── components/
│   │   ├── common/       # Shared components
│   │   └── features/     # Feature components
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   ├── services/         # API calls
│   ├── utils/
│   └── types/
└── tests/
```

### Python (FastAPI)

```
project/
├── CLAUDE.md
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── routes/
│   │   └── dependencies.py
│   ├── models/
│   ├── schemas/
│   ├── services/
│   └── utils/
├── tests/
├── alembic/              # Migrations
└── requirements.txt
```

### Node.js (Express)

```
project/
├── CLAUDE.md
├── src/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   └── utils/
├── tests/
└── package.json
```

## Monorepo Structure

```
monorepo/
├── CLAUDE.md             # Repo-wide config
├── packages/
│   ├── web/
│   │   ├── CLAUDE.md     # Web-specific config
│   │   └── src/
│   ├── api/
│   │   ├── CLAUDE.md     # API-specific config
│   │   └── src/
│   └── shared/
│       └── src/
├── apps/
└── package.json
```

## CLAUDE.md Placement

```
project/
├── CLAUDE.md             # Main config (must be here)
├── docs/
│   └── CLAUDE.md         # Optional: docs-specific rules
└── packages/
    └── web/
        └── CLAUDE.md     # Optional: package-specific rules
```

Claude reads from root up, merging configs with more specific ones taking precedence.

## Tips for Claude

### Include an Index

In CLAUDE.md, list your main directories:

```markdown
## Structure
- src/app/ - Next.js pages and API routes
- src/components/ - React components
- src/lib/ - Utilities and helpers
- prisma/ - Database schema
```

### Mark Important Files

```markdown
## Key Files
- src/lib/auth.ts - All authentication logic
- src/lib/api.ts - API client with error handling
- prisma/schema.prisma - Database schema
```

### Note Conventions

```markdown
## Conventions
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Tests: *.test.ts next to source
```

### Document Commands

```markdown
## Commands
- npm run dev - Development server
- npm test - Run tests
- npm run db:migrate - Run migrations
```

## Anti-Patterns to Avoid

### Giant Files

Break up files over 300 lines:
```
# Bad
src/utils/helpers.ts  # 1000 lines

# Good
src/utils/
├── date.ts
├── currency.ts
└── validation.ts
```

### Deep Nesting

Keep paths shallow (max 4-5 levels):
```
# Bad
src/features/user/profile/components/forms/inputs/TextInput.tsx

# Good
src/features/user-profile/TextInput.tsx
```

### Ambiguous Names

```
# Bad
src/components/Item.tsx    # Which item?
src/utils/process.ts       # Process what?

# Good
src/components/CartItem.tsx
src/utils/processPayment.ts
```

### Missing Types

In TypeScript projects, keep types close to usage:
```
src/features/auth/
├── AuthForm.tsx
├── auth.api.ts
└── types.ts      # Auth-specific types here
```

---

[← Context Management](./CONTEXT-MANAGEMENT.md) | [CLAUDE.md Guide →](./CLAUDE-MD-GUIDE.md)
