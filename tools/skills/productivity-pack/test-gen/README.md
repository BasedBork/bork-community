# Test Gen

Generate tests from your source code.

## Usage

```
claude> /test-gen
```

Or for a specific file:
```
claude> /test-gen src/utils/validators.ts
```

## What It Does

Analyzes your code and generates appropriate tests:

- Unit tests for functions
- Integration tests for APIs
- Component tests for React
- Uses your project's test framework

## Supported Frameworks

| Framework | Detection |
|-----------|-----------|
| Jest | `jest` in dependencies |
| Vitest | `vitest` in dependencies |
| Mocha | `mocha` in dependencies |
| pytest | Python project with pytest |
| Testing Library | `@testing-library/*` in dependencies |

## Example

For this function:
```typescript
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

Generated test:
```typescript
import { validateEmail } from './validators';

describe('validateEmail', () => {
  it('returns true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('returns false for email without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  it('returns false for email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('returns false for email with spaces', () => {
    expect(validateEmail('user @example.com')).toBe(false);
  });
});
```

## Options

### Specific File
```
claude> /test-gen src/auth/login.ts
```

### Test Type
```
claude> /test-gen integration tests for the API
```

### Coverage Focus
```
claude> /test-gen edge cases for validateForm
```

## Test Types Generated

### Unit Tests
- Individual function behavior
- Edge cases and error handling
- Return value verification

### Integration Tests
- API endpoint testing
- Database interactions
- External service mocking

### Component Tests
- Render testing
- User interaction simulation
- State changes

## Installation

```bash
curl -L https://raw.githubusercontent.com/basedbork/bork-community/main/05-skills/productivity-pack/test-gen/SKILL.md > ~/.claude/skills/test-gen.md
```

---

[← README Gen](../readme-gen/) | [Refactor →](../refactor/)
