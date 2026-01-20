# Pushing to GitHub

Get your code on GitHub for backup, collaboration, and deployment.

## Prerequisites

- GitHub account ([github.com](https://github.com))
- Git installed (`git --version` to check)
- A project to push

## Quick Version

```bash
# In your project directory
git init
git add .
git commit -m "Initial commit"
gh repo create my-project --public --push
```

Done. Your code is on GitHub.

---

## Detailed Steps

### Step 1: Initialize Git

If your project isn't already a git repo:

```bash
cd your-project
git init
```

### Step 2: Create .gitignore

Make sure you're not committing things you shouldn't:

```bash
claude> Create a .gitignore file appropriate for this project
```

Common ignores:
```
node_modules/
.env
.env.local
.DS_Store
dist/
build/
*.log
```

### Step 3: Stage and Commit

```bash
git add .
git commit -m "Initial commit"
```

### Step 4: Create GitHub Repository

#### Option A: GitHub CLI (Recommended)

Install GitHub CLI first:
```bash
# macOS
brew install gh

# Windows
winget install GitHub.cli

# Then authenticate
gh auth login
```

Create and push:
```bash
gh repo create my-project --public --push
```

#### Option B: GitHub Website

1. Go to [github.com/new](https://github.com/new)
2. Name your repository
3. Don't initialize with README (you have code already)
4. Copy the remote URL

Then locally:
```bash
git remote add origin https://github.com/yourusername/my-project.git
git branch -M main
git push -u origin main
```

### Step 5: Verify

Visit `https://github.com/yourusername/my-project` to see your code.

---

## Using Claude Code with GitHub

Claude can help with git operations:

### Committing Changes
```
claude> Commit these changes with an appropriate message
```

### Creating Branches
```
claude> Create a new branch called feature/dark-mode
```

### Writing Commit Messages
```
claude> What would be a good commit message for these changes?
```

### Reviewing Before Push
```
claude> Review my staged changes before I commit
```

---

## Best Practices

### Commit Often
Small, focused commits are better than giant ones.

```bash
# Good
git commit -m "Add todo filtering"
git commit -m "Fix localStorage persistence"
git commit -m "Style filter buttons"

# Not as good
git commit -m "Add filtering, fix bugs, update styles"
```

### Write Clear Messages
```bash
# Good
git commit -m "Fix: todos not persisting after refresh"

# Not as good
git commit -m "fix bug"
```

### Use Branches for Features
```bash
git checkout -b feature/dark-mode
# ... make changes ...
git commit -m "Add dark mode toggle"
git push -u origin feature/dark-mode
# Create PR on GitHub
```

### Never Commit Secrets
- API keys
- Database passwords
- `.env` files

Use `.gitignore` and environment variables instead.

---

## Common Issues

### "Permission denied"
```bash
# Check if you're authenticated
gh auth status

# Re-authenticate if needed
gh auth login
```

### "Remote already exists"
```bash
git remote remove origin
git remote add origin NEW_URL
```

### Large Files Rejected
```bash
# If you committed node_modules or other large files
git rm -r --cached node_modules
echo "node_modules/" >> .gitignore
git commit -m "Remove node_modules from tracking"
```

### Wrong Email on Commits
```bash
git config user.email "your@email.com"
git config user.name "Your Name"
```

---

## Private vs Public

**Public Repos:**
- Anyone can see your code
- Free unlimited
- Great for open source, portfolios

**Private Repos:**
- Only you (and collaborators) can see
- Free with limits
- Use for client work, proprietary code

```bash
# Create private
gh repo create my-project --private --push
```

---

## After Pushing

Your code is backed up and ready for:

1. **[Deploying to Vercel](./VERCEL.md)** - Make it live
2. **Collaboration** - Invite others to contribute
3. **CI/CD** - Automate testing and deployment

---

[← Deployment](./README.md) | [Vercel →](./VERCEL.md)
