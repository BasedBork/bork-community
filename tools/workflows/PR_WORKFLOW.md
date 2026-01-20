# PR Workflow

Full pull request lifecycle with Claude Code.

## The Pattern

```
Branch → Develop → Test → PR → Review → Merge
```

## Overview

This workflow covers:
1. Creating a feature branch
2. Developing the feature
3. Testing and validation
4. Creating the PR
5. Addressing reviews
6. Merging

## The Workflow

### Step 1: Create Branch

```
claude> Create a branch for adding user avatar support.
        Base it on main.
```

Claude creates and checks out the branch.

### Step 2: Plan the Work

```
claude> plan: Add user avatar support.
        - Upload avatar endpoint
        - Store in S3
        - Display in profile
        - Default avatar for users without one
```

Review and approve the plan.

### Step 3: Implement

Work through the plan:

```
claude> Implement the avatar upload endpoint
```

```
claude> Add the S3 storage integration
```

```
claude> Update the profile component to display avatars
```

### Step 4: Test

```
claude> Write tests for the avatar functionality
```

```
claude> Run the tests and fix any failures
```

### Step 5: Commit

```
claude> Commit these changes with appropriate messages
```

Or use the smart-commit skill:
```
claude> /smart-commit
```

### Step 6: Create PR

```
claude> Create a pull request for this branch.
        Include:
        - Summary of changes
        - Testing instructions
        - Screenshots if relevant
```

Claude creates the PR with proper description.

### Step 7: Address Reviews

After reviewers comment:

```
claude> Look at the PR feedback and address the comments
```

```
claude> The reviewer asked to add input validation.
        Add that and push the changes.
```

### Step 8: Merge

```
claude> Squash and merge the PR
```

## Example Session

```
# Branch
claude> git checkout -b feature/user-avatars

# Plan
claude> plan: Implement user avatar upload

# Implement
claude> Add the avatar upload API endpoint
claude> Add S3 storage for avatars
claude> Update user model with avatarUrl field
claude> Add avatar display to profile page

# Test
claude> Write tests for avatar upload
claude> Run all tests

# Commit
claude> /smart-commit

# Push
claude> Push this branch

# Create PR
claude> Create a PR with title "Add user avatar support"
```

## PR Description Template

Claude generates descriptions like:

```markdown
## Summary
Add user avatar support with S3 storage.

## Changes
- Add POST /api/users/:id/avatar endpoint
- Integrate AWS S3 for avatar storage
- Add avatarUrl field to User model
- Display avatar in profile with fallback

## Testing
1. Upload an avatar via the profile page
2. Verify it appears in the header
3. Verify default avatar for new users

## Screenshots
[if applicable]
```

## Handling Reviews

### Code Change Requests
```
claude> The reviewer wants us to add rate limiting to the upload
        endpoint. Implement that.
```

### Questions
```
claude> The reviewer is asking why we chose S3 over Cloudinary.
        Draft a response explaining our reasoning.
```

### Approval
```
claude> The PR is approved. Squash merge it.
```

## Branch Naming Conventions

```
feature/description    # New features
fix/description       # Bug fixes
refactor/description  # Code restructuring
docs/description      # Documentation
chore/description     # Maintenance
```

## Commit Discipline

During development, commits can be rough:
```
WIP: avatar upload
fix tests
more fixes
```

Before PR, clean up:
```
claude> Squash these commits into logical units
```

## Multi-PR Features

For large features:

```
claude> This feature is too big for one PR.
        Break it into smaller PRs:
        1. Add avatar model/storage
        2. Add upload endpoint
        3. Add UI components
```

---

[← TDD Workflow](./TDD_WORKFLOW.md) | [Content Workflow →](./CONTENT_WORKFLOW.md)
