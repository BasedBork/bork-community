# Commit Skill (Anthropic Default)

> **Note**: This is a reference copy of Claude Code's built-in `/commit` skill. It's included here so you can see how official skills are structured.

## What It Does

The commit skill helps create well-formatted git commits with:
- Conventional commit format
- Clear, descriptive messages
- Proper scope identification

## Usage

```
claude> /commit
```

Or naturally:
```
claude> commit these changes
```

## How It Works

When invoked, the skill:

1. Runs `git status` to see changes
2. Runs `git diff` to understand what changed
3. Analyzes the changes
4. Generates an appropriate commit message
5. Creates the commit (with your approval)

## Commit Message Format

The skill follows conventional commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### Examples

```
feat(auth): add password reset functionality

fix(api): handle null response from user endpoint

docs: update installation instructions

refactor(components): extract Button into separate module
```

## Customization

You can guide the commit:

```
claude> /commit with type fix
```

```
claude> commit these changes, they fix the login bug
```

## Learning From This Skill

Key patterns to note:

1. **Analyzes before acting**: Reads git status and diff first
2. **Follows conventions**: Uses established commit format
3. **Asks for approval**: Doesn't commit without confirmation
4. **Provides context**: Shows what will be committed

---

*This is a reference document. The actual skill is built into Claude Code.*
