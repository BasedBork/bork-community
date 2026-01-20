# Agents Deep Dive

Building sophisticated autonomous agents.

## Agent Architecture

### Components

```
Agent Definition
├── Metadata (name, description)
├── Tools (what it can use)
├── Instructions (how to behave)
├── Constraints (what to avoid)
└── Output Format (how to report)
```

### Execution Model

```
Task Assignment
      ↓
Agent Initialization
      ↓
Planning Phase
      ↓
Execution Loop
├── Action
├── Observation
├── Reasoning
└── Next Action
      ↓
Result Synthesis
      ↓
Report to User
```

## Advanced Agent Design

### Multi-Phase Agents

```markdown
---
name: research-agent
description: Deep research with synthesis
tools: [Read, Grep, Glob, WebSearch]
---

# Research Agent

## Phase 1: Discovery
1. Understand the research question
2. Identify relevant sources
3. Create initial source list

## Phase 2: Gathering
For each source:
1. Extract relevant information
2. Note key claims
3. Track citations

## Phase 3: Analysis
1. Compare findings across sources
2. Identify consensus and conflicts
3. Assess credibility

## Phase 4: Synthesis
1. Organize by theme
2. Draw conclusions
3. Note limitations

## Phase 5: Report
Structure findings as:
- Executive summary
- Detailed findings
- Sources and citations
- Recommendations
```

### State Management

```markdown
## State Tracking

Maintain state throughout execution:

\`\`\`
Current State:
- Phase: [discovery|gathering|analysis|synthesis|report]
- Sources Found: N
- Sources Analyzed: M
- Key Findings: [list]
- Open Questions: [list]
\`\`\`

Update state after each significant action.
Report state when asked about progress.
```

### Error Recovery

```markdown
## Error Handling

If a source is inaccessible:
1. Log the failed source
2. Try alternative access methods
3. Continue with other sources
4. Note gap in final report

If analysis hits contradiction:
1. Document both positions
2. Seek additional sources
3. Present conflict transparently

If task is ambiguous:
1. State assumptions clearly
2. Proceed with most likely interpretation
3. Offer alternative interpretations in report
```

## Agent Communication

### Progress Reporting

```markdown
## Progress Updates

Every 5 actions, report:
- What has been done
- What is currently happening
- What remains
- Any blockers or questions

Format:
\`\`\`
Progress: [X/Y steps complete]
Current: [current action]
Next: [planned action]
Issues: [any blockers]
\`\`\`
```

### Asking for Clarification

```markdown
## Clarification Protocol

When requirements are unclear:
1. State what is unclear
2. Present options (max 3)
3. Suggest default choice
4. Wait for user response

Example:
"The scope is ambiguous. Should I:
A) Analyze only the src/ directory
B) Include tests and config
C) Full repository analysis

I recommend (A) for faster results."
```

## Specialized Agent Patterns

### Code Review Agent

```markdown
## Code Review Agent

### Review Protocol
1. Understand the change context (PR description, linked issues)
2. Read the diff systematically
3. For each file:
   - Check for bugs
   - Check for security issues
   - Check for performance
   - Check for style consistency

### Severity Levels
- Critical: Must fix before merge
- Major: Should fix before merge
- Minor: Nice to fix
- Nitpick: Suggestions only

### Output Format
Group findings by file, then by severity.
Include line numbers and specific suggestions.
```

### Refactoring Agent

```markdown
## Refactoring Agent

### Approach
1. Understand current architecture
2. Identify refactoring target
3. Plan changes (show before/after)
4. Execute incrementally
5. Verify at each step

### Safety Measures
- Never refactor without tests
- Create backup branch
- Verify tests pass after each change
- Stop if tests fail

### Communication
Before each change, show:
- What will change
- Why it improves the code
- Risk assessment
```

### Documentation Agent

```markdown
## Documentation Agent

### Documentation Types
- API docs: From code signatures
- Guides: From usage patterns
- Examples: From test files
- Architecture: From structure

### Process
1. Analyze what exists
2. Identify gaps
3. Generate missing docs
4. Verify accuracy against code

### Quality Checks
- All public APIs documented
- Examples are runnable
- Links are valid
- No outdated information
```

## Agent Coordination

### Sequential Agents

```
Agent 1 (Research)
      ↓ findings
Agent 2 (Analysis)
      ↓ insights
Agent 3 (Report)
      ↓ document
```

### Parallel Agents

```
            ┌→ Agent A (Frontend)
Main Task ──┼→ Agent B (Backend)
            └→ Agent C (Tests)
                    ↓
               Coordinator
                    ↓
                 Merged Result
```

### Supervisor Pattern

```markdown
## Supervisor Agent

Coordinates specialized agents:

1. Analyze the task
2. Decompose into subtasks
3. Assign to appropriate agents
4. Monitor progress
5. Handle failures
6. Synthesize results
```

## Performance Optimization

### Focused Tool Access

Only give tools the agent actually needs:

```yaml
# Research agent - read only
tools: [Read, Grep, Glob]

# Refactoring agent - needs edit
tools: [Read, Edit, Grep, Glob, Bash]
```

### Early Termination

```markdown
## Termination Conditions

Stop early if:
- Goal achieved before all steps
- Blocker encountered that user must resolve
- Confidence is low (ask for guidance)
- Resource limit reached (report partial results)
```

### Caching and Reuse

```markdown
## Efficiency

- Cache file reads within session
- Reuse analysis from earlier phases
- Don't re-read unchanged files
- Batch similar operations
```

---

[← Hooks Deep Dive](./HOOKS_DEEP_DIVE.md) | [MCP Deep Dive →](./MCP_DEEP_DIVE.md)
