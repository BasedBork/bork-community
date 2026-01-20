# Skills Deep Dive

Advanced techniques for creating powerful skills.

## Skill Architecture

### File Structure

```
skill-name/
├── README.md          # Human documentation
├── SKILL.md           # Main skill definition
├── prompts/           # Reusable prompt components
│   ├── analysis.md
│   └── output.md
└── examples/          # Usage examples
    ├── example1.md
    └── example2.md
```

### Frontmatter Schema

```yaml
---
name: skill-name              # Unique identifier
description: What it does     # Shown in listings
version: 1.0.0               # Semantic version
author: your-name            # Credit
triggers:
  - /command                 # Slash command triggers
  - keyword phrase           # Natural language triggers
tools:                       # Required tools (optional)
  - Bash
  - Read
requires:                    # Dependencies (optional)
  - other-skill
---
```

## Advanced Trigger Patterns

### Multiple Commands
```yaml
triggers:
  - /commit
  - /git-commit
  - /smart-commit
```

### Natural Language Variations
```yaml
triggers:
  - commit these changes
  - create a commit
  - make a commit for
```

### Contextual Triggers
```yaml
triggers:
  - /review             # Explicit
  - review this pr      # Natural
  - check the pr        # Casual
```

## Structured Instructions

### Using Sections

```markdown
## Context Analysis
First, analyze the situation:
1. What is the current state?
2. What does the user want?
3. What constraints exist?

## Planning
Before acting:
1. List the steps needed
2. Identify potential issues
3. Confirm approach with user if ambiguous

## Execution
Perform the task:
1. Step one with details
2. Step two with details
3. Verification step

## Output
Present results:
- Summary of what was done
- Any warnings or notes
- Suggested next steps
```

### Conditional Behavior

```markdown
## Instructions

If the user provides a file path:
  1. Read that specific file
  2. Analyze it directly

If no file path is provided:
  1. Search for relevant files
  2. Ask user to confirm which files to analyze

If the analysis finds issues:
  1. Present issues with severity
  2. Offer to fix automatically

If no issues found:
  1. Confirm clean result
  2. Suggest preventive measures
```

## Output Templates

### Structured Output

```markdown
## Output Format

Always format output as:

\`\`\`
## [Skill Name] Results

### Summary
[One paragraph summary]

### Details
| Item | Status | Notes |
|------|--------|-------|
| ... | ... | ... |

### Recommendations
1. [First recommendation]
2. [Second recommendation]

### Commands
\`\`\`bash
[Suggested commands to run]
\`\`\`
\`\`\`
```

### Dynamic Output

```markdown
## Output Format

For successful operations:
- Show what was done
- Include relevant file paths
- Suggest verification steps

For errors:
- Show the error clearly
- Explain likely cause
- Provide fix suggestions

For partial success:
- List successful items
- List failed items with reasons
- Offer to retry failed items
```

## Error Handling

### In Instructions

```markdown
## Error Handling

If a file cannot be read:
  - Note the error
  - Continue with other files
  - Report at end

If a command fails:
  - Capture the error output
  - Analyze the failure
  - Suggest fixes

If user input is invalid:
  - Explain what's wrong
  - Show expected format
  - Ask for corrected input
```

### Graceful Degradation

```markdown
## Fallbacks

Primary approach: Use git blame for history
Fallback if git unavailable: Use file timestamps

Primary approach: Query API for data
Fallback if API down: Use cached data

Primary approach: Run full test suite
Fallback if timeout: Run critical tests only
```

## Composing Skills

### Referencing Other Skills

```markdown
## Instructions

1. First, use the analyze skill to understand the codebase
2. Then, apply changes based on the analysis
3. Finally, use the commit skill to save changes
```

### Shared Prompt Components

Create reusable components in `prompts/`:

```markdown
<!-- prompts/code-quality.md -->
## Code Quality Checks

When reviewing code, verify:
- [ ] No obvious bugs
- [ ] Proper error handling
- [ ] Consistent naming
- [ ] Adequate comments for complex logic
```

Reference in main skill:

```markdown
{{include prompts/code-quality.md}}
```

## Testing Skills

### Test Cases

Create test scenarios:

```markdown
## Test Cases

### Case 1: Normal operation
Input: /skill-name on a standard project
Expected: Completes successfully with report

### Case 2: Edge case - empty project
Input: /skill-name on empty directory
Expected: Graceful message about no files

### Case 3: Error handling
Input: /skill-name with invalid permissions
Expected: Clear error message with fix suggestion
```

### Manual Testing Checklist

- [ ] Works with minimal input
- [ ] Handles missing optional parameters
- [ ] Produces consistent output format
- [ ] Errors are clear and actionable
- [ ] Works across project types

## Distribution

### Single File
For simple skills, one file is fine:
```bash
curl -L URL > ~/.claude/skills/skill-name.md
```

### Package
For complex skills with dependencies:
```bash
git clone repo ~/.claude/skills/skill-name/
```

### Updates
Version your skills and document changes:
```yaml
version: 1.1.0
# Changelog:
# 1.1.0 - Added support for TypeScript
# 1.0.0 - Initial release
```

---

[← Guides](./README.md) | [Hooks Deep Dive →](./HOOKS_DEEP_DIVE.md)
