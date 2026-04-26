import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SongItem } from '../components/SongItem'
import type { Song } from '../types'

vi.mock('../hooks/useApi', () => ({
  useFavorites: () => ({ isLoading: false, isFavorite: false, addFavorite: vi.fn(), removeFavorite: vi.fn() }),
}))

const song: Song = {
  id: '1',
  title: 'Test Song',
  artist: 'Test Artist',
  images: 'https://example.com/img.jpg',
  level: 5,
  search: 'Test Artist Test Song',
}

describe('SongItem', () => {
  it('renders title and artist', () => {
    render(<SongItem song={song} />)
    expect(screen.getByText('Test Song')).toBeInTheDocument()
    expect(screen.getByText('Test Artist')).toBeInTheDocument()
  })

  it('renders level badge', () => {
    render(<SongItem song={song} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})
