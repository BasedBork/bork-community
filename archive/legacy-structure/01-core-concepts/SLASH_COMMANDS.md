# Slash Commands

Built-in commands for quick actions.

## Overview

Slash commands start with `/` and perform specific actions without needing natural language. They're faster and more precise than asking Claude to do something.

## Essential Commands

### /help
Show all available commands:
```
claude> /help
```

### /clear
Reset context and start fresh:
```
claude> /clear
```

Use when:
- Starting a new, unrelated task
- Claude seems confused
- Context feels polluted

### /undo
Undo the last change Claude made:
```
claude> /undo
```

Works for:
- File edits
- File creations
- Recent command runs

### /model
Switch between Claude models:
```
claude> /model
# Shows available models

claude> /model opus
# Switch to Opus (most capable)

claude> /model sonnet
# Switch to Sonnet (faster)
```

### /stats
Show token usage for current session:
```
claude> /stats
```

Helps you:
- Monitor API usage
- Know when to `/clear`
- Understand context size

## Navigation Commands

### /compact
Compress context without losing important information:
```
claude> /compact
```

Useful for long sessions where you want to keep context but reduce tokens.

### /history
View recent commands:
```
claude> /history
```

## Project Commands

### /init
Create a CLAUDE.md file for your project:
```
claude> /init
```

Walks you through setup questions and generates a configured CLAUDE.md.

### /security-review
Run a security analysis of your code:
```
claude> /security-review
```

## All Commands Reference

| Command | Description |
|---------|-------------|
| `/help` | Show help |
| `/clear` | Reset context |
| `/undo` | Undo last change |
| `/model` | Switch model |
| `/stats` | Show token usage |
| `/compact` | Compress context |
| `/history` | View command history |
| `/init` | Create CLAUDE.md |
| `/security-review` | Security analysis |
| `/cost` | Show session costs |
| `/logout` | Log out |
| `/config` | Open configuration |

## Tips

### 1. Use /clear Liberally
Context pollution causes more problems than starting fresh. When in doubt, `/clear`.

### 2. Check /stats Regularly
High token counts mean:
- Slower responses
- Higher costs
- Potential confusion

### 3. /undo Is Your Safety Net
Made a bad change? `/undo` immediately. Don't try to fix it manually first.

### 4. Know When to /model
- **Opus**: Complex reasoning, architecture decisions
- **Sonnet**: Most coding tasks, faster responses
- **Haiku**: Simple tasks, quick questions

## Custom Commands (Skills)

Beyond built-in commands, you can add custom commands through skills:

```
claude> /commit     # Custom commit workflow
claude> /review     # Custom code review
claude> /deploy     # Custom deployment
```

See [Skills documentation](../05-skills/) for creating custom commands.

---

[← Plan Mode](./PLAN_MODE.md) | [Context Management →](./CONTEXT_MANAGEMENT.md)
