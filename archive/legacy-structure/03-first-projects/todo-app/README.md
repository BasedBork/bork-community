# Project: Todo App

Build a todo app with Next.js and local storage. Your first React project with Claude Code.

## What You'll Build

A functional todo app with:
- Add, complete, and delete tasks
- Data persists in browser (local storage)
- Clean, modern UI
- Responsive design

## Prerequisites

- Claude Code installed
- Node.js 18+ installed
- Basic understanding of React (helpful but not required)

## Time

About 1 hour.

---

## Step 1: Create Next.js Project

```bash
npx create-next-app@latest todo-app
```

When prompted:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: Yes
- App Router: Yes
- Customize import alias: No

```bash
cd todo-app
```

## Step 2: Start Claude Code

```bash
claude
```

## Step 3: Plan the App

Use plan mode for the overall architecture:

```
claude> plan: Build a todo app with the following features:
- Add new todos with an input field
- Mark todos as complete (checkbox)
- Delete todos
- Persist todos in localStorage
- Show count of remaining todos
- Filter: All / Active / Completed

Use Next.js App Router, TypeScript, and Tailwind CSS.
Keep it simple - one main page component.
```

Review Claude's plan. It should outline:
- Component structure
- State management approach
- localStorage strategy
- UI layout

Approve when ready.

## Step 4: Build Core Functionality

Claude will create or modify files. The main work happens in:

```
src/app/page.tsx      # Main page component
src/app/globals.css   # Global styles (Tailwind)
```

## Step 5: Run the Dev Server

```bash
npm run dev
```

Open http://localhost:3000 to see your app.

## Step 6: Iterate

### Fix Issues
```
claude> The todos aren't persisting after refresh. Make sure we load from localStorage on mount.
```

### Improve UX
```
claude> Add a clear completed button that removes all completed todos at once
```

```
claude> When I press Enter in the input, it should add the todo
```

```
claude> Add a subtle animation when todos are added or removed
```

### Style Improvements
```
claude> Make it look more polished. Add shadows, better spacing, and a nicer color scheme.
```

```
claude> Add dark mode support
```

## Step 7: Add Features

Try adding these one at a time:

### Edit Mode
```
claude> Let me double-click a todo to edit its text inline
```

### Due Dates
```
claude> Add optional due dates to todos. Show overdue items in red.
```

### Categories
```
claude> Add ability to tag todos with categories and filter by them
```

---

## Project Structure

After building, your structure should look like:

```
todo-app/
├── src/
│   ├── app/
│   │   ├── page.tsx        # Main todo app
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Tailwind + custom styles
│   └── components/         # (optional) extracted components
│       ├── TodoItem.tsx
│       ├── TodoInput.tsx
│       └── TodoFilter.tsx
├── package.json
└── ...
```

---

## Key Concepts

### State Management

For a simple todo app, React's `useState` is enough:

```typescript
const [todos, setTodos] = useState<Todo[]>([])
```

### localStorage Persistence

Load on mount, save on change:

```typescript
// Load
useEffect(() => {
  const saved = localStorage.getItem('todos')
  if (saved) setTodos(JSON.parse(saved))
}, [])

// Save
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])
```

### Type Safety

Define your todo type:

```typescript
interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}
```

---

## Common Issues

### Hydration Errors

If you see "hydration mismatch" errors:
```
claude> I'm getting hydration errors. The localStorage state differs between server and client.
```

Fix: Check for window existence or use `useEffect` for localStorage reads.

### Todos Not Saving

```
claude> My todos disappear when I refresh. Debug the localStorage saving.
```

### Styling Not Applying

Make sure Tailwind is configured correctly:
```
claude> Tailwind classes aren't working. Check the configuration.
```

---

## Example Session

Here's a realistic session flow:

```
# Start planning
plan: Build a todo app with add, complete, delete, and localStorage persistence.
Use Next.js, TypeScript, Tailwind.

# After initial build
The add button isn't working. Debug why todos aren't being added.

# After fix
Good. Now make the input clear after adding a todo.

# Styling
Make it look nicer. Use a card layout with shadows.

# Features
Add ability to filter by All/Active/Completed.

# Polish
Add a fade-in animation for new todos.
```

---

## What You Learned

- Building React apps with Claude Code
- Managing state with hooks
- Persisting data with localStorage
- Iterative development workflow

## Next Steps

1. **Deploy it**: [Push to GitHub](../../04-deployment/GITHUB.md) and [deploy to Vercel](../../04-deployment/VERCEL.md)
2. **Add a database**: Replace localStorage with [Supabase](../../04-deployment/SUPABASE.md)
3. **Try more projects**: [CLI Tool](../cli-tool/) or [API Wrapper](../api-wrapper/)

---

## Challenge: Extend It

Try adding:
- Drag and drop reordering
- Multiple todo lists
- Collaboration (share list via URL)
- Keyboard shortcuts

Each feature is a chance to practice the Claude Code workflow.

---

[← Landing Page](../landing-page/) | [Deployment →](../../04-deployment/)
