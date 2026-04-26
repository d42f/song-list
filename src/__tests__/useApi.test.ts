import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor, act } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { addFavorite, fetchFavorites, fetchSongs, removeFavorite } from '../api'
import { useFavorites, useSongs } from '../hooks/useApi'

vi.mock('../api')

const mockFetchSongs = vi.mocked(fetchSongs)
const mockFetchFavorites = vi.mocked(fetchFavorites)
const mockAddFavorite = vi.mocked(addFavorite)
const mockRemoveFavorite = vi.mocked(removeFavorite)

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client }, children)
}

describe('useSongs', () => {
  beforeEach(() => {
    mockFetchSongs.mockResolvedValue({
      songs: [{ id: '1', title: 'T', artist: 'A', images: '', level: 1, search: '' }],
      total: 1,
      nextStart: 20,
    })
    mockFetchFavorites.mockResolvedValue([])
  })

  afterEach(() => vi.clearAllMocks())

  it('fetches songs on mount', async () => {
    const { result } = renderHook(() => useSongs('', []), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockFetchSongs).toHaveBeenCalledWith({ start: 0, limit: 20, search: '', levels: [] })
  })

  it('refetches when search changes', async () => {
    const { result, rerender } = renderHook(({ search }: { search: string }) => useSongs(search, []), {
      wrapper: createWrapper(),
      initialProps: { search: '' } as { search: string },
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    rerender({ search: 'rock' })
    await waitFor(() => expect(mockFetchSongs).toHaveBeenCalledWith(expect.objectContaining({ search: 'rock' })))
  })

  it('refetches when levels change', async () => {
    const { result, rerender } = renderHook(({ levels }: { levels: number[] }) => useSongs('', levels), {
      wrapper: createWrapper(),
      initialProps: { levels: [] } as { levels: number[] },
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    rerender({ levels: [1, 2] })
    await waitFor(() => expect(mockFetchSongs).toHaveBeenCalledWith(expect.objectContaining({ levels: [1, 2] })))
  })
})

describe('useFavorites', () => {
  afterEach(() => vi.clearAllMocks())

  it('returns isFavorite=true when song is in favorites', async () => {
    mockFetchFavorites.mockResolvedValue([{ id: 1, songId: 's1' }])
    const { result } = renderHook(() => useFavorites('s1'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.isFavorite).toBe(true)
  })

  it('returns isFavorite=false when song is not in favorites', async () => {
    mockFetchFavorites.mockResolvedValue([{ id: 1, songId: 's2' }])
    const { result } = renderHook(() => useFavorites('s1'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.isFavorite).toBe(false)
  })

  it('calls addFavorite with songId', async () => {
    mockFetchFavorites.mockResolvedValue([])
    mockAddFavorite.mockResolvedValue({ id: 2, songId: 's1' })
    const { result } = renderHook(() => useFavorites('s1'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => result.current.addFavorite())
    await waitFor(() => expect(mockAddFavorite).toHaveBeenCalledWith('s1'))
  })

  it('calls removeFavorite with favoriteId', async () => {
    mockFetchFavorites.mockResolvedValue([{ id: 5, songId: 's1' }])
    mockRemoveFavorite.mockResolvedValue()
    const { result } = renderHook(() => useFavorites('s1'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    act(() => result.current.removeFavorite())
    await waitFor(() => expect(mockRemoveFavorite).toHaveBeenCalledWith(5))
  })
})
