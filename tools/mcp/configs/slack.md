# Slack MCP Configuration

Connect Claude Code to Slack for team communication.

## What You Can Do

- Read channel messages
- Send messages
- Search conversations
- List channels and users
- React to messages

## Setup

### 1. Create Slack App

1. Go to [Slack API](https://api.slack.com/apps)
2. Click "Create New App" → "From scratch"
3. Name it and select your workspace

### 2. Configure Permissions

Under "OAuth & Permissions", add scopes:

**Bot Token Scopes:**
- `channels:history` - Read public channel messages
- `channels:read` - List channels
- `chat:write` - Send messages
- `groups:history` - Read private channel messages
- `groups:read` - List private channels
- `im:history` - Read DMs
- `im:read` - List DMs
- `search:read` - Search messages
- `users:read` - List users

### 3. Install to Workspace

1. Under "OAuth & Permissions"
2. Click "Install to Workspace"
3. Authorize the app
4. Copy the "Bot User OAuth Token" (starts with `xoxb-`)

### 4. Install MCP Server

```bash
npm install -g @anthropic/mcp-server-slack
```

### 5. Configure

Add to `~/.claude/mcp.json`:

```json
{
  "servers": {
    "slack": {
      "command": "mcp-server-slack",
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx"
      }
    }
  }
}
```

### 6. Invite Bot to Channels

In Slack:
1. Go to the channel
2. Type `/invite @your-bot-name`

Or mention the bot and Slack will prompt you.

### 7. Restart Claude Code

## Available Tools

### Reading Messages
```
claude> Show recent messages in #general
claude> What were the last 10 messages in #engineering?
```

### Sending Messages
```
claude> Send "Build complete!" to #deployments
claude> Post a message to #standup with today's update
```

### Search
```
claude> Search Slack for "production incident"
claude> Find messages from @alice about the API
```

### Channel Info
```
claude> List all public channels
claude> Show members of #team-backend
```

## Example Workflows

### Standup Summary
```
claude> Summarize today's messages in #standup
```

### Incident Response
```
claude> Search for messages about the outage last Tuesday
        and create a timeline
```

### Notifications
```
claude> Send a message to #releases:
        "Version 2.0.0 deployed successfully"
```

### Context Gathering
```
claude> Find the discussion about the new auth flow
        in #engineering from last week
```

## Permissions Matrix

| Scope | Allows |
|-------|--------|
| `channels:history` | Read public channels |
| `groups:history` | Read private channels |
| `im:history` | Read direct messages |
| `chat:write` | Send messages |
| `search:read` | Search all messages |
| `users:read` | List users |

### Minimal (Read-Only)
```
channels:history, channels:read, users:read
```

### Standard
```
All of the above + chat:write, search:read
```

## Channel Access

The bot can only access:
- Public channels (automatically if `channels:history` scope)
- Private channels (if invited + `groups:history` scope)
- DMs (if in conversation + `im:history` scope)

**The bot must be invited to private channels to read them.**

## Troubleshooting

### "channel_not_found"
- Bot not invited to private channel
- Channel name misspelled

### "not_in_channel"
- Invite bot: `/invite @bot-name`

### Messages not appearing
- Check bot has correct scopes
- Verify bot is in the channel
- Check time range of search

### Rate limits
- Slack has strict rate limits
- Space out requests
- Use search instead of paginating history

---

[← Notion Config](./notion.md) | [Back to MCP](../README.md)
