import { createContext, ReactNode, useContext, useDeferredValue, useState } from 'react'

interface FiltersContextValue {
  searchInput: string
  search: string
  levels: number[]
  mappedLevels: Set<number>
  setSearchInput: (value: string) => void
  handleToggleLevel: (level: number) => void
}

const FiltersContext = createContext<FiltersContextValue | null>(null)

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [searchInput, setSearchInput] = useState('')
  const search = useDeferredValue(searchInput)
  const [mappedLevels, setMappedLevels] = useState(new Set<number>())

  const levels = Array.from(mappedLevels)

  function handleToggleLevel(level: number) {
    setMappedLevels((prev) => {
      const next = new Set(prev)
      next.has(level) ? next.delete(level) : next.add(level)
      return next
    })
  }

  return (
    <FiltersContext.Provider value={{ searchInput, search, levels, mappedLevels, setSearchInput, handleToggleLevel }}>
      {children}
    </FiltersContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error('useFilters must be used within FiltersProvider')
  return ctx
}
