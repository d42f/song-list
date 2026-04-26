import SearchIcon from '@icons/search.svg?react'
import { useFilters } from '../context/FiltersContext'
import styles from './Hero.module.css'

export function Hero() {
  const { searchInput: search, setSearchInput } = useFilters()
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>New songs delivered every week</h1>
        <p className={styles.subtitle}>Here are the most recent additions to the Yousician App. Start playing today!</p>
        <label className={styles.searchWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search for songs by artist or title"
            value={search}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchIcon className={styles.searchIcon} />
        </label>
      </div>
    </div>
  )
}
