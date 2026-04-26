import SearchIcon from '../../assets/icons/search.svg?react'
import styles from './Hero.module.css'

interface Props {
  search: string
  onSearchChange: (value: string) => void
}

export function Hero({ search, onSearchChange }: Props) {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>New songs delivered every week</h1>
        <p className={styles.subtitle}>
          Here are the most recent additions to the Yousician App. Start playing today!
        </p>
        <div className={styles.searchWrapper}>
          <SearchIcon width={20} height={20} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search for songs by artist or title"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
