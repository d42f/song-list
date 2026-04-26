import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchFavorites, fetchSongs } from '../api'
import { useFavorites, useSongs } from '../hooks/useApi'

vi.mock('../api')

const mockFetchSongs = vi.mocked(fetchSongs)
const mockFetchFavorites = vi.mocked(fetchFavorites)

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client }, children)
}

describe('useSongs', () => {
  beforeEach(() => {
    mockFetchSongs.mockResolvedValue({ songs: [{ id: '1', title: 'T', artist: 'A', images: '', level: 1, search: '' }], total: 1, nextStart: 20 })
    mockFetchFavorites.mockResolvedValue([])
  })

  afterEach(() => vi.clearAllMocks())

  it('fetches songs on mount', async () => {
    const { result } = renderHook(() => useSongs('', []), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockFetchSongs).toHaveBeenCalledWith({ start: 0, limit: 20, search: '', levels: [] })
  })

  it('refetches when search changes', async () => {
    const { result, rerender } = renderHook(
      ({ search }: { search: string }) => useSongs(search, []),
      { wrapper: createWrapper(), initialProps: { search: '' } as { search: string } },
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    rerender({ search: 'rock' })
    await waitFor(() =>
      expect(mockFetchSongs).toHaveBeenCalledWith(expect.objectContaining({ search: 'rock' })),
    )
  })

  it('refetches when levels change', async () => {
    const { result, rerender } = renderHook(
      ({ levels }: { levels: number[] }) => useSongs('', levels),
      { wrapper: createWrapper(), initialProps: { levels: [] } as { levels: number[] } },
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    rerender({ levels: [1, 2] })
    await waitFor(() =>
      expect(mockFetchSongs).toHaveBeenCalledWith(expect.objectContaining({ levels: [1, 2] })),
    )
  })
})

describe('useFavorites', () => {
  afterEach(() => vi.clearAllMocks())

  it('loads favorites map', async () => {
    mockFetchFavorites.mockResolvedValue([{ id: 'f1', songId: 's1' }])
    const { result } = renderHook(() => useFavorites(), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.favoritesMap.get('s1')).toBe('f1')
  })
})
