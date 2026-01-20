# Security Reviewer Agent

Scan code for security vulnerabilities.

## Purpose

Automated security review covering:
- OWASP Top 10 vulnerabilities
- Dependency vulnerabilities
- Secret exposure
- Insecure configurations

## Usage

```
claude> Use security-reviewer to scan this codebase
```

```
claude> Security review the authentication module
```

```
claude> Check for vulnerabilities before deployment
```

## What It Checks

### Code Vulnerabilities

| Category | Examples |
|----------|----------|
| Injection | SQL injection, command injection, XSS |
| Authentication | Weak passwords, missing MFA, session issues |
| Authorization | Broken access control, IDOR |
| Data Exposure | Sensitive data in logs, unencrypted storage |
| Configuration | Debug mode in prod, verbose errors |

### Dependency Vulnerabilities
- Known CVEs in dependencies
- Outdated packages with security patches
- Typosquatting detection

### Secret Exposure
- API keys in code
- Passwords in configs
- Private keys committed
- .env files in repo

### Infrastructure
- Insecure headers
- Missing HTTPS
- CORS misconfiguration
- Exposed endpoints

## Example Output

```markdown
## Security Review: my-app

**Risk Level:** Medium (3 high, 5 medium, 12 low)

### Critical Findings

#### 1. SQL Injection in User Search
**Severity:** High
**File:** src/api/users.ts:45
**Issue:** User input directly concatenated into SQL query

```typescript
// Vulnerable
const query = `SELECT * FROM users WHERE name = '${name}'`;

// Fixed
const query = 'SELECT * FROM users WHERE name = $1';
const result = await db.query(query, [name]);
```

#### 2. Exposed API Key
**Severity:** High
**File:** src/config/api.ts:12
**Issue:** Stripe API key hardcoded in source

```typescript
// Vulnerable
const stripe = new Stripe('sk_live_xxx...');

// Fixed
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
```

### Medium Findings

#### 3. Missing Rate Limiting
**Severity:** Medium
**File:** src/api/auth/login.ts
**Issue:** No rate limiting on login endpoint (brute force risk)

### Dependency Vulnerabilities

| Package | Current | Patched | Severity |
|---------|---------|---------|----------|
| lodash | 4.17.15 | 4.17.21 | High |
| axios | 0.21.0 | 0.21.2 | Medium |

### Recommendations

1. **Immediate:** Fix SQL injection and remove hardcoded secrets
2. **Short-term:** Update vulnerable dependencies
3. **Long-term:** Implement security headers and rate limiting
```

## Scan Depth

### Quick Scan
```
claude> security-reviewer --quick
```
Checks: Secrets, obvious vulnerabilities, outdated deps

### Full Scan
```
claude> security-reviewer --full
```
Checks: Everything + manual review suggestions

### Focused Scan
```
claude> security-reviewer --focus=auth
```
Deep dive on specific area

## Integration

### Pre-commit
Run before committing sensitive changes

### CI/CD
Add to pipeline for automated checks

### Pre-deployment
Final check before production release

---

[← Test Runner](../test-runner/) | [Back to Agents](../../README.md)
