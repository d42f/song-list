import styles from './LevelBadge.module.css'

function getLevelClass(level: number): string {
  if (level <= 5) return styles.green
  if (level <= 10) return styles.orange
  return styles.red
}

interface Props {
  className?: string
  level: number
}

export function LevelBadge({ className, level }: Props) {
  return <span className={`${styles.wrapper} ${getLevelClass(level)} ${className || ''}`}>{level}</span>
}
