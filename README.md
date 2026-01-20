# BORK Community

The open-source Claude Code resource. From zero to vibe coding.

## 5-Minute Quick Start

```bash
# 1. Get Claude Pro, Max, or API credits
# 2. Install Claude Code
npm install -g @anthropic-ai/claude-code

# 3. Open any project
cd your-project

# 4. Start vibe coding
claude
```

That's it. You're in.

## What's Here

| Section | What You'll Find |
|---------|------------------|
| [Quick Start](./quick-start/) | Install, first 15 minutes, CLAUDE.md setup, common pitfalls |
| [Tools](./tools/) | Skills, agents, hooks, MCP, workflows |
| [Best Practices](./best-practices/) | Prompting, context management, project structure |

## Learning Path

### Just Getting Started?

1. **[Install Claude Code](./quick-start/INSTALL.md)** - 5 minutes
2. **[First 15 Minutes](./quick-start/FIRST-15-MINUTES.md)** - Your first session
3. **[Set Up CLAUDE.md](./quick-start/CLAUDE-MD-SETUP.md)** - Configure for your project

### Ready to Level Up?

4. **[Prompting Guide](./best-practices/PROMPTING.md)** - Write effective prompts
5. **[Plan Mode](./best-practices/PLAN-MODE.md)** - Master complex tasks
6. **[Explore Tools](./tools/)** - Skills, hooks, agents, and MCP

### Hit a Snag?

- **[Common Pitfalls](./quick-start/COMMON-PITFALLS.md)** - Solutions to frequent issues

## Crash Course Resources

The best external resources curated by the community. See the full list in [quick-start/README.md](./quick-start/).

| Type | Highlights |
|------|------------|
| Video | [Anthropic Official Course](https://anthropic.skilljar.com/claude-code-in-action), [CS Dojo Masterclass](https://www.classcentral.com/course/youtube-claude-code-masterclass-503745) |
| Written | [Official Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices), [Claude Code Guide](https://github.com/Cranot/claude-code-guide) |
| MCP | [Official MCP Docs](https://code.claude.com/docs/en/mcp), [MCP Stack Guide](https://mcp.harishgarg.com/use/notion/mcp-server/with/claude-code) |

## Install Skills & Tools

**Full Clone (learning + tools)**
```bash
git clone https://github.com/basedbork/bork-community
cd bork-community && ls
```

**Skills Only (power users)**
```bash
git clone https://github.com/basedbork/bork-community ~/.claude/bork
```

**Single Skill**
```bash
curl -L https://raw.githubusercontent.com/basedbork/bork-community/main/tools/skills/productivity-pack/smart-commit/SKILL.md > ~/.claude/skills/smart-commit.md
```

## Repository Structure

```
bork-community/
├── quick-start/           # Get productive fast
│   ├── INSTALL.md
│   ├── FIRST-15-MINUTES.md
│   ├── CLAUDE-MD-SETUP.md
│   ├── COMMON-PITFALLS.md
│   └── templates/         # CLAUDE.md templates
│
├── tools/                 # Extend Claude Code
│   ├── skills/            # Custom slash commands
│   ├── agents/            # Autonomous subagents
│   ├── hooks/             # Event automation
│   ├── mcp/               # External integrations
│   └── workflows/         # Advanced patterns
│
├── best-practices/        # Master Claude Code
│   ├── PROMPTING.md
│   ├── CONTEXT-MANAGEMENT.md
│   ├── PROJECT-STRUCTURE.md
│   ├── CLAUDE-MD-GUIDE.md
│   ├── PLAN-MODE.md
│   ├── PERMISSIONS.md
│   └── BUILDING-APPS.md
│
└── archive/               # Legacy structure (preserved)
```

## Contributing

We welcome contributions. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- Add or improve documentation
- Share your skills, hooks, or agents
- Report issues or suggest improvements
- Help others in discussions

## Resources

- [Official Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code)
- [Anthropic Discord](https://discord.gg/anthropic)
- [BORK X Community](https://x.com/basedborkcto)

---

Built by the pack. Join us: [@basedborkcto](https://x.com/basedborkcto)

[basedbork.com](https://basedbork.com)
