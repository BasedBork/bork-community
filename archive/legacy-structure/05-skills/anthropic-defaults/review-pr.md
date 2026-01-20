# Review PR Skill (Anthropic Default)

> **Note**: This is a reference copy of Claude Code's built-in `/review-pr` skill. It's included here so you can see how official skills are structured.

## What It Does

Reviews pull requests with:
- Code quality analysis
- Bug detection
- Security checks
- Performance considerations
- Style consistency

## Usage

```
claude> /review-pr
```

Or with a specific PR:
```
claude> review PR #123
```

```
claude> review this pull request: [URL]
```

## How It Works

The skill:

1. Fetches the PR diff (or reads local changes)
2. Analyzes each file changed
3. Identifies issues by severity
4. Suggests improvements
5. Highlights positive patterns

## Review Output Format

### Summary
Brief overview of the PR and overall assessment.

### Critical Issues
Problems that should block merge:
- Bugs
- Security vulnerabilities
- Data loss risks

### Warnings
Issues that should be addressed:
- Performance concerns
- Potential edge cases
- Code smells

### Suggestions
Nice-to-have improvements:
- Style improvements
- Better naming
- Documentation

### Positive Notes
What's done well (important for morale).

## Review Focus Areas

### Code Quality
- Clear naming
- Appropriate abstractions
- DRY principles
- Single responsibility

### Bugs
- Logic errors
- Off-by-one errors
- Null/undefined handling
- Race conditions

### Security
- Input validation
- SQL injection
- XSS vulnerabilities
- Exposed secrets

### Performance
- N+1 queries
- Unnecessary re-renders
- Memory leaks
- Large bundle impact

### Tests
- Test coverage
- Edge cases tested
- Test quality

## Customization

### Focus on Specific Areas
```
claude> /review-pr focusing on security
```

```
claude> review this PR, just check for performance issues
```

### Different Strictness
```
claude> do a quick review of this PR
```

```
claude> do a thorough review, this is going to production
```

## Example Review

```markdown
## Summary
This PR adds user authentication. Overall well-structured,
but has a security concern that should be addressed.

## Critical
- **Security**: Password is logged in debug mode (auth.ts:45)

## Warnings
- **Performance**: User query runs on every request, consider caching
- **Edge case**: No handling for expired sessions

## Suggestions
- Consider extracting token validation to a utility function
- Add JSDoc comments to public functions

## Positive
- Clean separation of concerns
- Good error messages for users
- Tests cover main flows
```

## Learning From This Skill

Key patterns:

1. **Structured output**: Organized by severity
2. **Actionable feedback**: Specific line numbers and fixes
3. **Balanced**: Notes positives, not just problems
4. **Context-aware**: Considers the broader codebase

---

*This is a reference document. The actual skill is built into Claude Code.*
