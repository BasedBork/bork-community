# Debug Helper

Systematic debugging assistance.

## Usage

```
claude> /debug
```

Or with context:
```
claude> /debug the login form isn't submitting
```

## What It Does

Guides you through systematic debugging:

1. **Understand** - What should happen vs what's happening
2. **Reproduce** - Consistent reproduction steps
3. **Isolate** - Narrow down the problem area
4. **Hypothesize** - Possible causes
5. **Test** - Verify hypotheses
6. **Fix** - Implement solution

## Debugging Flow

### Step 1: Describe the Problem
```
claude> /debug
> What's the issue? The form submits but nothing happens
> What should happen? Should show success message and redirect
> Any error messages? None in UI, checking console...
```

### Step 2: Reproduce
```
> Can you reproduce it consistently? Yes, every time
> Steps to reproduce?
  1. Fill out form
  2. Click submit
  3. Nothing happens
```

### Step 3: Investigate
Claude helps check:
- Console errors
- Network requests
- State changes
- Recent code changes

### Step 4: Identify
```
> Found it: The form onSubmit is calling e.preventDefault()
> but the async handler isn't awaited, so errors are swallowed
```

### Step 5: Fix
```
> Here's the fix: [shows code change]
> Want me to apply it?
```

## Common Debug Scenarios

### "It's not working"
Claude asks clarifying questions to understand what "not working" means.

### Error Messages
Claude helps decode cryptic errors and trace their source.

### Works Locally, Fails in Production
Claude helps identify environment differences.

### Race Conditions
Claude helps identify timing issues with async code.

### State Issues
Claude helps trace state through React/Redux/etc.

## Debugging Tools

The skill uses:
- Console.log placement
- Network tab analysis
- Git history (what changed?)
- Error stack traces
- Debugger breakpoints

## Example Session

```
claude> /debug users can't log in

Claude: Let's debug this systematically.

1. What happens when a user tries to log in?
> They enter credentials, click submit, and get "Invalid credentials"

2. Are the credentials actually valid?
> Yes, I can log in with the same credentials locally

3. Let me check the network request...
> [analyzes] The request is going to /api/login and returning 401

4. Let me check the API handler...
> [reads code] Found it - the password comparison is using
> == instead of a proper hash comparison

5. Here's the fix: [shows change]
> Want me to apply this?
```

## Installation

```bash
curl -L https://raw.githubusercontent.com/basedbork/bork-community/main/05-skills/productivity-pack/debug-helper/SKILL.md > ~/.claude/skills/debug-helper.md
```

---

[← Refactor](../refactor/) | [Back to Productivity Pack](../README.md)
