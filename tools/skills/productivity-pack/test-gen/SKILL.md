---
description: Generate tests from source code with appropriate framework
triggers:
  - /test-gen
  - generate tests
  - create tests for
  - write tests
---

# Test Generator

## Purpose

Analyze source code and generate comprehensive tests using the project's testing framework, covering normal cases, edge cases, and error handling.

## Instructions

When this skill is invoked:

1. **Identify Testing Framework**
   - Check package.json for jest, vitest, mocha
   - Check for @testing-library packages
   - Check for pytest in Python projects
   - Default to Jest patterns if unclear

2. **Analyze Target Code**
   - Read the file(s) to test
   - Identify exports and public functions
   - Understand input types and return types
   - Note dependencies and side effects

3. **Generate Test Cases**
   - Happy path (normal operation)
   - Edge cases (empty, null, boundary values)
   - Error cases (invalid input, failures)
   - Async handling if applicable

4. **Create Test File**
   - Follow project naming convention (*.test.ts, *.spec.ts)
   - Import necessary utilities
   - Structure with describe/it blocks
   - Add meaningful test names

5. **Output**
   - Show generated tests
   - Ask for approval before writing
   - Place in appropriate location

## Test Case Categories

### Happy Path
Test normal, expected usage:
```typescript
it('returns expected result for valid input', () => {
  expect(fn(validInput)).toBe(expectedOutput);
});
```

### Edge Cases
Test boundary conditions:
```typescript
it('handles empty array', () => {
  expect(fn([])).toBe(expectedEmpty);
});

it('handles single item', () => {
  expect(fn([item])).toBe(expectedSingle);
});

it('handles maximum value', () => {
  expect(fn(Number.MAX_SAFE_INTEGER)).toBe(expected);
});
```

### Error Cases
Test invalid inputs and failures:
```typescript
it('throws for null input', () => {
  expect(() => fn(null)).toThrow();
});

it('returns error for invalid format', () => {
  expect(fn('invalid')).toEqual({ error: 'Invalid format' });
});
```

### Async Code
Test promises and async functions:
```typescript
it('resolves with data on success', async () => {
  await expect(asyncFn()).resolves.toEqual(data);
});

it('rejects on network error', async () => {
  await expect(asyncFn()).rejects.toThrow('Network error');
});
```

## Framework-Specific Patterns

### Jest/Vitest
```typescript
import { describe, it, expect, vi } from 'vitest';
// or
import { describe, it, expect, jest } from '@jest/globals';

describe('functionName', () => {
  it('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

### React Testing Library
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('text')).toBeInTheDocument();
  });

  it('handles click', async () => {
    render(<Component />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('clicked')).toBeInTheDocument();
  });
});
```

### pytest
```python
import pytest
from module import function

def test_function_normal_case():
    assert function(input) == expected

def test_function_edge_case():
    assert function([]) == []

def test_function_raises_on_invalid():
    with pytest.raises(ValueError):
        function(None)
```

## Mocking Guidelines

Mock external dependencies:
```typescript
// Mock module
vi.mock('./api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mocked' })
}));

// Mock function
const mockFn = vi.fn().mockReturnValue('value');
```

## Test Naming Convention

Use descriptive names:
- `it('returns true for valid email')`
- `it('throws ValidationError when password is too short')`
- `it('fetches user data on mount')`

Avoid vague names:
- ~~`it('works')`~~
- ~~`it('test1')`~~

## Output Location

Place tests following project convention:
- `__tests__/` directory → `__tests__/filename.test.ts`
- Colocated → `filename.test.ts` next to source
- `tests/` directory → `tests/filename.test.ts`

## Constraints

- Don't test private/internal functions directly
- Don't create tests that depend on external services without mocking
- Match existing test style in the project
- Keep tests focused and independent
- One assertion concept per test (multiple expects okay if related)
