# Project: Landing Page

Build a static landing page with Claude Code. No frameworks, just HTML and CSS.

## What You'll Build

A simple landing page with:
- Hero section with headline and CTA
- Features section
- Footer
- Responsive design (works on mobile)

## Prerequisites

- Claude Code installed
- A text editor (VS Code, etc.)
- A browser

No Node.js, no npm, no frameworks. Just files.

## Time

About 30 minutes.

---

## Step 1: Create Project Folder

```bash
mkdir landing-page
cd landing-page
```

## Step 2: Start Claude Code

```bash
claude
```

## Step 3: Plan the Page

Use plan mode to think before building:

```
claude> plan: Build a landing page for a fictional product called "TaskFlow" -
a simple task management app. Include a hero section, 3 features, and a footer.
Make it look modern and clean. Use only HTML and CSS, no frameworks.
```

Claude will analyze and propose a structure. Review it, ask questions if needed, then approve.

## Step 4: Generate the HTML

Once the plan is approved, Claude will create your files. You should end up with:

```
landing-page/
├── index.html
└── styles.css
```

## Step 5: Preview

Open `index.html` in your browser:

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

## Step 6: Iterate

Not happy with something? Tell Claude:

```
claude> Make the hero section taller and center the text vertically
```

```
claude> Change the color scheme to use blues instead of purples
```

```
claude> Add a subtle gradient to the background
```

```
claude> Make the feature cards have a hover effect
```

## Step 7: Make It Responsive

```
claude> Make sure this looks good on mobile. Add media queries for screens under 768px.
```

Preview by resizing your browser or using browser dev tools (F12 → device mode).

## Step 8: Add Polish

Some finishing touches to try:

```
claude> Add smooth scroll when clicking navigation links
```

```
claude> Add a simple fade-in animation when the page loads
```

```
claude> Add a favicon
```

---

## Example Prompts

Here's a session flow that works well:

### Initial Build
```
plan: Build a landing page for TaskFlow, a task management app.
Hero with headline "Get More Done", 3 feature cards, and a footer with links.
Modern design, HTML and CSS only.
```

### Styling Adjustments
```
The colors feel too bright. Use a more muted palette with a dark blue primary color.
```

### Layout Changes
```
Stack the feature cards vertically on mobile instead of side by side.
```

### Adding Interactivity
```
Add a mobile hamburger menu that shows/hides the navigation links.
```

---

## Common Issues

### Page looks broken
- Check that `styles.css` is linked correctly in `index.html`
- Look for `<link rel="stylesheet" href="styles.css">` in the `<head>`

### Changes not showing
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Browser might be caching old CSS

### Claude made too many files
- Ask Claude to consolidate: "Combine everything into just index.html and styles.css"

---

## What You Learned

- Using plan mode to scope a project
- Iterating with natural language
- Building without frameworks
- Making responsive designs

## Next Steps

1. **Deploy it**: [Put your page on the internet](../../04-deployment/VERCEL.md)
2. **Level up**: Try the [Todo App](../todo-app/) with React
3. **Customize**: Use this as a template for your own landing page

---

## Challenge: Make It Yours

Try building a landing page for:
- Your own project or idea
- A fictional startup
- A portfolio page

Use the same workflow: Plan → Build → Iterate → Ship.

---

[← First Projects](../README.md) | [Todo App →](../todo-app/)
