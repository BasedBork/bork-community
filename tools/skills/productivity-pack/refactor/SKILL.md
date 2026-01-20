---
description: Guided code refactoring with safety checks
triggers:
  - /refactor
  - refactor this
  - extract
  - rename across
---

# Refactor

## Purpose

Assist with code refactoring tasks including extraction, renaming, simplification, and reorganization while maintaining code correctness.

## Instructions

When this skill is invoked:

1. **Understand the Request**
   - Identify the refactoring type (extract, rename, simplify, etc.)
   - Identify the target code
   - Understand the desired outcome

2. **Analyze Impact**
   - Find all usages of the target code
   - Identify dependencies
   - Check for side effects
   - Note test coverage

3. **Plan the Refactoring**
   - List all files that will change
   - Describe each change
   - Identify risks

4. **Execute with Safety**
   - Show changes before applying
   - Make atomic changes
   - Verify code still works
   - Suggest test runs

5. **Clean Up**
   - Remove dead code
   - Update imports
   - Suggest commit message

## Refactoring Types

### Extract Function
```
Input: Code block within a function
Output: New function + call site

Steps:
1. Identify the code block to extract
2. Determine parameters (variables used from outer scope)
3. Determine return value
4. Create new function with descriptive name
5. Replace original code with function call
6. Update imports if moving to new file
```

### Extract Component (React)
```
Input: JSX within a component
Output: New component file + usage

Steps:
1. Identify the JSX to extract
2. Determine props (values from parent scope)
3. Create new component file
4. Add proper TypeScript types for props
5. Replace original JSX with component usage
6. Add import statement
```

### Rename Symbol
```
Input: Symbol name + new name
Output: All occurrences renamed

Steps:
1. Find all occurrences (definitions + usages)
2. Check for naming conflicts
3. Update all occurrences
4. Update imports/exports
5. Update string references if applicable (e.g., API routes)
```

### Simplify Logic
```
Input: Complex conditional or loop
Output: Simplified equivalent

Techniques:
- Early returns instead of nested if/else
- Array methods instead of loops
- Ternary for simple conditions
- Optional chaining for null checks
- Nullish coalescing for defaults
```

### Split File
```
Input: Large file
Output: Multiple focused files

Steps:
1. Identify logical groupings
2. Create new files for each group
3. Move code to appropriate files
4. Create index.ts for re-exports if needed
5. Update all imports across codebase
```

## Safety Checks

Before applying changes:
- [ ] All usages identified
- [ ] No circular dependencies created
- [ ] Types still compile
- [ ] Tests still pass (if available)
- [ ] No runtime behavior change (unless intended)

## Output Format

Show changes in this format:

```
## Refactoring Plan

### Files Changed
1. src/utils.ts (modify)
2. src/components/Form.tsx (modify)
3. src/utils/validation.ts (create)

### Changes

#### src/utils/validation.ts (new file)
\`\`\`typescript
[new file content]
\`\`\`

#### src/utils.ts
- Remove lines 45-67 (validation logic)
- Add import for validation.ts

#### src/components/Form.tsx
- Update import path

### Verification
- [ ] Run: npm run typecheck
- [ ] Run: npm test
```

## Common Patterns

### Before/After Examples

**Nested Conditionals → Early Returns**
```typescript
// Before
function process(data) {
  if (data) {
    if (data.valid) {
      if (data.items.length > 0) {
        return doWork(data);
      }
    }
  }
  return null;
}

// After
function process(data) {
  if (!data) return null;
  if (!data.valid) return null;
  if (data.items.length === 0) return null;
  return doWork(data);
}
```

**Loop → Array Method**
```typescript
// Before
const results = [];
for (const item of items) {
  if (item.active) {
    results.push(item.name);
  }
}

// After
const results = items
  .filter(item => item.active)
  .map(item => item.name);
```

## Constraints

- Always show changes before applying
- Don't change behavior unless explicitly requested
- Preserve formatting style of the codebase
- Keep commits atomic (one refactor = one commit)
- Suggest running tests after refactoring
