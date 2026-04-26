import { useState } from 'react'
import FilterIcon from '@icons/filter.svg?react'
import { useFilters } from '../context/FiltersContext'
import { LevelBadge } from './LevelBadge'
import styles from './LevelFilter.module.css'

function getSelectedBadge(levels: Set<number>): string | null {
  if (levels.size === 0) return null
  const sorted = Array.from(levels).sort((a, b) => a - b)
  if (sorted.length === 1) return String(sorted[0])
  return `${sorted[0]} - ${sorted[sorted.length - 1]}`
}

export function LevelFilter() {
  const { mappedLevels, handleToggleLevel: onToggleLevel } = useFilters()
  const [isOpen, setIsOpen] = useState(false)
  const badge = getSelectedBadge(mappedLevels)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.toggleBtnText}>{isOpen ? 'HIDE FILTER' : 'FILTER BY LEVEL'}</span>
        <button className={`${styles.toggleBtn} ${badge ? styles.active : ''}`} onClick={() => setIsOpen((o) => !o)}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <span className={styles.filterIcon}>
            <FilterIcon />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className={styles.levels}>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((level) => (
            <button
              key={level}
              className={`${styles.levelBtn} ${mappedLevels.has(level) ? styles.selected : ''}`}
              onClick={() => onToggleLevel(level)}
              aria-pressed={mappedLevels.has(level)}
            >
              <LevelBadge className={styles.levelBadge} level={level} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
