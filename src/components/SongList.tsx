import { useCallback } from 'react'
import { useSongs } from '../hooks/useApi'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { Loader } from './Loader'
import { SongItem } from './SongItem'
import styles from './SongList.module.css'

interface Props {
  search: string
  levels: number[]
}

export function SongList({ search, levels }: Props) {
  const { data, isFetchingNextPage, hasNextPage, isError, refetch, isLoading, fetchNextPage } = useSongs(search, levels)

  const songs = data?.pages.flatMap((p) => p.songs) ?? []

  const handleSentinel = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const sentinelRef = useIntersectionObserver(handleSentinel, !!hasNextPage)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.list}>
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
