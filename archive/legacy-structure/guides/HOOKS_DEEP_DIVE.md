# Hooks Deep Dive

Advanced patterns for event-driven automation.

## Hook Architecture

### Execution Flow

```
Event Triggered
      ↓
Load Hook Rules
      ↓
Evaluate Conditions
      ↓
Execute Actions (in order)
      ↓
Continue/Block
```

### Multiple Hooks

Hooks execute in order. First match with `block` stops execution:

```yaml
PreToolUse:
  - name: Rule 1
    if: condition1
    action: allow    # Continues to next rule

  - name: Rule 2
    if: condition2
    action: block    # Stops here if matched

  - name: Rule 3
    if: condition3
    run: command     # Only runs if Rule 2 didn't block
```

## Advanced Conditions

### Complex Boolean Logic

```yaml
# Nested conditions
if: >
  (tool == "Bash" && contains(command, "rm")) ||
  (tool == "Write" && startsWith(file, "/etc/"))

# Multiple checks
if: >
  tool == "Bash" &&
  !contains(command, "npm") &&
  !contains(command, "git") &&
  contains(command, "sudo")
```

### Regular Expressions

```yaml
# Match patterns
if: matches(command, "^git (push|pull) --force")

# Match file types
if: matches(file, "\\.(ts|tsx|js|jsx)$")

# Match version numbers
if: matches(command, "npm install .+@\\d+\\.\\d+\\.\\d+")
```

### String Functions

```yaml
# Length checks
if: length(content) > 10000

# Case handling
if: lower(extension) == "ts"

# Split and check
if: contains(split(file, "/"), "node_modules")
```

## Stateful Hooks

### Counting Operations

```yaml
PostToolUse:
  - name: Track edits
    if: tool == "Edit"
    run: |
      count=$(cat ~/.claude/edit-count 2>/dev/null || echo 0)
      echo $((count + 1)) > ~/.claude/edit-count
```

### Time-Based Rules

```yaml
PreToolUse:
  - name: Warn during work hours
    if: tool == "Bash" && contains(command, "deploy")
    run: |
      hour=$(date +%H)
      if [ $hour -ge 9 ] && [ $hour -le 17 ]; then
        echo "Warning: Deploying during work hours"
      fi
```

### Cumulative Actions

```yaml
SessionEnd:
  - name: Summary report
    run: |
      edits=$(cat ~/.claude/edit-count 2>/dev/null || echo 0)
      echo "Session summary: $edits files edited"
      rm -f ~/.claude/edit-count
```

## Hook Patterns

### Validation Pattern

```yaml
PreToolUse:
  - name: Validate before execution
    if: tool == "Bash" && startsWith(command, "npm publish")
    run: |
      # Check if tests pass
      npm test || exit 1
      # Check if version bumped
      git diff HEAD~1 package.json | grep version || exit 1
      echo "Validation passed"
```

### Logging Pattern

```yaml
PostToolUse:
  - name: Audit log
    run: |
      echo "$(date -Iseconds) | $tool | $file | $USER" >> ~/.claude/audit.log
```

### Notification Pattern

```yaml
PostToolUse:
  - name: Notify on completion
    if: tool == "Bash" && contains(command, "deploy")
    run: |
      osascript -e 'display notification "Deployment complete" with title "Claude Code"'
```

### Transform Pattern

```yaml
PostToolUse:
  - name: Auto-format
    if: tool == "Write" && endsWith(file, ".json")
    run: |
      # Pretty print JSON
      tmp=$(mktemp)
      jq '.' "$file" > "$tmp" && mv "$tmp" "$file"
```

## Error Handling in Hooks

### Fail Silently

```yaml
run: command 2>/dev/null || true
```

### Log Errors

```yaml
run: |
  if ! command; then
    echo "Hook failed: $?" >> ~/.claude/hook-errors.log
  fi
```

### Conditional Failure

```yaml
run: |
  result=$(command)
  if [ $? -ne 0 ]; then
    # Decide whether to fail based on context
    if [ "$CLAUDE_STRICT" = "true" ]; then
      exit 1
    fi
  fi
```

## Performance Considerations

### Fast Checks First

```yaml
PreToolUse:
  # Fast string check first
  - name: Quick block
    if: contains(command, "rm -rf /")
    action: block

  # Slower regex check second
  - name: Pattern block
    if: matches(command, "complex.*pattern.*here")
    action: block
```

### Async Operations

```yaml
PostToolUse:
  - name: Non-blocking notification
    run: |
      # Run in background
      (curl -X POST webhook.url -d "event=$tool" &)
```

### Caching

```yaml
SessionStart:
  - name: Cache config
    run: |
      # Cache expensive lookups
      node -e "console.log(require('./package.json').name)" > ~/.claude/project-name
```

## Security Best Practices

### Input Sanitization

```yaml
# Don't do this - command injection risk
run: eval "$command"

# Do this - use specific variables
run: echo "Command was: $tool on $file"
```

### Minimal Permissions

```yaml
# Don't run hooks as root
run: |
  if [ "$(id -u)" = "0" ]; then
    echo "Don't run Claude as root"
    exit 1
  fi
```

### Audit Trail

```yaml
PreToolUse:
  - name: Log sensitive operations
    if: contains(command, "sudo") || contains(command, "rm")
    run: |
      echo "$(date): SENSITIVE: $command" >> ~/.claude/sensitive.log
```

## Debugging Hooks

### Verbose Mode

```yaml
PreToolUse:
  - name: Debug output
    run: |
      echo "=== HOOK DEBUG ===" >&2
      echo "Tool: $tool" >&2
      echo "Command: $command" >&2
      echo "File: $file" >&2
```

### Test Conditions

```bash
# Test hook file syntax
cat .claude/hooks.yaml | yq .

# Test condition manually
tool="Bash" command="rm -rf /" \
  yq '.PreToolUse[0].if' .claude/hooks.yaml
```

---

[← Skills Deep Dive](./SKILLS_DEEP_DIVE.md) | [Agents Deep Dive →](./AGENTS_DEEP_DIVE.md)
