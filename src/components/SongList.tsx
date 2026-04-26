import { useCallback } from 'react'
import { useFilters } from '../context/FiltersContext'
import { useSongs } from '../hooks/useApi'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { Loader } from './Loader'
import { SongItem } from './SongItem'
import styles from './SongList.module.css'

export function SongList() {
  const { search, levels } = useFilters()
  const { data, isFetchingNextPage, hasNextPage, isError, refetch, isLoading, fetchNextPage } = useSongs(search, levels)

  const songs = data?.pages.flatMap((p) => p.songs) ?? []

  const handleSentinel = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const sentinelRef = useIntersectionObserver<HTMLDivElement>(handleSentinel, !!hasNextPage)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.wrapper}>
      {songs.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}

      {isFetchingNextPage && <Loader />}

      {isError && !isFetchingNextPage && (
        <div className={styles.error}>
          <span>Failed to load songs</span>
          <button className={styles.retryBtn} onClick={() => refetch()}>
            Try again
          </button>
        </div>
      )}

      <div ref={sentinelRef} className={styles.sentinel} />
    </div>
  )
}
