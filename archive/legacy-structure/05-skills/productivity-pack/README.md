# BORK Productivity Pack

Community-built skills to boost your Claude Code workflow.

## What's Included

| Skill | Command | What It Does |
|-------|---------|--------------|
| [Smart Commit](./smart-commit/) | `/smart-commit` | Enhanced git commits with type, scope, and body |
| [README Gen](./readme-gen/) | `/readme-gen` | Auto-generate README files from code |
| [Test Gen](./test-gen/) | `/test-gen` | Generate tests from source code |
| [Refactor](./refactor/) | `/refactor` | Guided code refactoring |
| [Debug Helper](./debug-helper/) | `/debug` | Systematic debugging assistance |

## Installation

### Install All Skills

```bash
# Clone the repo to Claude's directory
git clone https://github.com/basedbork/bork-community ~/.claude/bork
```

### Install Single Skill

```bash
# Example: install just smart-commit
curl -L https://raw.githubusercontent.com/basedbork/bork-community/main/05-skills/productivity-pack/smart-commit/SKILL.md > ~/.claude/skills/smart-commit.md
```

## Quick Start

After installation, use any skill:

```
claude> /smart-commit
claude> /readme-gen
claude> /test-gen
claude> /refactor
claude> /debug
```

## Skill Details

### Smart Commit
Goes beyond basic commits. Automatically determines:
- Commit type (feat, fix, refactor, etc.)
- Scope from affected files
- Detailed body when needed
- Breaking change detection

### README Gen
Analyzes your codebase and generates:
- Project description
- Installation instructions
- Usage examples
- API documentation
- Contributing guidelines

### Test Gen
Creates tests based on your code:
- Unit tests for functions
- Integration tests for APIs
- Component tests for React
- Uses your project's test framework

### Refactor
Helps with common refactoring tasks:
- Extract functions/components
- Rename across files
- Simplify complex logic
- Improve code organization

### Debug Helper
Systematic debugging approach:
- Reproduce the issue
- Identify root cause
- Test hypotheses
- Implement fix

## Contributing

Have an idea for a skill? We welcome contributions:

1. Create a directory in `productivity-pack/`
2. Add `README.md` and `SKILL.md`
3. Test thoroughly
4. Submit a PR

See [SKILL_TEMPLATE.md](../SKILL_TEMPLATE.md) for the skill format.

---

[← Skills](../README.md) | [Smart Commit →](./smart-commit/)
