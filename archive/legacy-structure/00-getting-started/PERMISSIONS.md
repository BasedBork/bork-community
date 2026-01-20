# Understanding Permissions

Claude Code's permission system keeps you in control of what happens to your code.

## Why Permissions Exist

Claude Code can:
- Read any file in your project
- Edit or create files
- Run shell commands
- Delete files

Permissions ensure you approve each action before it happens.

## Permission Prompts

When Claude wants to take an action, you'll see:

```
Claude wants to edit src/app.js
Allow? [y/n/e]
```

### Your Options

| Key | Action | When to Use |
|-----|--------|-------------|
| `y` | Allow | You've reviewed and approve |
| `n` | Deny | You don't want this change |
| `e` | Edit | Modify the change before applying |

### Edit Mode

Pressing `e` opens the proposed change in your editor. You can:
- Modify the code before applying
- See exactly what will change
- Make manual adjustments

## Permission Types

### File Edits
```
Claude wants to edit src/utils.js
Allow? [y/n/e]
```
Most common. Review the diff shown before approving.

### File Creation
```
Claude wants to create src/newfile.js
Allow? [y/n/e]
```
Claude is creating a new file.

### File Deletion
```
Claude wants to delete src/oldfile.js
Allow? [y/n]
```
Be careful with deletions. No edit option since there's nothing to edit.

### Command Execution
```
Claude wants to run: npm install lodash
Allow? [y/n]
```
Claude wants to run a shell command.

## Skip Permissions Mode

For trusted tasks, you can skip permission prompts:

```bash
claude --dangerously-skip-permissions
```

**When to use:**
- Working on throwaway/experimental code
- You fully trust the task
- Git safety net in place (can always revert)

**When NOT to use:**
- Production code without backup
- Unfamiliar codebases
- Tasks involving sensitive data

### Middle Ground: Allow Lists

You can configure Claude to auto-approve certain actions:

```bash
# In your CLAUDE.md or settings
# Auto-approve file reads
# Auto-approve npm commands
```

See [CLAUDE.md configuration](../02-claude-md/) for details.

## Best Practices

### 1. Review Diffs
Always look at what's changing before pressing `y`.

### 2. Use Git
Commit before major changes. Easy to revert if something goes wrong:
```bash
git commit -am "checkpoint before AI changes"
```

### 3. Start Strict
Use permissions until you're comfortable with Claude's behavior, then relax as needed.

### 4. Trust But Verify
Even in skip-permissions mode, review changes after Claude is done:
```bash
git diff
```

## Common Questions

### "It keeps asking me the same thing"
Use `/clear` to reset context, or be more specific in your request.

### "I accidentally denied something"
Just ask Claude again. It will re-attempt the action.

### "Can I undo an approved change?"
Use `/undo` immediately, or `git checkout` for older changes.

### "Permissions are slowing me down"
For trusted workflows, use `--dangerously-skip-permissions`. Just keep Git commits handy.

## Security Model

Claude Code runs with your user permissions:
- Can only access files you can access
- Cannot access files outside your project (by default)
- Network access only through your machine

The permission system is the second layer of protection after filesystem permissions.

---

[← First Session](./FIRST_SESSION.md) | [Troubleshooting →](./TROUBLESHOOTING.md)
