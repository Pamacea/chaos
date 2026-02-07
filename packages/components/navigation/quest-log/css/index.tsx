'use client'

import React from 'react'
import styles from './quest-log.module.css'

export type QuestStatus = 'available' | 'active' | 'completed' | 'failed'

export interface Quest {
  id: string
  title: string
  description?: string
  status: QuestStatus
  progress?: number
  reward?: string
  level?: number
}

export interface QuestLogProps {
  quests: Quest[]
  activeQuest?: string
  onSelect?: (questId: string) => void
  className?: string
}

export function QuestLog({
  quests,
  activeQuest,
  onSelect,
  className = '',
}: QuestLogProps) {
  const statusIcon: Record<QuestStatus, string> = {
    available: '!',
    active: '?',
    completed: '✓',
    failed: '✗',
  }

  return (
    <div className={`${styles.questLog} ${className}`}>
      <div className={styles.logHeader}>
        <div className={styles.logTitle}>
          <span className={styles.titleIcon}>⚔</span>
          <h2>Quest Log</h2>
        </div>
        <div className={styles.logDecoration}></div>
      </div>

      <div className={styles.questsList}>
        {quests.map((quest, index) => (
          <button
            key={quest.id}
            className={`${styles.quest} ${styles[quest.status]} ${activeQuest === quest.id ? styles.activeQuest : ''}`}
            onClick={() => onSelect?.(quest.id)}
            type="button"
            style={{ '--index': index } as React.CSSProperties}
          >
            <div className={styles.questHeader}>
              <div className={styles.questInfo}>
                <span className={`${styles.statusIcon} ${styles[quest.status]}`}>
                  {statusIcon[quest.status]}
                </span>
                <span className={styles.questTitle}>{quest.title}</span>
                {quest.level && <span className={styles.questLevel}>Lv.{quest.level}</span>}
              </div>
              {quest.reward && <span className={styles.reward}>{quest.reward}</span>}
            </div>

            {quest.description && (
              <p className={styles.questDescription}>{quest.description}</p>
            )}

            {quest.progress !== undefined && (
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ '--progress': `${quest.progress}%` } as React.CSSProperties}>
                  <span className={styles.progressGlow}></span>
                </div>
                <span className={styles.progressText}>{quest.progress}%</span>
              </div>
            )}

            <div className={styles.questBorder}></div>
          </button>
        ))}
      </div>

      <div className={styles.logFooter}>
        <div className={styles.waxSeal}></div>
      </div>
    </div>
  )
}

export default QuestLog
