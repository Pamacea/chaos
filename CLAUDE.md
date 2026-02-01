# CLAUDE.md - AI Instructions for Chaos UI

A copy-paste component library for glitch, noise, and distortion effects in React.

## Project Structure

```
chaos/
├── apps/
│   └── web/                    # Documentation site (Next.js)
│       └── src/app/
│           ├── page.tsx        # Homepage
│           ├── about/          # About page
│           └── docs/           # Component docs
├── packages/
│   ├── cli/                    # npx chaos-ui CLI
│   │   └── bin/cli.js
│   └── components/             # All UI components
│       ├── backgrounds/        # Background effects
│       │   ├── glow-orbs/
│       │   ├── light-beams/
│       │   ├── noise-canvas/
│       │   └── particle-field/
│       ├── buttons/            # Button components
│       │   ├── chaos-button/
│       │   └── glitch-button/
│       ├── effects/            # Special effects
│       │   ├── cursor-follower/
│       │   ├── screen-distortion/
│       │   └── warning-tape/
│       ├── overlays/           # Overlay effects
│       │   ├── noise-overlay/
│       │   ├── scanlines/
│       │   ├── static-flicker/
│       │   └── vignette/
│       └── text/               # Text effects
│           ├── distortion-text/
│           ├── falling-text/
│           ├── flicker-text/
│           └── glitch-text/
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Component Structure

Each component follows the same pattern:

```
component-name/
├── index.tsx               # React component
└── component-name.module.css   # CSS Module styles
```

## Development Guidelines

### Adding a New Component

1. Create folder in appropriate category under `packages/components/`
2. Create `index.tsx` with the component
3. Create `component-name.module.css` for styles
4. Add to CLI registry in `packages/cli/bin/cli.js`
5. Add documentation page in `apps/web/src/app/docs/[component]/`

### Code Style

- **TypeScript**: All components in `.tsx`
- **CSS Modules**: Scoped styles with `.module.css`
- **Props**: Fully typed with defaults
- **Animations**: Pure CSS, no JS runtime
- **Customization**: CSS custom properties for theming

### Component Philosophy

- Self-contained: Each component works standalone
- No dependencies: Pure React + CSS
- Copy-paste friendly: Components go in user's codebase
- Accessible when possible, chaotic by design

## CLI Usage

```bash
# Add component to project
npx chaos-ui add glitch-text

# List all components
npx chaos-ui list

# Initialize chaos in project
npx chaos-ui init
```

## Running Locally

```bash
# Install deps
pnpm install

# Run docs site
cd apps/web && pnpm dev

# Test CLI locally
node packages/cli/bin/cli.js list
```
