import { useDeferredValue, useState } from 'react'
import { Hero } from './components/Hero'
import { LevelFilter } from './components/LevelFilter'
import { SongList } from './components/SongList'
import styles from './App.module.css'

export default function App() {
  const [searchInput, setSearchInput] = useState('')
  const search = useDeferredValue(searchInput)
  const [selectedLevels, setSelectedLevels] = useState(new Set<number>())

  function handleToggleLevel(level: number) {
    setSelectedLevels((prev) => {
      const next = new Set(prev)
      next.has(level) ? next.delete(level) : next.add(level)
      return next
    })
  }

  return (
    <div className={styles.app}>
      <Hero search={searchInput} onSearchChange={setSearchInput} />
      <div className={styles.content}>
        <LevelFilter selectedLevels={selectedLevels} onToggleLevel={handleToggleLevel} />
        <SongList search={search} levels={Array.from(selectedLevels)} />
      </div>
    </div>
  )
}
