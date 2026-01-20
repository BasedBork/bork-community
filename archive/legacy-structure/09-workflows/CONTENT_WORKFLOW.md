# Content Workflow

Research → Draft → Publish with Claude Code.

## The Pattern

```
Research → Outline → Draft → Edit → Publish
    ↓         ↓        ↓       ↓       ↓
  Gather   Structure  Write  Refine   Ship
```

## Use Cases

- Blog posts
- Documentation
- Tutorials
- Technical articles
- README files
- Product copy

## The Workflow

### Step 1: Research

```
claude> Research: What are the best practices for React error
        boundaries? Gather key points for a blog post.
```

Claude researches and summarizes findings.

### Step 2: Outline

```
claude> Create an outline for a blog post about error boundaries.
        Target audience: React developers, intermediate level.
```

Claude produces:
```markdown
## Outline: React Error Boundaries

1. Introduction
   - What goes wrong without error boundaries
   - What we'll cover

2. What Are Error Boundaries?
   - Definition
   - How they work
   - Limitations (only catch render errors)

3. Implementing Error Boundaries
   - Class component approach
   - The getDerivedStateFromError lifecycle
   - componentDidCatch for logging

4. Best Practices
   - Where to place boundaries
   - Granularity considerations
   - Fallback UI design

5. Common Patterns
   - Page-level boundaries
   - Component-level boundaries
   - With React Query/SWR

6. Conclusion
   - Key takeaways
   - Further reading
```

### Step 3: First Draft

```
claude> Write the first draft based on this outline.
        Keep it conversational but technically accurate.
        Include code examples.
```

Claude writes the full draft.

### Step 4: Review and Edit

```
claude> Review this draft for:
        - Technical accuracy
        - Clarity
        - Flow
        - Missing information
```

Claude provides feedback.

```
claude> Apply those edits
```

### Step 5: Polish

```
claude> Polish the introduction - make it hook the reader
```

```
claude> Add a better code example for the fallback UI section
```

```
claude> Check for typos and grammar
```

### Step 6: Metadata

```
claude> Generate metadata:
        - SEO title (under 60 chars)
        - Meta description (under 160 chars)
        - Social media excerpt
        - Tags/categories
```

### Step 7: Publish

```
claude> Format this for [platform]:
        - Dev.to (markdown with front matter)
        - Medium (clean markdown)
        - Our blog (with custom components)
```

## Example: Tutorial Creation

```
# Research
claude> Research: What do developers struggle with when learning
        TypeScript generics?

# Outline
claude> Create a tutorial outline for TypeScript generics.
        Focus on practical examples, not theory.

# Draft section by section
claude> Write the "Why Generics?" section
claude> Write the "Your First Generic Function" section
claude> Write the "Generic Constraints" section

# Code examples
claude> Create a practical example: a type-safe API wrapper
        using generics

# Review
claude> Is this beginner-friendly? What assumptions are we making?

# Polish
claude> Add transitions between sections
claude> Make sure each example is runnable
```

## Content Types

### Blog Posts
- Hook in first paragraph
- Scannable with headers
- Code examples with explanations
- Clear takeaways

### Documentation
- Task-oriented structure
- Complete examples
- Prerequisites stated
- Related pages linked

### Tutorials
- Step-by-step format
- Verify each step works
- Common errors addressed
- Final result shown

## Quality Checklist

Before publishing:

- [ ] Factually accurate?
- [ ] Target audience appropriate?
- [ ] Examples tested and working?
- [ ] Typos and grammar checked?
- [ ] Metadata complete?
- [ ] Links working?
- [ ] Images/diagrams added?

## Tips

### Research Depth
```
claude> Go deeper on the performance implications section.
        What are the actual numbers?
```

### Voice Consistency
```
claude> Make sure the voice stays conversational throughout.
        We're teaching, not lecturing.
```

### Example Quality
```
claude> This example is too abstract. Use a real-world scenario
        like a todo app or user authentication.
```

---

[← PR Workflow](./PR_WORKFLOW.md) | [Obsidian Workflow →](./OBSIDIAN_WORKFLOW.md)
