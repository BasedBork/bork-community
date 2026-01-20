# Troubleshooting

Solutions to common Claude Code issues.

## Installation Issues

### "command not found: claude"

Your npm global bin directory isn't in your PATH.

**Fix:**
```bash
# Find where npm installs globals
npm config get prefix

# Add to your shell config (adjust path as needed)
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

For bash users, use `~/.bashrc` instead of `~/.zshrc`.

### Permission Denied During Install

**macOS/Linux:**
```bash
# Option 1: Use sudo (quick fix)
sudo npm install -g @anthropic-ai/claude-code

# Option 2: Fix npm permissions (better long-term)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
npm install -g @anthropic-ai/claude-code
```

**Windows:**
Run PowerShell as Administrator.

### Node Version Too Old

```bash
# Check your version
node --version

# Need 18+, upgrade with nvm:
nvm install 18
nvm use 18

# Or download directly from nodejs.org
```

## Authentication Issues

### "Not authenticated" Error

```bash
# Re-authenticate
claude auth logout
claude auth login
```

### Browser Doesn't Open for Login

```bash
# Manually visit the URL shown in terminal
# Copy the URL and paste in your browser
```

### API Key Issues

If using API keys instead of OAuth:
```bash
# Set your API key
export ANTHROPIC_API_KEY="your-key-here"

# Or in your shell config
echo 'export ANTHROPIC_API_KEY="your-key"' >> ~/.zshrc
```

## Session Issues

### Claude Seems Confused

Context might be polluted. Reset it:
```
claude> /clear
```

### Claude Keeps Making Wrong Changes

Be more specific in your request:
```
# Instead of:
claude> fix the bug

# Try:
claude> fix the bug in src/auth.js where the login function returns undefined when the password is empty
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
- Use `/clear` between unrelated tasks
- Be specific to avoid unnecessary exploration
- Use CLAUDE.md to guide Claude to relevant files

## File and Edit Issues

### Changes Applied to Wrong File

Use `/undo` immediately, then be more specific:
```
claude> /undo
claude> Edit the login function in src/auth/login.js, not src/utils/login.js
```

### Edit Conflicts

If Claude's edit conflicts with your recent changes:
1. Deny the change (`n`)
2. Commit your current work
3. Ask Claude to try again

### Can't Undo

`/undo` only works for recent changes. For older changes:
```bash
git checkout -- filename.js
# or
git stash
```

## Network Issues

### Connection Errors

```bash
# Test your connection
curl https://api.anthropic.com

# Check if behind proxy
echo $HTTP_PROXY
echo $HTTPS_PROXY
```

### Timeout Errors

- Check internet connection
- Try again (transient issues)
- For long tasks, Claude may need multiple attempts

## Platform-Specific Issues

### macOS: "developer cannot be verified"

```bash
xattr -d com.apple.quarantine $(which claude)
```

### Windows: Line Ending Issues

Configure Git to handle line endings:
```bash
git config --global core.autocrlf true
```

### Linux: Snap/Flatpak Conflicts

If using containerized Node:
```bash
# Use system Node instead
which node
# Should be /usr/bin/node, not a snap/flatpak path
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

If none of the above helps:
1. Note your OS, Node version, and Claude Code version
2. Copy any error messages
3. Open an issue at [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

### Community Help

- [BORK X Community](https://x.com/basedborkcto)
- [Anthropic Discord](https://discord.gg/anthropic)

---

[← Permissions](./PERMISSIONS.md) | [Back to Getting Started](./README.md)
