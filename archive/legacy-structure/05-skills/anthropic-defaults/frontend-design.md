# Frontend Design Skill (Anthropic Default)

> **Note**: This is a reference copy of Claude Code's built-in `/frontend-design` skill. This skill is highly recommended for building good-looking UIs.

## What It Does

Creates polished, production-ready UI designs with:
- Modern design principles
- Responsive layouts
- Accessible components
- Consistent styling

## Usage

```
claude> /frontend-design
```

Or invoke naturally:
```
claude> design a dashboard for user analytics
```

```
claude> create a landing page with hero, features, and footer
```

## Why This Skill Matters

Without the frontend-design skill, Claude tends to create functional but plain UIs. With it, you get:
- Proper spacing and typography
- Color harmony
- Visual hierarchy
- Polished interactions

## How It Works

The skill guides Claude to:

1. Consider the design system (if one exists)
2. Apply visual hierarchy principles
3. Ensure responsive behavior
4. Include micro-interactions
5. Follow accessibility guidelines

## Design Principles Applied

### Visual Hierarchy
- Important elements stand out
- Clear reading flow
- Proper heading sizes

### Spacing
- Consistent padding/margins
- Breathing room between elements
- Grid alignment

### Color
- Limited, intentional palette
- Proper contrast ratios
- Semantic color usage (error=red, success=green)

### Typography
- Readable font sizes
- Proper line heights
- Font weight variation for emphasis

### Responsiveness
- Mobile-first approach
- Breakpoints for different screens
- Touch-friendly targets

## Example Prompts

### Dashboard
```
claude> /frontend-design
Design a SaaS dashboard with:
- Sidebar navigation
- Stats cards at the top
- Charts section
- Recent activity list
Use a professional color scheme.
```

### Landing Page
```
claude> /frontend-design
Create a landing page for a productivity app:
- Hero with headline and CTA
- 3 feature highlights with icons
- Testimonial section
- Pricing comparison
- Footer with links
```

### Form
```
claude> /frontend-design
Design a multi-step signup form:
- Progress indicator
- Personal info step
- Preferences step
- Confirmation step
Make it feel modern and friendly.
```

## Styling Approaches

The skill works with:
- **Tailwind CSS**: Most common, utility-first
- **CSS Modules**: Component-scoped styles
- **Styled Components**: CSS-in-JS
- **Plain CSS**: Works too

Specify your preference:
```
claude> /frontend-design with Tailwind CSS
```

## Learning From This Skill

Key patterns:

1. **Design-first thinking**: Considers aesthetics, not just function
2. **Systematic approach**: Uses consistent spacing, colors, typography
3. **User-centered**: Focuses on usability and accessibility
4. **Production-ready**: Output is polished, not prototype-quality

## Tips for Best Results

1. **Be specific about style**: "modern and minimal" vs "playful and colorful"
2. **Reference examples**: "Similar to Linear's dashboard"
3. **Specify constraints**: "Must work on mobile"
4. **Include content hints**: Real headlines work better than "Lorem ipsum"

---

*This is a reference document. The actual skill is built into Claude Code.*
