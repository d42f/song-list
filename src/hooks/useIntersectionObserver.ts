import { RefObject, useEffect, useRef } from 'react'

export function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  enabled: boolean,
  options: IntersectionObserverInit = { rootMargin: '200px' },
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) callback()
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [callback, enabled])

  return ref
}
