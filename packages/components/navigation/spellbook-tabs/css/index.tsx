'use client'

import React from 'react'
import styles from './spellbook-tabs.module.css'

export interface SpellSchool {
  id: string
  name: string
  icon?: string
}

export interface SpellbookTabsProps {
  spellSchools: SpellSchool[]
  activeTab: string
  onChange?: (schoolId: string) => void
  className?: string
}

export function SpellbookTabs({
  spellSchools,
  activeTab,
  onChange,
  className = '',
}: SpellbookTabsProps) {
  return (
    <div className={`${styles.spellbook} ${className}`}>
      <div className={styles.bookCover}>
        <div className={styles.spine}></div>
        <div className={styles.pages}>
          {spellSchools.map((school, index) => (
            <button
              key={school.id}
              className={`${styles.tab} ${activeTab === school.id ? styles.active : ''}`}
              style={{ '--index': index } as React.CSSProperties}
              onClick={() => onChange?.(school.id)}
              type="button"
            >
              <span className={styles.pageEdge}></span>
              <span className={styles.content}>
                {school.icon && <span className={styles.icon}>{school.icon}</span>}
                <span className={styles.name}>{school.name}</span>
              </span>
              <span className={styles.pageMarker}></span>
            </button>
          ))}
        </div>
        <div className={styles.bookCoverFront}></div>
      </div>
      <div className={styles.magicDust}></div>
    </div>
  )
}

export default SpellbookTabs
