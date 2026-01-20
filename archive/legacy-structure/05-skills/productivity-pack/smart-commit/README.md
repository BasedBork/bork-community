# Smart Commit

Enhanced git commits with automatic type detection, scope, and detailed messages.

## Usage

```
claude> /smart-commit
```

## What It Does

Goes beyond basic commits by:

1. **Auto-detecting commit type** from changes (feat, fix, refactor, etc.)
2. **Identifying scope** from affected files/directories
3. **Writing detailed body** when changes are significant
4. **Detecting breaking changes** and noting them properly
5. **Following conventional commits** format

## Example Output

For changes to authentication files:

```
feat(auth): add password reset functionality

- Add reset token generation
- Create email template for reset link
- Add /reset-password API endpoint
- Update user model with resetToken field

Closes #42
```

## Comparison

### Basic Commit
```
Add password reset
```

### Smart Commit
```
feat(auth): add password reset functionality

- Add reset token generation
- Create email template for reset link
- Add /reset-password API endpoint
- Update user model with resetToken field

Closes #42
```

## Options

### Specify Type
```
claude> /smart-commit fix
```

### Include Issue Reference
```
claude> /smart-commit closes #123
```

### Breaking Change
```
claude> /smart-commit breaking
```

## Commit Types

| Type | When to Use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code restructuring |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `chore` | Maintenance, dependencies |
| `ci` | CI/CD changes |

## Installation

```bash
curl -L https://raw.githubusercontent.com/basedbork/bork-community/main/05-skills/productivity-pack/smart-commit/SKILL.md > ~/.claude/skills/smart-commit.md
```

---

[← Productivity Pack](../README.md) | [README Gen →](../readme-gen/)
