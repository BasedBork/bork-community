# Deploying to Vercel

Get your project live on the internet in minutes.

## What is Vercel?

Vercel is a hosting platform optimized for frontend frameworks. It's:
- Free for hobby projects
- Automatic deployments from GitHub
- Optimized for Next.js (they created it)
- Global CDN for fast loading

## Prerequisites

- Code on [GitHub](./GITHUB.md)
- Vercel account ([vercel.com](https://vercel.com))

## Quick Version

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts. You'll have a live URL in under a minute.

---

## Detailed Steps

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Select your GitHub repository
3. Vercel auto-detects your framework

### Step 3: Configure (Usually Automatic)

Vercel detects most settings automatically:

| Framework | Build Command | Output Directory |
|-----------|---------------|------------------|
| Next.js | `next build` | `.next` |
| React (CRA) | `npm run build` | `build` |
| Vite | `npm run build` | `dist` |
| Static HTML | - | `.` |

### Step 4: Deploy

Click "Deploy" and wait ~1 minute.

You'll get a URL like: `your-project.vercel.app`

---

## Environment Variables

If your project needs environment variables:

1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Add your variables

Example:
```
NEXT_PUBLIC_API_URL = https://api.example.com
DATABASE_URL = postgres://...
```

**Important:**
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Keep secrets (API keys, DB URLs) without that prefix

---

## Automatic Deployments

Once connected, Vercel deploys automatically:

| Git Action | Vercel Behavior |
|------------|-----------------|
| Push to `main` | Production deployment |
| Push to other branch | Preview deployment |
| Open PR | Preview deployment with unique URL |

Each PR gets its own preview URL for testing.

---

## Using Vercel CLI

### Install
```bash
npm i -g vercel
```

### Login
```bash
vercel login
```

### Deploy
```bash
# Production
vercel --prod

# Preview
vercel
```

### Environment Variables
```bash
# Add variable
vercel env add DATABASE_URL

# Pull to local .env
vercel env pull
```

---

## Custom Configuration

Create `vercel.json` in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

Most projects don't need this—Vercel's defaults work well.

---

## Deploying Different Project Types

### Static HTML/CSS
Just push to GitHub and import. No build step needed.

### Next.js
Works out of the box. Vercel handles everything.

### React (Create React App)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build"
}
```

### Vite
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

---

## Common Issues

### Build Fails
```
claude> My Vercel build is failing with this error: [paste error]
```

Common causes:
- Missing environment variables
- TypeScript errors (Vercel is stricter)
- Dependencies not in `package.json`

### Environment Variables Not Working

1. Check spelling (exact match required)
2. For client-side: must start with `NEXT_PUBLIC_`
3. Redeploy after adding variables

### "Module not found"

Usually a case sensitivity issue:
```typescript
// Wrong (might work locally on Mac)
import Button from './button'

// Right
import Button from './Button'
```

### Slow Deployments

Check your `.gitignore`:
```
node_modules/
.next/
dist/
```

Don't push build artifacts.

---

## Monitoring

Vercel dashboard shows:
- Deployment history
- Build logs
- Analytics (on Pro plan)
- Function logs (for API routes)

---

## Costs

**Free (Hobby):**
- Unlimited deployments
- 100GB bandwidth/month
- Serverless functions included

**Pro ($20/month):**
- More bandwidth
- Team collaboration
- Advanced analytics

Most personal projects stay free.

---

## Next Steps

1. **[Add a custom domain](./CUSTOM_DOMAIN.md)** - Look more professional
2. **[Add Supabase](./SUPABASE.md)** - If you need a database
3. **Set up preview deployments** - Automatically deploy PRs

---

[← GitHub](./GITHUB.md) | [Supabase →](./SUPABASE.md)
