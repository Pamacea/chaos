# Circular Gallery

A rotating circular gallery component for displaying images or content in a circular arrangement.

## Features

- Items arranged in a circular pattern
- Auto-rotation with configurable speed
- Hover to pause rotation
- Click to select/focus item
- Center display shows active item
- Glowing ring effect on active item
- Smooth animations

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Items to display in the circle |
| `radius` | `number` | `200` | Circle radius in pixels |
| `autoRotate` | `boolean` | `true` | Enable auto-rotation |
| `rotateSpeed` | `number` | `30` | Rotation duration in seconds |
| `itemSize` | `number` | `80` | Size of each item in pixels |
| `onItemClick` | `(index: number) => void` | - | Callback when an item is clicked |
| `activeIndex` | `number` | - | Controlled active item index |
| `className` | `string` | - | Additional CSS classes |

## Usage

### CSS Module Version

```tsx
import { CircularGallery } from '@oalacea/chaosui/layout/circular-gallery';

function App() {
  const items = [
    <img src="/image1.jpg" alt="Item 1" />,
    <img src="/image2.jpg" alt="Item 2" />,
    <img src="/image3.jpg" alt="Item 3" />,
    <img src="/image4.jpg" alt="Item 4" />,
  ];

  return (
    <CircularGallery
      radius={200}
      autoRotate={true}
      rotateSpeed={30}
      itemSize={80}
    >
      {items}
    </CircularGallery>
  );
}
```

### With Click Handler

```tsx
import { CircularGallery } from '@oalacea/chaosui/layout/circular-gallery';
import { useState } from 'react';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    <img src="/image1.jpg" alt="Item 1" />,
    <img src="/image2.jpg" alt="Item 2" />,
    <img src="/image3.jpg" alt="Item 3" />,
  ];

  return (
    <CircularGallery
      activeIndex={activeIndex}
      onItemClick={setActiveIndex}
      radius={250}
    >
      {items}
    </CircularGallery>
  );
}
```

### Tailwind Version

```tsx
import { CircularGallery } from '@oalacea/chaosui/layout/circular-gallery/tailwind';

// Same API as CSS Module version
```

## CLI Installation

```bash
# CSS Module version
npx @oalacea/chaosui add circular-gallery --variant css

# Tailwind version
npx @oalacea/chaosui add circular-gallery --variant tailwind
```
