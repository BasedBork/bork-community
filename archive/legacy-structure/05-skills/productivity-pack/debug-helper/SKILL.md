---
description: Systematic debugging assistance with guided investigation
triggers:
  - /debug
  - help me debug
  - why isn't this working
  - debug this
---

# Debug Helper

## Purpose

Guide users through systematic debugging by asking clarifying questions, forming hypotheses, and methodically testing them to identify root causes.

## Instructions

When this skill is invoked:

1. **Gather Information**
   - What is the expected behavior?
   - What is the actual behavior?
   - Are there any error messages?
   - Can the issue be reproduced consistently?
   - What changed recently?

2. **Form Hypotheses**
   - List 3-5 most likely causes based on symptoms
   - Rank by probability
   - Note how to test each

3. **Investigate Systematically**
   - Start with most likely hypothesis
   - Check relevant code, logs, state
   - Eliminate hypotheses one by one
   - Update probability as evidence emerges

4. **Identify Root Cause**
   - Confirm the actual cause
   - Explain why it causes the symptom
   - Verify understanding is correct

5. **Implement Fix**
   - Propose minimal fix
   - Consider side effects
   - Suggest how to prevent recurrence

## Debugging Questions

### Understanding the Problem
- What exactly is happening? (specific, observable)
- What should be happening? (expected behavior)
- When did this start? (timing, recent changes)
- Does it happen every time? (consistency)
- Any error messages or logs? (evidence)

### Reproduction
- What are the exact steps to reproduce?
- Does it happen in all environments?
- Does it happen for all users/inputs?
- Minimum case that triggers it?

### Investigation
- What's the last known working state?
- What changed between working and broken?
- What have you already tried?
- Any related issues in the past?

## Common Bug Categories

### State Bugs
- Stale state / missing updates
- Race conditions
- Incorrect initial state
- State mutations

**Investigation**: Log state at key points, check update triggers

### Async Bugs
- Unhandled promise rejections
- Missing await
- Incorrect error handling
- Race conditions

**Investigation**: Check promise chains, add error handlers

### Data Bugs
- Null/undefined values
- Type mismatches
- Invalid data format
- Missing validation

**Investigation**: Log data at boundaries, add type checks

### Environment Bugs
- Missing environment variables
- Different configs (dev vs prod)
- Missing dependencies
- Version mismatches

**Investigation**: Compare environments, check configs

### Logic Bugs
- Off-by-one errors
- Incorrect conditions
- Wrong operator
- Missing cases

**Investigation**: Trace logic path, add test cases

## Debugging Output Format

```
## Issue Summary
[Brief description of the problem]

## Expected vs Actual
- Expected: [what should happen]
- Actual: [what's happening]

## Hypotheses (ranked by likelihood)
1. [Most likely] - [how to test]
2. [Second most likely] - [how to test]
3. [Possible] - [how to test]

## Investigation

### Checking Hypothesis 1
[What we checked]
[What we found]
[Conclusion: confirmed/eliminated]

### Checking Hypothesis 2
...

## Root Cause
[Explanation of why the bug occurs]

## Fix
[Proposed code change]

## Prevention
[How to prevent similar issues]
```

## Investigation Techniques

### Adding Logs
```typescript
console.log('[DEBUG] Function called with:', args);
console.log('[DEBUG] State before:', state);
// ... operation
console.log('[DEBUG] State after:', state);
```

### Checking Network
- Look at request payload
- Check response status and body
- Verify headers (auth, content-type)

### Tracing State
- Log component renders
- Check Redux/state devtools
- Verify props passing

### Git Investigation
```bash
git log --oneline -20     # Recent commits
git diff HEAD~5           # Recent changes
git bisect                # Find breaking commit
```

## Constraints

- Ask questions before assuming
- Don't change code until root cause is identified
- Test the fix verifies the hypothesis
- Consider if fix introduces new issues
- Suggest preventive measures (tests, types, validation)
