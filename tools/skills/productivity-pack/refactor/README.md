# Refactor

Guided code refactoring assistance.

## Usage

```
claude> /refactor
```

Or with specific intent:
```
claude> /refactor extract this into a component
```

## What It Does

Helps with common refactoring tasks:

- Extract functions or components
- Rename symbols across files
- Simplify complex logic
- Improve code organization
- Apply design patterns

## Refactoring Types

### Extract Function
Pull code into a reusable function:
```
claude> /refactor extract the validation logic into a function
```

### Extract Component
Create a React component from JSX:
```
claude> /refactor extract this card into a separate component
```

### Rename
Rename across files:
```
claude> /refactor rename UserData to UserProfile everywhere
```

### Simplify
Reduce complexity:
```
claude> /refactor simplify this nested conditional
```

### Reorganize
Improve structure:
```
claude> /refactor split this file into smaller modules
```

## Example

Before:
```typescript
function processOrder(order) {
  // 50 lines of validation
  if (!order.items) return { error: 'No items' };
  if (!order.user) return { error: 'No user' };
  // ... more validation

  // 30 lines of calculation
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  // ... more calculation

  // 20 lines of saving
  // ...
}
```

After `/refactor extract functions`:
```typescript
function validateOrder(order): ValidationResult {
  if (!order.items) return { error: 'No items' };
  if (!order.user) return { error: 'No user' };
  return { valid: true };
}

function calculateTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) =>
    sum + item.price * item.quantity, 0);
}

function processOrder(order) {
  const validation = validateOrder(order);
  if (!validation.valid) return validation;

  const total = calculateTotal(order.items);
  return saveOrder({ ...order, total });
}
```

## Options

### Dry Run
See changes without applying:
```
claude> /refactor dry-run rename User to Account
```

### Scope Limit
Refactor only in specific files:
```
claude> /refactor only in src/components/
```

## Safety Features

- Shows all changes before applying
- Creates atomic changes (all or nothing)
- Preserves git history (suggests commits)
- Validates changes compile/run

## Installation

```bash
curl -L https://raw.githubusercontent.com/basedbork/bork-community/main/05-skills/productivity-pack/refactor/SKILL.md > ~/.claude/skills/refactor.md
```

---

[← Test Gen](../test-gen/) | [Debug Helper →](../debug-helper/)
