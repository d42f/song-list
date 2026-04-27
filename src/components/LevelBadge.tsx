import styles from './LevelBadge.module.css'

const SIZE = 28
const STROKE = 2.5
const R = SIZE / 2 - STROKE / 2 - 0.5
const CX = SIZE / 2
const CY = SIZE / 2

const GAP_DEG = 8
const SECTION_DEG = (360 - 3 * GAP_DEG) / 3
const LEVELS_PER_SECTION = 5

function getLevelColor(level: number): string {
  if (level <= 5) return 'var(--color-level-green)'
  if (level <= 10) return 'var(--color-level-orange)'
  return 'var(--color-level-red)'
}

function polar(deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180
  return [CX + R * Math.cos(rad), CY + R * Math.sin(rad)]
}

function arcPath(startDeg: number, endDeg: number): string {
  const [x1, y1] = polar(startDeg)
  const [x2, y2] = polar(endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`
}

interface Props {
  className?: string
  level: number
}

export function LevelBadge({ className, level }: Props) {
  const color = getLevelColor(level)

  return (
    <span className={`${styles.wrapper} ${className || ''}`}>
      <svg width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`} className={styles.ring} aria-hidden>
        {Array.from({ length: 3 }, (_, i) => {
          const startDeg = i * (SECTION_DEG + GAP_DEG)
          const endDeg = startDeg + SECTION_DEG
          const progress = Math.min(Math.max(0, level - i * LEVELS_PER_SECTION) / LEVELS_PER_SECTION, 1)
          const fillEndDeg = startDeg + progress * SECTION_DEG

          return (
            <g key={i}>
              <path
                d={arcPath(startDeg, endDeg)}
                fill="none"
                style={{ stroke: 'var(--color-card)' }}
                strokeWidth={STROKE}
                strokeLinecap="butt"
              />
              {progress > 0 && (
                <path
                  d={arcPath(startDeg, fillEndDeg)}
                  fill="none"
                  style={{ stroke: color }}
                  strokeWidth={STROKE}
                  strokeLinecap="butt"
                />
              )}
            </g>
          )
        })}
      </svg>
      {level}
    </span>
  )
}
