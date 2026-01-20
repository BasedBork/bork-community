# README Gen

Auto-generate README files from your codebase.

## Usage

```
claude> /readme-gen
```

## What It Does

Analyzes your project and generates a complete README with:

- Project title and description
- Badges (build status, license, version)
- Installation instructions
- Usage examples
- API documentation (if applicable)
- Configuration options
- Contributing guidelines
- License

## Example Output

For a Next.js project:

```markdown
# My Todo App

A simple, fast todo application built with Next.js.

## Features

- Create, edit, and delete todos
- Mark todos as complete
- Filter by status
- Persistent storage with localStorage

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
git clone https://github.com/you/todo-app
cd todo-app
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS

## License

MIT
```

## Options

### Minimal README
```
claude> /readme-gen minimal
```

### With API Docs
```
claude> /readme-gen with api documentation
```

### Specific Sections
```
claude> /readme-gen just installation and usage
```

## What It Analyzes

- `package.json` - Name, description, scripts, dependencies
- Source files - Features, exports, main functionality
- Existing docs - Preserves important existing content
- Config files - Build tools, environment requirements
- License file - License type

## Installation

```bash
curl -L https://raw.githubusercontent.com/basedbork/bork-community/main/05-skills/productivity-pack/readme-gen/SKILL.md > ~/.claude/skills/readme-gen.md
```

---

[← Smart Commit](../smart-commit/) | [Test Gen →](../test-gen/)
