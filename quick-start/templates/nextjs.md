# Next.js CLAUDE.md Template

Optimized for Next.js projects (App Router).

---

```markdown
# Project Name

[Brief description]

## Tech Stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- [Database]: Prisma with PostgreSQL / Drizzle / etc.
- [Auth]: NextAuth / Clerk / Auth.js
- [Deployment]: Vercel

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Dashboard route group
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components
│   └── [feature]/         # Feature-specific components
├── lib/
│   ├── db.ts              # Database client
│   ├── auth.ts            # Auth configuration
│   └── utils.ts           # Utility functions
├── hooks/                  # Custom React hooks
└── types/                  # TypeScript types
```

## Conventions

### Components
- Server Components by default
- 'use client' only when needed (interactivity, hooks)
- Colocate components with their routes when possible

### Data Fetching
- Server Components: fetch() or direct DB queries
- Client Components: React Query / SWR for caching
- Server Actions for mutations

### Styling
- Tailwind CSS for all styling
- Use cn() utility for conditional classes
- Component variants with cva() when needed

### Naming
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Route files: lowercase (page.tsx, layout.tsx)

## Commands

### Development
```bash
npm run dev
```

### Database
```bash
npx prisma studio     # Open Prisma Studio
npx prisma db push    # Push schema changes
npx prisma generate   # Generate client
```

### Testing
```bash
npm test              # Run all tests
npm run test:e2e      # E2E tests (Playwright)
```

### Build
```bash
npm run build
npm start
```

## Patterns

### Server Actions
```typescript
'use server'

export async function createPost(formData: FormData) {
  // Validate with Zod
  // Insert to database
  // revalidatePath() if needed
}
```

### Protected Routes
```typescript
// In layout.tsx or page.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const session = await auth()
if (!session) redirect('/login')
```

## Don'ts

- Don't use 'use client' unnecessarily
- Don't fetch data in Client Components (use Server Components)
- Don't use useEffect for data fetching
- Don't put API keys in client code
- Don't skip loading/error states

## Environment Variables

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## Notes

[Project-specific notes, current work, known issues]
```

---

## Customization Tips

1. **Remove what you don't use**: If no auth, remove auth sections
2. **Add your specific patterns**: Document how you do things
3. **Keep it current**: Update when stack changes
