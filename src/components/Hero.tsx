import SearchIcon from '@icons/search.svg?react'
import { useFilters } from '../context/FiltersContext'
import styles from './Hero.module.css'

export function Hero() {
  const { searchInput: search, setSearchInput } = useFilters()
  return (
    <div className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>New songs delivered every week</h1>
        <p className={styles.subtitle}>Here are the most recent additions to the Yousician App. Start playing today!</p>
        <div className={styles.searchWrapper}>
          <SearchIcon width={20} height={20} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search for songs by artist or title"
            value={search}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
