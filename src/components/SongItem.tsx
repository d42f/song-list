import FavoriteIcon from '../../assets/icons/favorite.svg?react'
import FavoriteBorderIcon from '../../assets/icons/favorite_border.svg?react'
import type { Song } from '../types'
import { LevelBadge } from './LevelBadge'
import styles from './SongItem.module.css'

interface Props {
  song: Song
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function SongItem({ song, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className={styles.item}>
      <img className={styles.image} src={song.images} alt={song.title} loading="lazy" />
      <div className={styles.info}>
        <span className={styles.title}>{song.title}</span>
        <span className={styles.artist}>{song.artist}</span>
      </div>
      <LevelBadge level={song.level} />
      <button
        className={styles.favoriteBtn}
        onClick={onToggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite
          ? <FavoriteIcon width={24} height={24} className={styles.favIconActive} />
          : <FavoriteBorderIcon width={24} height={24} className={styles.favIcon} />
        }
      </button>
    </div>
  )
}
