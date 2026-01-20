# Explain Code Skill (Anthropic Default)

> **Note**: This is a reference copy of Claude Code's built-in code explanation capability. It's included here so you can see how official skills work.

## What It Does

Explains code in clear, accessible language:
- What the code does
- How it works
- Why it's written that way

## Usage

```
claude> explain this code
```

```
claude> what does this function do?
```

```
claude> walk me through src/auth/login.ts
```

## How It Works

When explaining code, the skill:

1. Reads the code or file
2. Identifies the language and framework
3. Breaks down the logic step by step
4. Explains in plain English
5. Highlights important patterns

## Explanation Levels

### High-Level Overview
```
claude> give me an overview of this file
```

Returns the general purpose and main components.

### Detailed Walkthrough
```
claude> explain this line by line
```

Goes through each significant line.

### Specific Focus
```
claude> explain just the error handling
```

Focuses on a specific aspect.

## Example Output

For a function like:
```typescript
async function fetchUser(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}
```

The explanation might be:

> This function fetches a user by ID from an API. It's async, meaning it returns a Promise. It makes a GET request to `/api/users/{id}`. If the request fails (non-200 status) or throws an error, it returns null instead of crashing. Otherwise, it parses and returns the JSON response as a User object.

## Customization

### For Different Audiences

```
claude> explain this to a junior developer
```

```
claude> explain this assuming I know React but not TypeScript
```

### With Context

```
claude> explain this in the context of our auth flow
```

## Learning From This Skill

Key patterns:

1. **Adapts to audience**: Can explain at different levels
2. **Uses context**: Considers surrounding code
3. **Focuses on "why"**: Not just what, but why it's done that way
4. **Highlights gotchas**: Points out non-obvious behavior

---

*This is a reference document. The actual capability is built into Claude Code.*
