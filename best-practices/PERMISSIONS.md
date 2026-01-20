# Permissions

Understanding Claude Code's security model and permission system.

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

The "dangerously" in the flag is intentional. It reminds you this is a power-user feature.

### Good Use Cases

**Experimental/Throwaway Code**
```bash
cd ~/experiments/sandbox
claude --dangerously-skip-permissions
```
Nothing important can break.

**Trusted, Well-Scoped Tasks**
```bash
claude --dangerously-skip-permissions
> Add TypeScript types to all functions in src/utils/
```

**You Have Git Safety Net**
```bash
git commit -am "checkpoint before AI changes"
claude --dangerously-skip-permissions
# Can always: git reset --hard HEAD
```

**CI/CD Automation**
Running Claude in pipelines where human approval isn't possible.

### Bad Use Cases

- **Production code without backup** - No safety net = real risk
- **Unfamiliar codebases** - You can't verify changes you don't understand
- **Sensitive operations** - Database migrations, deployment scripts, credentials
- **When you're tired/distracted** - Permissions are your second brain

## Safety Strategies

### 1. Git Checkpoints
Before every skip-permissions session:
```bash
git add -A && git commit -m "pre-claude checkpoint"
```

After the session:
```bash
git diff HEAD~1  # Review all changes
```

### 2. Directory Isolation
Work in isolated directories:
```bash
cp -r my-project my-project-experiment
cd my-project-experiment
claude --dangerously-skip-permissions
```

### 3. Read-Only First
Do analysis without skip-permissions:
```bash
claude
> Analyze this codebase and explain the auth flow
```

Then use skip-permissions for implementation:
```bash
claude --dangerously-skip-permissions
> Implement the changes we discussed
```

### 4. Scope Limits
Be extremely specific:
```bash
claude --dangerously-skip-permissions
> Only modify files in src/components/Button/. Add hover states.
```

## Configuration Options

### Allow Specific Commands
Instead of skipping all permissions, allow specific ones in your CLAUDE.md:

```markdown
# CLAUDE.md
## Allowed Commands
- npm test
- npm run lint
- npm run build
```

Claude will auto-approve these but still ask for others.

### Allow File Patterns
```markdown
# CLAUDE.md
## Allowed Edits
- src/components/**
- tests/**
```

## Risks to Understand

### 1. Cascading Mistakes
One wrong assumption can affect many files quickly.

### 2. Unintended Deletions
Claude might clean up files it shouldn't.

### 3. Breaking Changes
Refactoring might break things in ways you don't immediately see.

### 4. Security Risks
Claude might run commands that expose credentials or modify permissions.

## Recovery

### Undo Last Action
```
claude> /undo
```

### Git Reset
```bash
git reset --hard HEAD     # Undo uncommitted changes
git reset --hard HEAD~1   # Undo last commit too
```

### Selective Recovery
```bash
git checkout -- specific-file.js
```

## Security Model

Claude Code runs with your user permissions:
- Can only access files you can access
- Cannot access files outside your project (by default)
- Network access only through your machine

The permission system is the second layer of protection after filesystem permissions.

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

## Summary

| Aspect | Regular Mode | Skip Permissions |
|--------|--------------|------------------|
| Safety | High | Your responsibility |
| Speed | Slower (approvals) | Much faster |
| Best for | Production, unfamiliar code | Experiments, trusted tasks |
| Recovery | Easy (didn't happen yet) | Requires git/undo |

**Rule of thumb**: If you'd let a trusted colleague make changes without reviewing each one, skip-permissions is probably fine. If you'd want to review, keep permissions on.

---

[← Plan Mode](./PLAN-MODE.md) | [Building Apps →](./BUILDING-APPS.md)
