---
description: Auto-generate README files from codebase analysis
triggers:
  - /readme-gen
  - generate readme
  - create readme
---

# README Generator

## Purpose

Analyze a codebase and generate a comprehensive, well-structured README.md file that accurately describes the project.

## Instructions

When this skill is invoked:

1. **Gather Project Information**
   - Read `package.json` or equivalent (pyproject.toml, Cargo.toml, etc.)
   - Identify the tech stack from dependencies
   - Find existing README.md (if any) for context
   - Scan main source files for features

2. **Determine Project Type**
   - Web app (React, Vue, Next.js, etc.)
   - API/Backend (Express, FastAPI, etc.)
   - CLI tool
   - Library/Package
   - Mobile app

3. **Generate Sections**
   Based on project type, include appropriate sections:

4. **Output the README**
   - Show the generated content
   - Ask if user wants modifications
   - Write to README.md (with approval)

## Section Templates

### Title and Description
```markdown
# {Project Name}

{One-line description from package.json or inferred}

{2-3 sentence expanded description}
```

### Badges (if applicable)
```markdown
![Build Status](badge-url)
![License](badge-url)
![Version](badge-url)
```

### Features
```markdown
## Features

- {Feature 1}
- {Feature 2}
- {Feature 3}
```

### Installation
```markdown
## Installation

### Prerequisites
- {Requirement 1}
- {Requirement 2}

### Steps
\`\`\`bash
{installation commands}
\`\`\`
```

### Usage
```markdown
## Usage

{Basic usage example with code}

### Examples
{More detailed examples}
```

### API Documentation (for libraries/APIs)
```markdown
## API

### `functionName(params)`
{Description}

**Parameters:**
- `param1` - {description}

**Returns:** {return type and description}
```

### Configuration
```markdown
## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| {VAR} | {desc} | {default} |
```

### Contributing
```markdown
## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
```

### License
```markdown
## License

{License type} - see LICENSE file
```

## Project Type Detection

- **Next.js**: Has `next` in dependencies
- **React**: Has `react` but not `next`
- **Express**: Has `express` in dependencies
- **FastAPI**: Has `fastapi` in pyproject.toml
- **CLI**: Has `bin` field in package.json
- **Library**: Has `main` or `exports` but no framework

## Content Guidelines

- Use active voice
- Be concise but complete
- Include working code examples
- Link to relevant documentation
- Use consistent formatting

## Constraints

- Don't invent features that don't exist
- Base all content on actual code analysis
- Preserve valuable content from existing README
- Ask before overwriting existing README
- Keep examples simple and runnable
