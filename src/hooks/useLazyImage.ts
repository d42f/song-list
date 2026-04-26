import { RefObject, useState } from 'react'
import { useIntersectionObserver } from './useIntersectionObserver'

export function useLazyImage<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useIntersectionObserver<T>(() => setIsVisible(true), !isVisible)
  return [ref, isVisible]
}
