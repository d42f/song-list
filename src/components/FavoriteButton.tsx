import FavoriteIcon from '@icons/favorite.svg?react'
import FavoriteBorderIcon from '@icons/favorite_border.svg?react'
import { useFavorites } from '../hooks/useApi'
import styles from './FavoriteButton.module.css'

interface Props {
  songId: string
}

export function FavoriteButton({ songId }: Props) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites(songId)
  function handleClick() {
    if (isFavorite) {
      removeFavorite()
    } else {
      addFavorite()
    }
  }

  const size = { width: 24, height: 24 }

  return (
    <button
      className={styles.wrapper}
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <FavoriteIcon className={styles.iconActive} {...size} />
      ) : (
        <FavoriteBorderIcon className={styles.icon} {...size} />
      )}
    </button>
  )
}
