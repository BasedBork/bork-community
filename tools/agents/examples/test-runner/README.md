# Test Runner Agent

Run tests and analyze failures with detailed reports.

## Purpose

Automates the test-debug cycle:
1. Run the test suite
2. Capture failures
3. Analyze root causes
4. Suggest fixes

## Usage

```
claude> Use test-runner to check the tests
```

```
claude> Run tests and explain any failures
```

```
claude> test-runner for the auth module
```

## What It Does

### 1. Framework Detection
Automatically detects:
- Jest
- Vitest
- Mocha
- pytest
- Go test
- Rust cargo test

### 2. Test Execution
- Runs the full suite or specific tests
- Captures stdout, stderr, and exit codes
- Handles timeouts gracefully

### 3. Failure Analysis
For each failure:
- Parses the error message
- Locates the failing test
- Reads the test and source code
- Identifies the root cause

### 4. Reporting
Generates actionable reports with:
- Pass/fail summary
- Detailed failure breakdown
- Fix suggestions
- Re-run commands

## Example Output

```markdown
## Test Results

**Summary:** 47 passed, 3 failed, 2 skipped

### Failures

#### 1. UserService.createUser should hash password
**File:** tests/services/user.test.ts:45
**Error:** Expected hash to match, received plain text

**Analysis:**
The `hashPassword` function isn't being called. Looking at
`src/services/user.ts:23`, the password is assigned directly
without hashing.

**Suggested Fix:**
```typescript
// In src/services/user.ts:23
- user.password = data.password;
+ user.password = await hashPassword(data.password);
```

**Re-run:** `npm test -- --grep "should hash password"`

---

#### 2. API rate limiting should block after 100 requests
**File:** tests/api/rate-limit.test.ts:78
**Error:** Timeout - test took longer than 5000ms

**Analysis:**
The test is making real HTTP requests. Should use mocked
responses for rate limit testing.

**Suggested Fix:**
Mock the HTTP client or reduce the request count for testing.

---
```

## Options

### Run Specific Tests
```
claude> test-runner for files matching *auth*
```

### Watch Mode
```
claude> test-runner in watch mode
```

### Coverage Report
```
claude> test-runner with coverage
```

## Supported Frameworks

| Framework | Detection | Command |
|-----------|-----------|---------|
| Jest | jest.config.* | `npm test` |
| Vitest | vitest.config.* | `npm test` |
| pytest | pytest.ini, pyproject.toml | `pytest` |
| Go | *_test.go files | `go test` |
| Rust | Cargo.toml | `cargo test` |

---

[← Explore Enhanced](../explore-enhanced/) | [Security Reviewer →](../security-reviewer/)
