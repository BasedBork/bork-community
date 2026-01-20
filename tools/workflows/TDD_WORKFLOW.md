# TDD Workflow

Test-driven development with Claude Code.

## The Pattern

```
Red → Green → Refactor
 ↓       ↓        ↓
Write  Make it   Make it
test    pass     clean
```

## Why TDD with Claude?

Claude excels at TDD because:
- Tests clarify requirements before coding
- Focused context (test defines the goal)
- Automatic verification of solutions
- Refactoring is safer with tests

## The Workflow

### Step 1: Define the Feature

```
claude> plan: I need a function that validates credit card numbers
using the Luhn algorithm. It should return true for valid numbers
and false for invalid ones.
```

Claude will clarify requirements and confirm understanding.

### Step 2: Write the Test First

```
claude> Write a test for this function. Include cases for:
- Valid Visa number
- Valid Mastercard
- Invalid number (fails Luhn check)
- Invalid format (letters, too short)
```

Claude writes the test file.

### Step 3: Run Test (Red)

```
claude> Run the test
```

Test fails - the function doesn't exist yet. This is expected.

### Step 4: Implement (Green)

```
claude> Now implement the function to make the test pass.
Use the minimal code needed.
```

Claude writes the implementation.

### Step 5: Run Test (Verify Green)

```
claude> Run the test again
```

Tests should pass now.

### Step 6: Refactor

```
claude> Are there any improvements we can make to the implementation?
Keep the tests passing.
```

Claude suggests and implements improvements.

### Step 7: Add Edge Cases

```
claude> What edge cases are we missing? Add tests and handle them.
```

Iterate until coverage is complete.

## Example Session

```
# Step 1: Plan
claude> plan: Create a password strength checker that returns
        "weak", "medium", or "strong"

# Step 2: Write tests
claude> Write tests first. Cover:
        - Short passwords (weak)
        - Medium length without special chars (medium)
        - Long with numbers and special chars (strong)

# Step 3: Red
claude> Run the tests
> FAIL: passwordStrength is not defined

# Step 4: Green
claude> Implement passwordStrength to pass the tests
> [implements function]

# Step 5: Verify
claude> Run tests
> PASS: all tests passing

# Step 6: Refactor
claude> Can we simplify this implementation?
> [refactors to use regex]

# Step 7: Edge cases
claude> What about empty strings? Unicode? Add tests.
> [adds edge case tests and handles them]
```

## Tips for TDD with Claude

### Be Specific About Test Cases
```
# Good
claude> Test: empty array returns 0, single element returns that element,
        multiple elements returns sum

# Less Good
claude> Test the sum function
```

### One Test at a Time
```
claude> Add a test for the null input case only
```

### Keep Tests Focused
```
# Good: one concept per test
it('returns 0 for empty array', ...)
it('returns element for single-element array', ...)

# Avoid: multiple concepts
it('handles empty, single, and multi-element arrays', ...)
```

### Use Descriptive Names
```
claude> Name the tests descriptively so failures are self-documenting
```

## When TDD Works Best

- **New features**: Define behavior before implementing
- **Bug fixes**: Write test that reproduces bug, then fix
- **Refactoring**: Tests protect against regressions
- **Complex logic**: Tests clarify requirements

## When to Skip TDD

- **Exploratory coding**: Figuring out what's possible
- **UI prototyping**: Visual feedback is faster
- **One-off scripts**: Cost of tests exceeds benefit

## TDD Cycle Checklist

- [ ] Requirements clear?
- [ ] Test written first?
- [ ] Test fails (red)?
- [ ] Minimal implementation?
- [ ] Test passes (green)?
- [ ] Code clean (refactor)?
- [ ] Edge cases covered?

---

[← Workflows](./README.md) | [PR Workflow →](./PR_WORKFLOW.md)
