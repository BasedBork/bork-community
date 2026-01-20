# Companion Tools

Tools that enhance your Claude Code experience.

## Voice Input

### WhisperFlow
Voice-to-text for natural interaction with Claude.

**Why use it:**
- Faster than typing for complex requests
- More natural conversation flow
- Hands-free coding

**Setup:**
- macOS: Available via Homebrew
- Windows: See project documentation
- Linux: Various options available

### Other Voice Tools
- macOS Dictation (built-in)
- Windows Voice Typing
- Talon Voice

## Terminal Enhancements

### Warp
Modern terminal with AI features.

**Benefits with Claude Code:**
- Better output rendering
- Command history
- Workflow blocks

### iTerm2 (macOS)
Feature-rich terminal.

**Useful features:**
- Split panes for multiple Claudes
- Triggers for notifications
- Shell integration

### Windows Terminal
Modern Windows terminal.

**Benefits:**
- Multiple tabs
- Better rendering
- WSL integration

## Note-Taking Integration

### Obsidian
Markdown-based knowledge management.

**Claude Code integration:**
- Claude reads/writes Obsidian vaults
- Link notes during research
- Generate content from notes

See [Obsidian Workflow](../09-workflows/OBSIDIAN_WORKFLOW.md)

### Notion
Collaborative workspace.

**With MCP:**
- Search Notion from Claude
- Create pages
- Update databases

See [Notion MCP Config](../08-mcp/configs/notion.md)

## Code Editors

### VS Code
- Claude Code runs in integrated terminal
- See file changes in real-time
- Use alongside traditional editing

### Cursor
AI-powered editor with Claude support.

**Note:** Different product from Claude Code. Can be used together.

### JetBrains IDEs
- Run Claude Code in terminal
- View changes in IDE

## Version Control

### GitHub CLI (gh)
Claude Code works great with gh:

```bash
gh pr create
gh issue list
gh repo clone
```

**With MCP:**
Full GitHub integration through MCP server.

### GitKraken / Tower
Visual git clients.

**Workflow:**
1. Claude makes changes
2. Review in visual client
3. Commit with context

## Deployment Tools

### Vercel CLI
```bash
vercel deploy
vercel env pull
```

Claude can use these directly.

### Railway CLI
Alternative to Vercel for backend:
```bash
railway up
railway logs
```

### Supabase CLI
Database management:
```bash
supabase db push
supabase functions deploy
```

## Productivity

### Rectangle (macOS)
Window management for split-screen coding.

**Typical setup:**
- Half screen: Terminal with Claude
- Half screen: Code editor

### Alfred / Raycast
Launcher utilities.

**Quick actions:**
- Open terminal in project
- Start Claude Code
- Run common commands

## Monitoring

### Sentry
Error monitoring for deployed apps.

**Integration:**
Claude can help set up Sentry and debug reported errors.

### Vercel Analytics
Built into Vercel deployments.

## API Development

### Postman / Insomnia
API testing tools.

**Workflow:**
1. Claude generates API endpoints
2. Test in Postman
3. Claude fixes issues

### HTTPie
CLI HTTP client:
```bash
http GET localhost:3000/api/users
```

Claude can use this for API testing.

## Security

### 1Password CLI
Manage secrets:
```bash
op read "op://vault/item/field"
```

**Safe credential handling with Claude.**

### dotenv-vault
Environment variable encryption.

## Contributing

Know a tool that works great with Claude Code?
- Add via PR
- Include brief description
- Note any setup requirements

---

[← Articles](./ARTICLES.md) | [Back to Resources](./README.md)
