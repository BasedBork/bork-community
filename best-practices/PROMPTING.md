# Effective Prompting

How to write prompts that get you what you want.

## Core Principles

### 1. Be Specific About What You Want

**Vague:**
```
claude> Fix the bug
```

**Specific:**
```
claude> Fix the bug in src/auth.js where the login function returns undefined when the password is empty
```

### 2. Provide Context

**Without context:**
```
claude> Add pagination
```

**With context:**
```
claude> Add pagination to the API. We're using Express and PostgreSQL with a users table that has 10k rows.
```

### 3. State Your Constraints

```
claude> Add user profiles. Keep it simple - we don't need social features, just basic info display.
```

### 4. Mention Preferences

```
claude> Add form validation. I prefer Zod over Yup for schema validation.
```

## Prompt Patterns

### The Task Pattern

State what you want done:

```
claude> Create a function that validates email addresses
```

### The Context + Task Pattern

Provide background then state the task:

```
claude> I'm building a REST API with Express and PostgreSQL. Add an endpoint that returns user data by ID with proper error handling.
```

### The Example Pattern

Show what you want:

```
claude> Add a new API endpoint similar to /api/users but for products. It should support the same filtering and pagination.
```

### The Constraint Pattern

Tell Claude what to avoid:

```
claude> Refactor this function to use async/await. Don't change the function signature or the return type.
```

### The Question Pattern

Ask for information or analysis:

```
claude> What's the best way to handle authentication in this app? We're using Next.js with the App Router.
```

### The Comparison Pattern

Ask for options:

```
claude> What are my options for state management in this React app? Compare them for this project size.
```

## When to Use Plan Mode

Use plan mode (press `Shift+Tab` or prefix with "plan:") for:

- New features
- Refactoring
- Changes across multiple files
- Unfamiliar codebases
- Anything complex

```
claude> plan: Add authentication to this app
```

Claude will analyze, propose an approach, and wait for approval.

## Iteration

Good prompting is iterative. Start simple, then refine:

```
claude> Add a login form
```

Then:

```
claude> That looks good, but also add loading states and error messages
```

Then:

```
claude> Now add form validation for email format and password length
```

## Debugging Prompts

When Claude isn't getting it right:

### Be More Specific

```
# Instead of:
claude> It's still not working

# Try:
claude> The function returns null when the array is empty. It should return an empty array instead.
```

### Provide Examples

```
claude> When the input is ["a", "b"], it should return ["A", "B"]. Currently it returns ["A", "b"].
```

### Reference Files

```
claude> Look at how the similar function in src/utils/format.js handles this case. Use the same pattern.
```

### Reset Context

```
claude> /clear
```

Start fresh if Claude seems confused.

## Anti-Patterns

### Too Vague

```
# Bad
claude> Make it better

# Good
claude> Improve the performance of getUsers() by adding pagination with 20 items per page
```

### Too Many Things at Once

```
# Bad
claude> Add authentication, set up the database, create user profiles, and add a dashboard

# Good
claude> plan: Let's build user authentication. Start with the database schema for users.
```

### Assuming Claude Remembers

```
# Bad
claude> Use that function we created earlier

# Good
claude> Use the validateEmail function in src/utils/validators.js
```

### Not Reviewing Changes

Always review the diff before approving. Claude can make mistakes.

## Domain-Specific Tips

### For Code Generation

- Specify the language and framework
- Mention naming conventions
- Include error handling requirements

```
claude> Create a TypeScript function that fetches user data from /api/users. Use our standard error handling pattern from src/lib/api.ts.
```

### For Debugging

- Include the error message
- Describe expected vs actual behavior
- Mention what you've already tried

```
claude> Getting "TypeError: Cannot read property 'map' of undefined" on line 42 of UserList.tsx. The data should be an array from the API but it's undefined on first render.
```

### For Refactoring

- Explain the goal of the refactor
- Specify what should stay the same
- Mention test coverage

```
claude> Refactor the checkout flow to use React Query for data fetching. Keep the same UI and user experience. All existing tests should pass.
```

### For Learning

- Ask for explanations
- Request alternatives

```
claude> Explain how this authentication middleware works. What are alternative approaches?
```

---

[← Best Practices](./README.md) | [Context Management →](./CONTEXT-MANAGEMENT.md)
