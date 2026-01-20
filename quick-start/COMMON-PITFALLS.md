# Common Pitfalls

Solutions to frequent Claude Code issues.

## Installation Issues

### "command not found: claude"

Your npm global bin directory isn't in your PATH.

**Fix:**
```bash
# Find where npm installs globals
npm config get prefix

# Add to your shell config
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

For bash users, use `~/.bashrc` instead.

### Permission Denied During Install

**macOS/Linux:**
```bash
# Option 1: Use sudo (quick fix)
sudo npm install -g @anthropic-ai/claude-code

# Option 2: Fix npm permissions (better)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
npm install -g @anthropic-ai/claude-code
```

**Windows:** Run PowerShell as Administrator.

### Node Version Too Old

```bash
node --version  # Need 18+

# Update with nvm
nvm install 18
nvm use 18
```

## Authentication Issues

### "Not authenticated" Error

```bash
claude auth logout
claude auth login
```

### Browser Doesn't Open for Login

Copy the URL shown in terminal and paste in your browser manually.

### API Key Issues

```bash
export ANTHROPIC_API_KEY="your-key-here"
# Or add to ~/.zshrc for persistence
```

## Session Issues

### Claude Seems Confused

Context might be polluted. Reset it:
```
claude> /clear
```

### Claude Keeps Making Wrong Changes

Be more specific:
```
# Instead of:
claude> fix the bug

# Try:
claude> fix the bug in src/auth.js where login returns undefined when password is empty
```

### Claude Doesn't See My Files

Make sure you're in the right directory:
```bash
pwd  # Check current directory
ls   # Verify your files are here
```

### Session Crashed

Just restart:
```bash
claude
```

Your changes are saved. Check Git status:
```bash
git status
git diff
```

## Common Mistakes

### 1. Skipping Plan Mode for Complex Tasks

**Problem:** Claude dives in without thinking, makes wrong assumptions.

**Solution:** Use plan mode for anything non-trivial:
```
claude> plan: Add authentication to this app
```

### 2. Not Using CLAUDE.md

**Problem:** Claude has to rediscover your project every session.

**Solution:** Create a CLAUDE.md with your tech stack and conventions.

### 3. Vague Requests

**Problem:**
```
claude> make it better
```

**Solution:**
```
claude> Add input validation to the signup form that checks email format and password strength
```

### 4. Not Reviewing Changes

**Problem:** Approving changes without reading them.

**Solution:** Always review the diff before pressing `y`. Use `e` to edit if needed.

### 5. Context Pollution

**Problem:** Working on unrelated tasks in the same session causes confusion.

**Solution:** Use `/clear` when switching to a new task.

### 6. Not Using Git

**Problem:** No safety net when changes go wrong.

**Solution:** Commit before major changes:
```bash
git commit -am "checkpoint before AI changes"
```

## Performance Issues

### Slow Responses

- Check your internet connection
- Large files slow down context loading
- Use `/clear` to reduce context size

### High Token Usage

Check usage:
```
claude> /stats
```

Reduce context:
- `/clear` between unrelated tasks
- Be specific to avoid unnecessary exploration
- Use CLAUDE.md to guide Claude to relevant files

## File and Edit Issues

### Changes Applied to Wrong File

```
claude> /undo
claude> Edit the login function in src/auth/login.js, not src/utils/login.js
```

### Can't Undo

`/undo` only works for recent changes. For older changes:
```bash
git checkout -- filename.js
# or
git reset --hard HEAD
```

## Platform-Specific Issues

### macOS: "developer cannot be verified"

```bash
xattr -d com.apple.quarantine $(which claude)
```

### Windows: Line Ending Issues

```bash
git config --global core.autocrlf true
```

### Linux: Snap/Flatpak Conflicts

Use system Node instead of containerized:
```bash
which node  # Should be /usr/bin/node
```

## Getting More Help

### Check Version
```bash
claude --version
```

### Enable Verbose Mode
```bash
claude --verbose
```

### Report Issues

1. Note your OS, Node version, and Claude Code version
2. Copy any error messages
3. Open an issue at [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

### Community Help

- [BORK X Community](https://x.com/basedborkcto)
- [Anthropic Discord](https://discord.gg/anthropic)

---

[← CLAUDE.md Setup](./CLAUDE-MD-SETUP.md) | [Back to Quick Start](./README.md)
