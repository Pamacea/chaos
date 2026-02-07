/**
 * BrokenGrid Component
 *
 * A CSS Grid layout where each item is chaotically offset with rotation and translation.
 * Items overlap intentionally creating a broken, chaotic layout that "fixes" on hover.
 *
 * Features:
 * - Random rotation and translation based on chaosLevel
 * - Items overlap with varying z-indexes
 * - Hover brings item to front and resets transform
 * - Optional text truncation with █████ pattern
 * - Configurable border style and hover shadow
 * - Grid span support for irregular layouts
 */

export { BrokenGrid, default } from './css';
export type { GridItem, BrokenGridProps } from './css';
export { BrokenGrid as BrokenGridTailwind, default as defaultTailwind } from './tailwind';
export type { GridItem as GridItemTailwind, BrokenGridProps as BrokenGridPropsTailwind } from './tailwind';
