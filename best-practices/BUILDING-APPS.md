# Building Apps

Full stack development with Claude Code.

## Overview

This guide covers building a complete application:
- Next.js frontend
- Supabase backend
- Vercel deployment
- Production polish

## The Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | Next.js 14 | React with great DX |
| Styling | Tailwind CSS | Rapid styling |
| Database | Supabase | Postgres + Auth + Realtime |
| Deployment | Vercel | Optimal for Next.js |
| Payments | Stripe | Industry standard |

## Phase 1: Setup

### Create Project

```
claude> Create a new Next.js project called "saas-app" with:
        - TypeScript
        - Tailwind CSS
        - App Router
        - ESLint
```

### Initialize Git

```
claude> Initialize git and create initial commit
```

### Create CLAUDE.md

```
claude> Create a CLAUDE.md with:
        - Tech stack
        - Project structure
        - Development commands
        - Coding conventions
```

## Phase 2: Core Features

### Database Schema

```
claude> plan: Design a database schema for a SaaS app with:
        - Users (from Supabase Auth)
        - Organizations (users belong to orgs)
        - Projects (orgs have projects)
        - Tasks (projects have tasks)
```

### Set Up Supabase

```
claude> Create the Supabase schema for this design.
        Include:
        - Tables with proper types
        - Foreign keys
        - Row Level Security policies
        - Indexes for common queries
```

### Authentication

```
claude> Add Supabase auth with:
        - Email/password signup and login
        - Protected routes (middleware)
        - Auth context for client components
        - Session handling
```

### Basic CRUD

```
claude> Create the task management features:
        - List tasks for a project
        - Create new task
        - Update task status
        - Delete task
```

## Phase 3: UI/UX

### Design System

```
claude> /frontend-design
Create a design system with:
- Color palette (light and dark mode)
- Typography scale
- Spacing system
- Component variants (buttons, inputs, cards)
```

### Core Layouts

```
claude> /frontend-design
Build the main layouts:
- Marketing landing page
- Dashboard with sidebar
- Settings page
- Auth pages (login, signup, reset)
```

### Components

```
claude> Build these components:
- TaskCard with status badge
- ProjectSelector dropdown
- UserAvatar with fallback
- EmptyState for no data
```

## Phase 4: Advanced Features

### Real-time Updates

```
claude> Add real-time task updates using Supabase Realtime.
        When a task changes, all users viewing that project
        should see the update immediately.
```

### Search and Filters

```
claude> Add task search and filtering:
        - Text search in title and description
        - Filter by status
        - Filter by assignee
        - Filter by due date range
```

### Notifications

```
claude> Add a notification system:
        - In-app notifications
        - Database table for notifications
        - Mark as read functionality
        - Notification bell with count
```

## Phase 5: Payments

### Stripe Integration

```
claude> Add Stripe subscription billing:
        - Free tier with limits
        - Pro tier with monthly/annual pricing
        - Checkout flow
        - Customer portal for management
        - Webhook handling
```

### Usage Tracking

```
claude> Track usage against plan limits:
        - Number of projects
        - Number of team members
        - Storage used
        - Show upgrade prompts when near limits
```

## Phase 6: Polish

### Error Handling

```
claude> Add comprehensive error handling:
        - Error boundaries for components
        - API error responses
        - User-friendly error messages
        - Error logging (Sentry or similar)
```

### Loading States

```
claude> Add loading states throughout:
        - Skeleton loaders for lists
        - Button loading states
        - Page transitions
        - Optimistic updates
```

### SEO and Meta

```
claude> Add SEO optimization:
        - Meta tags for all pages
        - Open Graph images
        - Sitemap generation
        - robots.txt
```

### Performance

```
claude> Optimize performance:
        - Image optimization
        - Code splitting
        - Lazy loading
        - Caching headers
```

## Phase 7: Deploy

### Environment Setup

```
claude> Create environment configuration:
        - .env.local template
        - Production environment variables
        - Vercel environment setup
```

### Deploy to Vercel

```
claude> Deploy to Vercel:
        - Connect GitHub repository
        - Configure environment variables
        - Set up custom domain
```

### Production Checklist

```
claude> Run through production checklist:
        - [ ] All environment variables set
        - [ ] Database migrations applied
        - [ ] Auth redirect URLs configured
        - [ ] Stripe webhooks configured
        - [ ] Error monitoring active
        - [ ] Analytics configured
```

## Project Structure

```
saas-app/
├── src/
│   ├── app/
│   │   ├── (marketing)/      # Public pages
│   │   ├── (auth)/           # Auth pages
│   │   ├── (dashboard)/      # Protected app
│   │   └── api/              # API routes
│   ├── components/
│   │   ├── ui/               # Generic UI
│   │   └── features/         # Feature-specific
│   ├── lib/
│   │   ├── supabase/         # Supabase clients
│   │   ├── stripe/           # Stripe helpers
│   │   └── utils/            # Utilities
│   ├── hooks/                # Custom hooks
│   └── types/                # TypeScript types
├── supabase/
│   └── migrations/           # Database migrations
└── public/                   # Static assets
```

## Key Patterns

### Server Components for Data

```typescript
// app/(dashboard)/projects/page.tsx
export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}
```

### Client Components for Interactivity

```typescript
'use client';
export function TaskCard({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  // ...
}
```

### Server Actions for Mutations

```typescript
'use server';
export async function createTask(formData: FormData) {
  const data = Object.fromEntries(formData);
  await supabase.from('tasks').insert(data);
  revalidatePath('/tasks');
}
```

## Tips

### Use Plan Mode

For each phase, start with plan mode:
```
claude> plan: Let's implement user authentication
```

### Commit Often

After each feature:
```
claude> Commit these changes with a descriptive message
```

### Test as You Go

```
claude> Write tests for the auth module
```

### Ask for Reviews

```
claude> Review the code I just wrote for security issues
```

---

[← Permissions](./PERMISSIONS.md) | [Back to Best Practices](./README.md)
