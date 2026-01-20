# Notion MCP Configuration

Connect Claude Code to Notion for knowledge management.

## What You Can Do

- Search pages and databases
- Read page content
- Create and update pages
- Query databases
- Manage blocks

## Setup

### 1. Create Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name it (e.g., "Claude Code")
4. Select your workspace
5. Copy the Internal Integration Token

### 2. Share Pages with Integration

For each page/database Claude needs access to:
1. Open the page in Notion
2. Click "..." menu → "Connections"
3. Add your integration

### 3. Install Server

```bash
npm install -g @anthropic/mcp-server-notion
```

### 4. Configure

Add to `~/.claude/mcp.json`:

```json
{
  "servers": {
    "notion": {
      "command": "mcp-server-notion",
      "env": {
        "NOTION_TOKEN": "secret_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

### 5. Restart Claude Code

## Available Tools

### Search
```
claude> Search Notion for "project roadmap"
claude> Find all pages about authentication
```

### Read Pages
```
claude> Read the content of the "API Documentation" page
claude> Get the product roadmap from Notion
```

### Databases
```
claude> Query the tasks database for items due this week
claude> List all entries in the Contacts database
```

### Create/Update
```
claude> Create a new page titled "Meeting Notes - Jan 20"
claude> Add a section to the existing FAQ page
```

## Example Workflows

### Documentation Sync
```
claude> Read the API documentation from Notion and compare
        it to our actual API implementation
```

### Meeting Notes
```
claude> Create a meeting notes page with:
        - Date: today
        - Attendees: list
        - Discussion points: from our conversation
```

### Knowledge Search
```
claude> Search our Notion wiki for how we handle
        user authentication
```

### Database Queries
```
claude> Find all tasks assigned to me that are overdue
```

## Permissions

Notion integrations have access to:
- Only pages explicitly shared with them
- All child pages of shared pages
- Content within shared databases

### Best Practice
Create a top-level page for Claude access and share only that page. Nest everything Claude should access under it.

## Page IDs and URLs

You can reference pages by:
- **URL**: `notion.so/Page-Title-abc123`
- **ID**: `abc123` (last part of URL)
- **Search**: Claude can search by title

## Troubleshooting

### "Page not found"
- Page not shared with integration
- Go to page → "..." → "Connections" → Add your integration

### "Unable to access database"
- Database must be explicitly shared
- Parent page sharing doesn't auto-share databases

### Content Missing
- Integration can only see content, not comments
- Some block types may not be fully supported

---

[← GitHub Config](./github.md) | [Slack Config →](./slack.md)
