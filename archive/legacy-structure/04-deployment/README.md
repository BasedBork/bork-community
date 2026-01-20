# Deployment

Put your project on the internet.

## Overview

You built something. Now let the world see it. This section covers the full deployment pipeline:

```
Local Project → GitHub → Vercel → Live URL
                           ↓
                      Supabase (optional: database/auth)
                           ↓
                    Custom Domain (optional)
```

## Guides

| Guide | What It Covers |
|-------|----------------|
| [GitHub](./GITHUB.md) | Push your code to a repository |
| [Vercel](./VERCEL.md) | Deploy your site/app |
| [Supabase](./SUPABASE.md) | Add database and authentication |
| [Custom Domain](./CUSTOM_DOMAIN.md) | Use your own domain name |

## Quick Path

**Just want to ship fast?**

1. [Push to GitHub](./GITHUB.md) (5 min)
2. [Deploy on Vercel](./VERCEL.md) (5 min)

You'll have a live URL in 10 minutes.

## When to Use What

### Static Sites (HTML/CSS/JS)
- GitHub → Vercel
- No backend needed
- Free tier works great

### Next.js / React Apps
- GitHub → Vercel
- Vercel is optimized for Next.js
- Serverless functions included

### Apps with Data
- GitHub → Vercel → Supabase
- Supabase handles database + auth
- Generous free tier

### Professional Projects
- All of the above + Custom Domain
- Looks more legit
- Better for portfolios/businesses

## Cost Overview

| Service | Free Tier | When You Pay |
|---------|-----------|--------------|
| GitHub | Unlimited public repos | Private repos with advanced features |
| Vercel | 100GB bandwidth, serverless | High traffic, team features |
| Supabase | 500MB database, 50K users | More storage, users, or features |
| Domain | - | ~$10-15/year for .com |

Most hobby projects stay free forever.

## Deployment with Claude Code

Claude can help with deployment too:

```
claude> Help me set up this project for deployment on Vercel
```

```
claude> Create a GitHub Actions workflow for CI/CD
```

```
claude> Set up environment variables for production
```

---

[← First Projects](../03-first-projects/) | [GitHub →](./GITHUB.md)
