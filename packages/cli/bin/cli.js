#!/usr/bin/env node

import { Command } from 'commander';
import pc from 'picocolors';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COMPONENTS_DIR = path.join(__dirname, '..', 'components');

// Component registry
const COMPONENTS = {
  // Overlays
  'noise-overlay': { category: 'overlays', description: 'SVG fractal noise texture overlay', status: 'ready' },
  'scanlines': { category: 'overlays', description: 'CRT-style horizontal scanlines', status: 'ready' },
  'vignette': { category: 'overlays', description: 'Dark edges radial gradient', status: 'ready' },
  'static-flicker': { category: 'overlays', description: 'Animated noise with flicker effect', status: 'ready' },
  
  // Text effects
  'glitch-text': { category: 'text', description: 'RGB split glitch text effect', status: 'ready' },
  'flicker-text': { category: 'text', description: 'Text that flickers randomly', status: 'ready' },
  'distortion-text': { category: 'text', description: 'Wave/shake/skew/blur text effects', status: 'ready' },
  'falling-text': { category: 'text', description: 'Letters falling in cascade', status: 'ready' },
  'typing-text': { category: 'text', description: 'Terminal typing effect', status: 'ready' },
  'char-glitch': { category: 'text', description: 'Per-character glitch effect', status: 'ready' },
  'reveal-text': { category: 'text', description: 'Text reveal on scroll', status: 'ready' },
  'strike-reveal': { category: 'text', description: 'Strikethrough then reveal', status: 'ready' },
  'giant-layers': { category: 'text', description: 'Giant text with 3D shadow layers', status: 'ready' },
  'blood-drip': { category: 'text', description: 'Dripping blood effect letters', status: 'ready' },
  'rotate-text': { category: 'text', description: 'Vertical rotating text', status: 'ready' },
  'ascii-art': { category: 'text', description: 'Styled ASCII art block', status: 'ready' },
  'countdown-display': { category: 'text', description: 'Stylized countdown timer', status: 'ready' },
  'terminal-output': { category: 'text', description: 'Terminal block with prompt', status: 'ready' },
  
  // Buttons
  'glitch-button': { category: 'buttons', description: 'Button with glitch hover effect', status: 'ready' },
  'chaos-button': { category: 'buttons', description: 'Chaotic animated button with debris', status: 'ready' },
  'dead-button': { category: 'buttons', description: 'Destroyed/glitched button with layers', status: 'ready' },
  'deeper-button': { category: 'buttons', description: 'Go deeper style descent button', status: 'ready' },
  'dual-choice': { category: 'buttons', description: 'Yes/No dual button choice', status: 'ready' },
  'cta-brutal': { category: 'buttons', description: 'Brutalist CTA button', status: 'ready' },
  'tension-bar': { category: 'buttons', description: 'Dramatic tension/progress bar', status: 'ready' },
  
  // Backgrounds
  'noise-canvas': { category: 'backgrounds', description: 'Animated noise canvas background', status: 'ready' },
  'light-beams': { category: 'backgrounds', description: 'Vertical colored light beams', status: 'ready' },
  'glow-orbs': { category: 'backgrounds', description: 'Floating blurred orbs', status: 'ready' },
  'particle-field': { category: 'backgrounds', description: 'Drifting particle background', status: 'ready' },
  'arcane-circle': { category: 'fantasy', description: 'Rotating magical circle with glowing runes', status: 'ready' },
  'starfall': { category: 'fantasy', description: 'Falling magical stars with trails', status: 'ready' },
  
  // Effects
  'warning-tape': { category: 'effects', description: 'Scrolling warning tape banner', status: 'ready' },
  'cursor-follower': { category: 'effects', description: 'Custom cursor with trail', status: 'ready' },
  'screen-distortion': { category: 'effects', description: 'Full screen distortion effect', status: 'ready' },
  'glowing-border': { category: 'effects', description: 'Glowing border container with pulse', status: 'ready' },
  'glitch-image': { category: 'effects', description: 'Image with RGB glitch on hover', status: 'ready' },
  
  // Neon components
  'neon-button': { category: 'neon', description: 'Button with neon glow effect', status: 'ready' },
  'neon-badge': { category: 'neon', description: 'Luminous status badges', status: 'ready' },
  'neon-progress': { category: 'neon', description: 'Glowing progress bar with shimmer', status: 'ready' },
  'neon-toggle': { category: 'neon', description: 'On/off switch with neon glow', status: 'ready' },
  'neon-alert': { category: 'neon', description: 'Alert notifications with neon style', status: 'ready' },
  'neon-tabs': { category: 'neon', description: 'Tab navigation with glow effect', status: 'ready' },
  'neon-divider': { category: 'neon', description: 'Luminous section dividers', status: 'ready' },
  
  // Cyber components
  'cyber-input': { category: 'cyber', description: 'Input with animated border glow', status: 'ready' },
  'cyber-loader': { category: 'cyber', description: 'Futuristic spinners and loaders', status: 'ready' },
  'cyber-modal': { category: 'cyber', description: 'Modal with scanlines and glow', status: 'ready' },
  'cyber-avatar': { category: 'cyber', description: 'Avatar with neon border and status', status: 'ready' },
  'cyber-slider': { category: 'cyber', description: 'Slider with neon track and thumb', status: 'ready' },
  'cyber-tooltip': { category: 'cyber', description: 'Terminal-style tooltips', status: 'ready' },
  
  // Layout components
  'hologram-card': { category: 'layout', description: 'Holographic card with scanlines', status: 'ready' },
  'data-grid': { category: 'layout', description: 'Terminal-style data table', status: 'ready' },
  'horizontal-scroll': { category: 'layout', description: 'Horizontal scrolling panels', status: 'ready' },
  'void-frame': { category: 'layout', description: 'Frame with decorative corners', status: 'ready' },
  'tower-pricing': { category: 'layout', description: 'Vertical stacked pricing cards', status: 'ready' },
  'spec-grid': { category: 'layout', description: 'Terminal-style specs grid', status: 'ready' },
  'tracklist': { category: 'layout', description: 'Music tracklist component', status: 'ready' },
  'strata-section': { category: 'layout', description: 'Geological layer section with jagged edges', status: 'ready' },
  
  // Navigation
  'hexagon-menu': { category: 'navigation', description: 'Honeycomb hexagon menu', status: 'ready' },
  'scattered-nav': { category: 'navigation', description: 'Scattered fragment navigation', status: 'ready' },
  'vertical-nav': { category: 'navigation', description: 'Vertical nav with glyphs', status: 'ready' },
  'brutal-nav': { category: 'navigation', description: 'Brutalist chaotic navigation', status: 'ready' },
  'progress-dots': { category: 'navigation', description: 'Section progress indicator', status: 'ready' },
  'scroll-indicator': { category: 'navigation', description: 'Vertical scroll indicator', status: 'ready' },
  
  // Decorative
  'rune-symbols': { category: 'decorative', description: 'Animated runic symbols', status: 'ready' },
  'ornaments': { category: 'decorative', description: 'Medieval ornaments', status: 'ready' },
  'coffee-stain': { category: 'decorative', description: 'Coffee stain/aged paper effect', status: 'ready' },
  'sheet-music': { category: 'decorative', description: 'Floating music notes', status: 'ready' },
  'inscription': { category: 'decorative', description: 'Stone carved inscription', status: 'ready' },

  // Inputs
  'chat-interface': { category: 'inputs', description: 'AI chat interface with messages', status: 'ready' },
  'secret-reveal': { category: 'inputs', description: 'Content revealed on interaction', status: 'ready' },
  'draggable-document': { category: 'inputs', description: 'Draggable folder document with flip', status: 'ready' },

  // Fantasy - Backgrounds
  'arcane-circle': { category: 'fantasy', description: 'Magical arcane circle with rotating runes', status: 'ready' },
  'starfall': { category: 'fantasy', description: 'Falling stars with trails effect', status: 'ready' },

  // Fantasy - Buttons
  'spell-button': { category: 'fantasy', description: 'Magical spell casting button', status: 'ready' },
  'rune-button': { category: 'fantasy', description: 'Norse rune inscribed button', status: 'ready' },
  'quest-scroll': { category: 'fantasy', description: 'Ancient quest scroll button', status: 'ready' },
  'potion-flask': { category: 'fantasy', description: 'Bubbling potion flask button', status: 'ready' },

  // Fantasy - Navigation
  'spellbook-tabs': { category: 'fantasy', description: 'Spellbook inspired tab navigation', status: 'ready' },
  'quest-log': { category: 'fantasy', description: 'Fantasy quest log navigation', status: 'ready' },
  'inventory-grid': { category: 'fantasy', description: 'RPG-style inventory grid', status: 'ready' },

  // Fantasy - Text
  'incantation': { category: 'fantasy', description: 'Magical incantation text effect', status: 'ready' },
  'prophecy': { category: 'fantasy', description: 'Revealing prophecy text animation', status: 'ready' },
  'runes-reveal': { category: 'fantasy', description: 'Ancient runes to text reveal', status: 'ready' },
  'ancient-scroll': { category: 'fantasy', description: 'Ancient scroll text container', status: 'ready' },

  // Fantasy - Effects
  'spell-cast': { category: 'fantasy', description: 'Spell casting burst effect', status: 'ready' },
  'heal-pulse': { category: 'fantasy', description: 'Healing pulse wave effect', status: 'ready' },
};

const program = new Command();

program
  .name('chaos-ui')
  .description('Add glitch & noise components to your project')
  .version('0.1.0');

// LIST command
program
  .command('list')
  .description('List all available components')
  .action(() => {
    console.log(pc.bold('\n🗡️  Chaos UI Components\n'));
    
    const categories = {};
    for (const [name, info] of Object.entries(COMPONENTS)) {
      if (!categories[info.category]) categories[info.category] = [];
      categories[info.category].push({ name, ...info });
    }
    
    for (const [category, components] of Object.entries(categories)) {
      console.log(pc.cyan(`  ${category}/`));
      for (const comp of components) {
        console.log(`    ${pc.white(comp.name.padEnd(20))} ${pc.dim(comp.description)}`);
      }
      console.log();
    }
  });

// ADD command
program
  .command('add [component]')
  .description('Add a component to your project')
  .option('-d, --dir <path>', 'Target directory', './components/chaos')
  .option('-v, --variant <type>', 'Styling variant: css or tailwind', 'css')
  .option('-y, --yes', 'Skip confirmation')
  .action(async (componentName, options) => {
    const variant = options.variant.toLowerCase();
    if (!['css', 'tailwind'].includes(variant)) {
      console.log(pc.red(`\n✗ Invalid variant "${variant}". Use 'css' or 'tailwind'.\n`));
      return;
    }

    // If no component specified, show interactive picker
    if (!componentName) {
      const choices = Object.entries(COMPONENTS).map(([name, info]) => ({
        title: name,
        description: info.description,
        value: name,
      }));
      
      const response = await prompts([
        {
          type: 'autocomplete',
          name: 'component',
          message: 'Which component?',
          choices,
          suggest: (input, choices) => 
            choices.filter(c => c.title.includes(input) || c.description.toLowerCase().includes(input.toLowerCase()))
        },
        {
          type: 'select',
          name: 'variant',
          message: 'Styling variant?',
          choices: [
            { title: 'CSS Modules', value: 'css' },
            { title: 'Tailwind', value: 'tailwind' },
          ],
          initial: variant === 'tailwind' ? 1 : 0,
        }
      ]);
      
      if (!response.component) {
        console.log(pc.dim('Cancelled.'));
        return;
      }
      componentName = response.component;
      options.variant = response.variant || variant;
    }
    
    // Validate component exists
    if (!COMPONENTS[componentName]) {
      console.log(pc.red(`\n✗ Component "${componentName}" not found.`));
      console.log(pc.dim(`  Run ${pc.white('chaos-ui list')} to see available components.\n`));
      return;
    }
    
    const info = COMPONENTS[componentName];
    const baseDir = path.join(COMPONENTS_DIR, info.category, componentName);
    
    // Check if component has variant subdirs or is legacy (flat structure)
    const variantDir = path.join(baseDir, options.variant);
    const hasVariants = fs.existsSync(path.join(baseDir, 'css')) || fs.existsSync(path.join(baseDir, 'tailwind'));
    const sourceDir = hasVariants ? variantDir : baseDir;
    const targetDir = path.resolve(options.dir, info.category);
    
    // Check source exists
    if (!fs.existsSync(sourceDir)) {
      if (hasVariants) {
        console.log(pc.yellow(`\n⚠ Variant "${options.variant}" not available for "${componentName}".`));
        const available = [];
        if (fs.existsSync(path.join(baseDir, 'css'))) available.push('css');
        if (fs.existsSync(path.join(baseDir, 'tailwind'))) available.push('tailwind');
        console.log(pc.dim(`  Available variants: ${available.join(', ')}\n`));
      } else {
        console.log(pc.yellow(`\n⚠ Component "${componentName}" is not yet implemented.`));
        console.log(pc.dim('  Coming soon!\n'));
      }
      return;
    }
    
    // Confirm
    if (!options.yes) {
      const variantLabel = hasVariants ? ` (${pc.magenta(options.variant)})` : '';
      const confirm = await prompts({
        type: 'confirm',
        name: 'value',
        message: `Add ${pc.cyan(componentName)}${variantLabel} to ${pc.dim(targetDir)}?`,
        initial: true,
      });
      
      if (!confirm.value) {
        console.log(pc.dim('Cancelled.'));
        return;
      }
    }
    
    // Copy files
    try {
      await fs.ensureDir(targetDir);
      await fs.copy(sourceDir, path.join(targetDir, componentName));
      
      console.log(pc.green(`\n✓ Added ${componentName}`) + (hasVariants ? pc.magenta(` (${options.variant})`) : ''));
      console.log(pc.dim(`  → ${path.join(targetDir, componentName)}\n`));
      
      // Show usage hint
      const pascalName = componentName
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
      
      console.log(pc.dim('  Import:'));
      console.log(pc.white(`  import { ${pascalName} } from './components/chaos/${info.category}/${componentName}';\n`));
      
    } catch (err) {
      console.log(pc.red(`\n✗ Failed to add component: ${err.message}\n`));
    }
  });

// INIT command
program
  .command('init')
  .description('Initialize chaos-ui in your project')
  .action(async () => {
    console.log(pc.bold('\n🗡️  Initializing Chaos UI...\n'));
    
    const response = await prompts([
      {
        type: 'select',
        name: 'framework',
        message: 'Framework?',
        choices: [
          { title: 'React', value: 'react' },
          { title: 'Vue', value: 'vue' },
          { title: 'Vanilla (HTML/CSS/JS)', value: 'vanilla' },
        ],
      },
      {
        type: 'select',
        name: 'styling',
        message: 'Styling?',
        choices: [
          { title: 'CSS Modules', value: 'css-modules' },
          { title: 'Plain CSS', value: 'css' },
          { title: 'Tailwind (with CSS vars)', value: 'tailwind' },
        ],
      },
      {
        type: 'text',
        name: 'dir',
        message: 'Components directory?',
        initial: './components/chaos',
      },
    ]);
    
    if (!response.framework) {
      console.log(pc.dim('Cancelled.'));
      return;
    }
    
    // Create config file
    const config = {
      framework: response.framework,
      styling: response.styling,
      componentsDir: response.dir,
    };
    
    await fs.writeJson('./chaos-ui.json', config, { spaces: 2 });
    await fs.ensureDir(response.dir);
    
    console.log(pc.green('\n✓ Initialized!'));
    console.log(pc.dim(`  Config: ${pc.white('./chaos-ui.json')}`));
    console.log(pc.dim(`  Components: ${pc.white(response.dir)}\n`));
    console.log(pc.dim(`  Run ${pc.white('chaos-ui add <component>')} to add components.\n`));
  });

program.parse();
