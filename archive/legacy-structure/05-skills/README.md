# Skills

Extend Claude Code's abilities with custom commands.

## What Are Skills?

Skills are markdown files that teach Claude how to do specific tasks. When you invoke a skill, Claude follows its instructions to complete the task.

Think of skills as:
- Custom slash commands (`/commit`, `/review`, `/test`)
- Specialized knowledge packs
- Reusable workflows

## Built-in vs Custom Skills

**Built-in skills** come with Claude Code:
- `/commit` - Create git commits
- `/review-pr` - Review pull requests
- `/explain-code` - Explain code clearly

**Custom skills** you add yourself:
- Install from this repo
- Create your own
- Share with the community

## Installing Skills

### Option 1: Clone This Repo

```bash
# Clone to Claude's skills directory
git clone https://github.com/basedbork/bork-community ~/.claude/bork
```

All skills in `05-skills/` become available.

### Option 2: Single Skill

```bash
# Download just one skill
curl -L https://raw.githubusercontent.com/basedbork/bork-community/main/05-skills/productivity-pack/smart-commit/SKILL.md > ~/.claude/skills/smart-commit.md
```

### Option 3: Manual Copy

1. Copy the skill's `.md` file
2. Save to `~/.claude/skills/`
3. Restart Claude Code

## Using Skills

Invoke skills with slash commands:

```
claude> /smart-commit
```

Or reference them in conversation:

```
claude> Use the smart-commit skill to commit these changes
```

## Available Skills

### Anthropic Defaults (Reference)

These are built into Claude Code. We include reference copies so you can see how they work:

| Skill | What It Does |
|-------|--------------|
| [commit](./anthropic-defaults/commit.md) | Create well-formatted git commits |
| [explain-code](./anthropic-defaults/explain-code.md) | Explain code clearly |
| [frontend-design](./anthropic-defaults/frontend-design.md) | Design UI with best practices |
| [review-pr](./anthropic-defaults/review-pr.md) | Review pull requests |

### BORK Productivity Pack

Community-built skills to boost your workflow:

| Skill | What It Does |
|-------|--------------|
| [smart-commit](./productivity-pack/smart-commit/) | Enhanced commits with scope and type |
| [readme-gen](./productivity-pack/readme-gen/) | Auto-generate README files |
| [test-gen](./productivity-pack/test-gen/) | Generate tests from code |
| [refactor](./productivity-pack/refactor/) | Code refactoring assistance |
| [debug-helper](./productivity-pack/debug-helper/) | Systematic debugging |

## Creating Your Own Skills

See [SKILL_TEMPLATE.md](./SKILL_TEMPLATE.md) for a starter template.

Key principles:
1. **Clear trigger**: When should this skill activate?
2. **Specific instructions**: What exactly should Claude do?
3. **Examples**: Show expected inputs and outputs
4. **Constraints**: What should Claude avoid?

## Skill File Structure

```
skill-name/
├── README.md      # Documentation for humans
├── SKILL.md       # The actual skill file Claude reads
└── examples/      # Usage examples (optional)
```

## Tips

### Start with Existing Skills
Copy a skill that's close to what you want and modify it.

### Be Specific
Vague instructions lead to inconsistent results. Be explicit about what you want.

### Test Thoroughly
Try your skill on different codebases and edge cases.

### Version Control
Keep skills in git so you can track changes and share them.

---

[← Deployment](../04-deployment/) | [Skill Template →](./SKILL_TEMPLATE.md)
