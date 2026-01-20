# MCP Setup Guide

How to add and configure MCP servers in Claude Code.

## Configuration File

MCP servers are configured in `~/.claude/mcp.json`:

```json
{
  "servers": {
    "server-name": {
      "command": "command-to-run",
      "args": ["optional", "arguments"],
      "env": {
        "ENV_VAR": "value"
      }
    }
  }
}
```

## Installation Methods

### npm (Most Common)

```bash
# Install globally
npm install -g @anthropic/mcp-server-github

# Or locally in a project
npm install @anthropic/mcp-server-github
```

### From Source

```bash
git clone https://github.com/author/mcp-server-example
cd mcp-server-example
npm install
npm run build
```

## Adding a Server

### Step 1: Install the Server

```bash
npm install -g @anthropic/mcp-server-github
```

### Step 2: Get Credentials

Most servers need API tokens or keys:
- GitHub: Personal Access Token
- Notion: Integration Token
- Slack: Bot Token

### Step 3: Configure

Add to `~/.claude/mcp.json`:

```json
{
  "servers": {
    "github": {
      "command": "mcp-server-github",
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    }
  }
}
```

### Step 4: Restart Claude Code

```bash
# Exit current session
exit

# Start new session
claude
```

### Step 5: Verify

```
claude> What MCP tools are available?
```

Claude should list the tools from your configured servers.

## Multiple Servers

Configure as many servers as needed:

```json
{
  "servers": {
    "github": {
      "command": "mcp-server-github",
      "env": {
        "GITHUB_TOKEN": "ghp_xxx"
      }
    },
    "notion": {
      "command": "mcp-server-notion",
      "env": {
        "NOTION_TOKEN": "secret_xxx"
      }
    },
    "slack": {
      "command": "mcp-server-slack",
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-xxx"
      }
    }
  }
}
```

## Server Types

### stdio (Default)
Server communicates via stdin/stdout:
```json
{
  "command": "mcp-server-example"
}
```

### HTTP
Server runs as HTTP service:
```json
{
  "url": "http://localhost:3000/mcp"
}
```

## Environment Variables

### From File
Reference a file for secrets:
```json
{
  "env": {
    "TOKEN": {"file": "~/.secrets/github-token"}
  }
}
```

### From System
Use existing environment variables:
```json
{
  "env": {
    "TOKEN": {"env": "GITHUB_TOKEN"}
  }
}
```

## Troubleshooting

### Server Not Loading

1. Check the command exists:
```bash
which mcp-server-github
```

2. Verify the config syntax:
```bash
cat ~/.claude/mcp.json | jq .
```

3. Check Claude Code logs:
```bash
cat ~/.claude/logs/mcp.log
```

### Authentication Errors

1. Verify credentials are correct
2. Check token permissions/scopes
3. Ensure token hasn't expired

### Server Crashes

1. Run server manually to see errors:
```bash
GITHUB_TOKEN=xxx mcp-server-github
```

2. Check for version mismatches
3. Look for missing dependencies

## Project-Specific Config

For project-specific MCP servers, create `.claude/mcp.json` in your project:

```json
{
  "servers": {
    "project-db": {
      "command": "mcp-server-postgres",
      "env": {
        "DATABASE_URL": "postgres://localhost/mydb"
      }
    }
  }
}
```

Project config merges with global config.

## Security Best Practices

### Minimal Permissions
Only grant the permissions the server needs:
- Read-only when possible
- Specific repos/channels, not all

### Credential Storage
- Use environment variables or secret files
- Never commit tokens to git
- Rotate tokens regularly

### Trusted Sources
- Install from official sources
- Review server code when possible
- Check for security advisories

---

[← MCP](./README.md) | [GitHub Config →](./configs/github.md)
