import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addFavorite, fetchFavorites, fetchSongs, removeFavorite } from '../api'
import type { Favorite } from '../types'

const LIMIT = 20

export function useSongs(search: string, levels: number[]) {
  return useInfiniteQuery({
    queryKey: ['songs', search, levels],
    queryFn: ({ pageParam = 0 }) =>
      fetchSongs({ start: pageParam as number, limit: LIMIT, search, levels }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap((p) => p.songs).length
      return loaded < lastPage.total ? loaded : undefined
    },
  })
}

export function useFavorites() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  })

  const favorites = new Map<string, number>((query.data ?? []).map((f) => [f.songId, f.id]))

  const addMutation = useMutation({
    mutationFn: (songId: string) => addFavorite(songId),
    onMutate: async (songId) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previous = queryClient.getQueryData<Favorite[]>(['favorites'])
      queryClient.setQueryData<Favorite[]>(['favorites'], (old) => [
        ...(old ?? []),
        { id: 0, songId },
      ])
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
    mutationFn: (favoriteId: number) => removeFavorite(favoriteId),
    onMutate: async (favoriteId) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previous = queryClient.getQueryData<Favorite[]>(['favorites'])
      queryClient.setQueryData<Favorite[]>(['favorites'], (old) =>
        (old ?? []).filter((f) => f.id !== favoriteId),
      )
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
    favorites,
    isLoading: query.isLoading,
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
  }
}
