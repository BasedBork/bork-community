# Explore Enhanced Agent

Deep codebase analysis with comprehensive reporting.

## Purpose

Goes beyond the built-in Explore agent to provide:
- Architecture analysis
- Dependency mapping
- Pattern identification
- Documentation gaps
- Tech debt assessment

## Usage

```
claude> Use explore-enhanced to analyze this codebase
```

Or more specifically:
```
claude> Use explore-enhanced to map the authentication flow
```

## What It Analyzes

### Architecture
- Directory structure and organization
- Module boundaries
- Layer separation (UI, business, data)
- Entry points and exports

### Dependencies
- External dependencies and versions
- Internal module dependencies
- Circular dependency detection
- Unused dependencies

### Patterns
- Design patterns in use
- Coding conventions
- Error handling approaches
- State management patterns

### Documentation
- README coverage
- Code comments density
- API documentation
- Missing documentation

## Example Output

```markdown
## Codebase Analysis: my-app

### Overview
Next.js 14 application with TypeScript, using App Router.
~15,000 lines of code across 120 files.

### Architecture
```
src/
├── app/          # Routes and pages (App Router)
├── components/   # React components (flat structure)
├── lib/          # Utilities and helpers
├── hooks/        # Custom React hooks
└── types/        # TypeScript definitions
```

### Key Findings

**Strengths:**
- Clean separation of concerns
- Consistent naming conventions
- Good TypeScript coverage (95%)

**Areas for Improvement:**
- Components folder is flat (consider feature folders)
- Some utilities are duplicated
- Missing error boundaries

### Dependency Health
- 12 outdated packages (3 major versions behind)
- 2 unused dependencies: lodash, moment

### Recommended Actions
1. Organize components by feature
2. Update outdated dependencies
3. Add error boundaries to route segments
```

## Configuration

The agent accepts parameters:

```
claude> explore-enhanced --focus=architecture
claude> explore-enhanced --focus=dependencies
claude> explore-enhanced --depth=deep
```

## Agent File

See `AGENT.md` for the full agent definition.

---

[← Examples](../) | [Test Runner →](../test-runner/)
