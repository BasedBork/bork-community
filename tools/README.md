# Tools

Extend Claude Code with skills, agents, hooks, MCP servers, and workflows.

## What's Here

| Section | What It Covers |
|---------|----------------|
| [Skills](./skills/) | Custom slash commands and specialized behaviors |
| [Agents](./agents/) | Autonomous subagents for complex tasks |
| [Hooks](./hooks/) | Event-driven automation (before/after tool use) |
| [MCP](./mcp/) | Connect to external services (GitHub, Notion, Slack) |
| [Workflows](./workflows/) | Structured patterns for real-world projects |
| [Bots](./bots/) | Standalone bot applications (Telegram, Discord, etc.) |

## Quick Overview

### Skills
Skills are markdown files that teach Claude how to do specific tasks. Think of them as custom slash commands.

```
claude> /smart-commit
```

[Get started with skills](./skills/)

### Agents
Agents are specialized Claude instances that handle specific types of tasks autonomously.

```
claude> Use the security-reviewer agent to audit this code
```

[Get started with agents](./agents/)

### Hooks
Hooks run code automatically when Claude does something. Great for safety, formatting, and notifications.

```yaml
# Block dangerous commands
PreToolUse:
  - if: contains(command, "rm -rf /")
    action: block
```

[Get started with hooks](./hooks/)

### MCP
MCP (Model Context Protocol) connects Claude to external services like GitHub, Notion, and Slack.

```
claude> Check my GitHub notifications
claude> Search my Notion workspace for the API docs
```

[Get started with MCP](./mcp/)

### Workflows
Workflows are structured approaches to complex tasks - TDD, PR reviews, content creation, and more.

```
claude> Let's use the TDD workflow to build this feature
```

[Get started with workflows](./workflows/)

### Bots
Bots are standalone applications built by the community - Telegram bots, Discord bots, and more.

```
# Deploy a Solana price tracking bot
cd tools/bots/solana-price-monitor
npm install && npm run build
```

[Browse community bots](./bots/)

## Installation

### Clone This Repo (All Tools)

```bash
git clone https://github.com/basedbork/bork-community ~/.claude/bork
```

### Single Skill/Agent

Download just what you need:

```bash
curl -L https://raw.githubusercontent.com/basedbork/bork-community/main/tools/skills/productivity-pack/smart-commit/SKILL.md > ~/.claude/skills/smart-commit.md
```

## Which Tool Should I Use?

| I want to... | Use |
|--------------|-----|
| Create a custom command | [Skill](./skills/) |
| Automate repetitive tasks | [Agent](./agents/) |
| Block dangerous commands | [Hook](./hooks/) |
| Auto-format code after edits | [Hook](./hooks/) |
| Connect to GitHub/Notion/Slack | [MCP](./mcp/) |
| Follow a structured dev process | [Workflow](./workflows/) |
| Deploy a standalone bot | [Bot](./bots/) |

---

[Back to main](../README.md)
