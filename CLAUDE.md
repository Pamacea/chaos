# CLAUDE.md - AI Instructions for Chaos

This file provides guidance for AI assistants working with this component library.

## Project Structure

```
chaos/
├── components/           # UI components (each in its own folder)
│   └── [component-name]/
│       ├── index.html    # Demo/preview file
│       ├── style.css     # Component styles
│       └── script.js     # Component logic (if needed)
├── README.md             # Project documentation
├── CLAUDE.md             # This file
└── LICENSE               # MIT License
```

## Component Guidelines

### Creating a New Component

1. Create a folder in `components/` with a descriptive name (kebab-case)
2. Include at minimum:
   - `index.html` - Standalone demo that works when opened directly
   - `style.css` - All styles scoped to avoid conflicts
3. Optional:
   - `script.js` - JavaScript functionality
   - `README.md` - Component-specific documentation

### Code Style

- **CSS**: Use CSS custom properties (variables) for theming
- **JS**: Vanilla JavaScript preferred, no frameworks required
- **HTML**: Semantic markup, accessible where possible
- **Naming**: BEM-ish naming or scoped classes to prevent conflicts

### Component Philosophy

- **Self-contained**: Each component should work in isolation
- **Creative**: Prioritize visual impact and interesting effects
- **Hackable**: Code should be easy to understand and modify
- **No dependencies**: Pure HTML/CSS/JS, no build steps required

## Adding Components

When adding a component from external sources (CodePen, demos, etc.):

1. Extract and organize into the component folder structure
2. Clean up the code (remove unnecessary vendor prefixes, etc.)
3. Add comments explaining complex parts
4. Test that the demo works standalone
5. Update the main README.md component list

## Example Component Structure

```html
<!-- components/glowing-button/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glowing Button - Chaos</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <button class="chaos-glowing-btn">Click Me</button>
  <script src="script.js"></script>
</body>
</html>
```
