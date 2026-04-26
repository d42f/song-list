import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Favorite } from '../types'
import { addFavorite, fetchFavorites, fetchSongs, removeFavorite } from '../api'

const LIMIT = 20

export function useSongs(search: string, levels: number[]) {
  return useInfiniteQuery({
    queryKey: ['songs', search, levels],
    queryFn: ({ pageParam = 0 }) => fetchSongs({ start: pageParam as number, limit: LIMIT, search, levels }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap((p) => p.songs).length
      return loaded < lastPage.total ? loaded : undefined
    },
  })
}

export function useFavorites(songId: string) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  })

  const favorites = new Map<string, number>((query.data ?? []).map((f) => [f.songId, f.id]))
  const favoriteId = favorites.get(songId) as number

  const addMutation = useMutation({
    mutationFn: () => addFavorite(songId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previous = queryClient.getQueryData<Favorite[]>(['favorites'])
      queryClient.setQueryData<Favorite[]>(['favorites'], (old) => [...(old ?? []), { id: 0, songId }])
      return { previous }
    },
    onError: (_err, _songId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['favorites'], context.previous)
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  const removeMutation = useMutation({
    mutationFn: () => removeFavorite(favoriteId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previous = queryClient.getQueryData<Favorite[]>(['favorites'])
      queryClient.setQueryData<Favorite[]>(['favorites'], (old) => (old ?? []).filter((f) => f.id !== favoriteId))
      return { previous }
    },
    onError: (_err, _favoriteId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['favorites'], context.previous)
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  return {
    isLoading: query.isLoading,
    isFavorite: favorites.has(songId),
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
  }
}
