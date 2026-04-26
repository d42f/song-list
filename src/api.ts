import type { Favorite, FetchSongsParams, Song, SongsPage } from './types'

const BASE_URL = import.meta.env.VITE_API_URL

export async function fetchSongs({
  start = 0,
  limit = 20,
  search = '',
  levels = [],
}: FetchSongsParams = {}): Promise<SongsPage> {
  const p = new URLSearchParams({ _start: String(start), _limit: String(limit) })
  if (search) p.set('search_like', search)
  levels.forEach((l) => p.append('level', String(l)))

  const res = await fetch(`${BASE_URL}/songs?${p}`)
  if (!res.ok) throw new Error('Flaky backend error')

  return {
    songs: (await res.json()) as Song[],
    total: +(res.headers.get('X-Total-Count') ?? 0),
    nextStart: start + limit,
  }
}

export async function fetchFavorites(): Promise<Favorite[]> {
  const res = await fetch(`${BASE_URL}/favorites`)
  if (!res.ok) throw new Error('Failed to fetch favorites')
  return res.json()
}

export async function addFavorite(songId: string): Promise<Favorite> {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ songId }),
  })
  if (!res.ok) throw new Error('Failed to add favorite')
  return res.json()
}

export async function removeFavorite(favoriteId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/favorites/${favoriteId}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to remove favorite')
}
