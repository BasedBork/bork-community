# Custom Domain

Use your own domain instead of `.vercel.app`.

## Why Custom Domain?

- **Professional**: `myapp.com` vs `myapp.vercel.app`
- **Memorable**: Easier to share and remember
- **Branding**: Build your own identity
- **Email**: Enables custom email addresses

## Prerequisites

- Project deployed on [Vercel](./VERCEL.md)
- A domain name (we'll cover how to buy one)

---

## Buying a Domain

### Recommended Registrars

| Registrar | Pros |
|-----------|------|
| [Namecheap](https://namecheap.com) | Cheap, good UI |
| [Cloudflare](https://cloudflare.com) | At-cost pricing, great DNS |
| [Porkbun](https://porkbun.com) | Very cheap, simple |
| [Google Domains](https://domains.google)* | Easy if you use Google |

*Google Domains was acquired by Squarespace

### Pricing

- `.com` domains: ~$10-15/year
- `.dev` domains: ~$12-15/year
- `.io` domains: ~$30-50/year
- `.app` domains: ~$14-20/year

### Tips

- Avoid gimmicky TLDs (`.xyz`, `.ninja`)
- Check for trademark issues
- Enable auto-renewal
- Enable privacy protection (usually free)

---

## Adding Domain to Vercel

### Step 1: Open Domain Settings

1. Go to your Vercel project
2. Settings → Domains
3. Enter your domain name

### Step 2: Choose Configuration

Vercel offers two options:

**Option A: Use Vercel DNS (Easiest)**
- Point nameservers to Vercel
- Vercel handles everything
- Best for simple setups

**Option B: External DNS**
- Keep your current DNS provider
- Add records manually
- Better if you have complex DNS needs

### Step 3: Configure DNS

#### If Using Vercel DNS:

Update nameservers at your registrar to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### If Using External DNS:

Add these records:

For apex domain (`example.com`):
```
Type: A
Name: @
Value: 76.76.21.21
```

For www subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 4: Wait for Propagation

DNS changes can take up to 48 hours, but usually complete within 1-2 hours.

Check propagation: [dnschecker.org](https://dnschecker.org)

### Step 5: SSL Certificate

Vercel automatically provisions SSL certificates. Your site will be HTTPS.

---

## Common Setups

### Apex Domain Only
```
example.com → your Vercel project
www.example.com → redirects to example.com
```

### WWW Primary
```
www.example.com → your Vercel project
example.com → redirects to www.example.com
```

### Subdomain
```
app.example.com → your Vercel project
```

For subdomains, add a CNAME record:
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

---

## Multiple Domains

You can add multiple domains to one project:
- `myapp.com`
- `www.myapp.com`
- `app.mycompany.com`

Vercel will serve the same content on all of them.

---

## Redirects

Set a primary domain and redirect others:

1. Go to Settings → Domains
2. Click the three dots on a domain
3. Select "Set as primary" or "Redirect to primary"

---

## Common Issues

### "Domain not verified"

- DNS records not propagated yet
- Wait 1-2 hours and check again
- Verify records are correct at your registrar

### Certificate Errors

- Usually auto-resolves within 24 hours
- Check that DNS is pointing to Vercel correctly

### "Domain already in use"

- Another Vercel project is using this domain
- Remove it from the other project first

### Mixed Content Warnings

Your site loads HTTP resources on HTTPS:
```
claude> I'm getting mixed content warnings after adding a custom domain.
Help me fix all HTTP references to HTTPS.
```

---

## Vercel Domains

Alternative: Buy directly from Vercel

1. Settings → Domains
2. "Buy" next to the search bar
3. Complete purchase

**Pros:**
- Zero configuration
- Automatic renewal
- Single billing

**Cons:**
- Usually more expensive
- Less control over DNS

---

## Email with Custom Domain

Custom domain enables custom email:

### Option 1: Google Workspace
- `you@yourdomain.com`
- ~$6/user/month

### Option 2: Zoho Mail
- Free tier available
- 5 users free

### Option 3: Fastmail
- Privacy-focused
- ~$5/month

### Option 4: Forward Only
Use a service like ImprovMX to forward `contact@yourdomain.com` to your personal email. Free for basic use.

---

## DNS Records Reference

| Type | Purpose | Example |
|------|---------|---------|
| A | Point domain to IP | `@ → 76.76.21.21` |
| CNAME | Alias to another domain | `www → cname.vercel-dns.com` |
| MX | Email routing | `@ → mail.provider.com` |
| TXT | Verification, SPF, etc. | Varies |

---

## Checklist

- [ ] Domain purchased and accessible
- [ ] DNS records configured
- [ ] Propagation complete (check dnschecker.org)
- [ ] SSL certificate active (automatic)
- [ ] Redirects configured (www vs non-www)
- [ ] Test all pages load correctly

---

## Next Steps

You've shipped a real project to the internet with a custom domain. You're officially a web developer.

What's next?
- [Learn about Skills](../05-skills/) to extend Claude Code
- [Check out advanced workflows](../09-workflows/)
- Build something bigger

---

[← Supabase](./SUPABASE.md) | [Back to Deployment](./README.md)
