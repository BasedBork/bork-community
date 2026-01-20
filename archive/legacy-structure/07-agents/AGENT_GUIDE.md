# Building Custom Agents

A guide to creating your own Claude Code agents.

## Agent Structure

Agents are defined in markdown files with frontmatter:

```markdown
---
name: agent-name
description: What this agent does
tools:
  - Bash
  - Read
  - Grep
  - Glob
---

# Agent Name

## Purpose
What this agent accomplishes.

## Instructions
How the agent should behave.

## Constraints
What the agent should avoid.
```

## Creating an Agent

### Step 1: Define the Purpose

What specific task will this agent handle?

```yaml
name: test-runner
description: Run tests and analyze failures
```

### Step 2: Select Tools

Which tools does the agent need?

```yaml
tools:
  - Bash      # Run commands
  - Read      # Read files
  - Grep      # Search content
  - Glob      # Find files
  - Write     # Create files (if needed)
  - Edit      # Modify files (if needed)
```

### Step 3: Write Instructions

Clear, specific instructions for the agent:

```markdown
## Instructions

When invoked:

1. Find all test files using the project's test pattern
2. Run the test suite
3. If tests fail:
   - Parse the failure output
   - Identify the failing tests
   - Read the relevant source files
   - Analyze the root cause
4. Report findings with actionable suggestions
```

### Step 4: Add Constraints

What should the agent avoid?

```markdown
## Constraints

- Don't modify source files without explicit permission
- Don't run tests that require external services
- Limit analysis to the failing tests, not the entire suite
- Don't expose sensitive data in reports
```

## Full Example

```markdown
---
name: test-runner
description: Run tests and analyze failures with detailed reports
tools:
  - Bash
  - Read
  - Grep
  - Glob
---

# Test Runner Agent

## Purpose

Run the project's test suite and provide detailed analysis of any failures, including root cause identification and fix suggestions.

## Instructions

When this agent is invoked:

1. **Detect Test Framework**
   - Check for jest.config.js, vitest.config.ts, pytest.ini, etc.
   - Identify the test command from package.json or equivalent

2. **Run Tests**
   - Execute the test suite
   - Capture full output including stack traces

3. **Analyze Failures**
   For each failing test:
   - Extract the test name and file location
   - Read the test code
   - Read the relevant source code
   - Identify the likely cause

4. **Generate Report**
   ```
   ## Test Results

   ✓ X passed
   ✗ Y failed

   ### Failures

   #### test-name (file:line)
   **Error**: [error message]
   **Cause**: [analysis]
   **Suggestion**: [fix recommendation]
   ```

## Output Format

Always provide:
- Summary statistics
- List of failures with context
- Actionable fix suggestions
- Commands to re-run specific tests

## Constraints

- Don't modify source files
- Don't run tests that hit external APIs
- Limit to 10 failures in detailed analysis
- Timeout after 5 minutes of test execution
```

## Agent Placement

Save agents to:
- `~/.claude/agents/` - Global agents
- `.claude/agents/` - Project-specific agents

## Invoking Agents

Agents are invoked through the Task tool or naturally:

```
claude> Use the test-runner agent to check for test failures
```

Or Claude may automatically delegate based on the task.

## Best Practices

### 1. Single Responsibility
One agent, one job. Don't create "do everything" agents.

### 2. Clear Boundaries
Define exactly what the agent should and shouldn't do.

### 3. Appropriate Tools
Only give tools the agent actually needs.

### 4. Detailed Output
Agents should report what they did and found.

### 5. Error Handling
Include instructions for handling failures gracefully.

## Debugging Agents

### Agent Not Triggering
- Check the description matches the task
- Verify the file is in the correct location
- Check YAML frontmatter syntax

### Agent Errors
- Review tool permissions
- Check if required tools are available
- Test instructions manually

### Poor Results
- Make instructions more specific
- Add examples of expected behavior
- Include more constraints

---

[← Agents](./README.md) | [Examples →](./examples/)
