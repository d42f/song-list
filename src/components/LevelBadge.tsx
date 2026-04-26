import styles from './LevelBadge.module.css'

interface Props {
  level: number
}

function getLevelClass(level: number): string {
  if (level <= 5) return styles.green
  if (level <= 10) return styles.orange
  return styles.red
}

export function LevelBadge({ level }: Props) {
  return <span className={`${styles.badge} ${getLevelClass(level)}`}>{level}</span>
}
