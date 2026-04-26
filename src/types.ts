export interface Song {
  id: string
  title: string
  artist: string
  images: string
  level: number
  search: string
}

export interface Favorite {
  id: number
  songId: string
}

export interface SongsPage {
  songs: Song[]
  total: number
  nextStart: number
}

export interface FetchSongsParams {
  start?: number
  limit?: number
  search?: string
  levels?: number[]
}
