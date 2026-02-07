'use client'

import React, { useState } from 'react'
import styles from './inventory-grid.module.css'

export interface InventoryItem {
  id: string
  icon?: string
  name?: string
  count?: number
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  category?: string
}

export interface InventoryGridProps {
  items?: InventoryItem[]
  gridSize?: { rows: number; cols: number }
  onSelect?: (item: InventoryItem) => void
  className?: string
  maxSlots?: number
}

export function InventoryGrid({
  items = [],
  gridSize = { rows: 4, cols: 6 },
  onSelect,
  className = '',
  maxSlots,
}: InventoryGridProps) {
  const totalSlots = maxSlots || gridSize.rows * gridSize.cols
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null)

  const emptySlots = totalSlots - items.length
  const gridItems = [...items, ...Array(emptySlots).fill(null)]

  const rarityColor: Record<NonNullable<InventoryItem['rarity']>, string> = {
    common: '#9d9d9d',
    uncommon: '#5fa849',
    rare: '#4c8cd9',
    epic: '#9b59b6',
    legendary: '#f0a500',
  }

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setHoveredSlot(null)
  }

  return (
    <div className={`${styles.inventory} ${className}`}>
      <div className={styles.inventoryHeader}>
        <div className={styles.titleGroup}>
          <span className={styles.bagIcon}>🎒</span>
          <h3>Inventory</h3>
        </div>
        <div className={styles.goldDisplay}>
          <span className={styles.goldIcon}>💰</span>
          <span>2,450</span>
        </div>
      </div>

      <div
        className={styles.grid}
        style={{
          '--rows': gridSize.rows,
          '--cols': gridSize.cols,
        } as React.CSSProperties}
      >
        {gridItems.map((item, index) => (
          <div
            key={item?.id || `empty-${index}`}
            className={`${styles.slot} ${item ? styles.hasItem : ''} ${draggedItem === item?.id ? styles.dragging : ''} ${hoveredSlot === index ? styles.hoverTarget : ''}`}
            onDragEnter={() => item && setHoveredSlot(index)}
            onDragLeave={() => setHoveredSlot(null)}
            onClick={() => item && onSelect?.(item)}
          >
            {item ? (
              <>
                <div
                  className={styles.item}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  onDragEnd={handleDragEnd}
                  style={{
                    '--rarity': rarityColor[item.rarity || 'common'],
                  } as React.CSSProperties}
                >
                  {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                  {item.count !== undefined && item.count > 1 && (
                    <span className={styles.itemCount}>{item.count}</span>
                  )}
                  {item.rarity && item.rarity !== 'common' && (
                    <div className={styles.rarityGlow}></div>
                  )}
                </div>
                {item.name && <span className={styles.itemTooltip}>{item.name}</span>}
              </>
            ) : (
              <div className={styles.emptySlot}></div>
            )}
            <div className={styles.slotBorder}></div>
          </div>
        ))}
      </div>

      <div className={styles.inventoryFooter}>
        <span className={styles.capacity}>{items.length}/{totalSlots}</span>
      </div>
    </div>
  )
}

export default InventoryGrid
