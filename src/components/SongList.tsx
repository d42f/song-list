import { useEffect, useRef } from 'react'
import type { Song } from '../types'
import { Loader } from './Loader'
import { SongItem } from './SongItem'
import styles from './SongList.module.css'

interface Props {
  songs: Song[]
  favorites: Map<string, number>
  onToggleFavorite: (songId: string, favoriteId?: number) => void
  isFetchingNextPage: boolean
  hasNextPage: boolean
  isError: boolean
  onRetry: () => void
  fetchNextPage: () => void
}

export function SongList({
  songs,
  favorites,
  onToggleFavorite,
  isFetchingNextPage,
  hasNextPage,
  isError,
  onRetry,
  fetchNextPage,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className={styles.list}>
      {songs.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          isFavorite={favorites.has(song.id)}
          onToggleFavorite={() => onToggleFavorite(song.id, favorites.get(song.id))}
        />
      ))}

      {isFetchingNextPage && <Loader />}

      {isError && !isFetchingNextPage && (
        <div className={styles.error}>
          <span>Failed to load songs</span>
          <button className={styles.retryBtn} onClick={onRetry}>
            Try again
          </button>
        </div>
      )}

      <div ref={sentinelRef} className={styles.sentinel} />
    </div>
  )
}
