import { useState } from 'react'
import FilterIcon from '@icons/filter.svg?react'
import { useFilters } from '../context/FiltersContext'
import styles from './LevelFilter.module.css'

function getLevelClass(level: number): string {
  if (level <= 5) return styles.green
  if (level <= 10) return styles.orange
  return styles.red
}

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
        <button className={styles.toggleBtn} onClick={() => setIsOpen((o) => !o)}>
          {isOpen ? 'HIDE FILTER' : 'FILTER BY LEVEL'}
          {!isOpen && badge && <span className={styles.badge}>{badge}</span>}
          <FilterIcon width={20} height={20} className={styles.filterIcon} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.levels}>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((level) => (
            <button
              key={level}
              className={`${styles.levelBtn} ${getLevelClass(level)} ${mappedLevels.has(level) ? styles.selected : ''}`}
              onClick={() => onToggleLevel(level)}
              aria-pressed={mappedLevels.has(level)}
            >
              {level}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
