import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FavoriteButton } from '../components/FavoriteButton'

const mockAddFavorite = vi.fn()
const mockRemoveFavorite = vi.fn()

vi.mock('../hooks/useApi', () => ({
  useFavorites: (songId: string) => ({
    isLoading: false,
    isFavorite: songId === 'favorited',
    addFavorite: mockAddFavorite,
    removeFavorite: mockRemoveFavorite,
  }),
}))

describe('FavoriteButton', () => {
  it('shows add label when not favorite', () => {
    render(<FavoriteButton songId="s1" />)
    expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument()
  })

  it('shows remove label when favorite', () => {
    render(<FavoriteButton songId="favorited" />)
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument()
  })

  it('calls addFavorite when not favorite', async () => {
    render(<FavoriteButton songId="s1" />)
    await userEvent.click(screen.getByRole('button'))
    expect(mockAddFavorite).toHaveBeenCalledTimes(1)
  })

  it('calls removeFavorite when already favorite', async () => {
    render(<FavoriteButton songId="favorited" />)
    await userEvent.click(screen.getByRole('button'))
    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1)
  })
})
