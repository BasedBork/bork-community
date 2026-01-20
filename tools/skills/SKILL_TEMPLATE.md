# Creating Your Own Skill

A guide to building custom skills for Claude Code.

## Skill File Structure

Skills are markdown files with a specific structure:

```markdown
---
description: Short description of what this skill does
triggers:
  - /command-name
  - keyword triggers
---

# Skill Name

## Purpose
What this skill accomplishes.

## Instructions
Step-by-step guide for Claude.

## Examples
Input/output examples.

## Constraints
What to avoid.
```

---

## Basic Template

Copy this template to create your own skill:

```markdown
---
description: [One-line description]
triggers:
  - /your-command
---

# [Skill Name]

## Purpose

[What does this skill do? When should it be used?]

## Instructions

When this skill is invoked:

1. [First step]
2. [Second step]
3. [Third step]

## Output Format

[Describe the expected output format]

## Examples

### Example 1: [Scenario]

**Input:**
```
[Example input]
```

**Output:**
```
[Example output]
```

## Constraints

- [What to avoid #1]
- [What to avoid #2]
- [Edge cases to handle]
```

---

## Real Example: Code Review Skill

```markdown
---
description: Review code for quality, bugs, and improvements
triggers:
  - /review
  - review this code
---

# Code Review

## Purpose

Perform a thorough code review focusing on:
- Bugs and logic errors
- Performance issues
- Security vulnerabilities
- Code style and readability
- Best practices

## Instructions

When reviewing code:

1. Read the entire code block or file first
2. Identify the code's purpose and context
3. Check for bugs and logic errors
4. Look for security issues
5. Evaluate performance implications
6. Assess readability and maintainability
7. Suggest specific improvements

## Output Format

Structure the review as:

### Summary
[One paragraph overview]

### Issues Found
- **[Severity]**: [Description] (line X)

### Suggestions
- [Improvement suggestion]

### Positive Aspects
- [What's done well]

## Severity Levels

- **Critical**: Bugs, security issues, data loss risks
- **Warning**: Performance issues, potential bugs
- **Info**: Style, minor improvements

## Constraints

- Don't rewrite the entire code unless asked
- Focus on actionable feedback
- Explain why each issue matters
- Acknowledge good patterns, not just problems
```

---

## Tips for Effective Skills

### 1. Clear Triggers

Define when the skill should activate:

```yaml
triggers:
  - /deploy           # Slash command
  - deploy to prod    # Natural language
  - push to production
```

### 2. Step-by-Step Instructions

Break down complex tasks:

```markdown
## Instructions

1. First, analyze the current state
2. Then, identify what needs to change
3. Next, make the changes
4. Finally, verify the result
```

### 3. Concrete Examples

Show real inputs and outputs:

```markdown
### Example: Adding a Feature

**Input:**
```
/feature Add dark mode toggle
```

**Output:**
Creates toggle component, updates theme context, adds CSS variables.
```

### 4. Explicit Constraints

Prevent common mistakes:

```markdown
## Constraints

- Never modify files outside src/
- Always create a backup before destructive changes
- Don't commit without user confirmation
```

### 5. Output Format

Specify exactly what you want:

```markdown
## Output Format

Return a JSON object:
```json
{
  "status": "success|error",
  "changes": ["file1.ts", "file2.ts"],
  "summary": "What was done"
}
```
```

---

## Skill Locations

Claude Code looks for skills in:

1. `~/.claude/skills/` - User skills
2. `.claude/skills/` - Project skills
3. Built-in skills directory

Project skills override user skills of the same name.

---

## Testing Your Skill

### 1. Syntax Check

Make sure the YAML frontmatter is valid:

```yaml
---
description: Must be a string
triggers:
  - Must be a list
---
```

### 2. Functional Test

Try the skill on a test project:

```
claude> /your-skill
```

### 3. Edge Cases

Test with:
- Empty input
- Very large input
- Unusual file types
- Error conditions

### 4. Iterate

Refine based on results. Skills often need 2-3 iterations to work well.

---

## Sharing Skills

### In This Repo

1. Create a directory in `productivity-pack/`
2. Add `README.md` (docs) and `SKILL.md` (skill file)
3. Submit a PR

### Standalone

Share the `.md` file directly. Others can drop it in their skills folder.

---

## Skill Ideas

Looking for inspiration? Try building:

- **Changelog generator**: Create changelogs from git history
- **API documenter**: Generate API docs from code
- **Migration helper**: Assist with framework migrations
- **Security scanner**: Check for common vulnerabilities
- **Performance profiler**: Identify performance bottlenecks

---

[← Skills](./README.md) | [Anthropic Defaults →](./anthropic-defaults/)
