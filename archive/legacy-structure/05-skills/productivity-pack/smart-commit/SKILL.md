---
description: Enhanced git commits with automatic type, scope, and detailed messages
triggers:
  - /smart-commit
  - smart commit
  - enhanced commit
---

# Smart Commit

## Purpose

Create well-structured git commits following conventional commits format with automatic detection of commit type, scope, and meaningful descriptions.

## Instructions

When this skill is invoked:

1. Run `git status` to see what files are staged and changed
2. Run `git diff --cached` (or `git diff` if nothing staged) to understand the changes
3. Analyze the changes to determine:
   - **Type**: feat, fix, docs, style, refactor, perf, test, chore, ci
   - **Scope**: Based on the primary directory or feature affected
   - **Description**: Clear, imperative mood summary
   - **Body**: Bullet points of significant changes (if warranted)
   - **Breaking changes**: Note if this breaks existing functionality
   - **Issue references**: Include if mentioned by user

4. Format the commit message as:
```
<type>(<scope>): <description>

[optional body with bullet points]

[optional breaking change note]
[optional issue reference]
```

5. Show the proposed commit to the user
6. Stage files if needed (with user approval)
7. Create the commit (with user approval)

## Type Detection Rules

- `feat`: New files with functionality, new exports, new features
- `fix`: Changes to existing logic that correct behavior
- `docs`: Only .md files, comments, or documentation
- `style`: Formatting, whitespace, semicolons (no logic change)
- `refactor`: Restructuring without changing behavior
- `perf`: Performance improvements
- `test`: Test files only
- `chore`: package.json, configs, dependencies
- `ci`: CI/CD files (.github/, .gitlab-ci.yml, etc.)

## Scope Detection Rules

Determine scope from:
1. Common parent directory of changed files
2. Feature name if changes are in a feature directory
3. File name if single file changed
4. Omit scope if changes are too broad

## Body Guidelines

Include a body when:
- Multiple files changed
- Complex logic added
- Migration or data changes
- Multiple distinct changes in one commit

Format body as bullet points starting with action verbs:
- Add, Remove, Update, Fix, Refactor, Move

## Breaking Change Detection

Flag as breaking if:
- Public API signature changed
- Required configuration added
- Database schema changed
- Removed public exports

Format: `BREAKING CHANGE: <description>`

## Example Output

### Simple Change
```
fix(auth): handle null user in session check
```

### Complex Change
```
feat(api): add user preferences endpoint

- Add GET /api/preferences endpoint
- Add PUT /api/preferences endpoint
- Create preferences table migration
- Add preference validation with Zod

Closes #87
```

### Breaking Change
```
refactor(config)!: migrate to environment-based configuration

- Remove config.json support
- Add .env.example template
- Update all config references

BREAKING CHANGE: config.json is no longer supported.
Migrate to environment variables using .env file.
```

## Constraints

- Always show the commit message before executing
- Never commit without user approval
- Don't stage untracked files without asking
- Keep description under 72 characters
- Use imperative mood ("add" not "added")
- Don't include file names in description (that's what the diff is for)
