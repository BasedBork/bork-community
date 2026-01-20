# Auto Format Hook

Automatically format code after Claude makes edits.

## What It Does

Runs your formatter whenever Claude edits or creates files:

- Prettier for JS/TS/CSS/JSON
- Black for Python
- gofmt for Go
- rustfmt for Rust
- Your custom formatters

## Installation

Copy `hooks.yaml` to your project:

```bash
mkdir -p .claude
cp hooks.yaml .claude/hooks.yaml
```

## Prerequisites

Make sure your formatters are installed:

```bash
# JavaScript/TypeScript
npm install -D prettier

# Python
pip install black

# Go (usually included with Go)
# Rust (usually included with Rust)
```

## What's Formatted

| Extension | Formatter |
|-----------|-----------|
| `.ts`, `.tsx` | Prettier |
| `.js`, `.jsx` | Prettier |
| `.css`, `.scss` | Prettier |
| `.json` | Prettier |
| `.md` | Prettier |
| `.py` | Black |
| `.go` | gofmt |
| `.rs` | rustfmt |

## Customization

### Adding Formatters

```yaml
PostToolUse:
  # Your custom formatter
  - name: Format Ruby
    if: (tool == "Edit" || tool == "Write") && endsWith(file, ".rb")
    run: rubocop -a "$file"
```

### Changing Prettier Config

Prettier uses your project's config automatically. Create `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2
}
```

### Disabling for Specific Files

```yaml
# Skip formatting for generated files
- name: Skip generated
  if: contains(file, ".generated.")
  action: skip
```

### Using ESLint Instead

```yaml
- name: ESLint fix
  if: (tool == "Edit" || tool == "Write") && endsWith(file, ".ts")
  run: npx eslint "$file" --fix
```

## Performance

### Debouncing

If Claude makes many rapid edits, consider debouncing:

```yaml
# Only format on Write, not every Edit
- name: Format on save
  if: tool == "Write" && endsWith(file, ".ts")
  run: npx prettier --write "$file"
```

### Project-Specific

Only format in your project:

```yaml
- name: Format TS in src
  if: (tool == "Edit" || tool == "Write") && startsWith(file, "src/") && endsWith(file, ".ts")
  run: npx prettier --write "$file"
```

## Troubleshooting

### Formatter Not Found

Make sure it's installed and in PATH:

```bash
which prettier  # Should show path
npx prettier --version  # Should show version
```

### Slow Formatting

Large files can be slow. Consider:
- Using faster formatters (dprint instead of Prettier)
- Only formatting on Write, not Edit
- Excluding large generated files

### Format Conflicts

If Claude and formatter fight:
1. Check your formatter config matches Claude's style
2. Or disable formatting for the conflicting language

## Example Output

When Claude edits a TypeScript file:

```
Claude edited src/utils/helpers.ts
[auto-format] Running prettier...
[auto-format] Done
```

The file is now formatted according to your project's style.

---

[← Safety Guard](../safety-guard/) | [Back to Hooks](../README.md)
