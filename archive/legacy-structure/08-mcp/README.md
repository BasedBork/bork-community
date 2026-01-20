# MCP (Model Context Protocol)

Connect Claude Code to external tools and services.

## What is MCP?

MCP (Model Context Protocol) is a standard for connecting AI assistants to external services. It lets Claude Code:

- Access external APIs
- Query databases
- Interact with SaaS tools
- Use specialized services

## Why MCP?

Without MCP, Claude Code only has access to your local files and terminal. With MCP, Claude can:

- Read and update GitHub issues
- Search your Notion workspace
- Send Slack messages
- Query your database
- And much more

## How It Works

```
Claude Code ←→ MCP Server ←→ External Service
                  │
            (translates)
```

MCP servers act as bridges between Claude and external services.

## Available Integrations

### Official Anthropic Servers
- GitHub
- Slack
- Google Drive
- PostgreSQL

### Community Servers
- Notion
- Linear
- Jira
- Firebase
- And many more

## Quick Start

### 1. Install MCP Server

```bash
npm install -g @anthropic/mcp-server-github
```

### 2. Configure in Claude Code

Add to `~/.claude/mcp.json`:

```json
{
  "servers": {
    "github": {
      "command": "mcp-server-github",
      "env": {
        "GITHUB_TOKEN": "your-token"
      }
    }
  }
}
```

### 3. Use It

```
claude> Check my GitHub notifications
claude> List open PRs in my-org/my-repo
claude> Create an issue for this bug
```

## Guides

| Guide | What It Covers |
|-------|----------------|
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | General MCP setup |
| [configs/github.md](./configs/github.md) | GitHub integration |
| [configs/notion.md](./configs/notion.md) | Notion integration |
| [configs/slack.md](./configs/slack.md) | Slack integration |

## Security Considerations

MCP servers have access to your credentials. Be careful:

- Only install trusted servers
- Use minimal permissions (scopes)
- Review server source code when possible
- Rotate credentials regularly

## Finding MCP Servers

- [MCP Server Directory](https://github.com/anthropics/mcp-servers)
- [Awesome MCP](https://github.com/anthropics/awesome-mcp)
- Community contributions

---

[← Agents](../07-agents/) | [Setup Guide →](./SETUP_GUIDE.md)
