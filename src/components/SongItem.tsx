import type { Song } from '../types'
import { LevelBadge } from './LevelBadge'
import { FavoriteButton } from './FavoriteButton'
import styles from './SongItem.module.css'

interface Props {
  song: Song
}

export function SongItem({ song }: Props) {
  return (
    <div className={styles.item}>
      <img className={styles.image} src={song.images} alt={song.title} loading="lazy" />
      <div className={styles.info}>
        <span className={styles.title}>{song.title}</span>
        <span className={styles.artist}>{song.artist}</span>
      </div>
      <LevelBadge level={song.level} />
      <FavoriteButton songId={song.id} />
    </div>
  )
}
