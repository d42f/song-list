import { FiltersProvider } from './context/FiltersContext'
import { Hero } from './components/Hero'
import { LevelFilter } from './components/LevelFilter'
import { SongList } from './components/SongList'
import styles from './App.module.css'

export default function App() {
  return (
    <FiltersProvider>
      <div className={styles.app}>
        <Hero />
        <div className={styles.content}>
          <LevelFilter />
          <SongList />
        </div>
      </div>
    </FiltersProvider>
  )
}
