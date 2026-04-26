import { useDeferredValue, useState } from 'react'
import { Hero } from './components/Hero'
import { LevelFilter } from './components/LevelFilter'
import { Loader } from './components/Loader'
import { SongList } from './components/SongList'
import { useFavorites, useSongs } from './hooks/useApi'
import styles from './App.module.css'

export default function App() {
  const [searchInput, setSearchInput] = useState('')
  const search = useDeferredValue(searchInput)
  const [selectedLevels, setSelectedLevels] = useState(new Set<number>())
  const { data, isFetchingNextPage, hasNextPage, isError, refetch, isLoading, fetchNextPage } =
    useSongs(search, Array.from(selectedLevels))
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  const songs = data?.pages.flatMap((p) => p.songs) ?? []

  function handleToggleLevel(level: number) {
    setSelectedLevels((prev) => {
      const next = new Set(prev)
      next.has(level) ? next.delete(level) : next.add(level)
      return next
    })
  }

  function handleToggleFavorite(songId: string, favoriteId?: number) {
    if (favoriteId) {
      removeFavorite(favoriteId)
    } else {
      addFavorite(songId)
    }
  }

  return (
    <div className={styles.app}>
      <Hero search={searchInput} onSearchChange={setSearchInput} />
      <div className={styles.content}>
        <LevelFilter selectedLevels={selectedLevels} onToggleLevel={handleToggleLevel} />
        {isLoading ? (
          <Loader />
        ) : (
          <SongList
            songs={songs}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={!!hasNextPage}
            isError={isError}
            onRetry={refetch}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </div>
  )
}
