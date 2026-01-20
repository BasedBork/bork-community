# Hooks

Event-driven automation for Claude Code.

## What Are Hooks?

Hooks let you run code automatically when Claude Code does something. They're triggered by events like:

- Before/after tool use
- Session start/end
- Before file changes
- After commands run

Think of hooks as "if this, then that" for Claude Code.

## Why Use Hooks?

### Safety
Block dangerous commands before they run:
```yaml
# Block rm -rf /
PreToolUse:
  - if: tool == "Bash" && contains(command, "rm -rf /")
    action: block
```

### Automation
Format code after every edit:
```yaml
PostToolUse:
  - if: tool == "Edit"
    run: prettier --write $file
```

### Notifications
Alert when Claude does something significant:
```yaml
PostToolUse:
  - if: tool == "Write"
    run: notify-send "Claude created $file"
```

## Hook Types

| Hook | When It Fires |
|------|---------------|
| `PreToolUse` | Before Claude uses a tool |
| `PostToolUse` | After Claude uses a tool |
| `SessionStart` | When Claude Code starts |
| `SessionEnd` | When Claude Code exits |
| `Stop` | When Claude stops/completes |

See [HOOK_REFERENCE.md](./HOOK_REFERENCE.md) for complete details.

## Quick Example

Create `.claude/hooks.yaml` in your project:

```yaml
PreToolUse:
  - name: Block dangerous commands
    if: |
      tool == "Bash" &&
      (contains(command, "rm -rf") || contains(command, "> /dev/"))
    action: block
    message: "Dangerous command blocked"

PostToolUse:
  - name: Format after edits
    if: tool == "Edit" && endsWith(file, ".ts")
    run: npx prettier --write "$file"
```

## Available Hooks

### Pre-built (in this repo)

| Hook | What It Does |
|------|--------------|
| [safety-guard](./safety-guard/) | Block dangerous commands |
| [auto-format](./auto-format/) | Format code after edits |

### Create Your Own

See [HOOK_REFERENCE.md](./HOOK_REFERENCE.md) for the full API.

## Installation

### Project Hooks
Create `.claude/hooks.yaml` in your project. Hooks apply only to that project.

### Global Hooks
Create `~/.claude/hooks.yaml`. Hooks apply to all projects.

Project hooks override global hooks of the same name.

## Hook Syntax

```yaml
HookType:
  - name: Human-readable name (optional)
    if: condition expression
    action: allow | block | skip
    run: shell command to execute
    message: message to show
```

### Conditions

Use expressions to match specific situations:

```yaml
# Tool-based
if: tool == "Bash"
if: tool == "Edit" || tool == "Write"

# Content-based
if: contains(command, "npm install")
if: startsWith(file, "src/")

# Combined
if: tool == "Bash" && contains(command, "git push")
```

### Actions

- `allow` - Let it proceed (default)
- `block` - Stop the action
- `skip` - Skip silently

### Running Commands

Execute shell commands:
```yaml
run: echo "Claude edited $file"
run: npm run lint --fix
run: ./scripts/notify.sh "$tool" "$file"
```

## Variables

Available in conditions and commands:

| Variable | Description |
|----------|-------------|
| `$tool` | Tool being used (Bash, Edit, etc.) |
| `$command` | Command being run (for Bash) |
| `$file` | File being edited/created |
| `$content` | Content being written |

## Best Practices

### Start Simple
Add one hook at a time. Test thoroughly before adding more.

### Be Specific
Narrow conditions prevent unexpected blocking:
```yaml
# Good: specific
if: tool == "Bash" && contains(command, "rm -rf /")

# Risky: too broad
if: contains(command, "rm")
```

### Fail Safe
Don't block things you're unsure about:
```yaml
# Log suspicious commands instead of blocking
run: echo "Suspicious: $command" >> ~/.claude/suspicious.log
```

### Document
Add comments explaining why each hook exists:
```yaml
# Block production database access
- name: Block prod DB
  if: contains(command, "DATABASE_URL=prod")
  action: block
```

---

[← Tools Overview](../README.md) | [Hook Reference →](./HOOK_REFERENCE.md)
