# Adding Supabase

Database, authentication, and storage for your app.

## What is Supabase?

Supabase is an open-source Firebase alternative. It provides:
- PostgreSQL database
- Authentication (email, social logins)
- File storage
- Realtime subscriptions
- Edge functions

All with a generous free tier.

## When to Use Supabase

**Use Supabase when you need:**
- User accounts and authentication
- Persistent data (beyond localStorage)
- Multiple users sharing data
- File uploads

**Skip Supabase if:**
- Static site (no user data)
- Data is per-device only (localStorage is fine)
- You're just learning (add it later)

## Prerequisites

- Vercel project deployed
- Supabase account ([supabase.com](https://supabase.com))

---

## Quick Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Sign in
3. "New Project"
4. Choose a name and region (pick one close to you)
5. Set a database password (save this!)
6. Wait for project to provision (~2 min)

### Step 2: Get Your Keys

In your Supabase dashboard:

1. Go to Settings → API
2. Copy:
   - Project URL
   - `anon` public key

### Step 3: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 4: Configure Environment Variables

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Add the same variables in Vercel dashboard.

### Step 5: Initialize Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

---

## Adding Authentication

### Enable Providers

In Supabase dashboard:
1. Authentication → Providers
2. Enable Email, Google, GitHub, etc.

### Sign Up / Sign In

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Sign out
await supabase.auth.signOut()

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

### OAuth (Google, GitHub)

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
})
```

Configure OAuth providers in Supabase dashboard with your client IDs.

---

## Creating a Database Table

### Using Dashboard

1. Table Editor → New Table
2. Add columns
3. Enable Row Level Security (RLS)

### Using SQL

```sql
create table todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  text text not null,
  completed boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table todos enable row level security;

-- Policy: users can only see their own todos
create policy "Users can view own todos"
  on todos for select
  using (auth.uid() = user_id);

-- Policy: users can insert their own todos
create policy "Users can insert own todos"
  on todos for insert
  with check (auth.uid() = user_id);
```

---

## CRUD Operations

### Read
```typescript
const { data: todos, error } = await supabase
  .from('todos')
  .select('*')
  .order('created_at', { ascending: false })
```

### Create
```typescript
const { data, error } = await supabase
  .from('todos')
  .insert({ text: 'New todo', user_id: user.id })
  .select()
```

### Update
```typescript
const { data, error } = await supabase
  .from('todos')
  .update({ completed: true })
  .eq('id', todoId)
```

### Delete
```typescript
const { error } = await supabase
  .from('todos')
  .delete()
  .eq('id', todoId)
```

---

## Using Claude Code with Supabase

Claude can help you set up Supabase:

```
claude> Set up Supabase authentication for this Next.js app.
Include sign up, sign in, and sign out functionality.
```

```
claude> Create a todos table in Supabase with proper RLS policies
for a multi-user todo app.
```

```
claude> Convert my localStorage-based todo app to use Supabase
for persistence.
```

---

## Row Level Security (RLS)

**Important:** Always enable RLS on tables with user data.

Without RLS, any user can read/write any data. With RLS, you define policies:

```sql
-- Users can only see their own data
create policy "Own data only"
  on todos for all
  using (auth.uid() = user_id);
```

---

## Common Patterns

### Protected Routes (Next.js)

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}
```

### Realtime Subscriptions

```typescript
const channel = supabase
  .channel('todos')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'todos' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()
```

---

## Free Tier Limits

| Resource | Free Limit |
|----------|------------|
| Database | 500 MB |
| File storage | 1 GB |
| Bandwidth | 2 GB |
| Auth users | 50,000 MAU |
| Edge functions | 500K invocations |

Plenty for most hobby projects.

---

## Common Issues

### "Permission denied"
RLS is blocking the request. Check your policies:
```sql
-- See existing policies
select * from pg_policies where tablename = 'todos';
```

### Environment Variables Not Working
- Verify they start with `NEXT_PUBLIC_`
- Restart dev server after changes
- Redeploy on Vercel after adding

### Auth Not Persisting
Make sure you're using the auth helpers for your framework:
```bash
npm install @supabase/auth-helpers-nextjs
```

---

## Next Steps

1. **[Add a custom domain](./CUSTOM_DOMAIN.md)** - Look professional
2. **Explore Supabase features** - Storage, Edge Functions, Realtime
3. **Check out [guides](../guides/BUILDING_APPS.md)** - Full stack tutorials

---

[← Vercel](./VERCEL.md) | [Custom Domain →](./CUSTOM_DOMAIN.md)
