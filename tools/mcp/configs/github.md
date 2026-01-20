# GitHub MCP Configuration

Connect Claude Code to GitHub for repository management.

## What You Can Do

- Read and create issues
- Review and create pull requests
- Search code and repositories
- Manage branches and releases
- View notifications

## Setup

### 1. Create GitHub Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. Select scopes:
   - `repo` - Full repository access
   - `read:org` - Read organization info
   - `notifications` - Access notifications

### 2. Install Server

```bash
npm install -g @anthropic/mcp-server-github
```

### 3. Configure

Add to `~/.claude/mcp.json`:

```json
{
  "servers": {
    "github": {
      "command": "mcp-server-github",
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

### 4. Restart Claude Code

## Available Tools

### Issues
```
claude> List open issues in owner/repo
claude> Create an issue titled "Bug: login fails"
claude> Close issue #42 with comment "Fixed in PR #43"
```

### Pull Requests
```
claude> Show open PRs in owner/repo
claude> Review PR #15
claude> Create a PR from feature-branch to main
```

### Code Search
```
claude> Search for "authentication" in owner/repo
claude> Find files containing "TODO" in this repo
```

### Repository Info
```
claude> Show recent commits in owner/repo
claude> List branches
claude> Get release notes for v1.0.0
```

## Example Workflows

### Issue Triage
```
claude> List all open issues in my-org/my-repo labeled "bug"
        and summarize them by priority
```

### PR Review
```
claude> Review the open PR #123. Check for:
        - Security issues
        - Performance concerns
        - Code style
```

### Release Notes
```
claude> Generate release notes for commits since v1.0.0
```

## Permissions Guide

### Minimal (Read-Only)
```
Scopes: public_repo, read:org
```
Can: Read public repos, view issues, view PRs

### Standard
```
Scopes: repo, read:org, notifications
```
Can: Full repo access, create issues/PRs, notifications

### Admin
```
Scopes: repo, admin:org, delete_repo
```
Can: Everything including destructive operations

**Recommendation:** Start with Standard, reduce if you don't need write access.

## Troubleshooting

### "Bad credentials"
- Token might be expired
- Token might have been revoked
- Check for typos in config

### "Not found" for private repos
- Token needs `repo` scope
- Verify you have access to the repo

### Rate limiting
- GitHub has API rate limits
- Consider using a GitHub App for higher limits

---

[← Setup Guide](../SETUP_GUIDE.md) | [Notion Config →](./notion.md)
