# Safety Guard Hook

Block dangerous commands before they execute.

## What It Does

Prevents Claude from running potentially destructive commands:

- `rm -rf /` and variants
- Overwriting system files
- Unprotected production access
- Force pushes to main
- Other dangerous operations

## Installation

Copy `hooks.yaml` to your project:

```bash
mkdir -p .claude
cp hooks.yaml .claude/hooks.yaml
```

Or add to your global hooks:

```bash
cat hooks.yaml >> ~/.claude/hooks.yaml
```

## What's Blocked

### Destructive File Operations
- `rm -rf /`
- `rm -rf ~`
- `rm -rf .`
- Writing to `/etc/`, `/usr/`, `/bin/`

### Git Operations
- `git push --force` to main/master
- `git reset --hard` without confirmation

### Database Operations
- Direct production database access
- `DROP DATABASE` commands

### System Operations
- `chmod -R 777`
- Writing to `/dev/`
- Modifying system PATH

## Customization

### Adding Rules

Edit the hooks file to add your own:

```yaml
PreToolUse:
  # Your custom rule
  - name: Block my custom pattern
    if: contains(command, "dangerous-thing")
    action: block
    message: "This is blocked because..."
```

### Relaxing Rules

Comment out or remove rules you don't need:

```yaml
# Commented out - we trust git force push
# - name: Block force push
#   if: contains(command, "git push --force")
#   action: block
```

### Environment-Specific

Different rules for different environments:

```yaml
# Only block in production projects
- name: Block prod deploy
  if: contains(command, "deploy") && contains(command, "prod")
  action: block
```

## Why These Rules?

### rm -rf Protection
The most common accidental destruction. A misplaced space (`rm -rf / home/user`) can wipe your system.

### Git Force Push
Rewriting shared history causes problems for everyone. Especially dangerous on main/master.

### Production Access
Direct database access bypasses safeguards. Use proper tooling instead.

### Permission Changes
`chmod 777` is almost never the right solution and creates security holes.

## Testing

Test that hooks are working:

```bash
# Start Claude Code
claude

# Try a blocked command
> run rm -rf /

# Should see: "Blocked: Destructive recursive deletion"
```

## Limitations

- Hooks can't prevent all dangerous actions
- Clever command construction might bypass simple patterns
- Use as defense-in-depth, not sole protection

## See Also

- [Hook Reference](../HOOK_REFERENCE.md) - Full hook documentation
- [Auto Format](../auto-format/) - Format code automatically

---

[← Hook Reference](../HOOK_REFERENCE.md) | [Auto Format →](../auto-format/)
