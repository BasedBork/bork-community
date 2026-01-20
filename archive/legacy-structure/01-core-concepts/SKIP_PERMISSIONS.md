# Skip Permissions Mode

Running Claude Code without approval prompts.

## What is Skip Permissions?

By default, Claude asks for approval before:
- Editing files
- Creating files
- Running commands
- Deleting files

Skip permissions mode removes these prompts. Claude acts immediately.

## How to Enable

```bash
claude --dangerously-skip-permissions
```

The "dangerously" in the flag is intentional. It reminds you this is a power-user feature.

## When to Use

### Good Use Cases

**Experimental/Throwaway Code**
```bash
cd ~/experiments/sandbox
claude --dangerously-skip-permissions
```
Nothing important can break.

**Trusted, Well-Scoped Tasks**
```bash
# Clear task, trusted codebase
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

**Production Code Without Backup**
No safety net = real risk.

**Unfamiliar Codebases**
You can't verify changes you don't understand.

**Sensitive Operations**
Database migrations, deployment scripts, credentials handling.

**When You're Tired/Distracted**
Permissions are your second brain when you're not fully focused.

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

## The Middle Ground

If full skip-permissions feels too risky, consider:

### Batch Approvals
Claude can batch similar changes:
```
Claude wants to add types to 15 files.
Approve all? [y/n/review each]
```

### Trust After Review
Review the first few changes carefully, then approve the rest:
```
[Review first 3 changes individually]
> Rest look similar, approve all
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

## Summary

| Aspect | Regular Mode | Skip Permissions |
|--------|--------------|------------------|
| Safety | High | Your responsibility |
| Speed | Slower (approvals) | Much faster |
| Best for | Production, unfamiliar code | Experiments, trusted tasks |
| Recovery | Easy (didn't happen yet) | Requires git/undo |

**Rule of thumb**: If you'd let a trusted colleague make changes without reviewing each one, skip-permissions is probably fine. If you'd want to review, keep permissions on.

---

[← Context Management](./CONTEXT_MANAGEMENT.md) | [Back to Core Concepts](./README.md)
