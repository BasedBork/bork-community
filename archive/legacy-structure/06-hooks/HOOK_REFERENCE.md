# Hook Reference

Complete reference for Claude Code hooks.

## Hook Configuration File

Hooks are defined in YAML files:

- **Project hooks**: `.claude/hooks.yaml`
- **Global hooks**: `~/.claude/hooks.yaml`

## Hook Types

### PreToolUse

Fires **before** Claude uses a tool.

```yaml
PreToolUse:
  - name: Example
    if: condition
    action: allow | block
    message: "Shown when blocked"
```

**Use cases:**
- Block dangerous commands
- Require confirmation for destructive actions
- Validate inputs before execution

**Available variables:**
- `tool` - Tool name (Bash, Edit, Write, Read, etc.)
- `command` - Command string (Bash only)
- `file` - File path (Edit, Write, Read)
- `content` - Content being written (Write, Edit)

### PostToolUse

Fires **after** Claude uses a tool.

```yaml
PostToolUse:
  - name: Example
    if: condition
    run: command to execute
```

**Use cases:**
- Format code after edits
- Run linters
- Send notifications
- Log activity

**Available variables:**
- Same as PreToolUse, plus:
- `result` - Tool execution result
- `success` - Boolean, whether tool succeeded

### SessionStart

Fires when Claude Code session begins.

```yaml
SessionStart:
  - run: echo "Session started at $(date)"
```

**Use cases:**
- Environment setup
- Logging
- Notifications

### SessionEnd

Fires when Claude Code session ends.

```yaml
SessionEnd:
  - run: ./cleanup-script.sh
```

**Use cases:**
- Cleanup
- Final notifications
- Logging session summary

### Stop

Fires when Claude stops (completes or is interrupted).

```yaml
Stop:
  - run: echo "Claude finished"
```

---

## Condition Expressions

### Comparison Operators

```yaml
if: tool == "Bash"           # Equals
if: tool != "Read"           # Not equals
if: size > 1000              # Greater than
if: size >= 1000             # Greater than or equal
if: size < 100               # Less than
if: size <= 100              # Less than or equal
```

### Logical Operators

```yaml
if: tool == "Bash" && contains(command, "rm")    # AND
if: tool == "Edit" || tool == "Write"            # OR
if: !(tool == "Read")                            # NOT
```

### String Functions

```yaml
# Contains
if: contains(command, "npm install")

# Starts with
if: startsWith(file, "src/")

# Ends with
if: endsWith(file, ".ts")

# Matches regex
if: matches(command, "^git (push|force)")

# Length
if: length(content) > 10000
```

### Parentheses

Group conditions:
```yaml
if: (tool == "Edit" || tool == "Write") && endsWith(file, ".ts")
```

---

## Actions

### allow (default)

Let the action proceed normally.

```yaml
- if: tool == "Read"
  action: allow  # Explicit, but also the default
```

### block

Stop the action completely.

```yaml
- if: contains(command, "rm -rf /")
  action: block
  message: "This command is blocked for safety"
```

The `message` is shown to the user.

### skip

Skip silently (no message).

```yaml
- if: endsWith(file, ".log")
  action: skip
```

---

## Running Commands

### Basic

```yaml
run: echo "File edited: $file"
```

### Multi-line

```yaml
run: |
  echo "Starting..."
  npm run lint
  echo "Done"
```

### With Variables

All variables are available as environment variables:

```yaml
run: prettier --write "$file"
run: echo "Tool: $tool, File: $file"
```

### Conditional Execution

The `run` command only executes if `if` condition is true:

```yaml
- if: endsWith(file, ".ts")
  run: npx tsc --noEmit "$file"
```

---

## Variables Reference

### Tool Information

| Variable | Type | Description |
|----------|------|-------------|
| `tool` | string | Tool name |
| `command` | string | Bash command (Bash tool only) |

### File Information

| Variable | Type | Description |
|----------|------|-------------|
| `file` | string | File path |
| `content` | string | File content |
| `size` | number | Content size in bytes |
| `extension` | string | File extension |

### Execution Result (PostToolUse)

| Variable | Type | Description |
|----------|------|-------------|
| `result` | string | Tool output |
| `success` | boolean | Whether tool succeeded |
| `duration` | number | Execution time (ms) |

---

## Full Examples

### Safety Configuration

```yaml
PreToolUse:
  # Block destructive commands
  - name: Block rm -rf
    if: tool == "Bash" && contains(command, "rm -rf")
    action: block
    message: "Recursive deletion blocked"

  # Block production database access
  - name: Block prod DB
    if: tool == "Bash" && contains(command, "prod") && contains(command, "psql")
    action: block
    message: "Production database access blocked"

  # Warn before git push
  - name: Confirm git push
    if: tool == "Bash" && startsWith(command, "git push")
    message: "About to push to remote"
```

### Automation Configuration

```yaml
PostToolUse:
  # Format TypeScript files
  - name: Format TS
    if: (tool == "Edit" || tool == "Write") && endsWith(file, ".ts")
    run: npx prettier --write "$file"

  # Lint after changes
  - name: Lint
    if: tool == "Edit" && startsWith(file, "src/")
    run: npx eslint "$file" --fix

  # Notify on new files
  - name: Notify new file
    if: tool == "Write"
    run: echo "New file created: $file" >> ~/.claude/activity.log
```

### Logging Configuration

```yaml
SessionStart:
  - run: echo "=== Session $(date) ===" >> ~/.claude/sessions.log

PostToolUse:
  - run: echo "$(date): $tool on $file" >> ~/.claude/activity.log

SessionEnd:
  - run: echo "=== Session ended ===" >> ~/.claude/sessions.log
```

---

## Debugging Hooks

### Test Conditions

Add a logging hook to see what's happening:

```yaml
PreToolUse:
  - run: echo "Tool: $tool, Command: $command, File: $file"
```

### Check Hook Loading

```bash
# Verify hooks file syntax
cat .claude/hooks.yaml | yq .
```

### Common Issues

**Hook not firing:**
- Check file location (`.claude/hooks.yaml`)
- Verify YAML syntax
- Check condition logic

**Block not working:**
- Ensure `action: block` is set
- Check condition is matching correctly

**Run command failing:**
- Check command exists
- Verify permissions
- Test command manually

---

[← Hooks](./README.md) | [Safety Guard →](./safety-guard/)
