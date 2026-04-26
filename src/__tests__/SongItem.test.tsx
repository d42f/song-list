import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SongItem } from '../components/SongItem'
import type { Song } from '../types'

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
    render(<SongItem song={song} isFavorite={false} onToggleFavorite={vi.fn()} />)
    expect(screen.getByText('Test Song')).toBeInTheDocument()
    expect(screen.getByText('Test Artist')).toBeInTheDocument()
  })

  it('renders level badge', () => {
    render(<SongItem song={song} isFavorite={false} onToggleFavorite={vi.fn()} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('calls onToggleFavorite when heart button clicked', async () => {
    const handler = vi.fn()
    render(<SongItem song={song} isFavorite={false} onToggleFavorite={handler} />)
    await userEvent.click(screen.getByRole('button', { name: /add to favorites/i }))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('shows filled heart when favorite', () => {
    render(<SongItem song={song} isFavorite={true} onToggleFavorite={vi.fn()} />)
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument()
  })
})
