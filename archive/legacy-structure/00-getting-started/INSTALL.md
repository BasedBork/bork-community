# Installing Claude Code

Platform-specific installation instructions.

## Requirements

- **Node.js 18+**: Check with `node --version`
- **Claude account**: Pro, Max, or API access
- **npm or yarn**: Comes with Node.js

## macOS

### Using npm (Recommended)
```bash
npm install -g @anthropic-ai/claude-code
```

### Using Homebrew
```bash
brew install claude-code
```

### Verify Installation
```bash
claude --version
```

## Windows

### Using npm
```powershell
npm install -g @anthropic-ai/claude-code
```

### Using winget
```powershell
winget install Anthropic.ClaudeCode
```

### Note for Windows Users
- Use PowerShell or Windows Terminal (not cmd.exe)
- Run as administrator if you get permission errors

## Linux

### Using npm
```bash
npm install -g @anthropic-ai/claude-code
```

### Using curl
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Permissions
If you get EACCES errors:
```bash
# Option 1: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Option 2: Use nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
npm install -g @anthropic-ai/claude-code
```

## Authentication

First run will prompt for authentication:

```bash
claude
# Opens browser for Anthropic account login
```

Or authenticate manually:
```bash
claude auth login
```

## Updating

```bash
npm update -g @anthropic-ai/claude-code
```

Check for updates:
```bash
claude --version
```

## Uninstalling

```bash
npm uninstall -g @anthropic-ai/claude-code
```

## Troubleshooting

### "command not found: claude"
Your npm global bin isn't in PATH:
```bash
# Find where npm installs global packages
npm config get prefix

# Add to PATH (adjust path as needed)
export PATH="$(npm config get prefix)/bin:$PATH"
```

### Permission Denied (Linux/Mac)
```bash
sudo npm install -g @anthropic-ai/claude-code
```
Or fix npm permissions (see Linux section above).

### Node Version Too Old
```bash
# Check version
node --version

# Update via nvm
nvm install node
nvm use node
```

### Authentication Issues
```bash
# Clear auth and re-login
claude auth logout
claude auth login
```

## Next Steps

Installation complete? Start your first session:
- [FIRST_SESSION.md](./FIRST_SESSION.md) - Your first 15 minutes

---

[← Getting Started](./README.md) | [First Session →](./FIRST_SESSION.md)
